---
title: Accessible nav drawer disclosure widgets
summary: This guide will build slightly more complex disclosusre widgets than
  the basic accessible disclosure widgets guide, we'll explore various trypes of
  navigation drawers or side panels
author: dlee
date: 2025-09-18
toc: true
tags:
  - HTML
  - JavaScript
  - CSS
  - Best practice
file: ""
isGuide: true
---
## Intro

If you read my older guide on creating "basic" accessible disclosure widgets, then the aim of this guide is to take it up a notch, by building variations of a pattern that is a little more complex, the nav drawer. Nav drawers are very common, especially on complex web apps, as there are often multiple navigation elements to access the many features these systems have.

As appears to often be the case, this guide has come about to me encountering several nav drawers, whilst testing, over the last couple of months.

So, what is a nav drawer? Put into simple terms, it's usually a side navigation that slides out into the visible part of the viewport when a user clicks the trigger control. Technically, nav drawer can also appear from the top or bottom of the viewport, but, we pushed down from the top in the "Basic" article, also, I'm probably over-selling it a little here, by saying that side drawers are a little more complex, they do come with additional challenges and considerations for us like-minded folks that will put accessibility first in everything we build, but athey're not a "boss level" challenge, like some UI patterns. So, to make my claim of "complex" a little less of an overreach, we'll discuss and build some different variations, just to spice things up a little.

## Types of drawer effect

I don't know if I am using the correct terminology for these, I haven't researched them in any way, but we'll just go with my guessed naming conventions I'll explain what I mean:

1. The standard push to the side drawer, this will either push the whole page content out of the viewport, or at least part of it, that'll likely depend a lot on the viewport size, when a user invokes the control
2. The overlay drawer, this will simply overlay the main page, it will sit on top and not effect it in any way, other than obscuring part of it
3. The fixed icon drawer, this will always show an icon for each link or control within, in a narrow side panel, but should a user click the trigger, then drawer will slide into view and show the icons along with text labels. Honestly, I'm a less keen on these, I think CSS Tricks used this pattern, way back when, sure, it's kinda OK if you're sighted, use a pointing device and have some idea what the icons mean, but, what is the point in hiding just the labels? everything has to still be in the focus order, so expanding/collapsing serves no purpose to blind screen reader users and in reality, the iconography isn't likely to be universally understood, so what the benefit actually is, I have no idea. Still, we'll build one, anyway as I like to thing of my guides as a foundation for further exploration or discussion, as opposed to a "Thou must" thing.

## Let's build our drawers

As always (well where possible) we will start with minimum viable product, that is completely usable, without JS and then progressively enhance our mock page, where JS is available.

### Minimum viable product

JS is going to do a little bit of the heavy lifting here, as we will need to wrangle the DOM and shuffle stuff about a little, if we weren't good accessibility troopers, we'd pretend this isn't a thing and not consider what would happen without JS, which would likely be the contents of our drawer would be completely hidden, or at best, a broken UI. Neither of those sounds like anything I'd be comforatble putting my name to or anything I'd want a user to have to deal or attempt to deal with. So, we'll start with two nav elements, one below the other, Primary and Secondary seem like decent enough names to use, our top nav will be Primary and our drawer will be Secondary, so what are we going to make? The below screenshot shows how I have set up the UI for when JS isn't available:

![Screenshot of the mock page, there are two horizontal navigations at the top, one under the other. The rest of the page isn't important, but is just lorem ipsum text](src/guideImg/dl-drawer-pe-no-js.png)

Nothing spectacular going on there, a nice clear simple layout, nothing that is important hidden for users who have accessed without JS, for whatever reason. Let's look at the HTML:

#### The HTML

```html
<!DOCTYPE html>
<html lang="en" class="no-js">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <header class="header">
      <a href="main" class="skip-link">Skip to content</a>
      <div class="nav__wrapper">
        <nav class="nav" aria-labelledby="primaryNavLabel">
          <h2 id="primaryNavLabel" style="display: none;">Primary</h2>
          <ul class="nav__list">
            <li class="nav__item"><a href="#" class="nav__link">Item 1</a></li>
            <li class="nav__item"><a href="#" class="nav__link">Item 2</a></li>
            <li class="nav__item"><a href="#" class="nav__link">Item 3</a></li>
          </ul>
        </nav>
        <nav class="nav__side" id="sideNav" aria-labelledby="sideNavLabel" aria-owns="drawer">
          <h2 id="sideNavLabel" style="display: none;">Secondary</h2>
          <button class="nav__trigger" id="trigger" aria-expanded="false" aria-controls="drawer" data-untouched>
          <span class="visually-hidden">Menu</span>
          <span class="nav__trigger-inner">
            <span class="nav__burger"></span>
          </span>
          </button>
        </nav>
      </div>
      <div class="nav__drawer" id="drawer">
        <ul class="nav__drawer-list">
          <li class="nav__drawer-item"><a href="#" class="nav__drawer-link">Item 4</a></li>
          <li class="nav__drawer-item"><a href="#" class="nav__drawer-link">Item 5</a></li>
          <li class="nav__drawer-item"><a href="#" class="nav__drawer-link">Item 6</a></li>
          <li class="nav__drawer-item"><a href="#" class="nav__drawer-link">Item 7</a></li>
          <li class="nav__drawer-item"><a href="#" class="nav__drawer-link">Item 8</a></li>
          <li class="nav__drawer-item"><a href="#" class="nav__drawer-link">Item 9</a></li>
          <li class="nav__drawer-item"><a href="#" class="nav__drawer-link">Item 10</a></li>
          <li class="nav__drawer-item"><a href="#" class="nav__drawer-link">Item 11</a></li>
        </ul>
      </div>
    </header>
    <div class="site">
      <main class="main" id="#main">
        <h1>Lorem ipsum</h1>
        <!-- Lorem ipsum removed for brevity -->
      </main>
    </div>
    <footer class="footer">
      <p>MTA drawer 2025</p>
      <a href="#">Item 12</a>
    </footer>
  </body>
</html>
```

##### A quick summary of the HTML

* We have a `no-js` class on the `html` element, we will remove this later, with JS, so basically, if JS can remove it, it's loaded/available
* As we have more than one `nav` element, we need to give them names, so using a`ria-labelledby="[Ref_of_hidden_text_node]"`, we give the top navigation the AccName of "Primary" and the lower navigation (will be a drawer) an AccName of "Secondary". These naming nodes are in the above HTML and both have `display: none;` set, remember that `aria-labelledby` ignores that all methods of "hiding", by design, which I find to be super handy for situations just like this. I don't normally write styles in my HTML, as separation of concerns and CSS specificity, etc, but this doesn't make me feel icky, as I don't want anybody to ever see that text
* We have a `<button>` which will act as the trigger for our drawer, we will of course only show this when JS is available
* Our Drawer isn't a child of our Secondary `<nav>` element, which means that relationship isn't programmatically determinible, the `<button>` is inside it, but the drawer isn't. If the button is inside it, then the thing it controls should be. We do use `aria-controls` on the `<button>` which technically creates that relationship, but only in a technical sense, not so much in a useful to AT sense, as screenreader support is virtually non-existent. Sure, we could have added the drawer inside the `<nav>`, which is where it should be, but due to the layout, everything got a little overly-complex when I initially started buiding this, as I was having to abslutely position the button so it remained in the `<header>`, which in itself, isn't a problem, it's just that we'd need to know our `<nav>`'s height, at all times, so the positioning always looked consistent. As I was moving the entire drawer with JS, anyway I just found it easier to move it half-way to where I finally wanted it for no JS and then recreate that relationship with ARIA. So, what I did was I added `aria-owns="drawer"` to the Secondary `<nav>` element, which allows me to move things around in the DOM, break relationships, but then put that relationship back with this nifty property. I initially added that property with JS, but only when I actually moved stuff around, but then I encountered a bit of layout complexity, so I took the path of least resistance and recreated the relationship
* The entirety of our drawer is wrapped in a `<div class="nav__drawer" id="drawer">` element, we'll grab this with JS, as we will need to move it to a more suitable place in the DOM
* All of the standard disclosure stuff is the same as the Basic Disclosure Widgets guide, we have a `<button aria-expanded="false" aria-controls="sideNav">`, that latter attribute points to the ID of the secondary `<nav>` element and we'll toggle the `aria-expanded`state, when we need to. 

  The following screenshot shows that we have the exact relationship we wanted, after using a little ARIA:

![Screenshot of the whole page Accessibility tree open in Chrome's DevTools. As we have created the parent child relationship with aria-owns, between the parent nav element and the drawer which is not a child in the DOM, it shows that we have reestablished that relationship](src/guideImg/dl-allytree-drawer.png)

Just a little note on the above screenshot:

As I stated, I used `aria-owns` to recreate the relationship, as I had opted to move stuff around in the DOM. Would it be a failure if that attribute were omitted? No, I wouldn't fail it as the `<button> `is in the `<nav>` and the `<button>` uses `aria-controls="[ID_of_drawer]",` so there is a "programmatic" relationship there, already. Is it the relationship we want? Hmm, both attributes seem to have spotty support, so at this stage, it probably isn't making a huge amount of difference, if any at all. As an example, using VoiceOver and Safari, should I expand the drawer and then tab through it, into the main content, then reverse back into it the expectation would be something like "Link, item 11, navigation, Secondary", but that doesn't happen, I only get the "navigation, Secondary" info when I reverse all the way up to the button. Remember, this is Safari and VoiceOver, so that may not be representative of other browser/screen reader combos, we'll test them a little later.

#### The CSS

I'm going to omit the CSS, again, as everything gets to unwieldy, I'm also building this thing as I type, so I'm constantly adding or modifying the CSS. It will of course be available in the CodePen, at the end.

### Let's progressively enhance it

First things, first, we need to remove the `.no-js` class from the `<html>` element and add a `.has-js` class. We don't technically need both, but it just makes it a smidge easier to style things, for both possibilities, I guess.

#### JS Swapping the JS class

Just add this in the HTML's `<head>` section, I believe it's better to add it after the title, encoding and links to other resources, such as CSS, fonts and whatever else you may link to in your <head> section>, for performance reasons.

```javascript
<script>
  document.querySelector('html').classList.remove('no-js');
  document.querySelector('html').classList.add('has-js');
</script>
```

##### Nothing spectacular, here

We're simply removing the class `no-js` and then adding a new one, `has-js`, this can only happen if the user, user-agent or whatver else hasn't blocked JS

#### Moving the entire drawer in the DOM

I gave this one a little thought, and for the drawer to push the page or squish it, iit will be easier to have it on the same layer, so that rules out `position: absolute;` etc, as it would just slide over the top and we're going for a push effect. We could probably animate both the drawer and the main content, to give the same effect, without moving the drawer, but that seems like it might be a bit brittle.So the only way we can realistically achieve the effect I am going for is to move the drawer into the `.site` wrapper I added.

There is one consideration, here, our toggle will still be placed in the `<header>`, and the drawer is not and as I want my drawer to be on the right side of the viewport that could create a potential problem with focus order, which needs to be logical and intuitive. We need to ensure that when we move the drawer to the `.site` wrapper, that it precedes the `.main` content, which would then mean it appears on the left, by default. This would of course not be logical or intuitive, as when a button expands a widget, that widget's content must be next in the page's sequential focus order or reading order if there are no interactive elements.

So, our primary objactives are as follows:

* When the drawer is closed, nothing inside receives focus, it's properly hidden
* When the drawer is opened, a user can <kbd>tab</kbd> through the links within, directly from the trigger `<button>`, when they reach the final link in the drawer, the next tab stop will be inside the main content
* As we are pushing the main content to the side and not overlaying it, we don't need to worry about 2.4.7 Focus Visible or 2.4.11 Focus not Obscured (Minimum), as nothing we have done could cover anything (this is the primary reason I personally prefer this pattern)

I'm adding a couple of screenshots with arrows indicating the focus path for those of you who learn better from pictures, I'll include both the closed and open drawer states:

![Screenshot of the page we are building, the drawer is closed, there is a typical hamburger menu positioned at the far right of the header. The arrows I have added indicate the tab sequence is Primary links (x3) > Hmaburger button > Link inside the main content](src/guideImg/screenshot-1.png)

![Screenshot showing the nav drawer open, the drawer opens from the right, directly below the hamburger button, my arrows indicate the tab sequence to be Primary nav links (x 3) > Hamburger button > secondary nav (the drawer) links (x 8) > The link in the main content container](src/guideImg/screenshot-2.png)

In the images I show the tab sequence I am going for, this is the only sequence that makes sense for this particular layout, in my view, as anything else would not be intuitive, so how did I achieve that? Let's look at some code, I'll start with the JS:

```javascript
const drawer = document.querySelector(`#drawer`);
document.querySelector('.site').prepend(drawer);
```

1. Firstly I'm grabbing the entire drawer element and storing it in a variable or indeed a constant if you just cringed at me calling a `const` a variable
2. Finally, we want to `prepend` that stored element into the position that makes most sense, I'm adding it before the `<main>` content, inside the .`site` container, even though visually, it appears to the right of it, this is for a good reason:

   * Because I am adding it before the main content, that means I get the desired/expected focus order for free, had I added it after the main content, then I'd have needed to manually manage focus with more JS and why do that?

So, at this stage, everything would be flipped, right? Our drawer would be on the left and I'd already committed to putting it on the right side of the viewport. This is super easy to solve, with the following CSS:

```css
@media screen and (min-width: 48em) {
  .site {
    display: flex;
  } 

  .has-js .site {
    position: static;
    flex-direction: row-reverse;
  }
  
  .nav__drawer {
    position: static;
  }
}
```

I'll quickly explain the above:

1. Firstly, I add a media query, as I always build things "mobile-first", the 48em value is 768px, this is just an example of a tablet size, although in the real world, I'd probably increase this value a decent bit
2. The first selector just sets the `flex` layout and as this is default (No JS), I'm just setting it as a `column`, although I didn't need to do anything there, as that container only holds the `<main>` when there is no JS
3. In my second CSS declaration, this is where the magic happens, I'm only running this declartion if JS is available, with the `.has-js` class, then I'm simply setting the `flex-direction` to `row-reverse`, which visually flips the layout, but does not interfere with the focus order. Remember, we got the focus order for free by adding it before the `<main>,` so now I can animate my panel sliding in and out, preserving the correct focus order, whilst having it on the right of the page and that took a trivial amount of JS and CSS. Please do be aware sometimes reversing the layout of things in CSS columns or rows can cause illogical focus or reading orders, that's not the case here, though, but be sure to check anything you flip with a keyboard and also a screen reader/keboard combo. I also set position: static; as I want the default flow, here and I actually used position: relative; for the "mobile" view

We need to make the drawer actually open and close, so a basic event listener will do that for us:

```javascript
const trigger = document.querySelector('.nav__trigger');

trigger.addEventListener('click', () => {
  trigger.removeAttribute('data-untouched');
  trigger.getAttribute('aria-expanded') == 'false' ? trigger.setAttribute('aria-expanded', 'true') : trigger.setAttribute('aria-expanded', 'false');
});
```

1. We're getting a reference to our trigger `<button>`, holding it in a `trigger` `const`
2. Then we assign `addEventListener` for `'click'`events to the `trigger`
3. When a user clicks the element, we remove a data attribute data-untouched, this is just what I added to prevent the `@keyframes` animation of the hamburger menu playing on page load (bit out of scope, but that's how I do it)
4. Finally, we have a ternary operator to flip the state of `aria-expanded` on each `click` event

I'll give the important parts of the CSS, here, as it's important to highlight that bit as it does the majority of the heavy lifting:

```css
/* Our "drawer" was full width when there was no JS, that's how i did that */
.no-js .nav__drawer {
  width: 100%;
}

/* When there is JS, our initial state is display: none; and width: 0;
We also want the drawer to be 100% height of the parent. we then set transitions and 
I am allowing discrete transitions, because, whaey, we can now transition display properties*/
.has-js .nav__drawer {
  display: none;
  min-height: 100%;
  width: 0;
  transition: display 500ms allow-discrete, width 500ms ease-in;
}

/* The drawer can only ever have aria-expanded="true" set if JS is available, so 
I'm setting a display property as flex 9block works, too) and i want my drawer to be 20rem wide
I then have to set a starting-style, as transtitioning display: none; to flex; requires
I use this to animate everything else*/
.nav__trigger[aria-expanded="true"] + .nav__drawer {
  display: flex;
  width: 20rem;

  @starting-style {
    width: 0;
  }
}
```

Those are the important bits, this just slides the drawer in and out, most of my other CSS is basic styling, focus and hover styles and the animation for the hamburger, etc.

So, this is kind of done, you have all of the HTML and JS that I have used, but we still have a quite glaring problem:

#### What about mobile?

Obviously it's best practice to build "mobile" first and I didn't mention that, here. There was a reason for this, not because I didn't do it, but because I'm writing about how to build it and by talking about the problem I have created, I can then show you the solution.

So, we're pushing the entire contents to the side, which works great on a larger display, but at a viewport computed to 320px width, there is no space for the page contents. We could have written a media query to set the width of the drawer ro be a maximum of 18rem (288px), as opposed to the 20rem (320px) we used, but then obviously every single word has to wrap and break, images and what not all get too squished and the whole thing generally looks a hot mess. The pattern we built is actually my favourite pattern, but it falls down on "mobile" and I know that, so we need a kind of hybrid approach:

* If the screen is "large enough" (some arbrtary breakpoint), we'll do the push to the side effect
* If the screen is "too small" to look decent when the `.main` is squished, we'll slide out on a new layer, above the top

So, if we slide a panel out, that covers the entire of the viewport we do of course run the risks associated with escaping the container with the <kbd>Tab</kbd> key or virtual cursor and failing 2.4.7, 2.4.11. Is it a modal? It certainly quacks like one, doesn't it? It covers the whole page, blocking interaction and exists on the top-most layer. But, it's exactly the same component on both "mobile" and desktop, so should we change the ARIA to be modal? I have to admit, I'm not 100% sure, here, if taken in isolation on a smaller viewport, then every instinct I have would say "modal", but taken with the larger screen layout and everything inbetween I have enough doubt to question myself. It's not for me to decide what is best, here, it's simple enough for me to do, but would I be doing it for the right reasons? I'd need disabled people's advice here, which unfortunately I cannot get, so, I'm not going to make it modal, I'll leave that as an unanswered question. I will provide a little snippet of JS to show how we could do that and I'll also add an auto-close feature, just to prevent any tabbing underneath, obviously I can't do anything about the virtual cursor, but I can add light dismiss.

So, remember our main bits for pushing the main content out were in a CSS media query? These bits aren't, so they will, in essence apply to all viewports up until that first breakpoint:

```css
.has-js .site {
  position: relative;
}

.has-js .nav__drawer {
  position: absolute;
  top: 0;
  right: 0;
}
```

 In the above, we are simply setting the parent container .site, to position relative

#### Bonus?

In my implementation I have three links in the Primary nav, then the <button> is advacent to those. When the viewport is very small (less than 370px width) our links wrap and it looks a little unsightly. This is likely to be more of an issue on a real world site, as my link names are just "Item 1", "Item 2", etc, whereas real world sites may have links with longer names.

We could solve this solely with CSS, by stacking the links in a column, with flexbox, however, in my experience designers don't often like the stacked effect, so it is quite common to move a couple of links into the Secondary navigation.

I'm just moving one, purely as a demo, I'm not suggesting this is the best solution, as I'd personally just stack them, however, seldom do we have the clout to influence design changes, so we just roll with the current design.

```javascript
let screenWidth = window.matchMedia('(width <= 48em)');
let smallViewport = screenWidth.matches;

screenWidth.onchange = (evt) => {
  if (evt.matches) {
    smallViewport = true;
    shuffleNav()
  } else {
    smallViewport = false;
    shuffleNav()
  }
}

const shuffleNav = () => {
  const overflowItem = document.querySelector('.nav__item--overflow');
  if (smallViewport) {
      drawer.querySelector('.nav__drawer-list').prepend(overflowItem);
  } else {
      mainNav.appendChild(overflowItem);
  }
}

shuffleNav();
```

* Set a couple of variables, the first uses `matchMedia()` to get out our CSS breakpoint, which I'd earlier set at `48em`

  * The Second returns a `true` of `false` value, `true` if the sceen width is less than 48em and `false` otherwise
* We need to monitor the `onchange` event of that variable and update it accordingly, we also call a function `shuffleNav()`
* Inside `shuffleNav() `we grab the item we want to move (you'd need to loop through the list items if you wanted to move more) `.nav__item--overflow`, if `smallViewport` is true, we `prepend()` the list within the drawer with that item
* Else we pop it back into the Primary nav

This is only going to be useful if the Primary and Secondary navigations are somewhat similar, so if the Secondary were a list of movies and the nav was called Movies, then moving the "About us" link into there wouldn't make any sense.

If I were building a site and I had full artistic licence, and encountered this problem, I'd solve it with CSS, but here I'm just showing how we may go about it if the design dictated a horizontal Primary nav that moved elements into the Secondary nav.

#### Another possible enhancement?

On very large screens we could do away with the button, completely, we could just always show the drawer as open. It makes sense to have a toggle up to a certain point, but I limit the width of my sites anyway, so the line length isn't too problematic for folk with reading disabilities, etc. Is there any point in hiding it when we have adequate void space around the page's `<body>`? I guess that would totally depend on wht was inside the drawer, but let's assume the contents are as important as the primary navigation, categories in a store, topics on a blog, that kind of thing, then I don't think hiding the drawer when there is enough space to show it, benefits anybody.

A little media query can handle that, we wouldn't need any JS. We could just hide the `<button>` at a suitably large enough viewport and then remove animations and the display: none; property. As I typically limit the width of my sites to around `75rem` (1200px) if they are "single column" type sites and a standard Full HD monitor has a viewport width of 1920px we end up in a situation where hiding the drawer becomes sort of perfunctory and ill-thought-out. We usually hide things in disclosures, etc, to make use of available screen real estate and to avoid overwhelming users with too much secondary information. If these links were important on this site, or indeed they were actions or settings of some form. Just a little media query for that:
