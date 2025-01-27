---
title: Outta time? Providing users with adjustable time mechanisms to meet WCAG
  2.2.1 Timing Adjustable (Level A)
summary: Setting time limits on websites can be problematic for many users, in
  some cases, it can be a barrier, it prevents the user from completing tasks,
  due to their disability, especially if there is not a mechanism to extend or
  turn off the time limit
author: dlee
date: 2025-01-27
toc: false
tags:
  - HTML
  - JavaScript
  - Adapting websites
isGuide: true
---
## Intro

You must do the thing now, you cannot get distracted and you must do it at a speed that we deem "slow enough", is perhaps the train of thought that some product teams and developers have when implementing various time out mechanisms (not me, I don't think that).

We have all likely encountered these mechanisms whilst using various sites or apps, sometimes we may be provided with a hard limit on how long we have to complete a given task, others it may be due to a period of inactivity and others it may be that information simply doesn't stay on the screen long enough for us all to read and process it. Perhaps the first thing that comes to mind with WCAG 2.2.1 Timing Adjustable (A) success criterion is 'session timeouts', although this success criterion does not focus solely on session timeouts, it's for anything on a website or app that may impose some kind of timed limit upon the users. there are of course exceptions and these are called 'real time exceptions' and 'Essential exceptions', in the SC, some examples are:

* Auctions, think eBay and similar sites, whether the user has a disability or not, the auction has to end at a given moment in time in order for it to be "fair" to all
* Security, there are some instances where security implications may require a user to be active for the session or task to remain open, as leaving the user logged in forever could ultimately allow a bad actor to access the user's private or financial information and in some cases, drain their accounts. We'll dig a bit deeper into the security aspect, later, as it contains what we believe to be some nuance
* Booking systems, you've made it, you got through the annoying booking site's seemingly never-ending queue, you were once in position 56,782 to buy tickets to some hot gig, show, movie or whatever and now you have two tickets in your basket, you have just 10 minutes to complete the transaction, otherwise they're gone. Whether you have a disability or not, this is kinda necessary, otherwise everybody would just reserve tickets in their carts until the day before the event, just in case something came up and they couldn't go
* Games, some games can be played on websites, so depending on jurisdiction they could well be in scope of WCAG, but they would not necessarily be in of this SC, as it may be a part of the game that a user has a set amount of time to respond, some turn-based games may require a user to make their move within, for example, 60 seconds. This is of course part of the game, so the timing feature would apply here. That's not to say some games could perhaps have a lounge with no time limits, but that wouldn't work for all games of course

The above is just a handful of examples, but there are undoubtedly many more. Many of us may consider timeouts to just be part of the web, often that is quite valid, if they are there to protect us, but oftentimes they are quite unnecessary. As an example, I have dozens of apps on my phone for a variety of purposes, I remain logged in on each of them and that works for me. If I need to purchase something from somewhere, I don't have to go into my password manager to find out what password i used for a particular store. I do get logged out of my banking app, which I personally view as a good thing, as if I were to lose my phone and it was unlocked, I'd hate to think somebody could just transfer money to an account I know nothing of.

One final consideration that we will take a look at, is if there is a valid reason for an exception, that doesn't get you off the hook for other SCs, as an example, 4.1.3 Status Messages (AA) will still apply in most instances, as if I can see a timer of some description on the screen which visually informs me that I have limited time, then naturally, the same information will need to be exposed to screen reader users, or if it changes to red text to indicate impending doom is extremely close, then we of course need to consider contrast etc. We'll also take a look at these aspects, a little later.

## The impact of timeouts on users with disabilities

* Blind or low vision users may need extra time to locate things on the screen whereas a user with reasonable sight may just be able to scan the screen and find the relevant control or information.
* Users with motility disabilities may not be able to physically respond in the given time limits, this could be because they are using an assistive device such as a mouth stick, a sip and puff device or a switch, etc
* Deaf users may have a sign language interpreter in person ,or in another window or device and they may require that additional time so they can watch the interpreter explain something and then commence the task
* Users with cognitive disabilities may simply just require more time because they have difficulty understanding something and need longer to digest the question or look it up, they could become easily distracted and not be able to maintain focus for what is too short a time for them, and perhaps the pressure of imposed time limits could exacerbate their stress levels, making focussing much more difficult
* In some instances a user may be required to obtain some form of other information to complete the task, this could be something like "go take a photo of your passport to prove you are who you say you are", if you have a cognitive disability, you may have put it somewhere and forgotten, if you are blind maybe you would need to use a service such as Be My Eyes to ensure the passport is in shot, maybe if the user lives in supported living, somebody keeps that document safe for them and they need to nip and ask, maybe if the user has a physical disability they may have to use a lift or stair lift to go to a different floor to grab it from where they keep it safe

Again, these are just a handful of examples, some were from the WCAG SC and others were just examples I could think of, which I have learned from my time in this field, but as always, users with disabilities may be affected in more ways than I could think of, as their lived experiences are unique to them.

## Providing users with accessible mechanisms

I'll summarise the WCAG exceptions, just to refresh our memories:

* If a user can **turn off** the timer altogether and they encounter this mechanism before they encounter the time out, then this is an accessible mechanism. Let's imagine we have a site and in the User Account Settings, for some reason we only let that user look at their own personal info for 10 minutes. We could provide a control, on the page, which precedes the main content and it could be a toggle or a checkbox "Keep me logged in" or words to that effect. This would give the users all of the time they need to do whatever they wanted or needed to do. This is a pretty simple mechanism that can make the world of difference to our users
* If a user encounters a control of some sorts that precedes the main content that enables them to **adjust** the timeout by at least 10 times its original duration, this too would be an accessible mechanism, again, it could be a checkbox or toggle switch, etc and it could have a label such as "Extend my time limit to 100 minutes" (using the original 10 minute example * 10)
* If a user can **extend** the timeout with a simple action (the WCAG example gives pressing the <kbd>Space</kbd> key as a simple action and they are given at least 20 seconds to press that key and upon pressing that key, it extends the timeout to 10 times its original duration, then this too is an accessible mechanism. This could of course be a dialog that:

  * Appears on screen visually, with a text instruction, my interpretation is it is just one key to press, not move focus to a dialog and then expect a user to find the 'Extend' button, a simple key press only (or tap on a touchscreen)
  * Is also clear to all users that this warning is present on the screen, there are various ways to achieve this, a dialog should receive focus, so would announce that new information, a simple message could be announced via a "Live region" or similar. It's important that all users are made aware of the requirement to press a key, tap on the screen or whatever, to remain logged in
  * But, consider the device type a user is accessing the site on, don't tell a user on an iPad to press <kbd>Space</kbd>, because they may or may not have a keyboard, so we could just say "tap the screen or press any key to remain logged in" or words to that effect
* If there is a real-time-exception, such as an auction or ticket purchase, etc, then this hard-imposed time limit is necessary, so in these circumstances, we do not need to provide any user with more time, but we should absolutely inform users how long is remaining
* If the timer is **essential**, it does not require an accessible mechanism as the time limit is part of the system, this I have to say is the least clear of the exceptions, I guess it could mean live content, but I am inclined to think this is also the exception that some sectors will rely on as their exception, online banking for instance, has legal requirements set that they must implement, allowing a user to stay logged in forever or even a for a few hours of inactivity may put the bank at risk of breaking their legal obligations, but also the user at risk of having their account emptied
* If the timer is at least 20 hours, then there is no need to supply an additional mechanisms

So, for the most part, the accessible mechanisms are going to be required on the majority of sites, so we will take a look at those first and then we will dig a little deeper with the Essential Exceptions and Real-Time Exceptions.

## Accessible mechanisms best practices examples

Full disclaimer here, I'm not going to do a code-along thing on this occasion and the reasons for that are:

* Some of this stuff is backend stuff and whilst I could probably figure it out, it's not really an area I have enough headspace for, so I'm just cobbling together in JavaScript, please don't copy my code, it's trash
* As always, I'm going to be putting the examples on CodePen and I can't use backend stuff on there
* And anything else you can think of to keep me away from PHP and other backend languages :)

### The timer non-exceptions

Initially I was going to create three examples, one to turn off the timer, one to extend by 10 minutes and one with a warning that allowed a user to tap the screen or press a key to remain "logged in". In the end I just put those all on the same page, as it would seems easier to follow being able change the settings compare the three accessible mechanisms, all on the same page. I have a set of events set, so any keypress, any moving of the mouse, clicking mouse buttons, interacting with a touchscreen or scrolling the page, will always reset the inactivity timer.

There are a series of inputs on the page, that I have prepopulated with nonsense, for the purposes of this demo, let's just pretend that we had only just typed these out and then got distracted. When the timer actually runs out, quite annoyingly, those inputs are cleared, just to demo how rubbish things often are

* The countdown timer is at the top of the main content, below the header area
* The countdown timer will always start at 60 seconds, which yes, is a very low number, but I cannot tell you how many hundreds of hours I have wasted staring at screens, waiting for a timer to reappear, only for somebody to call me and I miss it again or whatever, so we're going short in our examples.
* There are four buttons at the top of the page, which provide the functionality for this demo:

  * Turn off timeouts: Does exactly what you would expect, that timer that was going to "log" you out, will cease to bother you anymore
  * Adjust timeouts (x10): This will change the timer duration to 10 minutes, as our initial duration was 1 minute
  * Warning mode" Perhaps not the most creative of names, this is the only mode that will provide a warning that the user is going to be logged out. A modal will appear and the instruction will be to tap the screen or press any key to remain logged in. The timer itself will continue to run in the background and this will displayed in our modal. I removed the events that reset the timer for moving the mouse or scrolling on this particular mode, as I wanted to keep it true to the instruction, so the user would need to press a key or tap the screen to cancel this warning (I'm not saying this is how we should do it, it's purely for this example)
  * Reset: This will set the page back to its initial state, so you can start from scratch, so to speak. It will also repopulate the inputs
* When the timer hits 30 seconds the time remaining will turn red, to indicate urgency, this is of course also announced. I used an assertive aria-live region, for this, I'm not saying that is the best course of action, I just added it in to ensure it was announced straightaway, as the clock is always ticking and the session timeout is intentionally short.

Remember, this is just a "working" example, it's not meant for copying the code as a real session timeout would have more moving parts, backend and perhaps AJAX, etc. The next section has the Codepen with the mechanisms.

## Accessible timeout mechanisms

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="emObypB" data-pen-title="Accessible timeout mechanisms" data-preview="true" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">

<script async src="https://public.codepenassets.com/embed/index.js"></script>

## Wrapping up

We mostly focussed on session timeouts here, I was going to create a news ticker and a slider, but, well, I opted against those, for good reason. That is not to say that these components are any less worthy of a live example, more that we only have one success criterion to fail a session timeout against, whereas tickers and auto-galleries we can also fail against 2.2.2 Pause, Stop, Hide (A) and that's because it is animated and at least in my case I will immediately reach for the Pause, Stop, Hide SC, as that kind of thing can actually cause significant physical problems for a user, such as seizures and in some cases, a seizure could be severe enough to kill a user. I thought it would have been difficult for me to implement a slider, without making it, well slide and that runs the risk of me causing an issue to a user and that's not something I was willing to do.

I guess what you should be asking is, do we need a timeout, do we need to limit how long somebody has to consume information and can we do this another way? Sure, the answer will not always be to remove a timeout if there is a genuine security need or an exception, but in some instances perhaps they can be removed. We often encounter them and sometimes they don't seem necessary and perhaps most annoyingly, they just spring up on you, without warning. Often i am typing up an issue in a document, I turn to look at the site I am testing and I am logged out, a warning would have been nice, huh?

* So, if your site doesn't need to have a session timeout, probably just remove it
* If you have good reason to want a session timeout, but don't actually "need" one, give users the ability to either remove it, or turn it off
* If you absolutely need one, for security, privacy or something else, warn users, give them a heads up, give them adequate time to respond with a single keypress or a tap, etc

Whilst the banking apps are unlikely to extend the session by 10 times after a keypress, etc, as at least in the UK I believe the hard limit is 5 mins of inactivity, if a user if forewarned of this, they may be able to plan accordingly. At the start of the flow, tell them everything they will need, which supporting documents, whether they will need to verify their ID or take a photo, etc Also let them know that if they don't interact with the application for 5 minutes, they will be logged out. Life happens, we all get distracted from time to time, a knock on the door, a call, kids, pets, partners, colleagues, whatever. 5 minutes is short, consider saving any progress the user has made, so they do not have to start again. Most of all, always provide a warning, don't just log a user out without a warning, their finger may have been 0.3mm away from tapping the screen.
