---
title: Primary-key @OneToOne mapping in Hibernate
description: Joining two tables using Primary keys in Hibernate.
category: tech,java
date: 18-05-2011
minutesToRead: 2
---

Today was trying to join two tables using its Primary keys using Hibernate. Here is what I tried to do:

```java
@Table(name = "customer")
@Entity
public class Customer {
    @Id
    @OneToOne
    @JoinColumn(name = "customer\_id", updatable = false)
    private Credentials credentials;
}
```

I was constantly getting an error stating invalid column name. Later then I realized that its not possible have Join in the Primary-Key and bind to a custom object. This forced me to have a Auto-generated Id as a key to the table and named it as the primary key. This is how my code looked after modification.

```java
@Table(name = "customer")
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "customer\_id",updatable = false)
    private Credentials credentials;
}
```
