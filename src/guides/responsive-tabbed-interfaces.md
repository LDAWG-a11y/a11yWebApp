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

I'm going to explain this step-by-step, which if you're already comfortable with JS will likely be far too much information, but maybe some folks are just starting out with it, so you can skip past those bits.

### A MVP for when there is no JS

Let's start with the good stuff, the HTML, we want this to be our minimum viable product (MVP), this should be accessible if or when JS doesn't load or the user chooses not to allow it. Given that tabs usually show the the first panel on page load, we could do something similar, we could use the `<details><summary>` element and force the first one to be `open` on page load. But there are still some browser inconsistencies, as [Scott O'Hara points out here](https://www.scottohara.me/blog/2022/09/12/details-summary.html) and [Adrian Roselli points out here.](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html)

Is it appropriate for us to use this element? Hmm, well it has some quirks across browsers, but no show-stopping issues, so we'll do so tentatively. Ultimately let your users' needs guide your decisions, not some random guy on the internet.

```html
<div class="widget__wrapper">
  <details open>
    <summary>Tab 1</summary>
    <div>
      <p>Tab 1 contents: Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quasi ab, error fugiat at,
        maiores enim impedit cumque quidem similique et laborum aliquam modi assumenda officiis est! Sapiente, non
        neque! <a href="">Test 1</a>
      </p>
    </div>
  </details>
  <details>
    <summary>Tab 2</summary>
    <div>
      <p>Tab 2 contents: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam molestias nostrum
        repudiandae, quaerat alias iste placeat at a, sequi deserunt iure praesentium velit repellendus ipsum culpa
        ratione soluta eius magni quasi fugiat repellat necessitatibus fugit. <a href="">Test 2</a>
      </p>
    </div>
  </details>
  <details>
    <summary>Tab 3</summary>
    <div>
      <p>Tab 3 contents: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est illo hic vitae tenetur omnis
        laborum itaque vero adipisci doloremque optio ullam, vel similique aliquam quo! <a href="">Test 3</a>
      </p>
    </div>
  </details>
</div>
```

So, we have 3 `<details>` & `<summary>` elements and the first has the `open` attribute, to have some similarity with the tabbed interface. Notice I have a wrapping `<div>` inside each `<details>` which is a sibling of the `<summary>` element? As you may have multiple paragraphs or even other stuff inside your `<details>` it makes sense to wrap it all in something, to just grab the contents with JS, assuming we mark it up correctly the `<summary>` is the first child, we know exactly where to find that `<div>` and it will hold the entirety of the collapsible content.

Also, I have wrapped them all in a `<div class="widget__wrapper">` because we'll need that for DOM manipulation and also I called it that because it's neither tabs or accordions all of the time, so due to my lack of creativity, we'll just call this element a widget.

### Cool, JS is available, let's do the magic

What I am going to do is just show each step's code on its own as opposed to the code block getting longer and longer at each step, thus making the page overly long. I will of course provide completed files at the end.

#### Setting up our main variables

* First we want to reference our `<div class="widget__wrapper">` element and assign it to the `widgetWrapper` variable
* We declare two variables in the global scope, that we need later `baseHTML` (which we're setting to an empty string) and also `open`
* We're eventually going to switch the widget type based upon the current media query, so we use the `matchMedia` method and store that in our `mq` variable, I've set the breakpoint's `(max-width: 767px)`, for this example
* Then we create an array `navKeys`, which holds all of the codes for the key presses we need in the tabbed interface pattern
* We loop through all of our `<details>` elements that are present in the `widgetWrapper`, getting the index with the `idx` variable and each element with the `el` variable. As we iterate through we build a HTML string using a template literal (backticks), and use the addition assignment operator `+=`, so we concatenate that string on each iteration, this is saved to our `baseHTML` variable

  * Within that loop we add the classes and IDs, the latter of which we generate from the `idx` variable, so each ID is unique. Both the buttons and the panels need IDs to create programmatic relationships and accessible names for the panels, respectively
  * We also add a data attribute to each button and each panel, this holds a number we get from our `idx` variable and here we are starting that number from `0`, those data attributes for buttons and panels are `data-btn-idx` and `data-panel-idx`, respectively
  * We set the contents of each button within this string to be the text that was in the `<summary>` element, we of course know that this is the first child of a `<details>`element and we just want its text, so we do this with `${el.firstElementChild.textContent}`
  * As we wrapped the actual contents of each `<details>` element in a `<div>` earlier, we know that this `<div>` is the last child of each `<details>` element and will contain HTML such as paragraphs, lists or anything else, so we add that HTML within each panel per loop iteration with `${el.lastElementChild.innerHTML}`
  * Both accordions and tabs have `aria-controls` on the trigger which creates the programmatic relationship between the trigger and its corresponding panel, via an ID reference. Tabpanels have an accessible name and accordions can too, so we will use `aria-labelledby` and refer to its corresponding button element, so each panels' accessible name becomes that of its controlling button, as it references that ID. I have added these common attributes here, as they will never change
* Outside of the loop we modify our `baseHTML` variable with another wrapper `<div class="widget__controls-wrapper">`, unfortunately tabs and accordions have a different structure and we need this additional wrapper, for the tabs. We add the contents from our loop `${baseHTML}`, within that new wrapper
* Now that we have our `baseHTML` string that contains all of the HTML and contents we need for our initial HTML we can remove all of the HTML from the `widgetWrapper` by setting `innerHTML= ''`, which is an empty string.
* Now we want to insert that `baseHTML` string at the beginning of the `widgetWrapper` element, with `insertAdjacentHTML('afterbegin', baseHTML)`
* Now the actual elements we need to manipulate are actual HTML in the DOM, we can assign them to variables, which we will use throughout this project 

  * We will assign the `<div class="widget__controls-wrapper">`  element, with `widgetControlsWrapper`
  * Our collection of buttons is assigned to `widgetBtns`
  * Our collection of panels is assigned to `widgetPanels`

```javascript
const widgetWrapper = document.querySelector('.widget__wrapper');
let baseHTML = '', open;
const mq = window.matchMedia('(max-width: 767px)');
const navKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];

widgetWrapper.querySelectorAll('details').forEach((el, idx) => {
  baseHTML += `<h3 class="widget__heading">
    <button class="widget__btn" id="btn-${idx + 1}" data-btn-idx="${idx}" aria-controls="panel-${idx + 1}">${el.firstElementChild.textContent}</button></h3>
    <div class="widget__panel" id="panel-${idx + 1}" data-panel-idx="${idx}" aria-labelledby="btn-${idx + 1}">${el.lastElementChild.innerHTML}</div>`;
})
baseHTML = `<div class="widget__controls-wrapper">${baseHTML}</div>`;

widgetWrapper.innerHTML = '';
widgetWrapper.insertAdjacentHTML('afterbegin', baseHTML);
const widgetControlsWrapper = widgetWrapper.querySelector('.widget__controls-wrapper');
const widgetBtns = widgetWrapper.querySelectorAll('.widget__btn');
const widgetPanels = widgetWrapper.querySelectorAll('.widget__panel');
```

#### Adding a function to create accordions

We'll create our accordions first as they are what will display on smaller viewports and mobile first tends to be the best way of building sites, so we create a `createAccordions()` function.

* We're just looping through the `widgetBtns`, getting a reference to the button and its index on each loop iteration, with `btn` and `idx`, respectively
* On page load we want the first accordion or the first `tabpanel` to be open, but users zoom in or out after the page has loaded, so we need to plan ahead a little here, we don't want a situation where our user has focused on something inside a panel, only for the contents of that panel to become hidden from the accessibility tree once the media query changes, otherwise their focus will end up on the body element and we can do better than that 

  * So, what we will do is write a condition which checks to see if the index is equal to the `open` variable we declared earlier, if it is: set `aria-expanded="true"`, else set: `aria-expanded="false"`
  * We're setting a data attribute on each parent `<h3>` element called `data-expanded`, this is just a handy hook for the CSS so we can use the sibling selector and its value must always be in sync with the value of `aria-expanded`, which is of course present on its child `<button>` element
* Unfortunately, tabs and accordions are quite different, so we have a heap of roles and properties to remove, also we need to move reposition the actual panels in the DOM each time the media query changes. That's because an accordion panel opens below each trigger element, whereas tabs are contained in a `tablist` and the panels need to be outside of this

  * We remove each of the unnecessary attributes that should not be present on an accordion
  * We remove the attributes that should not be present on an accordion's panel
  * We move the panels directly below their `<h3>` in the HTML source order, by matching the value of the panels' `aria-labelledby` attribute with the buttons' IDs, we then use the `after()` method to hoist these up into their correct position
  * We are also adding a `role=region` to each panel, so now our accordions' panels have a role with an accessible name (which we added in the `baseHTML` string with `aria-labelledby`)
  * We remove both the `tabindex` and `hidden` attributes, as we don't want these for accordions

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

We'll add a `createTabs()` function which will add all of the necessary roles and properties to our tabbed interface, as well as removing any artefacts of the accordions pattern.

* First we're going to add `role="tablist"` to the `widgetControlsWrapper`, as the actual tabs need to be inside an element with this role
* Now we're going to loop through the buttons again, we can't have the buttons' parent headings exposed as headings so we'll just neuter their semantics with `role="presentation"`
* We add `role="tab"` to each `<button>`
* As we're not using list elements, we don't get the enumeration they can provide to screen readers, so we can add that back by using `aria-setsize` by getting the `length` of the `widgetBtns` collection, this tells us how many tabs are in our `tablist` and then we can get the current position of each tab from within that set by simply using the `idx` variable and adding `+1`, as the collection is zero-based and humans start counting from 1
* If the `idx` is equal to our `open` variable we set: `aria-selected="true"` else we set the remaining tabs to `aria-selected="false"`
* If `idx` is not equal to `open`, set `tabindex="-1"`, this removes the button from the tab sequence
* Then we remove all of the unnecessary `aria-expanded` attributes from the `<button>` elements and the `data-expanded` attributes from their parents

Finally, we'll add the required roles and properties to the panels:

* We loop through our `widgetPanels` collection, getting each element with the `panel` variable and the index with the `idx` variable
* We set `role="tabpanel"` on each panel
* If the `idx` is equal to our `open` variable we set: `tabindex="0"`, so it is focusable, we're doing this as a user will be cycling through tabs with arrow keys, so pressing <kbd>Tab</kbd> whilst focusing on a `tab` should take them to the corresponding `tabpanel`, if you can guarantee the first element within the `tabpanel` is focusable, this would be unnecessary, but we'll assume we cannot know that in advance, as we have content creators using a CMS and the panels could contain anything
* If the `idx` is not equal to our `open` variable we set: the `hidden` attribute on all remaining panels, so only the active panel will display
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
    idx === open ? btn.setAttribute('aria-selected', 'true') : btn.setAttribute('aria-selected', 'false');
    if (idx !== open) btn.setAttribute('tabindex', '-1');
    btn.removeAttribute('aria-expanded');
    btn.parentElement.removeAttribute('data-expanded');
  })

  widgetPanels.forEach((panel, idx) => {
    panel.setAttribute('role', 'tabpanel');
    if (idx === open) panel.setAttribute('tabindex', '0');
    if (idx !== open) panel.setAttribute('hidden', '');
  })

  Array.from(widgetPanels).reverse().forEach(el => widgetControlsWrapper.after(el));
}
```

#### Adding a function to determine which widget to display

Now we need to determine which widget to display, initially we need to do this on page load so we are providing the user with the widget that best fits their viewport

* We create a function called `determineWidgetToDisplay()`, which accepts an `evt` (event) parameter
* We check if that `evt` `matches` our media query, which in this example is `max-width: 767px`, if it does match we create accordions and if it doesn't we create tabs.
* We add a data attribute to the wrapper `data-widget`, which has the values of either tabs or accordions, depending on which is displayed, this is useful for both the CSS and the interaction model we will later create

There are actually two conditions where we want to determine which widget to display, on page load and when the media query changes, which can of course be fired by resizing the window or zooming the page etc.

* We set an `addEventListener()` on our `mq` (media query) variable, which listens for a `change` in the media query and passes that event along with the `determineWidgetToDisplay()` function call
* We also add an `addEventListener()` to the `window`, which listens for when the page has loaded using the `DOMContentLoaded` event, this time we pass the `mq` variable to the `determineWidgetToDisplay` function

  * In here we only need to do two things, firstly we will actually give our `open` variable a value and that value is `0`, this is because we are going to show the first `tabpanel` or expand the first accordion on page load, then we simply call the determineWidgetToDisplay() function, which handles the logic to provide the user with the widget that best fits their viewport

If you have been following along in a code editor, should you load the page or resize it, you will notice that we always display the correct element, granted, it looks pretty awful right now, but the if you open up the DevTools, everything looks sweet in there and everything is updated correctly. Next, we need to make these widgets functional to mouse and keyboard events.

```javascript
const determineWidgetToDisplay = (evt) => {
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
  open = 0;
  determineWidgetToDisplay(mq);
})
```

#### Adding click functionality to the widgets

Accordions are naturally easier to manage as we just need a `click` event, which will handle both mouse clicks and keyboard clicks, well it will for us, as we're using a `<button>`. We need to tackle the tabs in a slightly different way, we're going for tabs with automatic activation, which means as a user cycles through the tabs with arrow keys, each time they focus on a new `tab` it becomes the selected tab and its corresponding `tabpanel` is displayed. We also need to add a `click` event, as we need this to work for mouse and touchscreen input too.

Now we will create a function `handleClickOnBtns()` which will of course listen for clicks on our `<button>` elements, then we use `addEventListener` on the `widgetWrapper` container, as we never overwrite that wrapper, we're doing the accordions first:

* We check if the `<button>` has `aria-expanded="false"`, if it does toggle that value to `"true",` else set it to `"false"` we are using an `else if` here, as this way we're also checking for the presence of `aria-expanded`, as this is unique to the accordions in our example. If we just used an `else` which doesn't allow a condition, the event would add `aria-expanded` to tabs and we don't want that
* We also toggle the `data-attribute` on the parent `<h3>` so its value is always in sync with the button's `aria-expanded` value

That's it for accordions, they just need a little CSS now to hide the panel, but let's add the functionality for tabs, at this stage it will only be for mouse & touchscreen users, as we'll handle keyboard interaction in a separate function

We create a new if statement in our `handleClicksOnButtons()` function which requires the `target` have the attribute `role="tab",` as they are of course exclusive to our tabs widget.

* We call a as yet undeclared function called `setActiveTab()` where we will pass in the clicked `<button>`, we want to reuse that function for arrow keys too, so we just call it here, in this function we will also set the non-active tabs too.

We also need a way to call the `handleClickOnBtns()` function on a `click` event, so we use an `addEventListener()` and listen for a `'click'` event within the `widgetWrapper` and when there is one, it will call this function. In our function we require that the `target` that was clicked was a button and if it was, we determine whether the button was an accordions button or a tabs button and make the necessary DOM changes.

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

So we need a function to handle setting the active tab and displaying its corresponding panel, whilst setting all other tabs to non-active and their corresponding panels to `hidden`, we will do this in our `setActiveTab()` function, which will accept the current `tab` a user has clicked or selected

* We passed in the `target` element (the clicked `<button>`) in the previous step's call to this function
* We loop through all of the tabs and check to see which one matches the `<button>` passed to this function

  * We `aria-selected="true"` on that `<button>`
  * We remove the `tabindex` attribute, as we don't need `tabindex="0"` on an actual `<button>`, as it's already focusable
  * We get the exact panel that `<button>` owns by searching in the `widgetWrapper` and finding an element that has `aria-labelledby` where the value matches the ID of the selected `<button>` and we add `tabindex="0"` to that panel, so should a user press <kbd>Tab</kbd>, their focus advances to the `tabpanel` and they can then access the content within, in the correct sequence
  * We also remove the `hidden` attribute from the panel, because this needs to be the `tabpanel` that is displayed, we use the same `querySelector` as above
* In our loop we obviously have the active tab and the rest are the non-active tabs, so we target them with the else block, we're pretty much reversing what we did for the active tab

  * For every `<button>` that reaches this condition we set `aria-selected="false"`
  * We add `tabindex="-1"` to each of these `<button>` elements, as tabs are focusable with arrows as opposed to the <kbd>Tab</kbd> key, so we want to remove the non-active tabs out of the tab order
  * We remove the `tabindex` attribute from each non-active `tabpanel`
  * Finally, we add the `hidden` attribute to each of non-active tabpanel

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

The tabs themselves should only have one tab stop for keyboard users using the <kbd>Tab</kbd> key, upon focusing on the current `tab`, a user should be able to focus on previous or next tabs with the horizontal arrow keys, should they press <kbd>Tab</kbd> again, their focus will move to the open `tabpanel`. If a user's focus is within the `tablist` element and they press <kbd>Home</kbd> their focus will move to the first `tab` and if they press <kbd>End</kbd> it will advance to the last `tab`. Finally, whenever a `tab` receives focus, it becomes the currently active `tab`, so its corresponding `tabpanel` is displayed.

* We create a function `handleTabNavigation()` that accepts an event `evt` parameter
* If the key passed from the `evt` exists in the `navKeys` array we created earlier and that key was pressed whilst focus was on an element with `role="tab`" attribute present, we'll execute the code within, otherwise, we just do nothing as it's either not tabs or a user pressed a key that doesn't fit our interaction model
* We add `preventDefault()` to the event, as we want to intercept these key presses and match them to the behaviour we are providing as opposed to the user agent's
* We declare a `currentTab` variable, which will hold the element which becomes the current tab after an interaction
* We'll grab a reference to the parent element of the focused `<button>`, which in this case is the `<h3>` that has had its semantics neutered
* If the `evt.key` is `'ArrowRight'` and the parent `<h3>` has a sibling to the right, we store that sibling's child element (the `<button>`) in the `currentTab` variable, if there is no sibling to the right, we set the first `<button>` as the `currentTab`, getting the first item in the `widgetBtns` collection with `[0]`, so a user can cycle between tabs (I will note that Heydon doesn't do this in his example, but many others do, such as the [APG tabbed interfaces pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/), I'm not sure what is the best approach, this is something your users could tell you
* We do the same for the the `'LeftArrow'` presses, but in reverse, so if there is a sibling element to the left of the parent element, we set the value of `currentTab` to that element's `<button>`, otherwise set it to the last `<button>`, we can get the last `<button>` simply by deducting 1 from the length of the `widgetBtns` collection, like so `widgetBtns[widgetBtns.length -1]`
* If the keys pressed were either 'Home' or 'End' we use the same logic as above to get either the first or last `<button>`, respectively and set the value of `currentTab` to the correct `<button>`
* We now pass the `currentTab` to our `setActiveTab()` function, which will update all the attributes on the `tabs` and their corresponding `tabpanels`
* We then `focus()` on the `currentTab`, as that was the user's primary goal of pressing the arrow key
* We call this function with `addEventListener()`, we attach that to the `widgetWrapper`

That's pretty much it, our tabs and accordions have good markup, the correct ARIA and the right interaction model, they will display according to the media query set and we're almost good, there's just one more thing.

```javascript
function handleTabNavigation(evt) {
  if (navKeys.includes(evt.key) && evt.target.getAttribute('role') === 'tab') {
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

widgetControlsWrapper.addEventListener('keydown', handleTabNavigation);
```

#### Handling focus when the viewport changes

Some users may struggle to read text that others find comfortable, we all have different needs and preferences, so we need to consider those circumstances where our current implementation has one issue that may be less than obvious Let's assume we have a user that has low-vision, they open up our page and see the tabbed interface and one of the tabs contains the topic they are interested in. This user also uses a keyboard to navigate websites, as that is what works best for them. They decide they want to zoom in, to read the content, currently in our implementation, their focus could be lost, which would be hugely frustrating for many keyboard users.

This happened because we never update our `open` variable, it is just set to o once the page has loaded. That's OK though, as obviously we have that for a reason and now we are going to use it properly. Let's look at the three situations where we don't want the switching of patterns to become jarring, confusing or steal a user's focus:

* If a user's focus was on one of the buttons, irrespective of whether they were in the accordions layout or the tabs layout, the browser doesn't lose focus here, as the buttons are only modified with attributes, but to offer some similarity, we will force that panel to be the open panel, if the layout was accordions, we have to open one panel when it changes to tabs and by focusing on this `tab`, it also becomes the selected `tab`, so it should be this one and if a user was viewing the tabs layout, that `tab` was selected so we'll just expand that accordion
* If a user was focused on a `tabpanel` (as they're focusable), we cannot send focus to the relevant accordion panel as accordion panels are not focusable, so the sensible solution is to send focus back one step, to its controlling `<button>` and we'll expand that accordion as it was open in the tabs layout (if we didn't do this, focus would be lost to the `<body>` as that element is no longer focusable)
* Finally, the only other place focus could have been was inside a panel, in which case that panel was open and a user's focus position needs to be maintained, so we just detect which panel was open and force that to be open in whichever layout the user triggered and return focus to the initial position (currently focus is lost to the `<body>` as we hoist the panels around and I guess for a fraction of a second, they don't exist so focus is lost)

It is of course possible that a user had multiple accordions open, but we can't do anything about that, as our tabs can only have one panel open. We do all of the above simply by detecting where focus was and getting a reference to that element or its closest ancestor that matches a given query, which is why we added the data attributes `data-btn-idx` and `data-panel-idx`, earlier. We then update the value of our `open` variable to force the panel open that meets one of our three conditions. We also store a reference to a user's currently focused element and we only do anything about that if their focus was inside our `widgetWrapper`, as this is where we kinda broke the way a browser manages that.

We'll update our `mq.addEventListener()` method as this is the only time we need to concern ourselves with this change

* First we will check initialise a variable to get the currently focused element using the `document.activeElement` property, we'll call this variable `currentFocus`
* Then we will check that focus was in inside the `widgetWrapper` by checking if the `currentFocus` variable has an ancestor with the class `widget__wrapper`, with the `closest()` method
* The first condition simply checks whether `currentFocus` was on an element that has a class `widget__button`, if it does we'll get the value of its `data-btn-idx` attribute, convert it from a string to a `Number() `and set `open` to that value
* The second condition checks whether `currentFocus` has a class that is `widget__panel`, if it does we set the value of `open` to the value of `data-panel-idx `(the button and panel always have the same value for these attributes), again we convert it to a `Number()` first
* The final condition detects whether focus was inside a panel by checking if there is an ancestor with the class `widget__panel`, if there was, get that `closest()` panel and then get the value from its `data-panel-idx` attribute, convert it to a `Number()` and set it as the value of the `open` variable
* At the bottom of the function, outside of the loop we simply set `focus()` back on to the element that previously had `focus()`, which we of course stored in our `currentFocus` variable. 

That does it for the JS, finally. We covered quite a bit and sorry if I over-explained, I'm sure you skimmed past anything that you already knew, but I was also trying to cater for folks who may be new to JS or A11y. Maybe I'll put the step-by-step stuff in accordions, definitely not tabs though.

```javascript
mq.addEventListener('change', (evt) => {
// New code below
  if (currentFocus.closest('.widget__wrapper')) {
    if (currentFocus.classList.contains('widget__btn')) {
      open = Number(currentFocus.getAttribute('data-btn-idx'));
    } else if (currentFocus.classList.contains('widget__panel')) {
      open = Number(currentFocus.getAttribute('data-panel-idx'));
      currentFocus = widgetWrapper.querySelector(`[data-btn-idx="${String(open)}"]`);
    } else if (currentFocus.closest('.widget__panel')) {
      open = Number(currentFocus.closest('.widget__panel').getAttribute('data-panel-idx'));
    }
  }
  // New code above
  determineWidgetToDisplay(evt);
  // New code below
  currentFocus.focus();
})
```

### Now, let's style um

I'm not going to explain the CSS, as this has guide has already taken forever to write, I will of course provide the completed code at the end and I'll just summarise what we need in the bullets below: I'm also not going to great lengths to make them look good, they'll just look OK.

* We need a media query in CSS that matches our media query in JS, we don't need separate classes, although if you prefer that, you can take that approach
* We need to style the `<details>` & `<summary>` elements so they look nice where JS isn't available, we also need to ensure they have a focus indicator
* We need to make our accordions look like accordions and they will need a focus indicator
* We need to hide the content of collapsed accordions and only show it when they are expanded
* Our tabs need to look interactive and be aligned horizontally, each tab needs to look like something a user can operate and we need a focus indicator, along with a selected indicator
* Our tabpanels need a focus indicator too, as the active panel has `tabindex="0"` set, so we need to show keyboard users where they are

## Completed code

## Codepen

## Screenshots

## Wrapping up

Is it worth the effort to wrangle the DOM to provide a user with either tabs or accordions depending on their viewport size? Well, it took us less than 150 lines of JS to do that and I have no doubt that could be further reduced by a JS ninja. In this example though we have taken a `<details>` & `<summary>` element and progressively enhanced it, providing ARIA accordions for the smaller viewport breakpoint and ARIA tabs for the larger viewport breakpoint, when JS is available. We did so with all of the correct ARIA and interaction patterns and we even considered the edge case of managing focus when a user triggers the `'change'` event for the media query, so we have pretty much covered everything here.

I'm not really a fan of tabs, not because I find them difficult to use, but because they typically only appear suited to larger viewports, they just don't seem to work as well, visually on smaller viewports, but that's just my view. Accordions, however, work on all screen sizes, so my preference would be to just use accordions, which would be much simpler in those cases where some content should be hidden in a collapsed state. We don't always get the choice though, sometimes we have to work with what we have, despite our best efforts at highlighting the issues certain patterns may have. So, maybe when we find ourselves in a situation where tabs are staying put, then this approach could be an alternative to Heydon's or Andy's solutions? I'm not saying my solution is as good as either of theirs, I just wanted to provide a different solution, because the tabs problem actually comes up quite often, usually when we encounter them though, they don't have the correct interaction model and often the ARIA is wrong or not present at all.

Whether this approach is worth the effort will depend on several factors, I haven't considered performance, both my internet and laptop are fast, so everything appeared seamless to me, but I know that not everybody has the privilege of the latest tech and fibre broadband, so this is something you should look into yourselves. I've made this in a silo, it's not on a site with lots of other components, functionality, images and embeds, so maybe the performance would be more noticeable on a live site? I typically try to only use JS when I have to, less is more and all that jazz, I typically only use a small amount of JS when building things I have control over, a tiny amount if you compare it to the hellscape of single page apps, so I would feel safe doing this on a site with minimal JS and as always I have considered the use cases where JS isn't available, so there is a comparable experience there, too.

Where this may come in handy is when the tabbed interface is an option in a CMS, if that output isn't great, if it looks odd at smaller viewports or if it is not compliant, then maybe this could be useful to patch it up as an interim measure. Well, that wraps up this challenge, which actually ended up being an extremely long guide, sorry about that, if you're experienced in JS, then you undoubtedly felt like I was over-explaining with the step-by-step approach, but I was also trying to cater for folks working in accessibility or development where maybe  they don't know a lot of JS or they're just starting out. Maybe in future I'll put the step-by-step stuff in accordions and just have the summary text above them, it would definitely be accordions though and definitely not tabs.