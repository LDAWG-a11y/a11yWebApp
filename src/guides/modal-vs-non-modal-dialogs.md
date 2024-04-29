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

There are of course other less annoying and intrusive ways to present to a user their cookies, but I don't think the message has filtered through to the cookie companies just yet.

### An image gallery

Sometimes these may be referred to as a "light box" style gallery, typically a user would select one image and be presented with that image and a bunch of controls to view or access its sibling images. These images would usually be part of a collection of some sort, say property photos, a graduation photoshoot or anything else. Upon opening these gallery widgets the underlying page is usually completely "invisible" or barely visible at all.The focus is on the gallery and the effect I guess is to remove all underlying distractions to peruse the images.

Again, as this completely blocks the underlying page, this is a good example of a modal dialog, the user is in the gallery, if they want out, they can dismiss it and the page below is not available to them until they do dismiss it.

### Overview of Modal dialogs

Again, we could have continued on with many different examples, but I'm desperately trying to not waffle so much in my articles. I guess an easy way of thinking about a modal dialog is a page upon a page, that page does not have to be the same size, it can be much smaller, but crucially, it just means do something on this page to get back to the page below.

There are quite a few critical considerations for a modal dialog that are not required for their non-modal cousins:

* Dismissible: There should be a way to either hard dismiss or light dismiss the dialog, depending on context, light dismiss would allow a user to hit Esc or click or touch outside (usually on the backdrop) to dismiss the dialog, hard dismiss would be clicking the Close button or otherwise completing a critical action. some modals may have both, it just depends on how critical the modal is to the current flow, if it's not super critical, then both would be required
* Renders the underlying page inactive: Visually we could use some form of blur or opacity on the backdrop, but there are additional considerations, such as blocking scrolling of the page below, preventing keyboard user from "tabbing out" of the modal, preventing screen reader users from using their virtual cursor to escape the modal
* Returns focus to the point of origin (the invoking element) or the next logical place when it is dismissed. The trigger may be a button several screens down the page, a keyboard user does not want to have to wade through all of that content again, to continue, they need to have their focus returned to its original position. There are of course some use cases where that element is no longer available, perhaps deleting an item in a shopping cart modal, in which case focus should be sent to the previous element (if there is one), or the next logical place. [Adrian Roselli has a short article on this, which as always, he explains brilliantly](https://adrianroselli.com/2023/08/where-to-put-focus-when-deleting-a-thing.html).

### Why trap a user inside a modal?

Well, why not? The page is "visually" unavailable, so it needs to be "technically" unavailable. Let's just say we have a sighted keyboard user, who tabs out of our modal, let's say it's a rather large modal, the backdrop has low opacity and there's lots of controls below. How would they see where their focus was, if there was a link below the modal? 

If we had given making the underlying page
