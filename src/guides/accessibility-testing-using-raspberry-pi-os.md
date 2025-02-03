---
title: Accessibility testing using Raspberry Pi OS
summary: Can a Raspberry Pi be used for accessibility testing and document remediation?
author: swilkinson
date: 2025-02-03
toc: false
tags:
  - Testing
  - Screen reader
  - Raspberry Pi OS
  - Tools
isGuide: true
---
## Raspberry Pi OS

**Note: I’m mostly a Windows user so if anyone has any tips or suggestions for using Raspberry Pi OS for digital accessibility testing and remediation, I will gratefully receive them.**

I installed [Raspberry Pi OS (bullseye) (external website)](https://www.raspberrypi.com/software/) on to an 8GB Raspberry Pi 4 to test how well I could use Raspberry Pi OS to audit websites and remediate documents.

## Screen readers

Windows has Jaws and NVDA, IOS has Voiceover, and Android has Talkback, but these are not available for Raspberry Pi OS. There are several screen readers available for Raspberry Pi OS:
• [Orca Screen Reader (external website)](https://help.gnome.org/users/orca/stable/index.html.en) – good for graphical environments
• [Fenrir (external website)](https://github.com/chrys87/fenrir) - good for command line (ideal for Raspberry Pi OS as it takes up little SD card space or RAM)
• [Emacspeak (external website)](https://github.com/tvraman/emacspeak) - good for command line

### Installing screen readers on Raspberry Pi OS

#### Orca Screen Reader

I installed Orca by going to the Terminal and typing in:

```
sudo apt install orca
```

Orca should be able to be opened or closed by Alt + F2, which opens the equivalent to the Windows dialog box and then orca entered as a command, then Enter.

When Orca Screen Reader is running the preferences can be accessed using “Orca Modifier” + Space, where the “Orca Modifier” is the Insert key on a desktop, and the Caps Lock key on a laptop. 

I found Alt + F2 was not working so I used Ctrl + Alt + T to open a terminal window and typed 

```
orca 
```

and as Alt + F2 was not working, I typed 

```
orca -s 
```

as a command in the terminal window, then Enter (this works even if the screen reader is off).

I then checked in the General tab to make sure that Keyboard Layout was set to Desktop (which it was).

![screen reader preferences with the keyboard layout set to desktop](src/guideImg/2-orca-screen-reader-preferences.png)

I then went into the Voice tab and using the Rate slider, I made the speech quicker.

![screen reader preferences with the keyboard layout set to desktop](src/guideImg/3-orca-screen-reader-voice-type-settings.png)

## Colour Contrast Checkers

I would normally use TPGi’s [Colour Contrast Analyser (external website)](https://www.tpgi.com/color-contrast-checker/) in Windows, so I installed [Gpick (external website)](https://www.gpick.org/) which I used alongside the [Contrast Finder (external website)](https://app.contrast-finder.org/?lang=en) website to allow me to manually check for colour contrast.

### GPick Colour Contrast Checker

To install Gpick, I followed the same installation steps using the terminal and 

```
sudo apt install gpick
```

## Other tools

### Magnifier

I installed the screen magnifier tool so that I could test using this.

```
sudo apt update
sudo apt install mage
```

It can also be installed using “Add/Remove Software”

![add remove software magnifier](src/guideImg/4-magnifier.png)

![Installing packages - please wait...](src/guideImg/5-installing-packages.png)

The Magnifier button appears down in the bottom right corner of the taskbar by the clock

![Magnifier in the taskbar](src/guideImg/5.5-magnifier-button.png)

The Magnifier in use

![](src/guideImg/6-magnifier-in-use.png)

## Browsers

### Chrome extensions on Chromium

I had to login to the Chrome Web Store and then I was able to install Chrome extensions on Chromium.
The Chrome extensions I installed:
• [Accessibility Insights for Web (external website)](https://chromewebstore.google.com/detail/accessibility-insights-fo/pbjjkligggfmakdaogkfomddhfmpjeni) - accessibility testing tool
• [Alt or not (external website)](https://chromewebstore.google.com/detail/alt-or-not/bhbbijphceaijfpppmdjmjalnogkhamc) - see alt text on Twitter/X
• [ARC Toolkit (external website)](https://chromewebstore.google.com/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce) - accessibility testing tool
• [axe DevTools (external website)](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd) - Web Accessibility Testing - accessibility testing tool
• [HeadingsMap (external website)](https://chromewebstore.google.com/detail/headingsmap/flbjommegcjonpdmenkdiocclhjacmbi) - shows all the headings in a sidebar
• [WAVE Evaluation Tool (external website)](https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh) 
• [Web Developer (external website)](https://chromewebstore.google.com/detail/web-developer/bfbameneiokkgbdmiekhjnmfkcnldhhm) 

Sadly [Stylus (external website)](https://chromewebstore.google.com/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)  was not available for the version of Chromium even though I’d updated my Raspberry Pi OS and checked I’d got the latest version of Chromium.

### Chrome extensions on Firefox

I went to the Add/Remove Software and searched for Firefox and added it to Raspberry Pi OS.

![Add remove software Firefox](src/guideImg/1-firefox-install.png)

I then installed the following Firefox extensions:
• [Firefox webstore - ARC Toolkit (external website)](https://addons.mozilla.org/en-GB/firefox/addon/arc-toolkit/) - accessibility testing tool
• [Firefox webstore - ARIA DevTools (external website)](https://addons.mozilla.org/en-GB/firefox/addon/aria-devtools/) - spot missing ARIA labels, misused ARIA roles, and incomplete keyboard support
• [Firefox webstore - axe DevTools (external website)](https://addons.mozilla.org/en-GB/firefox/addon/axe-devtools/) - Web Accessibility Testing - accessibility testing tool
• [Firefox webstore - HeadingsMap (external website)](https://addons.mozilla.org/en-GB/firefox/addon/headingsmap/) - shows all the headings in a sidebar
• [Firefox webstore - Landmark Navigation via Keyboard or Pop-up (external website)](https://addons.mozilla.org/en-GB/firefox/addon/landmarks/) - navigate web pages via WAI-ARIA
• [Firefox webstore - Stylus (external website)](https://addons.mozilla.org/en-GB/firefox/addon/styl-us/) - create, edit, and manage personalised CSS stylesheets. Custom CSS can be [added to test spacing and show focus indicator](https://www.makethingsaccessible.com/guides/accessibility-testing-tools/#stylus)
• [Firefox webstore - Web Developer (external website)](https://addons.mozilla.org/en-GB/firefox/addon/web-developer/) - adds a toolbar button with various web developer tools
• [Firefox webstore - webhint (external website)](https://addons.mozilla.org/en-GB/firefox/addon/webhint/) - tests websites for issues with accessibility, browser compatibility, security, performance etc.
• [Firefox webstore - WCAG Color contrast checker (external website)](https://addons.mozilla.org/en-US/firefox/addon/wcag-contrast-checker/) - checks the color contrast between the foreground and background of the elements that are in the page according to the WCAG 2.2

### Code for Stylus

I added the [Focus Style](<https://www.makethingsaccessible.com/guides/accessibility-testing-tools/#:~:text=Accessibility Testing Tools-,Code for Stylus,-Create the following>) and [Testing WCAG 1.4.12 Text Spacing](<https://www.makethingsaccessible.com/guides/accessibility-testing-tools/#:~:text=dotted hotpink !important%3B %0A}-,Testing WCAG 1.4.12 Text Spacing,-* { %0A line-height%3A 1.5>) CSS in Stylus.

### JavaScript Bookmarklets

I also added the Adrian Roselli 24x24 [bookmarklet (external website)](https://adrianroselli.com/2022/05/24x24-pixel-cursor-bookmarklet.html).

Auditing a website
Unlike with my laptop where I was struggling to use the laptop with LibreOffice to edit my audit document, LibreOffice Writer was working well.
Auditing PDFs
As PAC 2024 does not currently work on Raspberry Pi OS, and wouldn’t work under WINE on ARM, I used Grackle GO to audit the PDFs I found during my website audit.
Remediating PDFs
While there is software that can read or edit PDFs on Linux, I’ve not found any that will remediate PDFs to a level that they can pass PAC 2024.
Useful links
• Accessibility Insights for Web (external website)
• Alt or not (external website) 
• ARC Toolkit (external website)
• axe DevTools (external website)
• Basic Orca Tutorial (external website)
• GrackleDocs Grackle GO (external website)
• HeadingsMap (external website) 
• Installing Firefox on your Raspberry Pi (external website)
• Introduction to Orca Screen reader for Linux (external website)
• Latest Raspberry Pi OS update – May 2020 (external website)
• Orca Screen Reader (external website)
• Raspberry Pi OS Accessibility articles (external website)
• Stylus (external website) 
• Survey of Screen-Readers in Linux Operating Systems (external website)
• WAVE Evaluation Tool (external website) 
• Web Developer (external website)
