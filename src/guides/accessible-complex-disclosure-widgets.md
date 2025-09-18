---
title: Accessible complex disclosure widgets
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

If you read my older guide on creating "basic" accessible disclosure widgets, then the aim of this guide is to take it up a notch or two, by building variations of a pattern that is a little more complex, the nav drawer. Nav drawers are very common, especially on complex web apps, as there are often multiple navigation features to access the many features these systems have.

As appears to often be the case, this guide has come about to me encountering several nav drawers, whilst testing, over the last couple of months.

So, what is a nav drawer? Put into simple terms, it's just a side navigation that slides out into the visible part of the viewport when a user clicks the trigger control. Technically, nav drawer can also appear from the top or bottom of the viewport, but, we pushed down from the top in the "Basic" article, also, I'm probably over-selling it a little here, by saying that side drawers are "complex", they do come with additional challenges and considerations for us like-minded folks that will put accessibility first in everything we build, but at they're not a "boss level" challenge, like some UI patterns. So, to make my claim of "complex" a little less of an overreach, we'll discuss and build some different variations, just to spice things up a little.

## Types of drawer effect

I don't know if I am using the correct terminology for these, I haven't researched them in any way, but we'll just go with my guessed naming conventions I'll explain what I mean:

1. The standard push to the side drawer, this will either push the whole page content out of the viewport, or at least part of it, that'll likely depend a lot on the viewport size, when a user invokes the control
2. The overlay drawer, this will simply overlay the main page, it will sit on top and not effect it in any way, other than obscuring part of it
3. The fixed icon drawer, this will always show an icon for each link or control within, in a narrow side panel, but should a user click the trigger, then drawer will slide into view and show the icons along with text labels. Honestly, I'm a less keen on these, I think CSS Tricks used this pattern, way back when, sure, it's kinda OK if you're sighted, use a pointing device and have some idea what the icons mean, but, what is the point in hiding just the labels? everything has to still be in the focus order, so expanding/collapsing serves no purpose to blind screen reader users and in reality, the iconography isn't likely to be universally understood, so what the benefit actually is, I have no idea. Still, we'll build one, anyway as I like to thing of my guides as a foundation for further exploration or discussion, as opposed to a "Thou must" thing.

## Let's build our drawers

As always (well where possible) we will start with minimum viable product, that is completely usable, without JS and then progressively enhance our mock page, where JS is available.

### Minimum viable product

JS is going to do a decent bit of the heavy lifting here, as we will need to wrangle the DOM and shuffle stuff about a little, if we weren't good accessibility troopers, we'd pretend this isn't a thing and not consider what would happen without JS, which would likely be the contents of our drawer would be completely hidden, or at best, a broken UI. Neither of those sounds like anything I'd be comforatble putting my name to or anything I'd want a user to have to deal or attempt to deal with. So, we'll start with two nav elements, one below the other, Primary and Secondary seem like decent enough names to use, our top nav will be Primary and our drawer will be Secondary, so what are we going to make? The below screenshot shows how I have set up the UI for when JS isn't available:

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
    <div class="site">
      <header class="header">
        <a href="main" class="skip-link">Skip to content</a>
        <nav class="nav" aria-labelledby="primaryNavLabel">
          <h2 id="primaryNavLabel" style="display: none;">Primary</h2>
          <div class="nav__top">
            <ul class="nav__list">
              <li class="nav__item"><a href="#" class="nav__link">Item 1</a></li>
              <li class="nav__item"><a href="#" class="nav__link">Item 2</a></li>
              <li class="nav__item"><a href="#" class="nav__link">Item 3</a></li>
            </ul>
          </div>
        </nav>
        <div class="drawer">
          <nav class="nav__drawer" id="sideNav" aria-labelledby="sideNavLabel">
            <h2 id="sideNavLabel" style="display: none;">Secondary</h2>
            <button class="nav__trigger" aria-expanded="false" aria-controls="sideNav">Menu</button>
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
          </nav>
        </div>
      </header>
      <main class="main" id="main">
        <h1>Lorem ipsum</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ipsam iusto harum natus corporis reiciendis enim cupiditate recusandae officia commodi sed dicta, repellendus, maiores iure, voluptatem autem officiis aspernatur quia saepe temporibus quas assumenda rerum quisquam. Aut repellendus nam dignissimos eveniet at ex beatae saepe eum eaque eius. Repellat, vero.</p>
        <!-- <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eveniet, minima necessitatibus est quidem quaerat impedit quibusdam. Quia placeat non veritatis iusto dolorum fugiat iste, laboriosam repellendus minima perspiciatis nobis quasi sequi et, illum ipsam laudantium iure perferendis odit sed!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, obcaecati distinctio, assumenda iste provident velit at dolor modi esse iure blanditiis. Voluptates hic sit perspiciatis, facilis quis, laudantium at quas repudiandae dolorum esse recusandae nesciunt porro delectus accusamus amet obcaecati? Distinctio voluptatibus saepe harum? Eius autem quasi fuga praesentium error!</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed laboriosam voluptates officiis ad laborum, corrupti, nam cum nesciunt incidunt eveniet qui cumque saepe neque? Quisquam totam minima facilis odio officia. Quisquam, numquam! Dignissimos quasi voluptatibus maiores nemo adipisci eum vitae atque eius illum deserunt veniam ad ducimus omnis, eligendi vero quos praesentium debitis aut nulla magni! Harum sed modi quae error deserunt, incidunt natus. Exercitationem.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis veniam a recusandae fugiat asperiores repellendus maiores voluptatum inventore quaerat. Similique unde dolorum omnis ullam debitis beatae ipsa ex. Dignissimos incidunt architecto ipsam asperiores ab a exercitationem dolores voluptas ipsa error amet corrupti et tenetur, enim molestiae fugit illo maxime temporibus sed! Suscipit quia ab placeat?</p> -->
      </main>
      <footer class="footer">
      <p>MTA drawer 2025</p>
      <a href="#">Item 12</a>
    </footer>
    </div>
  </body>
</html>
```

##### A quick summary of the HTML

* We have a `no-js` class on the `html` element, we will remove this later, with JS, so basically, if JS can remove it, it's loaded/available
* As we have more than one `nav` element, we need to give them names, so using a`ria-labelledby="[Ref_of_hidden_text_node]"`, we give the top `nav` the AccName of "Primary" and the lower `nav` (will be a drawer) an AccName of "Secondary". These nodes are in the above HTML and both have `display: none;` set, remember that `aria-labelledby` ignores that setting, by design, which I find to be super handy for situations just like this. I don't normally write styles in my HTML, as separation of concerns and CSS specificity, etc, but this doesn't make me feel icky, as I don't want anybody to ever see that text
*

#### The CSS

I'm going to omit the CSS, again, as everything gets to unwieldy, I'm also building this thing as I type, so I'm constantly adding or modifying the CSS. It will of course be available in the CodePen, at the end.

### Let's progressively enhance it

First things, first, we need to remove the no-js class from the html element and add a has-js class. We don't technically need both, but it just makes it a smidge easier to style things, for both possibilities, I guess.

#### JS Swapping the JS class

Just add this in the HTML's <head> section, I believe it's better to add it after the title, encoding and links to other resources, such as CSS, fonts and whatever else you may link to in your <head> section>, for performance reasons.

```javascript
<script>
  document.querySelector('html').classList.remove('no-js');
  document.querySelector('html').classList.add('has-js');
</script>
```

##### Nothing spectacular, here

we're simply removing the class no-js and then adding a new one, has-js, this can only happen if the user, user-agent or whatver else hasn't blocked JS

#### Moving the entire drawer in the DOM

I gave this one a little thought, and for the drawer to push the page or squish it, it needs to be on the same layer, so that rules out position: absolute; etc, as it would just slide over the top and we're going for a push effect, first. I'm not 100% sure whether this can be achieved without moving it to another location in the DOM, I do concede though, i haven't thrown everything at it to test my theory, I just thought about it and didn't have any lightbulbs illuminating around my head, so I thought, I'll just move it.
