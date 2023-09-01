---
title: Creating a Skip to Content link
summary: let's learn why we should add a Skip Link to our sites, who benefits
  from them and discuss a couple of ways we can build one, along with some best
  practice accessibility considerations
author: dlee
date: 2023-09-01
toc: false
tags:
  - HTML
  - CSS
  - Best Practice
isGuide: true
---
## Intro

As the page title suggests, we're going to deep dive into Skip Links. In my experience (which of course is not necessarily the same as everybody else's) I understand a Skip Link to be an element that allows a user to skip over repeated items across a set of web pages. Other folks may call them something different, such as Jump Links and this may in fact be reflected in the visible label to the element, which can differ from site to site, some common examples are:

* Skip to main
* Skip navigation
* Skip to content
* Jump to main
* Jump to content

There are undoubtedly more out in the wild, whether you want to Hop, Skip or Jump to the main content of your page, I'm just going to call them Skip Links in this guide, just for consistency's sake.

## What is a skip link?

It is just a link with a href that points to another area on the page. the most common place to find these would be at the top of a page, they'll seldom be visible until they receive keyboard focus, as they're often hidden away until they do receive focus. 

When used at the top of a page, the purpose is to allow keyboard users to tab to the Skip Link and then press <kbd>Enter</kbd>, so then keyboard focus moves to the start of the actual page content. This reduces both the effort and repetition required to actually get to the parts of the page a user is interested in. As an example, some sites may have a significant number of interactive elements in the page's `<header>` area, I've got a site open right now, that has the following:

* Logo, which is wrapped in a link and points to the Home page
* 4 social media links
* Search input
* Search button
* Navigation menu with 9 links

That's 16 interactive elements there, which a keyboard user would have to <kbd>Tab</kbd> through to get to the the thing they are interested in, assuming it is also interactive. As this navigation is identical across all pages and it requires at least 5 screens to complete the transaction on the site I have open, then it is at least 5 * 16 = 80 additional tab stops that a keyboard user must endure, when they didn't actually need the navigation in the first place.

If the site I have open had a Skip Link a user could have used it on each of the 5 pages I looked at and reduced the number of keypresses by 70, as using the Skip Link typically takes 2 keypresses <kbd>Tab</kbd> and then <kbd>Enter</kbd>. It makes navigation less arduous, enabling users to complete tasks more efficiently and with less effort.

## Why is it important?

For those of you who may be new to accessibility, you may be wondering why it is important, you may understand that some users cannot use pointing devices and also think something along the lines of "It's not really a great amount of effort to press keys" or "If I hold <kbd>Tab</kbd> down, it'll quickly move through all the interactive elements until I let go".

I don't rely on a keyboard, I'm fortunate enough to be able to use pointing devices, such as a mouse, touchscreen or trackpad, so to me, at this moment in time, it is not a great amount of effort to press the tab key, I also have dexterity, reflexes and fine-motor skills to hold <kbd>Tab</kbd> down and let go roughly where I want it to be. You may not have any motor disabilities and your experience of using a website may be similar if you try to navigate a site with a keyboard.

The important thing to remember is what a non-disabled person experiences is often completely different to what a person with a disability experiences. Try to think of as many disabilities that would typically mean a user would rely on a non-pointing device and then think of those where it could be arduous, uncomfortable, difficult or even painful to press those keys.

* A user may not be able to use their hands at all, they may have a mouth stick, which in essence is a stick they hold in their mouth, which they use to press keys on a keyboard
* A user may have arthritis, where the act of pressing a key can be uncomfortable or even painful
* A user may have tremors, so accuracy of pressing a specific key be difficult for them

That list is by no means exhaustive and there are many more reasons why forcing users to tab through unnecessary interactive elements can be harmful.

It's also worth pointing out that users can get frustrated, frustrated users are more likely to bounce away from your website than happy ones, that's pretty much accepted by everyone. A user who relies on a keyboard may get sick of repeatedly tabbing through the navigation on every page of your site, they may just go elsewhere as it has become unnecessarily repetitive, laborious, frustrating or it's causing them fatigue.

## Do they benefit screen reader users, too?

They can do, but I guess the correct answer here is: It depends. Screen readers have built-in menus users can access to navigate to certain parts of a site (assuming the site has decent use of HTML), this could be by headings, by landmarks, by lists, by links, by images and other aspects of the site. Which method they prefer would of course come down to individual preferences. Although it is safe to say, by adding one to your site, you are definitely giving a variety of users the choice to use them.

## Do we use them just for skipping the navigation?

In a word: Nope. Whilst it is common to find them on accessible or accessible-ish sites (even though accessible sites are unfortunately quite uncommon) at the top of a page to skip over the navigation, they certainly don't need to be limited to that. Some examples of stuff a user may not want to tab through could be:

* Social media feed, these things can oftentimes seemingly go on forever and it could take hundreds of tab stops to get out of them
* Filters for searching, sometimes there may be some complex filtering on a page, with multiple inputs and the user may not be interested
* Side panels, sometimes a side panel may have a list of links, for posts by month, since the website was created, there could be well over 100 tab stops there

Again, the above is not a comprehensive list, it's just to give you food for thought. But ultimately, if there is something on a site that is not likely to be important to everybody, but would take a considerable number of keypresses to bypass, then adding additional Skip Links may be super beneficial for some folks.

You may choose to place it above the thing you think users may want to skip or you may add additional ones at the top of the page, just ensure the labels for each are unique, understandable and they actually skip to where a user wants to be.

It's also worth pointing out that they are not exclusively for skipping the main navigation