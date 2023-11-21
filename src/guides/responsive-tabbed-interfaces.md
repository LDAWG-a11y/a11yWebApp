---
title: Responsive & accessible tabbed interfaces
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
* An interaction model which uses arrow navigation between tabs, only allowing one `tab` to be focusable with the <kbd>tab</kbd> key and then using arrows to focus on adjacent tabs, if using a button or link, then `tabindex="-1"` would be required for removing the non-active tabs out of the tab sequence
* For each of the tabpanels that are not visible, hide the `tabpanel` and its contents from both the accessibility tree and the focus order, so they can only be accessed when the `tabpanel` is visible

## Before we move on

Just a few alternatives for you to look at, Don't worry, I'm not just going to copy anybody's work or paraphrase what has already been said, this is just going to be an alternative, nothing more. 

* If you are unaware of the excellent [Inclusive Components book by Heydon Pickering](https://inclusive-components.design/), you should definitely give that a read, [the chapter for Tabbed Interfaces](https://inclusive-components.design/tabbed-interfaces/) is obviously related to what we are doing here. Heydon's approach is obviously solid, a progressively enhanced table of contents that becomes tabs when JavaScript is available
* [There is also the Deque tabby-accordion things](https://dequeuniversity.com/library/aria/tabbed-accordion#), which make so much sense visually, the `tabpanel` always displays directly below its corresponding `tab`, but unfortunately, that `tabpanel` is inside the `tablist`, which isn't valid ARIA
* Finally, [Andy Bell has an interesting solution](https://piccalil.li/tutorial/solution-005-tabs/), one I had not seen before until recently, where the `tablist` itself is scrollable, horizontally, so they still appear as tabs on smaller viewports. Just one little niggle on this one, I could not get the last tab to be fully in view using a keyboard alone, but other than that, these are are really neat solution

### OK, so what is our approach?

Well, we're just going to go with tabs on larger viewports and accordions on smaller viewports, but we will of course do this properly, in that there will be no incorrect roles present on either widget, all properties will be correct and each widget will have the correct interaction model. We'll also start from a nice progressively enhanced version and only do the magic where JS is available. 

If this isn't the solution for you, I recommend exploring those linked above.

## So, without further ado, let's get stuck in

### A MVP for when there is no JS

Let's start with the good stuff, the HTML, we want this to be our minimum viable product (MVP), this should be accessible if or when JS doesn't load or the user chooses not to allow it. Given that tabs usually show the the first panel on page load, we could do something similar, we could use the `<details><summary>` element and force the first one to be `open` on page load. But there are still some browser inconsistencies, as [Scott O'Hara points out here](https://www.scottohara.me/blog/2022/09/12/details-summary.html) and [Adrian Roselli points out here.](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html)

Is it appropriate for us to use this element? Hmm, well it has some quirks across browsers, but no show-stopping issues, so we'll do so tentatively. Ultimately let your users' needs guide your decisions, not some random guy on the internet..

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

So, we have 3 `<details>` & `<summary>` elements and the first has the `open` attribute, to have some similarity with the tabbed interface. Notice I have a wrapping <div> inside each `<details>` which is a sibling of the `<summary>` element? As you may have multiple paragraphs or even other stuff inside your `<details>` it makes sense to wrap it all in something, to just grab the contents with JS, assuming we mark it up correctly `<summary>` as the first child, we know exactly where to find that `<div>` and it will hold the entirety of the content.

Also, I have wrapped them all in a `<div class="widget__wrapper">` because we'll need that for DOM manipulation and also I called it that because it's neither tabs or accordions all of the time, so due to my lack of creativity, we'll just call this element a widget.

### Cool, JS is available, let's do the magic

What I am going to do is just show each step's code on its own as opposed to the code block getting longer and longer at each step, thus making the page overly long. I will of course provide completed files at the end.

#### Setting up our main variables

* First we want to reference our wrapper, as we'll need this for manipulating the HTML within, then we'll declare a few variables in the global scope, so we can access them from outside of our code block.
* We're eventually going to switch the widget type based upon the current media query, so we use the `matchMedia` method and store that in our `mq` variable, I've set the breakpoint's max-width at `767px`, of course you should do what works best for your site
* Then we create an array navKeys, which hold all of the codes for the key presses we need
* We loop through all of our `<details>` elements, getting the index with the `idx` variable as we iterate through and we build a HTML string using a template literal with the addition assignment operator, so we concatenate that string on each iteration, this is saved to our baseHTML variable
* Within that loop we add the classes and IDs, which we generate from the `idx` variable, we also make the correct ID References for `aria-labelledby` and `aria-controls`, which point at the button and the panel, respectively
* We set the content of the button we have just created to be the text that was in the `<summary>` element, we of course know that this is the first child of a details and we just want its text, so we do this with `el.firstElementChild.textContent`
* As we wrapped the contents in a `<div>` earlier, we know that this `<div>` is the last child of the <details> element and will likely contain HTML, so we add that HTML to the panel on each loop iteration with `el.lastElementChild.innerHTML`

Both accordions and tabs have `aria-controls` on the trigger, so we've added that here along with a reference to the corresponding panel. Tabpanels have an accessible name and accordions can too, so we will use `aria-labelledby` and refer to the button element (I know we shouldn't use `aria-labelledby` on a `<div>` without a role, but the roles will be present on both widgets later.

* We are ultimately going to use this `baseHTML` variable again later when the page initially loads
* Finally, outside of the loop we reassign our variable with another inner wrapping `<div>` that has the class `widget__controls-wrappe`r and we add the contents from our loop 

```javascript
const widgetWrapper = document.querySelector('.widget__wrapper');
let widgetControlsWrapper, widgetBtns, widgetPanels, baseHTML = '';
const mq = window.matchMedia('(max-width: 767px)');
const navKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];

widgetWrapper.querySelectorAll('details').forEach((el, idx) => {
  baseHTML += `<h3 class="widget__heading">
    <button class="widget__btn" id="btn-${idx + 1}" aria-controls="panel-${idx + 1}">${el.firstElementChild.textContent}</button></h3>
    <div class="widget__panel" id="panel-${idx + 1}" aria-labelledby="btn-${idx + 1}">${el.lastElementChild.innerHTML}</div>`;
})
baseHTML = `<div class="widget__controls-wrapper">${baseHTML}</div>`;

```

#### Creating a function that resets the widgets when called

* We create an initialising function `init()` 
* We store a reference to our `widget__controls-wrapper`, within `init()` as we need this later
* We assign the buttons and panels into collections, with our variables `widgetBtns` and `widgetPanels`, respectively

```javascript
const init = () => {
  widgetControlsWrapper = widgetWrapper.querySelector('.widget__controls-wrapper');
  widgetBtns = widgetWrapper.querySelectorAll('.widget__btn');
  widgetPanels = widgetWrapper.querySelectorAll('.widget__panel');
}
```

#### Adding a function to create accordions

Just because mobile first is the best way of building sites, we'll create our accordions first as they are what will display on smaller viewports, so we create a `createAccordions()` function.

* We're just looping through the `widgetBtns`, getting a reference to the button and its index on each loop iteration
* We want to set the first accordion to be open so if the index is 0, set `aria-expanded="true"`, else set `aria-expanded="false"`
* We're setting a data attribute on the parent `<h3>` called `data-expanded`, this is just a handy hook for the CSS so we can use the sibling selector
* We are also adding a `role=region` to the panel, so now our `aria-labelledby` becomes valid and creates a landmark, when opened
* Unfortunately, tabs and accordions are quite different, so we not only have a heap of roles and properties to remove, but we need to move the actual panels about each time the viewport changes. That's because an accordion panel opens below each trigger element, whereas tabs are contained in a tablist and the panel needs to be outside of this

  * We remove each of the unnecessary attributes that should not be present on an accordion
  * We remove the attributes that should not be present on an accordion's panel
  * We move the panels directly below their `<h3>`, by matching the value of the panels' aria-labelledby attribute with the buttons' IDs, we then use the `after()` method to hoist these up into their correct position

```javascript
const createAccordions = () => {
  widgetControlsWrapper.removeAttribute('role');
  widgetBtns.forEach((btn, idx) => {
    idx === 0 ? btn.setAttribute('aria-expanded', 'true') : btn.setAttribute('aria-expanded', 'false');
    idx === 0 ? btn.parentElement.setAttribute('data-expanded', 'true') : btn.parentElement.setAttribute('data-expanded', 'false');
    btn.parentElement.removeAttribute('role');
    btn.removeAttribute('role');
    btn.removeAttribute('aria-setsize');
    btn.removeAttribute('aria-posinset');
    btn.removeAttribute('aria-selected');
    btn.parentElement.after(widgetWrapper.querySelector(`[aria-labelledby="${btn.id}"]`));
  })

  widgetPanels.forEach(panel => {
    panel.setAttribute('role', 'region');
    panel.removeAttribute('tabindex');
    panel.removeAttribute('hidden');
  })
}
```

#### Adding a function to create tabs

We'll add a createTabs function which will add all of the necessary roles and properties to our tabbed interface.

* First we're going to add `role="tablist"` to the `widget__controls-wrapper`, as the actual tabs need to be inside this role, but not the tabpanels though, so we'll need to move them out
* Now we're going to loop through the buttons again, we can't have the buttons' parent headings exposed as headings so we'll just neuter their semantics with `role="presentation"`
* We add `role="tab"` to each button
* As we're not using list elements, we don't get the enumeration, so we can add that back by using `aria-setsize` by getting the `length` of the `widgetBtns` collection, this tells us how many tabs are in our `tablist` and then we can get the current position of each tab from within that set by simply using the `idx` variable and adding `+1`, as the collection is zero-based
* On all but the first tab we set `aria-selected="false"` and on the first we of course set `aria-selected="true"`, as this is what we want to show on page load
* Then we remove all of the unnecessary `aria-expanded` from the `<button>` and the `data-expanded` attribute from its parent

Finally, we'll add the required roles and properties to the panels:

* We loop through our `widgetPanels` collection, getting each element with the `panel` variable and the index with the `idx` variable
* We set `role="tabpanel"` on each panel
* For the first panel we set `tabindex="0"`, so it is focusable, we're doing this as a user will be cycling through tabs with arrow keys, so pressing <kbd>Tab</kbd> should take them to the actual `tabpanel`, if you can guarantee the first element within the `tabpanel` is focusable, this would be unnecessary, but we'll assume we cannot know that in advance, as we have content creators using a CMS and the panels could contain anything
* If the `tabpanel` isn't the first panel, we set the `hidden` attribute as that's the only one that should be displayed, initially. We'll belt and brace this with CSS, later
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
    btn.removeAttribute('aria-expanded');
    btn.parentElement.removeAttribute('data-expanded');
  })

  widgetPanels.forEach((panel, idx) => {
    panel.setAttribute('role', 'tabpanel');
    if (idx === 0) panel.setAttribute('tabindex', '0');
    if (idx !== 0) panel.setAttribute('hidden', '');
  })

  Array.from(widgetPanels).reverse().forEach(el => widgetControlsWrapper.after(el));
}
```

#### Adding a function to determine which widget to display

Now we need to determine which widget to display, initially we need to do this on page load so we are providing the user with the widget that best fits their viewport and as viewport size can change (a user may resize their window or zoom), we'll also need to listen for changes to our media query.

* We create a function called `determineWidgetToDisplay`, which accepts an event `evt` parameter and the first thing we do in this function is call the `init()` function, to get our BaseHTML and variables
* We check if that event matches our media query, which in this example is `max-width: 767px`, if it does match we create accordions and if it doesn't we create tabs.
* We add a data attribute to the wrapper `data-widget`, which has the values of either tabs or accordions, depending on which is displayed, this is useful for both the CSS and the interaction model we will later create

There are two conditions where we want to determine which widget to display, on page load and when the media query changes, which can of course be fired by resizing the window or zooming the page in etc.

* We set an `addEventListener` on our `mq` (media query) variable, which listens for a `change` in the media query and passes that event to the `determineWidgetToDisplay` function
* we also add an `addEventListener` to the `window`, which listens for when the page has loaded using the `DOMContentLoaded` event, this time we pass the `mq` variable to the `determineWidgetToDisplay` function

  * In here we set the the existing HTML of the `widgetWrapper` to an empty string and replace it with our `baseHTML` variable, with the `insertAdjacentHTML` method, using the `'afterbegin'` position, this is because on page load, we need to remove all of the <details> & <summary> elements and replace with the `baseHTML`, which is the commonly shared HTML between the 2 widget types, with the exception of the position of the `widgetControlsWrapper`

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
  widgetWrapper.innerHTML = '';
  widgetWrapper.insertAdjacentHTML('afterbegin', baseHTML);
  determineWidgetToDisplay(mq);
})
```

#### Adding click functionality to the widgets

Accordions are naturally easier to manage as we just need a `click` event, which will handle both mouse clicks and keyboard clicks, well it will for us, as we're using a `<button>`. We need to tackle the tabs in a slightly different way, we're going for tabs with automatic activation, which means as a user cycles through the tabs with arrow keys, each time they focus on a new `tab`, its related `tabpanel` is displayed, but we also need to add a `click` event, as we need this to work for mouse and touchscreen input too.

Now we will create a function `handleClickOnBtns` which will of course listen for clicks on out `<button>` elements, then we use `addEventListener` on the `widgetWrapper` container, as we never overwrite that wrapper, we're doing the accordions first:

* We check if the `button` has `aria-expanded="false"`, if it does toggle that value to `"true",` else set it to `"false"` we are using an `else if` here, as we're also checking for the presence of `aria-expanded`, as this is unique to the accordions in our example, if we just used an `else` which doesn't allow a condition, the event would add `aria-expanded` to tabs and we don't want that
* We also toggle the `data-attribute` on the parent `<h3>` so its value is always in sync with the button's `aria-expanded` value

That's it for accordions, they just need a little CSS now to hide the panel, so let's add the functionality for tabs, at this stage it will only be for mouse & touchscreen users, as we'll handle the other keys in a separate function

We create a new if statement in our `handleClicksOnButtons()` function which requires the target have the attribute `role="tab",` as they are of course exclusive to our tabs widget.

* We call a function called `setActiveTab()` where we pass in the clicked `tab`, we want to reuse that function for arrow keys, so we just call it here, in this function we will also set the non-active tabs too.

We also need a way to call the `handleClickOnBtns()` function on a `click` event, so we use `addEventListener` and listen for a `'click'` event within the `widgetWrapper` and when there is one, it will call the function. in our function we require that the `target` that was clicked was a button and if it was, we determine whether the button was an accordions button or a tabs button and make the necessary DOM changes.

```javascript
function handleClickOnBtns(evt) {
  if (evt.target.getAttribute('aria-expanded') === 'false') {
    evt.target.setAttribute('aria-expanded', 'true');
    evt.target.parentElement.setAttribute('data-expanded', 'true');
  } else if (evt.target.getAttribute('aria-expanded') === 'true') {
    evt.target.setAttribute('aria-expanded', 'false');
    evt.target.parentElement.setAttribute('data-expanded', 'false');
  }
  
  if (evt.target.getAttribute('role') === 'tab') {
    setActiveTab(evt.target);
  }
}

widgetWrapper.addEventListener('click', handleClickOnBtns);
```

#### Setting active and non-active tabs

So we need a function to handle setting the active tab and displaying its corresponding panel is, whilst setting all other tabs to non-active and the other panels to hidden, we will do this in our `setActiveTab()` function, which will accept the current `tab` a user has clicked or selected

* We passed in the `target` element (the clicked `tab`) in the previous step's call to this function
* We loop through all of the tabs and check to see which one matches the tab passed to this function

  * We set to set `aria-selected="true"` to that `tab`
  * We remove the `tabindex` attribute, as we don't need `tabindex="0"` on an actual `<button>`, as it's already focusable
  * We get the exact panel that tab owns to this tab by looking in the `widgetWrapper` and finding an element that has `aria-labelledby` where the value matched the ID of the current `tab` and we add `tabindex="0"` to that, so should a user press <kbd>Tab</kbd>, their focus advances to the `tabpanel` and they can then access the content within, in the correct sequence
  * We also remove the `hidden` attribute from the panel, because this needs to be the `tabpanel` that is displayed, we use the same `querySelector` as above
* In our loop we obviously have the active tab and the rest are the non-active tabs, so we target them with the else block, we're pretty much reversing what we did for the active tab

  * We set every `tab` that reaches this condition to have `aria-selected="false"` set
  * We add `tabindex="-1"` to each of these tabs, as tabs are focusable with arrows as opposed to the <kbd>Tab</kbd> key, so we want to remove the non-active tabs out of the tab order
  * We remove the `tabindex` attribute from each non-active `tabpanel`
  * Finally, we add the `hidden` attribute to each of those tabpanels

```javascript
setActiveTab = (activeTab) => {
  widgetBtns.forEach(tab => {
    if (tab === activeTab) {
      tab.setAttribute('aria-selected', 'true');
      tab.removeAttribute('tabindex');
      widgetWrapper.querySelector(`[aria-labelledby="${tab.id}"]`).setAttribute('tabindex', '0');
      widgetWrapper.querySelector(`[aria-labelledby="${tab.id}"]`).removeAttribute('hidden');
    } else {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
      document.getElementById(tab.getAttribute('aria-controls')).removeAttribute('tabindex');
      document.getElementById(tab.getAttribute('aria-controls')).setAttribute('hidden', '');
    }
 }     
```

#### Adding the interaction model to tabs

The tabs themselves should only have one tab stop for keyboard users using the <kbd>Tab</kbd> key, upon focusing on the current `tab`, a user should be able to focus on previous or next tabs with the horizontal arrows, should they press <kbd>Tab</kbd> again, their focus will move to the open `tabpanel`. If a user's focus is within the `tablist` element and they press <kbd>Home</kbd> their focus will move to the first `tab` and if they press <kbd>End</kbd> it will advance to the last `tab`. Finally, whenever a `tab` receives focus, it becomes the currently active `tab`, so its corresponding `tabpanel` is displayed.

* We create a function `handleTabNavigation()` that accepts an event parameter
* If the key tied to that event exists in the `navKeys` array we created earlier and the `widgetWrapper` has the `data-widget="tabs"` attribute set, we'll execute the code within, otherwise, we just do nothing as it's either not tabs or a user pressed a key that doesn't fit our interaction model
* We add `preventDefault()` to the event, as we want to intercept these key presses and match them to the behaviour we are providing as opposed to the user agent's
* We declare a `currentTab` variable, which will hold the element which becomes the current tab after an interaction
* We'll grab a reference to the current tab's parent, which in this case is the `<h3>` that has had its semantics neutered
* If the `evt.key` is `'ArrowRight'` and the parent `<h3>` has a sibling to the right, we store that sibling's child element (the `tab`) to the `currentTab` variable, if there is no sibling to the right, we set the first `tab` as the `currentTab`, getting the first item in the `widgetBtns` collection with `[0]`, so a user can cycle between tabs (I will note that Heydon doesn't do this in his example, but many others do, such as the [APG tabbed interfaces pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/), I'm not sure what is the best approach, this is something your users could tell you
* We do the same for the the `'LeftArrow'` presses, but in reverse, so if there is a sibling element to the left of the tab's parent, set the value of `currentTab` to that element's `tab`, otherwise set it to the last `tab`, we can get the last `tab` simply by deducting 1 from the length of the `widgetBtns` collection, like so `widgetBtns[widgetBtns.length -1]`
* If the keys pressed were either 'Home' or 'End' we use the same logic as above to get either the first or last `tab`, respectively and set the value of `currentTab` to the correct `tab`
* We now pass the `currentTab` to our `setActiveTab()` function, which will update all the attributes on the `tabs` and their corresponding `tabpanels`
* We then `focus()` on the `currentTab`, as that was the user's primary goal of pressing the arrow key
* We call this function with `addEventListener`, we attach it to the inner wrapper `widgetControlsWrapper`, as we don't want that behaviour to be present in the `tabpanel`, as we want the user agent to handle it from here, we add this inside the `init()` function, as the `widgetControlsWrapper` gets replaced, so that reference is lost if we set it outside

That's pretty much it, our tabs and accordions have good markup, the correct ARIA and the right interaction model, they will display according to the media query set and we're almost good, there's just one more thing.

```javascript
function handleTabNavigation(evt) {
  if (navKeys.includes(evt.key) && widgetWrapper.getAttribute('data-widget') === 'tabs') {
    evt.preventDefault();
    let parent = evt.target.closest('.widget__heading');
    let currentTab;

    if (evt.key === 'ArrowRight' && parent.nextElementSibling) {
      currentTab = parent.nextElementSibling.firstElementChild
    } else if (evt.key === 'ArrowRight' && !parent.nextElementSibling) {
      currentTab = widgetBtns[0];
    } else if (evt.key === 'ArrowLeft' && parent.previousElementSibling) {
      currentTab = parent.previousElementSibling.firstElementChild
    } else if (evt.key === 'ArrowLeft' && !parent.previousElementSibling) {
      currentTab = widgetBtns[widgetBtns.length - 1];
    }

    if (evt.key === 'Home') currentTab = widgetControlsWrapper.querySelectorAll('[role="tab"]')[0];
    if (evt.key === 'End') currentTab = widgetControlsWrapper.querySelectorAll('[role="tab"]')[widgetBtns.length - 1];

    setActiveTab(currentTab);
    currentTab.focus();
  }
}

// Add the below last inside the init() function
widgetControlsWrapper.addEventListener('keydown', handleTabNavigation);
```

#### Handling focus when the viewport changes

In our current implementation it will be mostly fine for users, however, there is a situation where we can do better. Should a keyboard user be focused on a tab, accordion button or anything within the panels and they change their zoom level to make reading the contents more comfortable, as it stands focus could be lost to the body element, as the element they were focused on could become hidden