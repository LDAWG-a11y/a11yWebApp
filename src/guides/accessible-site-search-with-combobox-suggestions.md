---
title: Accessible site search with combobox suggestions
summary: A common UI pattern is a site search input that comes with a list of
  suggestions, where each suggestion is a link. Let's look at what we need to
  consider
author: dlee
date: 2024-01-10
toc: true
tags:
  - HTML
  - ARIA
  - JavaScript
  - Component
isGuide: true
---
## Site search with suggestions

We have all encountered those site search patterns where as we start typing or focus on the input, a box displays underneath the input and it will filter suggestions based upon the characters typed into the input. All major search engines use these patterns, so when you Google something, Bing it (that will never sound right) or whatever else, you'll typically start typing into an input and it will display suggestions, based upon matching the characters you have typed against suggestions. They are of course also very common on eCommerce sites and most sites where there is a tonne of content.

Functionally, they act almost identical to the combobox pattern, with one major difference, a `combobox` with a `listbox` displays a list of items with `role="option"` and it will do something on that page or set a selection when a user makes their choice, a site search with suggestions will navigate to a new page; be that a results page or directly to the exact page.

I couldn't talk about comboboxes without linking to [Sarah Higley's amazing deep dive into comboboxes](https://sarahmhigley.com/writing/select-your-poison/), this is my goto for most `combobox` recommendations, as it is super detailed. Sarah's comboboxes are for displaying suggestions for options, that will change the setting of that input, not something that will navigate to a new URL, so this guide does differ somewhat, but mostly because I'm not as smart as Sarah.

## Ok, how will ours differ?

I'm going to build three different examples using different patterns, unfortunately this is not a guide that can provide a "solution" as such, it's a guide that provides three options, but if using in the wild, I cannot stress enough that these would need to be tested with disabled users to determine which approach is the best for them. I don't have the luxury of a budget to pay for user testing so these are just concepts, for further exploration by you and your team. In isolation, they may all have at least one issue or grey area, but on an actual site those issues may or may not be problematic, depending on other factors. So, this is a proceed with caution warning.

### Probable WCAG failure?

Should we opt for a combobox with role="option" elements we actually run the risk of a WCAG failure. Looking at [WCAG 3.2.2 On Input (A)](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html), it states "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behaviour before using the component." It then goes on to state that "So checking a checkbox, entering text into a text field, or changing the selected option in a list control changes its setting, but activating a link or a button does not". 

As we would navigate to a new URL by clicking one of the "options", that of course is a change of context, and as the item a user clicks is an "option", then this is where the failure occurs. The pattern is actually very common, albeit with some implementation differences and given that there may well be other information provided to inform a user that clicking one of these items will navigate to a new page, is that information enough? 

The only user group that may ever know the item they are clicking is an "option" are of course screen reader users (I'm not counting folks who open up the Inspector/DevTools) and in some instances the `role="option"` isn't announced at all.

Whilst WCAG is super useful because we need a minimum standard to test against, there may be times where something "technically" fails a success criterion, but is actually perfectly understandable and usable for disabled and non-disabled folks alike. This pattern is in use across major search engines (it does differ slightly) and typically a user of the web will be familiar with how to use a search engine, whether they actually use the suggestions or not is information I don't have, they could certainly be useful to all users, but some folks may just ignore them completely.

## Let's look at some other site searches from around the web

I'll discuss several different implementations here, just to show how there isn't a universally agreed pattern and how each organisation has approached the issue. There will be limitations with my findings here, in that visually, they all look somewhat the same, as there is an input which will display a panel of suggestions below it. Non-screen reader users will generally be familiar with the pattern, they have no idea what roles and properties the components use, as much of this information is only communicated to screen readers, although ARIA etc can of course affect other assistive technologies.

The information that is passed to a screen reader comes from the roles and properties, a screen reader user who cannot see the interface will of course rely on certain roles and properties, along with names and states to understand a component, its purpose and how to interact with it. I cannot speak for screen reader users and I have no anecdotal evidence to suggest any of the following patterns are more or less accessible than another to a screen reader user. I'm just making observations and this is primarily to discuss the different patterns in use across popular sites.

It is of course safe to say that if the suggestions offer value to some users, then that same value must be afforded to all users, so in the case of a screen reader user that cannot see the suggestions appear and filtering taking place, they need to know they are there and how to get to them should they wish to use them.

### Apple

I accessed the [apple.com](https://www.apple.com/) site and tabbed to the "Search Apple.com" button, which is located in the site's header, this button is visually presented as a magnifying glass. When I click that button (or link with `role="button"` as it actually is) the search panel expands into view. I am presented with a text input and below that input is a list of "Quick links".

Once I start typing in the input, that list of Quick Links then becomes a list of "Suggested Searches", which starts filtering based upon the characters I type. Looking at the code in the Web Inspector I can see that Apple has not gone for the ARIA `combobox` pattern at all, it's simply a text input and an unrelated list of suggestions, well they are all wrapped in a `<form>` element, so I guess there is some relationship there, but is that relationship programmatically determinable? I wouldn't say it is.

Upon typing to narrow down results, if I pause typing whilst VoiceOver is running, it does announce "\[Count of] total results" and pressing the down arrow will move visual focus to the items in the suggestions list enabling me to navigate to them like I would a `combobox`. So there is some audible information that provides a screen reader user with information that may help them understand the component.

Is there enough information here for a screen reader user to understand the pattern? A sighted user who started typing and saw the suggestions change can indeed find that useful. But what about a screen reader user? They would typically rely on roles and properties to understand relationships and interaction patterns. These suggestions can also be reached with the <kbd>Tab</kbd> key too, so even if the user was unaware they could use the arrow keys, they could also find the suggestions by tabbing to them. The five suggestions are quite restrictive though, in that five is a small number, it is quite possible to type a few characters, tab through the two buttons into the suggestions list and discover that the characters you typed weren't quite granular enough to filter down the suggestions to exactly what you wanted. Because you used the <kbd>Tab</kbd> key, you can't just continue typing to further filter, you have to <kbd>Shift</kbd> & <kbd>Tab</kbd> back up into the input and maybe at this stage, our screen reader user would be wondering why they bothered attempting to use the suggestions at all?

Perhaps Apple found this pattern to be better for screen reader users after user-testing with them, assuming they did? Maybe they used this pattern because of the On Input issue? Maybe they used this pattern as their browsers don't support `aria-activedescendant` (yet) Whatever their reason, it is an interesting approach and I am curious how screen reader users would rate this approach compared to others.

The Apple search does navigate to a results page, as opposed to a specific page and despite Apple being one of the largest companies on the planet, the number of products they sell is actually quite small. Should a user wish to buy a new phone, laptop or tablet etc, they likely would use the main navigation links which precede the search input and direct a user to the product page. There are of course a large number of pages that provide helpful information on how to use the products or services Apple sell, so a user looking for guidance on how to use some specific functionality would likely have to interact with the search input.

### Google

Using the [Google.com](https://www.google.com/) search page, this one uses a somewhat similar combobox pattern to Sarah's, although this one still has `aria-owns` which was only recommended in an older ARIA spec. If you read Sarah's article (fully), which I hope you did, she points out the issue with using `aria-owns` on an input, which of course creates a parent-child relationship and this was problematic. Now in ARIA 1.2, we use `aria-controls`, which just means in layman's terms if you interact with this thing, it will also have an effect on this other thing, that isn't a child. Google have opted for both `aria-controls` and `aria-owns`, the reason for that is unclear to me.

This actually fails On Input simply because it is an "option", but it's only an "option" programmatically, in that visually it doesn't look like a `<select>` and `<option>` pattern as the operating system styles a list of `<option>`s in its own way, whereas these are fully custom elements that the developers have full control over. Would a user that does not use a screen reader have any idea they are "option" elements? No, of course not, so are their user expectations met when they start typing into the field and the suggestions display, would they expect to click a suggestion and navigate to a new page? I think given that this type of component is commonplace and this is a search engine, a sighted user would expect that behaviour. It's likely a screen reader user can also expect that, given it is a search engine and typing in a search input will navigate to a new page.

Quite interestingly, with VoiceOver/Safari, the only thing announced is the actual text. The `role="option"` is present on the suggestions, but it's just not being passed to VoiceOver The reason this is happening is because as a user arrows up or down in the suggestions, the value of the input changes to match the text of the current "option", so that change in value is what is actually announced. So, this is more of an "Inline autocomplete", as was discussed in Sarah's article.

Should I use up and down arrows with NVDA and Firefox, I do hear the list enumeration and the suggestion text, still not the role of "option" though, even though it is present. Arguably as a user does not hear it is an "option" maybe this mitigates the confusion for them? I don't have access to JAWS, so I am unable to determine what, if any differences are output with that screen reader.

Despite it "technically" being a failure, is it actually a "problem" for users? Ultimately, usability trumps compliance and only disabled folks can answer that. The fallback here is that search engines are pretty clever, should a user choose not to use the suggestions and even make a typo, the search engine will navigate to a results page and either ask if you meant \[correctly typed term]? or just figure it out for you.

### MDN

Many of us are familiar with [MDN (Mozilla Developer Network)](https://developer.mozilla.org/en-US/), as we may visit often to learn syntax or understand something related to web technologies a little better. MDN have a search filter in their site header and looking at the HTML for the input alone, it contains all of the roles and properties that an ARIA 1.2 `combobox` uses. Where this one gets a problematic is the actual suggestions in the related `listbox`, have the correct `role="option"` children, as are required (you can also use `role="group",` but that must contain `role="option"` children), but interestingly, MDN have decided to place a link inside the `role="option"` elements.

As `role="option"` is fundamentally the same as an `<option>` as far as assistive technologies are concerned it is only allowed presentational children, not interactive elements. Whilst a `role` in itself doesn't really alter the way something behaves, the expectation from the user agent is that you make this item interactive, after all, it is an "option" and options can be selected. As the ARIA spec and user agents expect this element to be interactive, popping another interactive element inside it is actually invalid ARIA and of course when we use ARIA, we need to do so responsibly, as the effects can have all manner of consequences for disabled users.

Similar to the Google pattern, this does not announce the role of "option" or even "link" it contains, it reports each item as a text element in VoiceOver. Quite annoyingly, it doesn't work correctly, in that with VoiceOver running, if I press down arrow, it closes the suggestions panel, so I have to navigate to the options using the virtual cursor and then get into the `listbox`. the problem with that is the input now doesn't have focus, so a user cannot continue typing to further filter the suggestions.

In Firefox with NVDA, I can at least use the up and down arrows and again, there is no role announced, just the text and list enumeration.

Whilst it works similar to the Google search (albeit this implementation takes a user directly to a specific page), the nested `<a>` element sits uncomfortably with me, I'm struggling to see why they took this approach, as it isn't necessary at all. Sure, links provide us with out-of-the-box interactivity, which is useful here, but they could have just added the `role="option"` to the link elements to preserve the functionality and also provide the required ARIA children for the `listbox`, I'll demo this later. It's still technically a failure, as an option is navigating, but less of a failure than nesting interactive elements in my opinion.

### Amazon

Amazon does not use the combobox pattern for their site search, typing a few characters into the field with VoiceOver running unfortunately did not give any audible indication that there were suggestions present. If a user does not know these helpful suggestions are present, then they're not helpful to them at all. As with all of the other examples, somebody could argue that there is an "alternative way" in that the user can search by using the input, but that's still not comparable, because there's no "shortcut", so to speak. I'm just a lazy web user, I don't need shortcuts, but I appreciate them. A person with a disability would in many cases benefit from actually being able to use these handy shortcuts way more than a lazy web user, like me. 

This one is quite disappointing, even if it simply announced the presence of the suggestions, like Apple's it would at least give users a clue to there were suggestions present.

## Overview of site searches

We looked at four different implementations and we could have gone on forever, as seldom are the patterns the same under the hood. I'm not saying it is important that a screen reader hears that it is an "option" because that implies that no change of context should automatically occur (without warning). Which begs the question, what should they hear if they access the suggestions? Well ultimately it's a link as it navigates to a new URL, but we cannot have links in a `listbox`, at least we cannot have their semantics exposed, we can of course add `role="option"` to them, but as we discussed, we're still navigating by clicking an "option", as although it is a link in HTML, we added ARIA which changes the role here.

Apple's are announced as links and it does inform a screen reader that there are a certain number of options available. It does not have `aria-controls` present on the `<input>,` which I know doesn't do a great deal due to lack of screen reader support, it does at least reinforce that programmatic relationship.

As it is critical that we consider all users when developing sites and the components they are built with, we need to ensure that they work for screen reader users too, then they are in the best position to decide whether they use it or not, user choice is the tool that allows users to operate sites in a way that works for them.

I guess you could have companies using the "Alternate conforming version" argument, in that they may claim the fallback is the search input, a user is not forced to use the suggestions. I'm not a WCAG purist, I hate that argument, it's typically used by teams that cannot be bothered to build something inclusive. You could of course counter that argument with "It's not comparable, it takes significantly more keystrokes to only use the input, a user is burdened with having to be able to type their query identically, ensuring there are no spelling mistakes or typos etc"

## How should we build one?

I don't have a definitive answer here I'm afraid. If I had the resources available to me, I'd quite happily pay for some user testing, to test several patterns to determine which one seemed the most intuitive, especially to screen reader users. We can build a few patterns though and discuss some of the pros and cons of each, then if you're viewing this page to find a solution, you can hopefully conduct user testing and base your decision on that?

## Let's build some examples

As always, this isn't a design demo, so I'm just going to make them look OK, I will of course ensure contrast and focus are perceivable, but they'll look relatively basic, just to reduce the amount of work I need to do. Also, there are some differences between the examples we discussed, most of them redirect a user to a search results page, whereas the Mozilla example directs a user to the actual page, we're going to be doing the latter.

We will only add the `listbox` or alternative roles when JS is available, I always build with progressive enhancement in mind, in that we don't want redundant controls on a page for our users if JS isn't available. What I'm going to do here is I'm going to write the base HTML for the input and its containers in actual HTML, obviously without JS this will do nothing at all. The two options here are:

* Add the input and wrapping elements to the DOM with JS instead, then a user won't have to face the frustration of interacting with a redundant control
* Wrap the element in a <form> (assuming you have a backend for this) and have it direct to a Search Results page. When JS is available have, remove or neuter the form and have the component operate by clicking the links or matching the input text to an item in the suggestions container

For the first example, I am going to provide all three files: HTML, JS & CSS and only the JS for the remaining examples, as that's the only file that will change (He says apprehensively as thus far he has only built the first example).

### The combobox and option approach

Technically this fails [WCAG 3.2.2 On Input (A)](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html), similar to the Google approach, how much of an issue that actually is, is something that can only be determined by disabled folks, if they say it is perfectly understandable to them, irrespective of what WCAG says then users before standards, always. This view can of course be problematic for legal risk, depending where in the world you live, maybe the fact it does not fully comply could leave you open to some legal challenge.

What behaviour would a user expect from a site search? A sighted user would not "see" a typical `<select>` &`<option>`s element, as the OS styles those, so what they "see" resembles something they encounter every time they use a search engine and most of the time they shop on large eCommerce sites, an `<input>` that will accept text input, whilst filtering a bunch of suggestions, clicking one of those suggestions will navigate to a results page or an actual page.

If the only user group that may find this behaviour unexpected are screen reader users, would it be enough to advise just those users of what will happen? I'm not a fan of hiding instructions just for screen reader users, typically all users benefit from them, in this instance though maybe it's acceptable, as we can make our suggestions look like links, we could use icons, underlines or whatever, just to add additional visual affordances. As none of those aforementioned affordances would provide a user of a screen reader with any additional information, could we just ensure that the name of the `<input>` includes a little extra info? If our `<input>` had a visually hidden accessible name, such as "Search and filter navigation links" and we had underlines on the actual links, is that enough of an advance warning to both sighted and unsighted users?

I could include a `<button>`, like a "Go" <`button>`, a user clicks a suggestion, focus returns to the input and there is an adjacent `<button>`, which when clicked will then perform the same action. This is an acceptable WCAG technique for meeting the On Input SC. But, sometimes it may be hard to convince stakeholders to add that `<button>`, as you may get the "It's adding an extra step for everybody" feedback, which is actually true. We may also get the "We don't want a visible text `<label>` on the `<input>`, we just want an icon" instruction. So, what I am going to do, is just create an `<input>`, with no button or visible label, it will just have a magnifying glass icon. Visually it has a label, as the icon communicates the purpose, programmatically, it will have a proper `<label>`, with the visually hidden text "Search and filter navigation links". I have to admit to not being 100% sure whether in isolation the underlined links and the hidden label are enough to "advise" a user of expected behaviour to pass On Input, I think it is, but somebody smarter may disagree. See this as a "grey area", until you can confirm otherwise.

#### The HTML

Nothing spectacular here, an `<input>` with an SVG and some wrapping `<div>` elements. we'll add the roles and properties with JS, as they're redundant without it, but as I said, this could be in a `<form>` for users without JS. The label for the input is just "Search" when JS isn't available, as no filtering can occur, so just keep this basic and swap it out when or if JS loads.

```html
 <div class="header__search-container">
  <div class="search__wrapper" data-expanded="false">
    <label id="sFilterLbl" for="sFilter" class="visually-hidden">Search</label>
    <input class="search__input" id="sFilter" class="search__input" type="text" autocomplete="off">
    <svg aria-hidden="true" focusable="false" stroke="#000" stroke-width="9.8" viewBox="-19.6 -19.6 529.6 529.6"
      height="1.25rem">
      <path
        d="M484.1 454.8 373.6 344.2a210.6 210.6 0 1 0-29.2 29.2l110.5 110.5c12.9 11.8 25 4.2 29.2 0a20 20 0 0 0 0-29.1zm-443-244a169.5 169.5 0 1 1 339 0 169.5 169.5 0 0 1-339 0z" />
    </svg>
  </div>
</div>
<h1>Some static content</h1>
```

#### The CSS

Now, I'll just style it, I'm not going to explain any of this, I'll just summarise a few key points, after.

```css
*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
}

:root {
  --colour__primary: rebeccapurple;
  --colour__bg: #fafafa;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
}

.header__search-container {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 24px 8px;
  width: 100%;
  font-size: 1.125rem;
}

.search__wrapper {
  position: relative;
  width: 100%;
  max-width: 25rem;
}

.search__wrapper svg {
  position: absolute;
  right: .5rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--colour__primary);
  fill: currentColor;
  stroke: currentColor;
}

.search__input {
  border: 2px solid var(--colour__primary);
  border-radius: 6px;
  padding: 8px 32px 8px 8px;
  width: 100%;
  font-size: 1.25rem;
}

.search__input:focus {
  outline: 3px solid var(--colour__primary);
  outline-offset: 2px;
}

.search__panel-container {
  position: absolute;
  bottom: 22px;
  transform: translateY(100%);
  border: 2px solid var(--colour__primary);
  border-radius: 0 0 4px 4px;
  margin: 0 4px;
  padding-top: 6px;
  width: calc(100% - 16px);
  max-width: 25rem;
  background-color: var(--colour__bg);
}

.search__wrapper[data-expanded="false"]+.search__panel-container {
  display: none;
}

.search__panel {
  width: 100%;
  overflow-y: auto;
  max-height: 60dvh;
  list-style-type: none;
  padding: 0;
}

.search__option {
  display: block;
  margin-bottom: 4px;
  padding: 4px 6px;
  line-height: 1.5;
  color: var(--colour__primary);
}

.search__option[aria-selected="true"],
.search__option[data-selected="true"],
.search__option:hover {
  background-color: var(--colour__primary);
  color: var(--colour__bg);
}

@media (forced-colors: active) {

  .search__option[aria-selected="true"],
  .search__option[data-selected="true"] {
    color: var(--colour__primary);
    outline: 3px solid var(--colour__primary);
    outline-offset: -2px;
  }
}

.search__message {
  display: block;
  margin-bottom: 4px;
  padding: 4px;
  line-height: 1.5;
  color: #bd0000;
}

.visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

/* ignore */
a:not([class]) {
  padding: 1rem 0;
}
```

* Normally I use `rem` units for `padding` and `margin`, I'm just experimenting with `px` units for this, as in this case there's little benefit making spacing bigger with page zoom
* I add an `outline` with an `offset` to the `<input>` when it has focus, because let the people where they are and all that
* I invert the colours of the background and text for the options, as typically you will see folks add a light grey background to the selected option and I can't see how that would pass [1.4.1 Use of Colour](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html)
* Our background won't show in High Contrast Mode, so I've added an outline to the selected option, so people can see where they are
* I've hidden the actual label as I am being a sheep
* I've made it look okay-ish and centred it etc

#### The JavaScript

```javascript
const searchFilterWrapper = document.querySelector('.header__search-container');
const keys = ['ArrowUp', 'ArrowDown', 'Enter'];
const searchWrapper = document.querySelector('.search__wrapper');
const searchInput = document.querySelector('.search__input');
let itemsArr = [];
let currItem;
const links = [
  { label: "Home", url: "#a" },
  { label: "About", url: "#b" },
  { label: "Contact", url: "#c" },
  { label: "Old Thing", url: "#d" },
  { label: "New Thing", url: "#e" },
  { label: "New Thing Ultra", url: "#f" },
  { label: "New Thing Ultra Pro", url: "#g" },
  { label: "New Thing Ultra Pro Max", url: "#h" },
  { label: "New Thing Ultra Pro Max Plus", url: "#i" },
  { label: "Shipping", url: "#j" },
  { label: "Privacy", url: "#k" },
  { label: "Cookies", url: "#l" },
  { label: "Accessibility? LOL", url: "#m" }
];

searchFilterWrapper.querySelector('#sFilterLbl').textContent = 'Search and filter navigation links';
searchFilterWrapper.insertAdjacentHTML('beforeend', `<div class="search__panel-container"><ul class="search__panel" id="lBox" role="listbox" aria-labelledby="sFilter"></ul>
<span aria-live="polite" class="search__message visually-hidden"></span></div>`);

links.forEach((link, idx) => {
  itemsArr += `
  <li class="search__item" role="presentation" data-pos="${idx + 1}">
    <a class="search__option" id="opt-${idx + 1}" role="option" tabindex="-1" href="${link.url}">${link.label}</a>
  </li>`;
})

const listbox = document.querySelector('#lBox');
const message = searchFilterWrapper.querySelector('.search__message');
listbox.insertAdjacentHTML('beforeend', itemsArr);
itemsArr = Array.from(listbox.querySelectorAll('.search__item'));

searchInput.setAttribute('role', 'combobox');
searchInput.setAttribute('aria-activedescendant', '');
searchInput.setAttribute('aria-autocomplete', 'list');
searchInput.setAttribute('aria-expanded', 'false');
searchInput.setAttribute('aria-controls', 'lBox');

searchInput.addEventListener('focus', (evt) => {
  searchInput.setAttribute('aria-expanded', 'true');
  searchWrapper.setAttribute('data-expanded', 'true');
})

searchInput.addEventListener('blur', (evt) => {
  searchInput.setAttribute('aria-expanded', 'false');
  searchWrapper.setAttribute('data-expanded', 'false');
})

const filterItems = () => {
  itemsArr.forEach((item, idx) => {
    if (item.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
      listbox.appendChild(item);
    } else {
      item.firstElementChild.removeAttribute('aria-selected');
      item.remove();
    }
  })

  listbox.querySelectorAll('.search__item').forEach((item, idx) => {
    item.setAttribute('data-pos', `${idx + 1}`)
  })
}

searchInput.addEventListener('keydown', (evt) => {
  if (keys.includes(evt.key) && itemsArr.length) {
    evt.preventDefault();

    if (!currItem && evt.key === 'ArrowDown') {
      setSelected(listbox.querySelector('[data-pos="1"]'));
    } else if (currItem && evt.key === 'ArrowDown' && currItem.nextElementSibling) {
      setSelected(currItem.nextElementSibling);
    }

    if (currItem && evt.key === 'ArrowUp' && currItem.previousElementSibling) {
      setSelected(currItem.previousElementSibling);
    }

    if (evt.key === 'Enter') {
      listbox.querySelectorAll('.search__option').forEach(item => {
        if (searchInput.value.toLowerCase() === item.textContent.toLowerCase() || item.hasAttribute('aria-selected')) {
          item.click();
        }
      })
    }
  }
})

searchInput.addEventListener('input', (evt) => {
  filterItems();
  if (listbox.querySelectorAll('.search__item').length === 0) {
    searchInput.setAttribute('aria-activedescendant', '');
    currItem = '';
    displayError();
  } else {
    message.textContent = '';
    message.classList.add('visually-hidden');
  }

  if (currItem) {
    if (listbox.querySelectorAll('.search__item').length === 1 ||
      (listbox.querySelectorAll('.search__item').length > 1 && !listbox.querySelector(`${currItem.firstElementChild.id}`))) {
      setSelected(listbox.querySelector('[data-pos="1"]'));
    }
  }
})

const setSelected = (item) => {
  listbox.querySelectorAll('.search__item').forEach(listItem => {
    if (listItem === item) {
      item.firstElementChild.setAttribute('aria-selected', 'true');
      searchInput.setAttribute('aria-activedescendant', item.firstElementChild.id);
      currItem = item;
      item.scrollIntoView({ block: "nearest", inline: "nearest" });
    } else {
      listItem.firstElementChild.removeAttribute('aria-selected')
    }

    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      message.textContent = '';
      message.textContent = `${item.textContent}, selected, ${item.getAttribute('data-pos')} of ${listbox.querySelectorAll('li').length}`;
      message.classList.add('visually-hidden');
    }
  })
}

function displayError() {
  message.textContent = 'No matching results';
  message.classList.remove('visually-hidden');
}
```

* So, I'm setting some global variables, particularly for the input, its wrapper, the container to pop the listbox in, the keys a user will press, an empty `itemsArr` array and an empty `currItem` variable
* I change the accessible name, by replacing the label's text with "Search and filter navigation links", which feels a bit yucky, but this is an example, not a recommendation
* I'm just grabbing our `links` from an array of objects
* I'm adding a further wrapper (We can't have an error message in a `listbox`), then I'm adding this message container as a sibling of the `listbox`, I'm mostly doing this as Safari doesn't support `aria-activedescendant`, yet, but also I want to inform a user that there are no matching suggestions, as that's useful to know, right?
* I loop through our `links` creating a HTML string, with the necessary roles and properties, I add presentational list items as parents of the links, along with classes and IDs, adding them to our `itemsArr` array
* I'm actually using links with a `role="option"`, as there seems little point reinventing the wheel for navigating when links do exactly that out of the box
* I declare some new variables that we created from strings as actual HTML elements that we need later
* I add all of the roles and properties to the input
* I expand the `listbox` on `focus` and close it on a `blur` event
* I filter a user's typed string against the `textContent` of the links, if that string is present, keep it, else remove it from the DOM
* We add a data attribute which takes the index (idx) and adds one, so it is not zero-based, we add this to the list item and update it when filtered, so irrespective of how many items are removed through filtering, the value of that attribute will always start at 1 and will increment for each subsequent item
* I listen for key presses that match our array of keys, if it is arrow down and there is no selected option we pass the first link which will have the `data-pos="1"` attribute and value set to a `setSelection()` function, else we just move to the next sibling if present and a hard stop if there isn't a next sibling
* Similar to above, if a user is pressing up we send the previous sibling to the `setSelection()` function, else a hard stop
* If a user presses <kbd>Enter</kbd> and the characters they input match the `textContent` of any link, we auto click that link and they navigate to that page
* If the user has focussed on a link and presses <kbd>Enter</kbd>, we also complete that action automatically
* If there are no matches, we reset our `currItem` variable to empty, set `aria-activedescendant`to empty and call the `displayError()` function
* We manage which item to focus on, in the options if there is at least one option, this could be improved, as if the currently focused item is removed from the DOM after typing, I'm just pushing focus back to the first item, when it would be nicer to place it on the next sibling if it exists
* When an item is the "focused" item, we set `aria-selected="true"` and update the value of `aria-activedescendant`, along with our `currItem` variable
* We ensure that the user can actually see which item they have arrowed to, using `scrollIntoView()`and we remove `aria-selected` from any item that isn't the currently selected item
* We shoehorn a fix in for Safari, as it doesn't support `aria-activedescendant`, so we check for that user agent, then we build a string that will announce "\[Item name], selected, \[position of item] of \[number of items in set]", this matched exactly what I heard from VoiceOver output on Safari with an alternative, so I have provided identical information
* I finally have a error message which will be visible to users and heard by screen reader users "No matching results" and this only appears should a user type something that doesn't match an item in the list

So, that wraps up the first example, which uses the standard combobox pattern, albeit for navigation as opposed to selecting something. Unlike MDN's at least we haven't added a link inside the option, we just used a link so we got its behaviour and applied `role="option"`to use the correct ARIA pattern. I am aware of the second rule of ARIA but this seemed a better approach than adding a link with role="presentation" and then adding a `<span role="option">` inside of that link

Whether this is better than any of the examples we looked at for users is not something I can answer, but it is an approach worth considering, maybe you or your team could improve it further?

Here's a CodePen to test and tinker with:

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="js,result" data-slug-hash="LYaZwro" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/LYaZwro">
  ARIA 1.2 combobox for links (experimental)</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### The combobox and dialog approach

I haven't seen this pattern used out in the wild, it was an untested suggestion by a member of the A11y Slack community and it makes a lot of sense. A `combobox` can be associated with an element that either has the role of `listbox`, `tree`, `grid` or `dialog`. We have already used `listbox`, we don't need `grid` or `tree`, but the beauty of using `dialog` is that it doesn't have any constraints over what we place inside it. Our links can actually be links without overwriting the `role`. I'm just going to try and get away with using our existing HTML and CSS, which I'm only doing for simplicity's sake and to keep this guide a bit shorter. So, just the JS changes a little here, I'll outline what I changed from the initial implementation:

```javascript
const searchFilterWrapper = document.querySelector('.header__search-container');
const keys = ['ArrowUp', 'ArrowDown', 'Enter'];
const searchWrapper = document.querySelector('.search__wrapper');
const searchInput = document.querySelector('.search__input');
let itemsArr = [];
let currItem;
const links = [
  { label: "Home", url: "#a" },
  { label: "About", url: "#b" },
  { label: "Contact", url: "#c" },
  { label: "Old Thing", url: "#d" },
  { label: "New Thing", url: "#e" },
  { label: "New Thing Ultra", url: "#f" },
  { label: "New Thing Ultra Pro", url: "#g" },
  { label: "New Thing Ultra Pro Max", url: "#h" },
  { label: "New Thing Ultra Pro Max Plus", url: "#i" },
  { label: "Shipping", url: "#j" },
  { label: "Privacy", url: "#k" },
  { label: "Cookies", url: "#l" },
  { label: "Accessibility? LOL", url: "#m" }
];

searchFilterWrapper.querySelector('#sFilterLbl').textContent = 'Search and filter navigation links';
searchFilterWrapper.insertAdjacentHTML('beforeend', `<div class="search__panel-container" role="dialog" aria-labelledby="sFilter"><ul class="search__panel" id="lBox"></ul>
<span aria-live="polite" class="search__message visually-hidden"></span></div>`);

links.forEach((link, idx) => {
  itemsArr += `
  <li class="search__item" data-pos="${idx + 1}">
    <a class="search__option" id="opt-${idx + 1}" tabindex="-1" href="${link.url}">${link.label}</a>
  </li>`;
})

const listbox = document.querySelector('#lBox');
const message = searchFilterWrapper.querySelector('.search__message');
listbox.insertAdjacentHTML('beforeend', itemsArr);
itemsArr = Array.from(listbox.querySelectorAll('.search__item'));

searchInput.setAttribute('role', 'combobox');
searchInput.setAttribute('aria-activedescendant', '');
searchInput.setAttribute('aria-autocomplete', 'list');
searchInput.setAttribute('aria-expanded', 'false');
searchInput.setAttribute('aria-controls', 'lBox');

searchInput.addEventListener('focus', (evt) => {
  searchInput.setAttribute('aria-expanded', 'true');
  searchWrapper.setAttribute('data-expanded', 'true');
})

searchInput.addEventListener('blur', (evt) => {
  searchInput.setAttribute('aria-expanded', 'false');
  searchWrapper.setAttribute('data-expanded', 'false');
})

const filterItems = () => {
  itemsArr.forEach((item, idx) => {
    if (item.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
      listbox.appendChild(item);
    } else {
      item.firstElementChild.removeAttribute('data-selected');
      item.remove();
    }
  })

  listbox.querySelectorAll('.search__item').forEach((item, idx) => {
    item.setAttribute('data-pos', `${idx + 1}`)
  })
}

searchInput.addEventListener('keydown', (evt) => {
  if (keys.includes(evt.key) && itemsArr.length) {
    evt.preventDefault();

    if (!currItem && evt.key === 'ArrowDown') {
      setSelected(listbox.querySelector('[data-pos="1"]'));
    } else if (currItem && evt.key === 'ArrowDown' && currItem.nextElementSibling) {
      setSelected(currItem.nextElementSibling);
    }

    if (currItem && evt.key === 'ArrowUp' && currItem.previousElementSibling) {
      setSelected(currItem.previousElementSibling);
    }

    if (evt.key === 'Enter') {
      listbox.querySelectorAll('.search__option').forEach(item => {
        if (searchInput.value.toLowerCase() === item.textContent.toLowerCase() || item.hasAttribute('data-selected')) {
          item.click();
        }
      })
    }
  }
})

searchInput.addEventListener('input', (evt) => {
  filterItems();
  if (listbox.querySelectorAll('.search__item').length === 0) {
    searchInput.setAttribute('aria-activedescendant', '');
    currItem = '';
    displayError();
  } else {
    message.textContent = '';
    message.classList.add('visually-hidden');
  }

  if (currItem) {
    if (listbox.querySelectorAll('.search__item').length === 1 ||
      (listbox.querySelectorAll('.search__item').length > 1 && !listbox.querySelector(`${currItem.firstElementChild.id}`))) {
      setSelected(listbox.querySelector('[data-pos="1"]'));
    }
  }
})

const setSelected = (item) => {
  listbox.querySelectorAll('.search__item').forEach(listItem => {
    if (listItem === item) {
      item.firstElementChild.setAttribute('data-selected', 'true');
      searchInput.setAttribute('aria-activedescendant', item.firstElementChild.id);
      currItem = item;
      item.scrollIntoView({ block: "nearest", inline: "nearest" });
    } else {
      listItem.firstElementChild.removeAttribute('data-selected')
    }

    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      message.textContent = '';
      message.textContent = `${item.textContent}, ${item.getAttribute('data-pos')} of ${listbox.querySelectorAll('li').length}`;
      message.classList.add('visually-hidden');
    }
  })
}

function displayError() {
  message.textContent = 'No matching results';
  message.classList.remove('visually-hidden');
}
```

* I removed the combobox role and associated properties from the <ul> and added role="dialog" and `aria-labelledby="sFilter"` to the parent container `.search__panel-container`
* I removed the presentation role from the list items, our list is now exposed as a list
* I removed `role="option"` from the links, so now they are exposed as actual links
* All references to `aria-selected` have been replaced with a data attribute, `data-selected` as we cannot have `aria-selected` on elements with a link role and as we are using "pretend focus" for the suggestions, we needed a class or attribute to hook on to, to add a focus indicator
* In our shoe-horned Safari fix, I removed the word "selected" from the generated string for the announcement, as that would be odd hearing a link is selected

That was pretty easy going, not a great deal changed there. As I said, this is not something I have personally encountered, but it was recommended as something to explore by somebody more experienced than me, so I thought its inclusion was worthwhile.

We no longer need to concern ourselves with the On Input issue on the previous implementation as we are not navigating with role="option" elements, they are actual links. Of course, there is a slight issue in that they cannot be tabbed to, but this is a combobox, which has a purpose of allowing a user to mix up typing and arrowing up or down, without "true focus" ever leaving the input and of course, we definitely do not want this in place of a well structured, accessible site nav, but if used in combination with a good navigation, it could certainly help users find nested pages, such as products, guides, courses or whatever.

Please do test with users before following this approach, I can't see why it would be too different than the previous pattern, given the announcement of roles and properties are the same, but actual users are the ones that can give you far better data than me.

Here's the CodePen:

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="js,result" data-slug-hash="JjzKgmV" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/JjzKgmV">
  ARIA 1.2 combobox for links with dialog (experimental)</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### The non-combobox approach

This is more like the Apple example we discussed earlier, with a couple of minor tweaks. This particular approach doesn't convince me it's as conventional of a pattern as the previous two approaches. The issue I see here, is the lack of roles on the input. A screen reader user would take cues from those roles in that they indicate a certain interaction model (at least it should if coded correctly), without these roles, would a screen reader know arrow key navigation is available? The Apple implementation does also allow tabbing to the suggestions, but if the input loses focus and our user has to reverse <kbd>Tab</kbd> back to it when they discover their suggestion is not in the list, then this seems a bit clunky and less than ideal. I'm not a screen reader user, so this is just my "best guess" take on it, but I base that best guess on what seems the glaringly obvious reason the combobox pattern exists, to be able to type, have a little search in the suggestions, then being able to type some more without having to <kbd>Tab</kbd> back up into the input to be able to continue typing/filtering? It would certainly be beneficial to explore this pattern with screen reader users, along with the others.

Again, as I'm a little lazy, I'm just gonna modify the code from before, so just the JS is changing again:

```javascript
 const searchFilterWrapper = document.querySelector('.header__search-container');
const keys = ['ArrowUp', 'ArrowDown', 'Enter'];
const searchWrapper = document.querySelector('.search__wrapper');
const searchInput = document.querySelector('.search__input');
let itemsArr = [];
let currItem;
const links = [
  { label: "Home", url: "#a" },
  { label: "About", url: "#b" },
  { label: "Contact", url: "#c" },
  { label: "Old Thing", url: "#d" },
  { label: "New Thing", url: "#e" },
  { label: "New Thing Ultra", url: "#f" },
  { label: "New Thing Ultra Pro", url: "#g" },
  { label: "New Thing Ultra Pro Max", url: "#h" },
  { label: "New Thing Ultra Pro Max Plus", url: "#i" },
  { label: "Shipping", url: "#j" },
  { label: "Privacy", url: "#k" },
  { label: "Cookies", url: "#l" },
  { label: "Accessibility? LOL", url: "#m" }
];

searchFilterWrapper.querySelector('#sFilterLbl').textContent = 'Search and filter navigation links, suggestions below';
searchFilterWrapper.insertAdjacentHTML('beforeend', `<div class="search__panel-container" role="region" aria-labelledby="sFilter"><ul class="search__panel" id="lBox"></ul>
<span aria-live="polite" class="search__message visually-hidden"></span></div>`);

links.forEach((link, idx) => {
  itemsArr += `
  <li class="search__item" data-pos="${idx + 1}">
    <a class="search__option" id="opt-${idx + 1}" tabindex="-1" href="${link.url}">${link.label}</a>
  </li>`;
})

const listbox = document.querySelector('#lBox');
const message = searchFilterWrapper.querySelector('.search__message');
listbox.insertAdjacentHTML('beforeend', itemsArr);
itemsArr = Array.from(listbox.querySelectorAll('.search__item'));

searchInput.setAttribute('aria-controls', 'lBox');

searchInput.addEventListener('focus', (evt) => {
  searchWrapper.setAttribute('data-expanded', 'true');
})

searchInput.addEventListener('blur', (evt) => {
  searchWrapper.setAttribute('data-expanded', 'false');
})

const filterItems = () => {
  itemsArr.forEach((item, idx) => {
    if (item.textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
      listbox.appendChild(item);
    } else {
      item.firstElementChild.removeAttribute('data-selected');
      item.remove();
    }
  })

  listbox.querySelectorAll('.search__item').forEach((item, idx) => {
    item.setAttribute('data-pos', `${idx + 1}`)
  })
}

searchInput.addEventListener('keydown', (evt) => {
  if (keys.includes(evt.key) && itemsArr.length) {
    evt.preventDefault();

    if (!currItem && evt.key === 'ArrowDown') {
      setSelected(listbox.querySelector('[data-pos="1"]'));
    } else if (currItem && evt.key === 'ArrowDown' && currItem.nextElementSibling) {
      setSelected(currItem.nextElementSibling);
    }

    if (currItem && evt.key === 'ArrowUp' && currItem.previousElementSibling) {
      setSelected(currItem.previousElementSibling);
    }

    if (evt.key === 'Enter') {
      listbox.querySelectorAll('.search__option').forEach(item => {
        if (searchInput.value.toLowerCase() === item.textContent.toLowerCase() || item.hasAttribute('data-selected')) {
          item.click();
        }
      })
    }
  }
})

searchInput.addEventListener('input', (evt) => {
  filterItems();
  if (listbox.querySelectorAll('.search__item').length === 0) {
    currItem = '';
    displayError();
  } else {
    message.textContent = '';
    message.classList.add('visually-hidden');
  }

  if (currItem) {
    if (listbox.querySelectorAll('.search__item').length === 1 ||
      (listbox.querySelectorAll('.search__item').length > 1 && !listbox.querySelector(`${currItem.firstElementChild.id}`))) {
      setSelected(listbox.querySelector('[data-pos="1"]'));
    }
  }
})

const setSelected = (item) => {
  listbox.querySelectorAll('.search__item').forEach(listItem => {
    if (listItem === item) {
      item.firstElementChild.setAttribute('data-selected', 'true');
      currItem = item;
      item.scrollIntoView({ block: "nearest", inline: "nearest" });
    } else {
      listItem.firstElementChild.removeAttribute('data-selected')
    }

    message.textContent = '';
    message.textContent = `${item.textContent}, ${item.getAttribute('data-pos')} of ${listbox.querySelectorAll('li').length}`;
    message.classList.add('visually-hidden');
  })
}

function displayError() {
  message.textContent = 'No matching results';
  message.classList.remove('visually-hidden');
}
```

* I removed the `combobox` role
* I removed all references to `aria-activedescendant`, `aria-autocomplete` and `aria-expanded` as none of those are supported on a standard input
* I removed the `dialog`/`listbox` role from the list container, replacing it with `role="region"` and kept the accessible name
* Where we previously had our Safari fix, I now provide this for every user agent, as without `aria-activedescendant`, nothing is announced on any browser/screen reader pairing
* I appended the label with "suggestions below", which feels wrong, but this is just an example, not a recommendation

Here's the CodePen:

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="js,result" data-slug-hash="YzgWmgX" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/YzgWmgX">
  Search filter for nav links no combobox role (experimental)</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### Potential considerations and improvements

Don't just go copying me and hoping it works in all scenarios, there are a few of things you may need to consider:

* As my search is at the top of the page and the page has hardly any content, I don't need to worry about it being in view when focussed, maybe you do? Ensure that wherever it is situated, when it receives focus it is visible and so is enough of the suggestions box, perhaps scrolling it to the top of the screen upon it receiving focus will ensure at least some suggestions are in view
* Think about the virtual keyboard, as we have an input some users user are going to trigger the on screen keyboard which will at times obscure the "focussed" item. Whilst we cannot and should not do anything about the keyboard, we at least need to make sure there is enough of the suggestions visible to allow a user to decide whether they want to manually close the virtual keyboard, testing this on an iPhone 5 or similar should give you a good idea, as that is a really small phone, compared to today's behemoths. I guess we could get creative and increase the padding dramatically so the "pretend focus" item is always situated at the top of the suggestions dialog, we could also use inline autocomplete, as the current "pretend focus" item's text would appear in the input, so that removes may be helpful
* We could add `aria-current="true"` to an item that matches the current page URL, but we can only do this for the `role="dialog"` and the non-combobox approaches, as we can't add it to a `role="option"` element
* If we had a site with 1000s of products, how do we consider list length? We're not going to put a couple of thousand items in there, are we? So, what should the maximum limit of items in the panel be, should we cap it at 20, 30, 50, more? Too few and we run the risk of having a blind user thinking "Oh, there's only 10 things in there, I'll use that" and they find the thing they wanted is not present and they still need to input enough text to filter the thing they want into the list
* Is there a too many? What are the effects of having a large number of items, does it put users off, make it difficult, increase the cognitive load? I have seen patterns where it may show 20 or so items, then the last item is a "Load more" item, obviously we'd need to manage focus for this functionality and also what would the role of that item be? It should be a button in most cases, but button's can't be present inside a `listbox`, we could do it for the other two examples, with a bit of logic and creativity, I guess
* How do we handle empty queries, typos, search terms that don't match our array? We don't want to assume our users know exactly what to type to filter down the suggestions, many orgs have a "Contact us" page, some have a "Get in touch" page instead, if our users type "Cont" hoping to filter enough to show "Contact us" and we're breaking from convention to seem really "hip", by calling that page "get in touch", then they're not gonna find what they are looking for. Given my view on progressive enhancement, I recommended having a Search page for when JS is not available, it would likely be a good fallback to use that when a user types something that does not match an existing item from the suggestions list, that's backend stuff though and that is on you 

So, there are still a few considerations to discuss and figure out, but most importantly, get some disabled users on board, pay them for their time and conduct some testing. Perhaps at first do not mention the suggestions exist, just see if they find them and use them of their own accord, then for the next test, ask them to use them along with typing part of a string. Take their advice on board and use the pattern that best serves them and make any enhancements they suggest.

Functionally, all of the 3 examples are identical, they all operate in the same way, the differences are with what is announced to a screen reader user, as the roles and properties differ and it is typically only a screen reader user that will be provided with those cues.

## Wrapping up

Looking at the three examples using what I know of ARIA and HTML I'm inclined to assume the third example will be the most difficult to understand for a user that cannot see the component, as most of the auditory information that is provided in the previous two examples is stripped out. I even had to remove `aria-expanded`, as it is not supported on on an input without a `role="combobox"`. I did have to append the accessible name of the input to provide our users with an idea that there are suggestions below.

The first example may well be entirely usable and understandable, it does of course come with the On input Issue, how much of an issue that actually is would depend on various factors, firstly how usable it is to users of with various disabilities and then legislation, internal policies or whatever else.

The second example does remove the non-compliance risk, as we're using actual links to navigate, as opposed to options. Does the using of a `dialog` as opposed to a `listbox` affect a user's understanding of the component? I tentatively say I don't **think** it would, but I'm basing that on what I heard with the screen readers I used and none of them output either "dialog" or "listbox", but I haven't changed any settings on my screen readers, I don't have JAWS and everything I do have is up to date; software wise so I haven't tested on older versions or anything. Remember, this is more of a discussion, than a recommendation.