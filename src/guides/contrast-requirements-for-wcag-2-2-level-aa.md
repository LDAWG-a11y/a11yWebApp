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

There are dozens of ways to find the contrast of an element and its background, I don't really want to focus on this too much, as sometimes I'll use [WebAIM's Contrast Checker](https://webaim.org/resources/contrastchecker/) and others I'll use [TPGi's Color Contrast Analyser](https://www.tpgi.com/color-contrast-checker/), the latter being the better as you don't have to go digging around in the CSS and potentially converting colour formats to Hex so you can paste the values in to WebAIM. The other obvious benefit is you can just select the picker and drag it anywhere across your desktops, but again, it's unlikely there is a keyboard alternative that offers that level of precision (I haven't checked), so whatever tool, browser extension or website you use, just use that if you are comfortable with it.

## A quick warning, before we start

All of the examples I am going to create will be actual examples using HTML and CSS. I'm going down this route, as opposed to using screenshots just so you can inspect the code or use tools you are familiar with, you may even wish to determine which semi-automated checkers pick up some issues and which don't. Obviously many of these elements will fail WCAG, many will have absolute (px) font sizes and they'll generally be rubbish, but in order to know what is bad, I gotta give you the bad stuff, I guess. Most of the interactive elements will be somewhat redundant, unless explicitly stated, a button won't do anything, a link won't go anywhere and an input won't do anything with the text you may errm, input, unless there is an instruction to do something to cause a change in state, etc.

## 1.4.3 Contrast (Minimum)

We're starting with this one as it is perhaps the least complex of the three, there is not a great deal to reveal here as this particular SC applies only to text and images of text.

### Summary

Text and informational images of text have a minimum contrast of 4.5:1 against its background, except for:

* Text that is both of a size of at least 18.66px and has a font weight of bold
* Text that has a font size of at least 24px (any font-weight is technically permitted)
* Incidental text, photos that contain text, graphics where the text isn't relevant to the image's subject, or decorative text
* Logos, yup, your company logo doesn't have to pass any contrast requirements
* Text that forms part of an inactive user interface component

#### Summary explained

##### Size and weight of text and images of text

* So, text that is 23.99px and smaller and has a font-weight lower than bold (or lower than 700) must have a contrast ratio of 4.5:1 against its background.
* Text that is between 18.66px and 23.99px and has a font weight of bold (700) or greater only needs to have a contrast of 3:1 to comply with WCAG
* Any text that is 24px or greater, irrespective of font-weight only needs a 3:1 contrast against its background

The good thing with these is when you are testing actual text and you know the values, most tools will tell you that they pass or fail at given size and/or weight combinations. where this does get a bit hairy is testing the size and/or weight of images of text. The DevTools can't help us here as it is an image and that means we can't find out the text size, font-family or the font-weight using the inspector. We can test the background and text colour with Color Contrast Analyser, as it does allow us to use the grab colour information from anywhere on our screen(s) (desktops).

So, what do we do when we discover some text that has a contrast of 3.5:1, as an example and we suspect it either lacks sufficient weight or size? Good question. Well the first thing we should do is determine if this image of text actually needs to be an image or could it just be actual text? If we could achieve the exact same result (or close enough, but accessible) by using actual text as opposed to an image then we simply fail it against [SC 1.4.5 Images of Text (AA)](https://www.w3.org/WAI/WCAG22/quickref/?showtechniques=2411#images-of-text). If it is something that cannot be recreated with web technologies, such as a photograph of an historical document, or whatever and the the purpose of the image to show the actual document. In this case we need to determine if there is a suitable text alternative close by.If there is not a visible actual text alternative which at the very least includes a verbatim. If the document was in old cursive, faded handwriting and the pages were yellowed with age, or whatever, and it was clear that the contrast was low, I'd be expecting and requesting that a text-alternative be present close by and this would be text that can be accessed by everybody, not just alt text and if that weren't the case, I would fail it against [1.1.1 Non-text Content (A)](https://www.w3.org/WAI/WCAG22/quickref/?showtechniques=2411#non-text-content), if it had alt text, I would mention this as a good point, but would emphasise it does not provide a suitable alternative to low-vision users.

Those two SC's will pretty much cover most instances where we have reason to believe that the text has an inadequate weight or size for its given contrast ratio. I've never personally had to measure a font on the screen using ruler browser extensions or opening it up in Photoshop, fingers crossed that remains the same.

##### Incidental text

This basically means text that really doesn't matter, it doesn't add any information or value to the image or in the case of a photograph, it's just there, we have no control over text in a high street background, when the subject of the photo is a person shopping. In this case as long as the image had decent alt text that stated who was in the image, what they were doing (shopping?) and where they were (Oxford St, London), that would be sufficient, it's irrelevant that there's text in the background that would fail.

##### Logos

Company logos do not need to have adequate contrast against their background for the purposes of WCAG  so if it has ultra low contrast, you don't have a WCAG issue, you may have a branding/design issue, but you definitely still have an accessibility issue as folk may just walk right by your shop as your logo isn't the attention-grabber your designers hoped it would be. Again, just alt text is fine here, but just know, decent contrast is useful in the real world, too.

##### Inactive user interface component

What is an "inactive user interface component"?, well, if it has the HTML disabled attribute then that is definitely inactive. Just adding `aria-disabled="true"` isn't the same as the disabled attribute, as it would still receive focus and a keyboard user may get a little confused. I interpret this to mean either using the "disabled" attribute, or rolling your own, so I would expect it to:

* Not do anything at all or accept any form of input
* Cannot receive focus (`tabindex="-1"`)
* Is hidden from the accessibility tree (`aria-hidden="true"`)

You could add aria-disabled="true" to the above, but that wouldn't be exposed as the element is hidden from the accessibility tree anyway. Anything else is kinda inactive but not actually inactive.

As with most accessibility topics, there's an [Adrian Roselli article that discusses why disabling controls is mostly bad practice](https://adrianroselli.com/2024/02/dont-disable-form-controls.html). So, if you're building or designing a page, then typically you want to try other options before disabling inputs, but that's not the purpose of this article.

### Text contrast examples

Let's take a look at some examples I have rustled up

<table>

<thead>

<tr>

<th>ID</td>

<th>Text element</td>

<th>Pass fail</td>

</thead>

<tbody>

<tr>CM1</tr>
