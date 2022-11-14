---
title: Labelling inputs
summary: Inputs must have labels, so users can understand their purpose, let's
  take a look at several ways of achieving this and weigh up the pros and cons
  of each
author: dlee
date: 2022-11-11
toc: true
tags:
  - HTML
  - Labels
  - Inputs
isGuide: true
---
## Labels intro

A world without labels can be both a confusing and frustrating place, often we'd encounter surprises that would not necessarily be what we hoped for. Imagine if all the canned food in the local supermarket had no labels, an array of identical silver cans filling shelves, no indication of the contents, a game of luck to anybody that buys them. Picture the scene, you want something quick to eat, you put your bread in the toaster, put a pan on the hob and open a can in the hope that it contains baked beans, only it's dog food and you don't even have a dog, a fairly rubbish surprise, I'm sure you'll agree.

Users of websites appreciate labels on inputs the same way we all appreciate labels on other things, without these input labels, oftentimes users have no idea what the input is for, which can be a complete blocker to using the site, especially for people with disabilities.

There are multiple ways to label inputs and other considerations to make which can give users the best experience when they encounter forms on our sites, let's dive a bit deeper.

## Inputs must have an accessible name

What's an accessible name?, you may ask. Put simply, it's a name that is programmatically associated with the input it relates to, programmatically associated can mean a relationship exists between 2 elements in a page's HTML or it can mean that the actual input has a name, which can be achieved using various attributes on the input element.

There are 2 primary WCAG success criteria to consider when an input does not have an accessible name, [WCAG 3.3.2 Labels or Instructions at Level A](https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html) and [WCAG 4.1.2 Name, Role, Value at Level A](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)

### What options are there to name inputs?

First let's list all the ways an input can have a name:

* `aria-labelledby="IDRef of another element"` as an attribute on the input
* `aria-label="A name for the input"` as an attribute on the input
* `<label for="IDRef of the input">A name for the input</label>` As an element close to the input
* `placeholder="A name for the input"` as an attribute on the input
* `title="A name for the input"` as an attribute on the input

We're going to discuss each of them, with some practical examples. But first, we'll just go over the "Accessible Name and Description Computation", although from know on in, I'll refer to it is the "Accessible name calc", as it's a little shorter.

We could actually use all of those on an input, if we so wished, but please don't, so our input could be:

```html
<label for="ourInput">Your name</label>
<input id="ourInput" type="text" aria-labelledby="someOtherText" aria-label="What is your name?" placeholder="What you called?" title="Full name">
  
<!-- Some text node anywhere else on the page -->
<p id="someOtherText">Tell me your name</p>
```

There's quite a lot going on there, isn't there? It felt equally as bad to type that, believe me.

So, before I explain, what is the actual name of the input, used in the Accessible name calc?

It's "Tell me your name", which depending on your level of knowledge of HTML, may come as a bit of a surprise.

So, in the above code snippet, we virtually threw everything at our input, to give it a name, but we can only really have one winner and that winner will always be `aria-labelledby`, as it's like a toddler, it can shout really loud and be heard over the grown ups.

If we remove the `aria-labelledby` attribute, our input then has the name "What is your name?", because, `aria-label` is also quite shouty, not as shouty as `aria-labelledby`, this could be the slightly quieter twin of the `aria-labelledby` attribute, not quite as shouty, but you can still hear them above almost everybody else.

If we then remove `aria-label`, our input then has the name "Your name", as the `<label>` element (with a reference to the input's ID, using the `for="IDRef of the input"`, is not so shouty as the ARIA attributes, but is perhaps the voice of reason within this hypothetical family, it doesn't need to shout so loud (if used correctly).

Let's delete that `<label>` element, now our input's name becomes "What you called?", because the `placeholder` is like the family's teenager, it hardly ever speaks, it's sometimes there and often nobody has any idea where it's gone.

Finally, if we remove the placeholder attribute, we are of course just left with our title attribute, which is a bit like the family ghost (if that's a thing), some people can see it and some people will doubt its existence entirely.

So, the TL;DR is:

* `aria-labelledby` with a valid ID reference will always be the accessible name
* If there's no `aria-labelledby` or it has an invalid ID and an `aria-label` is present, the `aria-label` will be the accessible name
* If there's no ARIA naming attributes, but there is a `<label>`, that will be the accessible name
* If there's no `<label>` or ARIA naming attributes, but there is a `placeholder`, that will be the accessible name
* If none of the above exist, but there is a `title`, then that becomes the accessible name

There is 1 more attribute in the Accessible name calc: `aria-placeholder`, I haven't discussed this as I don't know of a reason to ever recommend using it, when we could just use something that can be accessed by all users.

### So which should we use?

The short answer is `<label>`, the long answer is, it depends. Labels are generally going to be the better option, as if they are visible and situated next to the input, with a correct programmatic relationship, then pretty much everybody benefits and there's little guesswork involved in determining the input's purpose.

As an additional added bonus, clicking or tapping the label will force its related input to become focused, so the user can start typing; this particularly benefits anybody who might have difficulty using a mouse or touchscreen, as the so called 'hit area' of the input becomes larger.

There are some situations where a visible label can perhaps be omitted, take a Site Search input, for example:

* Typically these are in a familiar location, close to the top of the page
* They tend to have a distinctive button immediately adjacent to them
* That button usually has a magnifying glass icon or the word "Search"

This tends to make these inputs identifiable, because of their location and the adjacent button, so often we discover these without a visible label (almost always they have placeholder text). How would we approach this? You could use a visually hidden `<label>`, which would still provide an accessible name, we'd lose the added bonus of a larger hit area, but we have a name. Alternatively, we could give our Search button an ID, so assuming the accessible name of the button is "Search", we could reference that with `aria-labelledby`, the following code snippet contains 3 examples:

```html
// Using a hidden label
<label class="visually-hidden" for="ourInput">Search</label>
<input id="ourInput" type="text">
<button type="submit">Search</button>

// Button with text, using aria-labelledby  
<input type="text" aria-labelledby="searchBtn">
<button type="submit" id="searchBtn">Search</button>

// Button with text, using aria-label  
<input type="text" aria-label="Search">
<button type="submit">Search</button>
```

The hidden label and the aria-labelledby in this instance are both robust methods to naming an input where we don't have a visible label, as they both make a reference to some existing text, this means that translation tools will translate them for users of other languages. The aria-label method has some issues, in that not all translation software will be able to translate it.

If your Search button is an icon, as opposed to text using `aria-labelledby` may not be a good option, if the button has an aria-label for its accessible name, as we still have a translation problem (because we are referencing an `aria-label`, which doesn't translate as well), but if our button has visually hidden text, then using `aria-labelledby` is a perfectly viable option, assuming our ID reference matches, of course.

It's also worth noting that however we hide something in the DOM, whether that be with classes like `.visually-hidden` or `.sr-only` or even display properties such as `display: none;` or `visibility: hidden;` `aria-labelledby` can still create the accessible name from that element, as it is designed to ignore all those display properties to form an accessible name.

### Using a placeholder attribute

Placeholders introduce issues of their own, typically we encounter these with very low text contrast, so we fail them against WCAG 1.4.3 Contrast (Minimum) at Level AA, but the when the contrast is sufficient, they tend to look like they have been pre-filled, which can be a source of confusion. Relying on a placeholder alone for an accessible name is quite a weak strategy, the moment a user types a single character in that field, it's gone, then if they get distracted or disturbed  and forget what the field is for, they have to delete their input to get the placeholder back, which isn't a great experience for anybody.

Another issue with placeholders is that some screen readers will read both the label and the placeholder when a user encounters that input, which is a bit repetitive and we want to avoid stuffing lots of additional superfluous

### Using a title attribute

We should never use a title attribute as the only way of naming an input, keyboard users never see them, nor do touchscreen users, so they're not a reliable way of naming inputs, this quote sums up their usage perfectly:

> If you want to hide content from mobile and tablet users as well as assistive tech users and keyboard only users, use the title attribute
> <cite>Steve Faulkner TPGi</cite>

### The dangers of using ARIA

ARIA is a powerful tool, that can provide users of assistive technologies with additional information about parts of webpages, such as how to interact with them, their purpose, whether they are collapsed or expanded and much more. Remember that those 2 ARIA attributes we used, are our shouty little toddlers? Well, it's best to avoid adding ARIA labelling to inputs, unless strictly necessary, as we could end up with an a name that doesn't match what users can visually see.

## The visible label must contain the accessible name

When we use ARIA on an input, that has a visible label, we run the risk of creating a mismatch of what a user can see and what the browser or the user's assistive technology names the input, the following code example demonstrates this risk:

```html
<label for="ourInput">Search</label>
<input id="ourInput" type="text" aria-label="Look up all the things">
<button type="submit" id="searchBtn">Go</button>
```

In the above code, we have a visible label, using the `<label>` element, which also makes the correct association to the input with the `id` attribute, but, one of those shouty toddlers is there and they have a much louder voice. Now, our visible label does not match our accessible name, in fact, it does not even include the visible label. This explicitly fails [WCAG 2.5.3 Label in Name, at Level A](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html). Not good, as this makes using the input a particular nightmare for users that control computers with voice commands, they may instruct their computer to "Click, search input" (or words to that effect) and nothing would happen, as the word search is not even included in the actual accessible name. They would then need to use the mouse grid, which takes much longer. It's also worth pointing out that not all screen reader users are blind and not all blind people are completely blind, so there is a mismatch between what they see and what they hear.

The exact wording of Label in Name is "The name must contain the text which is presented visually", so if the word "Search" appeared in that `aria-label`, then technically it passes, but that doesn't always mean it's the right thing to do or that it will work for everybody.

I'm not very experienced with voice commands for computers, but I do read quite a lot from folks that are and what I understand is:

If we hide part of an accessible name, or use ARIA instead to overwrite the accessible name, with more information, this won't work for users of MacOS/iOS VoiceControl, because it expects an exact match between the verbal instruction and the accessible name. Sometimes we discover instructions hidden in ARIA, which is usually a misguided effort to help a screen reader user fill in an input or whatever, it's important to understand that accessibility is for everybody that needs it, not just one group, so we should avoid making the screen reader experience "better" at the cost of voice users, with a little thought, we can provide the same comparable experience for everybody by using a  correctly referenced `<label>`, if we need to add some instructions, such as a suggested format, provide everybody with those same instructions, ideally as part of the `<label>`.