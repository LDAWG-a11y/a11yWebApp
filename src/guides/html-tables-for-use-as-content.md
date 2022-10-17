---
title: HTML tables for use as content
summary: This guide provides useful information on when to use tables, when not
  to use tables, and how to write tables that are both meaningful and
  understandable for all users.
author: swilkinson
date: 2022-10-14
tags:
  - HTML
  - Tables
file: /docs/thumbnail_image003.png
---
## Introduction to content tables

This guide provides useful information on when to use tables, when not to use tables, and how to write tables that are both meaningful and understandable for all users.

## What are tables for

We use tables to display simple tabular data, and we avoid tables with merged cells or multiple levels of headings, and we don’t use nested tables. 

Nest can be made accessible in theory, but user testing shows that screen reader users of average ability always have difficulty with them in practice.

If we have a complicated table, then split the table into multiple simpler tables which will make it easier for us to make accessible and the audience to understand.

## What tables are NOT for

We do not use tables for the layout of content.

## Accessible tables that scrolls horizontally on mobile

To make an accessible table that will scroll horizontally on a mobile, you need to put your `<table>` element inside a `<div role="region" aria-labelledby="mycaption" tabindex="0">`

where `“mycaption”` references the `<caption id="mycaption">` that should be inside the table. The tabindex satisfies WCAG Success Criteria 2.1.1 Keyboard, and the aria-labelledby satisfies 4.1.2 Name, Role, Value. For the CSS, apply overflow: auto to the table, and don’t forget to apply a focus style.

* [Under-engineered responsive tables](https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html) (Adrian Roselli)

## Adding scope to tables

### Simple tables

Scope allows accessibility tools to understand which column or row a cell belongs to giving a better understanding of the information for those who are not able to see the table.

When we have a table: 

<table>
  <thead>
    <tr>
      <td><strong>Service</strong></td>
      <td><strong>March 2021</strong></td>
      <td><strong>April 2021</strong></td>
      <td><strong>May 2021</strong></td>
	</tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Black refuse</strong></td>
      <td>Wed 06, Wed 17, Wed 31</td>
      <td>Wed 14, Wed 28</td>
      <td>Wed 12, Wed 26</td>
	</tr>
	<tr>
      <td><strong>Recycling</strong></td>
      <td>Mon 01, Mon 08, Mon 15, Mon 22, Mon 29</td>
      <td>Tue 06, Mon 12, Mon 19, Mon 26</td>
      <td>Tue 04, Mon 10, Mon 17, Mon 24</td>
	</tr>
  </tbody>
</table>

With headings marked as normal `td` cells and `<strong>` tags across the top row as Service, March 2021, April 2021, May 2021

```html
<tr>
  <td><strong>Service</strong></td>
  <td><strong>March 2021</strong></td>
  <td><strong>April 2021</strong></td>
  <td><strong>May 2021</strong></td>
</tr>
```

and down the first column as Black Refuse, Recycling

```html
<tr>
  <td><strong>Black refuse</strong></td>
</tr>
<tr>
  <td><strong>Recycling</strong></td>
</tr>
```

To make tables more accessible, we edit the HTML and add `scope=”col”` to each `th` (table header), or a `th scope="row"` to the first cell of a row rather than a `td` where those cells are headings. This allows accessibility tools to understand which column or row a cell belongs to. 

So, a table like this:

```html
<table>
  <thead>
    <tr>
      <td><strong>Service</strong></td>
      <td><strong>March 2021</strong></td>
      <td><strong>April 2021</strong></td>
      <td><strong>May 2021</strong></td>
	</tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Black refuse</strong></td>
      <td>Wed 06, Wed 17, Wed 31</td>
      <td>Wed 14, Wed 28</td>
      <td>Wed 12, Wed 26</td>
	</tr>
	<tr>
      <td><strong>Recycling</strong></td>
      <td>Mon 01, Mon 08, Mon 15, Mon 22, Mon 29</td>
      <td>Tue 06, Mon 12, Mon 19, Mon 26</td>
      <td>Tue 04, Mon 10, Mon 17, Mon 24</td>
	</tr>
  </tbody>
</table>
```

<table>
  <thead>
    <tr>
      <td><strong>Service</strong></td>
      <td><strong>March 2021</strong></td>
      <td><strong>April 2021</strong></td>
      <td><strong>May 2021</strong></td>
	</tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Black refuse</strong></td>
      <td>Wed 06, Wed 17, Wed 31</td>
      <td>Wed 14, Wed 28</td>
      <td>Wed 12, Wed 26</td>
	</tr>
	<tr>
      <td><strong>Recycling</strong></td>
      <td>Mon 01, Mon 08, Mon 15, Mon 22, Mon 29</td>
      <td>Tue 06, Mon 12, Mon 19, Mon 26</td>
      <td>Tue 04, Mon 10, Mon 17, Mon 24</td>
	</tr>
  </tbody>
</table>

will be read out by a screen reader as follows:

* Table with three rows and four columns
* Row one Column one Service* 
* Column two March 2021
* Column three April 2021
* Column four May 2021
* Row two Column one Black Refuse
* Column two Wed 06, Wed 17, Wed 31
* Column three Wed 14, Wed 28
* Column four Wed 12, Wed 26
* Row three Column one Recycling
* Column two Mon 01, Mon 08, Mon 15, Mon 22, Mon 29
* Column three Tue 06, Mon 12, Mon 19, Mon 26
* Column four Tue 04, Mon 10, Mon 17, Mon 24

This table becomes:

```html
<table>
  <caption>Bin collections</caption>
  <thead>
    <tr>
      <th scope="col">Service</th>
      <th scope="col">March 2021</th>
      <th scope="col">April 2021</th>
      <th scope="col">May 2021</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Black refuse</th>
      <td>Wednesday 06, Wednesday 17, Wednesday 31</td>
      <td> Wednesday 14, Wednesday 28</td>
      <td> Wednesday 12, Wednesday 26</td>
	</tr>
	<tr>
      <th scope="row">Recycling</th>
      <td>Monday 01, Monday 08, Monday 15, Monday 22, Monday 29</td>
      <td>Tuesday 06, Monday 12, Monday 19, Monday 26</td>
      <td>Tuesday 04, Monday 10, Monday 17, Monday 24</td>
	</tr>
  </tbody>
</table>
```

The table will then look like:

<table>
  <caption>Bin collections</caption>
  <thead>
    <tr>
      <th scope="col">Service</th>
      <th scope="col">March 2021</th>
      <th scope="col">April 2021</th>
      <th scope="col">May 2021</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Black refuse</th>
      <td>Wednesday 06, Wednesday 17, Wednesday 31</td>
      <td> Wednesday 14, Wednesday 28</td>
      <td> Wednesday 12, Wednesday 26</td>
	</tr>
	<tr>
      <th scope="row">Recycling</th>
      <td>Monday 01, Monday 08, Monday 15, Monday 22, Monday 29</td>
      <td>Tuesday 06, Monday 12, Monday 19, Monday 26</td>
      <td>Tuesday 04, Monday 10, Monday 17, Monday 24</td>
	</tr>
  </tbody>
</table>

The table will be read out by a screen reader as follows:

* Table with three rows and fours columns
* Caption bin collections
* Row one Column one Service
* Column two March 2021
* Column three April 2021
* Column four May 2021
* Row two Service Column one Black refuse
* March 2021 Column two Wednesday 06, Wednesday 17, Wednesday 31
* April 2021 Column three Wednesday 14, Wednesday 28
* May 2021 Column four Wednesday 12, Wednesday 26
* Row three Service Column one Recycling
* March 2021 Column two Monday 01, Monday 08, Monday 15, Monday 22, Monday 29
* April 2021 Column three Tuesday 06, Monday 12, Monday 19, Monday 26
* May 2021 Column four Tuesday 04, Monday 10, Monday 17, Monday 24

### Grouped Header Associations

#### scope="colgroup" applied to column group headers

<table>
  <caption> Table with colgroup </caption>
  <thead>
    <tr>
      <td rowspan="2">&nbsp;</td>
      <th colspan="3" scope="colgroup">Females</th>
      <th colspan="3" scope="colgroup">Males</th>
    </tr>
    <tr>
      <th scope="col">Kate</th>
      <th scope="col">Nicky</th>
      <th scope="col">Kim</th>
      <th scope="col">Jon</th>
      <th scope="col">Paul</th>
      <th scope="col">Andrew</th>
    </tr>
  </thead> 
  <tbody>
    <tr>
      <th scope="row">1 mile</th>
      <td>7:32</td>
      <td>6:43</td>
      <td>8:51</td>
      <td>6:55</td>
      <td>6:01</td>
      <td>6:51</td>
    </tr>
    <tr>
      <th scope="row">5 km</th>  
      <td>27:04</td>
      <td>25:47</td>
      <td>37:15</td>
      <td>26:27</td>
      <td>23:21</td>
      <td>23:31</td>
    </tr>
    <tr>
      <th scope="row">10 km</th>
      <td>1:08:16</td>
      <td>54:38</td>
      <td>1:46:01</td>
      <td>58:04</td>
      <td>51:35</td>
      <td>52:45</td>
    </tr>
  </tbody>
</table>

```html
<table>
  <caption> Table with colgroup </caption>
  <thead>
    <tr>
      <td rowspan="2">&nbsp;</td>
      <th colspan="3" scope="colgroup">Females</th>
      <th colspan="3" scope="colgroup">Males</th>
    </tr>
    <tr>
      <th scope="col">Kate</th>
      <th scope="col">Nicky</th>
      <th scope="col">Kim</th>
      <th scope="col">Jon</th>
      <th scope="col">Paul</th>
      <th scope="col">Andrew</th>
    </tr>
  </thead> 
  <tbody>
    <tr>
      <th scope="row">1 mile</th>
      <td>7:32</td>
      <td>6:43</td>
      <td>8:51</td>
      <td>6:55</td>
      <td>6:01</td>
      <td>6:51</td>
    </tr>
    <tr>
      <th scope="row">5 km</th>  
      <td>27:04</td>
      <td>25:47</td>
      <td>37:15</td>
      <td>26:27</td>
      <td>23:21</td>
      <td>23:31</td>
    </tr>
    <tr>
      <th scope="row">10 km</th>
      <td>1:08:16</td>
      <td>54:38</td>
      <td>1:46:01</td>
      <td>58:04</td>
      <td>51:35</td>
      <td>52:45</td>
    </tr>
  </tbody>
</table>
```

#### scope="rowgroup" applied to column group headers

<table>
  <caption> Table with rowgroup </caption>
  <thead>
    <tr>
      <td colspan="2">&nbsp;</td>
      <th scope="col">1 mile</th>
      <th scope="col">5 km</th>
      <th scope="col">10 km</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" scope="rowgroup">Females</th>
	  <th scope="row">Kate</th>
      <td>7:32</td>
	  <td>27:04</td>
	  <td>1:08:16</td>
	</tr>
	<tr>
      <th scope="row">Nicky</th>
	  <td>6:43</td>
	  <td>25:47</td>
	  <td>54:38</td>
	</tr>
	<tr>
      <th scope="row">Kim</th>
	  <td>8:51</td>
	  <td>37:15</td>
	  <td>1:46:01</td>
	</tr>
    <tr>
      <th rowspan="3" scope="rowgroup">Males</th> 
      <th scope="row">Jon</th>
      <td>6:55</td>
      <td>26:27</td>
      <td>58:04</td>
    </tr>  
    <tr>
      <th scope="row">Paul</th>
      <td>6:01</td>
      <td>23:21</td>
      <td>52:45</td>
    </tr>  
    <tr>			
      <th scope="row">Andrew</th>
      <td>6:51</td>
      <td>23:31</td>
     <td>58:04</td>
    </tr>  
  </tbody>
</table>

```html
<table>
  <caption> Table with rowgroup </caption>
  <thead>
    <tr>
      <td colspan="2">&nbsp;</td>
      <th scope="col">1 mile</th>
      <th scope="col">5 km</th>
      <th scope="col">10 km</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" scope="rowgroup">Females</th>
	  <th scope="row">Kate</th>
      <td>7:32</td>
	  <td>27:04</td>
	  <td>1:08:16</td>
	</tr>
	<tr>
      <th scope="row">Nicky</th>
	  <td>6:43</td>
	  <td>25:47</td>
	  <td>54:38</td>
	</tr>
	<tr>
      <th scope="row">Kim</th>
	  <td>8:51</td>
	  <td>37:15</td>
	  <td>1:46:01</td>
	</tr>
    <tr>
      <th rowspan="3" scope="rowgroup">Males</th> 
      <th scope="row">Jon</th>
      <td>6:55</td>
      <td>26:27</td>
      <td>58:04</td>
    </tr>  
    <tr>
      <th scope="row">Paul</th>
      <td>6:01</td>
      <td>23:21</td>
      <td>52:45</td>
    </tr>  
    <tr>			
      <th scope="row">Andrew</th>
      <td>6:51</td>
      <td>23:31</td>
     <td>58:04</td>
    </tr>  
  </tbody>
</table>
```

##### Note

Screen reader support for `scope="rowgroup"` has historically been worse than support for `scope="colgroup"`, so for maximum accessibility, especially in terms of backward compatibility, it is best to orient the table in a configuration that allows `scope="colgroup"`, and which does not require `scope="rowgroup"`.

If you open the example file in Notepad (or text editor of your choice) and copy and paste the code into the code view `<>` of the `BodyText`, and amend it then you will start with the right type of table. 

### A table with multiple rows of headers

Using id and headers attributes to associate data cells with header cells in data tables

<table>
  <tr>
    <th rowspan="2" id="h">Homework</th>
    <th colspan="3" id="e">Exams</th>
    <th colspan="3" id="p">Projects</th>
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
    <td headers="h">14%</td>
    <td headers="e e1">16%</td>
    <td headers="e e2">17%</td>
    <td headers="e ef">19%</td>
    <td headers="p p1">9%</td>
    <td headers="p p2">11%</td>
    <td headers="p pf">16%</td>
  </tr>
</table>   

```html
<table>
  <tr>
    <th rowspan="2" id="h">Homework</th>
    <th colspan="3" id="e">Exams</th>
    <th colspan="3" id="p">Projects</th>
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
    <td headers="h">14%</td>
    <td headers="e e1">16%</td>
    <td headers="e e2">17%</td>
    <td headers="e ef">19%</td>
    <td headers="p p1">9%</td>
    <td headers="p p2">11%</td>
    <td headers="p pf">16%</td>
  </tr>
</table>   
```

### Another complicated table

<table>
  <caption>Current LHA rates for the year starting April 2021</caption>
  <thead>
    <tr>
      <td> </td>
      <th colspan="2" id="nd">North Devon</th>
      <th colspan="2" id="tws">Taunton and West Somerset</th>
      <th colspan="2" id="med">Mid and East Devon</th>
	</tr>
  </thead>
  <tbody>
    <tr>
      <th id="nr">Number of Rooms</td>
      <th id="nd1" headers="nd">Weekly</td>
      <th id="nd2" headers="nd">Monthly</td>
      <th id="tws1" headers="tws">Weekly</td>
      <th id="tws2" headers="tws">Monthly</td>
      <th id="med1" headers="med">Weekly</td>
      <th id="med2" headers="med">Monthly</td>
	</tr>
	<tr>
      <td headers="nr">Shared Accommodation</td>
      <td headers="nd nd1">£69.04</td>
      <td headers="nd nd2">£300.00</td>
      <td headers="tws tws1">£84.50</td>
      <td headers="tws tws2">£367.17</td>
      <td headers="med med1">£84.50</td>
      <td headers="med med2">£367.17</td>
	</tr>
	<tr>
      <td headers="nr">1 bed need</td>
      <td headers="nd nd1">£97.81</td>
      <td headers="nd nd2">£425.01</td>
      <td headers="tws tws1">£103.56</td>
      <td headers="tws tws2">£449.99</td>
      <td headers="med med1">£103.56</td>
      <td headers="med med2">£449.99</td>
	</tr>
	<tr>
      <td headers="nr">2 bed need</td>
      <td headers="nd nd1">£126.58</td>
      <td headers="nd nd2">£550.02</td>
      <td headers="tws tws1">£136.93</td>
      <td headers="tws tws2">£594.99</td>
      <td headers="med med1">£136.93</td>
      <td headers="med med2">£594.99</td>
	</tr>
    <tr>
      <td headers="nr">3 bed need</td>
      <td headers="nd nd1">£149.59</td>
      <td headers="nd nd2">£650.00</td>
      <td headers="tws tws1">£164.55</td>
      <td headers="tws tws2">£715.01</td>
      <td headers="med med1">£166.85</td>
      <td headers="med med2">£725.00</td>
    </tr>
	<tr>
      <td headers="nr">4 bed need</td>
      <td headers="nd nd1">£182.96</td>
      <td headers="nd nd2">£795.00</td>
      <td headers="tws tws1">£207.12</td>
      <td headers="tws tws2">£899.99</td>
      <td headers="med med1">£207.12</td>
      <td headers="med med2">£899.99</td>
	</tr>
  </tbody>
</table>

```html
<table>
  <caption>Current LHA rates for the year starting April 2021</caption>
  <thead>
    <tr>
      <td> </td>
      <th colspan="2" id="nd">North Devon</th>
      <th colspan="2" id="tws">Taunton and West Somerset</th>
      <th colspan="2" id="med">Mid and East Devon</th>
	</tr>
  </thead>
  <tbody>
    <tr>
      <th id="nr">Number of Rooms</td>
      <th id="nd1" headers="nd">Weekly</td>
      <th id="nd2" headers="nd">Monthly</td>
      <th id="tws1" headers="tws">Weekly</td>
      <th id="tws2" headers="tws">Monthly</td>
      <th id="med1" headers="med">Weekly</td>
      <th id="med2" headers="med">Monthly</td>
	</tr>
	<tr>
      <td headers="nr">Shared Accommodation</td>
      <td headers="nd nd1">£69.04</td>
      <td headers="nd nd2">£300.00</td>
      <td headers="tws tws1">£84.50</td>
      <td headers="tws tws2">£367.17</td>
      <td headers="med med1">£84.50</td>
      <td headers="med med2">£367.17</td>
	</tr>
	<tr>
      <td headers="nr">1 bed need</td>
      <td headers="nd nd1">£97.81</td>
      <td headers="nd nd2">£425.01</td>
      <td headers="tws tws1">£103.56</td>
      <td headers="tws tws2">£449.99</td>
      <td headers="med med1">£103.56</td>
      <td headers="med med2">£449.99</td>
	</tr>
	<tr>
      <td headers="nr">2 bed need</td>
      <td headers="nd nd1">£126.58</td>
      <td headers="nd nd2">£550.02</td>
      <td headers="tws tws1">£136.93</td>
      <td headers="tws tws2">£594.99</td>
      <td headers="med med1">£136.93</td>
      <td headers="med med2">£594.99</td>
	</tr>
    <tr>
      <td headers="nr">3 bed need</td>
      <td headers="nd nd1">£149.59</td>
      <td headers="nd nd2">£650.00</td>
      <td headers="tws tws1">£164.55</td>
      <td headers="tws tws2">£715.01</td>
      <td headers="med med1">£166.85</td>
      <td headers="med med2">£725.00</td>
    </tr>
	<tr>
      <td headers="nr">4 bed need</td>
      <td headers="nd nd1">£182.96</td>
      <td headers="nd nd2">£795.00</td>
      <td headers="tws tws1">£207.12</td>
      <td headers="tws tws2">£899.99</td>
      <td headers="med med1">£207.12</td>
      <td headers="med med2">£899.99</td>
	</tr>
  </tbody>
</table>
```