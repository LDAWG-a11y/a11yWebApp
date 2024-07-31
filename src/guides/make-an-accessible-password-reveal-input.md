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

Oftentimes it's useful to be able to tell if we entered the correct password on a login form, right? I mostly use a password manager, so most of my passwords are auto-filled, but not every password I use is in my password manager, I commit a couple to memory, as these are the ones I don't want to save. I obviously then have to type these out when I log into those accounts and I often make mistakes when doing that.

If I'm sitting at my desk, I can just inspect the HTML and/or change it to reveal my password, but most of the time I do this, I'm actually on my phone and I can't do that. I don't know why I make so many errors with my typing on my phone, I don't even have large thumbs, it's probably related to my denial I need glasses, though, but that's another story.

This obviously isn't about me, it's about everyone. I do benefit from a reveal password toggle for the reason I just mentioned, but so many people benefit from this functionality, for so many different reasons:

* Users who may have motility disabilities
* Users with vision disabilities
* Users with memory or other cognitive disabilities
* Users with reduced hand to eye coordination

In fact, most folk can benefit from these, as once we enter the problem solving stage of "Why won't you let me in?", it's kinda nice to be able to press a button and at least see or hear that our password matches what we meant to type, right?

It's actually super simple to make a password toggle, but of course, you're not here for super simple, you're here for inclusivity, for something that considers as many users as possible, right? Cool, then let's discuss what we need to consider before we dive into any code.

## Accessibility considerations

Obviously we are all here for the common good and we want to make the input and its functionality work for all, so let's list some primary considerations.

* We only need two elements for this, a simple password input and a button
* Both elements need suitable focus indicators
* Both elements need accessible names
* Both elements need visible labels (or possibly iconography - for the button)
* Both elements need decent contrast against the page background
* Communicate any password requirements ahead of time
* We need a robust way to announce the password is hidden or displayed, to screen reader users

## Security considerations

Perhaps the first security concern is one that can affect everybody and that is when we change the `<input>`'s type attribute from \`text\` to \`password\`, we are creating a vulnerability, which is actually fine until the point the users submits. It then becomes an issue as we are no longer masking the password and we are submitting plain text and the browser may remember that. Think of the times you have used an input on a site, where you may have typed several things into this input and the browser's own autocomplete list appears, with previously typed suggestions. This may not be a huge issue on your own device that nobody else has access to, but a shared device could allow someone else to discover your password. I'm not sure if this would be an issue on a shared computer in a cafe or library, I honestly don't know if they save that kind of thing between sessions. It may be an issue if you let your kid play games on your phone and the little cherub kindly orders £200 worth of V-Bucks or Candy Crush credit, etc? Whatever the reason, I'm sure it's best to avoid it. [I actually learned about this from this GDS article from a few years back and it was really informative.](https://technology.blog.gov.uk/2021/04/19/simple-things-are-complicated-making-a-show-password-option/)

Another consideration is screen reader users, especially those with very low or no vision. It is entirely possible that they could toggle the field by accident or like anybody else, simply forget they toggled it. Unfortunately, shoulder surfing is a thing, somebody may watch over somebody's shoulder and look at the input data they have entered and then use that to access their accounts. Firstly, lemme say that I have absolutely no doubt that a screen reader user will be as security conscious as the rest of us. They are not going to be sitting on a train, using their phone without earphones entering their password and email into their banking app for a carriage full of strangers to hear. I guess most of the concern here is either the user accidentally toggling or simply forgetting and then somebody peering over their shoulder.

Where a sighted user would see the toggled password and "should" then be aware they may need to take action to hide it, a screen reader user may appreciate a little more that the announcement they get from the \`aria-pressed\` attribute. Alls we want to do here is provide an explicit warning or status message just to make sure our screen reader user is aware of the password's visibility.

When a password field has characters input into it, the browser's own security masks these characters and they appear as large dots. A screen reader user navigating by character within that field will hear "Star, Star..." or words to that effect (depending on screen reader/browser). The moment we remove that masking, the characters are displayed as plain text and of course a screen reader user would then hear the literal characters, should they navigate within the field.

## So, let's build something

As an aside, we will have to put this in a form, with a submit button, as we need to demonstrate the functionality, as always, it will just be on CodePen, I don't have any personal worries about CodePen, but still, just to be safe, don't go entering any of your actual passwords into any inputs. We need the `<form>` element as we need a submit button, so we can run a simple check before we allow the submission. As always, we will build this with progressive enhancement in mind, it'll work just fine as a password input when JavaScript is turned off, it just won't have the toggle functionality, as we need the JS to do that for us.

As always, we will start with the good old HTML (I don't know why I always say this as starting with CSS or JS would be pretty challenging, right?):

```html
<form>
  <div class="form__control">
    <label class="input__label" for="pWord">
      <span class="input__label-text">Password</span>
      <span class="input__label-tip">
        <span>Between 8 and 16 characters in length</span>
        <span>Must contain at least 1 number</span>
        <span>Must contain at least 1 lowercase letter</span>
        <span>Must contain at least 1 uppercase letter</span>
      </span>
    </label>
    <div class="input__wrapper">
      <input 
        class="input--password"
        id="pWord"
        type="password"
        autocomplete="current-password"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8, 16}$"
      >
    </div>
  </div>
  <button class="form__submit" type="submit">Submit</button>
</form>
```

Hopefully nothing unexpected in there, I'll summarise it below, in case you're curious:

* We'll wrap both the `<label>` and the `<input>` in a `<div class="form__contol">`, just for styling purposes
* We're showing our password requirements, in text, after the primary label of "Password", it's always better to be up front with any requirements, as nobody will appreciate having to cause an error to find them out. We could have used `aria-describedby`, pointing to a container below the input, but that is more likely to be missed, especially on devices where the on-screen keyboard may pop up and obscure them
* We're wrapping the `input` in a `<div>` as when we add the button we need this to align the `<input>` and `<button>`
* We have the `autocomplete="current-password"` as this is a part of a login form, although if you were creating this for a registration form, you'd need to use `new-password` as the value
* I'm cheating a little and just using the `pattern` attribute to add those password requirements, which is obviously not the most robust way of doing that on its own, but as always, we don't have a backend
* Finally, we have a submit button

Obviously, at this stage, it looks a hot mess, so let's tackle the first part of our styling now:
