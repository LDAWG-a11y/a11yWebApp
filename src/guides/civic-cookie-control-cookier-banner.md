---
title: Civic Cookie Control cookier banner
summary: Accessibility issues with the Civic Cookie Control cookie banner
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

* **Ensure element is accessible by keyboard** - This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop keyboard users and screen reader users from being able to change options and submit their choices
* **Content behind “modal” banner not marked “inert”** - This fails WCAG 2.4.11 Focus Not Obscured (AA) and is one of the most impactful issues. This means that users can navigate around main page content "behind" the cookie banner. This is wrong because keyboard users can lose focus on interactive elements as the focus is hidden behind the cookie banner blocking the view
* **aria-label different to text in image** - This fails WCAG 1.4.5 1.4.5 Images of Text (AA) and WCAG 4.1.2 Name, Role, Value (A) and this can confuse users because the `aria-label="Set cookie preferences."` which differs from the C in the svg image
* **Ensure the contrast between foreground and background colours meets WCAG 2 A contrast ratio thresholds** - This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read
* **Focus goes to “C” image rather than main body** - This fails WCAG 2.4.3 Focus Order (A). This is going to confuse keyboard users and screen reader users because the focus should go to the body element when cookies are accepted or rejected, and the cookie control should be the last in the DOM rather than the first
* **Checkbox should not be used as a toggle switch** - This fails WCAG 1.3.1 Info and Relationships (A), WCAG 2.4.6 Headings and labels (AA), and WCAG 4.1.2 Name, Role, Value (A). Accessible names, ARIA attributes, or unique ARIA id are used by AT to understand the roles of elements and their children

## Weaknesses

* The example page the banner was tested on had so many links when using the keyboard to tab through the page, it took 43 tabs to get through the “Reject all” button which was the first button on the banner
* With CSS turned off, images far larger than they need to be when CSS is disabled

## Advisories

* The aria-expanded on modal is not necessarily needed