---
title: DiscoverUni widget accessibility case study - 2026
summary: Revisiting the new DiscoverUni widget's accessibility in 2026 to
  determine whether the redesign has addressed all of the issues present in the
  2023 version.
author: dlee
date: 2026-04-20
toc: false
isGuide: true
---
## Intro

I am now writing a new guide in April 2026, following on from the [original guide I wrote in September 2023](https://www.makethingsaccessible.com/guides/discoveruni-widget-accessibility-case-study/). There have been some changes to the widget and the accessibility is better, but is it good enough? As a disclaimer, I have no idea if the folks resposible saw my previous guide, I do know they have not acted upon it, though

The DiscoverUni widget is an Office for Students (OfS) mandated component Higher Education Institutes in the UK must display on course pages.

Essentially the DiscoverUni widget is an embed, it may appear on course specific pages and within the embed it provides information such as:

* The percentage of students that passed the course
* The percentage of students that thought were happy with the course delivery
* The percentage of students that were in related employment within a certain amount of time after completing the course

The first thing to take note of is the domain for DiscoverUni, which is a .gov.uk domain, so as this domain is reserved for government and is part of the Office for Students, then it really is on them to make it accessible centrally rather than the responsibility lying with individual universities. Also, as the content is in an iFrame, it can be super difficult to fix the accessibility issues with DOM manipulation, as it exists on another site, but then why would a couple of hundred institutions be required to patch it up with JS, when it could simply be fixed at source and fixed once?

## The MTA 2023 case study summarised

### So what was the widget like?

Well, to give you an example, here is a screenshot of the widget in question, taken from our own site:

![Screenshot of the widget which contains text with statistics for how many students were in work or further study within 15 months of completing the course. There is also a link within the widget that takes a user to the Discover ui site and displays these details in greater depth.](src/guideImg/dl-screenshot-discoveruni1.png)

This iFrame is not static, on the page I am viewing, there is a transition occurring where the contents fade out and a new statistic is displayed, there are 3 separate statistics, each presented in their own slide and the animation is infinite.

#### What were the WCAG failures?

Whilst there were some positives, unfortunately there were some issues which should not be present, especially as it was created by/for a public sector organisation.

##### 2.2.2 Pause, Stop, Hide (A)

The most obvious issue is the slide transition effect, the content changes between 3 different slides at an interval of approximately 3 or 4 seconds. This animation is infinite, in that it just loops continuously. There is no mechanism to pause, stop or hide this transition. This can be distracting for users, particularly some users that may have difficulty with focusing or those that can become easily distracted.

##### 2.4.7 Focus Visible (AA)

Tabbing to the link within the iFrame I can see there is no visible focus indicator present, so a user would not know where focus is. Inspecting the styles for the element I can identify the issue here when I add the `:focus` state in the Devtools, it has `:focus {outline: 0;}` set and no other form of visible focus indicator, in essence, they have removed the browser's default focus indicator, which would have been better than nothing.

![Screenshot of the link, which currently has keyboard focus forced upon it, in the DevTools, which also form part of the screenshot. In the CSS, it is evident that the focus indicator has been removed, intentionally](src/guideImg/dl-screenshot-discoverunifocus.png)

##### 1.3.1 Info and Relationships (A)

Within the source code I can identify several instances of `aria-label` being present on a `<div>` elements, which have no implicit or explicit role. Simply put, `aria-label` is not allowed on a `<div>`, `<span>` or several other generic elements, unless they have a role explicitly added. This is a misunderstanding of ARIA, the `<div>` elements here are simply wrapping elements, used for layout, they have "contents" contained in another node, the contents would be read anyway without adding `aria-label`s unnecessarily to unsupported nodes. I would have previously filed this under 4.1.1 Parsing (A), but as that is no longer a failure and this is not an interactive element so it cannot be 4.1.2 Name, Role, Value (A), 1.3.1 is the new Parsing for static content. The issue here is some screen readers will read the `aria-label` and then read the content, thus creating unnecessary verbosity.

![Screenshot of the DevTools, which is displaying the ARIA misuse on just one of the slides. ARIA labels are used twice on div elements, where they do not need to be. I have annotated the screenshot with red boxes and arrows, to aid in visual identification of the issue](src/guideImg/dl-screenshot-discoveruni-ariamisuse.png)

##### Advisory

The current widget has visually hidden text that informs a screen reader user that the CTA link opens in a new tab, surely this information is useful to everybody? A voice user may see this if they instruct their software to "Show labels", but typically, only a screen reader user will benefit from this and accessibility is not just for screen reader users, it's for all people with disabilities. Even non-disabled people would benefit from knowing a link opens in a new tab.

Generally speaking, we should leave that choice up to users, there's multiple ways a user can open a link in a new tab:

* <kbd>Cmd</kbd> or <kbd>Ctrl</kbd> along with click or <kbd>Enter</kbd>
* Middle mouse button
* Right click and "Open in new Tab"

If we use `target="_blank"`, we remove that choice for everybody, so everybody has to open in a new tab and they may not want to or it can become disorienting.

##### 1.3.2 Meaningful Sequence (A)

The issue here is caused by the transition when a user of a screen reader is navigating with cursor keys, they can get into the iFrame to read the text within, the screen reader starts to read the text and then the slide they were on has `display: none;` applied, which can then alter the meaning and order of the information, in unexpected ways.

Using VoiceOver and Safari on MacOS (latest versions at the time of writing), when I use the VO key and cursors to get into the iFrame, it does start to read the statistic, however, as soon as the transition occurs, the virtual cursor position is then ejected from the iFrame and placed on the text node immediately above it.

This effects the sequence of reading, in that it would be difficult to hear the statistics in a sequence that made sense, as every time a transition occurred, the information they hear is interrupted by them being ejected out of the iFrame.

Using NVDA (2023.2) and Firefox (latest version, at the time of writing) on Windows 10 Education (20H2), I am not ejected from the iFrame when the transition occurs, however, what does happen is the screen reader starts to read the statistic (the percentage), then the transition occurs and then the slide changes, so it reads the text of the next statistic, as that is what is now present in the DOM. So to simplify what is happening, the process is as follows:

* Cursor into iFrame
* NVDA reads the percentage of the first statistic, the currently visible statistic
* The slide transition occurs
* NVDA reads the text of the 2nd slide (the new slide that is now visible)

This results in inaccurate information being presented to the user as they are hearing a combination of 2 statistics which could be misleading and therefore, alters the meaning of the text.

As the stats are both mandatory and help users in making informed decisions, it's absolutely vital that they are communicated to screen reader users in a comparable way and the current implementation is likely both incredibly confusing and frustrating for screen reader users as the sequence or meaning is different than what is supplied visually.

This would not be remedied by a pause button, as the sequence or meaning would still be incorrect. Consider a screen reader user entering the frame, they discover the first item, which I previously recommended to be a pause button. They pause the slides and then proceed to listen to the text, where they will hear a full statistic, but then what about the next statistic? the user would need to move back to the pause button and click it again to play the transition, they'd move into the slide to read the statistic, only the transition occurs and they are either ejected or hear a mismatch of 2 slides.

In this implementation, there is no announcement that anything has changed, I'd be averse to recommend that on the basis that it would get pretty noisy, pretty quickly.

There are no controls for a user to manually move to the next or previous slide, like those that would be present in a carousel, so that is not an option for our users, also, it would be overkill to create a full-blown carousel for what is in affect just a few small sentences.

## The new 2026 widget

It's fair to say that the widget has improved a little, there are now less issues, however, it is evident that there wasn't an accessibility specialist involved in the redesign as there are some issues that would absolutely be flagged or they should have been.

### Widget variations

There are some variations of the widget, although they appear very limited when viewing the [configuration docs](https://discoveruni.gov.uk/v2/widget/configurator/guidance). An organisation can choose either "responsive" or "vertical", vertical will always display a carousel, whereas "responsive" may do away with the carousel, although I have nor yet found a site that displays the widget without the carousel.

When the widget is configured in "responsive" layout, if the viewport and the host site allow the widget to display at 1280px and above, then the carousel is no more and each stat appears as a small card, all in a nice row, however, 1280px is something that is seldom displayed.

I have located the widget on several university sites and despite having an ultrawide monitor, I have yet to see the widget display all three stats at once. The reason for this is seldom do sites occupy the full horizontal width, they are often contained in custom site wrappers, which is a technique designers and devs will use to have more control over the layout. Whilst I am sure there are sites out in the wild where the site wrapper does exceed 1280px, the only one I found that did used the "vertical" widget, so it would never display all three stats at once, as that particular layout isn't designed to. Obviously the majority of users are viewing webpages on mobiles and tablets these days, so again, it's less likely a user will get the non-carousel option.Finally, as many of us know, many low vision users will set their page zoom higher than 100%, which of course will prevent the widget displaying the nice little row, even when the site's wrapper exceeds 1280px. So, in essence, the "responsive" layout will only ever display the nice row, in the rareset of circumstances. The Office for Students have zero control over each institution's site wrapper, users' devices or indeed their disabilities, but, it's not difficult to find that information out, better reasearch could have shown the problem.

If I take the <embed>'s source code and pop it in a code editor and look at the result, we get the following:

![Screenshot of the widget, in isolation, showing three stats, all in a column, with no carousel features present](src/guideImg/screenshot-19.png)

The above is much more accessible, as it completely does away with the carousel, but obviously it wouldn't display in a row on a smaller viewport.

It's also important to point out that when an item displays in its entirety on a larger screen, but then uses some form of disclosure pattern or even a carousel for smaller viewports, then they would need a way of changing the pattern to have supporting names, roles and properties when it does start hiding stuff, have they done any of that? Nope.

I do not like being critical, so publicly, however, it's vital to understand that that the majority of higher ed institutions have their own accessibility teams, they are all striving to make the numerous websites their respective institutions have - accessible. Many uni websites are in fact, pretty accessble, as far as I know, so, it stings a little that a government department, that must also legally have accessible and conformant sites, etc, build a widget that institutions are required to display, yet it's not accessible or conformant. I'm not for one moment implying that the DiscoverUni site is also non-compliant with WCAG, despite having an accessibility statement saying they are...

Anyway, let's take a look at what the widget issues are.

### 1.4.11 Non-text Contrast (AA) or advisory?

* To me, the most glaring visual issue is the choice of yellow for the donut chart. Now technically this does not fail, as the value is in the centre of the donut, so the yellow meter bit isn't required for understanding the data. However, it's still a poor choice of colour for a chart, if you're going to display data or stats in a chart, then making it perceivable to more folk is obviously the right thing to do. The purpose of the chart element is for at-a-glance information, almost a circle = great, around three quarters = good, less than half a circle = probably not the best, etc.
* It doesn't fail WCAG, but it's yellow (#FCD833) against the white (#FFF) background, which has a very poor contrast ratio of 1.4:1
* The filled part of the donut is yellow (#FCD833) whilst the unfilled section is wispy grey (#EDEDED), which has a lower contrast ratio of 1.2:1
* The wispy grey (#EDEDED) communicates something, right? It's there to tell sighted folk (or at least those with good enough vision to perceive low contrast) that this unfilled part of the donut is where the filled part could have gone, I'm not saying that background is absolutely necessary, but by adding it, they're reinforcing visual information, so I absolutely would write up the track if the number wasn't present. wispy grey against the white background, which is the lowest contrast of our three tests at 1.17:1

Like I said, it doesn't fail, but that doesn't mean a great deal, it just means that whoever designed it didn't do so with all people in mind, as the combinations of colours are flaky, at best and as always, folks, WCAG is the bare minimum, not the gold standard.

#### Solution

Looking at the DiscoverUni website, they appear to have two primary brand colours the previous yellow colour and a dark blue (#012554), they also use other shades of blue throughout the site.

So, how would we approach this? I listed three areas for contrast, although technically, it's two, when done correctly. That's because the whole thing should either have a border with a minimum 3:1 contrast against the adjacent background, or the filled and unfilled parts would both have a contrast of 3:1 against the background. If this were a linear chart, like a progress indicator, then that becomes more important, as where does it start and where does it stop are important aspects that need to be communicated, right? Otherwise, what am I looking at? I've looked at this widget on several universities and when the percentage is perhaps over 75%, it arguably seems clear that is would be a circle. I did find a course at one HE institution that had 35% for one the data points, I would say that's nowhere near enough of a circle for all people to guess the final shape could be a circle. I'm sure there are some data points for some universities where the percentage will be lower than 20%, in which case, without being able to see the track part, what does this random slither of barely perceivable colour mean?

The simplest solution would be to change the color of the filled section to the dark blue, add a border to the unfilled section (the same blue would be fine), then keep the wispy grey or use the yellow in the unfilled section. The colours could be flipped, of corse, but personally, I think the darker more prominent colour should be used for the filled section and the lighter colour for the unfilled, otherwise, it looks like it is in reverse. As long as the border has adequate contrast against the background, then the two colours just need to have an adequate contrast gainst ech other, as the border itself would likely be "subsumed" by the darker colour of the filled in section.

We could of course faff around with both the yellow and grey, to get them to have an adequate contrast against each other, but, I'm not doing that, as firstly, we'd have a designer say "That yellow isn't on brand" and secondly, yellow is always going to be a struggle on light backgrounds and by the time you get something "compliant", it's no longer yellow.

### 1.4.11 Non-text Contrast (AA)

The pips for the slides have active and inactive colours, these communicate visual information. The widget I am looking at now has three slides, I can look at the pips as someone with relatively decent sight and determine that I am viewing slide 2 of three. This is a fail as a wispy grey colour (#D5D5DC) has been used for the inactive pips against the white (#FFF) background, and there is a contrast ratio of just 1.46:1. Again, at a minimum this must be 3:1

#### Solution

A darker border with a minimum contrast of 3:1 against both the white background and the wispy grey pip colour will be sufficient. This will create to visually distinctive shapes, a circle for the current slide and rings for the inactive slides.

### 1.1.1 Non-text Content (A)

The pips for the slides communicate visual information, that information is not available in text or as a text alternative, such as ARIA.

#### Solution

I would not necessarily expect the pips themselves to have a role and accessible name, as they are not interactive, but they are there, they do communicate something, so the slide number of number of slides should be available somewhere within the slides. We'll pick this up at the end, as most of the issues can be resolved by using an "acceptable" carousle pattern.

### 1.3.1 Info and Relationships (A)

There are a number of issues that fail this checkpoint, I'll list them, first:

* The pips are not programmatically associated to the main slider or there is no alternative that communicates the same information
* The main slider does not programmatically group the slides
* The Previous and Next buttons are not programmatically related to the slides

#### Solution

We'll pick this up at the end, as most of the issues can be resolved by using an "acceptable" carousel pattern.

### 1.3.2 Meaningful Sequence (A)

The visual reading order does not match the programmatic reading order. Looking at the main body of the slide, it is visually evident it is a "self-contained" widget, it has a chart, a heading, some text, some pips, some controls and its background is white against a significantly darker background outer container.

The expectation is that once I am in the "slide" widget, the sequence of reading (usingf a screen reader) somewhat matches what is visually presented, it can of course be different, as long as it does not affect the meaning.

1. Navigating with a screen reader, using the virtual cursor the reading order is, as follows:
2. Heading level 1 "Official student data from DiscoverUni"
3. 82%
4. Heading level 2 In work or doing further study 15 months after the course
5. The Data displayed is...
6. Discover Uni is an official source of information...
7. DiscoverUni logo, image
8. Link, see all course data, see all course data opens in a new window
9. Previous question, button
10. Next question, button

This is slightly off, as a screen reader user will likely be navigating with their virtual cursor and each time after they have read the slide, the cursor will then move to the image, text and "See all course data" link, in the side area, which is static; only then will it move to the controls. It's important to remember that a blind screen reader user will not know how much content is present per slide, so will likely be confused that when they have read the content, they have to then move into the side area, before moving to thecontrols. I would imagine that the majority of screen reader users would figure out the problem and press <kbd>Tab</kbd> each time their virtual cursor moved to the image in the side area, but, that doesn't make this pattern correct, it's still wrong.

This issue does not appear to be present when opting for the "vertical" widget in the configuration setup.

#### Solution

We'll pick this up at the end, as most of the issues can be resolved by using an "acceptable" carousel pattern.

### 4.1.3 Status Messages (AA)

If a screen reader user were to change the slide, how would they know anything has happened? There is no announcement, just silence.

#### Solution

We'll pick this up at the end, as most of the issues can be resolved by using an "acceptable" carousel pattern.

### 4.1.2 Name, Role, Value (A)

A carousel or slider needs to communicate what it is, its name and its current state so a user knows what it is, what to expect and how to interact with it. None of this information is present.

#### Solution

We'll pick this up at the end, as most of the issues can be resolved by using an "acceptable" carousel pattern.

### Advisory

The controls for the slides have the AccNames as "Next question" and "Previous question", they're not even questions, they're statements or answers. They were probably questions at one point, but they're explicitly telling us students' responses, so those questions have been answered.

### Solution

Language matters, combined with all the other aspects of accessible information that is lacking from the carousel, it matters that bit more, here. Perhaps I'm being pedantic, but ultimately, they're nbot questions, so something like "Next stat", or words to that effect will be much clearer.

### Carousel solution

Carousels are often unnecessary, they do have their uses, at least in my opinion, but that would necessitate them being built accessibly and also being the correct pattern for the job. There are times when I find them useful, such as on a product card or other listing, so I can slide the images to look at different colours, angles or anything else, without having to click the link to the product page. Carousels get a hard time, because they're mostly rubbish, so this is often warranted. Are they "needed" here? Probably not, why hide important stats behind widget controls? I have a page open for another university, there are seven separate DiscoverUni widgets on this page, each has three slides, I get how having 21 unique facts in 21 separate panels may take up a vast amount of the page, but, these are showing me seven variations of a similar course, undergrad, combined masters and everything in between. I know this may sound a little wild, but, perhaps just have a page with each variation of the course and show the relevant stats there? Then just three stats per page, which, in reality, doesn't nedessitate a carousel.

There are several solutions, here:

* DiscoverUni could make an additional layout option "Column" (or words to that effect), which would simply do away with the carousel and display each of the three stats in a column for smaller viewports and if the 1280px is ever reached, display them in a row
* Add or remove the releavant ARIA with JS, depending on the current layout of the widget. If the widget does reach that 1280px when the site loads remove the ARIA, etc, if it does not or the user alters their viewport in some way, shoehorn it back in. There is a little over-engineering involved with that approach, but nothing we haven't done before
* Redesign the whole thing, it's three stats, do the need to occupy as much space as they do, could they have used sparklines? did they even need to use the (low contrast) meter charts? Could it have just been three rows of text, with a nice prominent number showing the percentage?

I think the column approach would be best, it's not reliant on manipulating the DOM with JS to shoehorn or remove in the required accessibility information, it displays all three stats at all times, without the unnecessary faff of clicking through a pointless carousel, the cards could change shape from squarish on mobile, to wider rectanfles as the viewport gets larger. I'm just going to go with that and rustle up a solution. Disclaimer, I'm just going to use their code and better it. This is my first time doing this, is it even legal? 

* Well, it's on my employer's website, so it's "our" code, right?
* I'm doing this non-commercially, I am being paid by my employer, but the money is the same as if I were doing something else and my employer does not financially benefit from this
* I'm acting on the behalf of disabled people, as that is my actual job, I test websites to highlight the accessibility issues, so developers can fix them, to make them more usable for disabled folks
* I'm doing this for educational purposes and critique
* DiscoverUni has a .gov.uk domain and is therefore subject to Open Govenment Licensing, which permits me to copy or modify their code and content, as long as neither of those are owned by a thrid party (such as images, etc), as long as I give accreditation

So, here we have it, I am doing all of the above, I have copied the entire <embed> from my employer's (University of Westminster) website, but it is a widget created by the Office for Students, as part of their DiscoverUni site and services, so I attribute them as the code creators.
