---
title: Accessible carousels
summary: Let's look at how we can build accessible carousels, to be as usable as
  possible, using the correct ARIA and HTML, whilst also baking in additional
  usability features
author: dlee
date: 2026-09-30
toc: true
tags:
  - HTML
  - JavaScript
  - HTML
isGuide: true
---
## Intro

I was recently tasked with creating a guide that offered a solution to a small inaccessible carousel. The carousel in question was a small slider, each of the three slides presented a single statistic about a degree course. This widget was created by the Office for Students and it must be displayed on course pages for all higher education degree courses. As it wasn't accessible, that means that hundreds of academic institutions are hosting the widget embed across thousands of courses. In fact, it is said that there are around 750,000 HE applicants each year, in the UK. That's a lot of interactions, especially as some courses may have variations and a widget has to be displayed for each variation, and then it's likely students will not just look at one course, they will look at many, so the true number of times these widgets are encountered could easily be several million. It can be quite disheartening when you work in a sector that legally has to have accessible websites and apps, etc, more so when you're lucky enough to work for an employer that actually cares more about the needs of students and colleagues than the laws themselves, then you're also legally obliged to display the inaccessible content a governmental department created.

Whilst I was writing the aforementioned guide and building out the very basic implementation of a carousel, I thought it would be useful to finally delve deeper into building a fully fledged carousel and exploring a couple of options. This is something I've been meaning to do for a while, but never managed to get around to it. Part of the reason why I never got around to it is carousels are almost universally hated in the accessibility community and in many parts of the UX community, too. Whilst a lot of that discourse is warranted, a lot of it appears to stem from inaccessible carousels, overuse of carousels and of course misuse of carousels:

* Most carousels are inaccessible, let's face it, we're always going be up against that, but the same can be true of any other component, it's just that carousels are more complex than nav menus, etc
* Often carousels are carousels can be overused, they're used in multiple places on the same page or site where it may make accessing the info they contain become a laborious chore, a frustrating treasure hunt for snippets of info and that frustration is exacerbated if the carousel was inaccessible in the first place
* Carousel misuse, oftentimes I encounter a carousel that didn't really need to be a carousel, it didn't warrant the finicky mechanics to stack just a few snippets of info or imagery into such a widget and an alternative component could have been used to display that info front and centre, especially when that content is vital for understanding something

But the above being said, carousels have a place when done correctly, if we were to bring up a property search website to look for a new home to rent or buy, we'd almost  certainly encounter a carousel, as it's a convenient way of stacking a bunch of images into the same discrete component. They are related to the home, showing 20, 30 or more images on a single page may be overwhelming for some, especially if they just want to find the property details, before they waste time deciding where they're going to be put their TV in a house they'll never live in, as there may be something in the particulars that makes it unsuitable for them.

So, I'm just going to build a few carousel types, we will have an auto-rotating type, but I'll intentionally make that a slower transition, I'll also provide ways to pause, stop or hide that carousel and well start with progressive enhancement and also we'll add in a couple of other features to increase the usability for as many people as we can, so let's get stuck in:

## Our accessible base

As always, we'll just start from some base HTML, which will be a bunch of images and a heading, which we'll then style it a little, so it's available if for whatever reason, JS isn't available.

Once we have done that, we'll wraggle the DOM with JS to add in the carousel functionality and any associated behaviours and options.

I'm just going to use five images, for no other reason other than five kind of seems to be the minimum number of things that would warrant the legwork of making a carousel, but that's just my own personal opinion. I will of course choose images with different sizes and orientations. just to mix it up, a little. Whilst I am only using five images, we'll do so with the expectation this could include many more, I'm just using five for convenience.

When I write the code the images will pont to a folder in my project, but the full code on CodePen will differ, in that I have to link to the source of that image and load it from there, because that's how CodePen works.

I'm not going to use any fancy image processing, so each image will just have a single asset, we won't be calling the most appropriate size or format for the viewport or browser, because that's something we'd do in the backend or templates, etc.

First we'll get the non-carousel stuff out of the way, as the likelihood is I'll be using CSS on some of that, so for completeness, I'll include it:

```
<main>
  <h1 class="main__title">ACME homepage</h1>
  <p class="main__subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis libero in.</p>
<!-- Our carousel will go here -->
</main>
```

Just a `<main>` landmark, a `<h1>` and a little bit of placeholder text in a `<p>` tag.

We need a way to detect if JS is enabled, so let's do that now:

```
<!DOCTYPE html>
<html lang="en" class="no-js">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
      document.documentElement.classList.remove('no-js');
      document.documentElement.classList.add('has-js');
    </script>
    <title>Carousel example</title>
  </head>

```

There's only really two points of interest, here. The rest is just the absolute minimum `<head>` stuff, which we would of course add to:

* We have a `.no-js` class on the `<html>` element, as this serves as the default classname we can use as a hook
* We have a small `<script>` in the `<head>` where we get the `<html>` element with `document.documentElement` and then access that element's `classList`, we then `remove` the `.no-js` class and then `add` `.has-js`

The above can only run when JS is avilable, so we have a convenint hook for our functionality and CSS.

What we will do now is is add as much of the base HTML as we can. Much of that won't be used when JS is unavailable, sure, we could add it with JS, but for simplicity's sake and reducing the size of our JS file, we'll take a few extra bytes of redundant HTML and ARIA, as long as it has zero effect on the non-JS version or we can hide it.

As I mentioned earlier, a primary use-case for using a carousel is to not occupy too much valuable screen "real estate". We only have five images, but let's assume we're working for an estate agents (Realator? in the US) and we're tasked with building this widget. We get the brief and it states it can contain one or more images. I don't personally know if there is an upper limit, but my modest little house would have 10 - 20, tops, depending on how trigger happy the estate agent was with their camera. If we were selling a massive stately home, full of history, maybe that listing could contain 60 or more images? I did just have a quick look and the most I could find was 46 images of a single property, I'm sure there will be more for some properties.

That's a lot of images. Do we really want to just chuck them all on the page? That wouldn't be great for anyone, especially as we'd obviously add alt text to each. On a mobile that would be a hell of a lot of scrolling just to pass the images. Naturally, a carousel makes sense, so we can efficiently use space by stacking those images and offering a user choice. look at them by operating the controls or just scroll by.

That does provide us with a slightly awkward base, in that if we don't have JS enabled, what options do we actually have to reduce the collection of images into something a little more manageable?

We do now have some of that functionality available in CSS, of all things. Scroll buttons that require zero JS. These are quite new, having only been available without flags for a year or so. As is always par for the course, when something is released, there are usually a couple of stragglers in the adoption process and yup, they're Firefox and Safari. Because we can do this with CSS alone, on Chromium based and Opera browser, we can take a look at using it, we can't support it where it isn't available, we can just use it where it is supported.

Before we go down that rabbit hole, [Sara Soueidan wrote a great in-depth article where she evaluated the accessibility of the CSS only carousel pattern](https://www.sarasoueidan.com/blog/css-carousels-accessibility/). It's very informative, so I highly recommend giving it a read.

The main takeaway from Sara's article is they're not great, some parts are done well, others not so well. That's cool because Sara's article was last updated over a year ago, so maybe there have been bug fixes and the final result is better now, but also, we're only actually using a part of the pattern and we're only ever going to use it where there is no JavaScript, presuming the browser supports it. That's not to say that folks who access sites without JS shouldn't get an accessible experience, they absolutely should, hence why I always start these guides with progressive enhancement in mind, everybody matters. I genuinely don't know how accessible the bits I want to use are, at this moment in time, Sara's article does lead me to believe that the bits I want should be. If they're not, I'll take a different approach, it's not a great deal of CSS and our HTML doesn't need to change, so perhaps this could be a little discovery for us all? Anyway, let's write some HTML and I'll talk you through it:

```
<section class="carousel" id="carousel" aria-labelledby="carouselTitle">
  <h2 class="carousel__title" id="carouselTitle">Interesting animals</h2>
  <div class="carousel__inner-wrap">
    <div class="carousel__controls" hidden>
      <button class="carousel__autoplay-toggle" aria-controls="carouselSlides" >
        <span class="visually-hidden" data-play-state="play">Pause</span>
        <span class="carousel__toggle-icon"></span>
      </button>
      <div class="carousel__pips"></div>
      <div class="carousel__btns">
        <button class="carousel__prev-btn" aria-controls="carouselSlides">
          <span class="visually-hidden">Previous slide</span>
          <span class="carousel__prev-icon"></span>
        </button>
        <button class="carousel__next-btn" aria-controls="carouselSlides">
          <span class="visually-hidden">Next slide</span>
          <span class="carousel__next-icon"></span>
        </button>
      </div>
    </div>
    <ul class="carousel__slides" id="carouselSlides">
      <li class="carousel__item" data-slide-num="1">
        <img src="carousel-images/sloth.jpg" alt="">
      </li>
      <li class="carousel__item" data-slide-num="2">
        <img src="carousel-images/white_tiger.png" alt="">
      </li>
      <li class="carousel__item" data-slide-num="3">
        <img src="carousel-images/vogelkop_bird.jpg" alt="">
      </li>
      <li class="carousel__item" data-slide-num="4">
        <img src="carousel-images/great_white_shark.jpg" alt="">
      </li>
      <li class="carousel__item" data-slide-num="5">
        <img src="carousel-images/reticulated_python.jpg" alt="">
      </li>
    </ul>
  </div>
  <div class="carousel__footer" hidden>
    <button class="carousel__size-btn" aria-controls="carousel" aria-pressed="false">
      <span class="visually-hidden">Full screen</span>
      <span class="carousel__size-icon"></span>
    </button>
  </div>
</section>
```

A quick run through of our base markup:

* We'll start with a `<section>` element, we can add an accessible name to this to make a `role="region"`, which we'll just point at the `<h2>` element. We could have done that with JS, well we could have just added the AccName to make it a region landmark, but these images are important for some reason and having them in a named region makes sense, even if that region can't be a carousel for everybody
* We have a heading, with an appropriate level
* A `.carousel__inner-wrap`, I have added this as we have a heading outside of it, so this enables me to use any positional or layout properties without deducting the height of the heading. I haven't wrote a single line of CSS, yet, so I think I'm planning ahead
* We have a `.carousel__controls` container, which contains a play/pause toggle button and Previous and Next buttons. Each of those buttons contains two elements, one for visually hidden text (the AccName), the other for an icon. Obviously when JS isn't available we don't want to show this at all, so I have just popped a `hidden` attribute on container. Now I know I could just create and destroy all of that, with JS, but I explained earlier, that it's just easier to write these guides without repeatedly showing the same code snippets, as they can get quite lengthy. You may have noticed there's an empty `.carousel__pips` container, in there? I've left that empty as we'll just generate them, based upon the number of slides, we could also do that in the backend, but we don't have one
* We'll have a parent that contains the slides `.carousel_-slides`, we're using a `<ul>`, as it is a set of related things and by extension, we're adding an `<li>` wrapper for each image. I've removed the `alt` value for each image, only for this code snippet, definitely don't do this in production, it's just because it will make code blocks have an excessive horizontal scroll, the actual `alt` will be in the CodePen
* Finally, there's a `.carousel__footer`, which at present just contains a single button for toggling a full screen view

A few other notes

* Where a control controls the slides, I use `aria-controls="carouselSlides"`, which points to the `<ul>` that contains the slides only
* Where I have added the full screen button, I point to the whole carousel, as this will of course open up a lightbox, of sorts and will contain the slides and controls
* I have some data attributes, some are just a number for each slide and then we have one for the pause/play button, these are just convenient hooks for the JS

I should really plan these out, but I just go all in, so let's add some boilerplate CSS:

```
*,
*::before,
*::after {
  box-sizing: border-box;
}

*:not(dialog) {
  margin: 0;
}

body {
  display: flex;
  justify-content: center;
  line-height: 1.5;
  
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
}

h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}
```

I've just taken what I need from [Josh W Comeau's Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/), I'm not explaining any of this, but feels free to read Josh's post. I have added some stuff, such as `flex` and `font-family` on the `<body>` element
