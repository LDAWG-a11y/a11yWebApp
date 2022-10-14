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

To make an accessible table that will scroll horizontally on a mobile, you need to put your <table> element inside a