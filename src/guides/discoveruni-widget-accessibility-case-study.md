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

Well, to give you an example, here is a screenshot of the widget in question, taken from our own site:

![Screenshot of the widget which contains text with statistics for how many students were in work or further study within 15 months of completing the course. There is also a link within the widget that takes a user to the Discover ui site and displays these details in greater depth.](src/guideImg/dl-screenshot-discoveruni1.png)

This iFrame is not static, on the page I am viewing, there is a transition occurring where the contents fade out and a new statistic is displayed.

### Let's discuss the good parts

I'll outline the success criterion I would be testing against.

#### 2.4.1 Bypass Blocks (A)

First thing's first, it's an iFrame so we check for a title on that iFrame and by inspecting the code, i can confirm the title of "Unistats KIS Widget" is present. Is that a good title? Not really, I have no idea what "KIS" means without Googling, also what if there were more than one of these iFrames on the page, but displaying different statistics? Would they both have that same Generic title? probably. I'd recommend as a best practice the title be more descriptive, if there was more than one present on a page and they had identical titles, I'd fail it against 1.3.1 Info and Relationships (A).

#### 1.4.3 Contrast (Minimum) (AA)

The text within (yes, it is text and not an image) has the colour of green (#307E7E) and a background colour of white (#FFF), which gives us a contrast ratio of 4.76:1 and this passes for both small text and large text. This could possibly be a colour we have selected, so other organisations may have different results.

The area to the side does have a gradient background, with white text, so I check that again and both colours used in the gradient do pass, albeit only just with a ratio of 4.51:1

#### 1.4.10 Reflow (AA)

Often iFrames cause whole page horizontal scroll, there's no issue with that here, the item stacks so it does not cause an issue where a user would be required to scroll in 2 directions