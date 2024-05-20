---
title: How we built our user preference settings
summary: "The user preference settings we developed aim to give granular control
  to our site's presentation for disabled and abled users alike. The aim was to
  provide users with controls that can adjust the presentation, usability and
  accessibility of the site, so it is presented in a way that works for them. "
author: dlee
date: 2024-04-23
toc: false
tags:
  - Case study
  - JavaScript
  - CSS
  - Adapting websites
isGuide: true
---
## Intro

For those of you that have visited our site before, you may have noticed it has recently undergone a complete redesign, we added some new features, restyled the presentation, made further enhancements to the accessibility and usability of the site and also increased page performance a little.

Why did we do this? Well, MTA has grown a little since we first developed it a couple of years ago, we have collaborations with some awesome organisations, we now have quite a lot of content that was perhaps getting difficult to find and last, but certainly not least we are always keen to improve the accessibility of this site and as accessibility can never be "done", it was a good opportunity to discover where improvements could be made.

One particular feature that we're going to focus on is our user preferences settings, these can be accessed by activating the Settings button in the site header (visually identified as a cog). Upon activating said button a modal overlay appears (No, not that type of overlay), with several groups of controls that change multiple aspects of the site's presentation. I do have to concede here that they are at this stage, primarily controls for visual changes. Perhaps there is some scope for changes that may help users with motility or cognitive issues, which I would be super keen to implement if anybody could think of anything that would make a meaningful impact for our users. If you think of anything, please do feel free to contact us, using the email in the site's footer.

## Disambiguation time

It's likely a given that if you are here, reading this, you are in some way involved or connected to digital accessibility? So, making the assumption encourages me to make one more, we all know what overlays are, right? I'm just gonna generalise a bit, as I don't fancy getting involved in any litigation.

So an overlay is generally something magic, when I say magic, I of course mean deceptive and a bit of trickery that doesn't really trick those in the know who understand how the smoke, mirrors and distractions work in illusions.

These overlays do offer quite a bit of customisation for users, you can change various aspects of presentation, have content read aloud, modify colours and text, all sorts really. Some users may find some of these controls useful, others may actually be adversely affected by them, one thing that is for sure is they don't actually make an inaccessible site "accessible", much like sticking a Lamborghini badge on a clapped out Lada doesn't make it a supercar, it'd still be a banger, just with a badge that fools nobody.

You may have noticed that there are some similarities to our preferences, in that something "overlays" the screen and you can modify several aspects of the presentation of our site. This is where I want to disambiguate the differences:

I built this site with an accessibility first approach, it was absolutely the most important consideration all the way through the initial build and the new redesign. I tested, I researched and tested again. I constantly had to review design elements, as I could not get them to quite meet the accessibility criteria I aimed for. As an example, all text on this site actually meets SC 1.4.6 Contrast Enhanced (AAA), that actually limited me quite a bit design-wise. It became a challenge at times, but challenging in a fun way, trying to make the site look pretty good whilst maintaining a high contrast ratio was a fun task for somebody who isn't a designer. I am not saying the accessibility of the site is perfect, but I did squeeze in as many AAA criteria as I reasonably could.

Some of the AAA criteria actually recommend providing ways for users to adapt certain aspects of the presentation, we already did this for the site themes, so it was just an extension of that really. I definitely didn't take any inspiration from overlays, it was AAA and AA criteria, some things that we as a team thought may be useful and some inspiration was taken from some other cool sites across the web. 

These settings are by no means our sticking plaster, the site was built using an accessibility-first approach, the settings are nothing more than preferences, a user can choose to use them, or choose not to, they do not affect anything else. We cannot track usage of these preferences and we have no desire to do that, they're just an option that some folks may find useful and others may not care for. So just to clarify, this is not an overlay, it's completely custom and was built to complement a site that aims to be as accessible as possible.

## Can't we just use the browser settings for most of this?

Sure, some of the features are actually available in browsers, but is everybody "tech savvy" enough to know where to find those options? What about users using a mobile or tablet on a browser that does not allow extensions (Chrome?) how do they increase the text-spacing on a mobile? It's easy enough to do on a desktop/laptop browser, assuming the user knows what an extension is, how to find it, install it and use it, but Google don't let us install extensions on mobile, so perhaps there is some use for our users there?

I'm knocking on a little bit now, my vision is not as good as it once was. When I wake up in the morning, I tend to doom scroll on my phone whilst consuming copious amounts of coffee. I hate to admit that text on my phone is often a little blurry and somewhat difficult to read, especially in the mornings. I know how to increase the font size in my browser, but that's a global setting, it applies to every site I visit and at this stage, some sites have decent enough sized text that it isn't a problem for me to read, so I don't want a global setting as i don't want to affect the layout of every site.

Go to an optician, I hear you say? I did before and I just could not get on with the glasses, so I returned them. I did get a bigger phone though, which helps, but now I'm pretty much at the limit of how big a phone can be and I doubt an iPad would fit in my pockets, so I'll have to get some more glasses in the near future.

Obviously I didn't implement the ability to adjust the text size for me, I did it for our users, there is a similar feature on Twitter (nope, I'm still not calling it by it's new name), whereby I can increase the font size. I actually do use that and it helps the text become more readable to me. Obviously I am not the only person that benefits from that option, a whole host of folks likely do, whether that be due to a visual disability, a reading disability, getting a bit old or just just because they prefer it that way.

What about motion? The media query we apply in CSS is called `prefers-reduced-motion`, it's not called `prefers-no-motion`, but what if a user does actually prefer no motion? Some folks undoubtedly will want the ability to turn off all motion and transitions, so we provide that as an option. Can this be done in the browser? Well we definitely could with a portable stylesheet or a bookmarklet, but I'm unaware of a setting that turns off all motion, so if this option benefits just one user, it was worth it to us.

## Okay, how did you build it?

Okay, so my mind set here was to develop these preferences using JavaScript and LocalStorage, pretty standard fare really. Essentially just using a similar pattern to what what we did for the site theme switcher, but just that little more extensible. As is common with websites oftentimes we want to add new features at a later date, perhaps a user may request something that helps them a little, perhaps there is something obvious I have missed, perhaps WCAG will introduce new ideas when version 3.0 starts to take its final form?

So, the idea was to create reusable functionality, that will likely ever only require CSS modifications and not require any faffing around refactoring the JavaScript to add a new preference, I guess a fire-and-forget approach was what I wanted to achieve.

### My approach

At the basic level, all we really do is add a data-attribute or class to the `<html>` or `<body>` element in most cases, so we have a handy hook for our CSS, so this isn't really anything revolutionary.

First we'll create the buttons that toggle our preference, we're just going to create one preference to start with, as then I can demonstrate how easy it is to add another, a little later on. the first example will be for changing our site's font size:

```html
<fieldset class="settings__fieldset">
  <legend class="settings__legend">Font size</legend>
  <button aria-pressed="false" data-pref="f-size large">Large</button>
  <button aria-pressed="false" data-pref="f-size unset">Unset</button>
  <button aria-pressed="false" data-pref="f-size largest">Largest</button>
</fieldset>
```

* We wrap our controls in a `fieldset`, so we have a programmatic grouping association
* We add a `legend`, as users tend to want to know what something is going to do before they interact with it
* We add our three buttons:

  * One for large text
  * One for resetting or unsetting font size back to the site's default
  * One for largest text
* We add some very specific data-attributes

  * We add a data-attribute to each called `data-pref` and the value of each is an identifier and a value, which are space separated. So for us `f-size` simply means font size and the value is either `large`, `largest` or `unset`
* We then add `aria-pressed` to each button, as we require a state to inform users programmatically that the element is a toggle-able button. in the HTML, we're just setting them all as `false` as we will eventually listen for a page `load` event and set `true` to the correct one. In this implementation, there will always be one which has the value set to `true`

Obviously you can use class names and any data attribute names you wish, they just need to be consistent as will become apparent later

Now let's just get a JS reference to the button elements we will be using in our functions:

```javascript
const prefsBtns = document.querySelectorAll('[data-pref]');
```

We store a reference to to all of the `<button>`s , we can just use the `data-pref` attribute to get that collection

Now we will add the functionality:

```javascript
// Loop through all prefBtns
prefsBtns.forEach(btn => {
// Listen for click events
   btn.addEventListener('click', () => {
// When clicked toggle aria-pressed to true
   btn.setAttribute('aria-pressed', 'true');
// Get the identifier and value from the data attribute and split at the space character
   const pref = btn.getAttribute('data-pref').split(' ');
// If the value [1] of the clicked btn is not 'unset', add a data attribute to the html element
// prefix 'data-pref--' and add the identifier [0], then the value becomes value [1] of the
// button's data-attribute value [1]
   if (pref[1] !== 'unset') {
     document.documentElement.setAttribute(`data-pref--${pref[0]}`, pref[1]);
// Let's just add that same data attribute & value to localStorage
     window.localStorage.setItem(`data-pref--${pref[0]}`, pref[1]);
// If the value [1] is unset, remove the attribute from the html element and remove the entry
// From local storage
   } else {
      document.documentElement.removeAttribute(`data-pref--${pref[0]}`);
      window.localStorage.removeItem(`data-pref--${pref[0]}`);
   }
// We send the clicked button to an as yet unwritten function, comment this out if
// you're coding along
     togglePrefsBtns(btn);
  })
})
  
```

Hopefully that makes sense? If you are following a long in a code editor, you will notice that we are now adding our data attribute to the `<html> `element and if you look in `localStorage`, we are also adding it there. If we select "Unset" we remove the attribute from the `<html>` element and `localStorage`.

Next we will make sure that when one button is clicked, it's sibling buttons are set to `aria-pressed="false"`, so we're just gonna build a small function, we called it in the previous step and we hadn't declared it, so let's do that now.

```javascript
// Declare our function that accepts the clicked button, from the previous step
const togglePrefsBtns = (btn) => {
// Get the closest fieldset (its parent) and search for all buttons inside
  btn.closest('.settings__fieldset').querySelectorAll('button').forEach(prefBtn => {
// get all buttons in the fieldset that aren't the clicked button
    if (prefBtn !== btn) {
// Set aria-pressed to false
      prefBtn.setAttribute('aria-pressed', 'false');
    }
  })
}
```

So, now we can only have one button per group set to aria-pressed="true", which was the goal
