---
title: Modal vs non-modal dialogs
summary: There are primarily two different types of dialog, one blocks access to
  the underlying page and is considered Modal, whereas the other does still
  allows interaction with the page content
author: dlee
date: 2024-04-29
toc: false
tags:
  - Component
  - HTML
  - JavaScript
isGuide: true
---
## Intro

We often encounter dialogs that are used incorrectly or there appears some confusion about how to implement one correctly, we aim to help you understand the key differences between non-modal and modal dialogs in this guide.

## Modal vs Non-modal

It's perhaps useful to understand "Modal" to be a state, as in the current state of the page is non-interactive, it is intended to be blocked from interaction so a user is directed into either selecting something in the overlaying dialog, or possibly closing it by canceling it.

A Modal dialog would of course be a dialog that blocks out the underlying page and a Non-modal dialog would still allow page interaction.

Sometimes the word "Modal" is used interchangeably with "Dialog", to mean either Modal or Non-modal, which is incorrect and perhaps some of the confusion stems from this misunderstanding? It's quite common to hear or read this, personally I often understand what the person actually means when they say "We need a modal for this", but that's only because I have some additional context and that combined with me knowing the differences usually helps me to figure out what they actually meant.

## Examples of Non-modal dialogs

As Non-modal does not block interaction with the full page, these are often in some way connected to another user interface component or have little effect on the user's flow.

### A date picker

A Date Picker is a prime example of where a Non-modal dialog is typically used, a user would activate the date picker by focusing on the input or clicking a button and often a calendar will appear underneath, to enable a user to select a date or dates. That calendar (if coded correctly would be a dialog and it would often be non-modal). There are of course some uses where a full screen Modal dialog would make perfect sense, say if a user needs to add several dates or these dates affect the options available on another form control, think availability. Generally though, for the standard Date Picker the calendar would be contained in a non-modal dialog.

[An example of a Date Picker, using the aforementioned combobox pattern can be found on the ARIA Authoring Practices page](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-datepicker/)

### A combobox, search filter

Similar to the Date Picker, this pattern would typically be an input that then displays a dialog containing suggestions or matches that filter the results, based upon the user's input. Again this would be non-modal, as there is no use in blocking interaction with the underlying page.

An example of a combobox filter can be found on the ARIA Authoring Practices page.

### A word of warning

As with all ARIA Authoring Practice examples, don't just go copying the code and calling it good. In fact, seldom should we do this at all for full patterns, because often we inherit somebody else's oversights, all ARIA Authoring patterns do come with a warning, for this very reason.

### Overview of Non-modal dialogs

We have provided just two examples above, there are of course many other valid use cases, but in essence they are often localised non-critical controls that do not obscure the page content and its controls and if they do obscure other parts of the page, they would typically auto-close when a user tabs out of them.

It's an important distinction that a keyboard user can and should be able to tab away and continue on their journey. A user just viewing a page that does not want to use the Search Filter may focus on the input, which then expands the results and they should then of course be free to just tab away, so to speak, without their focus becoming trapped.

## Examples of modal dialogs

Typically a modal dialog will consist of two primary parts (depending on implementation), the actual dialog itself and the backdrop. The backdrop would usually visually subdue the underlying page, be this with a blur effect, a background colour with some opacity, a combination of the two and perhaps several other alternative styling techniques. Visually, this communicates to sighted users something along the lines of "Hey, this is the new page context, you need to do something in here and the stuff underneath is temporarily unavailable.

### Cookies dialogs

love um or hate um (I hate um), cookies confirmation/acceptance widgets don't appear to be going anywhere soon. Sometimes I ignore them, especially if they do not block too much of the page below, but sometimes, they are presented as a modal dialog. When presented as a modal they typically prevent us from accessing the page at all, until we give permission for them to snoop on us or target us with ads or uncheck a gazillion pre-checked checkboxes that give them "Legitimate interest" to snoop on us, who actually decides what parts of our privacy is legitimate, surely that should be us?

Let us assume we have a site that loads a cookies modal on our first visit, this modal overlays the page, rendering it "inactive" until we either "Accept" or "Deny" cookies. This is an example of something that is critical, they don't want us being on the fence about cookies, they need to know whether we're cool with them or not, they have a site with something we're likely interested in and the price of entry is accepting or denying cookies, everything is unavailable until we choose on of those options. Once we have chosen an option, the page would then be ready to read or interact with (after we have dismissed several other dialogs, to accept notifications, sign up to the newsletter, install the progressive web app, let them know our geographical location and let them know what colour socks we are wearing).

There are of course other less annoying and intrusive ways to present to a user their cookies, but I don't think the message has filtered through to the cookie devs just yet.

### An image gallery

Sometimes these may be referred to as a "light box" gallery, typically a user would select one image and be presented with that image and a bunch of controls in a larger view that covers the underlying page, so the user can view or access that image and its sibling images. These images would usually be part of a collection of some sort, say property photos, a graduation photoshoot or anything else. Upon opening these gallery widgets the underlying page is usually completely "invisible" or barely visible at all. The user's focus is drawn to the gallery.

Again, as this completely blocks the underlying page, this is a good example of a modal dialog, the user is in the gallery, if they want out, they can dismiss it and the page below is not available to them until they do dismiss it.

### Overview of Modal dialogs

Again, we could have continued on with many different examples, but I'm desperately trying to not waffle so much in my articles. I guess an easy way of thinking about a modal dialog is a floating page upon a page, that page does not have to be the same size, it can be much smaller, but crucially, it just means do something on this new floating page to get back to the page below.

There are quite a few critical considerations for a modal dialog that are not required for their non-modal cousins:

* Dismissible: There should be a way to either hard dismiss or light dismiss the dialog, depending on context, light dismiss would allow a user to hit Esc or click or touch outside (usually on the backdrop) to dismiss the dialog, hard dismiss would be clicking the Close button or otherwise completing a critical action. some modals may have both, it just depends on how critical the modal is to the current flow, if it's not super critical, then both would be required
* Renders the underlying page inactive: Visually we could use some form of blur or opacity on the backdrop, but there are additional considerations, such as blocking scrolling of the page below, preventing keyboard user from "tabbing out" of the modal, preventing screen reader users from using their virtual cursor to escape the modal
* Returns focus to the point of origin (the invoking element) or the next logical place when it is dismissed. The trigger may be a button several screens down the page, a keyboard user does not want to have to wade through all of that content again, to continue, they need to have their focus returned to its original position. There are of course some use cases where that element is no longer available, perhaps deleting an item in a shopping cart modal, in which case focus should be sent to the previous element (if there is one), or the next logical place. [Adrian Roselli has a short article on this, which as always, he explains brilliantly](https://adrianroselli.com/2023/08/where-to-put-focus-when-deleting-a-thing.html).

### Why trap a user inside a modal?

Well, why not? The page is "visually" unavailable, clicking on a control outside of the dialog will not action that control (it may close the dialog), so it needs to be unavailable to keyboard users, too. There are several ways to achieve this, we'll go over them later, first we'll look at a few considerations as to why we should trap focus:

* Let's just say we have a sighted keyboard user, who tabs out of our modal, let's say it's a rather large modal, the backdrop has low opacity and there's content and links underneath the dialog. How would the user see where their focus was when they focus on the link? 
* What about if we have been good sports and prevented the underlying page from scrolling, how are they going to see their focus when it's below the locked portion of the viewport?
* What if a screen reader user gets out of the dialog with their virtual cursor, only they are a sighted or partially sighted screen reader user and now they cannot visually track where their focus or cursor is?
* What if when the dialog is open, it manipulates the underlying page, perhaps some functionality becomes disabled or hidden from the accessibility tree, that'd be a lot of confusing silence for a blind screen reader user.
* Undoubtedly, there are more issues that could affect our users, but essentially, if the page is unavailable to pointing device users, then it must be unavailable to users of non-pointing devices.

### OK, how do we trap focus

As I said before, there are several ways to achieve this, we'll take a look at them and discuss the benefits:

#### The old way

Let's just assume we have a decent site structure, like so:

```html
<header>
  <nav></nav>
</header>
<main>
  <button id="modalTrigger">Open me!<button>
</main>
<footer></footer>
<div role="dialog" aria-modal="true" aria-labelledby="dialogHeading">
  <h1 id="dialogHeading" tabindex="-1">I'm open!</h1>
  <button id="close">Close me!</button>
</div>
```

Note: in the above, I would be sending programmatic focus to the heading, you can also send it to the close button or the first interactive element in the dialog if it makes sense but ensure a user won't miss any information.

I'm not going to code the JavaScript for this, as there are better ways in 2024, so there's little benefit in me typing it all out.

Essentially, what we would need to do is is add `aria-hidden="true"` to each landmark, to ensure it and its descendants are hidden from the accessibility tree. [`aria-modal="true"` does do that for the majority of browsers, but sadly not all](https://a11ysupport.io/tech/aria/aria-modal_attribute). Then, we would need to trap focus inside the dialog, by getting the first and last actionable elements and listening for the correct keypresses. If a user was focuses on the last element and presses <kbd>Tab</kbd> then we would `focus()` on the first actionable element. Conversely, if a user presses <kbd>Shift</kbd> and <kbd>Tab</kbd> whilst focused on the first actionable element, we could then move `focus()` to the last actionable element, so in essence, our user is trapped within.

There is one caveat with the above, it prevents a user from tabbing back up into their browser's UI, so they cannot get into the address bar etc, until they close the dialog. The alternative would have been to walk the DOM, essentially loop through all descendants of the `<body>` element, except the dialog and then search for every single element that can receive focus (including custom widgets with `tabindex="0"`) and add `tabindex="-1"`, obviously we'd need to make them focusable again when the dialog closed, along with removing `aria-hidden` from the landmarks etc.

#### A better way

In recent times we have been treated with some useful new features, one of which was the `inert` property for HTML. This attribute has been kicking around since 2022, but it wasn't supported in Firefox until mid 2023 and back in 2022 we typically supported IE, so we had to still use a polyfill to get this to work properly.

Essentially, what `inert` does is it not only removes the node it is applied to, along with all its descendants from the accessibility tree, but it also prevents any elements or descendants receiving focus. So in essence, we are killing two birds with one stone, neat, huh?

Let's just use the HTML example I provided in the previous method and knock out a quick bit of JavaScript to show how we could do that:

```javascript
const landmarks = [document.querySelector('header'), document.querySelector('main'), document.querySelector('footer')];
const trigger = document.getElementById('modalTrigger');
const dialog = document.querySelector('[role="dialog"]');
const closeBtn = document.getElementById('close');

trigger.addEventListener('click', () => {
  document.documentElement.setAttribute('data-modal-open', '');
  dialog.querySelector('#dialogHeading').focus();
  landmarks.forEach(lm => lm.setAttribute('inert', ''));
})

closeBtn.addEventListener('click', () => {
  document.documentElement.removeAttribute('data-modal-open');
  landmarks.forEach(lm => lm.removeAttribute('inert'));
  trigger.focus();
})
```

Obviously the above is not production-ready, it's just the most basic way of demonstrating the functionality, that I can think of, so what we are doing is:

* Save our landmarks into an array
* Get a reference to the button that opens the dialog
* Get a reference to the dialog itself
* get a reference to the close button
* Add an `addEventListener()` to the button and then

  * Add `data-modal-open` to the `html` element
  * Loop through our landmarks array and add the `inert` attribute
  * Finally, `focus()` on the dialog's heading
* I've added a close function, by listening to a click, on the close button, when that is actioned, we simply remove the data-modal-open attribute from the html element, remove the inert property from our landmarks and finally set focus on the initial trigger. I've just added this so you can check the DOM for opening and closing etc, I've not implemented light dismiss or anything

Then, assuming in our super basic example we have some CSS like so:

```css
html[data-modal-open] [role="dialog"] {
  display: block;
}

html:not([data-modal-open]) [role="dialog"] {
  display: none;
}
```

We would then be responsibly hiding the dialog when closed and showing it when open. That's pretty straightforward, right? With useful attributes like `inert`, it's often difficult to understand how so many devs get dialogs wrong. Granted, this attribute won't work on older browsers, but there is this polyfill, which could be used only when necessary. Another consideration is of course site structure, I obviously created the optimal site structure for my demo, but in reality, that dialog could be nested within a landmark, there could be other landmarks, there may not be any landmarks at all and somebody is having to fish this dialog out of div soup. So there may be some DOM walking required, but this is just a basic example.

#### But wait, there's more

We have just one more way to discuss and this one is my new favourite, it's actually the easiest to implement too. Drum roll, introducing the `<dialog>` element, a native dialog brought to you by the good folks at W3C. Many of us will already be aware of this element and perhaps followed its progress for a while, at first it was broken and not fully supported, but like the good soldiers they are, the groups involved in this all got it over the line, It's actually been usable for a while now. There are some little quirks and obviously older browsers won't support it, [but you should really have a read of this post from Scott O'Hara, who goes over any remaining quirks](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html).

It's always nice to have a native HTML element that can do much of the heavy lifting for us, so we can keep our JavaScript file size down and have less to debug if and when something breaks. We still need some JavaScript for the `<dialog>` element, but that's mostly to open and close it.

Before we build a little demo it's important to remember the distinction between modal and non-modal dialogs, as the opening method is a little different for each. If our dialog is non-modal, we use the `show()` method in our `addEventListener()` to open it, as the browser understands this to be a non-modal dialog, it won't trap focus etc, which is of course intentional. If we use the `showModal()` method, we get focus trapping, visibility and focus management for free, all we need really is an `addEventListener()`, so let's rustle something up.

We need to modify our HTML for this, mostly swapping out the `<div>` for a `<dialog>` element, but also removing some redundant attributes.The accessible name does not appear to be required for the native HTML <dialog>, I'm just gonna keep it in, as your user doesn't care how you built it, just that it works and if role="dialog" requires an accessible name, then I'm just gonna keep things consistent.

```html
<header>
  <nav></nav>
</header>
<main>
  <button id="modalTrigger">Open me!</button>
</main>
<footer></footer>
<dialog aria-labelledby="dialogHeading">
  <h1 autofocus tabindex="-1">I'm open!</h1>
  <button id="close">Close Me!</button>
</dialog>
```

Notice I have added autofocus to the heading, my train of thought is the following:

Sending focus to the `<dialog>` can be a tad noisy and potentially annoying for folk, as depending on how much content is in it, a screen reader will proceed to read it all out. I will concede here, I haven't actually tested that with users, but I have read Slack comments from screen reader users who state that and based upon just a few folks saying it, I'm rolling with that, as nobody could ever know what is better for screen reader users than actual screen reader users.

As the `<dialog>` is pretty smart, it actually decides where to place focus, if you read Scott's article that I linked earlier, this was one of the last things to be resolved, before he wrote the article. If I do not manage `autofocus`, then focus will be sent to the first actionable element, which is the close button. As I have only one close button and it comes after the content, that does not make sense, as a user would have to go reversing up the dialog to get to the beginning. In my example which only contains two elements, this would not be the end of the world, but what if we had lots of text? What if the first interactive element was actually the Agree button and all the text above was a nefarious document that agreed to surrender your house, savings and favourite slippers to the company, in a legally-binding way? I exaggerate a bit, but accessing information sequentially is usually the best way to go, if it's something like agreeing to terms and conditions, if a screen reader user does not want to listen to all that drivel, as much as I don't wanna read it, they'll do what I do and just accept (silly me). If they do accept, it wouldn't be because we coded the dialog in a way that made the content easy to miss, it would be their choice to accept without consuming the information. You could of course add a close icon button at the top, too and then focus would automagically be sent to that.

Very little JavaScript here, which is nice:

```javascript
const trigger = document.getElementById('modalTrigger');
const dialog = document.querySelector('dialog');
const closeBtn = document.getElementById('close');

trigger.addEventListener('click', () => {
  dialog.showModal();
})  

closeBtn.addEventListener('click', () => {
  dialog.close();
})
```

* We keep most of our variables which reference the bits we need, with the exception. of the landmarks array, we don't need that now
* We strip down the contents of the `addEventListener()` for the `trigger` button, we just need the one magic method `.showModal()`
* We strip out the contents of the `addEventListener()` for the `close` button, we just want the `.close()` method

In its most basic form, that is it. Of course, we may want to add light dismiss for clicking outside on the `::backdrop`, another nice freebie here is we already have dismiss on <kbd>Esc</kbd> press, but perhaps there are cases where that should not be an option, so I'm just guessing here, but if it were say a cookies dialog where an action is required, we could use the `preventDefault()` method on the `keydown` event, but I guess most of the time we would wanna keep that in.

Just like the `inert` attribute, this is relatively new-ish, so older browsers won't get all of the goodness that comes for free, I haven't tested on older browsers, I guess anything that predates Scott's article will degrade in functionality and the further back you go, the closer you are to the point where it simply does nothing at all. But, that's a task I'm sure you can address with some polyfill or other.

## Revisiting non-modal dialogs

As I stated earlier, we can also use the <dialog> element on non-modal dialogs, we just need to use the .show() method, as opposed to .showModal(). I've knocked up a quick CodePen with three dialogs, as I don't need to use inert on a non-nodal dialog, as then it is modal.

## Live CodePen examples

I've used pretty much the same code as above, but I had to use unique IDs and what not, so some references change



## Further reading

This is almost as basic as I could do for this, I haven't animated it, I haven't styled it, added light dismiss and generally I've just provided a barebones example. But if you wish to make your dialog all shiny and fancy, then [this guide from Adam Argylle is pretty awesome for overcoming any issues you may face](https://web.dev/articles/building/a-dialog-component).
