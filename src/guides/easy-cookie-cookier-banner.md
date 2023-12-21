---
title: Easy Cookie cookier banner
summary: Accessibility issues with the Easy Cookie cookie banner
author: Anonymous
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

* **Ensure elements are accessible by keyboard** - This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop keyboard users and screen reader users from being able to change options and submit their choices
* **Information in the table cannot be tabbed through** - This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop keyboard users and screen reader users from being able get all the information because information in the table is missed
* **Accordion is not keyboard accessible in screen readers** - This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop screen reader users from being able to access all the information
* **Cookie banner partially obscures page** - This fails WCAG 1.4.10 Reflow (A). Some banners do not respond well to magnification, zooming, or being viewed on smaller screens which sometimes makes content get lost off the side of the screen. This can stop partially sighted and magnifier users from accessing all content
* **Ensure the contrast between foreground and background colours meets WCAG 2 A contrast ratio thresholds** - This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read
* **Visible label with hidden input** - this fails WCAG 4.1.2 Name, Role, Value (A). Do not hide inputs that require labels as this will confuse screen reader users
* **Accordions do not notify all screen readers when they open or close** - this fails WCAG 4.1.2 Name, Role, Value (A). When using Narrator, TalkBack or VoiceOver, when the accordion is opened, the user is not notified
* **The form contains multiple <label> elements with the same text content** - This fails WCAG 2.4.6 Headings and Labels (AA). Often all cookie acceptance checkboxes are identified as "accept cookies" rather than "accept marketing cookies" or "accept analytics cookies". Not being able to differentiate the controls because everything has the same label stops screen reader users from making informed choices

* **The label associated with the form control is empty** - This fails WCAG 1.3.1 Info and Relationships (A) and 4.1.2 Name, Role, Value (A). When screen reader users move through form elements such as radio buttons or checkboxes which are commonly used in cookie banners, they must be told what question they are answering or what type of cookie they are accepting / denying. When form elements do not have labels or legends users are not told what the context of the control is. For example instead of saying "accept marketing cookies checkbox not checked" it might just say "checkbox not checked" which does not help the user

* **Contrast colour issues on text and links and buttons** - This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read
* **Duplicate labels used** - This fails WCAG 2.4.6 Headings and Labels (AA). Often all cookie acceptance checkboxes are identified as "accept cookies" rather than "accept marketing cookies" or "accept analytics cookies". Not being able to differentiate the controls because everything has the same label stops screen reader users from making informed choices
* **User is not made aware of new content** - this fails WCAG 4.1.2 Name, Role, Value (A). Often when screen reader users change a toggle control or expand a collapsed content section (accordion) they are not told that there is more content to read, or whether the toggle control now means they have accepted or declined cookies

## Weaknesses

* Tables do not use scope which allows accessibility tools to understand which column or row a cell belongs to. Make Things Accessible has a good guide to <a href="/guides/html-tables-for-use-as-content/">using HTML tables for content</a>


## Advisories

* mages far larger than they need to be when CSS is disabled