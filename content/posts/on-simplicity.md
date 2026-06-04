---
title: "On Simplicity"
date: "2026-06-04"
summary: "Simple systems are not built by removing features — they are built by never adding unnecessary ones."
tags: ["engineering", "thinking"]
lang: en
---

Simplicity is not the absence of complexity. It is the result of deliberate choices.

## The temptation to add

When you encounter a problem, the instinct is to add: add a layer, add a flag, add a fallback. Adding feels like progress. It feels like you're handling more cases, being more defensive, being thorough.

But every addition has a cost. The cost is rarely the code itself — it's the cognitive overhead that travels with it. Every new parameter someone has to understand. Every new edge case someone has to consider. Every new interaction between components that someone has to reason about.

## The discipline to remove

The better instinct is to ask: *what can I remove?*

Not just from the implementation, but from the problem itself. Can the requirement be simplified? Can two features be unified into one? Can the abstraction be drawn in a way that makes the hard case unnecessary?

Antoine de Saint-Exupéry's line is overused but still true: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."

## Simple ≠ easy

This is worth saying clearly: simple systems are not easy to build. They require more thought upfront, more willingness to revisit early decisions, and more discipline to resist scope creep.

A simple interface usually hides significant complexity inside. The complexity doesn't disappear — it gets moved to where it can be managed by people who understand it, rather than exposed to every user.

## A test

When you finish building something, ask: would a version of you from six months ago be able to understand this in 20 minutes?

If yes, you probably have something simple. If not, ask what you would remove.

---

This is what I try to do with this blog. No comments, no likes, no categories beyond tags. Just posts.
