---
title: DiscoverUni widget accessibility case study
summary: Many UK universities embed the DiscoverUni widget on their sites
  to   display statistics about courses and this has apparently been flagged by
  GDS   in their audits across the sector, let's have a deep dive to understand
  what
author: dlee
date: 2023-09-05
toc: false
isGuide: true
---
## Intro

We're perhaps venturing away from the typical Guides we provide here, in that we're not so much showing you how to make a particular pattern accessible, we're primarily auditing one and then making suggestions on how to improve it.

Essentially the DiscoverUni widget is an iFrame embed, it may appear on course specific pages and within the embed it provides information such as:

* The percentage of students that passed the course
* The percentage of students that thought were happy with the course delivery
* The percentage of students that were in related employment within a certain amount of time after completing the course

The first thing to take note of is the domain for DiscoverUi, which is a .gov.uk domain, so as this domain is reserved for government, then it really is on them to make it accessible. Also, as the content is in an iFrame, it can be super difficult to fix the accessibility issues, as it exists on another site, but then why would a couple of hundred institutions be required to patch it up with JS, when it could simply be fixed at source?

## So what is the widget?

Well, to give you an example, here is a screenshot of the widget in question, taken from our own site:

![Screenshot of the widget which contains text with statistics for how many students were in work or further study within 15 months of completing the course. There is also a link within the widget that takes a user to the Discover ui site and displays these details in greater depth.](src/guideImg/dl-screenshot-discoveruni1.png)

This iFrame is not static, on the page I am viewing, there is a transition occurring where the contents fade out and a new statistic is displayed.

### First, let's outline the bits that do not fail WCAG

In order to be fair, I'll give an overview of some of the common issues I encounter with iFrames that do at least comply on this widget.

#### 2.4.1 Bypass Blocks (A)

First thing's first, it's an iFrame so we check for a title on that iFrame and by inspecting the code, i can confirm the title of "Unistats KIS Widget" is present. Is that a good title? Not really, I have no idea what "KIS" means I searched it up and I'm still none the wiser, also what if there were more than one of these iFrames on the page, but displaying different statistics? Would they both have that same Generic title? probably. I'd recommend as a best practice the title be more descriptive, if there was more than one present on a page and they had identical titles, I'd fail it against 1.3.1 Info and Relationships (A).

#### 1.4.3 Contrast (Minimum) (AA)

The text within (yes, it is text and not an image) has the colour of green (#307E7E) and a background colour of white (#FFF), which gives us a contrast ratio of 4.76:1 and this passes for both small text and large text. This could possibly be a colour we have selected, so other organisations may have different results.

The area to the side does have a gradient background, with white text, so I check that again and both colours used in the gradient do pass, albeit only just with a ratio of 4.51:1

#### 1.4.10 Reflow (AA)

Often iFrames cause whole page horizontal scroll on smaller screens or when zoomed on larger screens, there's no issue with that here, the item stacks so it does not cause an issue where a user would be required to scroll in 2 directions.

#### 1.1.1 Non-text Content (A)

Typically when I encounter small iFrames that look like ads they're typically an image with poor alt text but often with no alt text. The content in this iFrame is actual text, which is good. There is a very small DiscoverUni logo, which does have the alt text of "DiscoverUni", this could be slightly improved by appending the word "logo" to the alt text.

#### 1.4.5 images of Text (AA)

As banner-type iFrames are often an image of text, I'd sometimes write that up as often the same result can be achieved with CSS and HTML, which helps low vision users scale the content without pixelation or distortion. As I pointed out in the previous issue, the content here is actual text, so again, this is good.

#### 1.4.6 Resize Text (AA)

I check to see if the iFrames text resizes along with the rest of the page, as sometimes scaling is blocked and/or absolute units such as pixels are used. This text does scale with the page so this is also useful for users.

#### 2.4.3 Focus Order (A)

Many iFrames contain interactive content such as buttons or links, these can sometimes create an irregular focus order, particularly when the frame content changes over time, as often I find that the non-visible content is not accessibly hidden, it often just has 0 opacity, so is still able to receive focus. On this particular implementation, there are 3 slides and only one ever displays at any given time, `display: none;` is added to the 2 non-visible slides, so they are accessibly hidden, which again, is good.

#### 1.3.2 Meaningful Sequence (A)

Much like the previous issue, static content can often be accessed out of sequence, either because there is some DOM trickery going on or content that should be accessibly hidden is not. There are no issues with that here, the reading order makes sense.

#### 2.4.4 Link Purpose in Context (A)

There is a link in the iFrame with the visible label "see course data", given the surrounding text and page content, this does make sense.

### Now let's look at the WCAG failures

Whilst there are some positives, as outlined above, unfortunately there are some issues which should not be present, especially as it was created by/for a public sector organisation.

#### 2.2.2 Pause, Stop, Hide (A)

The most obvious issue is the slide transition effect, the content changes between 3 different slides at an interval of approximately 3 or 4 seconds. This animation is infinite, in that it just loops continuously. there is no mechanism to pause, stop or hide this transition. This can be distracting for users, particularly some users that may have difficulty with focusing or be easily distracted.

##### Recommendation

I'd simply recommend a pause or stop button for this. As long as that button could restart the animation should a user wish to, this would be adequate. As the transition is quite quick 3 or 4 seconds, some users may not get sufficient time to read a slide, by providing a pause or stop button, these users can at least take the time they need to read the slide, without having to wait for it to loop back through.

This is a pretty straightforward fix, I'll provide a quick code sample below:

```html
<button aria-pressed="false">
  <span class="visually-hidden">Pause</span>
</button>
```

* I'd probably add a pseudo element with a pause symbol inside the button, so there was an understandable visible label.
* Don't change the accessible name of the button when clicked, just toggle the value of `aria-pressed`, as changing the name along with aria-pressed would be confusing and we need `aria-pressed` to indicate the state of the button (it would be fine to change the symbol to a play icon though, in fact, I think that makes the most sense)
* I made the assumption the developers understand how to visually hide things, but still expose them in the accessible name calculation, with a visually-hidden class. If this is new to you, [you can read up about hiding content here](https://www.makethingsaccessible.com/guides/visually-hiding-text/).
* I have not provided any CSS, but I would ensure the icon button has good contrast against the background
* I would make sure that the icon button has a good focus indicator, which is perceivable against adjacent colours
* I'd ensure the icon button was of a reasonable size
* I'd ensure the icon button was the first interactive element within the frame, that way a user can tab to it and turn it off straight away, should they need to
* Functionally, I would likely just toggle a data-attribute on to the animated part of the frame, perhaps data-paused="true" when the pause button is pressed & then when that attribute/value pair is present on the slide, I would simply prevent the animation in CSS

#### 2.4.7 Focus Visible (AA)

tabbing to the link within the iFrame I can see there is no visible focus indicator present