---
title: Accessible carousels
summary: Let's look at how we can build accessible carousels, to be as usable as
  possible, using the correct ARIA and HTML, whilst also baking in additional
  usability features
author: dlee
date: 2026-10-08
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

## Our accessible base HTML

As always, we'll just start from some base HTML, which will be a bunch of images and a heading, which we'll then style it a little, so it's available if for whatever reason, JS isn't available.

Once we have done that, we'll wraggle the DOM with JS to add in the carousel functionality and any associated behaviours and options.

I'm just going to use five images, for no other reason other than five kind of seems to be the minimum number of things that would warrant the legwork of making a carousel, but that's just my own personal opinion. I will of course choose images with different sizes and orientations. just to mix it up, a little. Whilst I am only using five images, we'll do so with the expectation this could include many more, I'm just using five for convenience.

When I write the code the images will pont to a folder in my project, but the full code on CodePen will differ, in that I have to link to the source of that image and load it from there, because that's how CodePen works.

I'm not going to use any fancy image processing, so each image will just have a single asset, we won't be calling the most appropriate size or format for the viewport or browser, because that's something we'd do in the backend or templates, etc.

First we'll get the non-carousel stuff out of the way, as the likelihood is I'll be using CSS on some of that, so for completeness, I'll include it:

```html
<main>
  <h1 class="main__title">ACME homepage</h1>
  <p class="main__subtext">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis libero in.</p>
<!-- Our carousel will go here -->
</main>
```

Just a `<main>` landmark, a `<h1>` and a little bit of page text in a `<p>` tag.

We need a way to detect if JS is enabled, so let's do that now:

```html
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

The above can only run when JS is avilable, so we have a convenient hook for our functionality and CSS.

What we will do now is is add as much of the base HTML as we can. Much of that won't be used when JS is unavailable, sure, we could add it with JS, but for simplicity's sake and reducing the size of our JS file, we'll take a few extra bytes of redundant HTML and ARIA, as long as it has zero effect on the non-JS version or we can hide it.

As I mentioned earlier, a primary use-case for using a carousel is to not occupy too much valuable screen "real estate". We only have five images, but let's assume we're working for an estate agents (Realtor, in the US) and we're tasked with building this widget. We get the brief and it states it can contain one or more images. I don't personally know if there is an upper limit, but my modest little house would have 10 - 20, tops, depending on how trigger happy the estate agent was with their camera. If we were selling a massive stately home, full of history, maybe that listing could contain 60 or more images? I did just have a quick look and the most I could find was 46 images of a single property, I'm sure there will be more for some properties.

That's a lot of images. Do we really want to just chuck them all on the page? That wouldn't be great for anyone, especially as we'd obviously add alt text to each. On a mobile that would be a hell of a lot of scrolling just to pass the images. Naturally, a carousel makes sense, so we can efficiently use space by stacking those images and offering a user choice to either look at them by operating the controls or just scroll by.

That does provide us with a slightly awkward base, in that if we don't have JS enabled, what options do we actually have to reduce the collection of images into something a little more manageable? 

We do now have some of that functionality available in CSS, of all things. Scroll buttons that require zero JS. These are quite new, having only been available without flags for a year or so. As is always par for the course, when something is released, there are usually a couple of stragglers in the adoption process and yup, they're Firefox and Safari. Because we can do this with CSS alone, but only on on Chromium based browsers, we can take a look at using it, we can't support it where it isn't available, we can just use it where it is supported.

Where it is both not supported and there is no JS we can make it a scrollable region, then it's only going to occupy a similar amount of vertical space as a functional carousel.

Before we go down that rabbit hole, [Sara Soueidan wrote a great in-depth article where she evaluated the accessibility of the CSS only carousel pattern](https://www.sarasoueidan.com/blog/css-carousels-accessibility/). It's very informative, so I highly recommend giving it a read.

The main takeaway from Sara's article is they're not great, some parts are done well, others not so well. That's cool because Sara's article was last updated over a year ago, so maybe there have been bug fixes and the final result is better now? Also, we're only actually using a part of the pattern and we're only ever going to use it where there is no JavaScript, presuming the browser supports it. That's not to say that folks who access sites without JS shouldn't get an accessible experience, they absolutely should, hence why I always start these guides with progressive enhancement in mind, everybody matters. I genuinely don't know how accessible the bits I want to use are, at this moment in time, Sara's article does lead me to believe that the bits I want should be. If they're not, I'll take a different approach, it's not a great deal of CSS and our HTML doesn't need to change, so perhaps this could be a little discovery for us all? Anyway, let's write some HTML and I'll talk you through it:

```
<section class="carousel" id="carousel" aria-labelledby="carouselTitle" tabindex="0">
  <h2 class="carousel__title" id="carouselTitle">Interesting animals</h2>
  <div class="carousel__inner-wrap">
    <div class="carousel__controls" hidden>
      <button class="carousel__autoplay-toggle" aria-controls="carouselSlides" data-play-state="play">
        <span class="visually-hidden">Pause</span>
      </button>
      <div class="carousel__pips"></div>
      <div class="carousel__btns">
        <button class="carousel__prev-btn" aria-controls="carouselSlides">
          <span class="visually-hidden">Previous slide</span>
        </button>
        <button class="carousel__next-btn" aria-controls="carouselSlides">
          <span class="visually-hidden">Next slide</span>
        </button>
      </div>
    </div>
    <ul class="carousel__slides" id="carouselSlides" aria-live="off">
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
    <div class="carousel__count" id="carouselCount"></div>
  </div>
  <div class="announcements visually-hidden" aria-live="off"></div>
</section>
```

A quick run through of our base markup:

* We'll start with a `<section>` element, we can add an accessible name to this to make a `role="region"`, which we'll just point at the `<h2>` element. Let's say these images are likely very important for some reason and having them in a named region makes sense, even if that region can't be a true carousel for everybody. I have added a `tabindex="0"`, because if JS is unavailable and the user's browser does not support the new CSS carousel features, then they will have a scrollable region. I'll explain my rationale in more depth after this list, but we obviously need that `tabindex` for when our gallery is scrollable, as the elements within aren't interactive
* A `.carousel__inner-wrap`, I have added this as we have a heading outside of it, so this enables me to use any positional or layout properties without deducting the height of the heading. I haven't wrote a single line of CSS, yet, so I think I'm planning ahead
* We have a `.carousel__controls` container, which contains a play/pause toggle button along with our Previous and Next buttons. Each of those buttons contains a visually hidden text  node for the AccName. Obviously when JS isn't available we don't want to show this at all, so I have just popped a `hidden` attribute on container. Now I know I could just create and destroy all of that, with JS, but I explained earlier, that it's just easier to write these guides without repeatedly showing the same code snippets, as they can get quite lengthy. You may have noticed there's an empty `.carousel__pips` container, in there? I've left that empty as we'll just generate them, based upon the number of slides, we could also do that in the backend, but we don't have one
* We'll have a parent that contains the slides `.carousel__slides`, we're using a `<ul>`, as it is a set of related things and by extension, we're adding an `<li>` wrapper for each image. I've removed the `alt` value for each image, only for this code snippet, definitely don't do this in production, it's just because it will make code blocks have an excessive horizontal scroll, the actual `alt` will be in the CodePen. I have added an `aria-live` region to this, however, the value is set to `off`, that's for later
* Finally, there's a `.carousel__footer`, which at present just contains `.carousel__count` element, where we'll display the current slide number out of total slides, when we need to
* We'll add a live region, for later, we'll set it as `off`, for now

A few other notes

* Where a control controls the slides, I use `aria-controls="carouselSlides"`, which points to the `<ul>` that contains the slides only
* Where I have added the full screen button, I point to the whole carousel, as this will of course open up a lightbox, of sorts and will contain the slides and controls
* I have some data attributes, some are just a number for each slide and then we have one for the pause/play button, these are just convenient hooks for the JS
* We're not going to use everything I have put in, at all times. There are going to be times where I remove the hidden attribute and times where I put it back

### My rationale on using tabindex

Using `tabindex` on our region does come with the caveat that I can only remove that attribute when JS is available, so it will be present as a tab stop on the CSS carousel. Most browsers automatically make a scrollable region a tab stop, apart from Safari, so we can't rely on browsers to add this, I'm afraid. It's one additional tab stop, it's a small trade off I'm willing to make, as I'm trying to do my best for everybody taking a balanced approach. Placing the images in a scrollable region where I have no useful CSS or JS features could be appreciated, especially if there were lots of images in that region, as it could make accessing other non-graphic information significantly easier and it could reduce both effort and cognitive load.

[According to Gov.UK, only 0.2% of users have JS disabled or use a browser that doesn't support it](https://gds.blog.gov.uk/2013/10/21/how-many-people-are-missing-out-on-javascript-enhancement/), so how many of those will be using a non-pointing device? How many of those will be using a browser that supports the CSS carousel features? How many of those will actually visit our site? I'm not trying to dismiss this small number of users, I'm not making anything inherrently inaccessible, I'm simply adding an extra tab stop for a handful of users, so some other users don't have to scroll vertically through an unknown number of images, they may not care about. The linked article does go on to say that a further 0.9% of users will access a site where the JS didn't load, for a technical reason, that article is over 13 years old and it was localised to testing in the UK only. I have no idea what the true number is, there are numbers banded about that go up to 2% (for both choice and technical reasons), in any instance, I don't care if it's just one user that visits a site I build who disables their JS, I'll make it work for them, too. In this case, yes there is going to be a tab stop where there doesn't really need to be for a small number users, but as we all know, the majority of sites are literal hellscapes for disabled folks, we're just introducing what at worst could only be a minor annoyance. When Safari and Firefox catch up to Chromium, we may well be able to do away with that annoyance. I wanted to justify my reasoning as I honestly don't even like to intentionally introduce a minor annoyance for anyone. That's not to say I don't make the odd bad decision or get something wrong, I just do my best and I'm always striving to improve.

## Some boilerplate CSS

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
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
}

main {
 font-size: 1.25rem;
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

I've just taken what I need from [Josh W Comeau's Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/), I'm not explaining any of this, but feel free to read Josh's post. As I'm writing this without actually planning it out (as always), there's every chance I'll be adding bits to this as I go along. 

## CSS for scrollable region

This will be a combination of CSS that applies in all situations and also the situation where a scrollable region is present:

```
/* Basic styling for page title */
.main__title {
  font-size: 2.75rem;
  text-align: center;
}

/* Display as a row, add a gap, fill the viewport, remove list bullets and padding, add overflow and scroll snap */
.carousel__slides {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 1rem;
  border: 1px solid #000;
  padding-inline-start: 0;
  width: 100%;
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
}

/* Center the image in the slide, if needed, set the scroll snap area and add a background */
.carousel__item {
  flex: 0 0 auto;
  height: 15rem;
  background-color: #0a0a0a;
  scroll-snap-align: start;
}

/* Set the image dimensions */
.carousel__item img {
  width: auto;
  height: 100%;
  aspect-ratio: 3/2;
  object-fit: contain;
}

/* Make the region larger as the viewport size increases */
@media (min-width: 36em) {
  .carousel__item {
    height: 20rem;
  }
}

@media (min-width: 48em) {
  .carousel__item {
    height: 27.5rem;
  }
}

@media (min-width: 62em) {
  .carousel__item {
    height: 35rem;
  }
}
```

I've added brief comments to each block, as I can't go through all of this, as the CSS file will eventually be quite lengthy. I personally hate working with images of different sizes or seeing them in carousels, because it's extra faff and they look so much nicer when the images are all the same size. As I wasn't building this to show off a fancy carousel, just a functional one, I just added black backgrounds which appear around images that are short of either height or width to meet the aspect ratio (3/2) I chose.

We're using scroll snapping so each image snaps into view and we ensure that no image can exceed the width of the viewport. Scroll snapping does work by dragging the scrollbar, swiping on a touch display or using arrow keys on the keyboard, so we always get that snapping behaviour, where an image is always aligned to the viewport.

I haven't considered landscape or all these folding devices, there's lots I haven't considered, well, I did consider them, but accounting for eavery device type would take a good chunk of time. I chose 15rem as the height to lazily account for Reflow, in that 15rem = 240px, which is less than the vertical 256px requirement. In practice on a small smartphone, that may still require vertical scrolling to view the full image, as there may be an address bar or other browser controls, additionally, the smartphone would have a wider viewport than 320px in landscape, which would increase the image size, due to our media queries, so whilst this technically passes, as a single image does fit in a 320 x 256 viewport, that isn't going to be great on devices that actual people use (It wouldn't actually fail, anyway, as we disabled JS, but we don't care about pass or fail, we just care about accessible, right?) So, I'm not forgetting to account for that, we're mostly building a prototype that would definitely require more robust media queries.

Just as it's nice to have receipts, the following image shows what I have done so far and I have set the browser width to 1280px, height to 1024px and then zoomed 400%, as required by Reflow. This demonstrates that the image ddoes at least pass that checkpoint.

![Screenshot of the viewport in Reflow, 320 x 256px, demonstrating the image does fit in the viewport](src/guideImg/dl-carousel-reflow.png)

The next image simply shows what a user will be presented with if they have no JS and their broswer does not support the CSS carousel features, a scrollable region that contains all of the images in a scrollable row.

![](src/guideImg/dl-carousel-scrollable.png "Screenshot showing scrollable container we have just made, one image is in full view on a smaller viewport, the second image is partially visible, but will snap into view")

## Attempting the CSS carousel

I say attempting, not because it is beyond me, just I'm genuinely going into this having only read sara's article, I've never attempted this and if I'm not satisfied with the accessibility, then we won't use it, everybody who doesn't get the JavaScript will simply get the scrollable gallery and we will then only add any carousel functionality solely with JS. No matter what, I'll leave this in, even if it doesn't work out, because sometimes it can be useful to see people make mistakes and errors of judgement, which you'd see numerous times each day if I livestreamed my life haha.

After a little faffing trying to detect only when the browser supports the CSS carousel, I finally got that working, I'll just add the snippet now, so we can discuss and move on:

```
@supports selector(::scroll-marker-group) {
  .carousel__item {
    background-color: red;
  }
}
```

I used the `@supports` at-rule and it took me a good bit of trial and error to find something that works. In essence, through some form of browser wizardry, this rule checks whether a named feature is supported. I don't know the mechanics, but I assume somewhere in the browser engine is a list of supported features, this at-rule queries those features at lightning speed and if it appears in that list or whatever, it'll apply the rendering logic inside, if not, it'll just ignore the blocks within and move on?

I initially attampted to see if the `::scroll-button()` selector could be used for role detection, it didn't work, I tried multiple variations of that, just in case. Finally I discovered that `::scroll-marker-group` works, now, that's not exactly what we are going to be using, so there is an element of hit and hope, here, it's just the buttons we want, Sara's main gripes were the pips, which would be children of the `::scroll-marker-group`, so I have no intent of using those. But these properties are so closely linked, that they're almost certainly going to be introduced into the straggler browsers at excatly the same time. Notice I said almost certainly, this isn't a caousel for production environments, it's just me taking a stab at gradually adding features where they are available and discussing a process. It may well be we decide to just omit these shiny new things altogther. Anyway, I temporarily added a red background to the `<li>` elements, this was just a visual cue for me, so I could load it up in all three browsers and check which showed the red background.

I had previously been on Can I Use, to check support, but I still wanted to check my at-rule actually worked. It did, as expected, I saw the red background on Chrome and the background was the deafault black colour in both Safari and Firefox. Now, when we add anything for our next step, we simply add it in this at-rule and for now, it only applies in Chromium browsers, if Safari or Firefox release it next month, it will automatically apply there, too. In essence, we're just saying "Stargglers, we're ready for you" and when they rock up with the goods, it'll just work. We wouldn't remove the at-rule when support is universal, though, as not everybody is using the latest version, so we'll just keep it as is, unless we can ever pass in the `::scroll-button()` selector, for additional peace of mind.

### The relevant CSS carousel styles

```
@supports selector(::scroll-marker-group) {
  .no-js .carousel__inner-wrap {
    position: relative;
  }

  .no-js .carousel__slides {
    overflow-x: hidden;

    .carousel__item {
      width: 100%;
      height: 100%;
    }

    .carousel__item img {
      min-width: 100%;
      height: 100%;
    }
    
    &::scroll-button(*) {
      position: absolute;
      bottom: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #fff;
      border-radius: 50%;
      padding: .5rem;
      height: 2.5rem;
      width: 2.5rem;
      font-size: 1.75rem;
      background-color: #50366B;
      color: #fff;
      z-index: 10;
    }

    &::scroll-button(*):focus-visible {
      background-color: #fff;
      color: #50366B;
      outline-offset: 4px;
    }

    &::scroll-button(left) {
      content: "⬅" / "Previous slide";
      left: 1rem;
    }
    
    &::scroll-button(right) {
      content: "⮕" / "Next slide";
      right: 1rem;
    }
  }
}
```

I'll give you a brief rundown of the above CSS above:

* For every declaration, we're using out `.no-js` class, as we don't want any of this to apply if someone on Edge or whatever has JS enabled
* We set `position: relative;` on the wrapper that is constrained to the viewport, I knew this particular element would come in handy for something, I could almost fool someone into thinking I can see the future. We use this element as a static plot that we can place absolutely positioned elements within and be sure we'll know they are placed exactly where we want them to be
* We hide overflow, as we're going for the traditional one image in view at any given time carousel
* We adjust the sizes in the next two blocks, so the full width of the viewport is used by a single slide
* Next we have the styles that are shared between the laft and right buttons, where I have passed in the global selector, the asterisk, I could have specified `left` or `right` and I could of course have seperated those declarations with a comma, to share those styles. Because my buttons are floating in the bottom corners and I cannot possibly know what images this will contain, I know that I have to ensure the buttons are perceivable. I just use a white arrow against a puple background which gives us a contrast of 10.1:1. It's just the arrow that needs to be perceivable, it doesn't technically matter if the purple background clashed with an image below, however, affordance is a thing and users tend to benefit from it a lot, so I also add a 1px border around the buttons, which is also white, this prevents the image from bleeding into the background, as there is a small moat around it, it's actually a border, but moat sounded cooler, like we're keeping enemy contrast at bay.
* Next i wanted to ensure focus styles were decent, I inverted the backfround and arrow colours, this cannot fail, because those colours already passed and had a strong contrast. I then just added an outline-offset: 4px; which pushes the browser's default focus ring out 4px from the actual button. In Chrome, which is what i'm using, that is a dual colour ring, so under most circumstances, either the blue ring or the whte ring will be perceivable. I just added this as an extra, I'm not wholly reliant on it as I know it can fall down against some backgrounds
* The next two declarations I access each button by name, as this is unique styles and AccNames that is unique to each button. I simply set an arrow as the content that points in the correct direction ([Thanks Adam Argylle](https://developer.chrome.com/blog/carousels-with-css)), I then add alt text, in CSS, which feels a little alien, but also useful. I then just add enough space for breathing room, I'm on MacOS so my scrollbar occupies different space than Windows scrollbars, but we're somewhere in the right ballpark and no, I have not tested, because we're just exploring the features

### CSS Carousel: The good bits

Technically we have just added some functional buttons with some new CSS features, what did we want as a bare minimum:

* We absolutely needed the role to be that of a button, Sara showed this was the case and it is still the case today, that's great
* All controls must have an AccName, again, Sara demoed this perfectly, these were my two minimum requirements and what gave me a glimmer of hope. The fallback alt text in the `content:` property works as it should, at least in this case
* The button that controls the slides becomes `disabled` when we reach the last slide in that direction, it's not a infinite carousel, so the button becomes pointless at the end or beginning, that's quite useful
* If I sequentially navigate with my virtual cursor within the carousel, I can change the slides and when a new slide is displayed, it's read out, as that is where my virtual focus is, of course. Is it good that it does that? 

### CSS Carousels: Could be better

* I don't think any of us reasonably expected anything to be announced, I don't think that screen reader users who choose to disable JS expect that, either, as we would need JS to do that. It's perhaps safe to say, that a screen reader user who disables JS knows they are disabling the majority of dynamic changes? As the buttons say "Next slide" this may provide some form of clue, as to what they are for? We didn't explicitly call it a carousel, we could not, because the scrollable region isn't a carousel and that means a user could potentially wonder where the carousel controls are? In my limited testing if I use <kbd>Tab</kbd> and <kbd>Enter</kbd> on the buttons, I hear nothing, which is what we expected, I guess. But, that ultimately means the buttons aren't very useful for screen reader users, as it would be a case of advance a slide, go off with the virtual cursor to have slide read, go back to button, repeat ad infinitum
* Focus management, not great. When I was using the Next slide button and I eventually reached the end of the images, the button became `disabled`, which was cool. But, here's where it gets ugly, a disabled button cannot maintain keyboard focus, so it has to be sent somewhere. In this example, it is sent to the `<body>` element, now, it's worth pointing out we have a parent element that does have a `tabindex` attribute, we also have a Previos button that cannot be `disabled` at the same time, so focus being hijacked and sent to the `<body>` isn't good, as on a real site, we could have a tonne of tabstops before that carousel, which would obviously be a huge PITA for any user that does not use a pointing device. The browser did not scroll to the top when I added 1000 words of Lorem Ipsum, so focus was untracked. that may be good or bad, depending on the individual. It's early days, perhaps they could handle focus a bit more intuitively, like the native `<dialog>` element, that has its own unique focus steps? 
* Technically, there's no relationship between the buttons and the slides. Ordinarily, we would use `aria-controls`. which obviously has very little support, but it is still an explicit relationship
* It's only because we used a named region that our thing will make some sense. In reality, this is just going to be `<div>` soup out in the wild, becuse that's what the majority of folks do

### CSS carousel final thoughts

We didn't go to the lengths that Sara did, because we were only interested in the buttons, we didn't want the pips, which actually change the semantics of everything into tabs, etc. We just wanted a way to advance slides with buttons and enough accessibility info to be present that it makes sense. The buttons are seemingly redundant for a screen reader user, at least using Chrome and VoiceOver, which I know isn't ideal, but I can't test this on Safari. I found the focus being forced on to the body quite jarring, this carousel could be anywhere on a page, a regular keyboard user/voice user or anyone that uses most other keyboard navigation API AT, with the exception of screen reader users is could have a hard time getting back to where they were. A screen reader user could at least get back using their Rotor/Elements panel, but even then, why should they have to do that? Although, given the buttons seem much inferior to just advancing slides with arrows, I think it's safe to assume a screen reader user would likely prefer the arrows approach, if they figured it out.

I can't speak for screen reader users, I can make observations, though. A regular carousel doesn't advance slides with arrows, if done correctly, as slides that aren't visible are accessibly hidden. That means using arrow keys would move through all of what is visually present, the slides and controls, etc, then exit the carousel. This time it's still operating like our scrollable region, in that each slide will be read, sequentially, without ever having to use the buttons. This could be a good thing or a bad thing, but the question is, how does a screen reader user know that this is a CSS carousel, as opposed to a regular one?

In its current implementation, the focus management alone is enough to put me off using it, as that would be annoying for users. Even if at this stage we had JS at our disposal, we couldn't fix it, as we can't access pseudo elements with JS, so capturing the click event and sending focus to somewhere logical isn't possible. But, at that stage, we may as well just roll our own, I guess.

We're not going to use it, I don't think it's particularly great. It has some good parts, but CSS is very limited, accessibility-wise and I honestly don't think it's the correct tool for the job. It's simple enough to implement, but it feels lacking in places and that's perhaps a limitation of CSS? I'm not fully sure why we have it, how we got here and why it exists, but it's here, albeit experimental, for now and I definitely would not use it. That being said, I'm leaving it in, as my plan is to have two CodePens, the first will be all of the code we have been writing, then the second will be a more polished version.

## Let's build an actual carousel

We're at that stage now where we can use JS to manipulate the DOM, we don't need to fudge a carousel with CSS and most importantly, we have full control over all accessibility information and the widget's behaviour. We're not going for anything fancy looking, at this stage, because we just want to get it working, in an accessible way. Once we do that, i'll go off and build something nicer and just pop a link to the CodePen at the end of this guide.

We don't need to change any HTML, we will need to add some CSS and it's likely that some of that CSS will be the same as we have already written in the CSS-only carousel, but don't worry, as we'd just delete the CSS carousel if we were going live with this.

### CSS for JS enabled carousel

```
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.has-js {
  .carousel__inner-wrap {
    position: relative;
  }

  .carousel__slides {
    overflow-x: hidden;

    .carousel__item {
      width: 100%;
      height: 100%;
    }

    .carousel__item img {
      min-width: 100%;
      height: 100%;
    }
  }

  .carousel__autoplay-toggle,
  .carousel__prev-btn,
  .carousel__next-btn  {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    border: 2px solid #000;
    border-radius: 50%;
    padding: .5rem;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.6rem;
    background-color: #ffff00;
    color: black;
    cursor: pointer;

    &:focus-visible {
      border-color: #ffff00;
      background-color: #000;
      color: #ffff00;
      outline-color: transparent;
    }

    &:focus-visible::after {
      content: "";
      position: absolute;
      inset: -5px;
      border: 3px solid #000;
      border-radius: 50%;
    }
  }

  .carousel__autoplay-toggle {
    top: 1rem;
    left: 1rem;

    &[data-play-state="play"]::before {
      content: "⏸" / "";
    }

    &[data-play-state="pause"]::before {
      margin-top: 2px;
      margin-left: 3px;
      content: "▶" / "";
    }
  }

  .carousel__prev-btn {
    bottom: 1rem;
    left: 1rem;

    &::before {
      content: "⬅" / "";
      margin-top: 2px;
    }
  }

  .carousel__next-btn {
    bottom: 1rem;
    right: 1rem;

    &::before {
      content: "⮕" / "";
      margin-top: 2px;
    }
  }

  .carousel__item[aria-hidden="true"] {
    display: none;
  }
}
```

I'll just summarise some of this:

* A `.visually-hidden` class, which will hide things from view
* Everything we do now will be nested inside the `.has-js` class, as we only won't this to apply when JS is available
* We're just setting the slides to take up full width of the viewport, like we did in our CSS only effort
* We're now styling the buttons, of which we have three. They share a huge amount of styles, so we'll do those all in the same block. I have actually changed the button colours, here, I have used yellow and black, when any receives focus, the colours invert, as before and as opposed to using an `outline` (I set that as `transparent`), I add an additional "border" using the CSS `::after` pseudo element, this border is black and 3px and the actual  2px border on the buttons changes to yellow. I have done this so we have a double border effect. I cannot guarantee that the inner border won't clash with parts of the image, and whilst it would not fail, I wanted to make that focussed state more perceivable.
* Oddly, I had to do some adjustments to move these icons to the center of the buttons, I used margin-\[position] for this, which is pretty hacky and awful. Confession time, I have nver in my life used these alt icons before and can't see me doing so again as they didn't position perfectly.
* I had to add null alt attributes to each alt icon, as "Black right facing triangle, play" sounded quite naff
* Finally, I add a `display: none;` to any `.carousel-item` that is not the currently displayed item, which is any item with `aria-hidden="true"`, we could have done this using an `.active` class and then targetting the slides without it, but it makes no difference

### JS for our carousel

```
const carousel = document.querySelector('.carousel');
const carouselSlides = carousel.querySelector('.carousel__slides');
const carouselItems = carousel.querySelectorAll('.carousel__item');
const carouselBtns = carousel.querySelector('.carousel__btns');
const carouselNextBtn = carousel.querySelector('.carousel__next-btn');
const carouselPrevBtn = carousel.querySelector('.carousel__prev-btn');
const carouselAutoplayToggle = carousel.querySelector('.carousel__autoplay-toggle');
const carouselPips = carousel.querySelector('.carousel__pips');
const slidesCount = carouselItems.length;
const carouselCount = carousel.querySelector('.carousel__count');
const carouselAnnouncements = carousel.querySelector('.announcements');
let autoplayInterval = null;
```

Firstly we're just getting references to the elements we'll use throughout

```
const disableAutoplay = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
carouselCount.textContent = `1 of ${slidesCount}`;
carousel.querySelector('.carousel__controls').hidden = false;
carouselCount.parentElement.hidden = false;
carousel.removeAttribute('tabindex');
carousel.querySelector('.carousel__slides').setAttribute('role', 'presentation');
carousel.setAttribute('aria-roledescription', 'carousel');
disableAutoplay ? document.documentElement.dataset.carouselMotion = 'none' : document.documentElement.dataset.carouselMotion = 'play';
```

* Then we want to check if our user has set reduced motion in their operating system, as we will of course, honour that
* We get a slide count, we set it at 1 of \[n], because when the page loads it will always start from one
* We remove `hidden` from any element that previously had it
* We remove `tabindex` from the region
* We set the `<ul>` element as `role="presentation"`, as we no longer want the list semantics
* We add `aria-roledescription="carousel"`, which acts as complimentary role, of sorts
* If our user has set prefers reduced motion, we add a data attribute `data-carousel-motion="none"`, and later we use this to prevent autoplay on page load. The user can of course still use the autoplay feature if they choose, it's page load we care about

```
carouselItems.forEach((slide, idx) => {
  slide.setAttribute('aria-roledescription', 'slide');
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-labelledby', `carouselCount`);
  idx === 0 ? slide.setAttribute('aria-hidden', 'false') : slide.setAttribute('aria-hidden', 'true');
});
```

We loop through each slide and and add the following:

* An `aria-roledescription="slide"` property to give that custom/complimentary role
* We're adding an actual role="group", which would absolutely make sense if we had more than one item in our slide, but at this moment, we don't, so in its current state, it's arguably not the best role, but if this were products there may be a CTA link, so we're prepared for that
* Each slide has a name, we're just pointing to the counter we made, so each slide gets the name of that, which will be a very basic \[n] of \[n]
* When the page first loads, we set all but the first slide to have `aria-hidden="true"`, this also prevents the slide being visible as we tied that to `display: none;` in our CSS

```
carouselBtns.addEventListener('click', (event) => {
  const currentSlide = carousel.querySelector('.carousel__item[aria-hidden="false"]');
  let nextSlide = null;
  
  if (event.target === carouselNextBtn) {
    changeSlide((parseInt(currentSlide.dataset.slideNum) % slidesCount) + 1);
  } else if (event.target === carouselPrevBtn) {
    changeSlide((parseInt(currentSlide.dataset.slideNum) - 2 + slidesCount) % slidesCount + 1);
  }
  stopAutoplay();
});
```

* We add an event listener to the container that holds just the Previous and Next buttons, we will of course then check which button is clicked and execute some code based upon that
* We use our refererence to the `currentSlide`, at this stage, it could be any slide from the carousel
* We get a reference to the `nextSlide`, which will be updated as required
* Then we determine wheich slide it is with a simple if/else if conditional, by determining the `target` of the click, if it's the `carouselNextBtn` or the `CarouselPrevBtn`
* We're then using the `data-slide-num` data attribute and turning the string value (the number) into an actual number
* We then use the JS wrap around trick, with the modulo operator (`%`), in essence, if the slide is the last slide (moving forwards) we want to move back to the first slide, so we have an infinite loop of sorts, the inverse is true for click the Previous button when on the first slide. Unlike our CSS-only carousel, these slides will continue to cycle through, there is no hard stop. This is all passed into a `changeSlide()` function
* We use a similar trick to get the next slide, which could of course be in any direction, so we do it for both the Previous and Next buttons
* We then check if the target of the click was either button and set `aria-live="polite"` to our live region
* Then, we call a `stopAutoplay()` function. I will explain this a little more when we get to that function
* Finally, we have an `announceSlide()` function

```
const changeSlide = (slideNum) => {
  const currentSlide = carousel.querySelector('.carousel__item[aria-hidden="false"]');
  const nextSlide = carouselItems[slideNum - 1];
  currentSlide.setAttribute('aria-hidden', 'true');
  nextSlide.setAttribute('aria-hidden', 'false');
  carouselCount.textContent = `${nextSlide.dataset.slideNum} of ${slidesCount}`;
};
```

We then have our `changeSlide()` function, which receives the current slide:

* We need a local reference to the `currentSlide`
* Our logic for what the `nextSlide` is was actually added in the previous function with the wraparound technique, so we just need to deduct 1 from that
* Hide the current slide
* Show the next slide
* Update the counter

```
const setAutoplayState = (isPlaying) => {
  document.documentElement.dataset.carouselMotion = isPlaying ? 'play' : 'none';
  carouselAutoplayToggle.dataset.playState = isPlaying ? 'play' : 'pause';
  carouselAutoplayToggle.querySelector('.visually-hidden').textContent = isPlaying ? 'Pause' : 'Play';
};
```

* We create a `setAutoplayState()` function which accepts a boolean
* We change the data attribute `data-carousel-motion` on our `<html>` element, to reflect the state, we added that attribute that earlier for users that prefer reduced motion
* We use the `data-play-state` attribute on the Play/Pause button to set a current value of either play or pause, this value is the state of autoplay, if it's playing it will be `play` as the caurrent value
* We then set the AccName of the Play/Pause button, which is always the opposite of the `data-play-state`, as it is of course the next state, should that button be clicked

```
const startAutoplay = () => {
  clearInterval(autoplayInterval);
  setAutoplayState(true);
  carouselAnnouncements.setAttribute('aria-live', 'off');
  autoplayInterval = setInterval(() => {
    const currentSlide = carousel.querySelector('.carousel__item[aria-hidden="false"]');
    changeSlide((parseInt(currentSlide.dataset.slideNum, 10) % slidesCount) + 1);
  }, 5000);
};

const stopAutoplay = () => {
  clearInterval(autoplayInterval);
  autoplayInterval = null;
  setAutoplayState(false);
};
```

We have two functions to start and stop autoplay:

In the `startAutoplay()` function:

* We clear any existing interval
* We pass `true` to the `setAutoplayState()` function
* We set our ARIA live region to `off`
* We may aswell empty the text from that live region, by setting `textContent` to an empty string
* we set a new interval of 5 seconds
* We get a local reference to the current slide

We do similar to what we did earlier with the modulo operator, but this time we only need to concern ourselves with going forward

In the `stopAutoplay()` function we:

* Clear any existing intervals and set it to null
* We pass false to the `setAutoplayState()` function

```
carouselAutoplayToggle.addEventListener('click', () => {
  const isPlaying = carouselAutoplayToggle.dataset.playState === 'play';

  isPlaying ? stopAutoplay() : startAutoplay();
});
```

We listen for a click event on our Play/Pause button with carouselAutoplayToggle()

* We set a conditional variable `isPlaying` that determines whether the `data-play-state` attribute is set to `play`
* We then have a little logic will call `startAutoPlay()` if the carousel `isPlaying`, after the `click`
* Then we invert that, in our `else` block and we start autoplay if it's not playing

The live region announces the slide content, which is currently

```
if (!disableAutoplay) {
  startAutoplay();
} else {
  carouselAutoplayToggle.dataset.playState = 'pause';
  carouselAutoplayToggle.querySelector('.visually-hidden').textContent = 'Play';
}
```

When the page loads we're checking whether to autoplay or not, we created the `disableAutoplay` value at the beginning:

If a user does not have reduced motion set, we run our `startAutoPlay()` function

If they do we just need to updaye the Play/Pause button's icon and its AccName

```
const announceNewSlide = (slide) => {
  const imgAlt = slide.querySelector('img').alt;
  carouselAnnouncements.textContent = `Slide ${slide.dataset.slideNum} of ${slidesCount}: ${imgAlt}`;
}
```

Finally (for now), we have our `announceNewSlide()` function, where we accept the `nextSlide` we passed in, earlier

We did want to make our slides versatile, in that we have each slide in a group and we half expect content other than images will be present, that could be snippets of text, data viz, CTAs, anything, really. We're not going down that rabbit hole, we would have write some logic that not only announced the alt of each image, but built a string from other elements and output it in rational and understandable order. I don't think that would be a particularly easy task. After this final (for now) block of code I'll discuss my live region strategy and the rationale behind it

* Anyway, nice and simple, here, we just grab the `alt` from the slide's image, we then get the `carouselAnnouncements` container and set its `textContent` to a useful string
* We build that string to include the word Slide and then we want the slide number and the number of slides, we then append the `alt`

That's it, for this pattern, although you may have noticed there is something missing? We haven't used the pips, have we? We set a variable for them and we even have a HTML element for them, but we never used them. That's because I wanted to look into those, separately, as I personally feel like they have some limitations, also, the pattern for slides is a little different, so we'd need a little additional logic. 

I actually want to discuss my approach to live regions, though"

### Our live region explained

When I build something, I do often have to go off and look for several other implementations to determine how they all behave, etc. I don't copy the code or anything, but I just test them to get an understanding and I do have a look into the DOM to see what's going on, under the hood. I guess you could call this research.

Whilst researching, I looked at the [W3C's APG Carousel (with buttons for slide control)](<const announceNewSlide = (slide) => {
  const imgAlt = slide.querySelector('img').alt;
  carouselAnnouncements.textContent = `Slide ${slide.dataset.slideNum} of ${slidesCount}: ${imgAlt}`;
}>), it's usually a good place to start to see if they have a pattern for a given widget and to make sure I understand the interaction pattern, etc.

Most of the mechanics of this one were pretty straightforward, in essence, we are just toggling display properties of elements based upon button presses, the hardest bit (which I did have to Google) was the wrap around logic. I could have made the carousel have a hard stop when it reached the end and `disabled` the Next button (much like the CSS only carousel), but I see a niggle with that, which I mentioned earlier.  At the point a user clicks the Next button, whichever slide is currently playing will not be announced, neither will the ones that precede it. So, our screen reader user could start on slide 4, our gallery may contain 20 slides, they then have to click Next until they get to the end and then they cannot advance any further. Perhaps they made a mental note of which slide it started from, 4 in this hypothetical. Now they have to locate the Previou s button and go all the way back to the beginning, to consume the first three slides. That seems quite naff, to me.

Each slide has the slide number, I frontloaded that info in the announcement, when a user gets to the end in our implementation using the same hypothetical 20 slides as before, they can just advance to slide 1, continue advancing to slide 3 and they have then consumed everything they needed to with much less faff, thanks to the wraparound logic.

All of that would be useless, without a live region, though, wouldn't it? Advance a slide, cursor within, reverse back to the control, click it, repeat, repeat, repeat. So, it makes sense we simplify the interaction by limiting discoverability. If we provide our screen reader user with an announcement that announces all of the content for each slide, then in theory, they only need to leave the Next or Previous button when they are done. We have simplified that interaction. It works the same as it would for a sighted keyboard user, in that they just keep pressing <kbd>Space</kbd> or <kbd>Enter</kbd>. One user sees the slide, the other hears the slide.

We do have a limitation, though, not an insurmountable one, but our logic is only accounting for alt and some prepended slide info. It would not work if the Site admin placed some additional content in there, such as the date for an event, so it it's not flexible to content at all.

You may ask why I didn't add the live region to the <ul> element, so every change of the display property to block, would be announced. W3C do that, right? Well, it doesn't work in Safari at all, nothing is announced at all. This is just one reason why we should not just go copying their code, right? I mean, they do warn us it's not production ready, I'd still kind of expect it to work in Safari, though, but hey ho.
