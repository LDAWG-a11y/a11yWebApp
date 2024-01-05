---
title: Cookie banners case study
summary: Many organisations are using third-party cookie banners to meet their
  GDPR responsibilities. These banners often cause accessibility issues that you
  may not be aware of. This case study covers several examples of common in use
  cookie banners and their accessibility compliance to form a "for information"
  reference guide.
author: swilkinson
date: 2023-10-10
toc: false
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
* Easy Cookie
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

## Cookie banner accessibility issues

<h3 class="accordion">Admiral</h3><div class="accordion__panel">#### Accessibility issues

* **Elements are not accessible by keyboard** - This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop keyboard users and screen reader users from being able to change options and submit their choices.
* **Content behind “modal” banner not marked “inert”** - This fails WCAG 2.4.11 Focus Not Obscured (AA) and is one of the most impactful issues. This means that users can navigate around main page content "behind" the cookie banner. This is wrong because keyboard users can lose focus on interactive elements as the focus is hidden behind the cookie banner blocking the view.
* **Focus is not visible when using the keyboard** - This fails WCAG 2.4.7 Focus Visible (AA). This normally occurs on links, buttons, and cookie selection toggle. This can stop keyboard only users from being able to follow what components they are interacting with in the cookie banner.
* **Banner does not work with magnification** - This fails WCAG 1.4.10 Reflow (A). Some banners do not respond well to magnification, zooming, or being viewed on smaller screens which sometimes makes content get lost off the side of the screen. This can stop partially sighted and magnifier users from accessing all content.
* **Contrast colour issues on text, links, and buttons** - This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read.
* **User is not made aware of new content or changes** - This fails WCAG 4.1.2 Name, Role, Value (A). Often when screen reader users change a toggle control or expand a collapsed content section (accordion) they are not told that there is more content to read, or whether the toggle control now means they have accepted or declined cookies.
* **Duplicate labels used** - This fails WCAG 2.4.6 Headings and Labels (AA). Often all cookie acceptance checkboxes are identified as "accept cookies" rather than "accept marketing cookies" or "accept analytics cookies". Not being able to differentiate the controls because everything has the same label stops screen reader users from making informed choices.
* **Label associated with form control is empty** - This fails WCAG 1.3.1 Info and Relationships (A). Labels require text so that users of Assistive Technology (AT) can understand what the control is for.

#### Weaknesses

* When using the keyboard to tab through the page, it takes 43 tabs to get through the “Reject all” button which is the first button on the banner.
* When CSS is turned off, images are huge and need to be resized making the page easier to read without CSS or with user defined CSS.
* There are `<b>` tags used and these have been deprecated since HTML 4. `<b>` is not the same as `<strong>` because `<strong>`, `<em>` and `<mark>` represent text of importance whereas `<b>` does not convey that semantic information. If you need the headings to be bold or strong, use styles rather than `<b>` or `<strong>`, but most screen readers will not announce text inside the `<b>` HTML tags any differently, so emphasis is lost for those who cannot see the text.
* Some users of screen readers may not be able to use the consent checkboxes as they won't work with implicit labels, only explicit labels. Change the “toggles” to two radio buttons within a fieldset with the legend such as suggested by Sara Soueidan in her article [On Designing and Building Toggle Switches](https://www.sarasoueidan.com/blog/toggle-switch-design/).

#### Advisories

* List disguised as a table using CSS – display as list or create an accessible table.
* Some customer versions that the “Reject all” button is removed. GDPR has to be as easy to reject as it is to accept, so that not having the “Reject all" which is the equivalent to the “Accept all” means it is far harder to reject as each individual consent checkbox has to set to off. Do not allow customers to remove the “Reject all” button.

</div>

<h3 class="accordion">Civic Cookie Control</h3><div class="accordion__panel">#### Accessibility issues

* **Elements are not accessible by keyboard** - This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop keyboard users and screen reader users from being able to change options and submit their choices.
* **Content behind “modal” banner not marked “inert”** - This fails WCAG 2.4.11 Focus Not Obscured (AA) and is one of the most impactful issues. This means that users can navigate around main page content "behind" the cookie banner. This is wrong because keyboard users can lose focus on interactive elements as the focus is hidden behind the cookie banner blocking the view.
* **Focus is not visible when using the keyboard** - This fails WCAG 2.4.7 Focus Visible (AA). This normally occurs on links, buttons, and cookie selection toggle. This can stop keyboard only users from being able to follow what components they are interacting with in the cookie banner.
* **Aria-label different to text in image** - This fails WCAG 1.4.5 Images of Text (AA). The label has different a sentence but the text of the SVG image is only one letter. This is confusing to users as the should text in each case should be the same.
* **Contrast colour issues on text, links, and buttons** - This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read.
* **Focus goes to “C” image rather than main body** - This fails WCAG 2.4.3 Focus Order (A). When cookies are accepted or rejected the focus goes to the "C" image/link rather than the main body.
* **Checkbox should not be used as a toggle switch**  - This fails WCAG 1.3.1 Info and Relationships (A), 2.4.6 Headings and Labels (AA), and 4.1.2 Name, Role, Value (A). Accessible names, ARIA attributes, or unique ARIA id are used by AT to understand the roles of elements and their children. The accessible name is “Analytical Cookies” and should, using the current set up, be made up of the header and text in div, but because Gestalt Theory of Proximity states “that things that are close together appear to be more related than things that are spaced farther apart.”, due to the distance “Analytical Cookies” is from the check box, it fails this. This means that when using voice input on Mac or Voice access on Windows "click off" does not turn off the checkbox, the user has to say "click Analytical Cookies " does turn it off. Change the checkbox to two radio buttons and within a fieldset with the legend such as suggested by Sara Soueidan in her article [On Designing and Building Toggle Switches](https://www.sarasoueidan.com/blog/toggle-switch-design/).

#### Weaknesses

* When CSS is turned off, images are huge and need to be resized making the page easier to read without CSS or with user defined CSS.

#### Advisories

* The aria-expanded on modal is not necessarily needed.

</div>

<h3 class="accordion">Easy Cookie</h3><div class="accordion__panel">#### Accessibility issues

* **Elements are not accessible by keyboard** - This fails WCAG 2.1.1 Keyboard (A). This normally affects interactive components such as links, buttons, collapsed content, and cookie selection toggles. This can stop keyboard users and screen reader users from being able to change options and submit their choices.
* **Content behind “modal” banner not marked “inert”** - This fails WCAG 2.4.11 Focus Not Obscured (AA) and is one of the most impactful issues. This means that users can navigate around main page content "behind" the cookie banner. This is wrong because keyboard users can lose focus on interactive elements as the focus is hidden behind the cookie banner blocking the view.
* **Focus is not visible when using the keyboard** - This fails WCAG 2.4.7 Focus Visible (AA). This normally occurs on links, buttons, and cookie selection toggle. This can stop keyboard only users from being able to follow what components they are interacting with in the cookie banner.
* **Contrast colour issues on text, links, and buttons** - This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read.
* **Visible label with hidden input** - This fails WCAG 1.3.1 Info and Relationships and 4.1.2 Name, Role, Value (A). Labels are used so that AT users can understand what they need to enter data and hiding inputs is confusing.
* **Accordions do not notify all screen readers when they open or close** - This fails WCAG 4.1.2 Name, Role, Value (A). AT users are not notified when the accordion is opened. The accordions should be changed to [accessible basic disclosure widgets](https://www.makethingsaccessible.com/guides/accessible-basic-disclosure-widgets/). Scott O’Hara has a guide to [Progressively enhanced ARIA accordions](https://scottaohara.github.io/a11y_accordions/). [MakeThingsAccessible](https://www.makethingsaccessible.com/) has some good advice on [making keyboard accessible accordions](https://www.makethingsaccessible.com/guides/accessible-basic-disclosure-widgets/).
* **Multiple labels with same text content** - This fails WCAG 1.3.1 Info and Relationships, 2.4.6 Headings and Labels (AA),  and 3.3.2 Labels or Instructions (A). Labels stating the same text is confusing for AT users.

#### Weaknesses

* Tables do not use scope which allows accessibility tools to understand which column or row a cell belongs to. [MakeThingsAccessible](https://www.makethingsaccessible.com/) has a good guide to [using HTML tables for content.](https://www.makethingsaccessible.com/guides/html-tables-for-use-as-content/)

#### Advisories

* When CSS is turned off, images are huge and need to be resized making the page easier to read without CSS or with user defined CSS.

</div>

<h3 class="accordion">GOV.UK</h3><div class="accordion__panel">

GOV.UK is fully compliant with WCAG 2.2 AA standards.

</div>

<h3 class="accordion">Ketch</h3><div class="accordion__panel">#### Accessibility issues

* **Active SVG missing aria-label** - This fails WCAG 4.1.2 Name, Role, Value (A). The button does not have an accessible name so it is read out as “button” when using a screen reader.
* **Checkbox should not be used as a toggle switch**  - This fails WCAG 1.3.1 Info and Relationships (A), 2.4.6 Headings and Labels (AA), and 4.1.2 Name, Role, Value (A). Accessible names, ARIA attributes, or unique ARIA id are used by AT to understand the roles of elements and their children. Aria-label has been used so that the accessible name is “Behavioral Advertising Purpose is OFF”. This is extremely confusing because to someone using AT, it would appear that the aria-label=”Behavioral Advertising Purpose” and the “is OFF” refers to the status of the checkbox. A user using Microsoft Voice access or voice input on Mac is likely to say “click Behavioral Advertising Purpose“ expecting that to check or uncheck the checkbox. Change the checkbox to two radio buttons and within a fieldset with the legend such as suggested by Sara Soueidan in her article [On Designing and Building Toggle Switches](https://www.sarasoueidan.com/blog/toggle-switch-design/).
* **Content behind “modal” banner not marked “inert”** - This fails WCAG 2.4.11 Focus Not Obscured (AA) and is one of the most impactful issues. This means that users can navigate around main page content "behind" the cookie banner. This is wrong because keyboard users can lose focus on interactive elements as the focus is hidden behind the cookie banner blocking the view.
* **Focus is not visible when using the keyboard** - This fails WCAG 2.4.7 Focus Visible (AA). This normally occurs on links, buttons, and cookie selection toggle. This can stop keyboard only users from being able to follow what components they are interacting with in the cookie banner.
* **Aria-controls are missing and the keyboard interaction pattern is incorrect** - This fails WCAG 1.3.2 Meaningful Sequence (A) and 2.4.3 Focus Order (A). The aria-controls are missing from the elements, there is a needless label, and the keyboard interaction pattern is wrong - left and right arrow keys don't work – and it also fails on focus order as it goes to About before tabbing into content.

#### Weaknesses

* Even though the link title is different for each “Learn more about this provider”, Windows Narrator only reads out “Learn more about this provider”. Change the link to “Learn more about LinkedIn”, “Learn more about Usercentrics” etc.

#### Advisories

No advisories.

</div>

<h3 class="accordion">OneTrust CookiePro</h3><div class="accordion__panel">#### Accessibility issues

* **Focus is not visible when using the keyboard** - This fails WCAG 2.4.7 Focus Visible (AA). This normally occurs on links, buttons, and cookie selection toggle. This can stop keyboard only users from being able to follow what components they are interacting with in the cookie banner.
* **Contrast colour issues on text, links, and buttons** - This fails WCAG 1.4.3 Contrast Minimum (AA). Whether this is due to cookie banner default colour schemes or organisation customised branding schemes, poor colour contrast can make content harder to see and read.
* **`<svg>` acts as an image, but is missing an explicit role="img"** - This fails WCAG 1.1.1 Non-text Content (A). This means that assistive technology users do not know that the element is an image and there is not alt-text for the element to give meaningful information to them. 
* **The accessible name of the control (which is exposed to assistive technologies) does not contain the visible text** - This fails WCAG 2.5.3 Label in Name (A). For user interface components with labels that include text or images of text, the name contains the text that is presented visually. In this case the link has the text of “Cookie Notice”, but the aria-label “More information about cookies and other trackers we use”. The aria-label overrides the title so “More information about cookies and other trackers we use” will get read out by the AT and the text “Cookie Notice” will not.
* **List works with incorrect keys** - This fails WCAG 2.4.3 Focus Order (A). When you have tabbed into the list of options, you have to use the left and right arrow keys to move through the list rather than the up and down arrow keys. There also seems to be an event trapping the user from tabbing into the text. 

#### Weaknesses

* Don't set the visible link text to "here", "click here" or anything else that lacks context in isolation. Some users use assistive technologies which can bring up a list of links to navigate to and when those links have the readable text "here" or "click here", that makes it really difficult for them to understand where that link will go, more so if there are many of them, as this will impact voice input users, as they may instruct their voice control software "Click here", hoping to read more about an interesting blog and end up reading the cookies policy, as their software couldn't guess which "here" they meant.

#### Advisories

* When CSS is turned off, images are huge and need to be resized making the page easier to read without CSS or with user defined CSS.

</div>

