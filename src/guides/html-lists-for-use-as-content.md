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
  - Menu
---
## Introduction to content lists

This guide provides useful information on when to use lists, when not to use lists, and how to write lists that are both meaningful and understandable for all users.

## What are lists for

We use lists to display lists of information whether they are ordered, unordered or definitions. 

## DIR and MENU should not be used

`dir` elements were used for creating multicolumn directory lists and the `menu` element was for single column menu lists but are now deprecated. Use `ul` instead.

## Unordered Lists

Unordered lists `<ul>` are lists that do not have any order and display with a bullet point such as:

* Ford Prefect
* Austin Healy
* Morris Oxford
* Jowett Jupiter

Unordered lists start with a `<ul>` and end with a `</ul>` and each list item starts with a `<li>` and ends with a `</li>` for example:

```html
<ul>
  <li>Ford Prefect</li>
  <li>Austin Healy</li>
  <li>Morris Oxford</li>
  <li>Jowett Jupiter</li>
</ul>
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
  ol.decimal { list-style-type: decimal }
</style>

<ol class="decimal">
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

<ol class="decimal">
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

#### type="A"

```html
<ol type="A">
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

<ol type="A">
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

#### upper-alpha

```html
<style>
  ol.upper-alpha { list-style-type: upper-alpha }
</style>

<ol class="upper-alpha">
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

<ol class="upper-alpha">
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

#### type="a"

```html
<ol type="a">
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

<ol type="a">
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

#### lower-alpha

```html
<style>
  ol.lower-alpha { list-style-type: lower-alpha }
</style>

<ol class="lower-alpha">
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

<ol class="lower-alpha">
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

#### type="I"

```html
<ol type="I">
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

<ol type="I">
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

#### upper-roman

```html
<style>
  ol.upper-roman { list-style-type: upper-roman }
</style>

<ol class="upper-roman">
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

<ol class="upper-roman">
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

#### type="i"

```html
<ol type="i">
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

<ol type="i">
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

#### lower-roman

```html
<style>
  ol.lower-roman { list-style-type: lower-roman }
</style>

<ol class="lower-roman">
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

<ol class="lower-roman">
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

#### Start attribute

Using the start attribute allows you to start the list from a number larger than 1 so start="10" in the code

```html
<ol start="10">
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

<ol start="10">
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

## List items

Within the list item `<LI>` HTML can be used such as` <LI><STRONG>`Ford`</STRONG>` Prefect`</LI>`

## Nested Lists

Nested lists are lists nested within another list.

```html
<ul>
  <li>Fast Escorts
    <ul>
      <li>Mexico</li>
      <li>RS1600</li>
      <li>RS1800</li>
      <li>RS2000</li>
      <li>RS2000 Droop Snoot</li>
    </ul>
  </li>
  <li>Fast Capri’s
    <ul>
      <li>1600GT</li>
      <li>1.6S</li>
      <li>2000GT</li>
      <li>2.0S</li>
      <li>RS2600</li>
      <li>2.8i</li>
      <li>2.8 Turbo</li>
      <li>280</li>
      <li>Tickford Turbo</li>
      <li>3000GT</li>
      <li>3.0S</li>
      <li>RS3100</li>
    </ul>
  </li>
</ul>
```

<ul>
  <li>Fast Escorts
		<ul>
			<li>Mexico</li>
			<li>RS1600</li>
			<li>RS1800</li>
			<li>RS2000</li>
			<li>RS2000 Droop Snoot</li>
		</ul>
  </li>
  <li>Fast Capri’s
    <ul>
      <li>1600GT</li>
      <li>1.6S</li>
      <li>2000GT</li>
      <li>2.0S</li>
      <li>RS2600</li>
      <li>2.8i</li>
      <li>2.8 Turbo</li>
      <li>280</li>
      <li>Tickford Turbo</li>
      <li>3000GT</li>
      <li>3.0S</li>
      <li>RS3100</li>
    </ul>
  </li>
</ul>

## Description Lists

Description lists are lists which consist of terms and their descriptions such as 

```html
<dl>
  <dt>Ford Escort RS Mexico</dt>
  <dd>Fast Ford</dd>
  <dt>Ford Escort Popular</dt>
  <dd>Slow Ford</dd>
</dl>

```

<dl>
 	<dt>Ford Escort RS Mexico </dt>
	<dd>Fast Ford</dd>
	<dt>Ford Escort Popular </dt>
	<dd>Slow Ford</dd>
</dl>

The definition of description list tags are outlined below:


`<dl>` - description list

`<dt>` -  term (name)

`<dd>` - description of term

## Styling Lists

The list-style-type CSS property is used to change the style of the bullet points.

### list-style-type CSS property

<table>
	<caption>list-style-type</caption>
	<thead>
		<tr>
			<th scope="col">Value</th>
			<th scope="col">Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">disc</th>
			<td>List item marker is set to a bullet (default)</td>
		</tr>
		<tr>
			<th scope="row">circle</th>
			<td>List item marker is set to a circle</td>
		</tr>
		<tr>
			<th scope="row">square</th>
			<td>List item marker is set to a square</td>
		</tr>
		<tr>
			<th scope="row">none</th>
			<td>List items will not be marked</td>
		</tr>
	</tbody>
</table>

This is set using the following `style="list-style-type:square;"`

```html
<ul style="list-style-type:square;">
  <li>Sir Terry Pratchett</li>
  <li>Douglas Adams</li>
  <li>J.R.R Tolkien</li>
  <li>Arthur Ransome</li>
  <li>Isaac Asimov</li>
  <li>Robert E. Howard</li>
  <li>Arthur C. Clarke</li>
  <li>Michael Moorcock</li>
  <li>Sir Arthur Conan Doyle</li> 
</ul>
```

<ul style="list-style-type:square;">
	<li>Sir Terry Pratchett</li>
	<li>Douglas Adams</li>
	<li>J.R.R Tolkien</li>
	<li>Arthur Ransome</li>
	<li>Isaac Asimov</li>
	<li>Robert E. Howard</li>
	<li>Arthur C. Clarke</li>
	<li>Michael Moorcock</li>
	<li>Sir Arthur Conan Doyle</li> 
</ul>

### Using CSS to produce horizontal lists

If we have a unordered list like this

```html
<ul>
  <li>
    <a href="/">Home</a>
  </li>
  <li>
    <a href="/about/">About</a>
  </li>
  <li>
    <a href="/guides/">Guides</a>
  </li>
  <li>
    <a href="/faqs/">FAQs</a>
  </li>
</ul>
```

![Unordered list without css to style the list into a menu](src/guideImg/navig-no-css.png)

We can use CSS styling to produce a navigation menu that looks like this

```html
<style>
  .main-nav__list {
    list-style-type: none;
    display: flex;
    justify-content: space-evenly;	
  }
</style>

<ul class="main-nav__list">
  <li class="main-nav__item">
    <a href="/">Home</a>
  </li>
  <li class="main-nav__item">
    <a href="/about/">About</a>
  </li>
  <li class="main-nav__item">
    <a href="/guides/">Guides</a>
  </li>
  <li class="main-nav__item">
    <a href="/faqs/">FAQs</a>
  </li>
</ul>
```

![Unordered list styles with CSS to appear as a menu](src/guideImg/navig-css.png)

### Using CSS to produce lists with 1.1.1 numbers

```html
<style>
  ::marker {
	  content: counters(list-item,'.') '.';
  }
</style>

<ol class="multilevel">
  <li>Ford
    <ol>
      <li>Escort
        <ol>
          <li>Mexico</li>
          <li>RS1600</li>				
        </ol>
      </li>
      <li>Capri</li>
    </ol>
  </li>
  <li>Opel
    <ol>
      <li>Manta</li>		  
    </ol>
  </li>
</ol>
```

 <ol class="multilevel">
  <li>Ford
    <ol>
      <li>Escort
        <ol>
          <li>Mexico</li>
          <li>RS1600</li>				
        </ol>
      </li>
      <li>Capri</li>
    </ol>
  </li>
  <li>Opel
    <ol>
      <li>Manta</li>		  
    </ol>
  </li>
</ol>

## Wrapping up

Hopefully this guide has helped you to understand a bit more of using HTML lists for content. 

### Useful links

* [W﻿3C Lists](https://www.w3.org/TR/html4/struct/lists.html) (external link)
* [D﻿eveloper Mozilla Ordered Lists](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) (external link)
* [W﻿3Schools HTML Lists](https://www.w3schools.com/html/html_lists.asp) (external link)