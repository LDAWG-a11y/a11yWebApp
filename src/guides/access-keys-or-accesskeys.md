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
isGuide: true
---
## Introduction to access keys

Web browser Access Keys were developed to enable a computer user to go to a particular web page or field immediately when a specified key is pressed alongside the Alt key. It is not recommended that they are used because they cause more issues for users of adaptive technology (AT) than they solve.

## History

In 1999 [Access Keys](https://en.wikipedia.org/wiki/Access_key) were first introduced and most browsers now support them.

## UK Government accesskeys standard

The UK Government published in May 2002 the [Building in universal accessibility + checklist](https://webarchive.nationalarchives.gov.uk/ukgwa/20100703000205/http://archive.cabinetoffice.gov.uk/e-government/resources/handbook/html/2-4.asp) (which was archived on 3 July 2010) and defined the [UK Government accesskeys standard](https://webarchive.nationalarchives.gov.uk/ukgwa/20100703000205/http://archive.cabinetoffice.gov.uk/e-government/resources/handbook/html/2-4.asp#2.4.4) which recommends the following keys and their use:

<dl>
  <dt>S</dt>
  <dd>Skip navigation</dd>
  <dt>1</dt>
  <dd>Home page</dd>
  <dt>2</dt>
  <dd>What's new</dd>
  <dt>3</dt>
  <dd>Site map</dd>
  <dt>4</dt>
  <dd>Search</dd>
  <dt>5</dt>
  <dd>Frequently Asked Questions (FAQ)</dd>
  <dt>6</dt>
  <dd>Help</dd>
  <dt>7</dt>
  <dd>Complaints procedure</dd>
  <dt>8</dt>
  <dd>Terms and conditions</dd>
  <dt>9</dt>
  <dd>Feedback form</dd>
  <dt>0</dt>
  <dd>Access key details</dd>
</dl>

## How to use access keys

<dl>
  <dt>Alt + 0</dt>
  <dd>Access key details</dd>
  <dt>Alt + 1</dt>
  <dd>Site homepage</dd>
  <dt>Alt + 3</dt>
  <dd>Sitemap</dd>
  <dt>Alt + S</dt>
  <dd>Skip navigation</dd>
</dl>

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

## Wrapping up

Due to the accessibility concerns of using access keys it is recommended that they are not used.

## Useful links

* [WHATWG community HTML Living Standard](https://html.spec.whatwg.org/multipage/)
* [WHATWG community The accesskey attribute](https://html.spec.whatwg.org/multipage/interaction.html#the-accesskey-attribute) 
* [W3 Schools Global Access Keys](https://www.w3schools.com/tags/att_global_accesskey.asp)
* [MDN Web Docs Access Key](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey)
* [WebAim Accesskey](https://webaim.org/techniques/keyboard/accesskey)
* [Why Access Keys Are Mostly Useless for Accessibility Purposes](https://www.thesitewizard.com/webdesign/access-keys-are-useless.shtml)