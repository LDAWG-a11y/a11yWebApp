---
title: Site navigation is not an ARIA menu
summary: Site navigation is a fundamental part of a website, it's typically how
  your users get from one page to another, so it's obviously important that all
  users can understand it and equally as important we don't break what HTML
  gives us for free
author: dlee
date: 2023-03-30
toc: false
tags:
  - HTML
  - ARIA
  - Navigation
isGuide: true
---
## Intro to site navigation

We all understand what site navigation is, we may refer to it as nav, navigation or menu, those terms can be used interchangeably when describing the component on a page that contains a set of links that enable a user to access other pages or parts of that site.

## An almost infinite amount of site nav flavours

There are likely thousands of patterns of navigation that we may encounter whilst surfing the web, but they can be grouped into 2 types: On-screen navigation and off-screen navigation, the former will be an element that always shows the main navigation links and the latter will only display them as the result of an action such as clicking a button (that's the HTML element`<button>`, which is not spelled like this: `<a>`, sorry, I couldn't resist).

## Is a site nav a menu?

Well, yes and no. 

A site nav is a navigation landmark that contains links to navigate to related pages or parts of the same site (mostly), but as I strategically mentioned this in the intro, when describing the element to other people, including users, calling it a Menu typically makes sense and would be translated to what I hope would preserve meaning in other languages. I have no anecdotal data for this, but non-techy people I know will always call a site nav a menu and I don't recall a time when somebody who doesn't work on websites ever called one a navigation, but when talking about them, either is fine.

Programmatically (that's in code) it is not a menu, we'll get to that shortly though.

When we wrap our navigation links in a container, we should reach for the HTML `<nav>` as it groups our errm, navigation links into a special group that has meaning. This group has the implied role of "Navigation", so our users that use assistive technologies can have that information conveyed to them, by their software or hardware. Depending on what assistive technology our user is using, they may be able to bring up shortcut menus, which enable them to discover important landmarks, headings, images and other areas of interest, that they could then navigate to and use to access parts of the page without having to endure all of the fluff that may not interest them at all.

### What should a site nav contain?

The easy answer is things that relate to navigating between parts of the site. That would typically be a set of links, often contained in a list, but not strictly necessary, there may be a button to open an off-screen navigation and sometimes there may be a search.

### What is the correct structure for a site nav?

As with many things on the web, there are a few ways of doing it, websites have different purposes, different functionality and different aesthetics, so there will be variations that are accessible on some sites and an infinite amount of yuckiness (That's a word, right?) on the rest.

A very basic structure would look like so:

```html
<nav>
  <ul>
    <li><a href="/home.html">Home</a></li>
    <li><a href="/contact.html">Contact</a></li>
  </ul>
</nav>
```

What information does this give to users of assistive technologies? Well, a screen reader will typically hear words similar to "navigation, list, 2 items" (although the information can differ across screen readers, browsers and operating systems and a user's verbosity settings may further add or reduce other information).

### But wait, tell us about the menu

As I previously mentioned, call it whatever works for you and your audience, when you are communicating about it, if there is a button that when interacted with displays a previously off-screen set of links and related elements, then that button should likely have the accessible name of "Menu", I don't base this on anything other than convention and as the term "Menu" appears to be way more common amongst general users than "Nav" or "Navigation", then folks who access with screen readers will be used to that and folks who control computers with their voice should often be able to successfully guess what the control is called (in the absence of a visible text label).

What we shouldn't do, is this:

```html
<nav>
  <ul role="menu">
    <li role="presentation"><a role="menuitem" href="/home.html">Home</a></li>
    <li role="presentation"><a role="menuitem" href="/contact.html">Contact</a></li>
  </ul>
</nav>
```

Because our site nav should not have a menu role, as this changes the semantics and user expectations on what the element is for and how to interact with it.

We also shouldn't do this:

```html
<nav>
  <ul role="menubar">
    <li role="presentation"><a role="menuitem" href="/home.html">Home</a></li>
    <li role="presentation"><a role="menuitem" href="/contact.html">Contact</a></li>
  </ul>
</nav>
```

For exactly the same reasons as the previous example, it's a navigation, not an ARIA menu and not a ARIA menubar, in our limited example it's just a nav with a list of links.

Finally, what you should definitely not do is this:

```html
<nav>
  <ul role="menu">
    <li><a href="/home.html">Home</a></li>
    <li><a href="/contact.html">Contact</a></li>
  </ul>
</nav>
```



The above is all kinds of wrong. Firstly, as should be clear now, it is not a menu, in the programmatic sense, it's a navigation. Secondly, we encounter the above pattern quite often and have to write up the issue over and over against [SC 1.3.1 Info and Relationships (A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html). Some ARIA roles require specific roles on their children, several roles require this, one being `role="menu"`, another being `role="menubar"` (there are of course, several more).

So, aside from a HTML/CSS/JavaScript library or framework with "best intentions" trying to help screen reader users understand the purpose of the navigation and doing so quite badly, as everything was likely perfectly fine before they reached for ARIA, they have provided incomplete ARIA.

The `<ul>` tag is understood to be a unordered list, a list where the order of contained items does not really affect the meaning, which is in contrast to an `<ol>` or ordered list, which would typically contain items where the order matters.

What is actually happening here, when there is a `<ul role="menu">` present and it is incomplete, by omitting required children, we have list elements that are orphaned from what should have been their parent. This is because their parent is no longer an unordered list, it is an ARIA menu as its native semantics have been neutered by ARIA. `A role="menu"` cannot be an `<li>`'s parent as it's like a different species and this particular species only likes to raise children that are its own and by extension, the same species. If Mowgli had been an `<li>` and the wolves `role="menu",` then let's just say Jungle Book wouldn't have been a Disney movie. So, staying with Jungle Book for one more moment, remember how Baloo sang the song "The Bare Necessities", that applies to site navs too, we just need a navigation element, probably a list and some links, we don't need to change any roles, we just want those bare necessities.

So, in order to keep that relationship between a `<ul>` or `<ol>` and its children, when creating a site nav, leave the ARIA roles out of it, they're not needed here. There is of course some ARIA you should be using if you have a button that will display an off-screen navigation once it has been interacted with, but, they're not roles, they're properties or attributes.

[We have a basic guide that covers creating a disclosure navigation](https://www.makethingsaccessible.com/guides/accessible-basic-disclosure-widgets/)

### When should I use an ARIA menu role?

There is of course a reason for its existence, but it's not for navigations. It's actually for application-type menus, so think of applications that have settings or options, such as Photoshop, Microsoft Word or your email client, these are the kind of use cases where it should be used, I highly recommend reading the link by Adrian Roselli, in the next section, for an in-depth explanation.

## Further reading

* [Don't use ARIA menu roles for site nav - Adrian Roselli](https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html)
* [<li> elements must be contained in a `<ul>` or `<ol>` - Deque University](https://dequeuniversity.com/rules/axe/4.4/listitem)