---
title: Admiral cookier banner
summary: Accessibility issues with the Admiral cookie banner
author: swilkinson
date: 2023-12-21
toc: false
tags:
  - Remediation
  - Cookies
  - Third-party
  - Audit
  - Component
isGuide: true
---
## Cookie banner accessibility issues

* Ensure elements are accessible by keyboard. This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop keyboard users and screen reader users from being able to change options and submit their choices.
* The label associated with the form control is empty. This fails WCAG 1.3.1 Info and Relationships (A) and 4.1.2 Name, Role, Value (A). When screen reader users move through form elements such as radio buttons or checkboxes which are commonly used in cookie banners, they must be told what question they are answering or what type of cookie they are accepting / denying. When form elements do not have labels or legends users are not told what the context of the control is. For example instead of saying "accept marketing cookies checkbox not checked" it might just say "checkbox not checked" which does not help the user. 
* Cookie banner partially obscures page. This fails WCAG 1.4.10 Reflow (A). Some banners do not respond well to magnification, zooming, or being viewed on smaller screens which sometimes makes content get lost off the side of the screen. This can stop partially sighted and magnifier users from accessing all content.
* Contrast colour issues on text and links and buttons. This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read.
* Duplicate labels used. This fails WCAG 2.4.6 Headings and Labels (AA).
* User is not made aware of new content. This fails WCAG 4.1.3 Status Messages (AA).