---
title: Screen Reader - Basic Website Testing
summary: A look at how to test websites using a Screen Reader with the most
  common functions.
author: admin
date: 2022-10-21
toc: false
isGuide: true
---
# Testing with Screen Readers \[Web pages]

When it comes to web accessibility, people with sight loss who use screen readers to complete online tasks is often the thing that people think of. This is where gaps appear. How do screen readers really work? Are they all the same? And why should you conduct screen reader testing on your website? 

## What are screen readers?

Screen readers are specialist text-to-speech software that can be used by people with varying degrees of sight loss to access website content, generally these applications are used on a computer or mobile device. They are designed to run on up-to-date operating systems, like Windows, iOS and Android. The content screen readers work with include but are not limited to emails, word processing, spread sheets, web pages and many other applications.

Screen readers work by announcing site content such as headings, links, non-link text, images and more; they do this via an installed speech synthesizer. 

Along with speech output, some screen reader applications allow the user to enhance the visual aspect of content altering the appearance of a web page. An example of this is the user increasing the size of the whole screen, changing mouse pointers, or adapting the screen colour. These changes are helpful for users who have limited vision or even users with colour blindness.

Many severely sight impaired users cannot accurately navigate web content with a mouse, so they will typically control their screen reader using only keyboard commands. This enables them to use a computer to perform the same tasks as a sighted user, but not all screen readers are the same. As with most technologies, there are several options to choose from. These can be either paid-for or free. Some come built-in to the user’s device, such as the software that runs on the Android or iOS platforms.

## Popular computer screen reader software includes:

Free: NVDA, Windows Narrator, VoiceOver (macOS/iOS).

Paid-for: JAWS \[Job Access With Speech], Dolphin SuperNova.

## Screen reader Setup – at first logon


Please Note: It is advisable to enable Focus visual cues to allow sighted users to see where the software is whilst on a webpage. This is recommended as screen readers use an invisible cursor to move around any webpage. To enable this feature if it is not already on, please see below.

### JAWS

Focus mode is already turned on in JAWS, on a webpage you will see the red box around the focal point as demonstrated below.

### Narrator

Focus mode is already turned on in Narrator. When the application starts you should see a coloured box like in the below image.

### NVDA

The Focus highlighting option within NVDA is not enabled to start with and needs to be turned on. To do this please do the following.

Press windows key plus B to go to the system tray

Locate NVDA with left or right arrow and press the application key when on it \[or              right mouse click]

Go to preferences, then Settings and press enter.


Arrow down to Vision, then press tab until you get to Enable Highlighting, and press spacebar to select the option.


Tab to the OK button and press enter.



## Testing using specific keystrokes

## Links information


With all screen readers you can move through links in various ways. Some SR allow you to move directly on the live page from one to the other, but also allow the user to list links to move and digest the information.


JAWS, 		JAWS Key + F7 – This is a specific to only show Links.


Narrator,	        Insert or Caps Lock + F7 Opens a dialogue selection.


NVDA,		NVDA Key + F7 Opens a dialogue selection.


### Headings information


JAWS, 		JAWS Key + F6 – This is a specific to only show Headings.


Narrator,	Insert or Caps Lock + F6 Opens a dialogue selection. Select headings.


NVDA,		NVDA Key + F7 Opens a dialogue selection. Select headings.


### Form Fields


This option includes all form elements with JAWS, or you can choose which element you want to look at with Narrator and NVDA.

JAWS, JAWS Key + F5 – This is a specific to only show Form elements.


Narrator,	Insert or Caps Lock + F7 Opens a dialogue selection. Select From fields.


NVDA,		NVDA Key + F7 Opens a dialogue selection. Select Form fields.



### Graphics


JAWS,		JAWS key + control + G to list or just press G or shift G.


Narrator,	Not available.


NVDA,		Press the letter G or shift G to go backwards.

### Region \[Landmark]


JAWS:		Move to main region press INSERT, Q. No list option for main region. List regions press INSERT, control and R.


Narrator:	Caps Lock + F7 – select Landmarks 


NVDA:		Caps Lock + F7 – Select Landmarks 

### Regions explained


Most web pages have an overall structure that is consistent with other web pages. For example, they tend to have a banner with branding and other high-level content, one or more lists of links for navigation within the website, a section where the main content resides, and a footer. Many pages also have a sidebar with complementary content, and a section of the page dedicated to search. All users benefit from a consistent, predictable page structure as it helps them to easily find content that typically can be found within these page regions.

For sighted users, page regions can easily be located by visual cues. They are typically positioned in predictable places, and often have a background colour or border that differentiates them from surrounding content. 
Screen reader users need to understand the page structure just like everyone else.  If page regions are coded properly, screen reader users can understand the overall structure of the page and can easily jump directly to a specific page region. There are two methods for coding web pages in a way that explicitly identifies these common page regions. Both are described on the Techniques page, linked in the following section.

Example of webpage construction with explanations of different areas 
All the Screen Reading products use the same or similar quick keystrokes when using the internet. If you do not want to list all the elements as above, you can move directly to an area by pressing the correct lettered key. Please see a list of quick keystrokes as below.

## JAWS Internet Keystrokes 

### Navigation Quick Keys

Tip: If you press and hold SHIFT before pressing one of the following Navigation Quick Keys, you can move to the previous instance of that element, for example, press A to move to the next radio button, press SHIFT+A to move to the previous radio button.

In addition, if you press and hold CTRL+INSERT while pressing keystrokes with an asterisk (*) next to them, JAWS displays a list of those elements on the page.

Description		and			Keystroke


Next Radio Button				A

*Next Button					B*


Next Combo Box, List Box, or Tree View		C

*Next Different Element				D*


*Next Edit Box					E*


Next Form Control				F


Next Graphic					G

*Next Heading					H*


*Next Item in a List				I*


*Jump to Line					J*


Next PlaceMarker				K

*Next List					L*


Next Frame					M


Skip Past Links					N


Next Article					O

*Next Paragraph					P*


Move to Main Region				Q


Next Region					R

*Next Same Element				S*


*Next Table					T*


Next Unvisited Link				U


Next Visited Link				V


Next Check Box					X

*Next Division					Z*


Next Tab Control				APOSTROPHE

*Next Separator					DASH*


*Next Clickable Element				SLASH*


Next Mouse Over Element			SEMICOLON*


Next Element					SHIFT+PERIOD


Previous Element				SHIFT+COMMA



## NVDA – Internet Single Letter Navigation Full keystroke list


The following keys by themselves jump to the next available element, while adding the shift key causes them to jump to the previous element:

h: heading


l: list


i: list item


t: table


k: link


n: nonlinked text


f: form field


u: unvisited link


v: visited link


e: edit field


b: button


x: checkbox


c: combo box


r: radio button


q: block quote


s: separator


m: frame


g: graphic


d: landmark


o: embedded object (audio and video player, application, dialog, etc.)


1 to 6: headings at levels 1 to 6 respectively


a: annotation (comment, editor revision, etc.)


w: spelling error

## Narrator Internet Keystrokes


E Next edit box


R Next Radio Button


T Next Table


I Next List Item


D Next region or Landmark


F Next Form field


H Next Heading


K Next link


X Next checkbox


C Next combo box


B Next button


## Full keystroke list.


NVDA: 


JAWS: [Full JAWS Keystroke list](https://www.freedomscientific.com/training/jaws/hotkeys/)


Narrator: [Full Narrator Keystroke list in PDF](https://compass-ssl.microsoft.com/assets/bc/11/bc11e21a-2b99-4292-9f21-7564bec25f30.pdf?n=Complete-guide-to-Narrator_2004.pdf)