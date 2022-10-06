---
title: HTML headings for use as content
summary: This guide provides useful information on when to use headings, when
  not to use headings, and how to write headings that are both meaningful and
  understandable for all users.
author: swilkinson
date: 2022-09-30
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

Headings are ranked from 1 to 6:

* `<h1>`
* `<h2>`
* `<h3>`
* `<h4>`
* `<h5>`
* `<h6>`

Where `<h1>` has the greatest importance and `<h6>` has the least and browsers usually add white space before and after each heading.

Try to only use one `<h1>` on a page but make sure that there is an `<h1>`.

Do not miss ranks out because this can be confusing eg. make sure that `<h3>` is not followed directly by an `<h4>`:

`<h1>`These are HTML headings`</h1>`
`<h3>`This is something less important`</h3>`
`<h4>`This is something even less important`</h4>`