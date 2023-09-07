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

Tabbing to the link within the iFrame I can see there is no visible focus indicator present, so a user would not know where focus is. Inspecting the styles for the element I can easily identify the issue here when I add the :focus state in the Devtools, it has :focus {outline: 0;} set and no other form of visible focus indicator, in essence, they have removed the browser's default focus indicator, which would have been better than nothing.

![Screenshot of the link, which currently has keyboard focus forced upon it, in the DevTools, which also form part of the screenshot. In the CSS, it is evident that the focus indicator has been removed, intentionally](src/guideImg/dl-screenshot-discoverunifocus.png)

##### Recommendation

I would expect much better here, intentionally not supplying a focus indicator after removing the browser's default is indicator is poor practice. This is an easy fix, I'm going to make the assumption that the colours are predetermined by the devs that created the widget and each institution cannot change them (I did find another implementation on another university and the colours were the same, so I'm confident colours are not customisable). Here's the current CSS for the link (I'm just going to pop all styles into 1 selector, for simplicity's sake):

```css
.kis-widget .kis-widget__cta-block .kis-widget__cta {
  position: relative;
  width: 100%;
  font-weight: normal;
  background-color: white;
  border-radius: 60px;
  color: #307e7e;
  font-size: 1rem !important;
  line-height: 1.2rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding-top: 9px;
  padding-bottom: 9px;
  z-index: 25;
  text-decoration: none;
  position: relative;
  font-family: Nunito Sans, sans-serif;
}
```

That's pretty much it, now let's fix it. I'll use my own CSS just to simplify the above:

```css
 /* Just reset margin and box sizing */
  * {
    box-sizing: border-box;
    margin: 0;
  }

  /* Created a background element, using existing colours */
  .container-background {
    height: 10rem;
    width: 15rem;
    background: linear-gradient(145deg, rgba(36, 131, 132, 1), rgba(39, 134, 93, 1));
    padding: .75rem;
  }

  /* Simplified the CSS - although I don't have to deal with specificity here */
  .kis-widget__cta {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 60px;
    padding: .5625rem 0;
    font-size: 1rem;
    line-height: 1.2rem;
    font-weight: normal;
    font-family: Nunito Sans, sans-serif;
    color: #307e7e;
    background-color: #FFF;
    text-decoration: none;
  }

  /* This is from the existing styles, definitely not mine */
  .kis-widget__cta:focus {
    outline: 0;
  }

  /* Hide the the appended text within, visually */
  .kis-widget__cta span {
    position: absolute;
    height: 1px;
    width: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
  }

  /* Added a focus style for keyboard users, just using an outline and underline */
  .kis-widget__cta:focus-visible {
     outline: 2px solid #fff;
    outline-offset: 2px;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 2px;
  }
```

* I recreated a small background container using the existing gradient
* I recreated the visually hiding of the appended text within the button (more on that later)
* I added the outline back, with a 2px solid white border
* I added a 2px thick underline, with a px offset

Just to visualise what I have done, I will show 2 screenshots, the first is the link in the unfocused state, the second is the link whilst focused:

![Screenshot of the link we have just replicated, which looks identical to the link in the iFrame in its unfocused state](src/guideImg/dl-screenshot-discoveruni-linknotfocus.png)

![Screenshot of the same link, now with focus, visually this has an outline added to the perimenter of the link and a small offset, so the ring has some breathing space, I also added a 2px thick outline and together the 2 effects should make this clear it is a focused link](src/guideImg/dl-screenshot-discoveruni-linkfocus.png)

With just a few lines of CSS it is now clear this link has keyboard focus as the outline and underline do help a user to perceive the visual change. It could of course be improved further, I'd probably change the colour of the background and ensure the text changed to maintain an acceptable contrast, but that's my own personal preference.

#### 1.3.1 Info and Realtionships (A)

Within the source code I can identify several instances of `aria-label` being present on a `<div>` elements, which have no implicit or explicit role. Simply put,` aria-label` is not allowed on a `<div>`, `<span>` or several other generic elements, unless they have a role explicitly added. This is a misunderstanding of ARIA, the `<div>` elements here are simply wrapping elements, used for layout, they have "contents" contained in another node, the contents would be read anyway without adding `aria-label`s unnecessarily to unsupported nodes. I would have previously filed this under 4.1.1 Parsing (A), but as that is no longer a failure and this is not an interactive element so it cannot be 4.1.2 Name, Role, Value (A). The issue here is some screen readers will read the `aria-label` and then read the content, thus creating unnecessary verbosity.

![Screenshot of the DevTools, which is displaying the ARIA misuse on just one of the slides. ARIA labels are used twice on div elements, where they do not need to be. I have annotated the screenshot with red boxes and arrows, to aid in visual identification of the issue](src/guideImg/dl-screenshot-discoveruni-ariamisuse.png)

##### Recommendation

The solution is super simple here: Remove the `aria-label`s, they are not required at all.

#### 1.3.2 Meaningful Sequence (A)

The issue here is caused by the transition, when a user of a screen reader is navigating with cursor keys, they can get into the iFrame to read the text within, the screen reader starts to read the text and then the slide they were on has `display: none;` applied, which can then alter the meaning and order of the information, in unexpected ways.

Using VoiceOver and Safari on MacOS (latest versions at the time of writing), when I use the VO key and cursors to get into the iFrame, it does start to read the statistic, however, as soon as the transition occurs, the virtual cursor position is then ejected from the iFrame and placed on the text node immediately above it.

This effects the sequence of reading, in that it would be difficult to hear the statistics in a sequence that made sense, as every time a transition occurred, the information they hear is interrupted by them being ejected out of the iFrame.

Using NVDA (2023.2) and Firefox (latest version, at the time of writing) on Windows 10 Education (20H2), I am not ejected from the iFrame when the transition occurs, however, what does happen is the screen reader starts to read the statistic (the percentage), then the transition occurs and then the slide changes, so it reads the text of the next statistic, as that is what is now present in the DOM. So to simplify what is happening, the process is as follows:

* Cursor into iFrame
* NVDA reads the percentage of the first statistic, the currently visible statistic
* The slide transition occurs
* NVDA reads the text of the 2nd transition (the new slide that is now visible)

This results in inaccurate information being presented to the user as they are hearing a combination of 2 statistics which could be misleading and therefore, alters the meaning of the text.

As the stats are both regulatory and help users in making informed decisions, it's absolutely vital that they are communicated to screen reader users in a comparable way and the current implementation is likely both incredibly confusing and frustrating for screen reader users as the sequence or meaning is different than what is supplied visually.

This would not be remedied by a pause button, sequence or meaning would still be incorrect. Consider a screen reader user entering the frame, they discover the first item, which I previously recommended to be a pause button. They pause the slides and then proceed to listen to the text, where they will hear a full statistic, but then what about the next statistic? the user would need to move back to the pause button and click it again to play the transition, they'd move into the slide to read the statistic, only it changes and they are either ejected or hear a mismatch of 2 slides.

In this implementation, there is no announcement that anything has changed, I'd be averse to recommend that on the basis that it would get pretty noisy, pretty quickly.

There are no controls for a user to manually move to the next or previous slide, like those that would be present in a carousel, so that is not an option for our users, also, it would be overkill to create a full-blown carousel for what is in affect, 3 sentences.

##### Recommendation 1

Looking at the HTML and the actual widget, it's clear that the only content that actually changes (or needs to change) is the actual statistic and the source for that statistic.

Personally, I believe this slide transition effect is overkill for a few small sentences and is the root of the majority of the accessibility issues.

###### The pros

The first solution I thought of was to hide the actual slides from assistive technologies and use a visually hidden node to provide exactly the same information back and this would be positioned before the slides in the DOM. There are both pros and cons to this approach:

As the slides would no longer be exposed to assistive technologies, as we would use aria-hidden, a user would not be able to cursor into them, so their virtual cursor could not be hijacked. As we would be providing the exact same text on a visually hidden node that is outside of the transition, a transition could not alter the order or meaning of the statistic.

###### The con

Obviously there are sighted screen reader users, some of whom use a mouse, if they are using their mouse to have their screen reader read out content on the page, should they click on the iFrame, then they will not hear the statistic as we have removed it from the accessibility tree. We could get a little clever with CSS to overlay the slide with our visually hidden text, so when the click occurs, it would read out our 3 statistics, but I still feel this could be a little confusing

An example could be something like so:

```html
<iframe>
  <ul class="visually-hidden">
    <li>74% of students agreed staff were good at explaining things - Data for courses in Business and management (non-specific) at The University of Westminster</li>
    <li>73% of students were satisfied overall with their course - Data for courses in Business and management (non-specific) at The University of Westminster</li>
    <li>85% in work or doing further study 15 months after the course - Data for courses in Business and management at The University of Westminster</li>
  </ul>
  <div class="ofsKisClear kis-widget__lead" aria-hidden="true">
    <!-- The content that changes -->
  </div>
  <!-- The CTA content -->
</iframe>
```

The above is something I always try to avoid, as it feels hacky and I'm not comfortable with hiding things that are in plain sight, although