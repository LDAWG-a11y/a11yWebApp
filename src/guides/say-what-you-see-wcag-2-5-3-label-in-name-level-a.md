---
title: Say what you see - WCAG 2.5.3 Label in Name Level A
summary: We're going to take a look at 2.5.3 Label in Name, here. The purpose of
  this requirement benefits users of speech input and requires the visible label
  be present in the accessible name
author: dlee
date: 2025-11-24
toc: false
tags:
  - ARIA
  - Assistive Technology
  - Best practice
isGuide: true
---
## Intro

Label in Name requires that the visble label be present in the accessible name (AccName), which seems like a super simple success crteirion (SC) to meet on the face of it, but I tend to have to fail sites on this SC pretty much every time I put my testing hat on. Let's look at this in depth, let's try to understand where developers often go wrong and we'll try to have a little fun along the way. So, when I was a kid growing up in the UK, there was a TV game show called [Catchphrase](https://en.wikipedia.org/wiki/Catchphrase_(British_game_show)) and today I have just learned that it was based on an American TV show of the same name, which is good as more folks may get my cheesy jokes and references. The original version was hosted by an Irish chap, names Roy Walker and the game would typically show a crudely animated image (it was the late 80s/90s) that would have an animated character Mr Chips pointing at something or otherwise acting something out to give the contestants a clue as to what the full image depicted. The image would always depict a popular catchphrase that may be used in regular language, etc. The reason why I am making this reference is because Roy's catchphrase was always "Say what you see" and I think that fits perfectly with the intent of this SC.

## 2.5.3 Label in Name refresher

"For user interface components with labels that include text or images of text, the name contains the text that is presented visually." On the face of it, it really is as simple as it sounds, if we have a button which is of course a type of user interface control and that button has a name that is visible to users, then that visible name MUST be present in the AccName. On the Understanding doc it is noted that a Best Practice is to ensure the visible part of a control's AccName is front loaded, it is the beginning of the string of text that forms the overall AccName. A better Best Practice would be to ensure the visble label and the AccName are identical, although there are some situations where that may prove a challenge.

## Who is this SC for?

The intent of this SC is to make operation of sites for users of voice input software easier, in that when they see a control called "Settings" they can simply say what they see and instruct their software to "Click, Settings" and as if by magic the Settings button will activate and do whatever it was supposed to do (assuming the button works properly, of course).

Labels are something we all rely on, be they labels on products we're buying, something we're grabbing out of a cupboard anything at all that requires some indication of what it is. That label does not always have to be just text, of course, Braille is common on some products and some products have iconography and those icons can convey some information about the product or how to use or interact with it.

In the physical world labels serve as a fundamental identifier for determining what something is, what it may contain or indeed what it does. Let's take food cans as an example, sure, there are several sizes and even a few shapes, but let's just imagine the regular sizes cylindrical can that contains baked beans, etc. We may have multiple cans of this shape and style in our cupboards and for those of that look at items to identify them, we do so be recognising or reading the label (blind users may have Braille labels). Now let's say we 20 cans of food and there are no duplicates, and let's say that some malicious elf on the shelf character thought it would be a good prank to remove the label from every can. The following day we fancy beans on toast or something, "Houston, we have a problem", as we are now in the guessing stage and are relying totally upon luck. We have a 1 in 20 chance of picking the beans from 20 identical cans, I don't consider myself lucky, at all and I just know that coconut milk on toast is going to be a pretty grim experience for me, as I'd likely open something that just doesn't go with toast. What do we do in this situation, do we just keep opening cans until we find the elusive beans, wasting lots of perfectly good tins of food along the way?, or, do we just tap out and have toast on its own? I'd probably just have toast, as my appetite for food is greater than my appetite for lucky dips and the disappointment that would inevitably bring.

Why would websites be different? A website exists for a reason, that reason may be information, communication, some form of signing up or joining or indeed purchasing something, etc. Each site has a goal and the goal is always the same, allow users to complete their task without any "pain points", otherwise, they'll go elsewhere, IF they can. So, given that users have diverse needs and requirements and we are not all the same, we need to consider accessibility for voice input users, I think this group of users are perhaps the group that is often overlooked more than others on "Accessible" sites. That's because developer teams sometimes over engineer for the screen reader experience, if they mistakenly think that accessibility is for screen reader users and people with low vision, we often end up with sites that will work perfectly well for keyboard and other non-pointer input devices, so everything works, or does it?

### Where developers go wrong

Where developers often go wrong is by giving screen reader users too much information, such as visually hidden instructions and this can and often does cause an issue for voice input users. Let's take this example code:

```
<nav>
  <img src="/logo.png" alt="ACME logo">
  <button 
    aria-expanded="false" 
    aria-controls="somePanel" 
    aria-label="Click this button to access the site navigation">
      <i class="fa-hamburger"></i>
      <span> Menu</span>
  </button>
  <div id="somePanel">
    <!-- Stuff -->
  </div>
</nav>
```

The HTML above is the starting point for a common disclosure widget, which is a `<button>` inside a `<nav>` and there is a close by logo which is also in that `<nav>`. We can determine that accessibility has at least been considered by somebody, as we have HTML5 elements, we have the `aria-expanded` state and we even have a programmatic reference with `aria-controls` property. We have an icon inside the `<button>` and some visible text which is "Menu", so we have met the requirements for 4.1.2 Name, Role, Value and 1.3.1 Info and Relationships. Awesome that's a great start, but there is one glaring issue.

Our old friend the Accessible Name and Description Computation (algorithm) rares its head. So whilst sighted users can see that the control is visually labelled as menu, what they see, is technically a lie. For a person that can see the control and does not use either a screen reader or voice input software, this is  something that they will be blissfully unaware of, they will just click the button, and go about their business.

A screen reader user that has at least enough vision to make out the text and icon will get a mismatch, what they see is not what they will hear. This is of course not perfect, but unfortuanately this wouldn't be the most inaccessible thing they encountered that day, as at least this will work, it's not great, but it's not functionally inaccessible.

A blind screen reader user will not be aware of the visible text, they will hear the AccName only, again, this is not truly "inaccessible", it still works, it still makes sense, but, I know that superfluous instrcuctions in AccNames will get really old, really quick for screen reader users and pretty much the entirety of that label is completely unnecessary, so let's break that down:

* "Click", Our screen reader user made it to your site, they don't really need to be informed on how to operate something, they did plenty of clicking to get to where they are
* "this button", they know it's a button, their screen reader told them that, when the devloper used the <button> element, they made sure this info would be passed to the accessibility tree and I'm sure our screen reader user does appreciate repetition, repetition (sorry)
* "to access the" implies that in its current 'unclicked' state, the site navigation is unavailable, the developer told them that already when they used aria-expanded="false", so our screen reader user knows that the related panel would not be currently exposed, as the state informs them it is collapsed
* Finally, we are left with "site navigation", technically that is what it is, but we are now in a situation where we have whittled down our aria-label's contents to just that and it still does not match, in fact, the accessible name "Menu" does not feature in our aria-label at all.

So, our voice users, whether they be a fan of catchphrase or not, will say what they see and absolutely nothing will happen because there is no control on the current page that has the AccName "Menu", and that info would not have been passed to the accessibility tree. So, in catchphrase terms, Roy would say his other catchphrase "It's good, but it's not right" and that will be the end of that. Now, voice input software does have alternative ways to navigate sites with poor code, such as "show, grid", "Show labels" or "show, numbers", I'm not going to explain these, they're extra steps, extra unnecessary steps and they absolutely are not an excuse to meet the SC.

### Why is this so, why does it happen?

Honestly, I can usually put it down to one of two things:

* A developer tried to help, they tried their best but do not fully understand the broader scope of disabilities and WCAG
* The framework the developer used, tried to help, but did not have a full understanding, either

There are undoubtedly a couple of more, as one example, as mnay folk have jumped on the AI hype train, then there will undoubtedly be instances in the wild, where AI has spewed out some not very good HTML, because, errm AI.

So, what about Best Intentions, when a developer uses the correct pattern like in my earlier HTML example, but also, they whack an `aria-label `on, for good measure? From a tester/developer perspective, I can understand what they were trying to achieve and in many respects, any passenger we have on the Accessibility Train is welcome, but, ARIA is a very powerful tool, it's not like chip spice (A seasoning for chipped potatoes, in the US maybe there is a fries spice?) where we may just give our chips or fries a generous coating, perhaps knowing that the more spice there is, the better. The inverse is kind of true, in that the less ARIA there is, is often (not always) better, but if somebody doesn't know how to use ARIA, then, no ARIA is usually better than bad ARIA, as is often said.

So, by trying to help screen reader users and focusing solely on their experience, we can make the experience much worse for other groups of users.

A knowledge of the AccName and AccDesc algorithm is a helpful tool, it is in fact built into the DevTools, so developers and testers can access an element's name calculation, this is a very useful tool to me, as I can take a screenshot and it assists with my explanation to the developers, but how does it actually work, under the hood and how many ways are there to create an AccName mismatch?

#### The AccName Computation

Fogetting the AccDesc part of this algorithm, we'll just look at the AccName part, as that is the only bit that can fail Label in Name, descriptions are supplementary and do no count.

Everything that is computed for the AccName has a power or precedence, and the one with the lowest precence has the greater power and will ultimately be crowned the winner of the naming tournament.

If an element or one of its descendants has only a title attribute as the name, then that is the AccName

If the node or a descendant has text contents and a title, then the AccName is the text contents and the title becomes the AccDesc

If the element has the previous naming conventions, and an aria-label, then the AccName will be the contents of the aria-label, irrespective of what the visible text is, the visible text no longer exists to the accessibility tree and we have our first mismatch

If all of those things above are present and we chuck aria-labelledby on there, with a reference to a known text node, then not only does the text label no longer exist to the accessibility tree, but the aria-label no longer exists, either. The AccName will become the referenced node computed from the aria-labelledby property, this attribute has the most power, it wins, always. aria-label has a precedence of two, it can only be overwitten by aria-labelledby.

So, ultimately the computation is deciding which name to pass to the accessibility tree, based upon a strict algorithm and a defined ruleset. there is of course more to it, my example was a link, but <label> elements and placeholder attributes will feature in the computation for inputs, but they still will not be enough to beat out the ARIA names. So, when naming something with ARIA, we need to be sure we are aware of the visble label (if any), otherwise, we create a failure.

#### Visually hidden text

This one is quite rare, but i have encountered it a few times and I genuinely do not know the intent behind it, but I flagged it, nonetheless, so let's consider the following HTML:

```
<button>
  <span aria-hidden="true">Submit</span>
  <span class="visually-hidden">Complete form</span>
</button>
```

So, in the above example we have two nodes inside a button, the first for some unknown reason has aria-hidden="true" present, which obviously tells all the browser wizardry to ignore the contents of that node and its descendants. So the wizardry will then look at the sibling node, which is not visible to anybody (unless they disable CSS) and will grab that to pass to the accessibility tree and that becomes the AccName. We now have a mismatch, visually the label says Submit, but programmatically the word "Submit" does not feature in the AccName as it is "Complete form", so again, it fails.

### A thought process

If, just for one moment we forget the meaning of each character present in all of the computed naming elements and just consider them for what they are at a base level, shapes. A sequence of known shapes that forms a pattern, which we can then decipher to be words and such (That's how I think of it). Now you know those toys that babies and toddlers have, where they improve hand-eye coordination or touch, etc, where they may have several shapes and several various shaped holes. Only one shape will ever fit inside one hole, as well they're different shapes and different sizes
