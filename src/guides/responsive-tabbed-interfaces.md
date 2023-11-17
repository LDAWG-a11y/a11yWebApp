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

First we want to reference our wrapper, as we'll need this for manipulating HTML within, then store the text from each summary and the HTML that follows it, we'll declare our 2 variables globally for this and then assign them in the small function we create.

In the function, we're just grabbing what we need from within a loop

```javascript
const widgetWrapper = document.querySelector('.widget__wrapper');
let controlText, widgetContent


const getContents = () => {
  widgetWrapper.querySelectorAll('details').forEach(el => {
    controlText = el.firstElementChild.textContent;
    widgetContent = el.lastElementChild.innerHTML;
  })
  widgetWrapper.innerHTML = '';
}

getContents();
```