---
title: HTML and colour contrast with content
summary: This guide provides useful information on colour contrast and how to
  avoid issues with content.
author: swilkinson
date: 2022-11-04
toc: true
tags:
  - HTML
  - Colour Contrast
isGuide: true
---
## Introduction to colour contrast

This guide provides useful information on colour contrast and how to avoid issues with content.

## Why is it important?

We need to make sure that the colour contrast between any active controls (user interface components) or meaningful graphics, are discernible from the background they are on by people with moderately low vision. 

We also need to make sure that colour contrast between text and its background is discernible by people who may have moderately low vision. 

We must ensure that for people with color deficiencies, the colour, hue and saturation will have an adequate contrast between text and background.
Levels of contrast for text
The contrast ratios should be treated as threshold values. Computed values should not be rounded up, for example 2.999:1 does not meet the 3:1 threshold.

Normal regular text is approximately 16px. Large text is 14 point (18.66px) and bold or larger, or 18 point (24px) or larger.

* 3:1 is the minimum level (A) for large text and graphics of large-scale text
* 4.5:1 is the actual minimum level for normal regular text used for AA because of the compensation for any loss in contrast sensitivity for people with vision loss (20/40 vision)
* 7:1 is the minimum level AAA requirement for normal text because of the compensation for any loss in contrast sensitivity for people with vision loss (20/80 vision)

The exceptions are logotypes where there is a brand name or text within a logo, and incidental text or images of text in a user interface component that is not currently active. These exceptions do not have a minimum contrast ratio.

## Rules

1. If it is functional, it must be contrast compliant. The planned visibility must pass contrast

   * Colour contrast applies to purpose indicators, state indicators, text and anything else that is essential to understanding interactions
   * If primary functions are visible to any degree, it should be visible for everyone unless it is decoration
2. Text always needs contrast

   * Text contrast is 4.5:1 unless very big, everything else is 3:1
3. Do not rely on colour only to convey meaning, use secondary sources of information

   * Do not use colour as the only indication of state within a component. Colour must never be the main indicator for anything that is functional
   * When avoiding having to rely on colour for communicating information, width and height changes, secondary text-based indicators and icons are best used

## Particular cases

### Forms

Do not identify errors in form fields by using red to highlight them, identify the error using text. A screen reader user will benefit if the text gets added to the form field’s label element because it will get read out when the focus is set to that field.

### Link colour

If links are not underlined, or not provided with another non-colour visual indication for their default state, then the colour of the link must have:

* sufficient contrast, 3:1 or higher, with surrounding non-link text and
* a minimum of 4.5:1 luminance contrast ratio with its background colour

Links must be obvious and visible, otherwise they do not become distinct from the surrounding text. A common method for non-underlined links is to underline the link when in hover state, but this does not work on a mobile device.

I suggest using underlined links but if you do not use an underline, use a different visual cue to colour, or increase the link’s font weight.

### High contrast versions

Making a website meet colour contrast requirements in high contrast can be very difficult, but it you can comply by having alternative versions of the website or individual webpage. 

This is best achieved by having a control such as a link that switches to high contrast mode.

If this method is to be acceptable:

* the alternative version must comply to all the requirements of the Web Accessibility Standard
* the alternative version must have exactly the same functionality and information as the page that doesn’t conform
* the link to the alternative version must meet the colour contrast requirements

## Tools

### Offline tools

* [Colour contrast analyser (for Windows and Mac)](http://www.paciellogroup.com/resources/contrastAnalyser) (external website)
* [Contraste for Mac](https://contrasteapp.com/) (external website)
* [Leonardo](https://leonardocolor.io/) Adobe open source project (external website)

### Online tools

* [Colour contrast checker (WebAIM)](http://webaim.org/resources/contrastchecker/) (external website)
* [Colour contrast check (snook.ca)](http://snook.ca/technical/colour_contrast/colour.html) (external website)
* [Tanaguru contrast finder](http://contrast-finder.tanaguru.com/) (external website)
* [Contrast ratio](https://contrast-ratio.com/) (external website)
* [Chrome DevTools colour picker](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#contrast) (external website)
* [Juicy Studios Luminosity Colour Contrast Ratio Analyser](https://juicystudio.com/services/luminositycontrastratio.php) (external website)
* [Monsido Color Contrast Checker](https://monsido.com/tools/contrast-checker) (external website)
* [Material Color Tool](https://material.io/resources/color/) (external website)

### Mobile tools

* [UserLight Color Contrast iOS app](https://itunes.apple.com/na/app/color-contrast/id1095478187?mt=8) (external website)
* [Google Android Accessibility Scanner](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor&hl=en) (external website)

## Wrapping up

Hopefully this guide has helped you to understand a bit more of using colour contrast in your content. 

## Useful links

* [Mozilla Developer Network Web docs color contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast) (external website)
* [WebAIM Understanding WCAG 2 Contrast and Color Requirements](https://webaim.org/articles/contrast/) (external website)
* [BBC Mobile Accessibility Guidelines Colour contrast](https://www.bbc.co.uk/accessibility/forproducts/guides/mobile/colour-contrast/) (external website)
* [Digital.Govt.NZ Colour and contrast](https://www.digital.govt.nz/standards-and-guidance/design-and-ux/accessibility/colour-and-contrast/) (external website)
* [Creating Color Contrast Guidelines to Meet WCAG 2.1 and Beyond](https://medium.com/salesforce-ux/creating-color-contrast-guidelines-to-meet-wcag-2-1-and-beyond-99cee77a7657) (external website)