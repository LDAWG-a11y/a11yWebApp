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
<form class="form" onsubmit="return false;">
  <div class="form__control">
    <label class="input__label" for="pWord">
      <span class="input__label-text">Password (required)</span>
      <span class="input__label-reqs">
        <span>At least 8 characters in length</span>
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
        required
        autocomplete="current-password"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
      >
    </div>
  </div>
  <button class="form__submit" id="submit" type="submit">Submit</button>
</form>
<div class="visually-hidden" id="announce" aria-live="assertive"></div>
```

Hopefully nothing unexpected in there, I'll summarise it below, in case you're curious:

* I'm adding `onsubmit="return false;"` to the `<form>` element, as in Codepen, it replaces the contents of the output container, which may be a bit annoying, so we'll just do nothing in our demo
* We'll wrap both the `<label>` and the `<input>` in a `<div class="form__contol">`, just for styling purposes
* We're showing our password requirements, in text, after the primary label of "Password", it's always better to be up front with any requirements, as nobody will appreciate having to cause an error to find them out. We could have used `aria-describedby`, pointing to a container below the input, but that is more likely to be missed, especially on devices where the on-screen keyboard may pop up and obscure them
* We're wrapping the `input` in a `<div>` as when we add the button we need this to align the `<input>` and `<button>`
* We have the `autocomplete="current-password"` as this is a part of a login form, although if you were creating this for a registration form, you'd need to use `new-password` as the value
* I'm cheating a little and just using the `pattern` attribute to add those password requirements, which is obviously not the most robust way of validating on its own, but as always, we don't have a backend and I don't want to have to write a full JS validation... sorry, not sorry
* We have a submit button
* Finally, we have an empty live region, I'm going for aria-live="assertive", here. The reason being we're only going to inject an alert into here, when the button is pressed and given that a password reveal could be a security issue, we're going to tell our users straightaway. It's usually not ideal to use assertive, due to the interruptive nature, but this is possibly a good use case for anybody using a screen reader that has accidentally clicked it

Obviously, at this stage, it looks a hot mess, so let's tackle the first part of our styling now:

```css
/* basic styles */

 *,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.5;
  font-size: 1.125rem;
}

button {
  cursor: pointer;
}

button,
input {
  font: inherit;
}

/* End basic styles */

.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid grey;
  border-radius: 6px;
  padding: 1rem .5rem;
  max-width: 26rem;
}

.form__control {
  width: 100%;
  max-width: 25rem;
}

.input__label-text,
.input__label-reqs > * {
  display: block;
}

.input__label-text {
  font-size: 1.375rem;
  font-weight: bold;
}

.input__label-reqs {
  display: block;
  margin-bottom: .75rem;
}

.input--password {
  margin-bottom: 1rem;
  display: block;
  border: 2px solid black;
  border-radius: 4px;
  padding: .25rem;
  min-height: 2.5rem;
  width: 100%;
}

.input--password:focus,
.form__submit:focus-visible {
  outline: 3px solid rebeccapurple;
  outline-offset: 2px;
}

.form__submit {
  border: none;
  padding: .375rem;
  border-radius: 4px;
  background-color: rebeccapurple;
  color: white;
}
```

Nothing spectacular in the CSS, we're just making it look reasonably OK. Perhaps the only thing of note are the password requirements. They are just lines of text here, they can't be in a list as they are inside the `<label>` element and it is against the HTML spec to add a list inside that element. We could have made them look like list items, but then they wouldn't be marked up correctly, which is a 1.3.1 Info and Relationships issue, albeit a quite trivial one. We could have put an actual list between the `<label>` and `<input>` and then used `aria-describedby`, but even then, the list would not be communicated as such, to a screen reader user who is focused on the password field, as semantics are not exposed to that attribute.

The above is as always, a case of "Test with actual users", this is something where the words of wisdom from actual screen reader users may highlight some nuance or provide you with a better approach that I failed to consider. Well, that wraps up the basic implementation of our password field, this is what users without JS enabled will experience.

Firstly, we need to add a tiny bit of JS to the <head> section in our HTML to provide us with a hook for our CSS (you may have something similar, already?):

```html
<head>
  <!-- Head stuff -->
  <script>
    document.documentElement.setAttribute('data-has-js', '')
  </script>
</head>
```

Nothing special there, we're just adding a data attribute to the `<html>` element, when JS is available. We're not actually going into tooling here and making sure that the JS we use is supported on the browser, this is something you'd need to do yourself.

Now we'll address the JS functionality, which is actually pretty straightforward:

```javascript
const inputWrapper = document.querySelector('.input__wrapper');
const pWord = document.getElementById('pWord');
const submit = document.getElementById('submit');
const announce = document.getElementById('announce');
const toggleBtnHTML = `<button class="input__toggle" type="button" id="toggle" aria-pressed="false" aria-controls="pWord">
<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M59.715 28.969C59.238 28.176 47.863 9.594 30 9.594S.762 28.176.285 28.969a2.013 2.013 0 0 0 0 2.062C.762 31.824 12.137 50.406 30 50.406s29.238-18.582 29.715-19.375a2.013 2.013 0 0 0 0-2.062ZM30 46.399C16.66 46.398 6.973 33.741 4.398 30 6.968 26.25 16.628 13.602 30 13.602c13.34 0 23.027 12.656 25.602 16.402C53.032 33.75 43.372 46.398 30 46.398Zm0 0"/><path d="M30 16.496c-7.445 0-13.504 6.059-13.504 13.504 0 7.445 6.059 13.504 13.504 13.504 7.445 0 13.504-6.059 13.504-13.504 0-7.445-6.059-13.504-13.504-13.504Zm0 23c-5.238 0-9.496-4.262-9.496-9.496 0-5.238 4.258-9.496 9.496-9.496s9.496 4.258 9.496 9.496c0 5.234-4.258 9.496-9.496 9.496Zm0 0"/><path d="M30 24.824a5.175 5.175 0 1 0 0 10.348 5.174 5.174 0 1 0 0-10.348Zm0 0"/></svg>
<span class="visually-hidden">Show password</span>
</button>`;


inputWrapper.insertAdjacentHTML('beforeend', toggleBtnHTML);
const toggleBtn = document.getElementById('toggle');
inputWrapper.setAttribute('role', 'group');
inputWrapper.setAttribute('aria-labelledby', 'pWord');

toggleBtn.addEventListener('click', () => {
  if (toggleBtn.getAttribute('aria-pressed') === 'false') {
    toggleBtn.setAttribute('aria-pressed', 'true');
    pWord.setAttribute('type', 'text');
    announce.textContent = 'Your password is shown!';
  } else {
    setPasswordDefaults(false);
  }
})

function setPasswordDefaults(ignore) {
  toggleBtn.setAttribute('aria-pressed', 'false');
  pWord.setAttribute('type', 'password');
  if (!ignore) {
    announce.textContent = 'Your password is hidden!';
  }
}

submit.addEventListener('click', () => {
  if (pWord.checkValidity() && pWord.getAttribute('type') === 'text') {
    setPasswordDefaults(true);
  }
  // do validation and/or redirect stuff here
})
```

A quick overview of the above JS:

* We get references to all of the elements we need

  * `inputWrapper` - which will contain the input and button
  * `pWord` - the password input
  * `submit` - the form submit button
  * `announce` - our live region that will announce the password display status
  * `toggleBtnHTML` - a new string of HTML that contains the button markup, including an eye icon in SVG format and some visually hidden text, for the button's accessible name
* We're using `aria-pressed` on the button, so remember not to change the accessible name as that will be confusing for our users
* We're using `aria-controls="[IDRef of password field]"`, to at least do our bit in saying this button controls another element (yeah, I know, it's not widely supported, but it's still the proper attribute)
* We need to use `type="button"` on our new `<button>`, otherwise when we click it, it will attempt to submit the form, so we need to be explicit that it is not a submit button
* We then insert our string of HTML into the `inputWrapper`, with `insertAdjacentHTML`, so it becomes actual HTML, I'm doing this `beforeend`, which means it will injected after everything else within the `inputWrapper` and therefore come after the `<input>` in the page's sequential tab order. I have seen an approach where, with a bit of flexbox ordering, the button comes before the input in the DOM, but after the input visually. I expect the rationale there was to inform a screen reader user of its presence, before they encounter the input? That can be a good call, but again, let actual users dictate the best approach there, I'm keeping it simple and doing so not knowing what actual screen readers would prefer
* Now we need to get a reference to the button, we only had a reference to the string of HTML before, but now it's an element we can store that reference in `toggleBtn`
* The password and the new button are so tightly related that I'm manipulating their wrapping element to become a `role="group"` and getting that group's accessible name from the `<input>`, is this overkill? I have to say I am unsure, in my mind I'm building that relationship where the screen reader support for `aria-controls` falls down and I'm providing a screen reader user a decent clue that there is more than just the input in this group, which may be beneficial to them. You got it, test with your users, they count here and I don't
* Finally, we just have some conditional logic, that is ran when our new button is clicked, if the button's `aria-pressed` value is `false`

  * Set `aria-pressed="true"`
  * Change the `type` attribute of the password field to `text`
  * Inform a user their password is shown, using our live region
* And if that `aria-pressed` value was `true`, when it was clicked, we need to do the inverse of the above, but this time we are using a function `setPasswordDefaults`, as we will need to reuse that functionality and we don't want to repeat ourselves, we're also gonna add an argument as we don't want the message to be announced on successful submit, as typically, a redirect will occur and hearing half a message may be a bit alarming

  * Set `aria-pressed="false"`, so the button returns to its original unpressed state
  * Change the `type` attribute of the password field back to `password`, so it is securely hidden again
  * Inform a user their password is now hidden (only if our`!ignore` argument evaluates to `false`)

That wasn't too much hard work, hopefully it makes sense? we still have a couple of bits to do, but the actual toggle works and everything is announced correctly. Let's ensure that we address that security issue that stores passwords in the browser's autocomplete history, we just need a small bit of JS for that:

```javascript
submit.addEventListener('click', () => {
  if (pWord.checkValidity() && pWord.getAttribute('type') === 'text') {
    setPasswordDefaults(true);
  }
  // do validation and/or redirect stuff here
})
```

So, just a simple click handler on our submit button where we are checking two things:

* We're checking the field is valid, with `checkValidity()`, which will return a boolean value, in this case, we want it to be `true`, before we proceed
* We also check whether the password field has its `type` attribute set to `text`

When both of those conditions are `true`, we call the `setPasswordDefaults(true)` function (I told you we would reuse that), to flip everything back to the more secure defaults, before then doing whatever we need in our auth process, we're passing through `true` here, as we don't want to inject the live region with any text. Remember, my validation approach is brittle by design, here. I'm just using the easiest way of doing this, with HTML5 validation, as I just want to provide a "working" example, but in reality we would use something other than just HTML5 validation, ideally both JS and some of that backend stuff that some people use.

So, that's all of the functionality done, everything works as we intended it to, it's progressively enhanced, so our users that may have disabled JS will still get that minimum viable experience and the users that do have JS enabled get the additional functionality.

One last thing to do, we made it look a bit naff, as we don't have any styles related to the button, so let's smarten it up a bit:

I've done the final few CSS declarations, but I'm not totally happy with the focus indicators for the adjacent elements, I dislike how they overlap the other element, if this were me building this for production, I'd come up with something a little nicer, but it works and it is obvious where focus is.

Also note that I added a small animation to the eye icon, just because it's little and not jarring so it shouldn't cause any issues at all. The CSS I'm adding here can simply go at the end of the earlier CSS file

```css
.has-js .input__wrapper {
  display: flex;
}

.has-js .input--password {
  border-right: none;
  border-radius: 4px 0 0 4px;
}

.input__toggle {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rebeccapurple;
  border-radius: 0 4px 4px 0;
  height: 2.5rem;
  background-color: rebeccapurple;
}

.input__toggle::before {
  content: "";
  position: absolute;
  height: 2.5rem;
  width: 0;
  border-left: 4px solid white;
  transform: rotate(45deg) scaleY(0);
  transition: transform 300ms ease-in;
}

.input__toggle[aria-pressed="true"]::before {
  transform: rotate(45deg) scaleY(1);
}

.input__toggle svg {
  height: 2rem;
  width: 2rem;
  fill: white;
}

.input__toggle:focus-visible {
  outline: 3px solid rebeccapurple;
  outline-offset: 2px;
}
```

So, that's it and there we have it, pretty simple and straightforward, but it works well.

## Final considerations

There are definitely some things to consider here, maybe there are improvements to be made? If i were in a position to use this on a project and I had colleagues on my team that were native screen reader users or we had some budget to pay for user testing I'd want to know if three of my assumptions were correct or I could do better:

* Does the `role="group"` add any value or is it a bit of overkill?
* Would it be more useful if the `<button>` came before the `<input>` in the focus order?
* Was using `aria-live="assertive"` a good call?

I'd be happy to be wrong on any of those and would of course make any necessary changes required after feedback. 

## Codepen
