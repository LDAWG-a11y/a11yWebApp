---
title: DiscoverUni widget accessibility case study
summary: Many UK universities embed the DiscoverUni widget on their sites
  to   display statistics about courses and this has apparently been flagged by
  GDS   in their audits across the sector, let's have a deep dive to understand
  what
author: dlee
date: 2023-09-05
toc: false
isGuide: true
---
## Intro

We're perhaps venturing away from the typical Guides we provide here, in that we're not so much showing you how to make a particular pattern accessible, we're primarily auditing one and then making suggestions on how to improve it.

Essentially the DiscoverUni widget is an iFrame embed, it may appear on course specific pages and within the embed it provides information such as:

* The percentage of students that passed the course
* The percentage of students that thought were happy with the course delivery
* The percentage of students that were in related employment within a certain amount of time after completing the course

The first thing to take note of is the domain for DiscoverUi, which is a .gov.uk domain, so as this domain is reserved for government, then it really is on them to make it accessible. Also, as the content is in an iFrame, it can be super difficult to fix the accessibility issues, as it exists on another site, but then why would a couple of hundred institutions be required to patch it up with JS, when it could simply be fixed at source?

## So what is the widget?

Well, to give you an example, here is a screenshot of the widget in question, taken from our own site