---
title: HTML tables for use as content
summary: This guide provides useful information on when to use tables, when not
  to use tables, and how to write tables that are both meaningful and
  understandable for all users.
author: swilkinson
date: 2022-10-14
toc: true
tags:
  - HTML
  - Tables
file: /docs/thumbnail_image003.png
isGuide: true
---
## Introduction to content tables

This guide provides useful information on when to use tables, when not to use tables, and how to write tables that are both meaningful and understandable for all users.

## What are tables for

We use tables to display simple tabular data, and we avoid tables with merged cells or multiple levels of headings, and we don’t use nested tables. 

Nest can be made accessible in theory, but user testing shows that screen reader users of average ability always have difficulty with them in practice.

If we have a complicated table, then split the table into multiple simpler tables which will make it easier for us to make accessible and the audience to understand.

## What tables are NOT for

We do not use tables for the layout of content.

## Captions

A caption acts as a heading for a table. Most screen readers will disclose the content of captions, and the captions will help users to discover a table and comprehend it's meaning and then they can decide if they want to read it. If the AT user uses “Tables Mode”, the captions are the main instrument used to identify tables.
 
```html
<caption>Bin collections</caption>
```

## Accessible tables that scrolls horizontally on mobile

To make an accessible table that will scroll horizontally on a mobile, you need to put your `<table>` element inside a `<div role="region" aria-labelledby="mycaption" tabindex="0">`

where `“mycaption”` references the `<caption id="mycaption">` that should be inside the table. The tabindex satisfies WCAG Success Criteria 2.1.1 Keyboard, and the aria-labelledby satisfies 4.1.2 Name, Role, Value. For the CSS, apply overflow: auto to the table, and don’t forget to apply a focus style.

* [Under-engineered responsive tables](https://adrianroselli.com/2020/11/under-engineered-responsive-tables.html) (Adrian Roselli) (external website)

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
    <th rowspan="2" id="hw">Homework</th>
    <th colspan="3" id="ex">Exams</th>
    <th colspan="3" id="pr">Projects</th>
  </tr>
  <tr>
    <th id="e1" headers="ex">1</th>
    <th id="e2" headers="ex">2</th>
    <th id="ef" headers="ex">Final</th>
    <th id="p1" headers="pr">1</th>
    <th id="p2" headers="pr">2</th>
    <th id="pf" headers="pr">Final</th>
  </tr>
  <tr>
    <td headers="hw">14%</td>
    <td headers="ex e1">16%</td>
    <td headers="ex e2">17%</td>
    <td headers="ex ef">19%</td>
    <td headers="pr p1">9%</td>
    <td headers="pr p2">11%</td>
    <td headers="pr pf">16%</td>
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

### Making a table with Total Expenditure more accessible

```html
<table>
  <caption>Budgets</caption>
  <thead>
    <tr>
      <td colspan="2"> </td>
      <th scope="col">Details</th>
      <th scope="col">Expenditure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" scope="rowgroup">Budget area</th>
      <th scope="row">Software</th>
      <td>Purchase of new licenses</td>
      <td>£300.00</td>
    </tr>
    <tr>
      <th scope="row">Advertising</th>
      <td>Newspaper and social media</td>
      <td>£200.00</td>
    </tr>
    <tr>
      <th scope="row">General expenses</th>
      <td>Refreshments, car parking, travel</td>
      <td>£500.00</td>
    </tr> 
    <tr>
      <th rowspan="1" colspan="3" scope="rowgroup">Total Expenditure</th>
      <td>£1000.00</td>
    </tr>
  </tbody>
</table>
```

So that the table looks like this

<table>
  <caption>Budgets</caption>
  <thead>
    <tr>
      <td colspan="2"> </td>
      <th scope="col">Details</th>
      <th scope="col">Expenditure</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th rowspan="3" scope="rowgroup">Budget area</th>
      <th scope="row">Software</th>
      <td>Purchase of new licenses</td>
      <td>£300.00</td>
    </tr>
    <tr>
      <th scope="row">Advertising</th>
      <td>Newspaper and social media</td>
      <td>£200.00</td>
    </tr>
    <tr>
      <th scope="row">General expenses</th>
      <td>Refreshments, car parking, travel</td>
      <td>£500.00</td>
    </tr> 
    <tr>
      <th rowspan="1" colspan="3" scope="rowgroup">Total Expenditure</th>
      <td>£1000.00</td>
    </tr>
  </tbody>
</table>

#### Note

Screen reader support for `scope="rowgroup"` has historically been worse than support for `scope="colgroup"`, so for maximum accessibility, especially in terms of backward compatibility, it is best to orient the table in a configuration that allows `scope="colgroup"`, and which does not require `scope="rowgroup"`.

### Making a table with tfoot

```html
<table>
    <caption>Last 7 Days</caption>
    <thead>
        <tr>
            <th scope="col">End Date</th>
            <th scope="col"># Transactions</th>
            <th scope="col">£Total value</th>
            <th scope="col">£Avg Transaction</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">09/10/2023</th>
            <td>35</td>
            <td>4,141.00</td>
            <td>118.31</td>
        </tr>
        <tr>
            <th scope="row">10/10/2023</th>
            <td>33</td>
            <td>1,155.00</td>
            <td>35.00</td>
        </tr>
        <tr>
            <th scope="row">11/10/2023</th>
            <td>13</td>
            <td>2,675.00</td>
            <td>205.77</td>
        </tr>
        <tr>
            <th scope="row">12/10/2023</th>
            <td>33</td>
            <td>6,995.00</td>
            <td>211.97</td>
        </tr>
        <tr>
            <th scope="row">13/10/2023</th>
            <td>14</td>
            <td>3,255.00</td>
            <td>232.50</td>
        </tr>
        <tr>
            <th scope="row">14/10/2023</th>
            <td>7</td>
            <td>495.00</td>
            <td>70.71</td>
        </tr>
        <tr>
            <th scope="row">15/10/2023</th>
            <td>4</td>
            <td>167.00</td>
            <td>41.75</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row" ><strong>Totals</strong></th>
            <td><strong>139</strong></td>
            <td><strong>18,883.00</strong></td>
            <td><strong>135.85</strong></td>
        </tr>
    </tfoot>
</table>
```

So that the table looks like this

<table>
    <caption>Last 7 Days</caption>
    <thead>
        <tr>
            <th scope="col">End Date</th>
            <th scope="col"># Transactions</th>
            <th scope="col">£Total value</th>
            <th scope="col">£Avg Transaction</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">09/10/2023</th>
            <td>35</td>
            <td>4,141.00</td>
            <td>118.31</td>
        </tr>
        <tr>
            <th scope="row">10/10/2023</th>
            <td>33</td>
            <td>1,155.00</td>
            <td>35.00</td>
        </tr>
        <tr>
            <th scope="row">11/10/2023</th>
            <td>13</td>
            <td>2,675.00</td>
            <td>205.77</td>
        </tr>
        <tr>
            <th scope="row">12/10/2023</th>
            <td>33</td>
            <td>6,995.00</td>
            <td>211.97</td>
        </tr>
        <tr>
            <th scope="row">13/10/2023</th>
            <td>14</td>
            <td>3,255.00</td>
            <td>232.50</td>
        </tr>
        <tr>
            <th scope="row">14/10/2023</th>
            <td>7</td>
            <td>495.00</td>
            <td>70.71</td>
        </tr>
        <tr>
            <th scope="row">15/10/2023</th>
            <td>4</td>
            <td>167.00</td>
            <td>41.75</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <th scope="row" ><strong>Totals</strong></th>
            <td><strong>139</strong></td>
            <td><strong>18,883.00</strong></td>
            <td><strong>135.85</strong></td>
        </tr>
    </tfoot>
</table>

## Practice tables

### Simple table

```html
<p>Classical music events</p>
<table>
  <tr>
    <td><strong>Date</strong></td>
	<td><strong>Event</strong></td>
	<td><strong>Venue</strong></td>
  </tr>
  <tr>
    <td>11 February</td>
	<td>Waltz with Schubert</td>
	<td>Hall</td>
  </tr>	
  <tr>
    <td>23 March</td>
	<td>Waltz with Strauss</td>
	<td>Cafe</td>
  </tr>	
  <tr>
    <td>15 April</td>
	<td>Waltz with Chopin</td>
	<td>Hall</td>
  </tr>	
</table>
```

<p>Classical music events</p>
<table>
  <tr>
    <td><strong>Date</strong></td>
	<td><strong>Event</strong></td>
	<td><strong>Venue</strong></td>
  </tr>
  <tr>
    <td>11 February</td>
	<td>Waltz with Schubert</td>
	<td>Hall</td>
  </tr>	
  <tr>
    <td>23 March</td>
	<td>Waltz with Strauss</td>
	<td>Cafe</td>
  </tr>	
  <tr>
    <td>15 April</td>
	<td>Waltz with Chopin</td>
	<td>Hall</td>
  </tr>	
</table>

### Table header cells top row and first column

```html
<p>Opening times</p>
<table>
  <tr>
    <td></td>
    <td><strong>Monday</strong></td>
    <td><strong>Tuesday</strong></td>
    <td><strong>Wednesday</strong></td>
    <td><strong>Thursday</strong></td>
    <td><strong>Friday</strong></td>
    <td><strong>Saturday</strong></td>
    <td><strong>Sunday</strong></td>
  </tr>
  <tr>
    <td><strong>09:00 - 13:00</strong></td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Closed</td>
  </tr> 
  <tr>
    <td><strong>14:00 - 17:00</strong></td>
    <td>Open</td>
    <td>Open</td>
    <td>Closed</td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Closed</td>
  </tr>
</table>
```

<p>Opening times</p>
<table>
  <tr>
    <td></td>
    <td><strong>Monday</strong></td>
    <td><strong>Tuesday</strong></td>
    <td><strong>Wednesday</strong></td>
    <td><strong>Thursday</strong></td>
    <td><strong>Friday</strong></td>
    <td><strong>Saturday</strong></td>
    <td><strong>Sunday</strong></td>
  </tr>
  <tr>
    <td><strong>09:00 - 13:00</strong></td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Closed</td>
  </tr> 
  <tr>
    <td><strong>14:00 - 17:00</strong></td>
    <td>Open</td>
    <td>Open</td>
    <td>Closed</td>
    <td>Open</td>
    <td>Open</td>
    <td>Open</td>
    <td>Closed</td>
  </tr>
</table>

### Ambigous data table

```html
<p>People and locations</p>
<table>
  <tr>
    <td><strong>Last Name</strong></td>
    <td><strong>First Name</strong></td>
    <td><strong>City</strong></td>
  </tr>
  <tr>
    <td>Smith</td>
    <td>Phoenix</td>
    <td>Barnstaple</td>
  </tr>
  <tr>
    <td>London</td>
    <td>Jack</td>
    <td>San Francisco</td>
  </tr>
  <tr>
    <td>Johns</td>
    <td>Bristol</td>
    <td>Leeds</td>
  </tr>
</table>
```

<p>People and locations</p>
<table>
  <tr>
    <td><strong>Last Name</strong></td>
    <td><strong>First Name</strong></td>
    <td><strong>City</strong></td>
  </tr>
  <tr>
    <td>Smith</td>
    <td>Phoenix</td>
    <td>Barnstaple</td>
  </tr>
  <tr>
    <td>London</td>
    <td>Jack</td>
    <td>San Francisco</td>
  </tr>
  <tr>
    <td>Johns</td>
    <td>Bristol</td>
    <td>Leeds</td>
  </tr>
</table>

### Two tier headers

```html
<p>Rock and Metal sales</p>
<table>
  <tr>
    <td rowspan="2"></td>
    <td colspan="2">Rock</td>
    <td colspan="2">Metal</td>
  </tr>
  <tr>
    <td>Singles</td>
    <td>Albums</td>
    <td>Singles</td>
    <td>Albums</td>
  </tr>
  <tr>
    <td>inIllustrias</td>
    <td>40,000</td>
    <td>60,000</td>
    <td>200,000</td>
    <td>70,000</td>
  </tr>
  <tr>
    <td>Those Bloomin' Covids</td>
    <td>60,000</td>
    <td>55,000</td>
    <td>199,000</td>
    <td>71,000</td>
  </tr>
</table>
```

<p>Rock and Metal sales</p>
<table>
  <tr>
    <td rowspan="2"></td>
    <td colspan="2">Rock</td>
    <td colspan="2">Metal</td>
  </tr>
  <tr>
    <td>Singles</td>
    <td>Albums</td>
    <td>Singles</td>
    <td>Albums</td>
  </tr>
  <tr>
    <td>inIllustrias</td>
    <td>40,000</td>
    <td>60,000</td>
    <td>200,000</td>
    <td>70,000</td>
  </tr>
  <tr>
    <td>Those Bloomin' Covids</td>
    <td>60,000</td>
    <td>55,000</td>
    <td>199,000</td>
    <td>71,000</td>
  </tr>
</table>

### Complicated table

```html
<p>Split of marks across course</p>
<table>
  <tr>
    <td colspan="3"><strong>Projects</strong></td>
    <td rowspan="2"><strong>Homework</strong></td>
    <td colspan="3"><strong>Exams</strong></td>
  </tr>
  <tr>
    <td><strong>1</strong></td>
    <td><strong>2</strong></td>
    <td><strong>Final</strong></td>
    <td><strong>1</strong></td>
    <td><strong>2</strong></td>
    <td><strong>Final</strong></td>
  </tr>
  <tr>
    <td>14%</td>
    <td>19%</td>
    <td>17%</td>
    <td>16%</td>
    <td>9%</td>
    <td>16%</td>
    <td>11%</td>
   </tr>
</table>
```

<p>Split of marks across course</p>
<table>
  <tr>
    <td colspan="3"><strong>Projects</strong></td>
    <td rowspan="2"><strong>Homework</strong></td>
    <td colspan="3"><strong>Exams</strong></td>
  </tr>
  <tr>
    <td><strong>1</strong></td>
    <td><strong>2</strong></td>
    <td><strong>Final</strong></td>
    <td><strong>1</strong></td>
    <td><strong>2</strong></td>
    <td><strong>Final</strong></td>
  </tr>
  <tr>
    <td>14%</td>
    <td>19%</td>
    <td>17%</td>
    <td>16%</td>
    <td>9%</td>
    <td>16%</td>
    <td>11%</td>
   </tr>
</table>

## Practice tables answers

### Simple table

```html
<table>
  <caption>Classical music events</caption>
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Event</th>
      <th scope="col">Venue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>11 February</td>
      <td>Waltz with Schubert</td>
      <td>Main Hall</td>
    </tr>
    <tr>
      <td>23 March</td>
      <td>Waltz with Strauss</td>
      <td>Strauss Hall</td>
    </tr>
    <tr>
      <td>15 April</td>
      <td>Waltz with Chopin</td>
      <td>Main Hall</td>
    </tr>
  </tbody>
</table>
```

<table>
  <caption>Classical music events</caption>
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Event</th>
      <th scope="col">Venue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>11 February</td>
      <td>Waltz with Schubert</td>
      <td>Main Hall</td>
    </tr>
    <tr>
      <td>23 March</td>
      <td>Waltz with Strauss</td>
      <td>Strauss Hall</td>
    </tr>
    <tr>
      <td>15 April</td>
      <td>Waltz with Chopin</td>
      <td>Main Hall</td>
    </tr>
  </tbody>
</table>

### Table header cells top row and first column

```html
<table>
  <caption>Opening times</caption>
  <thead>
    <tr>
      <td></td>
      <th scope="col">Monday</th>
      <th scope="col">Tuesday</th>
      <th scope="col">Wednesday</th>
      <th scope="col">Thursday</th>
      <th scope="col">Friday</th>
      <th scope="col">Saturday</th>
      <th scope="col">Sunday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">09:00 - 13:00</th>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Closed</td>
    </tr> 
    <tr>
      <th scope="row">14:00 - 17:00</th>
      <td>Open</td>
      <td>Open</td>
      <td>Closed</td>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Closed</td>
    </tr>
  </tbody>
</table>
```

<table>
  <caption>Opening times</caption>
  <thead>
    <tr>
      <td></td>
      <th scope="col">Monday</th>
      <th scope="col">Tuesday</th>
      <th scope="col">Wednesday</th>
      <th scope="col">Thursday</th>
      <th scope="col">Friday</th>
      <th scope="col">Saturday</th>
      <th scope="col">Sunday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">09:00 - 13:00</th>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Closed</td>
    </tr> 
    <tr>
      <th scope="row">14:00 - 17:00</th>
      <td>Open</td>
      <td>Open</td>
      <td>Closed</td>
      <td>Open</td>
      <td>Open</td>
      <td>Open</td>
      <td>Closed</td>
    </tr>
  </tbody>
</table>

### Ambigous data table

```html
<table>
  <caption>People and locations</caption>
  <thead>
    <tr>
      <th scope="col">Last Name</th>
      <th scope="col">First Name</th>
      <th scope="col">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Smith</td>
      <td>Phoenix</td>
      <td>Barnstaple</td>
    </tr>
    <tr>
      <td>London</td>
      <td>Jack</td>
      <td>San Francisco</td>
    </tr>
    <tr>
      <td>Johns</td>
      <td>Bristol</td>
      <td>Leeds</td>
    </tr>
  </tbody>
</table>
```

<table>
  <caption>People and locations</caption>
  <thead>
    <tr>
      <th scope="col">Last Name</th>
      <th scope="col">First Name</th>
      <th scope="col">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Smith</td>
      <td>Phoenix</td>
      <td>Barnstaple</td>
    </tr>
    <tr>
      <td>London</td>
      <td>Jack</td>
      <td>San Francisco</td>
    </tr>
    <tr>
      <td>Johns</td>
      <td>Bristol</td>
      <td>Leeds</td>
    </tr>
  </tbody>
</table>

### Two tier headers

```html
<table>
  <caption>Rock and Metal sales</caption>
  <tr>
    <td rowspan="2"></td>
    <th colspan="2" scope="colgroup">Rock</th>
    <th colspan="2" scope="colgroup">Metal</th>
  </tr>
  <tr>
    <th scope="col">Singles</th>
    <th scope="col">Albums</th>
    <th scope="col">Singles</th>
    <th scope="col">Albums</th>
  </tr>
  <tr>
    <th scope="row">inIllustrias</th>
    <td>40,000</td>
    <td>60,000</td>
    <td>200,000</td>
    <td>70,000</td>
  </tr>
  <tr>
    <th scope="row">Those Bloomin' Covids</th>
    <td>60,000</td>
    <td>55,000</td>
    <td>199,000</td>
    <td>71,000</td>
  </tr>
</table>
```

<table>
  <caption>Rock and Metal sales</caption>
  <tr>
    <td rowspan="2"></td>
    <th colspan="2" scope="colgroup">Rock</th>
    <th colspan="2" scope="colgroup">Metal</th>
  </tr>
  <tr>
    <th scope="col">Singles</th>
    <th scope="col">Albums</th>
    <th scope="col">Singles</th>
    <th scope="col">Albums</th>
  </tr>
  <tr>
    <th scope="row">inIllustrias</th>
    <td>40,000</td>
    <td>60,000</td>
    <td>200,000</td>
    <td>70,000</td>
  </tr>
  <tr>
    <th scope="row">Those Bloomin' Covids</th>
    <td>60,000</td>
    <td>55,000</td>
    <td>199,000</td>
    <td>71,000</td>
  </tr>
</table>

### Complicated table

```html
<table>
  <caption>Split of marks across course</caption>
  <tr>
    <th colspan="3" id="p">Projects</th>
    <th rowspan="2" id="hw">Homework</th>
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
    <td headers="hw">16%</td>
    <td headers="p p1">9%</td>
    <td headers="p p2">16%</td>
    <td headers="p pf">11%</td>
  </tr>
</table>
```

<table>
  <caption>Split of marks across course</caption>
  <tr>
    <th colspan="3" id="pr2">Projects</th>
    <th rowspan="2" id="hw2">Homework</th>
    <th colspan="3" id="ex2">Exams</th>
  </tr>
  <tr>
    <th id="ee1" headers="ex2">1</th>
    <th id="ee2" headers="ex2">2</th>
    <th id="eef" headers="ex2">Final</th>
    <th id="pp1" headers="pr2">1</th>
    <th id="pp2" headers="pr2">2</th>
    <th id="ppf" headers="pr2">Final</th>
  </tr>
  <tr>
    <td headers="ex2 ee1">14%</td>
    <td headers="ex2 ee2">19%</td>
    <td headers="ex2 eef">17%</td>
    <td headers="hw2">16%</td>
    <td headers="pr2 pp1">9%</td>
    <td headers="pr2 pp2">16%</td>
    <td headers="pr2 ppf">11%</td>
  </tr>
</table>

## Wrapping up

Hopefully this guide has helped you to understand a bit more of using HTML tables for content. It can be hard especially when the tables are really complicated, and there is an element of author discretion, but ultimately the summary is:

* Use simple tables (split complicated tables into multiple simpler tables)
* Use the `<caption>` elements to add the caption at the top of the table
* Use `<th>` elements to mark-up row and column headings
* Add the attribute `scope=”col”` to column headers and `scope=”row”` to row headers
* Minimise the amount of white space between columns. Large amounts of white space cause problems for screen magnifier users
* Remember that the headings must have the proper scope of column or row designated to be voiced by a screen reader, it is not enough just to be designated as a `TH`
* Ideally, don’t hide any cell borders. Certainly, don’t hide the horizontal cell borders because people rely on them for orientation when scrolling horizontally, especially if they are using screen magnification
* Consider using alternate background colours for alternate rows. Again, this helps with horizontal scrolling
* If you want the data table to be sortable, you can make the column headers clickable. However, it requires significant accessibility knowledge to do this. Many implementations of this have accessibility issues, so don’t just copy another design
* Avoid abbreviations such as Qty instead of Quantity. This often happens with headings for columns that only contain a few characters. If the visual text must be abbreviated, use hidden text such as the “clip” technique to make the full word(s) available to assistive technologies

## Useful links

* [W3C HTML tables tutorial](https://www.w3.org/WAI/tutorials/tables/) (external website)