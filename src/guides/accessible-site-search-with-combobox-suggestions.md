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

I'll list four different implementations here, just to show how there isn't a universally agreed pattern and how each team has approached the issue.

### Apple

I accessed the [apple.com](https://www.apple.com/) site and tabbed to the "Search Apple.com" button, which is located in the site's header, this button is visually presented as a magnifying glass. When I click that button (or link with `role="button"` as it actually is) the search panel expands into view. I am presented with a text input ( and below that input are a list of "Quick links", I'd like to think these are the top links folks search for, but they're probably links to pages that will generate the most revenue.

Once I start typing, that list of Quick Links then becomes a list of "Suggested Searches", which of course starts filtering based upon the characters I type. Looking at the code in the Web Inspector (yup, I'm using Safari) I can see that Apple has not gone for the ARIA `combobox` pattern at all, it's simply a text input and an unrelated list of suggestions, well they are all wrapped in a `<form>` element, so I guess there is some relationship there, but is that relationship programmatically determinable? I wouldn't say it is.

Upon typing to narrow down results, if I pause typing whilst VoiceOver is running, it does announce "\[Count of] total results" and pressing the down arrow will move to the items in the suggestions and I am able to navigate them like I would a `combobox`. So there is some audible information that provides a cue there are some suggestions.

Is there enough information here for a screen reader user to understand the pattern? A sighted keyboard user who started typing and saw the suggestions change may find that fine, they are of course generally oblivious to the ARIA roles and properties of UI components, as they rely upon visual affordances. But what about a screen reader user? They would typically rely on roles and properties to understand relationships and interaction patterns. These suggestions can also be reached with the <kbd>Tab</kbd> key too, so even if the user was unaware they could use the cursor keys, they could also find them by tabbing to them. The five suggestions are quite restrictive though, in that five is a small number, it is quite possible to type a few characters, tab through the 2 buttons into the list and discover that the characters you typed weren't quite granular enough to filter down the suggestions to exactly what you wanted, because you used the <kbd>Tab</kbd> key, you can't just continue typing, you have to reverse <kbd>Tab</kbd> back up into the input and maybe at this stage, our screen reader user would be wondering why they bothered attempting to use the suggestions at all?

Apple have some of the world's smartest minds working there, they do some awesome accessibility work, perhaps they found this pattern to be best for screen reader users after user-testing with them? Maybe they used this pattern because they realised the same issue as we will encounter (Which is the same issue in the next examples)? Whatever their reason, it is an interesting approach and I am genuinely curious how screen reader users would rate this approach compared to others.

### Google

I'm referring to the search that you can access after typing into the browser's, errm search input. The [Google.com](https://www.google.com/) search page, this one uses a somewhat similar combobox pattern to Sarah's, although this one still has aria-owns which was only recommended in older ARIA specs. If you read Sarah's article (fully), which I hope you did, she points out the issue with using aria-owns on an input, which of course creates a parent-child relationship and this was problematic. Now in ARIA 1.2, we use aria-controls, which just means in layman's terms if you interact with this thing, it will also have a effect on this other thing. Google have opted for both aria-controls and aria-owns, the reason for that is unclear to me.

Now, remember when I said there is an issue we will encounter using combobox for site search? So looking at [WCAG 3.2.2 On Input (A)](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html), it states "Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behaviour before using the component." It then goes on to state that "So checking a checkbox, entering text into a text field, or changing the selected option in a list control changes its setting, but activating a link or a button does not". So, we are in fact causing a change of context here, in that the entire page that loads is a new context and navigating using an role="option" is actually quite unexpected.

We could of course do a couple of things to meet the 3.2.2 criterion:

* We could provide a submit button, but that may get a bit of pushback, as it's adding an extra step, in that through common conventions (be they right or wrong), pressing Enter on the selected role="option" in a site search will load that page
* We could advise the user of this change beforehand, again pushback will likely come into play here, you know the drill "hey, we need instructions before this control so people know it will do X", "No, no way am I putting text on my clean UI, it's clutter"

We can't just go conveniently visibly hiding these instructions from all but screen reader users, as well, not all disabled people use screen readers and we need to consider all disabled people.

Is Google's search usable? Probably, I mean it is the most popular search engine and disabled folks undoubtedly use it to get places on the web. Maybe initially this pattern was odd or confusing to some screen reader users and they just learned that this is the Google way or maybe it was intuitive from the get go? Is it compliant? It's hard to see how it can be when clicking a role="option" loads a new page.

Obviously usability should always be the main consideration, making users happy because they can complete tasks is more satisfying than not having to write up a failure. Is this a shortcoming of WCAG, is there something missing in ARIA or are Google just plain wrong?

### MDN

Many of us are familiar with [MDN (Mozilla Developer Network)](https://developer.mozilla.org/en-US/), as we may visit often to learn syntax or understand something related to web technologies a little better. MDN have a combobox in their site header and looking at the HTML for the input alone, it contains all of the roles and properties that Sarah's deep dive used. Where this one gets a problematic is the actual suggestions in the related listbox, which do have role="option", which are required children for a listbox, but interestingly, MDN have decided to place a link inside the role="option" elements.

Role="option" is programmatically the same as an <option> you would typically associate with a <select> input. Whilst a role in itself doesn't really do anything, the expectation from the user agent is that you make this item interactive, after all, it is an option that can be selected. As the ARIA spec and user agents expect this element to be interactive, popping another interactive element inside it is actually invalid ARIA and of course when we use ARIA, we need to do so responsibly, as the effects can have all manner of consequences for our users.

What are the effects of this pattern? I'm not actually going to test it, because I don't have all versions of screen readers, all screen readers, all browsers or enough time. But, as an excellent resource for JavaScript, CSS, HTML and other web technologies maybe we could expect them to also only use ARIA according to the spec? Although, if they have done user-testing and users say this is fine, then that is always going to be better than a compliance checklist, but I guess the thing with legal compliance is, you either comply or you don't, so perhaps it can be a little risky with the powers that be, especially in some countries?