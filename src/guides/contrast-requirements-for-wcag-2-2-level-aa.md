---
title: Contrast requirements for WCAG 2.2 Level AA
summary: "We'll take a deep dive into the 3 contrast requirements that apply for
  accessibility: 1.4.1 Use of Color, 1.4.3 Contrast (Minimum) and 1.4.11
  Non-text Contrast"
author: dlee
date: 2025-02-27
toc: true
tags:
  - Colour Contrast
  - Best practice
  - CSS
isGuide: true
---
## Introduction

We're going to take a deep dive into colour contrast here where we will look into all three WCAG 2.2 success criteria (SC) that apply, at Level AA:

* 1.4.1 Use of Color (A)
* 1.4.3 Contrast (Minimum) (AA)
* 1.4.11 Non-text Contrast (AA)

We're looking at all three together as whilst Contrast (Minimum) and Non-text Contrast have no overlap, Use of colour can in fact create a bit of overlap and perhaps a little confusion, I've definitely be confused or accidentally reported an issue against the wrong SC before, so I guess others have too.

In this guide there will be a lot of "This meets the requirement", this isn't me advocating for something that just meets a specific requirement, but I have to state when something passes and when it doesn't. So, just to be clear that just scraping through the contrast checker for a specific thing is seldom a good idea I'm going to include some "Best practice" type solutions for each section, but as always, they won't be the definitive "Best practices" they'll just be much better than the bare minimum, and, as always, that's because there are often multiple ways of doing something accessibly and also because what works for some users may not work as well for others.

The next section is going to be a bit of a primer which is aimed at folks that may not be too comfortable with the DevTools and getting CSS values, so if you wish to avoid the waffle and you know this stuff, you may wanna skip that bit.

### WCAG thresholds

Just before we start to discuss the individual SCs, we'll just take a moment to understand what WCAG means when it sets a threshold value for an element, it's important to know and understand this as it performs part of the test.

Some WCAG SCs may appear intentionally vague or the tests section in the Understanding Document may appear incomplete, this, I believe, is because websites can contain an unlimited number of components and patters, some of which may not even have existed at the time the standard was last updated and as WCAG is "Technology agnostic" it has often to cover a broad range of implementations and technologies.

The thresholds we are going to look at here are absolute, there is no confusion or ambiguity over the minimum values we are provided with, so from a testing perspective that makes life easier for us as pass or fail is pretty easy to determine, so let's just summarise some of these values:

* When WCAG says the minimum contrast for a specific element is 3:1, it does not mean 2.99:1, or less. It means that the absolute minimum contrast is in fact 3:1 and anything below that is a fail, no ifs, no buts, it's a fail. Sure, it is likely that the human eye may not be able to distinguish the difference between 2.99:1 and 3:1 as the  difference in lightness is so small. But there has to be a minimum value and the values for contrast at Level AA are either 3:1 or 4.5:1 so 2.99 and below and 4.49 and below fail those minimum value tests, respectively.
* Text size requirements. Again, WCAG gives us some minimum values here and there is no wiggle room, no discretion, we can't just pass something because it's so close the difference may be negligible to most humans, but those minimum values exist. So where WCAG says text that is sized at least 18.66px, you guessed it, it doesn't mean 18.65px, it means 18.66px and no less
* Bold font requirements. This may be a little trickier to determine due to the vast number of fonts and styles available on the web. Some "Bold" fonts may actually be much thinner than some "Regular" fonts, so it's quite a difficult metric to understand as how it looks visually can often be misleading. We can at least get the values from a page's CSS though and sometimes be prepared to think "Huh, how is that bold?" type thoughts. In this case, we only really have a single source of the truth and if the CSS says it's bold, then we can't fail it, but we can of course write it as an advisory, weakness, suggestion or whatever else you call your "Passes WCAG, but is naff" issues. CSS will either provide a named font-wight of "bold" or "bolder" or a numerical value of at least 700, as in CSS 700 equates "Bold", so anything that is 700 or higher satisfies the font weight requirement.

### Finding the correct size and weight values

CSS has tonnes of units for most aspects of the interface, we're not consigned to just using pixels, we can use "em", "rem", "vw", "mm", "cm" and loads more, just for height and width alone, colours may use Hex, RGB, HSL and more.

For anyone not overly familiar with CSS, this may be useful to know as ultimately we want be able to determine values that are presented in a unit that makes it easier for us to determine whether the element in question passes of fails.

I do the bulk of my testing in the DevTools, I read code, I find event listeners, I pause and freeze stuff, I look at values and I find all sorts of interesting stuff. I obviously do use assistive tech and even semi-automated checkers, but I just do that later in my process, it works for me, it's just the way I do it. Some folks will perhaps not open the DevTools unless they are running Axe, not everybody knows CSS and HTML, so perhaps there is less of an emphasis on reading code and stuff. So, for these folks, this next tip may be useful to know, if you didn't already.

I primarily use Chrome (I know) during my initial reading the code phase, I'm a creature of habit, I guess and also it is still the most popular browser, so I read the code in there and then test with AT and then switch over to other browsers and test some more. I tell you this as some of my jargon may appear Chrome-centric, so I apologise in advance if that's the case.

So, let's say we some font that looks a little thin, low-ish contrast and it's not that large, whatever the reason, it's enough to make us suspicious enough to look into it. Generally, I'd open the DevTools (see, Chrome-centric) and take a look at the CSS in the Elements Panel (the HTML and CSS), and I would locate the element in question. 

I pondered how far I should go into the DevTools, Inspector, Developer Tools or whatever you call them in other browsers. I do not have a disability that effects my motility or sight, so i am able to visually locate something and then right click it, when I do this it opens the DevTools pretty much exactly where I want it. I'll be honest, I have no idea how to achieve the same with a keyboard, I don't think that exact behaviour is possible? I know I can open the DevTools, but when I use the keyboard shortcuts to do this it always opens on the `body` element which means you may have to trawl through `<div>` soup that is comparable in depth to the Mariana Trench, which if that is the only way, is clearly rubbish. Given that i have no controls over how the DevTools opens or where it highlights a relevant node and I cannot find a way to replicate mouse behaviour on keyboard, I'm just going to avoid complex instructions for actually finding the correct DOM node, as i don't want my guide to favour one particular user group. We're still going to look, though, so I'll stop waffling now.

Take our Home page, let's say for some reason we were concerned about the main heading (it's totally fine), so we want to take a look. Here's a screen shot of our Home page and the DevTools open:

![Screen shot of Make Things Accessible Home page. the DevTools show the node with the text Make Things Accessible, is highlighted in the HTML pane](src/guideImg/screenshot.png)

It was the part of our primary heading that is purple "Make Things Accessible" that I wanted to inspect and in the DevTools there is a lighter highlighted line indicating this is the node I have selected. Forget that our text is obviously accessible, we just want to check a value. In the adjacent CSS panel the Styles pane is showing, at the top of said styles pane there is information about the font-size of that text, which uses a class and an element child selector, like so: `.main__title--home span`, that gets us the `<span>` that contains the text make Things Accessible and that text has the following CSS: `font-size: 4.5rem;` on my screen (it may be different on yours, depending on screen size or zoom level, etc). What is a rem, is it important? Nope, it's a relative unit, it could mean absolutely anything, if I so wanted to I could make 1px = 1rem or 1rem to be 200px, both of which would be a bit silly and make things more difficult. So, as testers, we're not overly concerned with rems and ems and to a lesser extent points (pts), etc, we will generally want pixel values (maybe some folk do use points?) but for our purpose, we just want to check the pixel values and font-weight.

If, in the CSS panel we click "computed" (it's called this in Chrome, Safari and Firefox), we then get the values we want.

![Annotated screen shot of the Make Things Accessible Home page, with the DevTools open. The annotations are arrows, which show the elements panel, the span node that contains the text, the Computed properties pane and finally the computed values for font size and weigh are highlighted.](src/guideImg/screenshot-1.png)

In the above screen shot I've placed a series of arrows and boxes which outline key controls or information points, which in essence is Elements > the DOM node ( a `<span>`) > the Computed pane and finally the CSS properties and values for both `font-size` and `font-weight`. We have the values 72px for the font's size and 900 for the font's weight. Obviously both these values far exceed the minimum requirement for not only Level AA, but also Level AAA (we do try). But now we know the actual size and weight of the text that means something, we know anything above 700 for weight is considered "Bold" and we also know 72px is a very large font, but that information may have been super useful on another site, as it may have failed and we may have been tasked with finding problems to help put right.

### Finding contrast issues

There are dozens if not hundreds of ways to find the contrast of an element and its background, I don't really want to focus on this too much, as sometimes I'll use WebAIM and others I'll use Color Contrast Analyser, the latter being the better as you don't have to go digging around in the CSS and potentially converting colour formats to Hex so you can paste the values in to WebAIM. The other obvious benefit is you can just select the picker and drag it anywhere across your desktops, but again, it's unlikely there is a keyboard alternative that offers that level of precision (I haven't checked), so whatever tool, browser extension or website you use, just use that if you are comfortable with it. If you want to get Color Contrast Analyser, you can [download it from TPGi, directly](https://www.tpgi.com/color-contrast-checker/).
