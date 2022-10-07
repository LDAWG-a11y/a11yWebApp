---
title: HTML lists for use as content
summary: This guide provides useful information on when to use lists, when not
  to use lists, and how to write lists that are both meaningful and
  understandable for all users.
author: swilkinson
date: 2022-10-07
tags:
  - HTML
  - List
---
## Introduction to content lists

This guide provides useful information on when to use lists, when not to use lists, and how to write lists that are both meaningful and understandable for all users.

## What are lists for

We use lists to display lists of information whether they are ordered, unordered or definitions. 

## DIR and MENU should not be used

`DIR` elements were used for creating multicolumn directory lists and the `MENU` element was for single column menu lists but are now deprecated. Use `UL` instead.

## Unordered Lists

Unordered lists `<UL>` are lists that do not have any order and display with a bullet point such as:

* Ford Prefect
* Austin Healy
* Morris Oxford
* Jowett Jupiter

Unordered lists start with a `<UL>` and end with a `</UL>` and each list item starts with a `<LI>` and ends with a `</LI>` for example:

```html
<UL>
	<LI>Ford Prefect</LI>
    <LI>Austin Healy</LI>
    <LI>Morris Oxford</LI>
    <LI>Jowett Jupiter</LI>
</UL>
```

## Ordered Lists

```html
<ol>
    <li>Sir Terry Pratchett</li>
    <li>Douglas Adams</li>
    <li>J.R.R Tolkien</li>
    <li>Arthur Ransome</li>
    <li>Isaac Asimov</li>
    <li>Robert E. Howard</li>
    <li>Arthur C. Clarke</li>
    <li>Michael Moorcock</li>
    <li>Sir Arthur Conan Doyle</li>
    <li>Agatha Christie</li>
    <li>Brian Aldiss</li>
    <li>Philip Pullman</li>  
</ol>
```

Which looks like this:

<ol>
    <li>Sir Terry Pratchett</li>
    <li>Douglas Adams</li>
    <li>J.R.R Tolkien</li>
    <li>Arthur Ransome</li>
    <li>Isaac Asimov</li>
    <li>Robert E. Howard</li>
    <li>Arthur C. Clarke</li>
    <li>Michael Moorcock</li>
    <li>Sir Arthur Conan Doyle</li>
    <li>Agatha Christie</li>
    <li>Brian Aldiss</li>
    <li>Philip Pullman</li>  
</ol>

### The Type attribute

The Type attribute is deprecated and an explanation of using style sheets is shown after this. Type examples are shown as you many come across examples of this in old HTML code

Note: Unless the type of the list number matters such as legal or technical documents where items are referenced by their number or letter, use the CSS list-style-type property instead such as lists with 1., 1.1, and 1.1.1 numbers.

<table>
	<caption>The Type attribute is used to define the style of the ordering</caption>
	<thead>
		<tr>
			<th scope="col">Type</th>
			<th scope="col">list-style-type</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">type="1"</th>
			<td>decimal</td>
			<td>List items numbered with numbers (default)</td>
		</tr>
		<tr>
			<th scope="row">type="A"</th>
			<td>upper-alpha</td>
			<td>List items numbered with uppercase letters</td>
		</tr>
		<tr>
			<th scope="row">type="a"</th>
			<td>lower-alpha</td>
			<td>List items numbered with lowercase letters</td>
		</tr>
		<tr>
			<th scope="row">type="I"</th>
			<td>upper-roman</td>
			<td>List items numbered with uppercase roman numbers</td>
		</tr>
		<tr>
			<th scope="row">type="i"</th>
			<td>lower-roman</td>
			<td>List items numbered with lowercase roman numbers</td>
		</tr>
	</tbody>
</table>

* [D﻿eveloper Mozilla Ordered List](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) (external website)
* [D﻿eveloper Mozilla List Style Type](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type) (external website)

#### type="1"

```html
<ol type="1">
  	<li>Sir Terry Pratchett</li>
  	<li>Douglas Adams</li>
  	<li>J.R.R Tolkien</li>
 	<li>Arthur Ransome</li>
  	<li>Isaac Asimov</li>
  	<li>Robert E. Howard</li>
  	<li>Arthur C. Clarke</li>
  	<li>Michael Moorcock</li>
 	<li>Sir Arthur Conan Doyle</li> 
</ol>

```

<ol type="1">
  	<li>Sir Terry Pratchett</li>
  	<li>Douglas Adams</li>
  	<li>J.R.R Tolkien</li>
 	<li>Arthur Ransome</li>
  	<li>Isaac Asimov</li>
  	<li>Robert E. Howard</li>
  	<li>Arthur C. Clarke</li>
  	<li>Michael Moorcock</li>
 	<li>Sir Arthur Conan Doyle</li> 
</ol>

#### arabic numbers

```html
<style>
	ol.withroman { list-style-type: decimal }
</style>
<ol class="withroman">
	<li>Sir Terry Pratchett</li>
	<li>Douglas Adams</li>
	<li>J.R.R Tolkien</li>
	<li>Arthur Ransome</li>
	<li>Isaac Asimov</li>
	<li>Robert E. Howard</li>
	<li>Arthur C. Clarke</li>
	<li>Michael Moorcock</li>
	<li>Sir Arthur Conan Doyle</li>
	<li>Agatha Christie</li>
	<li>Brian Aldiss</li>
	<li>Philip Pullman</li>  
</ol>
```

<style>
	ol.withroman { list-style-type: decimal }
</style>

<ol class="withroman">
	<li>Sir Terry Pratchett</li>
	<li>Douglas Adams</li>
	<li>J.R.R Tolkien</li>
	<li>Arthur Ransome</li>
	<li>Isaac Asimov</li>
	<li>Robert E. Howard</li>
	<li>Arthur C. Clarke</li>
	<li>Michael Moorcock</li>
	<li>Sir Arthur Conan Doyle</li>
	<li>Agatha Christie</li>
	<li>Brian Aldiss</li>
	<li>Philip Pullman</li>  
</ol>