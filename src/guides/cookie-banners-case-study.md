---
title: Cookie banners case study
summary: Many organisations are using third-party cookie banners to meet their
  GDPR responsibilities. These banners often cause accessibility issues that you
  may not be aware of. This case study covers several examples of common in use
  cookie banners and their accessibility compliance to form a "for information"
  reference guide.
author: swilkinson
date: 2023-10-10
toc: true
tags:
  - Third-party
  - Cookies
  - Audit
  - Remediation
  - Component
isGuide: true
---
Many organisations are using third-party cookie banners to meet their GDPR responsibilities. These banners often cause accessibility issues that you may not be aware of but will be flagged during accessibility testing and may have impacts on user experience of your websites.

This case study covers several examples of common in-use cookie banners and their accessibility compliance to form a "for information" reference guide to help you make accessible choices when it comes to cookie banner selection.

## What is a cookie banner

Since GDPR came into effect in 2018, most organisations follow regulation requirements to allow customers to make informed choices about their data collection when visiting websites and what cookies they will accept for data collection.

The most common way of encouraging website visitors to confirm their preferences when it comes to cookies is in the form of a banner presented on the website when a user first visits. These banners can work in a variety of ways, offering users different levels of customisability when it comes to cookie acceptance.

Some may give users only an overall selection of cookie types such as:

* Essential or Functional cookies
* Performance cookies
* Analytics cookies
* Marketing cookies

While other banners may give users the option to specifically allow / deny cookies from individual ad vendors or who they will allow their data to be shared with.

In most cases cookie banner contain links to cookie policies, interactive components such as checkboxes or toggle controls and instructive text which may be customised to organisation branding or colour schemes. These components all can introduce accessibility issues.

[More information from the ICO on Cookies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/).

## Cookie banners and accessibility regulations

While cookie banners are often purchased or used as third-party components, they perform an important active administrative function for users to make decisions on what information they provide to an organisation and additional data processors. Because of this, it is within the responsibilities of the website owner to ensure they are using accessible cookie banners on their website, and the choice of which falls within the scope of the public sector accessibility regulations 2018 for applicable public sector bodies.

## List of tested cookie banners

As part of this case study we have looked at the following cookie banners for accessibility compliance. All efforts have been made to test banners across a range of examples and ensure accuracy of results at the time of testing. 

This resource is intended for informational use only, to help organisations understand their options when it comes to cookie banners and accessibility and is in not a criticism of any individual component. We have linked to the accessibility information of any cookie banners we mention (where available) in each of the individual banner guides.

The cookie banners:

* Admiral
* Civic Cookie Control
* Easy Space Cookie
* Gov.uk
* Ketch
* OneTrust CookiePro
* Osano
* Piwik PRO
* Usercentrics Cookiebot
* Wordpress - admin
* Wordpress - ads



## Common cookie banner accessibility issues

Over the course of this case study we have documented many accessibility issues with cookie banner examples. The list below represented the most common accessibility issues we see with cookie banners and why they are a problem.

* **Focus is not visible when using the keyboard** - This fails WCAG 2.4.7 Focus Visible (AA). This normally occurs on links, buttons, and cookie selection toggle. This can stop keyboard only users from being able to follow what components they are interacting with in the cookie banner.
* **Content behind “modal” banner not marked “inert”** - This fails WCAG 2.4.11 Focus Not Obscured (AA) and is one of the most impactful issues. This means that users can navigate around main page content "behind" the cookie banner. This is wrong because keyboard users can lose focus on interactive elements as the focus is hidden behind the cookie banner blocking the view.
* **Elements are not accessible by keyboard** - This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop keyboard users and screen reader users from being able to change options and submit their choices.
* **Banner does not work with magnification** - This fails WCAG 1.4.10 Reflow (A). Some banners do not respond well to magnification, zooming, or being viewed on smaller screens which sometimes makes content get lost off the side of the screen. This can stop partially sighted and magnifier users from accessing all content.
* **Buttons do not have discernible text or Active SVG missing aria-label** - This fails WCAG 4.1.2 Name, Role, Value (A). When buttons or icon controls such as SVG icons do not have a text alternative name a range of users do not know what the button does or cannot call it correctly. For example screen reader users will just be told it is a button but not what it does, and dictation users will not be able to say "click accept button" because there is no text name to refer to the button.
* **The SVG acts as an image, but is missing an explicit role="img"** - This fails WCAG 1.1.1 Non-text Content (A). SVGs and other icons are often used in other scenarios as well but do not have appropriate alt text. When SVGs and other icons do not have a text alternative name a range of users do not know what the the content is or cannot call it correctly. For example screen reader users will just be told it is an image but not what the image represents.
* **User is not made aware of new content or changes** - This fails WCAG 4.1.2 Name, Role, Value (A). Often when screen reader users change a toggle control or expand a collapsed content section (accordion) they are not told that there is more content to read, or whether the toggle control now means they have accepted or declined cookies.
* **Form elements do not have labels** - This fails WCAG 1.3.1 Info and Relationships (A) and 4.1.2 Name, Role, Value (A). When screen reader users move through form elements such as radio buttons or checkboxes which are commonly used in cookie banners, they must be told what question they are answering or what type of cookie they are accepting / denying. When form elements do not have labels or legends users are not told what the context of the control is. For example instead of saying "accept marketing cookies checkbox not checked" it might just say "checkbox not checked" which does not help the user.
* **Duplicate labels used** - This fails WCAG 2.4.6 Headings and Labels (AA). Often all cookie acceptance checkboxes are identified as "accept cookies" rather than "accept marketing cookies" or "accept analytics cookies". Not being able to differentiate the controls because everything has the same label stops screen reader users from making informed choices.
* **Contrast colour issues on text, links, and buttons** - This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read.
* **Non-active element in tab order** - This fails WCAG 4.1.2 Name, Role, Value (A). Keyboard users use the tabindex to move between interactive components. Sometimes developers force include non-interactive elements in the tabindex which adds to the user journey time and can disrupt or confuse the reading of the cookie banner.