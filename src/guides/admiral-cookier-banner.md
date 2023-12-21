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
* Cookie banner partially obscures page. This fails WCAG 1.3.2 Meaningful Sequence (A).
* Contrast colour issues on text and links and buttons. This fails WCAG 1.4.3 Contrast (Minimum) (AA).
* Cookie banner partially obscures page. This fails WCAG 1.4.10 Reflow (AA).
* Ensure elements are accessible by keyboard. This fails WCAG 2.1.1 Keyboard (A).
* Cookie banner partially obscures page. This fails WCAG 2.4.3 Focus Order (A).
* Duplicate labels used. This fails WCAG 2.4.6 Headings and Labels (AA).
* Cookie banner partially obscures page. This fails WCAG 2.4.7 Focus Visible (AA).
* Cookie banner partially obscures page. This fails WCAG 2.4.11 Focus Not Obscured (Minimum) (AA).
* Cookie banner partially obscures page. This fails WCAG 3.2.3 Consistent Navigation (AA).
* User is not made aware of new content. This fails WCAG 4.1.3 Status Messages (AA).