---
title: "LangGraph patterns and conventions for building agentic systems"
date: "28-11-2025"
tags:
  - LangGraph
  - agentic-systems
  - python
  - best-practices
description: "Patterns and conventions I picked up building agent systems with LangGraph, covering pure transformations, state management, and common anti-patterns to avoid."
minutesToRead: 12
---

After building a few agent systems with LangGraph, I started noticing patterns in what worked and what caused bugs. Things like mutating state, blocking in nodes, and hiding tool calls inside LLM nodes made debugging really painful. Putting up this list for my future reference, and possibly to share with others who are in the first days of LangGraph.

Fair warning: this comes from my experience building with LangGraph and reading the docs, but I'm not 100% sure every pattern here is officially recommended. Think of these as working conventions that helped me rather than gospel. If something here helps you avoid the headaches I ran into, great. If you find better patterns, even better.

## 1. Nodes are Pure Transformations

**Principle**: Nodes transform state → new state without side effects during execution.

```python
# ❌ WRONG: Imperative with side effects
def process_node(state):
    data = state["data"]
    data.status = "processed"     # Mutation
    database.save(data)           # Side effect
    return state

# ✅ RIGHT: Pure transformation
def process_node(state):
    updated_data = state["data"].copy()
    updated_data["status"] = "processed"
    return {
        **state,
        "data": updated_data
    }
```

**Why**: Enables replay, debugging, checkpointing, and parallel execution.

## 2. State is Immutable Between Nodes

**Principle**: Never mutate state objects. Return new state objects.

```python
# ❌ WRONG: Mutating shared references
def add_item_node(state):
    state["items"].append(new_item)           # Mutates original
    state["metadata"].count += 1              # Mutates original
    return state

# ✅ RIGHT: Create new collections
def add_item_node(state):
    return {
        **state,
        "items": [*state["items"], new_item],      # New list
        "metadata": {
            **state["metadata"],
            "count": state["metadata"]["count"] + 1
        }
    }
```

**Why**: Preserves history, enables time-travel debugging, prevents race conditions.

## 3. Persistence is External to Graph Execution

**Principle**: Don't persist inside nodes. Let LangGraph's checkpointer handle it.

```python
# ❌ WRONG: Manual persistence in nodes
def process_order_node(state):
    order = state["order"]
    order["status"] = "processing"
    database.save(order)          # Manual DB write
    return {**state, "order": order}

# ✅ RIGHT: Declarative persistence via checkpointer
from langgraph.checkpoint.postgres import PostgresSaver

graph = workflow.compile(
    checkpointer=PostgresSaver.from_conn_string(database_url)
)

def process_order_node(state):
    # Just return new state - framework persists it
    return {
        **state,
        "order": {
            **state["order"],
            "status": "processing"
        }
    }
```

**Why**: Framework manages transactions, retries, consistency automatically.

## 4. Use Reducers for List/Collection Updates

**Principle**: Annotate collection fields to tell LangGraph how to merge updates.

```python
# State definition with reducers
from typing import Annotated
from operator import add
from langgraph.graph import add_messages

class ChatState(TypedDict):
    # LangGraph appends new messages automatically
    messages: Annotated[list[Message], add_messages]
    # LangGraph adds new items to list
    collected_data: Annotated[list[dict], add]
    
# Nodes return partial updates
def node1(state):
    return {"messages": [Message("hello")]}  # LangGraph appends

def node2(state):
    return {"messages": [Message("world")]}  # LangGraph appends

# Final state has both messages combined
```

**Why**: Avoids manual list copying, prevents lost updates in parallel branches.

## 5. Interrupts/Pauses Separate Workflow from Waiting

**Principle**: Use `interrupt_before`/`interrupt_after` instead of blocking loops.

```python
# ❌ WRONG: Blocking inside node
def wait_for_completion_node(state):
    while not is_job_complete(state["job_id"]):
        time.sleep(30)  # Blocks entire thread
    result = get_result(state["job_id"])
    return {**state, "result": result}

# ✅ RIGHT: Pause workflow, resume on event
graph = workflow.compile(
    checkpointer=checkpointer,
    interrupt_after=["start_job"]
)

def start_job_node(state):
    job_id = external_system.start_job(state["params"])
    return {**state, "job_id": job_id}
    # Graph pauses here, releases resources

# Resume when external system calls back
graph.invoke(
    {"result": job_result},
    config={"configurable": {"thread_id": job_id}}
)
```

**Why**: Enables async, event-driven workflows. Scales to thousands of concurrent workflows.

## 6. Conditional Routing is Stateless

**Principle**: Routing functions inspect state, don't modify it.

```python
# ❌ WRONG: Side effects in routing
iteration_counter = 0

def route_decision(state):
    global iteration_counter
    iteration_counter += 1      # Side effect!
    return "continue" if iteration_counter < 3 else "end"

# ✅ RIGHT: Pure inspection
def route_decision(state):
    return "continue" if state["iteration"] < 3 else "end"
```

**Why**: Routing executed during graph compilation/planning. Must be deterministic and pure.

## 7. Tool Calls are Explicit State Transitions

**Principle**: LLM tool calls become nodes, not hidden in LLM node.

```python
# ❌ WRONG: Hidden tool execution
def agent_node(state):
    llm_response = llm.invoke(state["messages"])
    if llm_response.tool_calls:
        # Hidden tool execution - not visible in graph
        results = [execute_tool(tc) for tc in llm_response.tool_calls]
    return {**state, "messages": state["messages"] + [llm_response]}

# ✅ RIGHT: Explicit tool nodes
def agent_node(state):
    llm_response = llm.invoke(state["messages"])
    return {
        **state, 
        "messages": [*state["messages"], llm_response],
        "tool_calls": llm_response.tool_calls
    }

def tools_node(state):
    results = [execute_tool(call) for call in state["tool_calls"]]
    tool_messages = [ToolMessage(content=r, tool_call_id=tc.id) 
                     for r, tc in zip(results, state["tool_calls"])]
    return {**state, "messages": tool_messages}

def route_after_agent(state):
    last_message = state["messages"][-1]
    return "tools" if hasattr(last_message, "tool_calls") else "end"
```

**Why**: Graph shows complete workflow. Tool execution is traceable, retryable, debuggable.

## 8. State Schema Defines Behavior

**Principle**: State structure + annotations encode workflow semantics.

```python
# State schema is documentation AND behavior
from typing import TypedDict, Annotated

class AgentState(TypedDict):
    # Input context (set once at start)
    user_input: str
    
    # Conversation history (appended via reducer)
    messages: Annotated[list[BaseMessage], add_messages]
    
    # Intermediate computation (replaced each iteration)
    current_reasoning: str
    
    # Final output (set once at end)
    final_answer: str | None
    
    # Iteration control
    iteration: int
```

**Why**: Self-documenting. Type checker catches errors. Framework knows merge strategy.

## 9. Checkpoints Enable Human-in-the-Loop

**Principle**: Human-in-the-loop is just pause + resume with human input injected.

```python
# Compile with checkpointing
graph = workflow.compile(
    checkpointer=PostgresSaver.from_conn_string(db_url),
    interrupt_before=["human_review"]
)

# Execute until human review needed
workflow_id = "workflow-abc-123"
config = {"configurable": {"thread_id": workflow_id}}

graph.invoke(initial_input, config=config)
# Graph pauses before human_review node

# Human reviews via UI, provides decision
human_decision = {"approved": True, "feedback": "Looks good!"}

# Resume with human input merged into state
graph.invoke(human_decision, config=config)
# Workflow continues from human_review node
```

**Why**: No special HITL code needed. Workflow pauses are first-class primitives.

## 10. Multi-Agent = Subgraphs with Shared State

**Principle**: Each agent is a subgraph. Parent graph coordinates.

```python
# Agent 1: Research specialist (subgraph)
def create_research_agent():
    workflow = StateGraph(ResearchState)
    workflow.add_node("search", search_node)
    workflow.add_node("analyze", analyze_node)
    workflow.add_edge("search", "analyze")
    return workflow.compile()

# Agent 2: Writing specialist (subgraph)
def create_writing_agent():
    workflow = StateGraph(WritingState)
    workflow.add_node("draft", draft_node)
    workflow.add_node("edit", edit_node)
    workflow.add_edge("draft", "edit")
    return workflow.compile()

# Coordinator graph
def create_coordinator():
    workflow = StateGraph(CoordinatorState)
    
    workflow.add_node("research", create_research_agent())
    workflow.add_node("write", create_writing_agent())
    workflow.add_node("synthesize", synthesize_node)
    
    workflow.set_entry_point("research")
    workflow.add_edge("research", "write")
    workflow.add_edge("write", "synthesize")
    
    return workflow.compile()
```

**Why**: Compositional design. Each agent independently testable. Clear boundaries and responsibilities.

## Anti-Patterns to Avoid

```python
# ❌ State mutation
state["data"].field = new_value

# ❌ Side effects in nodes
database.save(object)
api.call_external_service()

# ❌ Blocking operations
time.sleep(30)
while not ready(): pass

# ❌ Hidden tool calls
response = llm.invoke_with_automatic_tool_execution()

# ❌ Manual state merging
state["list"] = state["list"] + new_items  # Use reducer instead

# ❌ Stateful routing
global counter
counter += 1
return "next" if counter < 5 else "end"
```

## Conclusion

These patterns emerged from building with LangGraph and hitting the same bugs repeatedly. The constraints feel strict at first (no mutations, no side effects, no blocking) but they pay off when you need to debug why an agent took a weird path or replay a workflow from a checkpoint.

The key insight for me was treating LangGraph like a pure functional system: nodes are functions, state is immutable, side effects happen outside the graph. Once that clicked, a lot of the API choices started to make sense.

If you're building with LangGraph and find better patterns or disagree with something here, let me know. This is just what worked for me.
