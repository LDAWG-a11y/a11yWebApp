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
The Type attribute is used to define the style of the ordering:

<table>
	<caption>Split of marks across course</caption>
	<tr>		
		<th colspan="3" id="p">Projects</th>
		<th rowspan="2" id="h">Homework</th>
		<th colspan="3" id="e">Exams</th>
   	</tr>
   	<tr>
		<th id="e1" headers="e">1</th>
		<th id="e2" headers="e">2</th>
		<th id="ef" headers="e">Final</th>
		<th id="p1" headers="p">1</th>
		<th id="p2" headers="p">2</th>
		<th id="pf" headers="p">Final</th>
   	</tr>
   	<tr>		
		<td headers="e e1">14%</td>
		<td headers="e e2">19%</td>
		<td headers="e ef">17%</td>
		<td headers="h">16%</td>
		<td headers="p p1">9%</td>
		<td headers="p p2">16%</td>
		<td headers="p pf">11%</td>
   	</tr>
</table>