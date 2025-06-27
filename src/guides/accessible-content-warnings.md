---
title: Accessible content warnings
summary: Let's consider unsettling, triggering, flashing, animated or graphic
  content, how do we accessibly hide it, until a user wants to see it? let's
  build one
author: dlee
date: 2025-06-18
toc: true
tags:
  - HTML
  - JavaScript
  - CSS
  - Best practice
isGuide: true
---
## Intro

It's fair to say that on the web we sometimes may need to show imagery or moving images that some users do not want to see, for a multitude of reasons. The types of imagery some people do not wish to see is perhaps as vast as the reasons they do not want to see them. I do not profess to know all of the things, but I certainly know of a good few examples, so I'll list some of those, so we all know where this guide is going:

* Flashing content, this to me is the one that concerns me the most, as it can physically harm folk by causing seizures associated with photosensitive epilepsy and other neurological conditions and in some cases, people have actually died as a direct result of strobing content or accidents related that occur as a direct result of having a seizure
* Animated content, this one may cause some users to feel nausea, dizziness, migraines, distractions or a plethora of other significant and physically uncomfortable conditions
* Phobia-inducing content, some folks have phobias and these phobias can cause fear, panic, stress, anxiety and other unsettling emotional responses that have can significantly imapct our users
* Nudity or sexual content, some of our users may not wish to see such imagery or it is inappropriate for them to have it displayed on their screen at this time. Its purpose may be completely inoccuous, as it could be art, but they may have their child shoulder-surfing, they may be at work, or they just may not want to see it at all
* Violence and gore, we often encounter these types of imagery in online news articles and social media posts, they can at times be very explicit in nature, the aftermaths of natural disasters or accidents, crime scenes, the effects of war or other types of conflict, animal cruelty, medical procedures and many other types of imagery that may contain blood, death, severe injuries and many other types of gory content that could unsettle some users
* Emotional imagary, some images are published to ellicit an emotional response from users, perhaps the intention of the publisher is well-meaning, maybe they are trying to raise awareness of something, or encourage people to donate to the cause to help people, but some users may have lived through similar trauma or experiences and just seeing this type of imagery could trigger psychological episodes, cause them to relive or remember certain experiences, or cause other significantly traumatic feelings

That's just some of the things that may cause a variety of adverse effects to our users, there are likely more. The purpose of this guide isn't to say "Thou cannot show these things on the web", because that is never the purpose, the majority of imagery on reputable sites have their place on the web and whilst some users may not want to see them, some users do and accessibility is all about choice and options, it's about allowing people to access content and sites in a way that works for them. So, as developers, designers, content editors and accessibility specialists we should be making our own judgement calls about what should be initially shown or not. Also, remember that context is key, if there were a site called Top 100 Gruesome Injuries, then it goes without saying that many of the images will be quite unpleasant and a user would typically nope out of even visiting the site. Just a reminder, though, we should always prevent flashing imagery from autoplaying, even if we are working on a site called Strobes R Us, at least give the user a flow interupting modal that warns them the site is full of flashing content, as there are unfortunately people out there that will maliciously share links to flashing content, in an effort to cause users to have seizures, so no matter what, never autoplay those.

## How do we solve this problem?

Now that we have identified why some types of imagery may be problematic for some users and we have discussed some of the effects we'll want a tecnical solution for this and that's what we are going to build.

Often my guides are a direct result of something I have recently tested, I find an interesting component which I need to flag as an accessibility issue and then I may have to provide a code solution to ther developers, to show them how we could make it accessible. Sometimes these may be relatively common patterns, others they may be something a little more obscure and I see these as an interesting challenge that are often worthy of writing about.

I recently discovered a card type component that had an image that was considered "graphic" and it was obscured from the initial view. I looked at the code and decided it would benefit from a few enhancements, to ensure it is accessible. As this item is relatively obscure, I didn't find any examples in the wild, I'm sure there are many out there, but the internet is huge and I didn't find any good examples.

Now, this is one of my "How would I solve it?" guides, I am not saying this is the defcato solution, it may well be that somebody more knowledgeable could come up with a better way and if that's you, cool, feel free to get in touch and I'll update the article. In any instance, it will consider all users and will be operable to all. There are some unresolved questions I have that could be the catalyst for further discussion and perhaps improvement, but this is the kind of information that can only be learned from people with disabilities, so pay some folks to answer those questions.

So, initially, we will take a card component, we will assume it is on a news site of some sort and it has some type of disturbing image. I'm not going to put a disturbing image in there, I will just look for a non-offensive meme.

We will then modify that component to contain animated imagery, I'll find a slow moving GIF

Then we will look at how we can show or obscure multiple images at once, maybe the article that the card linked to had multiple graphic images and it would be a bit of unnecessary effort to individually reveal them all

## Let's plan this out

What functionality do we need to make this work? 

* Firstly, we will need a card, the card will be a typical card that contains a bit of text, a link and an image that is worth obscuring. Now, I'm not going to find an image that could cause any adverse effects to any of you, but I want to try and keep it on theme, at least, otherwise it's a little tricky to demo this. So, what I have done is used an AI image generator and supplied the following prompt: "Create me an image of a teddy bear that looks like he has been to war and is heavily damaged", the result is fine for our purposes, our teddy does indeed look roughed up, like he has been to battle, but perhaps not unsurprisingly, it looks in better nick than than it would have been had it spent a bit of time with a toddler
* We need a persistent button, that button should be able to obscure or reveal the image. It's important the action of revealing it can be reversed, as our user may think they will be OK viewing it and then quickly realise they are not, so may want to hide it again, sharpish, the button should also be easily identifiable
* As our button is a persistent control, it'll need a state to inform users of AT on whether it is currently obscured or revealed
* We need some form of overlay (not that type) for the image, this could be a solid background or a semi-opaque background that blurs the underlying layer
* We'd need some warning text, it's all fine and well blurring it out, but we need to tell users why it's blurred, provide them with a warning so they can make a choice

So, that's it, that is all we need to get this built to a base level, I will then discuss some problems with my approach, these problems could only be answered by users with disabilities, they're interesting, so please bear with.

## Let's build our cards

We'll just build some basic cards, the pattern is heavily based upon [Heydon pickering's Inclusive Components - cards](https://inclusive-components.design/cards/). I'm going to create three cards, but they will of course just use one base card and we'll add or manipulate it as necessary.

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



<div class="callout__tip"><span class="callout__icon"><strong class="visually-hidden">Tip: </strong></span><span class="callout__text">The first interesting question is how do we progressively enhance this? Without JS, how do we hide and show the image, whilst also making that accessibility info available to AT users? Without JS we're limited in functionality, a checkbox doesn't sound perfect, but it's something and it feels better that using a details and summary element</span></div>



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

* I have added a \`.visually-hidden\` class to the label, which some folk may take issue with, particularly on a form control, such as a checkbox. I try incorporate aesthetic into accessibility, because that's the reality down here in the trenches, we test sites that have been designed by others and often we have to come up with accessible solutions to fit that design without too much changing, visually. I also like to attempt to show that accessibility doesn't mean something can't look decent, because that's nonsense. Yes, it is a checkbox, no it does not have a visible "text" label, however, it does have a very common icon, the graphic image is obscured and there is an additional warning over the obscured image. Additionally, I have only used a checkbox for progressive enhancement purposes, I know it is not the proper control to use, but without JS, it is the best I could come up with, we'll wrangle the DOM when JS is available and all will be good
* I've added an SVG eye icon, which is ubiquitous enough to understood as reveal/hide, extra affordances are supplied by the text warning and the fact the image is obscured
* I've added an actual image and decent alt text
* I've added a handy data attribute to the card, which is \`data-warning\` with a value of \`image\`, we will use that as a handy hook for our CSS, you could use a class if you liked, we will have an alternative where that value is \`motion\`, as motion will be handled slightly differently

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

* I'm using a \`backdrop-filter\` for one our attribute has a value of \`image\`, this acts like privacy glass, it just blurs the image underneath and makes the details too blurred to perceive
* If it's a value of \`motion\` in our attribute, I do not use the blurring effect, because, well, blurred motion is still motion, right? When it is motion, I use a solid background to completely hide whatever is underneath
* I display a strikethrough at a 45deg angle on the eye icon to indicate that pressing the control will obscure the image
* I added some styles for Windows High Contrast Mode (WHCM), due to the position of the toggle button and the reality it could be situated over any variation of colours, I struggled a little with the focus indicator. It's not that adding one is difficult, of course it isn't, but the initial problem was the contrast, sure, I know how to override stuff in WHCM, but doing so would definitely work for this image, but it wouldn't for all images. What I have done is change the shape of the button on focus, I do this by simply resetting the \`border-radius: 50%;\` back to \`0;\`, which turns it back into the deafault square shape. The user agant stylesheet is handling focus ring colours for us, so in combination with what I have done (given limited testing), it clearly changes when it receives focus, and whilst it isn't the prettiest focus indicator I have seen, I'm at least content that it looks more perceivable than it did before I change its shape
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

* As any image that is worth obscuring starts obscured, we want to obscure the image in the default state
* If our handy data-attribute has a value of \`image\`, I'm using a \`backdrop-filter\` and the value is \`blur(14px)\`, which you guessed it, blurs the underlying image, I also add \`opacity\` as I wanted a slight transition
* When our data attribute's value is \`motion\`, we definitely don't want to use the blur effect here, as blurred motion is still motion, so we substitute it for a solid background colour
* Our text warning is actually the only thing that "hides", the overlay part is simply changing fron its blurred or solid background to transparent or having full opacity
* The selectors are a little complex, but in essence we are getting the content type (image or motion), then getting the container that holds our checkbox and SVG, we than want to only apply our change in style when the CSS pseudo class \`:checked\` is present on the checkbox, then we need the sibling of our wrapper, which contains the overlay and the image and finally, we drill down into the overlay, which is where the style change is applied

Now we have our core functionality irrespective of whether JS is available or not. Using a checkbox isn't totally perfect, but most folk will make sense of it.

### So, let's progressively enhance this thing:

There isn't a great deal to do, here, we're just enhancing something that we wouldn't ordinarily use JS for, so we just have a few lines, which I will explain after the snippet. I was faced with two choices, here:

* I could have entirely replaced the checkbox, stored the SVG in memory, added a button, inserted the SVG and it would have now been a button, we would of course have still needed to handle the \`aria-pressed\` state change. That's not particularly difficult to do, it's actually just basic DOM manipulation
* Or (brace youselves) I could break the second rule of ARIA "Do not change native semantics, unless you really have to." am I really breaking it, though? I mean, technically I didn't have to go down this route, I could just have chucked a button in there, then I would have had to have written some more CSS, laziness should never be an excuse and it isn't here. I could be mistaken, but my read for the following note in the second rule: "It is OK to use native HTML elements, that have similar semantics to ARIA roles used, for fallback. For example, using HTML [list elements](https://www.w3.org/TR/html51/grouping-content.html#elementdef-ul) for the skeleton of an ARIA-enabled, scripted [tree widget](http://hanshillen.github.io/jqtest/#goto_tree).", a chackbox does have somewhat "similar" semantics and we are very much interested in the fallback. Honestly, I may be stretching the interpretation here, a little, I have no doubt there will be the "Good shout" camp and the "This should be a crime" camp.

```javascript
const toggles = document.querySelectorAll('.card__overlay-toggle');

toggles.forEach(toggle => {
  toggle.setAttribute('role', 'button');
  toggle.setAttribute('aria-pressed', 'false');
  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-pressed') === 'false' ? toggle.setAttribute('aria-pressed', 'true') : toggle.setAttribute('aria-pressed', 'false');
  })
  
  toggle.addEventListener('keypress', (evt) => {
    if (evt.key === 'Enter' ) {
      toggle.click();
    }
  })
})
```

As you would have noticed, I went for the rewriting semantics option:

* I add a \`role\` with a value of \`button\`
* I add \`aria-pressed="false"\` for the initial state
* I add an event listenser where I flip the value of \`aria-pressed\` on every \`click\` event
* Finally, I add functionality for <kbd>Enter</kbd> keypresses, as checkboxes obviously don't have that. So, I simply listen for that keypress and then force a \`click\` event on it

If it looks like a duck, walks like a duck and quacks like a duck...

<div class="callout__warn"><span class="callout__icon"><strong class="visually-hidden">Warning: </strong></span><span class="callout__text">I'm not explicitly stating you should do this, I don't have access to JAWS or ORCA, I can only test NVDA on Firefox, so if you do go down this route, please do your own testing, if you find an issue, just let us know and I will chnage my example.</span></div>

So, that is that, we have done the bulk of what we set out to do, or have we? Remember when I said I had some questions that I do not know the answer to? I gave one, earlier and now it's time for another:

<div class="callout__info"><span class="callout__icon"><strong class="visually-hidden">Info: </strong></span><span class="callout__text">Accessibility work obviously covers a lot of human differences, when it comes to disability/ability, we absolutely want to cover them all, we need to do our absolute best to ensure nobody is left behind, digital stuff works for everybody and it is comparable. If an image can adversely affect a user that has sight, then by extension words can affect a user with or without sight, right? I have noped out of news articles in the past, in fact, I often do, as the graphic nature of what is being explained is difficult for me to read, I feel a range of emotions such as, anger, empathy, sadness and more, I have previously even felt nauseous. A picture may paint a thousand words, but words can often be more descriptive than an image can ever be. A photo is only ever a snapshot of something in the briefest moment of time, sure, it can be the worst moment of a particular incident, but it is still just a moment. Words do not have that limitation, I guess this is why the book is often better than the movie? So, what am I actually getting at? Well, everything we have done thus far only protects users that can see (but not all), those words, in. the alt text are just there for anybody listening along on a screen reader. I try to add a little humour to my guides, obviously I have just used AI to create a roghed up fluffy bear and described the "damage" in alt text. What if this were a living creature or a person, with significant injuries and gore and we described all of that gore perfectly in the alt text? Do we just go ahead, without warning and throw it out there to our screen reader users? Am I just overthinking things? I honestly don't know the answer here.</span></div>

Let's say I get some feedback from some screen reader users and they say what I was thinking makes sense to them, they should also be advised of the graphic details I have provided in text, then how would I go about that?

* When JS is not available, we could use the checkbox's state to accessibly hide the image, with \`display: none;\` or \`visibility: hidden\`
* We could prepend all alt text for graphic images with some additional text "Warning, graphic description, which some users may find unsettling" or words to that effect.
* If JS is available, we could toggle an \`aria-hidden\` state on the image, preventing a user from being forced into hearing the alt text, unless they have actively toggled the control

We could certainly do something, it's actually quite easy to implement that same level of safeguarding for screen reader users, as we have for users relying upon vision alone.

I simply do not know the answer, I do not know if I am "solutioneering" (searchning for solutions to non-problems) or if I am actually on to something. I will of course ask some folk who will certainly be able to give me their take on it and in turn, they could ask more screen reader users than I could. I just find this to be an interesting question, whether it is worthy of a solution or not would of course depend wholly on the lived experience of screen reader users. I am actually leaning towards I should do something to prevent graphic alt being yelped out, it makes sense to that, at least in my mind, but if I am wrong, then I'm not ashamed to say it was definitely worth discussing. At this stage I am not going to implement any of that functionality, just because I want have a few discussions, first. I will come back to this with an update, whatever the answer.

## What about a single control for many images?

There rea certainly situations where there may be many images from a particular incident, all of a similar nature, or there may be many cards on a page that have our contnet warning on them. So, some folk may not want any of the images to be obscured, so revealing all of those could be unnecessary effort. Some users will undoubtedly appreciate having the granularity that a control on each card or image would provide. So, let's do both, we don't need to change any of our card code for this, we just need a standalone control.
