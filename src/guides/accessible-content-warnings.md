---
title: Accessible content warnings
summary: Let's consider unsettling, triggering, flashing, animated or graphic
  content, how do we accessibly hide it, until a user wants to see it? let's
  build one
author: dlee
date: 2025-07-04
toc: true
tags:
  - HTML
  - JavaScript
  - CSS
  - Best practice
isGuide: true
---
## Intro

It's fair to say that on the web we sometimes may need to show images or moving images that some users do not want to see, for any number of reasons. The types of imagery some people do not wish to see is perhaps as vast as the reasons they do not want to see them. I do not profess to know all of the things, but I certainly know of a good few examples, so I'll list some of those, so we all know where this guide is going:

* Flashing content, this to me is the one that concerns me the most, as it can physically harm folk by causing seizures associated with photosensitive epilepsy and other neurological conditions and in some cases, people have actually died as a direct result of strobing content or accidents that have occurred as a direct result of having a seizure
* Animated content, this one could cause some users to feel nausea, dizziness, migraines, distractions or a plethora of other significant and physically uncomfortable effects
* Phobia-inducing content, some folks have phobias and these phobias can cause fear, panic, stress, anxiety and other unsettling emotional responses that can significantly imapct our users
* Nudity or sexual content, some of our users may not wish to see such imagery or it is inappropriate for them to have it displayed on their screen at this time. Its purpose may be completely inoccuous, as it could be art, but they may have their child shoulder-surfing, they may be at work, or they just may not want to see it at all
* Violence and gore, we often encounter these types of images in online news articles and social media posts, they can at times be very explicit in nature, the aftermaths of natural disasters, accidents, crime scenes, the effects of war or other types of conflict, animal cruelty, medical procedures and many other types of imagery that may contain blood, death, severe injuries and many other types of gory content that could unsettle or distress some users
* Emotional imagary, some images are published to ellicit an emotional response from users, perhaps the intention of the publisher is well-meaning, maybe they are trying to raise awareness of something, or encourage people to donate to the cause to help people, but some users may have lived through similar trauma or experiences and just seeing this type of imagery could trigger psychological episodes, cause them to relive or remember certain experiences, or cause other significantly traumatic feelings

That's just some of the things that may cause a variety of adverse effects to our users, there are likely more. The purpose of this guide isn't to say "Thou cannot show these things on the web", because that is never the purpose, the majority of imagery on reputable sites have their place on the web and whilst some users may not want to see them, some users do and accessibility is all about choice and options, it's about allowing people to access content and sites in a way that works for them. 

So, as developers, designers, content editors and accessibility specialists we should be making our own judgement calls about what should be initially shown or not. Also, remember that context is key, if there were a site called "Top 101 Most Gruesome Injuries", then it goes without saying that many of the images will be unpleasant and a user who does not wish to see that type of imagery would typically nope out of ever visiting the site. Just a reminder, though, we should always prevent flashing imagery from autoplaying, even if we are working on a site called Strobes R Us, at least give the user a flow interupting modal on page load that warns them the site is full of flashing content, as there are unfortunately people out there that will maliciously share links to flashing content, in an effort to cause users to have seizures, so no matter what, never autoplay those.

## How do we solve this problem?

Now that we have identified why some types of imagery may be problematic for some users and we have discussed some of the effects we'll want a technical solution for this and that's what we are going to build.

Often my guides are a direct result of something I have recently tested, I find an interesting component which I need to flag as an accessibility issue and then I may have to provide a code solution to ther developers, to show them how we could make it accessible. Sometimes these may be relatively common patterns, others they may be something a little more obscure and I see these as an interesting challenge that are often worthy of writing about.

I recently discovered a card type component that had an image that was considered "graphic" and it was obscured from the initial view. I looked at the code and decided it would benefit from a few enhancements, to ensure it is accessible. As this item is relatively obscure, I didn't find any accessible examples in the wild, I'm sure there are many out there, but the internet is huge and I didn't find any good examples.

Now, this is one of my "How would I solve it?" guides, I am not saying this is the defcato solution, it may well be that somebody more knowledgeable could come up with a better way and if that's you, cool, feel free to get in touch and I'll update the article. In any instance, it will consider all users and will be operable to all. There were a couple of questions I asked myself that could be the catalyst for further discussion and perhaps improvement, but this is the kind of information that can only be learned from people with disabilities and I cannot answer those questions on their behalf, as that is not my lived experience.

So, initially, we will take a card component, we will assume it is on a news site of some sort and it has some type of disturbing image. I'm not going to use a truly disturbing image, there is no blood, no gore and what I came up with is absolutely my best effort at a light-hearted "something like, but harmless" set of images.

I'm not a fan of AI, but I used it to generate some images, I asked it to generate a before and after image of a fluffy teddy bear, the before image is the pristine bear, the after is showing our bear, damaged in "battle". I excluded all of the images where the bear had limb-differences, etc, or what appeared to be fake blood, I used one where it has several holes, that appear charred a little. I then took the pristine static image and used a different AI platform to make an animated image of our bear, I asked that the bear be slowly waving. 

I have genuinely tried to be as inoffensive as I can, there is no symbolism or hidden meaning, it is just a fictitious bear, that has been in a fictitious battle, with some fictitious unnamed enemies. Our bear is the hero in these fictitious images, the only reactions I am going for here are:

* Trying to make some folk experience a little humour, at my randomly thought of scenario
* The kind of "Aww poor Teddy" response someone may say upon seeing a damaged teddy bear

I just wanted to show something using an inamimate object, that is loosely based upon battle as a concept, not any particular battle, I'm not making any political stances, I'm just using images that if anything are more loosely based upon movies I watched as a kid, such as "Toy Soldiers" and "Toys". As we are assuming our site is a news site, the images were selected to help illutrstae that there could be a non-graphic image and a graphic image, in as harmless a way as possible.

Then we will look at how we can show or obscure multiple images at once, maybe the article that the card linked to had multiple graphic images and it would be a bit of unnecessary effort to individually reveal them all or, maybe there are multiple cards on the page that have images obscured.

## Let's plan this out

What functionality do we need to make this work? 

* Firstly, we will need a card, the card will be a typical card that contains a bit of text, a link and our after image of Teddy, where he has sustained some damage (he's still smiling and he looks in better nick that he would after a couple of days with a toddler, anyway)
* We need a persistent button, that button should be able to obscure or reveal the image. It's important the action of revealing it can be reversed, as our user may think they will be OK viewing it and then quickly realise they are not, so may want to hide it again, sharpish, the button should also be easily identifiable
* As our button is a persistent control, it'll need a state to inform users of AT on whether it is currently obscured or revealed
* We need some form of overlay (not that type) for the image, this could be a solid background or a semi-opaque background that blurs the underlying layer
* We'd need some warning text, it's all fine and well blurring it out, but we need to tell users why it's blurred, provide them with a warning so they can make a choice

So, that's it, that is all we need to get this built to a base level, I will then discuss some problems with my approach, these problems could only be answered by users with disabilities, they're interesting, so please bear with.

## Let's build our cards

We'll just build some basic cards, the pattern is heavily based upon [Heydon pickering's Inclusive Components - cards](https://inclusive-components.design/cards/). I'm going to create three cards, but they will of course just use one base card and we'll just copy and paste that to modify..

* The first will be a standard card, with no additional functionality
* The second will be an enhaced card, with the ability to show and hide a disturbing image
* The third will also be an enhanced card, this time it will hide an animated image

Just so I don't have to keep typing "Card with obscure and reveal image functionality", I'm just going to refer to those types of cards as "enhanced" cards, from now on and regular cards will be "standard" cards.

### Let's start with some base HTML

```html
<ul class="cards">
  <li class="card">
    <div class="card__lower">
      <h2>
        <a href="/" class="card__link">
          Title of card
        </a>
      </h2>
      <p class="card__snippet">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ab vero totam.</p>
      <strong>Tags:</strong>
      <a href="/" class="card__tag">Some tag</a>
    </div>
    <div class="card__upper">
      <img src="/teddy-undamaged.png" alt="Describe image" class="card__img" id="cardImg24">
    </div>
  </li>
</ul>
```

I'm not going to go into much detail, here, as I linked Heydon's book and I wouldn't be able to articulate anything to his standard, anyway. But that is our base card, let's consider our first conundrum:

<div class="callout__tip"><span class="callout__icon"><strong class="visually-hidden">Tip: </strong></span><span class="callout__text">The first interesting question is how do we progressively enhance this? Without JS, how do we hide and show the image, whilst also making that accessibility info available to AT users? Without JS we're limited in functionality, a checkbox is a good fit here, especially with no JS, it isn't perfect when there is JS as we can obviously use a button with the correct states</span></div>

So, before we move on to CSS, we'll add that checkbox on an enhanced card, we'll also add a container that can hold some text and obscure the image and change all of our placeholder text, etc.

### Let's enhance that HTML a little

```html
<ul class="cards">
  <li class="card" data-warning="image">
    <div class="card__lower">
      <h2>
        <a href="/" class="card__link">
          Teddy injured in battle
        </a>
      </h2>
      <p class="card__snippet">Breaking news! Teddy seen damaged in battle, his badly damaged body "bearing" the horrors of conflict.</p>
      <strong>Tags:</strong>
      <a href="/" class="card__tag">Teddy</a>
    </div>
    <div class="card__overlay-ctrls">
      <input class="card__overlay-toggle" id="cardImgOverlay1" type="checkbox" aria-controls="gWarn1">
      <label class="card__overlay-label visually-hidden" for="cardImgOverlay1">Reveal graphic image</label>
      <svg class="card__overlay-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M59.715 28.969C59.238 28.176 47.863 9.594 30 9.594S.762 28.176.285 28.969a2.013 2.013 0 0 0 0 2.062C.762 31.824 12.137 50.406 30 50.406s29.238-18.582 29.715-19.375a2.013 2.013 0 0 0 0-2.062ZM30 46.399C16.66 46.398 6.973 33.741 4.398 30 6.968 26.25 16.628 13.602 30 13.602c13.34 0 23.027 12.656 25.602 16.402C53.032 33.75 43.372 46.398 30 46.398Zm0 0"/><path d="M30 16.496c-7.445 0-13.504 6.059-13.504 13.504 0 7.445 6.059 13.504 13.504 13.504 7.445 0 13.504-6.059 13.504-13.504 0-7.445-6.059-13.504-13.504-13.504Zm0 23c-5.238 0-9.496-4.262-9.496-9.496 0-5.238 4.258-9.496 9.496-9.496s9.496 4.258 9.496 9.496c0 5.234-4.258 9.496-9.496 9.496Zm0 0"/><path d="M30 24.824a5.175 5.175 0 1 0 0 10.348 5.174 5.174 0 1 0 0-10.348Zm0 0"/></svg>
    </div>
    <div class="card__upper">
      <div class="card__img-overlay">
        <p id="gWarn1">Warning: Graphic image</p>
      </div>
        <img src="teddy-damaged.png" alt="Teddy walking down a street that appears blurred in the background, yet signs of heavy damage to buildings can be made out, there is also debris on the road. Teddy has several holes on his fur, a large one is prominent on the centre of his chest, his right shoulder, right leg and right foot also appear to have taken heavy damage. Teddy is as always, still smiling" class="card__img" id="cardImg24">
    </div>
  </li>
  <!-- other cards -->
</ul>
```

I'll summarise what I have done, here:

I've added a container that contains a checkbox and a label, which are of course programmatically associated

* I have added a \`.visually-hidden\` class to the label, which some folk may take issue with, particularly on a form control, such as a checkbox. I try incorporate aesthetic into accessibility, because that's the reality down here in the trenches, we test sites that have been designed by others and often we have to come up with accessible solutions to fit that design without too much changing, visually. I also like to attempt to show that accessibility doesn't mean something can't look decent, because that's nonsense. Yes, it is a checkbox, no it does not have a visible "text" label, however, it does have a very common icon, the graphic image is obscured and there is an additional warning over the obscured image. Additionally, I have only used a checkbox for progressive enhancement purposes, I know it is not the best control to use with JS, but without JS, it is the best we could use
* I've added an SVG eye icon, which is ubiquitous enough to understand as reveal/hide, extra affordances are supplied by the text warning and the fact the image is obscured
* I've added an actual image and decent alt text
* I've added a handy data attribute to the card, which is \`data-warning\` with a value of \`image\`, we will use that as a handy hook for our CSS and JS, you could use a class if you liked, we will have an alternative where that value is \`motion\`, as motion will be handled slightly differently

So, that is our HTML all done, we just need to style the card, we only actually need CSS to get it "working" for anybody that does not have JS enabled, but we will be using a very small bit of JS for when it is available. 

### So let's style this:

I'll add the CSS in two parts, the first will be how it looks and not really that important, as you will likely have your own styles and then finally, I'll add the nifty bit that obscures or reveals the image.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  padding: 1.5rem;
  line-height: 1.25;
}

.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr));
  gap: 1rem;
  list-style: none;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border: 2px solid #b0b0b0;
  border-radius: 6px;
  max-width: 26rem;
  font-size: 1.25rem;
}

.card__lower {
  order: 2;
  padding: .5rem .25rem;
}

.card__upper {
  position: relative;
  order: 1;
}

.card__img {
  display: block;
  width: 100%;
  height: auto;
}

.card__img-overlay {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 3;
}

.card__overlay-ctrls {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  background-color: #fff;
  z-index: 4;
}

.card__overlay-ctrls::before {
  content: "";
  position: absolute;
  height: calc(100% - .5rem);
  width: 6px;
  transform: rotate(45deg) scaleY(0);
  background-color: rebeccapurple;
  z-index: 5;
  pointer-events: none;
}

@media screen and (forced-colors: active) {
  .card__overlay-ctrls::before {
    border: 3px solid ButtonText;
  }

  .card__overlay-icon {
    fill: ButtonText !important;
  }

  .card__overlay-ctrls:hover::before,
  .card__overlay-ctrls:has(input:focus)::before {
    fill: ButtonText !important;
  }

  .card__overlay-ctrls:has(.card__overlay-toggle:focus-visible) {
    border-radius: 0;
  }
}

.card__overlay-ctrls > *,
.card__overlay-ctrls::before {
  transition: all 300ms ease-in;
}

.card__overlay-ctrls:hover::before,
.card__overlay-ctrls:has(input:focus)::before {
  background-color: #fff;
}

.card__overlay-ctrls:has(.card__overlay-toggle:checked)::before {
  transform:rotate(45deg) scaleY(1);
}

.card__overlay-toggle,
.card__overlay-icon {
  position: absolute;
  z-index: 4;
}

.card__overlay-toggle {
  height:3rem;
  width: 3rem;
  opacity: 0;
  cursor: pointer;
}

.card__overlay-toggle:hover ~ .card__overlay-icon,
.card__overlay-toggle:focus ~ .card__overlay-icon {
  fill: #fff;
}

.card__overlay-ctrls:has(.card__overlay-toggle:focus),
.card__overlay-ctrls:has(.card__overlay-toggle:hover) {
  background-color: rebeccapurple;
}

.card__overlay-ctrls:has(.card__overlay-toggle:focus-visible) {
  box-shadow: 0px 0px 2px 2px #fff;
  outline: 2px solid rebeccapurple;
  outline-offset: 2px;
}

.card__overlay-icon {
  height: 2.5rem;
  width: 2.5rem;
  pointer-events: none;
  fill: rebeccapurple;
}

.card__tag:focus {
  outline: 2px solid rebeccapurple;
  outline-offset: 2px;
}

.card__link {
  display: inline-block;
  margin-bottom: .75rem;
  padding: .25rem 0;
  text-decoration: none;
  color: rebeccapurple;
}

.card__link:focus {
  outline: 3px solid transparent;
  outline-offset: 3px;
}

.card__link:focus,
.card__link:hover {
  text-decoration: underline;
  text-decoration-thickness: .25rem;
}

.card__link::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 3px;
  cursor: pointer;
  z-index: 4;
  transition: outline 300ms ease-in;
}

.card__link:focus::before {
  outline: 4px solid rebeccapurple;
  outline-offset: 3px;
}

.card__snippet {
  margin-bottom: 1rem;
}

.card__tag {
  position: relative;
  display: inline-block;
  margin: 0 .5rem;
  padding: .25rem .75rem;
  border: 2px solid rebeccapurple;
  border-radius: 1.25rem;
  text-decoration: none;
  color: white;
  background-color: rebeccapurple;
  z-index: 6;
  transition: background-color 300ms ease-in, color 300ms ease-in, outline 300ms ease-in;
}

.card__tag:focus,
.card__tag:hover {
  color: rebeccapurple;
  background-color: #fff;
}

.card__tag:focus-visible {
  text-decoration: underline;
  outline: 2px solid rebeccapurple;
  outline-offset: 2px;
}
```

There is quite a bit there, huh? Honestly, I just cobbled this together, the styles are OK, it looks half-decent, I could certainly make it look nicer, but it's fine for this guide, I also feel like the CSS could do with a little refactor, sorry. Having said that, I'm not going to explain what everything does, I'll summarise a few points, though:

* I'm using a \`backdrop-filter\` for when our attribute has a value of \`image\`, this acts like privacy glass, it just blurs the image underneath and makes the details too blurred to perceive
* If it's a value of \`motion\` in our attribute, I do not use the blurring effect, because, well, blurred motion is still motion, right? When it is motion, I use a solid background to completely hide whatever is underneath
* I display a strikethrough at a 45deg angle on the eye icon to indicate that pressing the control will obscure the image
* I added some styles for Windows High Contrast Mode (WHCM), due to the position of the toggle button and the reality it could be situated over any variation of colours, I struggled a little with the focus indicator. It's not that adding one is difficult, of course it isn't, but the initial problem was the contrast, sure, I know how to override stuff in WHCM, and doing so would definitely work for this image, but it wouldn't for all images. What I have done is change the shape of the button on focus, I do this by simply resetting the \`border-radius: 50%;\` back to \`0;\`, which turns it back into the default square shape. The user agant stylesheet is handling focus ring colours for us, so in combination with what I have done (given limited testing), it clearly changes when it receives focus, and whilst it isn't the prettiest focus indicator I have seen, I'm at least content that it looks more perceivable than it did before I changed its shape
* I placed a very subtle fade in/out effect on the overlay, as it looked a little jarring, to me. This is not necessary, I only ran this effect for 150ms, as a user may need to quickly hide an image if it unsettles them. I haven't built the 'motion' alternative yet, maybe it will make sense to do that immediately? We'll figure that out when we get there, I guess

Now for the little bit of CSS that actually hides and obscures the image:

```css
[data-warning="image"] .card__img-overlay {
  backdrop-filter: blur(14px) opacity(1);
  transition: backdrop-filter 150ms ease-in;
}

[data-warning="motion"] .card__img-overlay {
  background-color: #4bb298;
  transition: background-color 150ms ease-in;
}

[data-warning="motion"] .card__img-overlay p {
  opacity: 1;
  transition: opacity 150ms ease-in;
}

.card__img-overlay p {
  padding: .375rem;
  font-size: 1.75rem;
  color: #fff;
  background-color: #00000066;
  opacity: 1;
}

.card__overlay-ctrls:has(input:checked) ~ .card__upper > .card__img-overlay p {
  visibility: hidden;
}

[data-warning="image"] .card__overlay-ctrls:has(input:checked) ~ .card__upper > .card__img-overlay  {
  backdrop-filter: blur(0) opacity(0);
}

[data-warning="motion"] .card__overlay-ctrls:has(input:checked) ~ .card__upper > .card__img-overlay  {
  background-color: transparent;
  opacity: 0;
}
```

A quick summary:

* As any image that is worth obscuring starts obscured, we want to obscure the image in its default state
* If our handy data-attribute has a value of \`image\`, I'm using a \`backdrop-filter\` and the value is \`blur(14px)\`, which you guessed it, blurs the underlying image, I also add \`opacity\` as I wanted a slight transition
* When our data attribute's value is \`motion\`, we definitely don't want to use the blur effect here, as blurred motion is still motion, so we substitute it for a solid background colour, this is enough to satisfy WCAG 2.2.2 Pause, Stop, Hide (A), as we are of course providing controls that enable users to hide the image, reveal and hide it again, etc
* Our text warning is actually the only thing that "hides", the overlay part is simply changing from its blurred or solid background to transparent or having full opacity
* The selectors are a little complex, but in essence we are getting the content type (image or motion), then getting the container that holds our checkbox and SVG, we than want to only apply our change in style when the CSS pseudo class \`:checked\` is present on the checkbox, then we need the sibling of our wrapper, which contains the overlay and the image and finally, we drill down into the overlay, which is where the style change is applied

Now we have our core functionality irrespective of whether JS is available or not. Using a checkbox isn't totally perfect, but most folk will make sense of it as "checked" and "pressed" aren't too dissimilar.

### So, let's progressively enhance this thing:

There isn't a great deal to do, here, we're just enhancing something that we wouldn't ordinarily use JS for, so we just have a few lines, which I will explain after the snippet. I was faced with two choices, here:

* I could have entirely replaced the checkbox, stored the SVG in memory, added a button, inserted the SVG and it would have now been a button, we would of course have still needed to handle the \`aria-pressed\` state change. That's not particularly difficult to do, it's actually just basic DOM manipulation
* Or (brace youselves) I could break the second rule of ARIA "Do not change native semantics, unless you really have to." am I really breaking it, though? I mean, technically I didn't have to go down this route, I could just have chucked a button in there, then I would have had to have written some more CSS, laziness should never be an excuse and it isn't here. I could be mistaken, but my read for the following note in the second rule: "It is OK to use native HTML elements, that have similar semantics to ARIA roles used, for fallback. For example, using HTML [list elements](https://www.w3.org/TR/html51/grouping-content.html#elementdef-ul) for the skeleton of an ARIA-enabled, scripted [tree widget](http://hanshillen.github.io/jqtest/#goto_tree).", a chackbox does have somewhat "similar" semantics and we are very much interested in the fallback. Honestly, I may be stretching the interpretation here, a little, I have no doubt there will be the "Good shout" camp and the "This should be a crime" camp, but I believe this is a totally fine

```javascript
const warningCards = document.querySelectorAll('[data-warning]');

warningCards.forEach(toggle => {
  const ctrl = toggle.querySelector('.card__overlay-toggle');
  ctrl.setAttribute('role', 'button');
  ctrl.setAttribute('aria-pressed', 'false');
  ctrl.addEventListener('click', () => {
    ctrl.getAttribute('aria-pressed') === 'false' ? ctrl.setAttribute('aria-pressed', 'true') : ctrl.setAttribute('aria-pressed', 'false');

  })
  toggle.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter' ) {
      toggle.click();
    }
  })
})
```

As you would have noticed, I went for the overwriting  the semantics option:

* We get a reference to our collection of cards that contain our data attribute 
* We loop through the cards that have the attribute
* We then need to get at the checkbox within, so we store areference to that checkbox for easier manipulation
* I add a \`role\` with a value of \`button\` to the checkbox
* I add \`aria-pressed="false"\` for the initial state to the checkbox
* I add an event listenser where I flip the value of \`aria-pressed\` on every \`click\` event
* Finally, I add functionality for <kbd>Enter</kbd> keypresses, as checkboxes obviously don't have that. So, I simply listen for that keypress and then force a \`click\` event on it

If it looks like a duck, walks like a duck and quacks like a duck...

<div class="callout__warn"><span class="callout__icon"><strong class="visually-hidden">Warning: </strong></span><span class="callout__text">I'm not explicitly stating you should do this, This is a case of it works with my limited testing, you would need to do your own testing if going down this route</span></div>

So, that is that, we have done the bulk of what we set out to do, or have we? Remember when I said I had some questions that I do not know the answer to? I gave one, earlier and now it's time for another:

<div class="callout__info"><span class="callout__icon"><strong class="visually-hidden">Info: </strong></span><span class="callout__text">Everything we have done visually hides the imagery on the cards and apart from changing the state of the controls, not a great deal else happens. This will be fine in many situations, but in others it won't. Words can cause distress and a screen reader user can still get at the words contained in the alt text. Should there be situations where we hide the image from AT, as those words are also of a graphic nature? I think so, but I guess, it depends.</span></div>

We can probably rule out motion images, I doubt something along the lines of "\[Famous person's name] seen leaving awards ceremony, dozens of photographers are all taking pictures, their cameras are causing a high level of strobing effects from their bright flashes" could impact anybody. In this case, explaining the thing cannot cause the same level of harm as seeing the thing would for a user that has photosensitive epilepsy, etc.

Some images may be distasteful, visually, but explaining them in text may not be quite as bad to somebody. 

But, let us just imagine that some images are extremely disturbing, they show something so visually distressing, in gory detail and the sole purpose of said image was to show the level of gore, to make an impact.What do we do here? Do we just let a screen reader user navigating with their cursors just get at the alt text, without revealing the image? If the book is often better than the movie, then logic dictates that words can in fact be more descriptive, they can explain in every detail what a user is looking at, but they are not sure what exactly they are looking at without some form of explanation. I know a picture is said to be able to speak a thousand words, but I'd have to disagree on that old trope, as personally, I have felt a range of physical responses and emotions from reading an article and have had to nope out of reading it as I have found it to graphic, to harrowing and too uncomfortable to continue.

I have not implemented any functionality in my prototypes to hide any image from screen reader users and that is primarily because I'd like to get the feedback of some screen reader users before recommending anything.

It's not difficult to do this, from a code perspective, what I would do is:

* For our card that has a graphic image and JS is deactivated, I would simply add \`visibility: hidden;\` to the image, which would be tied to the state of the checkbox. We are doing that for the supplemental warning text, so we would just be selecting the image in that very same way, albeit with a modified selector
* When JS is available we could simply add 'aria-hidden="true"\` to the image when it is obscured, and then toggle the value to \`false` when it is not
* Or, maybe that is actually overkill, maybe I'm overthinking it? Maybe just prepending tha alt text with "Warning, graphic description which some users may find unsettling" would be a better shout?

There is of course an element of complxity, here, in that who decides which images are fine to have the alt accessible to screen reader users at all times or if some are worthy of hiding the alt? Would it create additional confusion if just some images' alt text was hidden from AT until the control was pressed and some weren't? Probably, as similar controls should have similar behaviour, right?

I simply do not know what is the best solution, here I do not know if I am "solutioneering" (searchning for solutions to non-problems) or if I am actually on to something. I will of course ask some folk who will certainly be able to give me their take on it and in turn, they could ask more screen reader users than I could. I just find this to be an interesting question, whether it is worthy of a solution or not would of course depend wholly on the lived experience of screen reader users. I am actually leaning towards I should do something to prevent graphic alt being yelped out, it makes sense to, at least in my mind, but if I am wrong, then I'm not ashamed to say it was definitely worth discussing. At this stage I am not going to implement any of that functionality, just because I want have a few discussions, first. I will come back to this with an update, whatever the answer.

## What about a single control for many images?

What if we have many images, moving or static on a single page? Not everybody runs the risk of becoming distressed by images and not everybody is affected by motion or strobing effects. Let us imagine there are 20 cards or whatever that are obscured, some users may find this frustrating, having to reveal each one, independently, so a reveal all control makes sense, right?

Before we cobble something together, let us just think a little about this. We may have a user that is unaffected by distressing images, they may be visiting our site  to see those images, to understand the affects of what has happened in a tragedy or something, but, this person may also have photosensitive epilepsy, so whilst they want to reveal all of the static images, they certainly don't want to reveal moving images, which may contain strobing, such as gunfire, or multiple flashes from reporters' cameras. By considering the fact that we have two different types of content that can be hidden and users can experience negative effects from one type, both types or none at all, then it makes sense to provide a level of granularity that accomodates that, doesn't it? What we will make is three controls:

* The first will toggle the visibility of all static images and static images only
* The second will toggle the visibility of all moving images and moving images only
* The third will of course toggle the visibility of all images

I think the above provides our users with the best level of options, as they can toggle any of the two types of image, all images and of course should they only be affected by anything more specific than moving or static, they can at least operate the control on each image. I am not goind to progressively enhance this, because whilst I could certainly get three checkboxes to hide and reveal in a similar fashion to what our JS version will do, I cannot manipulate the state of the independent checkboxes on each card, without JS. So the checked/unchecked states of each card's control has the potential to become confusing. So this is purely an enhancement that is only available when the user has JS, I believe I have done everything I can for users that opt to view without JS and now I've hit the hard limit of what I can achieve with CSS and HTML alone, without the potential for unnecessary confusion. so, let's jump in:

### The HTML

```erb
<fieldset class="group-image__controls">
  <legend class="group-image__label">Content warning controls</legend>
  <button class="group-image__btn" aria-pressed="false" data-group="graphic">
    Show all graphic images 
    <span class="group-image__btn-icon"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M59.715 28.969C59.238 28.176 47.863 9.594 30 9.594S.762 28.176.285 28.969a2.013 2.013 0 0 0 0 2.062C.762 31.824 12.137 50.406 30 50.406s29.238-18.582 29.715-19.375a2.013 2.013 0 0 0 0-2.062ZM30 46.399C16.66 46.398 6.973 33.741 4.398 30 6.968 26.25 16.628 13.602 30 13.602c13.34 0 23.027 12.656 25.602 16.402C53.032 33.75 43.372 46.398 30 46.398Zm0 0"/><path d="M30 16.496c-7.445 0-13.504 6.059-13.504 13.504 0 7.445 6.059 13.504 13.504 13.504 7.445 0 13.504-6.059 13.504-13.504 0-7.445-6.059-13.504-13.504-13.504Zm0 23c-5.238 0-9.496-4.262-9.496-9.496 0-5.238 4.258-9.496 9.496-9.496s9.496 4.258 9.496 9.496c0 5.234-4.258 9.496-9.496 9.496Zm0 0"/><path d="M30 24.824a5.175 5.175 0 1 0 0 10.348 5.174 5.174 0 1 0 0-10.348Zm0 0"/></svg></span>
  </button>
  <button class="group-image__btn" aria-pressed="false" data-group="motion">
  Show all moving images 
  <span class="group-image__btn-icon"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M59.715 28.969C59.238 28.176 47.863 9.594 30 9.594S.762 28.176.285 28.969a2.013 2.013 0 0 0 0 2.062C.762 31.824 12.137 50.406 30 50.406s29.238-18.582 29.715-19.375a2.013 2.013 0 0 0 0-2.062ZM30 46.399C16.66 46.398 6.973 33.741 4.398 30 6.968 26.25 16.628 13.602 30 13.602c13.34 0 23.027 12.656 25.602 16.402C53.032 33.75 43.372 46.398 30 46.398Zm0 0"/><path d="M30 16.496c-7.445 0-13.504 6.059-13.504 13.504 0 7.445 6.059 13.504 13.504 13.504 7.445 0 13.504-6.059 13.504-13.504 0-7.445-6.059-13.504-13.504-13.504Zm0 23c-5.238 0-9.496-4.262-9.496-9.496 0-5.238 4.258-9.496 9.496-9.496s9.496 4.258 9.496 9.496c0 5.234-4.258 9.496-9.496 9.496Zm0 0"/><path d="M30 24.824a5.175 5.175 0 1 0 0 10.348 5.174 5.174 0 1 0 0-10.348Zm0 0"/></svg></span>
</button>
  <button class="group-image__btn" aria-pressed="false" data-group="all">
    Show all imagery 
    <span class="group-image__btn-icon"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M59.715 28.969C59.238 28.176 47.863 9.594 30 9.594S.762 28.176.285 28.969a2.013 2.013 0 0 0 0 2.062C.762 31.824 12.137 50.406 30 50.406s29.238-18.582 29.715-19.375a2.013 2.013 0 0 0 0-2.062ZM30 46.399C16.66 46.398 6.973 33.741 4.398 30 6.968 26.25 16.628 13.602 30 13.602c13.34 0 23.027 12.656 25.602 16.402C53.032 33.75 43.372 46.398 30 46.398Zm0 0"/><path d="M30 16.496c-7.445 0-13.504 6.059-13.504 13.504 0 7.445 6.059 13.504 13.504 13.504 7.445 0 13.504-6.059 13.504-13.504 0-7.445-6.059-13.504-13.504-13.504Zm0 23c-5.238 0-9.496-4.262-9.496-9.496 0-5.238 4.258-9.496 9.496-9.496s9.496 4.258 9.496 9.496c0 5.234-4.258 9.496-9.496 9.496Zm0 0"/><path d="M30 24.824a5.175 5.175 0 1 0 0 10.348 5.174 5.174 0 1 0 0-10.348Zm0 0"/></svg></span>
  </button>
</fieldset>
```

* We want to group our controls, here, as they all have a relationship to one another, so the `<fieldset>` element provides us with that programmtic grouping
* We then add a group label, which makes it clear what the controls are for, so we reach for the `<legend>` element
* As we cannot progressively enhance this part properly, we have no need to break the second rule of ARIA, so we will just use proper `<button>\` elements, with the \`aria-pressed\` attribute, which we will of course need to change with JS
* For consistency, I'm going to use exactly the same icon in these three buttons, as I have used on the independent controls, for each card. They all contain an explicit and unique text label, but we need a visual indicator to show when a button is pressed or not, so to me, it makes sense to use the same icon, as it is communicating the same thing, albeit for multiple items, there is a little nuance, here, as we will have an additional state, I'll explain this later
* I've also added a data attribute to each, with a unique value that represents what will change, as we'll need to modify the states of these buttons, if a user interacts with any of the individual card controls and this will just provide a specific hook for doing so
* Also, what I haven't shown in the HTML is I am going to copy and paste all three cards, as I need more than one of each type to explain our third state and demo how that will work

Obviously this isn't production ready code, not that it's "bad", just that in reality, I'd either be using a templating language, such as Nunjucks and/or I would use the `<use>` tag, to include the svg we keep defining over and over. The primary benefit to that being it tidies up the HTML a bit, maybe it's a little faster or maybe it isn't, I doubt either way would cause any noticeable speed differences, as we are just using vanialla web technologies, so we don't have to import JS and CSS frameworks, which we would then expect our users to download.

We also now have three cards to demo this:

```html
<ul class="cards">
  <li class="card">
    <div class="card__lower">
      <h2>
        <a href="/" class="card__link">
          Our hero, Teddy
        </a>
      </h2>
      <p class="card__snippet">Teddy seen strutting his stuff and unscathed, walking across the battlefield after an intense battle with The Dolls.</p>
      <strong>Tags:</strong>
      <a href="/" class="card__tag">Teddy</a>
    </div>
    <div class="card__upper">
      <img src="/teddy-undamaged.png" alt="Teddy walking down a street that appears blurred in the background yet signs of heavy damage to buildings can be made out, there is also debris on the road. Teddy is in pristine condition,  he appears clean and unscathed, he is as ever, smiling." class="card__img" id="cardImg24">
    </div>
  </li>
  <li class="card" data-warning="image">
    <div class="card__lower">
      <h2>
        <a href="/" class="card__link">
          Teddy injured in battle
        </a>
      </h2>
      <p class="card__snippet">Breaking news! Teddy seen damaged in battle, his badly damaged body "bearing" the horrors of battle.</p>
      <strong>Tags:</strong>
      <a href="/" class="card__tag">Teddy</a>
    </div>
    <div class="card__overlay-ctrls">
      <input class="card__overlay-toggle" id="cardImgOverlay1" type="checkbox">
      <label class="card__overlay-label visually-hidden" for="cardImgOverlay1">Reveal graphic image</label>
      <svg class="card__overlay-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M59.715 28.969C59.238 28.176 47.863 9.594 30 9.594S.762 28.176.285 28.969a2.013 2.013 0 0 0 0 2.062C.762 31.824 12.137 50.406 30 50.406s29.238-18.582 29.715-19.375a2.013 2.013 0 0 0 0-2.062ZM30 46.399C16.66 46.398 6.973 33.741 4.398 30 6.968 26.25 16.628 13.602 30 13.602c13.34 0 23.027 12.656 25.602 16.402C53.032 33.75 43.372 46.398 30 46.398Zm0 0"/><path d="M30 16.496c-7.445 0-13.504 6.059-13.504 13.504 0 7.445 6.059 13.504 13.504 13.504 7.445 0 13.504-6.059 13.504-13.504 0-7.445-6.059-13.504-13.504-13.504Zm0 23c-5.238 0-9.496-4.262-9.496-9.496 0-5.238 4.258-9.496 9.496-9.496s9.496 4.258 9.496 9.496c0 5.234-4.258 9.496-9.496 9.496Zm0 0"/><path d="M30 24.824a5.175 5.175 0 1 0 0 10.348 5.174 5.174 0 1 0 0-10.348Zm0 0"/></svg>
    </div>
    <div class="card__upper">
      <div class="card__img-overlay"><p>Warning: Graphic image</p></div>
      <img src="teddy-damaged.png" alt="Teddy walking down a street that appears blurred in the background, yet signs of heavy damage to buildings can be made out, there is also debris on the road. Teddy has several holes on his fur, a large one is prominent on the centre of his chest, his right shoulder, right leg and right foot also appear to have taken heavy damage. Teddy is as always, still smiling" class="card__img" id="cardImg24">
    </div>
  </li>
  <li class="card" data-warning="motion">
    <div class="card__lower">
      <h2>
        <a href="" class="card__link">
          Teddy seen in high spirits
        </a>
      </h2>
      <p class="card__snippet">Teddy seen waving to his supporters, from the battlefield, as he is away on active duty, ridding the world of The Dolls.</p>
      <strong>Tags:</strong>
      <a href="/tag24.html" class="card__tag">Teddy</a>
    </div>
    <div class="card__overlay-ctrls">
      <input class="card__overlay-toggle" id="cardImgOverlay3" type="checkbox">
      <label class="card__overlay-label visually-hidden" for="cardImgOverlay3">Reveal animated image</label>
      <svg class="card__overlay-icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M59.715 28.969C59.238 28.176 47.863 9.594 30 9.594S.762 28.176.285 28.969a2.013 2.013 0 0 0 0 2.062C.762 31.824 12.137 50.406 30 50.406s29.238-18.582 29.715-19.375a2.013 2.013 0 0 0 0-2.062ZM30 46.399C16.66 46.398 6.973 33.741 4.398 30 6.968 26.25 16.628 13.602 30 13.602c13.34 0 23.027 12.656 25.602 16.402C53.032 33.75 43.372 46.398 30 46.398Zm0 0"/><path d="M30 16.496c-7.445 0-13.504 6.059-13.504 13.504 0 7.445 6.059 13.504 13.504 13.504 7.445 0 13.504-6.059 13.504-13.504 0-7.445-6.059-13.504-13.504-13.504Zm0 23c-5.238 0-9.496-4.262-9.496-9.496 0-5.238 4.258-9.496 9.496-9.496s9.496 4.258 9.496 9.496c0 5.234-4.258 9.496-9.496 9.496Zm0 0"/><path d="M30 24.824a5.175 5.175 0 1 0 0 10.348 5.174 5.174 0 1 0 0-10.348Zm0 0"/></svg>
    </div>
    <div class="card__upper">
      <div class="card__img-overlay"><p>Warning: Motion</p></div>
      <img src="teddy-waving.gif" alt="Teddy is waving towards the camera, a gentle breeze can be seen blowing on greenery in the background, teddy looks happy and in high spirits" class="card__img" id="cardImg24">
    </div>
  </li>
</ul>
```

### Now let's style these buttons

As I don't want to have to edit the CSS we already have, I'm going to just style these separately, in reality, much of what I'm doing here could be reduced by combing selectors, for existing elements, but then I'd have to show the full CSS again and it gets a little unwieldy.

```css
.no-js .group-image__controls {
  display: none;
}

.group-image__controls {
  display: grid;
  justify-content: end;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: .75rem;
  margin-bottom: 2rem;
  padding: .5rem .75rem;
  max-width: 52rem;
}

.group-image__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rebeccapurple;
  border-radius: 6px;
  padding: .5rem 1.25rem;
  background-color: rebeccapurple;
  color: #fff;
  transition: color 300ms ease-in, background-color 300ms ease-in, outline 300ms ease-in;
  cursor: pointer;
}

.group-image__btn:hover,
.group-image__btn:focus {
  color: rebeccapurple;
  background-color: #fff;
}

.group-image__btn:focus-visible {
  outline: 2px solid rebeccapurple;
  outline-offset: 2px;
}

.group-image__btn-icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: .5rem;
  width: 1.75rem;
  height: 1.75rem;
}

.group-image__btn-icon::before {
  content: "";
  position: absolute;
  height: calc(100% - .25rem);
  width: 4px;
  transform: rotate(45deg) scaleY(0);
  background-color: #fff;
  z-index: 5;
  pointer-events: none;
  transition: all 300ms ease-in;
}

.group-image__btn:hover .group-image__btn-icon::before,
.group-image__btn:focus .group-image__btn-icon::before {
  background-color: rebeccapurple;
}

.group-image__btn:hover svg, 
.group-image__btn:focus svg {
  fill: rebeccapurple;
}

[aria-pressed="true"] .group-image__btn-icon::before {
  transform: rotate(45deg) scaleY(1);
}

[aria-pressed="mixed"] .group-image__btn-icon::before {
  transform: rotate(90deg) scaleY(1.1);
}

.group-image__btn-icon svg {
  height: 1.5rem;
  width: 1.5rem;
  fill: #fff;
  transition: fill 300ms ease-in;
}
```

Not a great deal to discuss here, as it's pretty much similar to what we have done previously, but just a couple of points:

* Assuming we have a way to detect that JS didn't load, usually a class on the `<html>\` element, then we don't want to display this widget at all, there is no point, as it won't work, so \`display: none;\` is what we need here
* We now have a style for \`aria-pressed="mixed"\` as that is the third state we need, essentially, as the buttons control multiple items, that each individually have their own controls, we need a third state when neither all images or no images (of that type, or in the case of the button that toggles all, all imagery) are revealed, because neither \`true\` or \`false\` is entirely accurate, so we have \`mixed\` and that is exactly the purpose of that value. Honestly, the best I could come up with here was a horizontal line through the eye icon, so I adjust the rotation a further 45deg and I also make it scale a tiny bit more. It's perfectly imperfect, I know. If I could do SVG wizardry and animate them, I'd probably make the eye half open, or squint or something, but I'm really not that cool, so we'll have to roll with the horizontal line, which does look sufficiently different to indicate a third state, how users perceive or understand that, I'm not sure, but tri-state checkboxes often have the horizontal line whn their state in "indeterminate", and that's my reasoning for that

### Now let's get um working

```javascript
const warningCards = document.querySelectorAll('[data-warning]');
// Set some more variables for later
const groupToggles = document.querySelectorAll('.group-image__btn');
const graphicBtn = document.querySelector('[data-group="image"]');
const motionBtn = document.querySelector('[data-group="motion"]');
const allBtn = document.querySelector('[data-group="all"]');

// Functionality for clicking the individual image controls
warningCards.forEach(card => {
  const ctrl = card.querySelector('.card__overlay-toggle');
  ctrl.setAttribute('role', 'button');
  ctrl.setAttribute('aria-pressed', 'false');
  ctrl.addEventListener('click', () => {
    ctrl.getAttribute('aria-pressed') === 'false' ? ctrl.setAttribute('aria-pressed', 'true') : ctrl.setAttribute('aria-pressed', 'false');
    // Call a funtion which will apply the correct states to the group buttons
    assignGroupBtnState(ctrl.closest('.card'), ctrl.getAttribute('aria-pressed'));
  })
  card.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter' ) {
      card.click();
    }
  })

})

// Change the state on the grouped buttons after a click event
groupToggles.forEach(btn => {
  btn.addEventListener('click', (evt) => {
    // We can never set the button that is clicked state to 'mixed' by clicking it, so if it isn't 'false' we set it to 'false'
    btn.getAttribute('aria-pressed') !== 'false' ? btn.setAttribute('aria-pressed', 'false') : btn.setAttribute('aria-pressed', 'true');
    let pressedState = btn.getAttribute('aria-pressed');
    let groupVal = btn.getAttribute('data-group'); 
    // Function calls controlling the hiding or revealing of the images and then another to ensure the grouped buttons have the correct state at all times
    controlMultiple(pressedState, groupVal);
    manageGroupBtnsState(pressedState, evt.target);
  })
});

// Toggle the visibility of images, based upon which button was pressed, either motion, all, or graphic images
const controlMultiple = (state, val) => {
  warningCards.forEach(card => {
    let stateBoolean;
    state === 'true' ? stateBoolean = true : stateBoolean = false;

    if (card.getAttribute('data-warning') === val && val !== 'all') {
      card.querySelector('.card__overlay-toggle').setAttribute('aria-pressed', state);
      card.querySelector('.card__overlay-toggle').checked = stateBoolean;
    } else if (card.hasAttribute('data-warning') && val === 'all') {
      card.querySelector('.card__overlay-toggle').setAttribute('aria-pressed', state);
      card.querySelector('.card__overlay-toggle').checked = stateBoolean;
    }
  }) 
}

// Ensure The Show all button correctly has the state applied, that is determined by the sates of the other two buttons
const manageGroupBtnsState = (pressedState, pressedBtn) => {
  groupToggles.forEach(btn => {
    if (pressedBtn === allBtn) {
      pressedState === 'true' ? btn.setAttribute('aria-pressed', 'true') : btn.setAttribute('aria-pressed', 'false');
    } else if (pressedBtn !== allBtn && graphicBtn.getAttribute('aria-pressed') !== motionBtn.getAttribute('aria-pressed')) {
      allBtn.setAttribute('aria-pressed', 'mixed')
    } else if (pressedBtn !== allBtn && graphicBtn.getAttribute('aria-pressed') === motionBtn.getAttribute('aria-pressed')) {
      allBtn.setAttribute('aria-pressed', pressedState);
    }
  })
}

// Apply the correct state to the group buttons, when individual image controls are interacted with
const assignGroupBtnState = (card, pressedState) => {      
  const warningType = card.getAttribute('data-warning');
  const cardsOfType = document.querySelectorAll(`[data-warning="${warningType}"]`).length;
  const lastStateCount = document.querySelectorAll(`[data-warning="${warningType}"] [aria-pressed="${pressedState}"]`).length;

  if (lastStateCount < cardsOfType) {
    document.querySelector(`[data-group="${warningType}"]`).setAttribute('aria-pressed', 'mixed');
    allBtn.setAttribute('aria-pressed', 'mixed');
  } else if (lastStateCount === cardsOfType && pressedState === 'true') {
    document.querySelector(`[data-group="${warningType}"]`).setAttribute('aria-pressed', 'true');
    if (warningCards.length === document.querySelectorAll('[data-warning] [aria-pressed="true"]').length) {
      allBtn.setAttribute('aria-pressed', 'true');
    }
  } else if (lastStateCount === cardsOfType && pressedState === 'false' ) {
    document.querySelector(`[data-group="${warningType}"]`).setAttribute('aria-pressed', 'false');
    if (document.querySelectorAll('[data-warning] [aria-pressed="true"]').length === 0) {
      allBtn.setAttribute('aria-pressed', 'false');
    }
  } 
}
```

So this actually turned out a little more difficult than I'd expected as there were quite a few extra considerations, but it works as intended now. So I'll explain what I needed to achieve:

* Setting either the button for motion images or graphic images to pressed should set the \`aria-pressed\` state of that particular button to \`true\`

  * It should also set the \`aria-pressed\` state of all corresponding images on the cards to \`true\` and in addition, it should set the hidden checkbox to \`checked\`, which of course will reveal those image types
  * If revealing all of those images, we need to check that all of the other type of images are not also fully revealed, if they are not, we need to set the \`aria-pressed\` state of the Show all imagery button to \`mixed\`, if they are all shown then we need to set the state of Show all imagery to \`true\`
* Setting any of the buttons' state to \`false\` again needs to check that no other cards have an image which is revealed, if there are no images revealed, then we need to set the Show all imagery button's state to false, if there is at least one image displayed then we need to set the Show all imagery button's state to \`mixed\`

  * This would of course hide all corresponding images
* Setting the state of the Show all imagery button to \`pressed\` will reveal all images of both types

  * In addition, it will set both the image type buttons' states for image type to \`true\`
* Setting the Show all imagery button's state to \`false\` will hide all images and set all three group buttons' state to \`false\`
* Clicking an individual control on a card and setting state to \`true\` needs to check two things:

  * Are there other images that are currently hidden, if that is true, then it needs to set the state on the Show all imagery button to \`mixed\`, if that is false it will need to set that value to \`true\`
  * Are all images of that type (motion or graphic) currently displayed? If that is true, then set its corresponding group button's state to \`true\` else it should be \`mixed\`
* Hiding any image with an individual card control should check the following:

  * Are all images of that type now hidden? If true, set the corresponding group button's state to \`false\`, if not, set it to \`mixed\`
  * Are there any images of both types not hidden? if not all three group buttons' states are set to \`false\`

I think that sums it up, I have made similar controls before, but just for 1-dimensional collections, such as a group of accordions, this requires just two types of button "Expand all" and "Collapse all", and I was only controlling the state of a collection of items that were all the same. This was certainly a little more challenging, three buttons, controlling two types of collection or both collections and maintaining logical and correct states through all of the moving parts, at all times. It was a fun challenge, though, I'm sure the code could be reduced and refactored a little, but it works and this is just a proof of concept. But it was definitely a fun exercise.

## The CodePen

<p class="codepen" data-height="300" data-default-tab="js,result" data-slug-hash="NPqZyWJ" data-pen-title="Toggle image visibility cards" data-preview="true" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">

  <span>See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/NPqZyWJ">

  Toggle image visibility cards</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)

  on <a href="https://codepen.io">CodePen</a>.</span>

</p>

<script async src="https://public.codepenassets.com/embed/index.js"></script>

## Wrapping up

We have finished our image visibility toggle functionality, we also added the abilty to reveal or hide multiple, based upon image type, motion or graphic imagery. It's not perfect, as we are not hiding it from screen reader users and I don't even know if we should, I suspect we should with some images, but I'd want to get this right before adding it into a guide, so we will reach out to folk and get their feedback.

It could also have done with a little code refactor and some minor CSS adding, but as is often the case, time becomes a factor and more testing beckons.

At the very least, hopefully this serves as a decent foundation for any similar funcionality you may have been wanting to implemement. Rememeber to have those conversations if the images you need to obscure are extremely graphic and of course, rememeber to do your own testing.
