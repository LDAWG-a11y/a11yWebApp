---
title: Responsive tabbed interfaces
summary: Tabbed interfaces are one of those components that make sense at larger
  viewports, but are often problematic on smaller screens. Let's build an
  accessible progressively enhanced widget to handle all viewports
author: dlee
date: 2023-11-17
toc: false
tags:
  - Component
  - HTML
  - JavaScript
  - ARIA
isGuide: true
---
## The tabbed interface

Often just called tabs is an interface design pattern that we will all be familiar with, as some websites use this pattern, but all desktop operating systems do and some mobile apps.

Called tabs or a tabbed interface because of its resemblance to the little tabs you put on the files that would typically be in a file cabinet or binder. Each tab is usually slightly offset for quicker visual identification of a specific file.

On a computer, they are usually represented by a series of "tabs" (either horizontal or vertical) and each has a corresponding panel. There would always be one panel visible and the others would remain hidden until their corresponding tab is clicked. There are implementations where multiple can be open, but let's pretend there isn't.

These UI elements are probably usable to the majority of users when built correctly and styled with strong visual affordances, in that they're commonplace on your Mac or PC for many of the system settings and file directories. They're even present on the operating systems of your phone or tablet. That's not me saying they are a good pattern to use, that's for your users with disabilities to inform you of that, it's their opinion what counts, not mine.

### The problem with tabs

Tabs seem to make more sense on larger viewports, typically desktops, laptops and some tablets (each at regular zoom levels). But just because something works well on larger viewports at regular zoom levels that doesn't guarantee it will work as well on a smaller viewport or when the viewport is zoomed enough to trigger the "mobile view". What we tend to find across the web is something that doesn't really work at smaller viewports. I guess this is a classic case of "Desktop first, mobile worst", in that the experience can differ quite dramatically between the viewport sizes.

The most obvious issue is always going to be the lack of screen real estate, on a smaller viewport you simply cannot fit your horizontal tabs across the screen width if you have more than a few single-word tabs, but even then, the layout will likely break if a user sets their default text size to "Large" or "Largest" etc. What you then end up with is 2 rows of "tabs", so activating a `tab` on the top row will display the `tabpanel` immediately after the bottom row, which looks a little odd.

#### Vertical tabs to the rescue?

Errm, not really. Again you end up in that situation where the only time the visible `tabpanel` immediately follows the active `tab` is if you activated the last `tab`, which some users may find a little confusing and cause them to have to think about what is going on and how these somewhat distant elements are related.

<blockquote>
Don't make me think
<footer>
Steve krug
</footer>
</blockquote>

I am of course making some assumptions here that users find the pattern a little confusing and thus far I am just referring to users who can see the interface, as it's the visuals we are focusing on right now.

## The anatomy of a tabbed interface

Just a quick run through what is needed:

* A wrapping element with `role="tablist"`, this will hold the individual tabs
* Some tabs within the aforementioned `tablist`, the current `tab` will need `aria-selected="true"` to indicate it is the currently displayed `tab`, for screen reader users
* Each `tab` having `aria-controls="IDRef of the associated tabpanel"`, to create a programmatic relationship between each `tab` and its corresponding `tabpanel`
* An interaction model which uses arrow navigation between tabs, only allowing one `tab` to be focusable with the <kbd>tab</kbd> key and then using arrows to "focus" on adjacent tabs, if using a button or link, then `tabindex="-1"` would be required for removing the non-active tabs out of the tab sequence
* For each of the tabpanels that are not visible, hide the `tabpanel` and its contents from both the accessibility tree and the focus order, so they can only be accessed when the tabpanel is visible

## Before we move on

Just a few alternatives for you to look at, Don't worry, I'm not just going to copy anybody's work or paraphrase what has already been said, this is just going to be an alternative, nothing more. 

* If you are unaware of the excellent [Inclusive Components book by Heydon Pickering](https://inclusive-components.design/), you should definitely give that a read, [the chapter for Tabbed Interfaces](https://inclusive-components.design/tabbed-interfaces/) is obviously related to what we are doing here. Heydon's approach is obviously solid, a progressively enhanced table of contents that becomes tabs when JavaScript is available.
* [There is also the Deque tabby-accordion things](https://dequeuniversity.com/library/aria/tabbed-accordion#), which make so much sense visually, the `tabpanel` always displays directly below its corresponding `tab`, but unfortunately, that `tabpanel` is inside the `tablist`, which isn't valid ARIA. I did wonder if I could achieve this with CSS, keeping the DOM in the correct order, but visually moving the `tabpanel`'s position to create the same effect, I'm sure it could be done, but it would likely be quite tricky
* Finally, [Andy Bell has an interesting solution](https://piccalil.li/tutorial/solution-005-tabs/), one I had not seen before until recently, where the `tablist` itself is scrollable, horizontally, so you never run into that "Errm, what do I do for mobile?" problem. Perhaps with a little tweaking to ensure the currently focused tab is fully in view when arrowing through the tabs, this too could likely be a great solution (there is a link to the demo on the previously linked page), all of Andy's work is always progressively enhanced, too

### OK, so what is our approach?

Well, we're just going to go with tabs on larger viewports and accordions on smaller viewports, but we will of course do this properly, in that there will be no incorrect roles present on either widget, all properties will be correct and each widget will have the correct interaction model. We'll also start from a nice progressively enhanced version and only do the magic where JS is available. 

If this isn't the solution for you, I recommend exploring those linked above.

## So, without further ado, let's get stuck in

### A MVP for when there is no JS

Let's start with the good stuff, the HTML, we want this to be our minimum viable product (MVP), this should be accessible if for whatever reason JS doesn't load or the user chooses not to allow it. Given that tabs hide some content by design and typically just show the first panel, I guess this is the important one? Well, we could do something similar, we could use the `<details><summary>` element and force the first one to be `open` on page load, but there are still some browser inconsistencies, as [Scott O'Hara points out here](https://www.scottohara.me/blog/2022/09/12/details-summary.html) and [Adrian Roselli points out here.](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html)

Is it appropriate for us to use this element? Hmm, well it will just work with Reader mode in your browser, as Scott points out, that's arguably going to be the main reason why users are viewing your site with JS not loading. We're only providing this when JS does not load or when a user turns JS off, given that much of the web is single page hell these days and hardly anything works without JS, we should be quite safe here, but we'll do so tentatively, let your users' needs guide your decisions, not some rando dude on the tinterweb.

Our base HTML is our MVP using the `<details>` and `<summary>` elements, obviously I would style these to look decent if I was doing this for work, but this guide isn't really about styling, so I'm just going to leave them as is, knowing they look awful in their unstyled state. If you do determine that these elements are safe to use for your users, then feel free to make them look nice.

```html
<div class="widget__wrapper">
  <details open>
    <summary>Tab 1</summary>
    <div>
      <p>Tab 1 contents: Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quasi ab, error fugiat at,
        maiores enim impedit cumque quidem similique et laborum aliquam modi assumenda officiis est! Sapiente, non
        neque!
      </p>
    </div>
  </details>
  <details>
    <summary>Tab 2</summary>
    <div>
      <p>Tab 2 contents: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam molestias nostrum
        repudiandae, quaerat alias iste placeat at a, sequi deserunt iure praesentium velit repellendus ipsum culpa
        ratione soluta eius magni quasi fugiat repellat necessitatibus fugit.
      </p>
    </div>
  </details>
  <details>
    <summary>Tab 3</summary>
    <div>
      <p>Tab 3 contents: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est illo hic vitae tenetur omnis
        laborum itaque vero adipisci doloremque optio ullam, vel similique aliquam quo!
      </p>
    </div>
  </details>
 </div>
```

That's it, I've just gone for 3 tabs, with short titles as I won't lie, it's easier, I don't want to have to deal with more than one row of tabs on desktop, at that point I'd just be using accordions for all viewports (If I had any say in the matter). So, we have 3 `<details>` & `<summary>` elements and the first has the `open` attribute, just because for whatever reason somebody reached for a tabbed interface, they did so wanting to show one `tabpanel`, as I dunno, I guess it was more important. Notice I have a wrapping <div> inside each <details> which is a sibling of the <summary> element? As you may have multiple paragraphs or even other stuff inside your <details> it makes sense to wrap it all in something, to just grab the contents with JS, assuming we mark it up correctly <summary> as the first child, we know exactly where to find that <div> and it will hold the entirety of the content.

Also, I have wrapped them all in a <div class="widget__wrapper"> because we'll need that for DOM manipulation and also I called it that because it's neither tabs or accordions all of the time, so due to my lack of creativity, we'll just call this element a widget.

### Cool, JS is available, let's do the magic

* First we want to reference our wrapper, as we'll need this for manipulating the HTML within, then we'll declare a few variables in the global scope, so we can access them from outside of our code block.
* Then we create a loop to iterate through our collection of widgets, selecting each of the `<details>` element's `textContent` and assigning it to our `btnText` variable, then we grab the innerHTML of the wrapper's `lastElementChild`, as we know our wrapping `<div>` contains all of the content and we assign that to the `widgetContent` variable.
* Now we need to create a template literal, which holds our new HTML string in our `baseHTML` variable, we do this with the addition assignment operator `+=`, to concatenate the strings for each loop iteration.
* We are creating IDs in here, using the index `idx` of the loop and we are also adding all attributes that are used on both accordions and tabs

  * We're keeping classes and IDs the same, for simplicity
  * Both accordions and tabs have `aria-controls` on the trigger, so we'll add that here and we can of course reference the panel, as we created that ID in this loop too
  * Tabpanels have an accessible name and accordions can too, so we will use `aria-labelledby` and refer to the button element (I know we shouldn't use `aria-labelledby` on a `<div>` without a role, but the roles will be present, they're obviously different)
* We are ultimately going to use this `baseHTML` variable again later, on every occasion we change from accordions to tabs and vice versa, I personally find this way easier than stripping individual attributes out and adding new ones for each change, maybe there's a better way?
* We then set the wrapper's `innerHTML` to an empty string, as we want rid of its existing HTML so we can just supply the correct element for our chosen media queries
* Then, outside of the loop we reassign our variable with a wrapping `<div>` that has the class `widget__controls-wrappe`r and the contents from our loop (we need this extra wrapping div a little later) 
* Finally,  we use `insertAdjacentHTML` after the beginning of the outer wrapper and the HTML we want to insert is of course the `baseHTML`

```javascript
const widgetWrapper = document.querySelector('.widget__wrapper');
let btnText, widgetContent, baseHTML = '';

widgetWrapper.querySelectorAll('details').forEach((el, idx) => {
  btnText = el.firstElementChild.textContent;
  widgetContent = el.lastElementChild.innerHTML;

  baseHTML += `<h3 class="widget__heading">
    <button class="widget__btn" id="btn-${idx + 1}" aria-controls="panel-${idx + 1}">${btnText}</button></h3>
    <div class="widget__panel" id="panel-${idx + 1}" aria-labelledby="btn-${idx + 1}">${widgetContent}</div>`;
  widgetWrapper.innerHTML = '';
})
baseHTML = `<div class="widget__controls-wrapper">${baseHTML}</div>`;
widgetWrapper.insertAdjacentHTML('afterbegin', baseHTML);

```

Next we're going to create some more variables, instead of adding the new JS to the previous step's, I'm just going to show what have I added at each step to reduce the page length, then at the end I'll I'll show the final code in full & tidy it up a little.

* We're eventually going to detect the current media query and display the correct widget, so we use the `matchMedia` method and store that in our `mq` variable, I've set the breakpoint's max-width at `767px`, of course you should do what works best for your site
* We'll store the key presses that we need for the tabbed interface in the array `navKeys`, so we can match these later
* We create an initialising function `init()` and set the `innerHTML` of the `widgetWrapper` to the `baseHTML`
* We store a reference to our `widget__controls-wrapper`, `within init()` as we need this later
* We store the buttons and panels into collections, with the variables `widgetBtns` and `widgetPanels`, respectively

```javascript
const mq = window.matchMedia('(max-width: 767px)');
const navKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];

const init = () => {
  widgetWrapper.innerHTML = baseHTML;
  widgetControlsWrapper = widgetWrapper.querySelector('.widget__controls-wrapper');
  widgetBtns = widgetWrapper.querySelectorAll('.widget__btn');
  widgetPanels = widgetWrapper.querySelectorAll('.widget__panel');
}
```

Just because mobile first is the best way of building sites, we'll create our accordions first as they are what will display on smaller viewports.

* We're just looping through the buttons, getting a reference to the button and its index on each loop iteration
* We want to set the first accordion to be open so we if the index is 0, set `aria-expanded="true"`, else set `aria-expanded="false"`
* We're setting a data attribute on the parent `<h3>` called `data-expanded`, this is just a handy hook for the CSS so we can use the sibling selector
* Finally, we are adding a `role=region` to the panel, so now our `aria-labelledby` becomes valid and creates a landmark, when opened

```javascript
const createAccordions = () => {
  widgetBtns.forEach((btn, idx) => {
    idx === 0 ? btn.setAttribute('aria-expanded', 'true') : btn.setAttribute('aria-expanded', 'false');
    idx === 0 ? btn.parentElement.setAttribute('data-expanded', 'true') : btn.parentElement.setAttribute('data-expanded', 'false');
  })

  widgetPanels.forEach(panel => {
    panel.setAttribute('role', 'region');
  })
}
```

We could run that now by calling the function` createAccordions()` and we could inspect the DOM to see that we do indeed now have the typically ARIA accordion markup.

* What we will do instead is create the tabs pattern, which requires different roles and properties:
* First we're going to add` role="tablist"` to the `widget__controls-wrapper`, as the actual tabs need to be inside this role, but not the tabpanels though, so we'll need to move them out
* Now we're going to loop through the buttons again, we can't have the buttons' parent headings exposed as headings so we'll just neuter their semantics with `role="presentation"`
* We add `role="tab"` to each button
* As we're not using list elements, we don't get the enumeration, so we can add that back by using `aria-setsize` by getting the `length` of the `widgetBtns` collection, this tells us how many tabs are in our `tablist` and then we can get the current position of each tab from within that set by simply using the `idx` variable and adding `+1`, as the collection is zero-based
* On all but the first tab we set `aria-selected="false"` and on the first we of course set `aria-selected="true"`, as this is what we want to show on page load

Finally, we'll add the required roles and properties to the panels:

We loop through our `widgetPanels` collection, getting our element with the `panel` variable and the index with the `idx` variable

* We set `role="tabpanel"` on each panel
* For the first panel we set `tabindex="0"`, so it is focusable, we're doing this as a user will be cycling through tabs with arrow keys, so pressing <kbd>Tab</kbd> should take them to the actual `tabpanel`, if you can guarantee the first element within the `tabpanel` is focusable, this would be unnecessary, but we'll assume we cannot know that in advance, as we have content creators using a CMS and the panels could contain anything
* If the `tabpanel` isn't the first panel, we set the `hidden` attribute, we'll belt and brace this with CSS, later
* Then outside of that loop we create an `Array` from or `widgetPanels` collection, `reverse()` it and then move the tabpanels `after()` the `widgetControlsWrapper` element. I didn't do this in the previous loop as the order was reversed, which wouldn't make a difference for tabpanels as only one is exposed to the accessibility tree at a time, but I just didn't like them being in the wrong order

So now we have two functions that generate the correct HTML and ARIA, one that creates accordions and one that creates tabs.

```javascript
const createTabs = () => {
  widgetControlsWrapper.setAttribute('role', 'tablist');

  widgetBtns.forEach((btn, idx) => {
    btn.parentElement.setAttribute('role', 'presentation');
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-setsize', widgetBtns.length);
    btn.setAttribute('aria-posinset', idx + 1);
    idx === 0 ? btn.setAttribute('aria-selected', 'true') : btn.setAttribute('aria-selected', 'false');
  })

  widgetPanels.forEach((panel, idx) => {
    panel.setAttribute('role', 'tabpanel');
    if (idx === 0) panel.setAttribute('tabindex', '0');
    if (idx !== 0) panel.setAttribute('hidden', '');
  })

  Array.from(widgetPanels).reverse().forEach(el => widgetControlsWrapper.after(el));
}
```

Now we need to determine which widget to display, initially we need to do this on page load so we are providing the user with the widget that best fits their viewport and as viewport size can change (a user may resize their window or zoom), we'll also need to listen for changes to our media query.

* We create a function called `determineWidgetToDisplay`, which accepts an event `evt` parameter and the first thing we do in this function is call the `init()` function, to get our BaseHTML and variables
* We check if that event matches our media query, which in this example is `max-width: 767px`, if it does match we create accordions and if it doesn't we create tabs.
* We add a data attribute to the wrapper data-widget, which has the values of either tabs or accordions, depending on which is displayed, this is useful for both the CSS and the interaction model we will later create

There are two conditions where we want to determine which widget to display, on page load and when the media query changes, which can of course be fired by resizing the window or zooming the page in etc.

* We set an `addEventListener` on our `mq` (media query) variable, which listens for a `change` in the media query and passes that event to the `determineWidgetToDisplay` function
* we also add an `addEventListener` to the `window`, which listens for when the page has loaded using the `DOMContentLoaded` event, this time we pass the `mq` variable to the `determineWidgetToDisplay` function

If you have been following along in a code editor, should you load the page or resize it, you will notice that we always display the correct element, granted, it looks pretty bad, but the if you open up the DevTools, everything looks sweet in there and everything is updated correctly. Next, we need to make these widgets functional to mouse and keyboard events.

```javascript
const determineWidgetToDisplay = (evt) => {
  init();
  if (evt.matches) {
    widgetWrapper.setAttribute('data-widget', 'accordions');
    createAccordions()
  } else {
    widgetWrapper.setAttribute('data-widget', 'tabs');
    createTabs()
  }
}

mq.addEventListener('change', (evt) => {
  determineWidgetToDisplay(evt);
})

window.addEventListener('DOMContentLoaded', () => {
  determineWidgetToDisplay(mq);
})
```

Now we will create a function handleClickOnBtns which will of course listen for clicks on out <button> elements, then we use addEventListener on the widgetWrapper container, as we never overwrite that wrapper

```javascript
function handleClickOnBtns(evt) {
  if (evt.target.closest('[data-widget="accordions"]')) {
    if (evt.target.getAttribute('aria-expanded') === 'false') {
      evt.target.setAttribute('aria-expanded', 'true');
      evt.target.parentElement.setAttribute('data-expanded', 'true');
    } else {
      evt.target.setAttribute('aria-expanded', 'false');
      evt.target.parentElement.setAttribute('data-expanded', 'false');
    }
  }
}

widgetWrapper.addEventListener('click', handleClickOnBtns);
```