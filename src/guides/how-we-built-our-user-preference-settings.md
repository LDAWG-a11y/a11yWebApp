---
title: How we built our user preference settings
summary: "The user preference settings we developed aim to give granular control
  to our site's presentation for disabled and abled users alike. The aim was to
  provide users with controls that can adjust the presentation, usability and
  accessibility of the site, so it is presented in a way that works for them. "
author: dlee
date: 2024-05-24
toc: false
tags:
  - Case study
  - JavaScript
  - CSS
  - Adapting websites
isGuide: true
---
## Intro

For those of you that have visited our site before, you may have noticed it has recently undergone a complete redesign, we added some new features, restyled the presentation, made further enhancements to both the accessibility and usability of the site and also increased page performance a little.

Why did we do this? Well, MTA has grown a little since we first developed it a couple of years ago, we have collaborations with some awesome organisations, we now have quite a lot of content that was perhaps getting difficult to find, and last but certainly not least we are always keen to improve the accessibility of this site and as accessibility can never be "done", it was a good opportunity to discover where improvements could be made.

One particular feature that we're going to focus on is our user preferences settings, these can be accessed by activating the Settings button in the site header (visually identified as a cog icon, within a button). Upon activating said button a modal overlay appears (No, not that type of overlay), with several groups of controls that change multiple aspects of the site's presentation. I do have to concede that they are at this stage, primarily controls for visual changes. Perhaps there is some scope for changes that may help users with motility or cognitive issues, which I would be super keen to implement if anybody could think of anything that would make a meaningful impact for our users? If you think of anything, please do feel free to contact us, using the email in the site's footer.

## Disambiguation time

It's likely a given that if you are here reading this, you are in some way involved or connected to digital accessibility? So, making that assumption encourages me to make one more, we all know what overlays are, right? I'm just gonna generalise a bit, as I don't fancy getting involved in any litigation.

So an overlay is generally something magic, when I say magic, I of course mean deceptive and a bit of trickery that doesn't really trick folks that understand how the smoke, mirrors and distractions work in illusions.

These overlays do offer quite a bit of customisation for users, you can change various aspects of presentation, have content read aloud, modify colours and text, all sorts really. Some users may find some of these controls useful, others may actually be adversely affected by them, one thing that is for sure is they don't actually make an inaccessible site "accessible". I guess it is similar to sticking a Lamborghini badge on a clapped-out Lada, it wouldn't make it a supercar, it'd still be a banger, albeit a banger with a prestigious badge.

You may have noticed that there are some similarities to our preferences, in that something "overlays" the screen and you can modify several aspects of the presentation of our site. This is where I want to disambiguate those differences:

I built this site with an accessibility-first approach, it was absolutely the most important consideration all the way through the initial build and the new redesign. I tested, I researched and tested again. I constantly had to review design elements, as I could not get them to quite meet the accessibility criteria I aimed for. As an example, all text on this site actually meets SC 1.4.6 Contrast Enhanced (AAA), that actually limited me quite a bit design-wise. It became a challenge at times, but challenging in a fun way, trying to make the site look pretty good whilst maintaining a high contrast ratio was a fun task for somebody who isn't a designer. I am not saying the accessibility of the site is perfect, but I did squeeze in as many AAA criteria as I reasonably could.

Some of the AAA criteria actually recommend providing ways for users to adapt certain aspects of the presentation. We already did this for the site themes, so it was just an extension of that really. I definitely didn't take any inspiration from overlays, it was AAA and AA criteria, some things that we as a team thought may be useful and some inspiration was taken from some other sites across the web. 

These settings are by no means our "sticking plaster", the site was built using an accessibility-first approach, the settings are nothing more than preferences, a user can choose to use them, or choose not to, they do not affect anything else. We cannot track usage of these preferences and we have no desire to do that, they're just an option that some folks may find useful and others may not care for. So just to clarify, this is not an overlay, it's completely custom and was built to complement a site that aims to be as accessible as possible.

## Can't we just use the browser settings for most of this?

Sure, some of the features are actually available in browsers, but is everybody "tech savvy" enough to know where to find those options? What about users using a mobile or tablet on a browser that does not allow extensions (Chrome?) how do they increase the text-spacing on a mobile? It's easy enough to do on a desktop/laptop browser, assuming the user knows what an extension is, how to find it, install it and use it, but Google don't let us install extensions on mobile, so perhaps there is some use for our users there?

I'm knocking on a little bit now, my vision is not as good as it once was. When I wake up in the morning, I tend to doom scroll on my phone whilst consuming copious amounts of coffee. I hate to admit that text on my phone is often a bit blurry and somewhat difficult to read, especially in the mornings. I know how to increase the font size in my browser, but that's a global setting, it applies to every site I visit and at this stage, some sites have decent enough sized text that it isn't a problem for me to read, so I don't want a global setting as I don't want to affect the layout of every site.

Go to an optician, I hear you say? I did before and I just could not get on with the glasses, so I returned them. I did get a bigger phone though, which helps (I'm not stubborn, honest), but now I'm pretty much at the limit of how big a phone can be and I doubt an iPad would fit in my pockets, so I'll have to get some more glasses in the near future.

Obviously I didn't implement the ability to adjust the text size for me, I did it for our users, there is a similar feature on Twitter (nope, I'm still not calling it by it's new name), whereby I can increase the font size. I actually do use that and it helps the text become more readable to me. Obviously I am not the only person that benefits from that option, a whole host of folks likely do, whether that be due to a visual disability, a reading disability, getting a bit old or just because they prefer it that way.

What about motion? The media query we apply in CSS is called `prefers-reduced-motion`, it's not called `prefers-no-motion`, but what if a user does actually prefer no motion? Some folks undoubtedly will want the ability to turn off all motion and transitions, so we provide that as an option. Can this be done in the browser? Well we definitely could with a portable stylesheet or a bookmarklet, but I'm unaware of a setting that turns off all motion, so if this option benefits just one user, it was worth it to us.

## Okay, how did you build it?

Okay, so my mind set here was to develop these preferences using JavaScript and LocalStorage, pretty standard fare really. Essentially just using a similar pattern to what we did for the site theme switcher, but just that little more extensible. As is common with websites oftentimes, we want to add new features at a later date, perhaps a user may request something that helps them a little, perhaps there is something obvious I have missed, perhaps WCAG will introduce new ideas when version 3.0 starts to take its final form.

So, the idea was to create reusable functionality, that will likely ever only require CSS modifications and not require any faffing around refactoring the JavaScript to add a new preference, I guess a fire-and-forget approach was what I wanted to achieve.

### My approach

At the basic level, all we really do is add a data-attribute or class to the `<html>` or `<body>` element in most cases, so we have a handy hook for our CSS, so this really isn't anything revolutionary.

First we'll create the buttons that toggle our preference, we're just going to create one preference to start with, as then I can demonstrate how easy it is to add another, a little later on. the first example will be for changing our site's font size:

```html
<h1>User preferences</h1>

<fieldset class="settings__fieldset">
  <legend class="settings__legend">Font size</legend>
  <button aria-pressed="false" data-pref="f-size large">Large</button>
  <button aria-pressed="false" data-pref="f-size unset">Unset</button>
  <button aria-pressed="false" data-pref="f-size largest">Largest</button>
</fieldset>

<!-- Add some lorem ipsum, below -->

<p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, beatae! Aperiam veritatis accusantium repudiandae perspiciatis sint quibusdam, illum ut impedit deleniti, atque laboriosam aut voluptatem optio possimus officiis voluptates rerum.</p>
```

* We wrap our controls in a `fieldset`, so we have a programmatic grouping association
* We add a `legend`, as users tend to want to know what something is going to do before they interact with it
* We add our three buttons:

  * One for large text
  * One for resetting or unsetting font size back to the site's default
  * One for largest text
* We add some very specific data-attributes

  * We add a data-attribute to each called `data-pref` and the value of each is an identifier and a value, which are space separated. So for us `f-size` simply means font size and the value is either `large`, `largest` or `unset`
* We add `aria-pressed` to each button, as we require a state to programmatically inform users that the element is a toggle-able button and it's current state. In the HTML, we're just setting them all as `false` as we will eventually listen for a page `load` event and set `true` to the correct one. In this implementation, there will always be one which has the value set to `true`
* We also have a `<h1>` in there, as at some point you will likely think "But I don't want all the text to be exactly the same size, that would be silly" and you would of course be right. I'll show you a quick way of solving that later.

Obviously you can use class names and any data attribute names you wish, they just need to be consistent as will become apparent later.

Now let's just get a JS reference to the button elements we will be using in our functions:

```javascript
const prefsBtns = document.querySelectorAll('[data-pref]');
```

We store a reference to to all of the `<button>`s , we can just use the `data-pref` attribute to get that collection.

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

Hopefully that makes sense? If you are following along in a code editor, you will notice that we are now adding our data attribute to the `<html>`element and if you look in `localStorage`, we are also adding it there. If we select "Unset" we remove the attribute from the `<html>` element and `localStorage`.

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

So, now we can only have one button per group set to `aria-pressed="true"`, which was the goal, we're almost done now, we just need to handle the page loads and initial states.

So it makes sense that preferences will persist across pages and of course on repeat visits. If a user finds it more comfortable having larger text, then I'm sure we can all agree it would be a huge annoyance to have to set that on every page they visited and on every repeat visit. As it stands, when we click a button, we add a data attribute and store that same data attribute in `localStorage`, if we refresh the page, we no longer have the data attribute, but we do have the `localStorage` entry, so we just need to utilise that on a page load event, so let's tackle that last step now.

```javascript
// wait for the page load to complete

window.onload = () => {
  
// Get all items from local storage
  
  const userStoredPrefs = {...localStorage};
  
// Loop through all of the properties
  
  for (const prop in userStoredPrefs) {
    
// discard any property that does not start with our prefix 'data-pref--'
    
    if (prop.startsWith('data-pref--')) {
      
// Set the data attribute to be the property and the value on the HTML element
     
      document.documentElement.setAttribute(`${prop}`, userStoredPrefs[prop]);
    }
  }

// Loop through all of the attributes that are present on the HTML element
  
  for (const userPref of document.documentElement.attributes) {
// Discard those that do not start with our prefix
    
    if (userPref.name.startsWith('data-pref--')) {
      
// Split our attribute at the double htphen so we can get our identifier
      
      let prefType = userPref.name.split('--');
      
// Find the button that has an attribute that matches, for our font size we are searching for
// data-pref="f-size [actual value]" and then adding the value after a space, for largest text 
// our query selector will actually be: data-pref="f-size largest", as we have manipulated
// the string. so we set that matching button to aria-pressed="true"
      
      document.querySelector(`[data-pref="${prefType[1]} ${userPref.value}`).setAttribute('aria-pressed', 'true');
    }
  }

// Finally, what if a user has not selected a button, well then we need to set aria-pressed="true", to
// our default (Unset).
// Loop through all of our groups (the fieldsets)
  
  document.querySelectorAll('.settings__fieldset').forEach(group => {

    // Search within each group, if any group does NOT have a button that has aria-pressed="true"
// then find any button in that group that is a pref button, that has a value of "unset"
// we do this with the CSS wildcard selector * and a value of "Unset" and simply set aria-pressed="true"
    
    if (!group.querySelector('button[aria-pressed="true"]')) {
      group.querySelector('[data-pref*="unset"').setAttribute('aria-pressed', 'true');
    }
  })
}
```

Well, that's our JS done. I'll put my obligatory disclaimer in here that I do not consider myself a JS ninja, so undoubtedly a "Tech bro" with a Tesla and loads of Bitcoin could improve that in some way. We can be safe in the knowledge that they would have probably just used React and ignored accessibility altogether, so at least ours works properly \[insert cry/laugh emoji].

It's difficult to explain exactly what I did above in a concise way, considering I'm trying to find the common ground between explaining to two audiences, one of which may be JS ninjas and the other may know a little or nothing about JS, but are here to learn. I guess the easiest way to summarise is:

* Wait for page load to complete
* Grab any preference settings from local storage and set matching data attributes on the `<html>` element only if they start with our prefix `data-pref--`
* Then loop through all of the `<html>` attributes, just getting the ones that start with our prefix and manipulating the attribute and its value so we end up with an exact match for its corresponding button
* When we get that match, change the value of `aria-pressed` to `true`
* Then after that has happened, search within all groups (fieldsets) that don't have a "pressed" button and just set the default (Unset) to be the pressed button (this is just belt and braces, as the HTML already handles that, on page load).

So, just one thing missing at this stage, we need a way to visually identify which `<button>` is pressed, as all is good for screen reader users, but those that aren't having the accessibility information announced to them don't know which is `<button>` pressed, let's fix that now, I'm just going to use CSS psuedo elements:

```css
/* Set a few custom properties on the ROOT element, we will use these soon */

:root {
  --default-f-size: 1.25rem;
  --colour-interactive: rebeccapurple;
  --colour-bg: white;
}

/* Some very basic font styling, using our default font size custom property, we set this
   on the HTML element, so we can use REM units correctly */

html {
  font-family: Arial, Helvetica, sans-serif;
  font-size: var(--default-f-size);
}

/* We use the calc() function, with our custom property, for elements that have a different font size */

h1 {
  font-size: calc(var(--default-f-size) * 1.5);
}

/* Give the fieldset and its contents a little breathing space */

fieldset {
  display: flex;
  gap: .75rem;
  padding: 1rem;
}

/* Add some styles to make it look OK and set a relative position */

button {
  position: relative;
  display: inline-flex;
  align-items: center;
  border: 2px solid var(--colour-interactive);
  border-radius: 4px;
  padding: .25rem 2rem .25rem 1.25rem;
  font: inherit;
  color: var(--colour-bg);
  background-color: var(--colour-interactive);
  transition: background-color 250ms ease-in, color 250ms ease-in, outline-color 250ms ease-in;
  cursor: pointer;
}

/* Create the shared declarations for the two cross parts */

[aria-pressed="false"]::before,
[aria-pressed="false"]::after {
  content: "";
  position: absolute;
  right: 1rem;
  width: .25rem;
  height: 1rem;
  background-color: var(--colour-bg);
}

/* Rotate the two elements in opposite directions to create a cross */

[aria-pressed="false"]::before {
  transform: rotate(45deg);
}

[aria-pressed="false"]::after {
  transform: rotate(-45deg);
}

/* Create a checkmark, using the border hack (bottom and right */

[aria-pressed="true"]::before {
  content: "";
  position: absolute;
  right: .625rem;
  bottom: .625rem;
  display: inline-block;
  transform: rotate(45deg);
  height: .8rem;
  width: .4rem;
  border-bottom: .25rem solid var(--colour-bg);
  border-right: .25rem solid var(--colour-bg);
}

/* Add a suitable focus outline */

button:focus {
  outline: 3px solid var(--colour-interactive);
  outline-offset: 2px;
}

/* Inverse the font colour and background colour on hover and focus */

button:focus,
button:hover {
  color: var(--colour-interactive);
  background-color: var(--colour-bg);
}

/* Inverse the colour of the cross icon and add a small transition */

[aria-pressed="false"]:focus::before,
[aria-pressed="false"]:focus::after,
[aria-pressed="false"]:hover::before,
[aria-pressed="false"]:hover::after {
  background-color: var(--colour-interactive);
  transition: background-color 250ms ease-in;
}

/* Inverse the colours of the checkmark and also add a small transition */

[aria-pressed="true"]:focus::before,
[aria-pressed="true"]:hover::before {
  border-bottom: .25rem solid var(--colour-interactive);
  border-right: .25rem solid var(--colour-interactive);
  transition: border-color 250ms ease-in;
}
```

So, that's the CSS pretty much wrapped up. Our buttons look OK, we're not going all out on style, as you will obviously want to use your own styling. The only change we need to make now is to actually get this working. We want all of the text size's to change, when we click a button (unless that button is already pressed), we will need a tiny bit of additional CSS for that:

```css
/* We just override the variables when our data attributes are present on the HTML element
   these are just arbritary values, just to demonstrate. We need one for each value
   that gets stored. remember our 'Unset' value never gets stored anywhere */

[data-pref--f-size="large"] {
  --default-f-size: 1.5rem;
}

[data-pref--f-size="largest"] {
  --default-f-size: 2rem;
}
```

It's as easy as that. There are of course issues we have not addressed here, I haven't made it responsive, I haven't factored in High Contrast Mode and we haven't really considered specificity, although as we are simply inheriting the font size from the root element, we should be good. I'm not usually a fan of the CSS `!important` property, but using it for user overrides seems like a great use of it to me. this is more of a guide on how to create the reusable functionality, as opposed to how to make it look nice on mobile etc.

If you have been following along, you will now notice that when we select a `<button>` other than 'Unset', all of the text, including the `<h1>` changes size, which was of course the goal.

### Reusing our functionality

Earlier I did promise to demonstrate how to reuse this, with relative ease, so let's just make another new user preference. First we will need to add some HTML, the way I do this is, I simply copy and then paste from our existing `<fieldset>` group and then modify it:

```html
<!-- Initial preferences group -->

<fieldset class="settings__fieldset">
  <legend class="settings__legend">Font size</legend>
  <button aria-pressed="false" data-pref="f-size large">Large</button>
  <button aria-pressed="false" data-pref="f-size unset">Unset</button>
  <button aria-pressed="false" data-pref="f-size largest">Largest</button>
</fieldset>

<!-- New preferences group -->

<fieldset class="settings__fieldset">
  <legend class="settings__legend">Line height</legend>
  <button aria-pressed="false" data-pref="l-height large">Large</button>
  <button aria-pressed="false" data-pref="l-height unset">Unset</button>
  <button aria-pressed="false" data-pref="l-height largest">Largest</button>
</fieldset>
```

In the above, I have just changed the identifier part of our data attributes' values on the new group we copy and pasted, as well as the `<legend>` text. Pretty straightforward, right?

Now we just need a little touch of CSS, I'm just going to add to existing style declarations and add two new ones, the comments should make that clear. I just don't want to paste in all of the code and overcomplicate things for you.

```css
 :root {
  --default-f-size: 1.25rem;
  --colour-interactive: rebeccapurple;
  --colour-bg: white;
   
  /* Just add the line below */
   
   --line-height: 1.5;
}

/* Add the following two declarations to the stylesheet */

[data-pref--l-height="large"] {
  --line-height 1.75;
}

[data-pref--l-height="largest"] {
  --line-height 2;
}

html {
  font-family: Arial, Helvetica, sans-serif;
  font-size: var(--default-f-size);
  
  /* Add the line below */
  
  line-height: var(--line-height);
}
```

That was it, within just a few minutes we have a second user preference set up, as we did all of the ground work earlier. We'll add just one more, this time we will make a more complex one, by adding an additional button:

```html
<!-- Old preferences -->

<fieldset class="settings__fieldset">
  <legend class="settings__legend">Font size</legend>
  <button aria-pressed="false" data-pref="f-size large">Large</button>
  <button aria-pressed="false" data-pref="f-size unset">Unset</button>
  <button aria-pressed="false" data-pref="f-size largest">Largest</button>
</fieldset>

<fieldset class="settings__fieldset">
  <legend class="settings__legend">Line height</legend>
  <button aria-pressed="false" data-pref="l-height large">Large</button>
  <button aria-pressed="false" data-pref="l-height unset">Unset</button>
  <button aria-pressed="false" data-pref="l-height largest">Largest</button>
</fieldset>

<!-- New preference -->

<fieldset class="settings__fieldset">
  <legend class="settings__legend">Highlight colour (interactive controls colour)</legend>
  <button aria-pressed="false" data-pref="h-color unset">Unset (purple)</button>
  <button aria-pressed="false" data-pref="h-color black">Black</button>
  <button aria-pressed="false" data-pref="h-color red">Red</button>
  <button aria-pressed="false" data-pref="h-color blue">Blue</button>
</fieldset>
```

In the above code example:

* I have added a 4th button to the new group, again, nothing smart here, it was just a copy and paste again
* I have changed the `<legend>`, as one would expect
* I have changed both the identifier and the value, for each data attribute and of course, changed the contents of each button.

Twitter has a similar thing to the above, that enables a user to change the colour of links and buttons, etc, so this is a rough example of that. Don't just go copy and pasting this one, as there is every chance it will cause low contrast issues on a real site, unless you are real careful with the colour options you provide. We don't have this option in our preferences, it would likely take a little bit of trial and error to get it right, but it's important that it is right, as otherwise it may be useless to some folks who would actually benefit. Anyway, let's just add our final bits of CSS (we only need a little bit here, three declarations for our three new buttons that do not 'Unset' anything. We already created a custom property, earlier for the colour of interactive controls, so the only thing we need to do, is override the colour when the relevant attribute is on the `<html>` element.

```css
/* Just add three new declartions, one for each new colour */

[data-pref--h-color="black"] {
  --colour-interactive: #1f1f1f;
}

[data-pref--h-color="red"] {
  --colour-interactive: #c10202;
}

[data-pref--h-color="blue"] {
  --colour-interactive: #0256c1;
}
```

Again, it didn't take long to create a totally new user preference, just a tiny bit of CSS and a little additional HTML, both of which we can basically copy, paste and then modify.

## The complete CodePen

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="ZENpbyN" data-pen-title="Reusable user preference settings" data-preview="true" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"></p>

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Wrapping up

Hopefully I have explained well enough to help you understand the process? The key takeaway is just consistently naming things, so the identifier part of a button's data attribute's value is the bit that needs to be consistent, within that group. We could have taken another approach, where the whole attribute on the button had a value that was the full data attribute, maybe that approach is better? I just went for this one, as it made more sense in my mind. It's important to let you know I do not have any Bitcoin or a Tesla though :) .

We do have one issue with what we have done, it's more of a final polish issue than anything else. As we can change visual aspects, we will likely get a brief moment where the initial style displays and then the user selected style overrides it, which is a bit janky. So, there is of course a way to get around that and it requires running a small snippet of JS in the `<head>` section of the site. Essentially, we would be looping through all of those key/value pairs we have in `localStorage` and adding the necessary data attributes before we render the page. We do exactly that for our theme, in that we check for the theme data attribute, very early on, apply the attribute and then the page builds, without a flash of an un-rendered theme. I did try to do this for all of our preference settings whilst in development, but it actually added quite a bit of a delay to the render times. I do need to look deeper into that, at some point, though. I can't take the credit for the useful snippet in the `<head>` section, as I just modified something from [Adam Argyle's guide on Web.Dev (caution, it does have some auto-playing media)](https://web.dev/articles/building/a-theme-switch-component). Obviously that would need modifying a little, this is the snippet that does it for our theme, in the `<head>` section:

```javascript
if (localStorage.getItem('data-pref--theme')) {
  document.documentElement.setAttribute('data-pref--theme', localStorage.getItem('data-pref--theme'))
}
```

We're just checking for the presence of an item in local storage `data-pref--theme` and then adding the correct attribute and value to the `<html>` element. As I stated, I did try looping through the items for all of our preferences here, but it was a little slower and I couldn't cope with not having 4 * 100s in Lighthouse, as it would annoy me.

Well, hopefully this makes sense and demoes that after a little careful planning, it's super simple to add new user preferences whenever there is a useful need for one. I should also point out that it may not be as simple as that if you're working on a legacy code base, as this does relay on CSS custom properties. Also, as is always the case, it's much easier to create something from scratch, on a blank page, than it is to transplant it into an existing system, but it was pretty late in the day we decide to implement it in here and it wasn't overly difficult.

<div class="callout__warn"><span class="callout__icon"><strong class="visually-hidden">Warning: </strong></span><span class="callout__text">Test warning</span></div>
