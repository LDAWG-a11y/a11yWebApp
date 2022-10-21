---
title: Using a portable stylesheet across the web
summary: Most websites are inaccessible, this creating barriers to users, this
  guide will help to override some default styles, which will be particularly
  useful to keyboard or low-vision users
author: dlee
date: 2022-10-21
toc: false
tags:
  - CSS
  - Focus indicators
  - Adapting websites
  - Browser extensions
isGuide: true
---
## Intro

We know that the majority of websites are inaccessible, there are a limited amount of accessibility professionals and a limited amount of companies that care enough to hire one, which results in a web that barely usable for so many. As we cannot control the quality of the code and design aesthetics of companies we do not work for, we can help some users with a portable stylesheet.

### Wait, what is a portable stylesheet?

Simply put, it's a CSS file that you can turn on or off at your leisure, you can keep it running on every site or just turn it on when you encounter a particularly bad site.

### But I don't know CSS

You don't really need to know it, you can have it provided to you by somebody who does. In this particular guide, we're going to create a portable stylesheet and I'm going to walk you through every step, explaining each line of CSS and how you can change it to suit your own needs. We can change more than just focus indicators, but are just going to show you how to see which element you are actually focused on, we may add more tips to this guide at a later date.

## Getting started

First we are going to install an extension into a supporting browser, this particular one is called Stylus and it is available on Chrome, Edge, Firefox and Opera. So all major modern browsers, with the exception of Safari, but I have another way for Safari users to have a portable stylesheet.

We will need to be on a desktop or laptop for this, as we need to install the extension or add-on if you prefer.

So, just follow these steps:

1. [Visit this GitHub page](https://github.com/openstyles/stylus#releases), which should open at the "Releases" section
2. Click the link in the list for the browser you are using (please note, if you are using Edge or Brave, you will need to click the Chrome link, as they all use the same underlying technologies)
3. Install the extension in the usual way, the button will likely say "Add to Firefox/Opera/Chrome" depending on your browser

   1. If you are using Edge, Click the \*\*Settings or More\*\* button
   2. Navigate to \*\*Extensions\*\*, in the newly opened settings menu
   3. Locate the \*\*Manage extensions\*\* option
   4. At the time of writing, the \*\*Extensions\*\* panel is located on the left, at the bottom of that panel, there is a toggle \*\*Allow extensions from other stores\*\*, this will need to be set to on
   5. You will then see a dialog modal, where you will need to confirm your action
   6. Now, you're all set, so navigate back to the page we linked to at the beginning and select the \*\*Chrome\*\* option and install it
4. You may see a dialog, which informs you the extension or add-on can change data on all websites, that's exactly what we want, so click \*\*Add\*\* or whatever your browser displays to proceed

So, now we have it installed, we can go ahead and make things accessible, well some things anyway.

## Using Stylus

You should see a prompt that informs you it has been added to your extensions bar and the stylus icon button should also be visible (I'm using Edge in this guide, as I wanted to start afresh and I have some stylesheets saved in my usual browsers, that I don't want to lose).

![The stylus icon button in Edge's extensions bar, there is also a prompt informing a user it has been enabled](src/guideImg/dl-portable-css-stylus-icon.png)

At this point, you may need to pin Stylus to your extensions bar (move on if the Stylus button is already there). There is a button called \*\*Extensions\*\* in the extensions bar, usually represented by a puzzle piece icon. Navigate to any page on the web, this extension will not work if you're still on the extensions store, but it will work everywhere else. Clicking on the Stylus icon button on a webpage will open up a small popup, which has 2 checkboxes and 2 buttons, we want to click the \*\*Manage styles\*\* button, which will open in a new tab.

### The Stylus interface

 Within the Stylus interface, there is an \*\*Add style\*\* panel, which should be situated on the left, before the code editor, within that panel, there is a Write new style\*\* button, click this, but before doing so, ensure the adjacent checkbox \*\*asUsercss\*\* is unchecked, we don't need to worry about that.

![The Stylus interface, with the Write new style button highlighted](src/guideImg/dl-stylus-create-new-btn.png)

The options should have now changed, at the top there should be an empty input, this is where we need to provide a name for our stylesheet, I'm going to call mine "my stylesheet", as later we may add to it.

![The filename input in the Stylus Styles panel](src/guideImg/dl-portable-styles-stylus-filename.png)

Don't worry about any of those other options, they're not important for what we are doing, they just format the code, but ultimately, you're just going to be copy and pasting, so there is no need to worry.

## Creating our custom focus style