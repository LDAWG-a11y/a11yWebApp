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

It's perhaps useful to understand "Modal" to be a state, as in the current state of the page is non-interactive, it is intended to be blocked from interaction so a user is directed into either selecting something in the overlaying dialog, or possibly closing it or canceling it.

A Modal dialog would of course be a dialog that blocks out the underlaying page and a No-modal dialog would still allow page interaction.

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

### A log in dialog
