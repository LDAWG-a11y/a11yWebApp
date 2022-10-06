---
title: HTML headings for use as content
summary: This guide provides useful information on when to use headings, when
  not to use headings, and how to write headings that are both meaningful and
  understandable for all users.
author: swilkinson
date: 2022-10-06
tags:
  - HTML
---
## Introduction to content headings

This guide provides useful information on when to use headings, when not to use headings, and how to write headings that are both meaningful and understandable for all users.

## What are headings for

We use headings to communicate how the content of the page is organised. 

Assisted Technology (AT), plugins, and web browsers use them to provide navigation within the page.

## What headings are NOT for

Headings are not used for stylistic formatting such as making text BIG or bold.

* [H﻿ow not to use headings](https://www.wearediagram.com/blog/how-not-to-use-html-headings) (external website)

## Heading ranks

### Headings are ranked from 1 to 6

* `<h1>`
* `<h2>`
* `<h3>`
* `<h4>`
* `<h5>`
* `<h6>`

Where `<h1>` has the greatest importance and `<h6>` has the least and browsers usually add white space before and after each heading.

Try to only use one `<h1>` on a page but make sure that there is an `<h1>`.

Do not miss ranks out because this can be confusing eg. make sure that `<h3>` is not followed directly by an `<h4>`:

```
<h1>These are HTML headings</h1>
    <h3>This is something less important</h3>
      <h4>This is something even less important</h4>
```

The headings should be organised as follows:

```
<h1>These are HTML headings</h1>
  <h2>This is something less important</h2>
    <h3>This is something even less important</h3>
```

It is okay to go from an `<h3>` to an `<h2>` when starting a new section:

```
<h1>HTML</h1>
  <h2>Tables</h2>
    <p>…</p>
    <h3>Nested tables</h3>
    <p>…</p>
  <h2>Lists</h2>
    <p>…</p>
    <h3>Unordered lists</h3>
    <p>…</p>
```

## Styling

Each heading has a default size but this can be changed with style and using CSS font-size property.

## Page organisation

Use headings for labelling regions on the page, by associating the heading with the specific page region by using the aria-labelledby to point to the existing element using its unique id. 

### Main heading before page navigation

```
<h1>Make things accessible</h1>
  <h2>Navigation</h2>
    <h3>Home</h3>
    <h3>Guides</h3>
    <h3>FAQs</h3>
  <h2>Showing 11 guides</h2>
    <h3>Headings</h3>
    <h3>Tables</h3>
    <h3>Images</h3>
  <h2>FAQs</h2>
    <h3>How do I create a numbered list?</h3>
    <h3>How do I create a nested table?</h3>
    <h3>How do I add alt-text to images?</h3>
  <h2>Footer</h2>
    <h3>Home</h3>
    <h3>About</h3>
    <h3>Guides</h3>
```

### Main heading after page navigation

```
<h2>Navigation</h2>
  <h3>Home</h3>
  <h3>Guides</h3>
  <h3>FAQs</h3>
<h2>Showing 11 guides</h2>
  <h3>Headings</h3>
  <h3>Tables</h3>
  <h3>Images</h3>
<h1>Make things accessible</h1>
  <h2>FAQs</h2>
    <h3>How do I create a numbered list?</h3>
    <h3>How do I create a nested table?</h3>
    <h3>How do I add alt-text to images?</h3>
  <h2>Footer</h2>
    <h3>Home</h3>
    <h3>About</h3>
    <h3>Guides</h3>
```

### Wrapping up

Hopefully this guide has helped you to understand a bit more of using HTML headers for content. It can be hard especially when the tables are really complicated, and there is an element of author discretion, but ultimately the summary is:

* Use headings to communicate how the content of the page is organised
* Do not skip levels
* Do not use stylistically

## Useful links

* [WWW Consortium](https://www.w3.org/WAI/tutorials/page-structure/headings/) (external website)
* [W3Schools](https://www.w3schools.com/html/html_headings.asp>) (external website)