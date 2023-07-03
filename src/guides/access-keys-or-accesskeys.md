---
title: Access keys or accesskeys
summary: This guide provides guidance on how to use access keys and why you
  should not use them.
author: swilkinson
date: 2023-07-03
toc: true
tags:
  - HTML
  - accesskey
  - access key
  - hot-key
isGuide: true
---
## Introduction to access keys

Web browser Access Keys were developed to enable a computer user to go to a particular web page or field immediately when a specified key is pressed alongside the Alt key. It is not recommended that they are used because they [cause more issues for users of adaptive technology (AT) than they solve](https://www.makethingsaccessible.com/guides/access-keys-or-accesskeys/#accessibilty-concerns).

## History

In 1999 [Access Keys](https://en.wikipedia.org/wiki/Access_key) were first introduced and most browsers now support them.

## UK Government accesskeys standard

The UK Government published in May 2002 the [Building in universal accessibility + checklist](https://webarchive.nationalarchives.gov.uk/ukgwa/20100703000205/http://archive.cabinetoffice.gov.uk/e-government/resources/handbook/html/2-4.asp) (which was archived on 3 July 2010) and defined the [UK Government accesskeys standard](https://webarchive.nationalarchives.gov.uk/ukgwa/20100703000205/http://archive.cabinetoffice.gov.uk/e-government/resources/handbook/html/2-4.asp#2.4.4) which recommends the following keys and their use:

<table>
  <caption>UK Government accesskeys</caption>
  <thead>
    <tr>
      <th scope="col">Key</th>
      <th scope="col">Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">S</th>
      <td>Skip navigation</td>
    </tr>
    <tr>
      <th scope="row">1</th>
      <td>Home page</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>What's new</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Site map</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Search</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Frequently Asked Questions (FAQ)</td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td>Help</td>
    </tr>
    <tr>
      <th scope="row">7</th>
      <td>Complaints procedure</td>
    </tr>
    <tr>
      <th scope="row">8</th>
      <td>Terms and conditions</td>
    </tr>
    <tr>
      <th scope="row">9</th>
      <td>Feedback form</td>
    </tr>
    <tr>
      <th scope="row">0</th>
      <td>Access key details</td>
    </tr>
  </tbody>
</table>

## How to use access keys

<table>
  <caption>Navigation with accesskeys</caption>
  <thead>
    <tr>
      <th scope="col">Keys</th>
      <th scope="col">Page</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Alt + 0</th>
      <td>Access key details</td>
    </tr>
    <tr>
      <th scope="row">Alt + 1</th>
      <td>Site homepage</td>
    </tr>
    <tr>
      <th scope="row">Alt + 3</th>
      <td>Sitemap</td>
    </tr>
    <tr>
      <th scope="row">Alt + S</th>
      <td>Skip navigation</td>
    </tr>
  </tbody>
</table>

## How to specify access keys

It can be helpful to the user to do something to show what key is the access key and this can be done in a number of ways. For example one method is to show which key is the access key via the use of an `<u>`

So for the link below

`<a href="index.aspx" accesskey="h">Home</a>`

It would be 

`<a href="index.aspx" accesskey="h"><u>H</u>ome</a>`

Or emphasis could be used

`<a href="index.aspx" accesskey="h"><em>H</em>ome</a>`

Or CSS can be used

`*[accesskey]:after {content:' [' attr(accesskey) ']'}`

## How to specify access keys

It can be helpful to the user to do something to show what key is the access key and this can be done by showing a list of the keys and what they do.

## Accessibilty concerns

* There is poor support amongst the browsers (and different operating systems use different keys to activate them)
* There is not a standardised set of accesskeys but if accesskeys are to be useful to a website, they must be specifically customised for that website – the number of frequently used common keys are very small
* The accesskey may not work in a particular combination of AT, browser and OS whereas it will work in another
* Some accesskey values are missing on specific keyboards, such as particular language ones.
* There is the possibility of activating the accesskey accidentally if the user is not aware that it exists
* If the user has cognitive issues then accesskeys that use numbers can be confusing especially if the functionality does not have an association to the number that is logical
* The accesskey may conflict with short cut keys within the AT or the browser and stop important functionality being accessed
* Using the accesskeys can be more difficult that normal typing often requiring  greater dexterity

## Alternatives

JavaScript can be used as an alternative to activate shortcut key functionality because it is able to detect key presses, or a combination of key presses, but there may be possible conflicts that are hard to identify.

## Windows virtual buffer

Screen readers used in Windows support interaction with browser rendered content by using a virtual model. A virtual buffer of content is generated using the page content, based upon the accessibility tree and information in DOM, and the screen reader presents this to the user.

The screen reader interacts with the virtual buffer by listening for events generated by the keyboard. When a key press is detected that has a corresponding command utilised by the screen reader, that command is executed in the virtual buffer. If there is not a corresponding command, the browser is passed the key where it will be captured by the  JavaScript handler. 

Unfortunately, most available keys are allocated for Windows screen reader specific commands, and not many keys are able to pass through to the browser, and the JavaScript shortcuts therefor do not get triggered. 

You can tell Jaws and NVDA to route the next key to the browser:

* NVDA - press NVDA modifier (insert) f2, followed by the key to be passed through
* Jaws - press Jaws modifier (insert) 3, followed by the key you want to pass through

## Wrapping up

Good usability allows the website design to provide flexibility, and user controls will help make a website accessible, and while there are always going to be trade-offs, this will enable the adjustment of the interface to match users’ requirements, and work with their accessibility settings, assistive technology, and adaptive strategies.

We would recommend due to the noted accessibility concerns of access keys that they are not used, but if you are going to use accesskeys use the GOV.UK standard or if it does not apply:

* Determine commonly used or important links on your website
* Place the links into a numbered list `<ol>`
* Use the numbers "1" - "9" in order for the items in the list
* Throughout the website use this consistently
* Put the list after the main content at the bottom of the page unless they can be in the navigation bar (if there are two or three)

Remember access keys are a fallback for things that do not have a standard activation behaviour.

## Useful links

* [Access Keys](https://en.wikipedia.org/wiki/Access_key)
* [WHATWG community HTML Living Standard](https://html.spec.whatwg.org/multipage/)
* [WHATWG community The accesskey attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-accesskey-attribute) 
* [W3C Accesskey](https://www.w3.org/WAI/PF/HTML/wiki/Accesskey)
* [Shared Techniques wiki for the W3C Mobile Web Initative Best Practices AccessKeys](https://www.w3.org/2005/MWI/BPWG/techs/AccessKeys.html)
* [W3 Schools Global Access Keys](https://www.w3schools.com/tags/att_global_accesskey.asp)
* [MDN Web Docs Access Key](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey)
* [WebAim Accesskey](https://webaim.org/techniques/keyboard/accesskey)
* [Why Access Keys Are Mostly Useless for Accessibility Purposes](https://www.thesitewizard.com/webdesign/access-keys-are-useless.shtml)
* [Usable Accessibility: Making Web Sites Work Well for People with Disabilities](https://www.uxmatters.com/mt/archives/2009/02/usable-accessibility-making-web-sites-work-well-for-people-with-disabilities.php)
* [Time to revisit accesskey?](https://tink.uk/time-to-revisit-accesskey/)
* [WUHCAG - Keyboard (2.1.1 – Level A)](https://www.wuhcag.com/keyboard/)
* [UK Government accesskeys standard](https://webarchive.nationalarchives.gov.uk/ukgwa/20100703000205/http://archive.cabinetoffice.gov.uk/e-government/resources/handbook/html/2-4.asp#2.4.4)
* [HOBO SEO Consultancy - UK Government Access Keys Standard For Websites](<HOBO SEO Consultancy - UK Government Access Keys Standard For Websites>)