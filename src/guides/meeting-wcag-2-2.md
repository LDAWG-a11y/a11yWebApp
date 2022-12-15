---
title: Meeting WCAG 2.2
summary: WCAG 2.2 is very close to becoming the new standard and at present it
  adds 9 additional success criteria and removes one success criterion from WCAG
  2.1. This guide outlines what we need to do regarding this new standard and
  how to meet the new requirements
author: dlee
date: 2022-12-13
toc: true
tags:
  - PSBAR
  - WCAG 2.2
  - Monitoring
  - Regulations
isGuide: true
---
## Intro to WCAG 2.2

<div class="callout__warn"><span class="callout__icon"></span><span class="callout__text">This guide is subject to change, as the specification may still undergo some changes, but we will update this guide as soon when and where necessary</span></div>

WCAG 2.2 is currently at the "Candidate Release" stage and it has been there for quite some time, this is the final stage before it becomes "Recommendation" or the new standard. It is anticipated by those working for or with the W3C that WCAG 2.2 will achieve Recommendation early in 2023, likely January.

WCAG currently has 9 additional success criteria (SC) or requirements to meet, in order to "conform to the standard", which are:

* 2 new Level A requirements
* 5 new Level AA requirements
* 2 new Level AAA requirements

In addition, one of the previous requirements is being removed, which is SC 4.1.1 Parsing (Level A), as the working group felt this requirement did not accurately explain the intent and has been the source of much confusion. Whilst the requirement is being removed, it does not remove the requirements to have well formed HTML etc, as these are typically recorded against both SC 1.3.1 Info and Relationships (Level A) and SC 4.1.2 Name, Role, Value (Level A), so we will just be reporting those issues under the most appropriate one of those, for the most part.

## How does this affect the UK public sector?

Well, this may come as complete bombshell, but it does affect us and that is a good thing for our users. On Friday 9th December 2022, [Cabinet Office of the UK Government released updated guidance regarding the PSBAR regulations on the Gov.uk site.](https://accessibility.blog.gov.uk/2022/12/09/some-changes-to-the-public-sector-digital-accessibility-regulations/)

The key takeaways from Cabinet Office's amendments to the regulations are:

* All those organisations that fall under the PSBAR regs will need to meet WCAG 2.2 at Level AA
* The monitoring body will start testing those sites for WCAG 2.2 compliance from "Early 2024"

That gives those of us affected by the regulations a year or so be WCAG 2.2 Level AA compliant, which definitely won't be as much work as when the initial regulations came into law back in 2018. There are a few of reasons I think this will be relatively easy to meet:

* If you have some sites that are WCAG 2.1 AA compliant you only need to test against the new requirements, which are 2 Level A and 5 Level AA requirements (at the time of writing)
* If you and your organisation have viewed accessibility as a people thing, as opposed to a legal thing, you may have accidentally passed some of those requirements, simply by following 'Best practices'
* Accessibility as become the norm, many of us have skilled up, designers, developers, QAs, and accessibility testers alike, so the learning curve will be gentler than it was before we needed these in-house skills and expertise

## OK, so what is new?

I'll break these down, so we know how we can meet the requirements.

### Let's look at the 2 new Level A requirements first

#### [3.2.6 Consistent Help (A)](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#326-consistent-help-a)

This one can be met really easily and shouldn't take any effort at all, this can be met by having any contact details you already have on your sites consistently placed on a page, when repeated across pages. So, if for example your company address and contact details are in the site footer and they appear on multiple pages, they appear in the "same relative order" and use the same labelling. Which basically means all of the links and text remains in the same order on every page it is included on. Obviously it would be super beneficial to provide contact details that have enough alternatives to cater for everybody, for example don't rely solely on social media contact, not everybody has Twitter of Facebook and they'd need an account to contact you on those platforms, and there are genuine reasons for people not wanting to join those platforms. 

I would recommend adding the address, phone number and a monitored email account to the footer and making sure that appeared in the same place, across all pages along with any alternative contact details, also making sure they're in the same relative order.

#### [3.3.9 Redundant Entry (A)](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#339-redundant-entry-a)

This applies to forms where users may be required to enter the same data, at more than one step of a process. As an example, a user is filling out an application form to enrol in a programme of education, at Step 1, they provide their name, email, address and phone number etc, at Step 5, we ask them for their address again, instead of the user having to type those details again, either:

* Pre-populate those fields, with the previously supplied data, depending on the reason for asking for the same data twice or more, it may be a good question to ask why we are and do we have to ask twice? There are valid reasons why a user may have a different daytime number than evening one or a different "current address" than their legal address, so with this in mind, if it's for deliveries or contact, at the minimum, these fields should be both pre-populated and editable
* Offer an option, such as "My home address is different from my postal address", like many of the online stores, where there is an option similar to "My billing address is the same as my delivery address", which saves a user having to type the same data twice

This new requirement appears like there will be a little extra development in capturing user data and ensuring users can either select previously entered data or edit a pre-populated input, but as we'd be storing this information somewhere, on each step, it won't be difficult to achieve where our developers have full access to the code, it may be harder to get suppliers to accommodate this requirement in Customer Relationship Management software or third party payment tools etc, so I assume some tricky questions will be asked, going forward.

### Now let's look at the 5 new Level AA requirements

#### [2.4.11 Focus Appearance (AA) ](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#2411-focus-appearance-aa)

This new requirement somewhat of combines 2 existing requirements, [2.4.7 Focus Visible (AA)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=241%2C244%2C246%2C251%2C312%2C322%2C332%2C412%2C122#focus-visible) and [1.4.11 Non-text Contrast (AA) ](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=241%2C244%2C246%2C251%2C312%2C322%2C332%2C412%2C122#non-text-contrast)and enhances them slightly, to provide users with more perceivable focus indicators. It's worth noting that this particular requirement is "At risk", as there doesn't appear to be general consensus over the wording of the requirement. So this requirement may not make it to Recommendation stage, which would be a shame, as it certainly enhances the visibility of focus indicators. As this is "At risk", I'm not going to go into any depth right now, but if the W3C can agree on the wording and get this requirement out the door, I'll add some CopePen examples for a wide variety of use cases.

#### [2.4.12 Focus not Obscured (Minimum) (AA)](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#2412-focus-not-obscured-minimum-aa)

This particular requirement requires that interactive elements on webpages do not become wholly obscured by author-created components, when they receive keyboard focus. The usual suspects that cause this behaviour are sticky headers and footers, overlay type 'drawer' menus or navigations, 'toast' messages, chat widgets, non-modal dialogs and other disclosure patterns that obscure content. This is one of the new requirements that I believe we would mostly hit by accident, as my mindset is people rely on focus indicators to move around webpages, they need to see that focus indicator at all times when they tab between interactive elements, so I always recommend fixes when focus is obscured by something. 

Interestingly the requirement only requires that "some part of the component (and as result, normally part of its focus indicator as well) not be obscured by other author-created content". How much constitutes "some part" is anybody's guess, half, a quarter, a couple of pixels, who knows? There is a AAA enhanced requirement that builds on this, and does not allow any part of the component or its focus indicator to be obscured by author created content (Author created content is essentially our code, content and components etc, not the browser's). This doesn't apply to modal dialogs, if they're coded correctly, as modal means the underlying content is not available, so focus should advance to a suitable place within the modal dialog and naturally, focus should be trapped within.

One example I can see being a huge problem is chat widgets, you know those ones that usually start with a small control at the bottom right of a page, but after a short while they expand automatically to show the full chat box? If a user's focus was already in that area and the chat panel pops over where their focus is and wholly obscures it, instant fail. This would of course apply to those intrusive dialogs that pop up for cookies, subscriptions, notifications and anything else somebody erroneously thought would be a great idea to interrupt users with.

I can see this one coming into play as we resize our viewports, change orientation or adjust zoom or font sizes, as something may initially look like it passes on a desktop, as there may not be any interactive elements in that part of the footer, for example, but as we reduce the viewport width and the site adapts, we may suddenly have wholly obscured focus indicators.

#### [2.5.7 Dragging Movements (AA)](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements)

This one requires an alternative way to complete those actions that require a user to drag something from point A to Point B in an interface, using a pointing device. An example of this could be a Kanban board, a user may drag something from the 'In development' column to the 'On test' column, there must be a mechanism for users that are not keyboard users, to achieve the same goal (Keyboard alternatives must exist already in [2.1.1 Keyboard (A)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=122%2C241%2C244%2C247%2C251%2C312%2C322%2C332%2C412%2C246#keyboard) and [2.5.1 Pointer Gestures (A)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=122%2C241%2C244%2C247%2C251%2C312%2C322%2C332%2C412%2C246#pointer-gestures) applies where dragging paths must follow a specific route. 

This is aimed at non-keyboard users who may have limited dexterity or are not able to control a mouse or other pointing device with the same level of precision as non-disabled users. Whilst they have a disability, that doesn't mean they are a keyboard user, they may be able to manage to touch or click targets, but the act of dragging could be quite problematic for them. Perhaps an easy way of achieving this would be to have 2 arrow buttons on the moveable component, clicking on say an arrow that points left, will move the component into the previous column. Alternatively, there could be a menu on the component, "Move to", where the options would be the column names, that is assuming we're still using the Kanban example, but this could apply to sortable vertical lists or anything else where a dragging action can be completed to change orders, meaning or other important operations.

This will be especially beneficial for pointing-device users, who may have difficulties holding a mouse button down (or finger) and then dragging said component from point A to point B, because let's face it, not everybody knows how to navigate using a keyboard, just think of a user on an iPad, with no keyboard, they know how to move the component, but maybe they have tremors and each time they attempt to move the component, a tremor results in their finger momentarily leaving the capacitive surface of the tablet, so the component automatically moves back to its point of origin, that would be hugely frustrating.

#### [2.5.8 Target Size (Minimum) (AA)](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#258-target-size-minimum-aa)

Accessibility professionals rejoice, we now have something we can explain or show to stakeholders, when they want teeny tiny touch targets, well, sort of. This one has seemingly undergone some changes since its initial proposal and I'm not convinced what we have ended up with is what users needed. Interactive targets must be at least 24px by 24px unless (this is where it gets a bit flaky):

* The target is at least 24px away from any other target (so in reality, we'd still have to pass a 1px by 1px social icon link, if it were at least 24px away from any other interactive element, sigh)
* There is an equivalent elsewhere on the page that performs the same function
* It is inline text, so text in a paragraph, which may have several links
* Developers haven't styled it in anyway at all, the browser has rendered it that way
* Essential, it is legally or functionally required it is small, I have to say I have no idea what law would say some interactive element on a webpage has to be tiny, please enlighten me if you know of one

This doesn't apply to colour pickers and other controls that may require granular input. given that most Human interface guidelines recommend 44px or 48px for target sizes, 24px seemed like a very small starting point for Level AA, but better than nothing. I am concerned about the fact that if it's 24px away from any other interactive element, it does not apply. Maybe this is something that will be easier to flag when resizing the viewport, maybe our 1px by 1px Twitter icon will cosy up to something else if we squish the screen down to 320px?

In essence, if there are controls tightly grouped together, they must be a minimum of 24px by 24px.

If the controls are smaller than 24px by 24px, then we must calculate the [target offset](https://www.w3.org/TR/WCAG22/#dfn-target-offsets), which is quite an interesting concept. Assume we have 2 square social links, adjacent to each other, with just 2px of space between them. The 'hit area' of each is 22px by 22px, which at first glance seems like an instant failure, but it's actually not. Here's why: the right most edge of the first icon only needs to be 24px away from the second icon's right edge, so closest edge of the first icon, the 2px space in-between and then the distance to the farthest edge of the second icon, so in this example, 2px (gap) + 22px (width of second icon) = 24px, of course this calculation applies in every direction. I think we'll still have those difficult discussions about target sizes, as this doesn't appear to do a great deal to address that.

#### [3.3.8 Accessible Authentication (AA)](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#337-accessible-authentication-aa)

This requirement applies to when users login to sites or applications, as in order to be logged in, they must be authenticated. The idea with this requirement is reduce the cognitive burden of remembering login credentials and to a lesser extent, other cognitive function tests. This unfortunately doesn't do away with the dreaded reCAPTCHA, so we'll all likely still be asking ourselves whether part of the pedestrian crossing is in a specific square or not or even which way a horse is facing (yes, really).

The W3C's interpretation of a cognitive function test is a puzzle (that could be a sum, reCAPTCHA, identifying characters and all the other ridiculous things we must endure to prove to a machine, that we are in fact, not a machine). There is a AAA requirement for this too, which goes further and seemingly does away with reCAPTCHAS's altogether, but at AA, it's not so clear cut.

"A cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process unless that step provides at least one of the following:"

* An alternative: A different method of logging in (authenticating) that does not require a cognitive function test
* Some form of mechanism is available to assist a user in completing the cognitive function test
* Object recognition (this appears to have a bit of a flaw) "The cognitive function test is to recognize \[sic] objects"
* Personal Content of a non-text type, that a user has provide to the web or app

Back to the direction the horse is facing riddle, that's my only encounter of having to identify any animal-based puzzles and yep, one of them was looking kind of head on, but I winged my way through it. A horse isn't an object, I understand objects to be inanimate things that are tangible, which would also exclude patterns and shapes, right? Let's see what the dictionary says:

> Object (noun) A thing that you can see or touch but that is not usually a living animal, plant, or person: <cite>Cambridge dictionary</cite>

Wording matters, as when words say one thing, but mean something else, we end up in situations where there's no other choice but to remove the criterion altogether, subtle nod to 4.1.1 Parsing there.

Also we have those puzzles where we may be required to identify characters or words, which are typically displayed as a graphic, are they objects or shapes and patterns? I'm no lexicologist, but I'd say the latter.

Having to remember certain characters from a memorable word, based upon their position, would also fail this requirement.

So, in a nutshell, reCAPTCHA is still allowable (sigh), but there are certain requirements that must be met with authenticating:

A user must not be required to remember their username or password as these typically change between sites. We can rely on password managers, browser autofill and simply fields that allow users to paste credentials into them. If a field prevents you from pasting into it or doesn't auto-fill etc, this would fail the new requirement.

Other acceptable ways of logging in are: biometrics (your face or fingerprint etc), 2-factor authentication where that secondary factor is confirming your identity on your trusted device (maybe TouchID etc), QR codes, third-party providers (Oauth etc), email links with login tokens.

There's quite a lot to unpack in this one, there seem to be an almost infinite amount permissible alternatives, so at it's base level, if a user is required to manually type their password and/or username, then that site fails this requirement. 

I believe we would would typically pass this by accident, if we have inputs with correctly associated clear labels and even autocomplete attributes and nobody in their infinite wisdom thought it would be user friendly to block copy and pasting into those fields, then that's all that is required.

## Goodbye to 4.1.1 Parsing

Ahh, 4.1.1 Parsing is due to be removed from 2.2, as the wording we have all followed was not what we were supposed to be doing, because those words, in the context they were written, were only understandable in their true context, by the folks that wrote them. I'm not going into any detail here, as [Adrian Roselli does a fine job (as always) with his 411 on 4.1.1 article](https://adrianroselli.com/2022/12/the-411-on-4-1-1.html)

In essence, the same failures are still failures, but not against the criterion we were lead to believe they were, by reading it.

## Focus Visible to be reclassified at Level A

So, did you ever wonder why Focus Visible was a AA? Something so basic, so essential, something that had to be intentionally removed by a developer in the first instance, only needed to be present at Level AA? Well, [2.4.7 Focus Visible is being reclassified as a Level A requirement](https://www.w3.org/TR/WCAG22/#focus-visible). In the UK, we don't typically test for Level A, so other than writing the level, this has no affect on us. As an aside, I've always wondered why most of the colour requirements are Level AA too.

## Wrapping up

WCAG 2.2 is essentially a minor revision, whilst it seemingly adds 7 new criteria that we need to meet at Level AA, the only ones that might be a little extra work is Redundant Entry and Focus not Obscured, as much of what is new seems like best practices to me and this is stuff I'd ordinarily put in an advisory or if there were other issues on a specific component, my recommendation would include those best practices. Whilst at this moment I haven't gone into depth on Focus Appearance, due to its 'At risk' nature, I don't see this as being problematic, as when I discover something without a focus indicator, my recommendation would always be a highly visible focus indicator, but we can dig deeper there when and if it makes the cut.

I'll update this guide, as and when things change and also as and when my own understanding changes, should I come across chatter that explains things better than the official standard, which is typically how most of learn how to interpret WCAG anyway, read it several times, scratch one's head and Google the life out of it (other search engines are available).

As the standard has been delayed a few times, we're probably super close to the actual release, the most recent discussions I read stated December or January. With that in mind, it would be worth making preparations now, we've created a new audit template ready for this change and as soon as the standard is canon, we're going to start testing against 2.2, so we don't create an additional backlog of sites to retest at a later date.