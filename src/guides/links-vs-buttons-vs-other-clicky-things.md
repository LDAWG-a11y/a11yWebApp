---
title: Links vs buttons vs other clicky things
summary: Let's take a look at links and buttons and discuss why these two
  interactive elements aren't interchangeable, as well as how they can set user
  expectations
author: dlee
date: 2023-04-13
toc: false
tags:
  - HTML
  - Best practice
isGuide: true
---
## Introduction

For the most part, when we click something on a website, it's usually a link or a button, there are other "clicky things" such as ARIA grid cells, ARIA menu items and other perfectly valid clickable things. There are also endless amounts of custom clicky things that tend to leave folk scratching their heads, such as poorly-implemented custom controls, when I discover these whilst testing a website, I tend to let out a somewhat judgemental sigh, because often what the developer tried and failed to achieve would have been much easier had they just used the correct element to start with.

Now, as I mentioned, I do get frustrated and a bit judgemental when I encounter these, that's not because they affect me, but it's because I know they can affect others and in many instances, they can completely prevent somebody from using a site altogether, which is obviously pretty awful.

## Disambiguation

A link goes somewhere, a button does something. It really is as straightforward as that, it's difficult to understand how the lines between these two elements can become blurry or confuse a developer enough to make them reach for the wrong element in the first place, although sometimes the root of the problem appears to be copy and pasting from CSS framework examples or other code examples across the web. We've all copy and pasted something without reading every line before, we're humans in tech, if we can find find a shortcut, we'll use it, but it's important to know exactly what you are copying and checking it's fit for our purposes.

## What about single page apps?

Have to put this out there, I'm not a fan, so expect a little bias here, but I'll do my best to take a reasoned approach.

There is an argument I sometimes hear "The URL doesn't change though, it's routing, so this should be a button". Let's forget everything technical we know for a hot second, let's not let our technical knowledge influence how we view what is really happening and let's do a little user perspective exercise:

Mavis (66 years young) is a reluctant laptop user, she hates all this fandango technology stuff, in her day she could go to the shops and buy absolutely anything she needed, she knew which shops had the best service, quality or prices and life was easier without these dotcom machines. Only now, most of these businesses have either gone, moved completely online, moved to locations further afield or there are way better offers online. Sometimes those businesses may have provided services, such as Post Offices or banks and Mavis may have paid her bills there or whatever else she needed to do.

Forced to change her habits by external factors, such as the advent of the internet and and the fact that somethings simply cannot be done in bricks and mortar stores anymore, Mavis was convinced to get a laptop by one of her grown up kids. After much trial and error, after many calls to her grown up children "This computer isn't working", "Is the battery charged, mum?", "I don't know, how do I do that?" and all of the associated questions somebody that grew up before the digital age may have whilst they are struggling to adapt to this new technology, Mavis learned to just about get by. Mavis' comfort zone is ensuring the laptop has power, turning it on, opening a browser, searching for a site and even buying something online, Mavis has no idea what all the other icons on her screen do, Mavis doesn't stray out of her comfort zone, as she thinks she'll break something.

I've intentionally not mentioned whether Mavis has a disability here, as at this very moment, we don't need to worry about that, but later we will discuss it.

We all know a Mavis, if we're in tech and our families or friends have a vague idea of what we do, then we probably know a Mavis. So, ask yourself, if you said to your Mavis, this site is built in Angular, React or Vue, how would your Mavis respond? They would not have a clue what you were on about, would they? To the untrained eye, a website is just a website, most of your users are not developers, most of your users don't open up the DevTools to see what your tech stack is, most of your users are just regular folk, going about their business. They are completely unaware of how a website was built and why should they care? We don't need to watch an episode of How do They do That, to understand how our kettle was made before we make a brew, do we? We just fill it up, flick the switch and wait for it to click off. How something is made is ordinarily abstracted from the user and I guess that's an aspect of good design, all of the technical advancements, the manufacturing and/or development are completely irrelevant to the end user, they just need to know how to operate it, it should be intuitive, robust and have as small a learning curve as possible.

So, yes, the page is not technically reloading, but in my limited experience of SPAs, they mimic a multi page app, but do so on one page, to preserve state and have fancy page transitions, amongst other things. If we're  mimicking something that wasn't broken in the first instance, just to make development quicker or make the product easier to scale or whatever, why would we expect Mavis to care, why would we force her to think, to be confused or question things she was previously comfortable with, just to make our lives as developers that bit easier? We should stick to convention and convention dictates that links go somewhere and buttons do something, I'm not completely sure why many SPAs are a hot mess of links and buttons used in the wrong context, but given that SPAs are complex beasts, I'm sure it's not beyond you to use the correct element or add the the correct roles and attributes to help Mavis complete tasks on your site.

Let's say Mavis is blind and uses a screen reader, if she hears "Navigation, About us, button", what will she expect? Would she expect it to act like a link, likely not, could that put her off clicking it, quite possibly. If Mavis' grown up kid said over the phone: "go to the ACME site and click the Offers link, for a 10% off voucher code" and then a little while later, Mavis hears "Offers, button", would that cause her to think it's the wrong control? The answer is always test with disabled users and pay them for their time, but I can say with some degree of confidence that Mavis might be a little confused, at the very least, so stop confusing Mavis and use the right tool for the job, oh yeah, also be consistent.

## Why does it matter?

Because people!

I should just move on to a new section now, as the previous statement is always the reason, but let's dive a little deeper. Let's take the following bit of HTML and unpack the issues:

```html
<a href="#" role="button">Settings</a>
```

We'll assume this opens a modal of some sort and a user can change some settings within. Why did we use a link element and then give it a `role="button"` attribute? Now, a user accessing your site with a screen reader hears "button, settings", so they press space and the page scrolls, we're off to a bad start already, right? Of course, we'd need to add an event listener and listen for a press of the <kbd>Space</kbd> key, let's do that now:

```html
<a href="#" id="clickyThing" role="button">Settings</a>

<script>
  document.querySelector('#clickyThing').addEventListener('keydown', (evt) => {
    if (evt.keyCode == 32) {
      evt.preventDefault();
      openModal();
    }
  })
</script>
```

Here, we've added an ID, just for easier targeting of the element, then we are listening for a `keydown` event, when that happens on our link-not-a-link element, we prevent the default behaviour of the browser, which would be to scroll the screen, then we call the function that displays the modal. So, is it a link or a button now?

Well, as we have a href attribute, when we click it, the URL is modified, which could be cause some unwanted behaviour with the browser history in some instances, so now we may want to remove the `href` attribute, like so:

```html
<a id="clickyThing" role="button">Settings</a>

<script>
  document.querySelector('#clickyThing').addEventListener('keydown', (evt) => {
    if (evt.keyCode == 32) {
      evt.preventDefault();
      openModal();
    }
  })
</script>
```

Now we're golden right, we don't interfere with the browser history or modify the URL and our link that we wanted to be a button is now a button, right? Wrong. Because now the link doesn't have an `href` attribute, it's not actually keyboard focusable. The moment that we removed that `href`, we prevented keyboard users from being able to use the control, so let's fix that:

```html
<a tabindex="0" id="clickyThing" role="button">Settings</a>

<script>
  document.querySelector('#clickyThing').addEventListener('keydown', (evt) => {
    if (evt.keyCode == 32) {
      evt.preventDefault();
      openModal();
    }
  })
</script>
```

Now by setting tabindex="0" on to the link, we're getting closer:

* It has a role of button
* It has an accessible name
* It won't modify the URL or affect browser history
* It works with <kbd>Space</kbd>

But now, it won't work with <kbd>Enter</kbd>, as we have lost that functionality by removing the `href`, we also lose the mouse click functionality too, uurghh! This is where we often see developers trip up, in that they will perhaps grab a pattern from a CSS framework, which for some reason uses a link that has been mangled into something that's supposed to be a button, but it doesn't work at all with a keyboard, it's just a clicky thing, in that it only works with a mouse or other pointing device. The problem starts with something quite obvious, a click event only works on buttons and links, now we have removed the href, it definitely isn't a link anymore and it's still not a button, obviously it would be reasonable to expect that if somebody is going to all these lengths to recreate the wheel (or the button), then they should check it works with both a mouse and a keyboard, at the very minimum, but this is rarely the case, sigh!

So, putting it altogether and making sure it works with mouse, has a name, receives focus, has the correct role and also works with <kbd>Space</kbd> and <kbd>Enter</kbd> we end up with this:

```html
<a tabindex="0" id="clickyThing" role="button">Settings</a>

<script>
  document.querySelector('#clickyThing').addEventListener('keydown', (evt) => {
    if (evt.keyCode == 32 || evt.keyCode == 13) {
      evt.preventDefault();
      openModal();
    }
  })

  document.querySelector('#clickyThing').addEventListener('click', (evt) => {
    openModal();
  })
</script>
```

That's obviously not a huge amount of code, but it's all quite unnecessary and way more likely to have an issue on some browser/operating system/assistive technology combo than all the goodness you get for free, with the good old `<button>`. I haven't tested the above on everything, as the purpose isn't to show anybody how to mangle one element into another, it's simply to demonstrate it's a bit silly to do all that extra work for nothing and to point out some common caveats along the way, so definitely don't do the above, just do this:

```html
<button id="clickyThing">Settings</button>

<script>
  document.querySelector('#clickyThing').addEventListener('click', (evt) => {
    openModal();
  })
</script>
```

That's much more readable and less faff than repurposing other elements or recreating the wheel, right? Most importantly, it'll just work, like everywhere (OK, it may not work on IE if you need it to, but typically you'd have Babel or whatever to make sure ES6 worked there). 

## Wrapping up

* As always, when you find yourself reaching for ARIA, firstly ask yourself "Can I do this with just HTML?", if you can, then that's what you should be doing, it's easier to achieve, less likely to introduce an issue for people who use assistive technologies and of course, when another developer comes along in the future, it's less likely they'll break anything, as they may not have a clue what you were trying to do
* If your control does something on the current page, such as opening a modal, accordion, date picker, submits a form or whatever, then that control should be a button
* If your control changes the current page or moves focus to a new area on the existing page, then this should be a link
* Whilst the lines may be a bit blurry with SPAs, above all else, be consistent, but also remember that most of your users aren't developers and would not have any knowledge of web technologies, so it's best to make your SPA use all of the conventions your users are accustomed to, which is typically links go somewhere, buttons do something