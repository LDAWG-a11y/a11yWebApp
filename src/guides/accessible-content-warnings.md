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
      <a href="/" class="card__tag">Some tag</a>
    </div>
    <div class="card__upper">
      <img src="" alt="Describe image" class="card__img" id="cardImg24">
    </div>
  </li>
</ul>
```

I'm not going to go into much detail, here, as I linked Heydon's book and I wouldn't be able to articulate anything to his standard, anyway. But that is our base card, let's consider our first conundrum:



<div class="callout__tip"><span class="callout__icon"><strong class="visually-hidden">Tip: </strong></span><span class="callout__text">The first interesting question is how do we progressively enhance this? Without JS, how do we hide and show the image, whilst also making that accessibility info available to AT users? Without JS we're limited in functionality, a checkbox doesn't sound perfect, but it's something and it feels better that using a details and summary element</span></div>
