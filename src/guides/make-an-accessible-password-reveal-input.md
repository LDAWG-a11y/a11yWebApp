---
title: Make an accessible password reveal input
summary: Password reveals are useful for many of us, if we type in a password,
  but think we may have mistyped it, it's useful to check. How do we make this
  accessible to everybody? Let us take a look
author: dlee
date: 2024-07-24
toc: false
tags:
  - HTML
  - JavaScript
  - CSS
isGuide: true
---
## Intro

I mostly use a password manager, so most of my passwords are auto-filled, but not every password I use is in my password manager, I commit a couple to memory, as these are the ones I don't want to save. I obviously then have to type these out when I log into those accounts and I often make mistakes when doing that.

If I'm sitting at my desk, I can just inspect the HTML and/or change it to reveal my password, but most of the time I do this, I'm actually on my phone and I can't do that. I don't know why I make so many errors with my typing on my phone, I don't even have large thumbs, it's probably related to my denial I need glasses, though, but that's another story.

This obviously isn't about me, it's about everyone. I do benefit from a reveal password toggle for the reason I just mentioned, but so many people benefit from this functionality, for so many different reasons:

* Users who may have motility disabilities
* Users with vision disabilities
* Users with memory or other cognitive disabilities
* Users with reduced hand to eye coordination
* Users with limited dexterity

In fact, most folk can benefit from these, as once we enter the problem solving stage of "Why won't you let me in?", it's kinda nice to be able to press a button and at least see or hear that our password matches what we meant to type, right?

It's actually super simple to make a password toggle, but of course, you're not here for super simple, you're here for inclusivity, for something that considers as many users as possible, right? Cool, then let's discuss what we need to consider before we dive into any code.

## Accessibility considerations

Obviously we are all here for the common good and we want to make the input and its functionality work for all, so let's list some primary considerations.

* We only need two elements for this, a simple password input and a button
* Both elements need suitable focus indicators
* Both elements need accessible names
* Both elements need visible labels (or possibly iconography - for the button)
* Both elements need need decent contrast against the page background, but there are other 
* We need a robust way to announce the password is hidden or displayed, to screen reader users

## Security considerations

Perhaps the first security concern is one that can affect everybody and that is when we change the `<input>\`'s type attribute from \`text\` to \`password`, we are creating a vulnerability, which is actually fine until the point the users submits. It then becomes an issue as we are no longer masking the password and we are submitting plain text and the browser may remember that. Think of the times you have used an input on a site, where you may have typed several things into this input and the browser's own autocomplete list appears, with previously typed suggestions. This may not be a huge issue on your own device that nobody else has access to, but a shared device could allow someone else to discover your password. I'm not sure if this would be an issue on a shared computer in a cafe or library, I honestly don't know if they save that kind of thing between sessions. It may be an issue if you let your kid play games on your phone and the little cherub kindly orders £200 worth of V-Bucks or Candy Crush credit, etc? Whatever the reason, I'm sure it's best to avoid it. [I actually learned about this from this GDS article from a few years back and it was really informative.](https://technology.blog.gov.uk/2021/04/19/simple-things-are-complicated-making-a-show-password-option/)

Another consideration is screen reader users, especially those with very low or no vision. It is entirely possible that they could toggle the field by accident or like anybody else, simply forget they toggled it. Unfortunately, shoulder surfing is a thing, somebody may watch over somebody's shoulder and look at the input data they have entered and then use that to access their accounts. Firstly, lemme say that I have absolutely no doubt that a screen reader user will be as security conscious as the rest of us. They are not going to be sitting on a train, using their phone without earphones entering their password and email into their banking app for a carriage full of strangers to hear. I guess most of the concern here is either the user accidentally toggling or simply forgetting and then somebody peering over their shoulder.

Where a sighted user would see the toggled password and "should" then be aware they may need to take action to hide it, a screen reader user may appreciate a little more that the announcement they get from the \`aria-pressed\` attribute. Alls we want to do here is provide an explicit warning or status message just to make sure our screen reader user is aware of the password's visibility.

## So, let's build something

As an aside, we will have to put this in a form, with a submit button, as we need to demonstrate the functionality, as always, it will just be on CodePen, I don't have any personal worries about CodePen, but still, just to be safe, don't go entering any of your actual passwords into any inputs.
