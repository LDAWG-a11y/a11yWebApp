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

Sometimes we may want to hide some content on a website until a user interacts with a control, to expand that hidden content, that's when we would reach for a disclosure pattern. This can be the typical mobile navigation menus, accordions or other elements on webpages.

These basic patterns are relatively easy to achieve, depending on your knowledge of the technologies used for frontend end web development:

* HTML - for our structure and meaning
* JavaScript (JS) - for the interactivity
* CSS - for Styling, but mostly displaying and hiding the content
* ARIA - for providing some additional information to users of assistive technologies, to help them understand the widget and how to interact with it

The principles are basically the same for an accordion as they are a mobile nav, in that they both have a "triggering" element and they both disclose some previously hidden content when that trigger is clicked.

## Basic disclosure patterns considerations

Fist and foremost, let's briefly go over what we need to consider when creating a disclosure pattern:

* First and foremost, we need to ensure we use the correct HTML elements for the job, as this provides vital information to users of assistive technologies. Using the wrong elements can cause confusion and sometimes it can make using the element impossible for some users
* Providing additional information with ARIA, this informs users of relationships in content and the current state the control is in, which is super useful for users of assistive technologies
* Focus management, this is really important, as often websites have an illogical focus order, which can get really confusing for users that navigate with keyboards and other hardware or software that is not a pointing device.
* Focus styles, simply put, let folk see where they have moved keyboard focus to, so they can actually use the site in a comparable way
* Progressive enhancement, by using JS only to enhance the experience, we can ensure that where JS doesn't load or a user switches it off, it doesn't prevent a them from accessing any content at all
* Actually hiding the content from the accessibility tree and the DOM, using CSS, when we say actually hiding we mean using the correct display properties so the content is not reachable in its hidden state

## Let's build an accordion

Our first disclosure pattern is an accordion, an accordion is typically a large interactive element, that has a title, when it is clicked, it exposes some content, in a panel that is related to that title. There's usually some additional visual affordance that the element expands, such as Plus/minus icons or arrows etc, which typically indicate the control can be interacted with or its current state.

As the title introduces new content and that content is the to-be-hidden panel we should reach for a heading element, with the appropriate level for its location on the page, so we have a nice heading hierarchy, which enables our users to better understand the page structure. I'm going to build ours with a heading level 3 or `h3` tag, your structure may be different though, so change it accordingly.

### Our very basic HTML

```html
<h3 class="accordion">I have some content to hide</h3>
<div class="accordion__panel">I am the content that should hide or display</div>
```

Pretty straightforward stuff so far, we just have a `h3` and a `div`, each has some content and each has a class which we can hook on to with CSS and JS.

That's the only HTML we will write in a HTML file, we'll add some HTML, but we're going to do that in JS as we're progressively enhancing our accordions. Let's imagine we have several accordions on a page and they each use the same HTML as above and one of our users comes along and for whatever reason they're accessing the page without JS, they would get a page with several headings, each with some content that follows, nothing is lost, nothing is inaccessible to them. Sure, they may not get the same experience you or your team designed, but what is important, is they get the experience they chose or the best experience their device or connection will let them have.

### Let's modify out HTML with JS

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
  
  // Get the content from each panel
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
    - add an aria-expanded="false" to our button (these accordions will start collapsed
    - add the title we stored earlier, into the button
  */
  accordion.innerHTML = `<button class="accordion__btn" aria-controls="panel-${idx + 1}" aria-expanded="false">${title}</button>`;
  
  // Store a reference to the buttons we created
  const btn = accordion.firstElementChild;
  
  /*
    Add a data attribute to the accordion heading, 
    this comes in handy for CSS later
  */
  accordion.setAttribute('data-open', false);
});
```

So, with the above, we have our button in the correct place, we have all of our required ARIA and we have the necessary attributes to hook on to in CSS. Of course, it won't actually do anything just yet, as we haven't listened for clicks or done anything with them, yet. Let's do that now.

#### Listen for click events with JS

```javascript
// Our previous JS with the comments removed
const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion, idx) => {
  const title = accordion.innerText;
  const panel = accordion.nextElementSibling;
  panel.id = `panel-${idx + 1}`
  accordion.innerHTML = `<button class="accordion__btn" aria-controls="panel-${idx + 1}" aria-expanded="false">${title}</button>`;
  const btn = accordion.firstElementChild;
  accordion.setAttribute('data-open', false);
  
  // We're adding new JS below
  
  // let's listen for a click event on each button, as we are still in our loop
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
        If aria-expanded was true, set it to false,
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

So, our structure means that our panel is a sibling of our heading, as opposed to the button, so I couldn't change the display properties of the panel, based upon the `aria-expanded` value of something that was neither a sibling or a child element (I **think** it is now possible with some shiny new CSS, but that wouldn't work for older browsers). So now when I use the adjacent sibling selector (the plus symbol '+') in CSS, I can basically say, if this heading has `data-open="false"` add these styles to its next sibling and obviously if it is a value of `false`, we can set different styles, as demonstrated below.

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

* I have used `display: none;` and `display: block;` This hides the content from the accessibility tree and the DOM, so rest assured, a user isn't going to be tabbing around content that is supposed to be hidden, as it is hidden properly
* I could have used `visibility: hidden;` and `visibility: visible;`, if I had done this, it would have still accessibly hidden the panel contents, but we would have needed to set `height: 0;` and `height: auto;` for when it is collapsed or expanded, respectively, as `visibility: hidden;` will still occupy the same space, unless we explicitly set its `height:` to 0
* You can technically animate the visibility properties, but I still haven't managed to do this perfectly for this site (so my code for that isn't running), but that's beyond the scope of this guide. If you do want a fancy animation, then consider what happens when a user changes the font size in their browser, if they resize the window and if they change the orientation of their device, make sure no content becomes obscured, by correctly listening for all these events and adjusting the size accordingly
* If you change the CSS selectors in my example, be sure to consider what will happen without JS, as in this example our heading only gets the data attribute added via JS, we aren't hiding our panel contents when JS is unavailable or switched off by the user, so be sure to check your panels still display when JS is disabled

### Quick overview of what we just did

* We started with 2 HTML elements, a `h3` and a `div`, they just had a `class` each. This is exactly what a user gets with no JS
* We stored the text from within each heading and then created a button

  * In that button we added the text that we got from the heading
  * We added `aria-expanded="false",` so when a screen reader user arrives on that, they will hear "I have some content to hide, collapsed, button" or words to that effect
  * We added `aria-controls="[IDRef of the next panel]"`, this creates a reference that some assistive technologies will use to understand the element and convey that information to a user, although this isn't fully supported in many screen readers now, but maybe tomorrow it will be
  * We added an ID to our panels, which matched the aforementioned `aria-controls` reference
  * We added an event listener to our buttons, so we can listen for clicks and toggle values when on each click
* We added a data attribute to our heading, I use this approach to hook on to its value with CSS
* When a user clicks that button, it toggles our `aria-expanded` value and our data attribute's value, they are both always the same value
* We used the adjacent sibling selector in CSS to access our panel, so when the value of the data attribute changes on our heading, we target the panel's display properties based on that value

### Encountering our accordion with a screen reader

I'm on a Mac, using Safari and VoiceOver (That's the combo you should test with if you are on a Mac):

* When I tab to our accordion, VoiceOver informs me: "I have some content to hide, collapsed, button"
* If I then hit <kbd>Space</kbd> or <kbd>Enter</kbd> I then hear "I have some content to hide, expanded, button"

So users are always aware of the accordion's current state as we have passed that information to their assistive technology, also, there's no confusion if JS is switched off, it didn't load or the page was accessed in a "Reader view" etc, as there is no button, there are no expanded or collapsed states and everything is available to the user. Other screen readers will make slightly different announcements, so don't worry if you hear something slightly different on a Windows machine, as long as we hear it's a button, whether it is collapsed or expanded and of course the title, we have provided the necessary information that users will be familiar with.

### Accordion live demo

Run the CodePen below to see a working example that actually looks like an accordion. Please note, I have added focus styles, hover styles and a Windows High Contrast Mode media query, but I have not tested the styles comprehensively, I built this example in CodePen and viewed it with FireFox, Edge (with forced colors emulation) and Safari on a Mac. In a real-world scenario, I would test this across multiple browsers, devices and operating systems, but the purpose of this guide was to demonstrate how to build a progressively enhanced accordion. So please do battle test my work if you intend on copying the code.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="vYrdrxp" data-preview="true" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/vYrdrxp">
  Accordions Demo</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### What about the Details/Summary element?

Good question, the native accordion-like element provided by HTML which has most of the functionality of our accordion, out of the box. It seems there are still a few little quirks with how browsers and/or assistive technologies handle these, so you should definitely test across multiple devices, multiple browsers and of course assistive technology pairings. We use a `details` and `summary` element for our table of contents, we set it to `open` on page load, this is so a keyboard user who wants to read the whole page sequentially doesn't have to tab or arrow through them, if they don't want.