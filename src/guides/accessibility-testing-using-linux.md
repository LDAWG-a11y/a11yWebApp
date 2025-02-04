---
title: Accessibility testing using Linux
summary: A guide to using Linux for accessibility testing and document remediation
author: swilkinson
date: 2025-02-04
toc: true
tags:
  - Testing
  - Screen reader
  - Linux
  - Tools
isGuide: true
---
**Note: I’m mostly a Windows user so if anyone has any tips or suggestions, I will gratefully receive them.**

## Linux Mint Cinnamon

I installed [Linux Mint (external website)](https://linuxmint.com/) (Cinnamon) on to an Acer Aspire 5552 (AMD Athlon II X2 processor P320) with 3GB of memory (ex-Windows 7 laptop) to test how well I could use Linux to audit websites and remediate documents.

I was then able to install some [Chrome extensions](https://www.makethingsaccessible.com/guides/accessibility-testing-tools/#:~:text=and%20add%2Dons-,Chrome,-Accessibility%20Insights%20for) to help with auditing websites.

## Screen readers

Windows has Jaws and NVDA, IOS has Voiceover, and Android has Talkback, but these are not available for Linux. 

There are several screen readers available for Linux:
• [Orca Screen Reader (external website)](https://help.gnome.org/users/orca/stable/index.html.en) – good for graphical environments
• [Fenrir (external website)](https://github.com/chrys87/fenrir) - good for command line (ideal for Raspberry Pi OS as it takes up little SD card space or RAM)
• [Emacspeak (external website)](https://github.com/tvraman/emacspeak) - good for command line

## Colour Contrast Checkers

I would normally use TPGi’s Colour Contrast Analyser (external website) in Windows, so I installed Gpick (external website) which I used alongside the Contrast Finde (external website) website to allow me to manually check for colour contrast.

## Installing screen readers on Linux Mint Cinnamon

### Orca Screen Reader

The Orca Screen Reader comes as part of the accessibility package of Linux Mint and does not need to be installed.

Orca can be opened or closed using the Windows key + Alt + S directly, or Alt + F2, which opens the equivalent to the Windows dialog box and then orca entered as a command, then Enter.

![Enter a command dialog box](src/guideImg/1-command.png)

Orca can also be started by going into the Accessibility settings and the Visual tab where the Screen reader can be toggled on and off. 

![Screen reader toggle within Visual tab on Accessibility](src/guideImg/2-accessibility-dialog-box.png)

When Orca Screen Reader is running the preferences can be accessed using “Orca Modifier” + Space, where the “Orca Modifier” is the Insert key on a desktop, and the Caps Lock key on a laptop. 

![Screen Reader Preferences](src/guideImg/3-orca-preferences.png)

This may not work, so Alt + F2, which opens the equivalent to the Windows dialog box and then 
orca -s entered as a command, then Enter (this works even if the screen reader is off).

![Enter a command dialog box](src/guideImg/1-command.png)

I then checked in the General tab to make sure that Keyboard Layout was set to Laptop (which it was).

![Screen Reader Preferences dialog general tab](src/guideImg/4-keyboard-layout.png)

I then went into the Voice tab and using the Rate slider, I made the speech quicker.

![Voice tab on Screen Reader Preferences ](src/guideImg/5-screen-reader-speed.png)

### Fenrir Screen Reader

To install Fenrir, I opened up the Synaptic Package Manager, Searched for Fenrir

![Synaptic Package Manager having searched for Fenrir](src/guideImg/6-synaptic-package-manager.png)

I then clicked on the check box and selected Mark for Installation and selected Mark in the Mark additional required changes? dialog box. 

Then I clicked Apply, then I clicked Apply in the Apply the following changes? dialog box

![Apply the following changes dialog box](src/guideImg/8-apply-the-following-changes.png)

And the relevant software was installed, then I clicked Close on the Changes applied dialog box

![Changes applied dialog box](src/guideImg/9-changes-applied.png)

\###Emacspeak Screen Reader

I followed the same steps in the Synaptic Package Manager as I did with Fenrir, but searched for Emacspeak, sadly the install failed, and I had to remove it.

I’m going to use Orca for the testing as I’m used to using a GUI.

## GPick Colour Contrast Checker

To install Gpick, I followed the same installation steps using the Synaptic Package Manager, and I searched for Gpick.

## Auditing a website

I was struggling to use the laptop with LibreOffice open to edit my audit document, so I ended up using GoogleDocs (external website) to edit the audit document to speed things up, but it was still too slow to be used effectively so, I downloaded and installed Linux Mint Xfce.
Linux Mint Xfce
Orca Screen Reader
The Orca Screen Reader comes as part of the accessibility package of Linux Mint and does not need to be installed.
To use Orca Screen Reader within Xcfe, you go to Accessibility and tick the checkbox “Enable assistive technologies”

I was not able to open and close Orca using the normal keys and discovered that the Keyboard Layout was set to Desktop

I set the Keyboard Layout to Laptop
Orca can normally be opened or closed using the Windows key + Alt + S directly but I was unable to get that command to work in Xfce – it worked really well in Cinnamon!
So I used Alt + F2, which opens the equivalent to the Windows dialog box and then orca entered as a command, then Enter.

When Orca is running the preferences can be accessed by Alt + F2 and entering orca -s. 

To turn off Orca, I used pkill orca.
I then went into the Voice tab and using the Rate slider, I made the speech quicker.

High Contrast
Ctrl + H will put the PC into High Contrast mode when at the Login screen – I couldn’t see any difference tbh!
Chrome extensions
The Chrome extensions I installed:
• Accessibility Insights for Web (external website) - accessibility testing tool
• Alt or not (external website) - see alt text on Twitter/X
• ARC Toolkit (external website) - accessibility testing tool
• axe DevTools (external website) - Web Accessibility Testing - accessibility testing tool
• HeadingsMap (external website) - shows all the headings in a sidebar
• Stylus (external website) – - create, edit, and manage personalised CSS stylesheets. I added custom CSS to test spacing and show focus indicator (external website)
• WAVE Evaluation Tool (external website) 
• Web Developer (external website) 
Code for Stylus
I added the Focus Style and Testing WCAG 1.4.12 Text Spacing CSS in Stylus.
JavaScript Bookmarklets
I also added the Adrian Roselli 24x24 bookmarklet.

Auditing a website
Using Xfce was far more successful as my laptop was running as it should be, and I was able to test the website and audit the report.
Auditing PDFs
As PAC 2024 does not currently work on Linux, even under WINE, I used Grackle Go to audit the PDF I found during my website audit.
Remediating PDFs
While there is software that can read or edit PDFs on Linux, I’ve not found any that will remediate PDFs to a level that they can pass PAC 2024.

Useful links
• Accessibility Insights for Web (external website)
• Alt or not (external website) 
• ARC Toolkit (external website)
• axe DevTools (external website)
• Basic Orca Tutorial (external website)
• Emacspeak (external website)
• Fenrir (external website)
• GrackleDocs Grackle GO (external website)
• HeadingsMap (external website) 
• Introduction to Orca Screen reader for Linux (external website)
• Linux Mint (external website)
• Orca Screen Reader (external website)
• Stylus (external website) 
• Survey of Screen-Readers in Linux Operating Systems (external website)
• WAVE Evaluation Tool (external website) 
• Web Developer (external website)
