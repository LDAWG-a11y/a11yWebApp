---
title: Meeting WCAG 2.2
summary: WCAG 2.2 is very close to becoming the new standard and at present it
  adds 9 additional success criteria and removes one success criterion from WCAG
  2.1. This guide outlines what we need to do regarding this new standard and
  how to meet the new requirements
author: dlee
date: 2023-08-18
toc: true
tags:
  - PSBAR
  - WCAG 2.2
  - Monitoring
  - Regulations
isGuide: true
---
## Intro to WCAG 2.2

WCAG currently has 9 additional success criteria (SC) or requirements to meet, in order to "conform to the new 2.2 standard", which are:

* 2 new Level A requirements
* 4 new Level AA requirements
* 3 new Level AAA requirements

In addition, one of the previous requirements has been removed, which is [SC 4.1.1 Parsing (Level A)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=122%2C241%2C244%2C247%2C251%2C312%2C322%2C332%2C412%2C246#parsing), as the working group felt this requirement did not accurately explain the intent and has been the source of much confusion.

## How does this affect the UK public sector?

This may come as complete bombshell, but this change can only be a good thing for our users. On Friday 9th December 2022, [Cabinet Office of the UK Government released updated guidance regarding the PSBAR regulations on the Gov.uk site.](https://accessibility.blog.gov.uk/2022/12/09/some-changes-to-the-public-sector-digital-accessibility-regulations/)

The key takeaways from Cabinet Office's amendments to the regulations are:

* All those organisations that fall under the PSBAR regs will need to meet WCAG 2.2 at Level AA
* The monitoring body will start testing those sites for WCAG 2.2 compliance a year after WCAG 2.2 becomes the standard (So October 2024)

That gives those of us affected by the regulation change a year or so to be WCAG 2.2 Level AA compliant, which definitely won't be as much work as when the initial regulations came into law back in 2018. There are a few of reasons I think this will be a relatively straightforward transition from WCAG 2.1:

* If you have sites that are WCAG 2.1 AA compliant and have been tested relatively recently you only need to test against the new requirements, which are 2 Level A and 4 Level AA requirements
* If you and your organisation have viewed accessibility as a people thing, as opposed to a legal thing, you may have accidentally passed some of those requirements, simply by following 'Best practices'
* Accessibility has become the norm, many of us have skilled up, designers, developers, QAs, and accessibility testers alike, so the learning curve will be significantly gentler than it was when we were all having to learn for the first time

## OK, so what is new?

As discussed, there are 9 new requirements, but as we typically aim for AA compliance, only 6 of those are required for meeting the regulations, although as always, viewing accessibility through a people lens as opposed to through a legal lens means we should certainly aim to implement as much AAA stuff and best practices as we can.

### Let's look at the 2 new Level A requirements first

#### [3.2.6 Consistent Help (A)](https://www.w3.org/TR/WCAG22/#consistent-help)

This can be met by having any contact details you already have on your sites consistently placed across pages. So, if for example your company address and contact details are in the site footer and they appear on multiple pages, they appear in the "same relative order" and use the same labelling. Which basically means all of the links and text remains in the same order on every page it is included on. There doesn't appear to be a requirement that contact details or help is available, just that when it is, it is consistent. Help could be in the main navigation or anywhere else, as long as it is consistently placed and labelled. I view footers as static elements, their content typically remains unchanged across all pages, as we would simply include or require the footer component in our site template and call it good. It feels a like a quick win to have contact details in there, which would by convention be easy to discover for everybody.

Obviously it would be widely beneficial to provide contact details that have enough alternatives to cater for everybody, for example don't rely solely on social media contact, not everybody has Twitter of Facebook and they'd need to create an account to be able to contact you on those platforms, and there are plenty of reasons for people not wanting to join those platforms. 

Arguably, the most robust contact method of all is an email address, generally people who use computers have one, we need one to set up a phone, computer or tablet and of course shop online. Giving people choices on how to contact you would be the best practice here, don't restrict users to chatbots, phones or social media, add an email address (or an accessible contact form) to your existing contact methods, so everybody has choice and nobody is excluded from contacting you. 

#### [3.3.7 Redundant Entry (A)](https://www.w3.org/TR/WCAG22/#redundant-entry)

This applies to forms where users may be required to enter the same data, at more than one step of a process. As an example, a user is filling out an application form to enrol in a programme of education, at Step 1, they provide their name, email, address and phone number etc, at Step 5, we ask them for their address again for correspondence, instead of the user having to type those details again, either:

* Offer an option, such as "My home address is different from my postal address", like many of the online stores do, where there is an option similar to "My billing address is the same as my shipping address"
* Pre-populate those fields, with the previously supplied data. There are valid reasons why a user may have a different daytime number than evening one or a different "current address" than their legal address, so if you don't offer a mechanism that allows a user to confirm the data you want is the same as the data the user provided in an earlier step, then pre-populate those fields if there's a chance the data will be the same at each step it is asked

This new requirement appears like there will be a little extra development in capturing user data and ensuring users can either select previously entered data or edit a pre-populated input, but as we'd be storing this information somewhere, on each step, it won't too be difficult to achieve where our developers have full access to the code, it may be harder to get suppliers to accommodate this requirement in Customer Relationship Management (CRM) software or third party payment tools etc, so I assume some tricky questions will be asked, going forward.

### Now let's look at the 4 new Level AA requirements

#### [2.4.11 Focus not Obscured (Minimum) (AA)](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum)

This particular requirement requires that interactive elements on webpages do not become wholly obscured by author-created components when they receive keyboard focus. The usual suspects that cause this behaviour are sticky headers and footers, overlay type 'drawer' menus or navigations, 'toast' messages, chat widgets, non-modal dialogs and other elements that exist on a higher stacking context than interactive elements beneath.. This is one of the new requirements that I believe we would hopefully hit by accident, as my mindset is people rely on focus indicators to move around webpages, they need to see that focus indicator at all times when they tab between interactive elements, so I always recommend fixes when focus is obscured by something. 

Interestingly the requirement only requires that "some part of the component (and as result, normally part of its focus indicator as well) not be obscured by other author-created content". How much constitutes "some part" is anybody's guess, half, a quarter, a couple of pixels, who knows? There is a AAA enhanced requirement that builds on this, and does not allow any part of the component or its focus indicator to be obscured by author created content (Author created content is essentially our code, content and components etc, not the browser's). This doesn't apply to modal dialogs as, the underlying content page content should not be reachable, as modal is a state that renders the content below inert. In correctly coded modal dialogs focus would advance to a suitable place within the dialog when it is opened and naturally, focus would be trapped within.

One example I can see being a huge problem is chat widgets, you know those ones that usually start with a small control at the bottom right of a page, but after a short while they expand automatically to show the full chat widget? As these are typically absolutely positioned (taken out of the main document's flow and positioned on a new layer above) you can pretty much guarantee that at some viewport, orientation or zoom level that it will wholly obscure a focused element, which will be an instant fail. This would of course apply to those intrusive dialogs that pop up for cookies, subscriptions, notifications and anything else somebody erroneously thought would be a great idea to interrupt users with.

Going back to the chat widget, if it displays as the full message panel, we'd want to be requesting it doesn't do that until a user clicks the chat button, we'd likely want that to act as a modal dialog, clicking the trigger expands the full widget, focus is moved to a suitable place within and when a user closes the widget, focus returns to the point of origin. But then if your chat widget pushes other content down, as opposed to overlaying it, this won't be a problem at all.

#### [2.5.7 Dragging Movements (AA)](https://www.w3.org/TR/WCAG22/#dragging-movements)

This one requires an alternative way to complete those actions that require a user to drag something from point A to Point B in an interface, using a pointing device. An example of this could be a Kanban board, a user may drag something from the 'In development' column to the 'On test' column, there must be a mechanism for users who are not keyboard users, to achieve the same goal (Keyboard alternatives exist already in [2.1.1 Keyboard (A)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=122%2C241%2C244%2C247%2C251%2C312%2C322%2C332%2C412%2C246#keyboard) and [2.5.1 Pointer Gestures (A)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=122%2C241%2C244%2C247%2C251%2C312%2C322%2C332%2C412%2C246#pointer-gestures) applies where dragging paths must follow a specific route). 

This is aimed at non-keyboard users who may have limited dexterity or are not able to control a mouse or other pointing device with the same level of precision as others. Whilst they may have a disability, that doesn't mean they are a keyboard user, they may be able to manage to touch or click targets, but the act of dragging could be quite problematic for them. There could be a menu on the component, "Move to", where the options would be the column names, that is assuming we're still using the Kanban example, but this could apply to sortable vertical lists or anything else where a dragging action can be completed to change orders, meaning or other important operations. Another example is if the moveable component can only be moved in one axis, such as moving a list item up for priority, then adding 2 buttons for up and down would also work.

It's important to consider all dimensions here, if a mouse user can drag a ticket from one column to the next, but also position it at a specific position in that column, say the top, as this is a priority ticket, then this must also be achievable with single point activation, so in a Kanban example, maybe an option to move to a specific column and then up and down arrow buttons which can move the item up or down the stack of tickets.

This will be especially beneficial for pointing-device users, who may have difficulties holding a mouse button down (or finger) and then dragging said component from point A to point B, because let's face it, not everybody knows how to navigate using a keyboard, just think of a user on an iPad, with no keyboard, they know how to move the component, but maybe they have tremors and each time they attempt to move the component, a tremor results in their finger momentarily leaving the capacitive surface of the tablet, so the component automatically moves back to its point of origin, that would be hugely frustrating.

#### [2.5.8 Target Size (Minimum) (AA)](https://www.w3.org/TR/WCAG22/#target-size-minimum)

Users who have difficulty interacting with small interactive elements rejoice, you now have something that prevents teeny tiny touch/click targets being on "compliant sites", well, sort of. This one has seemingly undergone some changes since its initial proposal and due to the exceptions, it won't apply to all teeny tiny touch/click targets.

This requirement is not about how large an interactive element looks, it relates to the intrinsic size of the element, so that includes the padding too. Let's assume we have a tiny icon, that is perhaps 12px * 12px, but that icon is within a button element, with no border and no background. Visually the icon looks very small (far too small), but the button itself has 6px padding all the way around, we just cannot see that padding as there is no background, but this technically passes because the intrinsic size is made up of 6px (padding) 12px (icon size) and 6px (padding again) which equals 24px, in this example that applies on both axes. Obviously this would be pretty bad for our users, as some users with lower vision may not even see the icon, so whilst failing the icon would be a stretch, we should definitely write up an advisory note explaining why this is bad for our users.

Ultimately, if the element is at least 24px * 24px it passes. There are some exceptions to consider though:

* If the element is smaller than 24px \* 24px then should we place a 24px \* 24px circle over the element, then that circle does not overlap any other interactive element, not even buy a single pixel. In essence, if the element is smaller than 24px * 24px then from the absolute centre of the element, no interactive element can be present within 12px of any direction.
* There is an equivalent elsewhere on the page that performs the same function (no mention of how they may find it)
* It is inline, so anything within a block of text, which may have links or controls in the text does not need to meet the minimum size
* Developers haven't styled it in anyway at all, the browser has rendered it that way (an example being a default checkbox, they're quite small and wouldn't fail as the browser's stylesheet displays them, although, the moment we add just 1 style declaration to them, everything applies, as it is modified by "authors", although for a checkbox, using a label correctly would increase the tappable/clickable area)
* Essential, it is legally or functionally required the component is that small, I have to say I have no idea what law would say some interactive element on a webpage has to be tiny, please enlighten me if you know of one

This doesn't apply to colour pickers and other controls that may require granular input. given that most Human interface guidelines recommend 44px or 48px for target sizes, 24px seems a quite small starting point for Level AA, but certainly better than nothing.

Here's where I have noticed something that passes, but then doesn't. Icons in a table, to delete or edit row content, they often appear small, but as there is nothing close by, they pass, but here's the gotcha, once we start to make the viewport smaller, the available space in those cells reduces to almost nothing, so now it fails. So given that a lot of users looking at the mobile view will actually be on a mobile, don't forget to recheck all those suspicious looking interactive elements in there too.

Many of you will be familiar with Adrian Roselli who puts out some amazing guides and offers his wisdom to many in the community, across a variety of channels, well Adrian has created some nifty bookmarklets to test this, I'm not going to explain how to use them, as there is nothing I could offer that Adrian hasn't considered and explained perfectly, already, [so grab the bookmarklets here, and do read the instructions and considerations](https://adrianroselli.com/2022/05/24x24-pixel-cursor-bookmarklet.html).

#### [3.3.8 Accessible Authentication (Minimum) (AA)](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum)

This requirement applies to when users login to sites or applications, as in order to be logged in, they must be authenticated. The idea with this requirement is reduce the cognitive burden of remembering login credentials and to a lesser extent, other cognitive function tests. This unfortunately doesn't do away with the dreaded reCAPTCHA and other similar riddles, so we'll all likely still be asking ourselves whether part of the pedestrian crossing is in a specific square or not or even which way a horse is facing (yes, really).

The W3C's interpretation of a cognitive function test is a puzzle (that could be a sum, reCAPTCHA, identifying characters and all the other ridiculous things we must endure to prove to a machine, that we are in fact, not a machine. There is a AAA requirement for this too, which goes further and seemingly does away with reCAPTCHAS's altogether, but at AA, it's not so clear cut.

"A cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process unless that step provides at least one of the following:"

* An alternative: A different method of logging in (authenticating) that does not require a cognitive function test
* Some form of mechanism is available to assist a user in completing the cognitive function test
* Object recognition: The cognitive function test is to recognise objects
* Personal Content of a non-text type, that a user has provided to the web or app

A user must not be required to remember their username or password as these typically change between sites. We can rely on password managers, browser autofill and simply fields that allow users to paste credentials into them. If a field prevents you from pasting into it or doesn't auto-fill etc, this would fail the new requirement.

The wording states that whilst a ReCAPTCHA that requires "Object recognition" is a cognitive function test, it is excepted from the AA requirement, so they do not in fact cause a failure at the AA level.

Another thing that would fail could be "Enter the 6th and 9th character of your memorable word" type riddles, as that puts a cognitive burden on the user. 

Some acceptable ways of logging in are: biometrics (your face or fingerprint etc), 2-factor authentication where that secondary factor is confirming your identity on your trusted device, QR codes, third-party providers, email links with login tokens.

There's quite a lot to unpack in this one, there seem to be an almost infinite amount permissible alternatives, so at it's base level, if a user is required to manually type their password and/or username, then that site fails this requirement. 

I believe we would would typically pass this by accident, if we have inputs with correctly associated clear labels and autocomplete attributes, and nobody thought it would be user friendly to block copy and pasting into those fields, then that's all that is required. Often in my personal life when I'm creating an account on some websites, i encounter those fields where it does let you auto-fill most of the fields, but then there may be a "Confirm email" address field that has paste and auto-fill blocked, so keep those in mind when testing.

### Let's take a quick look at the 3 new AAA requirements

Just the 3 to look at and two of these are the enhanced versions of 2 of the new AA requirements.

#### [2.4.11 Focus Appearance (AAA) ](https://www.w3.org/TR/WCAG22/#focus-appearance)

This one makes me a little sad, as it was initially intended for Level AA, but as the folks working on 2.2 could not decide on certain aspects, it ultimately got bumped up to Level AAA, which is unfortunate, as the intent of this one really did make great strides in explaining what a perceivable focus indicator is. Still, we should really be looking at the intent of this and pushing for something similar.

This new requirement somewhat of combines 2 existing requirements, [2.4.7 Focus Visible (AA)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=241%2C244%2C246%2C251%2C312%2C322%2C332%2C412%2C122#focus-visible) and [1.4.11 Non-text Contrast (AA) ](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=241%2C244%2C246%2C251%2C312%2C322%2C332%2C412%2C122#non-text-contrast)and enhances them slightly, to provide users with more perceivable focus indicators. Essentially, it requires that the focus indicator is at least as large as a 2px thick perimeter of the component and that that minimum sized indicator has at least a 3:1 contrast against the unfocused pixels. This is not to say that it has to be a 2px ring around an item, it just needs to cover exactly the same minimum surface area that a 2px ring would. It would require some math to meet this

#### [2.4.12 Focus not Obscured (Enhanced) (AAA)](https://www.w3.org/TR/WCAG22/#focus-not-obscured-enhanced)

This one builds on 2.4.12 Focus not Obscured (Minimum) (AA), in that no part of the focused element or by extension, its focus indicator becomes obscured by any author created content. This does away with the vagueness of "Some part" of the component is not hidden and explicitly states none of it should be. I think this is the standard we should be pushing for, remember conformance is the floor, not the ceiling.

#### [3.3.9 Accessible Authentication (Enhanced) (AAA)](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum)

Building upon 3.3.7 Accessible Authentication (AA), this removes the exceptions in the aforementioned requirement, in that if a site does have a puzzle of some sort, then there is an alternative which a user may choose, that does not rely on a cognitive function test. So, assuming the website wants us to prove beyond all doubt that we are not a robot by having us help them improve the artificial intelligence for self-driving cars, there must be another way to authenticate that doesn't require recognition of objects, so, hasta la vista, reCAPTCHA (sorry).

### Goodbye to 4.1.1 Parsing

Ahh, 4.1.1 Parsing is due to be removed from 2.2, as the wording many of us followed was not what we were supposed to be doing, because those words, in the context they were written, were only understandable in their true context, by the folks that wrote them. I'm not going into any detail here, as [Adrian Roselli does a fine job (as always) with his 411 on 4.1.1 article](https://adrianroselli.com/2022/12/the-411-on-4-1-1.html)

In essence, the same failures are still failures, but not against the criterion we were lead to believe they were, as the intent of that requirement was not what most of us understood it to mean.

## Wrapping up

WCAG 2.2 is essentially a minor revision, whilst it seemingly adds 6 new criteria that we need to meet at Level AA, the effort required to test or remediate isn't huge, as much of what is new are what were previously considered best practices and these are things I'd ordinarily put in an advisory or if there were other issues on a specific component, my recommendation would include those best practices. 

As we know that we will have to meet this new standard a year affer it becomes the new recommendation and we know that 2.2 is a "Proposed Recommendation", we have made the decision to start testing against this now. We did in fact prepare for this at the beginning of the year, by updating our templates and other documentation, so we can now hit the ground running. At this stage, as it is so close, we have decided that at the time of writing a report WCAG 2.2 is not the current standard, but at the time of reading for vendors, it's pretty much nailed on it will be, then we move over to testing 2.2 now.