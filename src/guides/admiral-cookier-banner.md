---
title: Admiral cookier banner
summary: Accessibility issues with the Admiral cookie banner
author: swilkinson
date: 2023-12-21
toc: true
tags:
  - Remediation
  - Cookies
  - Third-party
  - Audit
  - Component
isGuide: true
---
## Cookie banner accessibility issues

* Ensure elements are accessible by keyboard. This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop keyboard users and screen reader users from being able to change options and submit their choices
* The label associated with the form control is empty. This fails WCAG 1.3.1 Info and Relationships (A) and 4.1.2 Name, Role, Value (A). When screen reader users move through form elements such as radio buttons or checkboxes which are commonly used in cookie banners, they must be told what question they are answering or what type of cookie they are accepting / denying. When form elements do not have labels or legends users are not told what the context of the control is. For example instead of saying "accept marketing cookies checkbox not checked" it might just say "checkbox not checked" which does not help the user
* Cookie banner partially obscures page. This fails WCAG 1.4.10 Reflow (A). Some banners do not respond well to magnification, zooming, or being viewed on smaller screens which sometimes makes content get lost off the side of the screen. This can stop partially sighted and magnifier users from accessing all content
* Contrast colour issues on text and links and buttons. This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read
* Duplicate labels used. This fails WCAG 2.4.6 Headings and Labels (AA). Often all cookie acceptance checkboxes are identified as "accept cookies" rather than "accept marketing cookies" or "accept analytics cookies". Not being able to differentiate the controls because everything has the same label stops screen reader users from making informed choices
* User is not made aware of new content. his fails WCAG 4.1.2 Name, Role, Value (A). Often when screen reader users change a toggle control or expand a collapsed content section (accordion) they are not told that there is more content to read, or whether the toggle control now means they have accepted or declined cookies

## Weaknesses

* The example page the banner was tested on had so many links when using the keyboard to tab through the page, it took 43 tabs to get through the “Reject all” button which was the first button on the banner
* With CSS turned off, the “Your consent choices saved” image <img src="https://www.getadmiral.com/hubfs/Blog-Images-HS/Admiral-consent-cmp-1200x628.jpg" alt=""> without any CSS takes up most of the page. Resize the image so that it is the size is far smaller (the size the CSS makes it) making the page easier to read without CSS or with user defined CSS
* `<b>` tags are used. these have been <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b#:~:text=Styling%20information%20has%20been%20deprecated,order%20to%20make%20text%20bold">deprecated since HTML 4</a>. `<b>` is not the same as `<strong>` because `<strong>`, `<em>` and `<mark>` represent text of importance whereas `<b>` does not convey that semantic information. If you need the headings to be bold or strong, use styles rather than `<b>` or `<strong>`, but most screen readers will not announce text inside the `<b>` HTML tags any differently, so emphasis is lost for those who cannot see the text
* Some users of screen readers may not be able to use the consent checkboxes as they won't work with implicit labels, only explicit labels.

Change the “toggles” to two radio buttons within a `fieldset` with the legend such as suggested by Sara Soueidan in her article <a href="https://www.sarasoueidan.com/blog/toggle-switch-design/">On Designing and Building Toggle Switches</a>
* Number 7 toggle choice was missing
* Consent buttons are hard to see when using the Windows Contrast theme Night sky


## Advisories

* There is a list of the type of ads that can be selected. This list disguised as a table – display as list or create an accessible table
* On some customer versions that the “Reject all” button is removed. GDPR has to be as easy to reject as it is to accept, so that not having the “Reject all" which is the equivalent to the “Accept all” means it is far harder to reject as each individual consent checkbox has to set to off. Do not allow customers to remove the “Reject all” button