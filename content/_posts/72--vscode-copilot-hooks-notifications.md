---
title: "Hooking Into VS Code GH Copilot"
date: "10-03-2026"
tags:
  - vscode
  - github-copilot
  - automation
  - hooks
description: "Building a notification system using VS Code GH Copilot hooks to track agent sessions, subagents, and tool executions with native macOS alerts."
minutesToRead: 8
---

Ever started a long agent task in VS Code, switched to another window, and completely forgot your AI was still crunching away in the background? Yeah, me too. Multiple times a day.

I work with AI agents constantly. Custom agents for PR reviews, spec planning, code implementation. They often spawn subagents that work independently. The problem? I had no visibility into when they started, when they finished, or when they needed my attention. I'd check back too early (still running), get distracted, check back hours later (finished ages ago), or worse, miss important validations that blocked progress.

Then I discovered VS Code Copilot now supports hooks.

## Wait, Hooks?

Hooks are lifecycle event automations that let you run custom code at specific points during agent sessions. Think of them as deterministic callbacks: when X happens, run Y.

Claude Code has had this feature for a while, but VS Code Copilot just added support in early 2026. The timing was perfect—I'd been looking for exactly this kind of extensibility.

The key difference between hooks and instructions: instructions *guide* agent behavior (soft constraints), while hooks *execute* code with guaranteed outcomes (hard automation). You can block dangerous commands, auto-format code after edits, send notifications, log everything for compliance, or inject context into conversations.

VS Code provides [8 lifecycle events (for now)](https://code.visualstudio.com/docs/copilot/customization/hooks#_hook-lifecycle-events) you can hook into. Each receives structured JSON input and can return JSON to influence agent behavior.

## What I Built

I built a notification system using native macOS alerts for key agent events. The implementation was inspired by [PeonPing](https://github.com/PeonPing/peon-ping), but I wanted something simpler. No fancy dashboards, and definitely no sound spam. Just clean system notifications.

My requirements:
- Know when agent sessions start and stop
- Track subagent spawning (my custom Implementer, PR Reviewer, etc.)
- Get notified when tools execute
- Work across *all* projects, not just one repo

The last point was crucial. I maintain a toolkit repo called `agent-box` with reusable agents, skills, and prompts that I reference across projects. Hooks needed to follow the same pattern: write once, use everywhere.

## The Implementation

I created a global hooks toolkit that symlinks into `~/.agent-box-toolkit/hooks` and configured VS Code to load it universally. The structure is straightforward:

```
vscode-prompts/.github/hooks/
├── session-notifications.json       # SessionStart, Stop
├── subagent-notifications.json      # SubagentStart, SubagentStop  
├── prompt-notifications.json        # UserPromptSubmit
└── scripts/
    └── notify.sh                    # Notification handler
```

Each JSON file defines which events trigger the notification script:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "type": "command",
        "command": "bash ~/.agent-box-toolkit/hooks/scripts/notify.sh",
        "timeout": 5
      }
    ]
  }
}
```

The magic happens in `notify.sh`. It reads JSON from stdin, parses the event type, and sends native macOS notifications using `osascript`:

```bash
case "$HOOK_EVENT" in
    SessionStart)
        TITLE="🤖 Agent Session Started"
        MESSAGE="New Copilot session initialized"
        SOUND="Glass"
        ;;
    SubagentStart)
        TITLE="🔄 Subagent Started"
        MESSAGE="Agent: ${AGENT_TYPE:-Unknown}"
        SOUND="Pop"
        ;;
    # ...more events
esac

osascript -e "display notification \"$MESSAGE\" with title \"$TITLE\" sound name \"$SOUND\""
```

Zero dependencies. Pure bash and built-in macOS tools. The script also logs everything to `~/.agent-box/logs/notifications.log` for debugging and audit trails.

To enable globally, I added one line to my VS Code user settings:

```json
{
  "chat.hookFilesLocations": {
    "~/.agent-box-toolkit/hooks": true
  }
}
```

Now every workspace automatically loads these hooks. No per-project configuration needed.

## The Approval Gap

One problem remained: agents often wait for approval on file edits or terminal commands, but there's no explicit "waiting for approval" event. The agent just goes silent. This is still a gap in the hooks API.

My workaround? Track tool lifecycle with state. When `PreToolUse` fires for approval-worthy tools (file edits, terminal commands), spawn a background checker. If `PostToolUse` doesn't fire within 15 seconds and the conversation transcript hasn't been modified (indicating the agent is actually idle, not just processing), send a notification.

Progressive reminders at 15s, 45s, and 2 minutes catch the "I forgot VS Code is waiting" cases without being annoying. The transcript activity check prevents false positives when the agent is legitimately processing.

It's not perfect, but it works remarkably well for what it is. Hopefully VS Code adds a proper `WaitingForApproval` event in the future.

## Try It Yourself

The complete implementation is in my [agent-box](https://github.com/prasann/agent-box) repo under `vscode-prompts/.github/hooks/`. Setup takes about 2 minutes:

```bash
# Clone or navigate to the repo
git clone https://github.com/prasann/agent-box.git
cd agent-box

# Run the installer
./install-hooks.sh

# Add to VS Code settings (or installer does it for you)
# Test it
./test-notification.sh SessionStart
```

The modular design makes customization easy. Want different sounds? Edit the shell script. Only want session notifications, not every prompt? Delete `prompt-notifications.json`. Want email instead of notifications? Swap the `osascript` call for `mail` or a webhook.

Fork it, customize it, make it yours.

## Closing Thoughts

This took about three hours from discovering the feature to having a working implementation. An afternoon project with ongoing daily value. That's the sweet spot for personal tooling.

There's something deeply satisfying about reading documentation, building something concrete, and having it just work. No external services, no subscriptions, no frameworks. Just shell scripts and system APIs.

Next up: Adding phone notifications for those "go grab coffee while the agent implements 15 tasks" sessions. Maybe tracking agent session durations. Possibly auto-opening relevant files when subagents complete.

The beauty of hooks is they're just code. You can hook into literally anything.

## Resources

- [VS Code Copilot Hooks Documentation](https://code.visualstudio.com/docs/copilot/customization/hooks)
- [My Implementation (agent-box)](https://github.com/prasann/agent-box)
- [PeonPing](https://github.com/PeonPing/peon-ping) (inspiration)

*Built with VS Code Copilot hooks, macOS notifications, and way too much coffee.*
