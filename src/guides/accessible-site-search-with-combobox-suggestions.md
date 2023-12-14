---
title: Accessible site search with combobox suggestions
summary: A common UI pattern is a site search input that comes with a list of
  suggestions, where each suggestion is a link. Let's look at what we need to
  consider
author: dlee
date: 2023-12-07
toc: true
tags:
  - HTML
  - ARIA
  - JavaScript
  - Component
isGuide: true
---
## Site search with suggestions

We have all encountered those site search patterns where as we start typing or focus on the input, a box displays underneath the input and it will filter suggestions based upon the characters typed into the input. All major search engines use these patterns, so when you Google something, Bing it (that will never sound right) or whatever else, you'll typically start typing in an input and it will display suggestions, based upon matching the characters you have typed. They are of course also very common on eCommerce sites and most sites where there is a tonne of content.

Functionally, they act almost identical to the combobox pattern, with one major difference, a combobox usually displays a list of items with role="option" and it will do something on that page or set a selection when a user makes their choice.

In essence, it is a combobox in that if it quacks like a combobox and walks like a combobox, then it probably is, only this one flies to another page, which does create an issue that seemingly has no definitive answer.

I couldn't talk about comboboxes without linking to [Sarah Higley's amazing deep dive into comboboxes](https://sarahmhigley.com/writing/select-your-poison/), this is my goto for most combobox recommendations, as it is super detailed. Sarah's comboboxes are for displaying suggestions for options, picking fruit etc, something that will not navigate to a new URL, so this guide does differ somewhat, but also because I'm not as smart as Sarah.

## Ok, how will this one differ?

There will be a few minor differences, but in general they'll be super similar and I'll point out where we have an issue that may be problematic, so as an advance waring, please do not take this code and think it is immediately accessible or compliant.

## Let's look at some other site searches from around the web

I'll discuss several different implementations here, just to show how there isn't a universally agreed pattern and how each company has approached the issue. There will be limitations with my findings here, in that visually, they all look somewhat the same, as there is an input which will display a panel of suggestions below it. Sighted users will generally be familiar with the pattern, they have no idea what roles and properties the components use, as much of this information is only communicated to screen readers, although it can of course affect other assistive technologies such as speech input etc.

The information that is passed to a screen reader comes from the roles and properties, a screen reader user who cannot see the interface will of course rely on certain roles and properties, along with names to understand a component, its purpose, how to interact with it. I cannot speak for screen reader users and I have no anecdotal evidence to suggest any of the following patterns is more accessible or less accessible than another to a screen reader user. I'm just making observations and this is primarily to discuss the different patterns in use across popular sites.

It is of course safe to say that if the suggestions offer value to some users, then that same value must be afforded to all users, so in the case of a screen reader user that cannot see the suggestions appear and filter, they need to know they are there and how to get to them should they wish to use them.

### Apple

I accessed the [apple.com](https://www.apple.com/) site and tabbed to the "Search Apple.com" button, which is located in the site's header, this button is visually presented as a magnifying glass. When I click that button (or link with `role="button"` as it actually is) the search panel expands into view. I am presented with a text input and below that input is a list of "Quick links".

Once I start typing in the input, that list of Quick Links then becomes a list of "Suggested Searches", which of course starts filtering based upon the characters I type. Looking at the code in the Web Inspector I can see that Apple has not gone for the ARIA `combobox` pattern at all, it's simply a text input and an unrelated list of suggestions, well they are all wrapped in a `<form>` element, so I guess there is some relationship there, but is that relationship programmatically determinable? I wouldn't say it is.

Upon typing to narrow down results, if I pause typing whilst VoiceOver is running, it does announce "\[Count of] total results" and pressing the down arrow will move visual focus to the items in the suggestions list enabling me to navigate them like I would a `combobox`. So there is some audible information that provides a cue there are some suggestions.

Is there enough information here for a screen reader user to understand the pattern? A sighted user who started typing and saw the suggestions change may find that useful, they are of course generally oblivious to the ARIA roles and properties of UI components, as they rely upon visual affordances. But what about a screen reader user? They would typically rely on roles and properties to understand relationships and interaction patterns. These suggestions can also be reached with the <kbd>Tab</kbd> key too, so even if the user was unaware they could use the cursor keys, they could also find the suggestions by tabbing to them. The five suggestions are quite restrictive though, in that five is a small number, it is quite possible to type a few characters, tab through the two buttons into the suggestions list and discover that the characters you typed weren't quite granular enough to filter down the suggestions to exactly what you wanted. Because you used the <kbd>Tab</kbd> key, you can't just continue typing to further filter, you have to <kbd>Shift</kbd> & <kbd>Tab</kbd> back up into the input and maybe at this stage, our screen reader user would be wondering why they bothered attempting to use the suggestions at all?

Perhaps Apple found this pattern to be better for screen reader users after user-testing with them, assuming they did? Maybe they used this pattern because they realised the same issue as we will encounter (Which is the same issue in the next examples)? Whatever their reason, it is an interesting approach and I am curious how screen reader users would rate this approach compared to others. 

### Google

Using the [Google.com](https://www.google.com/) search page, this one uses a somewhat similar combobox pattern to Sarah's, although this one still has `aria-owns` which was only recommended in older ARIA specs. If you read Sarah's article (fully), which I hope you did, she points out the issue with using `aria-owns` on an input, which of course creates a parent-child relationship and this was problematic. Now in ARIA 1.2, we use `aria-controls`, which just means in layman's terms if you interact with this thing, it will also have a effect on this other thing, that isn't a child. Google have opted for both `aria-controls` and `aria-owns`, the reason for that is unclear to me.

Now, remember when I said there is an issue we will encounter using combobox for site search? So looking at [WCAG 3.2.2 On Input (A)](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html), it states "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behaviour before using the component." It then goes on to state that "So checking a checkbox, entering text into a text field, or changing the selected option in a list control changes its setting, but activating a link or a button does not". So, this is in fact causing a change of context here, in that the page that loads is a new context and navigating using an `role="option"` is still changing a selected "option".

This fails simply because it is an "option", but it's only an "option" programmatically, in that visually it doesn't look like a `<select>` and `<option>` pattern as the operating system styles  a list of `<option>`s in its own way, whereas these are fully custom elements that the developers have full control over. Would a user that does not use a screen reader have any idea they are "option" elements? No, of course not, so are their user expectations met when they start typing into the field and the suggestions display, would they expect to click a suggestion and navigate to a new page? I think given that this type of component is commonplace and this is a search engine, a sighted would expect that behaviour.

Quite interestingly, should I use arrows to navigate to the suggestions, neither "option" nor "link" is announced on any result in VoiceOver/Safari, the only thing announced is the actual text. The `role="option"` is present on the suggestions, but it's just not being passed to VoiceOver. The reason this is happening is because as a user arrows up or down the suggestions, the value of the input changes to match the text of the current "option", so that change in value is what is actually announced. Should I navigate with the virtual cursor to actually get inside the listbox, I do hear the list enumeration and the text, but still not that the item is an "option". 

Should I use up and down arrows with NVDA and Firefox, I do hear the list enumeration and the suggestion text, still not the role of "option" though though, even though it is present. I'm sure if we dug deep enough, we'd find out why that is the case, would that be odd or confusing for screen reader users or would it in fact be super clear and concise?

### MDN

Many of us are familiar with [MDN (Mozilla Developer Network)](https://developer.mozilla.org/en-US/), as we may visit often to learn syntax or understand something related to web technologies a little better. MDN have a search filter in their site header and looking at the HTML for the input alone, it contains all of the roles and properties that an ARIA 1.2 `combobox` uses. Where this one gets a problematic is the actual suggestions in the related `listbox`, have `role="option"`, which are required children for a `listbox` (you can also use `role="group",` but they must have `role="option"` children present), but interestingly, MDN have decided to place a link inside the `role="option"` elements.

As `role="option"` is fundamentally the same as an `<option>` as far as assistive technologies are concerned it is only allowed presentational children, not interactive elements. Whilst a role in itself doesn't really alter the way something behaves, the expectation from the user agent is that you make this item interactive, after all, it is an "option" and options can be selected. As the ARIA spec and user agents expect this element to be interactive, popping another interactive element inside it is actually invalid ARIA and of course when we use ARIA, we need to do so responsibly, as the effects can have all manner of consequences for disabled users.

Similar to the Google pattern, this does not announce the role of "option" or even "link", it reports each item as a text element in VoiceOver. Quite annoyingly, it doesn't work correctly, in that with VoiceOver running, if I press down arrow, it closes the suggestions panel, so I have to navigate to the options using the virtual cursor and then get into the `listbox`. the problem with that is the input now doesn't have focus, so a user cannot continue typing to further filter the suggestions.

In Firefox with NVDA, I can at least use the up and down arrows and again, there is no role announced, just the text and list enumeration.

### Amazon

Amazon does not use the combobox pattern for their site search, typing a few characters into the field with VoiceOver running unfortunately did not give any audible indication that there were suggestions present. If a user does not know these helpful suggestions are present, then they're not helpful to them at all. As with all of the other examples, somebody could argue that there is an "alternative way" in that the user can search by using the input, but that's still not comparable, because there's no "shortcut", so to speak. I'm just a lazy web user, I don't need shortcuts, but I appreciate them. A person with a disability would in many cases benefit from actually being able to use these handy shortcuts way more than a lazy web user, like me. 

This one is quite disappointing, even if it simply announced the presence of the suggestions, like Apple's it would at least give users a clue to its presence.

## Overview of site searches

We looked at four different implementations and we could have gone on forever, as seldom are the patterns the same under the hood. I'm not saying it is important that a screen reader hears that it is an "option" because that implies that no change of context should automatically occur (without warning). Which begs the question, what should they hear if they access the suggestions? Well ultimately it's a link as it navigates to a new URL, but we cannot have links in a `listbox`, at least we cannot have their semantics exposed, we can of course add `role="option"` to them, but then we are back at square one, assuming that role is announced at all.

Apple's are announced as links and it does inform a screen reader that there are a certain number of options available. It does not have `aria-controls` present on the input, which I know doesn't do a great deal due to lack of screen reader support, it does create that programmatic relationship.

I have to admit to not having any data on how often a blind screen reader user will use the suggestions, I can imagine scenarios where they are not as helpful to an unsighted user as they are to a sighted user, but that is always going to differ from user to user, from site to site, browsing history and even from query to query. If a user is searching for something that they have previously searched for before and that input stores their previous searches, they could of course be super useful. More obscure sequences of characters, perhaps an author's name for example may pretty much guarantee that the suggestion will appear, so that could be helpful, there are lots of scenarios where they could indeed be super useful to screen reader users.

As it is critical that we consider all users when developing sites and the components they are built with we need to ensure that we ensure they work for screen reader users too, then they are in the best position to decide whether they use it or not, choice is tool that allows users to operate sites in a way that works for them.

## How should we build one?

I don't have a definitive answer here, I'm afraid. If I had the resources available to me, I'd quite happily pay for some user testing, to test several patterns to determine which one seemed the most intuitive, especially to screen reader users. We can build a few patterns though and list the pros and cons of each, then if you're viewing this page to find a solution, maybe you can conduct the user testing and base your decision on that?

## Let's build some examples

As always, this isn't a design demo, so I'm just going to make them look OK, I will of course ensure contrast and focus are perceivable, but they'll look relatively basic, just to reduce the amount of work I need to do. Also, there are some differences between the examples we discussed, most of them redirect a user to a search results page, whereas the Mozilla example directs a user to the actual page, we're going to be doing the latter

### The combobox and option approach

We will only add the combobox when JS is available, let's pretend we have a backend that handles the form submission, we just have a form with role="search", an input with aria-labelledby="\[ID_of_button]" and then finally, we have a <button> which contains two <span> elements, one contains the legally required magnifying magnifying glass (If you read your law from design magazines that is) and the other contains the to-be-hidden text label, because that's usually what we have to work with.

There is actually a new HTML element <search> which has pretty good browser support right now, with just a couple of browsers on mobile not having implemented it, I'm not going to use it here just because I have never got round to using it or playing around with it, I'm not putting a placeholder in this, because meh and I'm also having a button, even though it's getting more common that search fields don't have them, again, meh.

```html
<form class="search__wrapper" role="search">
  <input class="search__input" type="text" aria-labelledby="sBtn">
  <button class="search__btn" type="submit">
    <span>
      <svg aria-hidden="true" focusable="false" stroke="#000" stroke-width="9.8" viewBox="-19.6 -19.6 529.6 529.6"
        height="1.25rem">
        <path
          d="M484.1 454.8 373.6 344.2a210.6 210.6 0 1 0-29.2 29.2l110.5 110.5c12.9 11.8 25 4.2 29.2 0a20 20 0 0 0 0-29.1zm-443-244a169.5 169.5 0 1 1 339 0 169.5 169.5 0 0 1-339 0z" />
      </svg>
    </span>
    <span class="visually-hidden">Search</span>
  </button>
</form>
```

Now, I'll just style it, i'm not going to explain any of this.