---
title: Accessible basic disclosure widgets
summary: Learn how to create accessible basic disclosure patterns, using the
  correct ARIA and HTML for expandable widgets such as accordions and
  navigations
author: dlee
date: 2022-11-21
toc: true
tags:
  - HTML
  - JavaScript
  - ARIA
isGuide: true
---
## Basic disclosure patterns intro

Sometimes we may want to hide some content on a website until a user interacts with a button and when they do we would expand that previously hidden content, that's when we would reach for a disclosure pattern. This can be typical mobile navigation menus, accordions or other elements on webpages.

These basic patterns are relatively easy to achieve, depending on your knowledge of the technologies used for frontend end web development:

* HTML - for our structure and meaning
* JavaScript (JS) - for the interactivity and progressive enhancement
* CSS - for Styling, but most importantly displaying and hiding the content
* ARIA - for providing some additional information to users of assistive technologies, to help them understand the pattern and how to interact with it

The principles are basically the same for an accordion as they are a mobile nav, in that they both have a "triggering" element and they both disclose some previously hidden content when that trigger is clicked (clicked also means key presses etc in this context, as they all the JavaScript 'click' event).

## Basic disclosure patterns considerations

Fist and foremost, let's briefly go over what we need to consider when creating a disclosure pattern:

* Firstly, we need to ensure we use the correct HTML elements for the job: this provides vital information to users of assistive technologies. Using the wrong elements can cause confusion and sometimes it can make using the pattern impossible for some users
* Providing additional information with ARIA: this informs users of relationships in content and the current state the control is in, which is super useful for users of assistive technologies
* Focus styles: simply put, ensure users can see where they have moved keyboard focus to, so they can actually use the site in a comparable way
* Progressive enhancement: by using JS only to "enhance" the experience, we can ensure that where JS doesn't load, a user switches it off or they're viewing in "Reader mode" etc, it doesn't prevent a them from accessing any content at all
* Hiding the content both visually and from the accessibility tree, using CSS: ensuring the content is hidden for everybody, until they interact with the control

## Let's build an accordion

Our first disclosure pattern is an accordion, an accordion is typically a large interactive element, that has a title, when it is clicked, it exposes some content, in a panel that is related to that title. There's usually some additional visual affordance that the element expands, such as Plus/minus icons or arrows etc, which typically indicate the control can be interacted with or its current state.

As the title introduces new content and that content is the to-be-hidden panel we should reach for a heading element, with the appropriate level for its location on the page, so we have a nice heading hierarchy. Having a good heading structure enables our users to better understand relationships in content. I'm going to build our accordion with a heading level 3 or `h3` tag, your structure may be different though, so change it accordingly.

### Our very basic HTML

```html
<h3 class="accordion">I have some content to hide</h3>
<div class="accordion__panel">I am the content that should hide or display</div>
```

Pretty straightforward stuff so far, we just have a `h3` and a `div`, each has some text and each has a class which we can hook on to with CSS and JS.

That's the only HTML we will write in a HTML file, we'll add some HTML, but we're going to do that in JS as we're progressively enhancing our accordions. Let's imagine we have several accordions on a page and they each use the same HTML as above, then one of our users comes along and for whatever reason they're accessing the page without JS, they would get a page with several headings, each with some related content that follows, nothing is lost, nothing is inaccessible to them. Sure, they may not get the same experience you or your team designed, but what is important, is they get the experience they chose or the best experience their device or connection will let them have.

### Let's modify our HTML with JS

Let's make this accordion interactive, what's the correct HTML element we need for that? Yep, the trusty `button` element (I'm going to write my JS as if we had more than 1 accordion, as often we will).

```javascript
// Get all elements that have a class of accordion
const accordions = document.querySelectorAll('.accordion');

/* 
  Loop through each accordion, we will reference each accordion with 
  'accordion' and its ID or position in the loop with 'idx'
*/
accordions.forEach((accordion, idx) => {
  // Store the text from within the heading
  const title = accordion.innerText;
  
  // Get the panel that is the next element to each heading
  const panel = accordion.nextElementSibling;
  
  /*
    Set an ID on each panel, to create an ARIA reference and relationship.
    arrays are zero-based, so I'm adding 1 to each ID, so we start at 1
  */
  panel.id = `panel-${idx + 1}`
  
  /* 
    - Add a button inside the heading
    - add a class to that button
    - add an aria-controls="[ID of our panels]"
    - add an aria-expanded="false" to our button, our initial state
    - add the text we stored earlier, into the button
  */
  accordion.innerHTML = `<button class="accordion__btn"
    aria-controls="panel-${idx + 1}" 
    aria-expanded="false">${title}</button>`;
  
  // Store a reference to the buttons we created
  const btn = accordion.firstElementChild;
  
  /*
    Add a data attribute to the accordion heading, 
    this comes in handy for CSS later
  */
  accordion.setAttribute('data-open', false);
});
```

So, with the above we have our button in the correct place (buttons go inside headings, not the other way round), we have all of our required ARIA and we have the necessary attributes to hook on to in CSS. Of course, it won't actually do anything just yet, as we haven't listened for clicks or done anything with them. Let's do that now.

#### Listen for click events with JS

```javascript
// Our previous JS with the comments removed
const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion, idx) => {
  const title = accordion.innerText;
  const panel = accordion.nextElementSibling;
  panel.id = `panel-${idx + 1}`
  accordion.innerHTML = `<button class="accordion__btn"
    aria-controls="panel-${idx + 1}" 
    aria-expanded="false">${title}</button>`;
  const btn = accordion.firstElementChild;
  accordion.setAttribute('data-open', false);
  
  // We're adding new JS below
  
  /*
    let's listen for a click event on each button, 
    as we are still in our loop
  */
  btn.addEventListener('click', () => {
    // Check if aria-expanded is set to false
    if (btn.getAttribute('aria-expanded') == 'false') {
      /*
        if aria-expanded is set to false, toggle it to true
        and also do the same to the heading's data attribute
      */
      btn.setAttribute('aria-expanded', 'true');
      accordion.setAttribute('data-open', "true");
    } else {
      /*
        If aria-expanded isn't set to false, 
        it must be set to true, so set it to false,
        along with our data attribute
      */
      btn.setAttribute('aria-expanded', 'false');
      accordion.setAttribute('data-open', false);
    }
  });
});
```

That's it, that's both the HTML and JS complete for our accordions. If you're following along in a code editor and you were to inspect the HTML in the DevTools, you will notice we have a nice structure, the required properties and a little bit of interactivity, in that if we click the button, the value of `aria-expanded` toggles, along with the value of our `data-open` attribute. Nothing is happening on the screen, just yet, but this is where we use CSS to achieve that.

Perhaps you were wondering why I added a data attribute on to our accordions heading? I'll explain that briefly now:

So, our structure means that our panel of content is a sibling of our heading element, as opposed to the button. This means we can't change the display properties of the panel, based upon the button's `aria-expanded` value, as it is neither a child or sibling element (I **think** it is now possible with the shiny new CSS `:has` selector, but that wouldn't work for older browsers). So now when I use the adjacent sibling selector (the plus symbol `+`) in CSS, I can basically say, if this heading has `data-open="false"` add some styles to its next sibling and obviously if it is a value of `false`, we can set different styles, as demonstrated below.

### Adding the basic CSS

```css
/* 
  When our accordion heading has data-open="false" set, get the panel
  with the adjacent sibling selector and hide it with display: none;
*/
.accordion[data-open="false"] + .accordion__panel {
  display: none;
 }

/* 
  When our accordion heading has data-open="true" set, get the panel
  with the adjacent sibling selector and hide it with display: block;
*/
.accordion[data-open="true"] + .accordion__panel {
  display: block;
}
```

That's it, our accordion now works, it accessibly hides and displays content. Just a couple of things to discuss before we move on:

* I have used `display: none;` and `display: block;` This hides the content from the accessibility tree and visually, so rest assured, a user isn't going to be tabbing around content that is supposed to be hidden, as it is hidden properly
* I could have used `visibility: hidden;` and `visibility: visible;`, if I had done this, it would have still accessibly hidden the panel contents, but we would have needed to set `height: 0;` and `height: auto;` for when it is collapsed or expanded, respectively, as `visibility: hidden;` will still occupy the same space, unless we explicitly set its `height:` to 0
* You can technically animate the visibility properties, but it's actually quite difficult to achieve for dynamic content, but that's beyond the scope of this guide. If you do want a fancy animation, then consider what happens when a user changes the font size in their browser, if they resize the window, zoom the page and if they change the orientation of their device, make sure no content becomes obscured, by correctly listening for all these events and adjusting the size accordingly
* If you change the CSS selectors in my example, be sure to consider what will happen without JS, as in this example our heading only gets the data attribute added via JS, we aren't hiding our panel contents when JS is unavailable or switched off by the user, so be sure to check your panels still display when JS is unavailable

### Quick overview of what we just did

* We started with 2 HTML elements, a `h3` and a `div`, they each had a `class`. This is exactly what a user gets with no JS
* We stored the text from within each heading and then created a button

  * In that button we added the text that we stored from the heading
  * We added `aria-expanded="false",` so when a screen reader user arrives on that, they will hear "I have some content to hide, collapsed, button" or words to that effect
  * We added `aria-controls="[IDRef of the next panel]"`, this creates a reference that some assistive technologies will use to understand the element and convey that information to a user, although this isn't fully supported in many screen readers now, but maybe tomorrow it will be
  * We added an ID to our panels, which matched the aforementioned `aria-controls` reference
  * We inserted that button into the heading
  * We added an event listener to our button, so we can listen for clicks and toggle values on each click
* We added a data attribute to our heading, I use this approach to hook on to its value with CSS
* When a user clicks that button, it toggles our `aria-expanded` value and our heading's `data-open` value, they are both always the same value
* We used the adjacent sibling selector in CSS to access our panel, so when the value of the `data-open` attribute changes on our heading, we target the panel's display properties based upon that value

### Encountering our accordion with a screen reader

I'm on a Mac, using Safari and VoiceOver (That's the combo you should test with if you are on a Mac):

* When I tab to our accordion, VoiceOver informs me: "I have some content to hide, collapsed, button"
* If I then hit <kbd>Space</kbd> or <kbd>Enter</kbd> I then hear "I have some content to hide, expanded, button"

So users are always aware of the accordion's current state as we have made that information available to their assistive technology, also, there's no confusion if JS not present, as there is no button, it's just a heading and some content. Other screen readers will make slightly different announcements, so don't worry if you hear something slightly different, as long as we hear it's a button, whether it is collapsed or expanded and of course the title, we have provided the necessary information that users will be familiar with, the Name, the Role and the Value.

### Accordion live demo

Run the CodePen below to see a working example that actually looks like an accordion. Please note, I have added focus styles, hover styles and a Windows High Contrast Mode media query, but I have not tested the styles comprehensively, I built this example in CodePen and viewed it with FireFox, Edge (with forced colours emulation) and Safari on a Mac. In a real-world scenario, I would test this across multiple browsers, devices, viewports and operating systems, but the purpose of this guide was to demonstrate how to build a progressively enhanced accordion. Please ensure you test on more robustly, make it responsive and only add subtle animations, that won't distract your users or trigger any physical seizures.

<p class="codepen" data-height="460" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="vYrdrxp" data-user="LDAWG-a11y" style="height: 460px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/vYrdrxp">
  Accordions Demo</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### What about the Details/Summary element?

Good question, the native accordion-like element provided by HTML which has most of the functionality of our accordion, out of the box. It seems there are still a few little quirks with how browsers and/or assistive technologies handle these, so you should definitely test across multiple devices, multiple browsers and of course assistive technology pairings. We use a `details` and `summary` element for our table of contents, we set it to `open` on page load, this is so a keyboard user who wants to read the whole page sequentially doesn't have to tab or arrow through them, if they don't want.

## Let's build a mobile navigation

I'm not going to go into as much depth here, as in principle we're just doing the same thing, expanding an element to conditionally show some content. there are some differences in HTML structure, of course and we won't be writing our JS in a loop as we will only have 1 navigation element.

When screen space is tight, such as on a mobile or when a user zooms the page on a desktop, sometimes we can't fit all of our primary links in a nice horizontal line, so we reach for the mobile navigation pattern. When we do this, we really do need to get this right, because in some cases, all of the links to navigate the site are in there and if a user can't access those, well, that can be a total blocker for them (I mean, there should be more than 1 way to navigate a site anyway).

### Let's start with some good old HTML

```html
<header>
  <nav class="nav">
    <ul class="nav__list" id="navlist">
      <li class="nav__item">
        <a class="nav__link" href="#">Link 1</a>
      </li>
      <li class="nav__item">
        <a class="nav__link" href="#">Link 2</a>
      </li>
      <li class="nav__item">
        <a class="nav__link" href="#">Link 3</a>
      </li>
      <li class="nav__item">
        <a class="nav__link" href="#">Link 4</a>
      </li>
      <li class="nav__item">
        <a class="nav__link" href="#">Link 5</a>
      </li>
      <li class="nav__item">
        <a class="nav__link" href="#">Link 6</a>
      </li>
    </ul>
  </nav>
</header>
```

So, we have some pretty standard HTML in the code above:

* We have a `<header>`, because that's a good place to put your site navigation
* A `<nav>` element, because well, it's a navigation component
* We have a `<ul>` element, because we want a list of links, it also has an ID, as we need that for the aria-controls reference
* We have our list items `<li>`, each with a link `<a>` element inside
* I've added some classes, so we can target these elements with CSS and JS

Pretty straightforward stuff again, right? A couple of things to bear in mind:

* If you only have a few links in your navigation, it's not worth adding a disclosure widget to display them
* If you have another `<nav>` element elsewhere on your page, then we should add an accessible name to our `<nav>` element, so it is a unique landmark, perhaps like so: `<nav aria-label="primary">`, so users can use their assistive tech to quickly find regions of interest. If you're catering for an international audience, you'd be better using `aria-labelledby="IDRef of a visually hidden text node"`, as `aria-label` has some issues with translation
* Finally, considering we want our navigation to display nicely and be usable should JS not be present, we should also ensure we check how it looks without JS enabled

### Let's progressively enhance our nav with JS

We need to target our `<nav>` element and add a button inside it, as the control (the `<button>`) forms part of our navigation, so we want it inside of our `<nav>`. The goal here is for a screen reader user to hear something link "navigation, menu button, collapsed" which provides the necessary information to understand the purpose of the control and its current state, which is initially collapsed.

#### Let's add a button to our navigation

```javascript
const mainNav = document.querySelector('.nav');
/*
  Store all the existing contents of the nav
*/
const mainNavContent = mainNav.innerHTML;

/*
  insert a button into our nav which has:
  - a class
  - An aria-controls reference
  - Aria-expanded set to false
  - the word Menu as the button's label
    Then we need to pop the old contents of the nav element back in,
    as we just replaced it
*/
mainNav.innerHTML = `<button class="nav__btn" aria-expanded="false"
aria-controls="navList">Menu</button> ${mainNavContent}`;
```

So now we have a button, that references the list we want to toggle the visibility of, now let's add an event listener so we can actually toggle our `aria-expanded` value.

#### Let's listen for a click on our nav button

```javascript
/*
  Our previous JS with the comments removed
*/
const mainNav = document.querySelector('.nav');
const mainNavContent = mainNav.innerHTML;
mainNav.innerHTML = `<button class="nav__btn"
  aria-expanded="false"
  aria-controls="navList">Menu</button> ${mainNavContent}`;

// We're adding new JS below

/*
  Look in the nav element for our newly created button
*/
const btn = mainNav.querySelector('.nav__btn');

/*
  Add an event listener, where we listen for a click
*/
btn.addEventListener('click', () => {
  /*
    When the button is clicked:
    If the aria-expanded attribute is false, set it to true, 
    else set it to false
  */
  btn.getAttribute('aria-expanded') == 'false' ?
  btn.setAttribute('aria-expanded', 'true') :
  btn.setAttribute('aria-expanded', 'false')
})
```

That's it for the JavaScript, it's a little less involved than the accordion example, for 2 primary reasons:

* We're not looping through all the accordions on the page, we're just targeting a singular `<nav>` element
* As the button element in this instance is a sibling of the panel we want to toggle the display properties of, we don't need to add attributes to other elements, also, I opted for a ternary operator, as opposed to an if/else statement, just to reduce the JS a little

We will add a tiny bit of extras JS in a while, but that's not directly related to a disclosure pattern.

### Let's add the final ingredient, CSS

This is just the basic CSS to change our display properties:

* On smaller screens, we will accessibly hide the navigation list, if the button is present and it has aria-`expanded="false"` set

  * If `aria-expanded="true"` is present on that button, we will display the navigation list
* On larger screens, we will accessibly hide the button

  * We will also change the layout to a horizontal list

```css
.nav {
  /* 
    Set the layout to a flex column
  */
  display: flex;
  flex-direction: column;
}

.nav__btn {
  /* 
    Now we have flex column we can easily align the button to the right
  */
  align-self: end;
}

/*  
  Add a media query with a max width a pixel lower than our desktop nav's media query
*/
@media screen and (max-width: 56.24em) {
  /* 
    If our button has aria-expanded="false", hide the list
  */
  .nav__btn[aria-expanded="false"] + .nav__list {
    display: none;
  }

  /* 
    If our button has aria-expanded="true", show the list
  */
  .nav__btn[aria-expanded="true"] + .nav__list {
    display: block;
  }
}

/* 
    An example desktop media query size, where we want the larger screen layout
*/
@media screen and (min-width: 56.25em) {

  .nav__list {
    /* 
      Let's say we want our links spaced equally, including around the first and
      last items, we use the flex layout, to position its children, with 
      uniform spacing, using 'justify-content', set to 'space-around'
    */
    display: flex;
    justify-content: space-around;
  }

  /* 
    We have no need for our button on larger screens and we want it to be hidden,
    from users of assistive technologies too, so let's remove it from the
    accessibility tree and the page
  */
  .nav__btn {
    display: none;
  }
}
```

Obviously the example above doesn't look very pretty, so in a real-world scenario, we'd want to make that look much better. Just a couple of things to consider before you go off styling this example:

* The media query, I just used an arbitrary number, that's somewhat representative of a large tablet, what we may want in the real world is to understand the space taken up by our links, we would have longer link labels, we may have more links or less, remember our sites need to work with text that is sized to 200%, so ensure your implementation doesn't break if we change the font sizes in our browser or operating system
* We may want to use a "hamburger icon" or similar, ensure we provide an accessible name to that button if we replace the text with an icon, otherwise some users may find it difficult to operate or understand
* If you wanted to animate the opening and closing, it's a little easier with a navigation, as you will typically know how many items are in it and you can calculate the final `height` easier, for this you'd need to use `visibility: hidden/visible` and some CSS keyframes

### Additional enhancements

Whilst we could make this navigation panel overlap other content below, I personally prefer the push down approach, but we all have our own preferences. If we cover other content, we need to make the panel dismissible on <kbd>Esc</kbd> press and return focus back to the trigger. This is something I would do for either pattern, as some users may get to the bottom of the list of links, then want to get back into your site header or they may get part the way through and then want to continue down the page. If we allow users to collapse the navigation pane, that could reduce the physical effort required for them to move away from it. We could do that like so (I'm using the same variables as before):

```javascript
 /*
  listen for key down events if a user is in the header
*/
mainNav.addEventListener('keydown', (evt) => {
  /*
    Only if our button has aria-expanded set to true
    And a user presses Escape
    (I'm matching either, 'Esc' or 'Escape', for better browser support)
  */
  if (btn.getAttribute('aria-expanded') == 'true'
    && evt.key == 'Escape' || evt.key == 'Esc') {
    /*
      Set our button's aria-expanded value to 'false', so CSS hides it
      Send focus back to the button
    */
    btn.setAttribute('aria-expanded', 'false');
    btn.focus()
  }
})
```

There wasn't much to that, just 4 lines of JS and we add a nice little enhancement for our users.

### Slightly off-topic

Our last enhancement isn't related to a disclosure pattern, but if you have got this far and I still have your attention, I may as well squeeze it in. Don't forget to set the current page, with ARIA, this is something that you may do in your backend, you may wish to do it with just JS or you may use some form of framework, library or generator, we use the awesome Eleventy, so we easy have access to that. It would of course be best to do this on a server or during the build process if you're using a static site generator, as we want to reduce the amount of JS on the client (browser) as much as possible, mostly because users do access pages without JS, but also we can make nice fancy sites without a gazillion lines of React or Angular (TODO: add emoji support to the CMS, so I can use the "Sick emoji", joking, I'm not going to add emoji). Anyway, if we do set `aria-current="page"`, also provide a visual indicator too, you may already be doing this with an 'active' class or similar, you could literally swap that active class for aria-current and call it good. If we were to use client side JS, we could easily achieve that like so:

```html
<style>
  /* if aria-current is present */
  .nav__link[aria-current] {
    /* Style accordingly */
    background-color: rebeccapurple;
    color: #fff
  }
</style>

<header>
  <nav class="nav">
    <ul class="nav__list" id="navlist">
      <li class="nav__item">
        <a class="nav__link" href="#">Link 1</a>
      </li>
      <li class="nav__item">
        <a class="nav__link" href="#">Link 2</a>
      </li>
      <li class="nav__item">
        <a class="nav__link" href="#">Link 3</a>
      </li>
      <!-- Links removed for brevity -->
    </ul>
  </nav>
</header>

<script>
  // Loop through the links, assign each to the 'el' variable
  document.querySelectorAll('.nav__link').forEach(el => {
    // if the href matches the page URL
    if (el.getAttribute('href') == window.location.href) {
      // Add aria-current="page"
      el.setAttribute('aria-current', 'page')
    }
  })
</script>
```

The above really is just an example, please do this server side or on page generation for robustness.

## Wrapping up

We covered quite a bit there, we discussed how to create 2 different basic disclosure widgets, using the magic of progressive enhancement, we added all the ARIA we needed via JS and for those users that are viewing without JS, they still get all the information on our page, just with less interactivity, which may well be exactly what they want. [Test](/docs/draft-accessibility-statement-2022.docx)