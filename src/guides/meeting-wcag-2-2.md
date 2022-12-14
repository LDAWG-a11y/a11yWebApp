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

##  OK, so what is new?

I'll break these down, so we know how we can meet the requirements.

### Let's look at the 2 new Level A requirements first

[3.2.6 Consistent Help (A)](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#326-consistent-help-a) This one can be met really easily and shouldn't take any effort at all, this can be met by having any contact details consistently placed on a page, when repeated across pages. So, if for example your company address and contact details are in the footer and they appear on multiple pages, they appear in the "same relative order". Which basically means all of the links and text remains in the same order on every page it is included on. Obviously it would be super beneficial to provide contact details that have enough alternatives to cater for everybody, like don't rely solely on social media contact, not everybody has Twitter of Facebook and they'd need an account to contact you and there are genuine reasons for not wanting to join those platforms. I would recommend adding the address, phone number and a monitored email account to the footer and making sure that appeared in the same place, across all pages along with any alternative contact details, also making sure they're in the same relative order.

[3.3.9 Redundant Entry (A)](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#339-redundant-entry-a) This applies to forms where users may be required to enter the same data, at more than one step of a process. As an example, a user is filling out an application form to enrol in a programme of education, at Step 1, they provide their name, email, address and phone number etc, at Step 5, we ask them for their address again, instead of the user having to type those details again, either:

* Pre-populate those fields, with the previously supplied data, depending on the reason for asking for the same data twice or more, it may be a good question to ask why we are and do we have to ask twice? There are valid reasons why a user may have a different daytime number than evening one or a different "current address" than their legal address, so with this in mind, if it's for deliveries or contact, at the minimum, these fields should be both pre-populated and editable
* Offer an option, such as "My home address is different from my postal address", like many of the online stores, where there is an option similar to "My billing address is the same as my delivery address", which saves a user having to type the same data twice

This new requirement appears like there will be a little extra development in capturing user data and ensuring users can either select previously entered data or edit a pre-populated input, but as we'd be storing this information somewhere, on each step, it won't be difficult to achieve where our developers have full access to the code, it may be harder to get suppliers to accommodate this requirement in Customer Relationship Management software or third party payment tools etc, so I assume some tricky questions will be asked, going forward.

### Now let's look at the 5 new Level AA requirements

[2.4.11 Focus Appearance (AA) ](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#2411-focus-appearance-aa)This new requirement somewhat of combines 2 existing requirements, [2.4.7 Focus Visible (AA)](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=241%2C244%2C246%2C251%2C312%2C322%2C332%2C412%2C122#focus-visible) and [1.4.11 Non-text Contrast (AA) ](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=241%2C244%2C246%2C251%2C312%2C322%2C332%2C412%2C122#non-text-contrast)and enhances them slightly, to provide users with more perceivable focus indicators. It's worth noting that this particular requirement is "At risk", as there doesn't appear to be general consensus over the wording of the requirement. So this requirement may not make it to Recommendation stage, which would be a shame, as it certainly enhances the visibility of focus indicators. As this is "At risk", I'm not going to go into any depth right now, but if the W3C can agree on the wording and get this requirement out the door, I'll add some CopePen examples for a wide variety of use cases.

[2.4.12 Focus not Obscured (Minimum) (AA)](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#2412-focus-not-obscured-minimum-aa) This particular requirement requires that interactive elements on webpages do not become wholly obscured by other author-created components, when they receive keyboard focus. The usual suspects that cause this behaviour are sticky headers and footers, overlay type 'drawer' menus or navigations, 'toast' messages, chat widgets, some dialogs and some other disclosure patterns, that obscure content. This is one of the new requirements that I believe we would mostly hit by accident, as my mindset is people rely on focus indicators to move around webpages, they need to see that focus indicator at all times, when they tab between interactive elements, so I always recommend fixes when focus is obscured by something. Interestingly it only requires that "some part of the component (and as result, normally part of its focus indicator as well) not be obscured by other author-created content". How much constitutes "some part" is anybody's guess, half, a quarter, a couple of pixels, who knows?

[2.5.7 Dragging Movements (AA)](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements) This one requires an alternative way to complete those actions that require a user to drag something from point A to Point B in an interface. An example of this could be a Kanban board, a user may drag something from the 'In development' column to the 'On test' column, there must be a mechanism for users that are not keyboard users, to achieve the same goal. An example could be a user who has limited dexterity or is not able to control a mouse or other pointing device with the same level of precision as non-disabled users. Whilst they have a disability, that doesn't mean they are a keyboard user, they may be able to manage to touch or click targets, but the act of dragging could be very difficult for them. Perhaps an easy way of achieving this would be to have 2 arrows on the moveable component, clicking on say an arrow that points left, will move the component into the previous column. Alternatively, there could be a menu on the component, "Move to", where the options would be the column names, assuming we're still using the Kanban example, but this could apply to sortable lists or anything else where a dragging action can be completed to change orders, meaning or other important operations.

[2.5.8 Target Size (Minimum) (AA) ](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/#258-target-size-minimum-aa)Accessibility professionals rejoice, we now have something we can explain or show to stakeholders, when they want teeny tiny touch targets, well, sort of. This one has undergone some changes and I'm not convinced what we have ended up with is what users needed. Interactive targets must be at least 24px by 24px unless (this is where it gets a bit flaky):

* The target is at least 24px away from any other target (so in reality, we'd still have to pass a 1px by 1px link, if it were at least 24px away from any other interactive element, sigh)
* There is an equivalent elsewhere on the page that performs the same function
* It is inline text, so text in a paragraph, which may have several links
* Developers haven't styled it in anyway at all, the browser has rendered it that way
* Essential, it is legally or functionally required it is small, I have to say I have no idea what law would say some interactive element on a webpage has to be tiny, please enlighten me if you know of one

This doesn't apply to colour pickers and other controls that may require granular input. given that most Human interface guidelines recommend 44px or 48px for target sizes, 24px seemed like a good starting point for Level AA. I am concerned about the fact that if it's 24px away from any other interactive element, it does not apply. Maybe this is something that will be easier to flag when resizing the viewport, maybe our 1px by 1px twitter icon will cosy up to something else if we squish the screen down to 320px?