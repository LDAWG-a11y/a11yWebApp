---
title: Outta time? Providing users with adjustable time mechanisms to meet WCAG
  2.2.1 Timing Adjustable (Level A)
summary: Setting time limits on websites can be problematic for many users, in
  some cases, it can be a barrier, it prevents the user from completing tasks,
  due to their disability, especially if there is not a mechanism to extend or
  turn off the time limit
author: dlee
date: 2024-10-15
toc: false
tags:
  - HTML
  - JavaScript
  - Adapting websites
isGuide: true
---
## Intro

You must do the thing now, you cannot get distracted and you must do it at a speed that we deem "fast enough", is perhaps the train of thought that some product teams and developers have when implementing various time out mechanisms (not me, I don't think that).

We have all likely encountered these mechanisms whilst using various sites or apps, sometimes we may be provided with a hard limit on how long we have to complete a given task and others it may be due to a period of inactivity, these are of course 'session timeouts', but this guide like the WCAG 2.2.1 Timing Adjustable (A) success criterion does not focus solely on session timeouts, it's for anything on a website or app that may impose some kind of timed limit upon the users. there are of course exceptions and these are called 'real time exceptions', in the SC, some examples are:

* Auctions, think eBay and similar sites, whether the user has a disability or not, the auction has to end when at a given moment in time
* Security, there are some instances where security implications may require a user to be active for the session or task to remain open, as leaving the user logged in forever could ultimately allow a bad actor to access the user's private or financial information and in some cases, drain their accounts. We'll dig a bit deeper into the security aspect, later, as it contains what we believe to be some nuance
* Booking systems, you've made it, you got through the annoying booking site's seemingly never-ending cue, you were once in position 56,782 to buy tickets to some hot gig, show, movie or whatever and now you have two tickets in your basket, you have just 10 minutes to complete the transaction, otherwise they're gone, whether you have a disability or not, this is kinda necessary, otherwise everybody would just store tickets in their carts until the day before the event
* Games, some games can be played on websites, so depending on jurisdiction they could well be in scope of WCAG, but they would not necessarily be in of this SC, as it may be a part of the game that a user has a set amount of time to respond, some turn-based games may require a user to make their move within, for example, 60 seconds. This is of course part of the game, so the timing feature would apply here

That is just a handful of examples, but there are undoubtedly many more. So, why is this an issue, it's just an accepted annoyance on the web, right? A bit like cookies and the other gazillion pop-ups some developers implement, erroneously thinking they're anything other than egregious. Well, no, there is much more to it than that and as you probably guessed, the impact is often much more severe for users with disabilities for a multitude of reasons, which we will take a look at in the next section.

One final consideration that we will take a look at, is if there is a valid reason for an exception, that doesn't get you off the hook for other SCs, as an example, 4.1.3 Status Messages (AA) will still apply in most instances, as if I can see a timer of some description on the screen which visually informs me that I have limited time, then naturally, the same information will need to be exposed to screen reader users, or if it changes to red text to indicate impending doom is extremely close, then we of course need to consider contrast etc. We'll also take a look at these aspects, a little later.

## The impact of timeouts on users with disabilities

* Blind or low vision users may need extra time to locate things on the screen whereas a user with reasonable sight may just be able to scan the screen and find the relevant control or information.
* Users with motility disabilities may not be able to physically respond in the given time limits, this could be because they are using an assistive device such as a mouth stick, a sip and puff device or a switch, etc
* Deaf users may have a sign language interpreter in person ,or in another window or device and they may require that additional time so they can watch the interpreter explain something and then commence the task
* Users with cognitive disabilities may simply just require more time because they have difficulty understanding something and need longer to digest the question or look it up, they could become easily distracted and not be able to maintain focus for what is too short a time for them, and perhaps the pressure of imposed time limits makes some users panic, they are constantly reminded that time is nearly up, which in itself becomes an additional distraction and the pressure may be unbearable to them, making it impossible to focus on the task at hand
* In some instances a user may be required to obtain some form of other information to complete the task, this could be something like "go take a photo of your passport to prove you are who you say you are", if you have a cognitive disability, you may have put it somewhere and forgotten, if you are blind maybe you would need to use a service such as Be My Eyes to ensure the passport is in shot, maybe if the user lives in supported living, somebody keeps that document safe for them and they need to nip and ask, maybe if the user has a physical disability they may have to use a lift or stair lift to go to a different floor to grab it from where they keep it safe

Again, these are just a handful of examples, some were from the WCAG SC and others were just examples I could think of, which I have learned from my time in this field, but as always, users with disabilities may be affected in more ways than i could think of, as their lived experiences are unique to them.

## Providing users with accessible mechanisms

I'll summarise the WCAG exceptions, just to refresh our memories:

* If a user can **turn off** the timer altogether and they encounter this timer before they encounter it, then this is an accessible mechanism. Let's imagine we have a site and in the User Account Settings, for some reason we only let that user look at their own personal info for 10 minutes, because for some ridiculous reason, we think that is somehow good, we could provide a control, on the page, which precedes the main content and it could be a toggle or a checkbox "Keep me logged in" or words to that effect. This would give the users all of the time they need to do whatever they wanted or needed to do. This is a pretty simple mechanism that can make the world of difference to our users
* If a user can again encounter a control of some sorts that precedes the main content that enables them to **adjust** the timeout by at least 10 times its original duration, this too would be an accessible mechanism, again, it could be a checkbox or toggle switch, etc and it could have a label such as "Extend my time limit to 100 minutes" (using the original 10 minute example * 10)
* If a user can **extend** the timeout with a simple action (the WCAG example gives pressing the <kbd>Space</kbd> key as a simple action and they are given at least 20 seconds to press that key and upon pressing that key, it extends the timeout to 10 times its original duration, then this too is an accessible mechanism. This could of course be a dialog that:

  * Appears on screen visually, with a text instruction, my interpretation is it is just one key to press, not move focus to a dialog and then expect a user to find the 'Extend' button, a simple key press only
  * Is also announced via an ARIA alert, such as a live region, so screen reader users are aware of the requirement, but also consider screen magnifying users, they may be just looking at a small portion of the screen, they need to be aware something has changes and something requires their immediate attention
  * But, consider the device type a user is accessing the site on, don't tell a user on an iPad to press <kbd>Space</kbd>, because they may or may not have a keyboard
* If there is a real-time-exception, such as an auction or ticket purchase, etc, then this hard-imposed time limit is necessary, so in these circumstances, we do not need to provide any user with more time
* If the timer is **essential**, it does not require an accessible mechanism as the time limit is part of the system, this I have to say is the least clear of the exceptions, I guess it could mean live content, but I am inclined to think this is also the exception that some sectors will relay on as their exception, online banking for instance, has legal requirements set that they must implement, allowing a user to stay logged in forever or even a for a few hours of inactivity may put the bank at risk of breaking their legal obligations, but also the user at risk of having their account emptied
* If the timer is at least 20 hours, then there is no need to supply an additional mechanisms

So, for the most part, the accessible mechanisms are going to be required on the majority of sites, so we will take a look at those first and then we will dig a little deeper with the Essential Exceptions and Real-Time Exceptions.

## Accessible mechanisms best practices examples

Full disclaimer here, I'm not going to do a code-along thing, on this occasion and the reasons for that are:

* Some of this stuff is backend stuff and whilst I could probably figure it out, it's not really an area I have enough headspace for
* As always, I'm going to be putting the examples on CodePen and I can't use backend stuff on there
* I'm just cobbling something together, this is not going to be production-ready code or anything like that, it's just a working demo, nothing more
* And anything else you can think of to keep me away from PHP and other backend languages :)

### Example 1, turn off the timer

### Example 2, adjust the timer

### Example 3, extend the timer

#### Example 4, plenty of time?

## Timer exceptions
