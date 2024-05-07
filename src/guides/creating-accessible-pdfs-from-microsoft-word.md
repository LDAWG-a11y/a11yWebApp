---
title: Creating accessible PDFs from Microsoft Word
summary: A guide to creating accessible PDFs from Microsoft Word
author: swilkinson
date: 2024-05-07
toc: true
tags:
  - Microsoft
  - Word
  - PDF
file:
  - /public/docs/word-un-accessible.docx
isGuide: true
---
## Before starting

* Make sure Microsoft Word is up-to-date
* Make sure that Adobe Acrobat Pro is up-to-date
* Download PAC 2024

## Demo file

* An example file, [Word-un-accessible.docx](/public/docs/word-un-accessible.docx) **(DOCX 126KB)**, has been created which has issues that need to be corrected

## Making documents correctly

### Title, Author etc.

* While Title is the only field that is required, it is worth adding Tags for SEO, Subject, and right click on Author(s)’s name to “Remove Person” if you do not wish their name all over the internet – replace Author with organisation name

### Headings

* Use the headings built into Microsoft Word
* The page content should be outlined in the headings, which helps AT users comprehend the page layout and navigate to interesting content:
   * Main heading = Heading 1
   * Sub-headings = Heading 2
   * Sub-sub-headings = Heading 3 etc.

### Lists

* Use the inbuilt document list controls within Microsoft Word to add ordered lists (numbers) and unordered lists (bullet points)
* AT users can understand lists created as lists because of the way content is organised
* Lists will communicate helpful information such as:
   * How many items the list has
   * Where the list starts and where the list finishes
   * Which list item the user is on

### Hyperlinks
* The destination of links should be communicated accurately and clearly
* Use URL shortening services such as [Bitly](https://bitly.com/pages/landing/bringing-us-all-a-bit-closer) or [TinyURL](https://tinyurl.com/app) if the document is to be printed, if not, make sure the link text is meaningful (link shorteners can be viewed as a security risk as the destination cannot be seen unless the link has been clicked!)
* Screen readers will generally provide a list of links so make sure the link text is meaningful
* Do not use “click here” or “More information” for all the link text because it will not be possible to distinguish the links from each other

### Alternative text for images (alt text)
* Alt text is used to convey the content of the image to those who can’t see it
* Screen readers will declare the image, then read the alt text
* Images that have no informative content and are purely decorative do not require alt text, but may require markup so that Assistive Technology understands that they should be ignored
* Remember to avoid punctuation as it is voiced
* [MakeThingsAccessible](https://www.makethingsaccessible.com/) has a guide to [creating meaningful alternative text](https://www.makethingsaccessible.com/guides/creating-meaningful-alternative-text/)

### Image use
* Only use images that support the text of the document
* Try avoiding the use of an image instead of text
* Make sure images have alt text unless they are decorative
Language
Leading screen reader software is multilingual.
Language of document
•	The language of the document must be set so that screen readers will read the document using the correct language profile
Language of part of document
•	Content within the document written in a different language to the document’s default language must be identified
Tables
•	Do not use tables to control layout
•	Use tables to communicate relationships between data
•	Make sure headers are identified
•	For WORD only - Provide a short descriptive caption for the table using Table Properties -> Alt Text
•	Try to keep the table simple
•	If the table is complicated, can it be split into multiple tables or into lists?

Other things to take into account for accessibility 
Plain English
•	Make sure sentences are short and concise, around 20-25 words
•	Make sure words are kept simple
•	Use common words. Complicated longer words (8 or 9 letters) will cause readers to skip shorter words (3,4, or 5 letters) that follow
•	Use an Active voice rather than a Passive voice
•	Where possible, use words containing one to two syllables
•	Aim the language used at the level of a 9 year old as recommended by GOV.UK – remember in the UK, 7.1 million adults read at, or below, the level of an average 9 year old. WCAG 3.15 Reading Level (AAA) recommends providing a simplified version of the text if it requires a reading age of more than 12 years old
•	Use contractions, words made up of two short words joined with an apostrophe such as I’ve, can’t etc.
•	Do not use double negatives
•	Explain the unusual, to help give full information
Why use it?
•	The use of Plain English helps all users, including those who’s English is not their main language, and those who have cognitive impairment
•	If the content is easy to read, it will be easy to understand when converted into alternative formats such as braille, or being read aloud by a screen reader
•	Clear content converts more easily into British Sign Language
Further help
•	Free services, guides, and resources to help are available from the Plain English Campaign
•	Measure the readability of the text using Hemingway Editor
Font
•	Use a font that is “sans-serif” and clear such as Arial, Helvetica, or Verdana
•	Minimum font-size of 12
•	For continuous text, avoid using capitals - letters in lowercase are read more easily
•	Do not use underlining and italics because they could make text harder to read
•	Bold and large font can be helpful when emphasising and highlighting text
•	Make sure that text is justified to the left, as this helps to make sure there is an even gap between words, and enables the start and end of each line to be found easily
Colour
•	Do NOT use colour by itself to show meaning
•	Make sure that there is adequate contrast between background and text – use TPGi’s Colour Contrast Analyzer (CCA) to check contrast

Word Accessibility Checker
Accessibility Checker tests Microsoft Word documents for accessibility issues and gives errors, warnings, tips, and intelligent servies.
Errors
•	All non-text content has alternative text (alt text)
•	Tables specify column header information
•	All sections have meaningful names
•	Image or object is inline with the text
•	Document access is not restricted
•	All content control fields have titles

Warnings
•	Table has a simple structure
•	Sufficient contrast between text and background

Tips
•	Layout tables are structured for easy navigation
•	Documents use heading styles

Intelligent Services
•	Suggested alternative text

Running the Accessibility Check
•	Review menu -> Check Accessibility 
•	The errors reported are:
o	Missing Object Description (1)
o	Missing Table Header (1)
o	Image or Object Not Inline (1)
•	The Warnings reported are:
o	Use of Merged or Split Cells (2)
o	Hard-to-Read Text Contrast (1)
•	Intelligent Services:
o	Review Auto-Generated Description (2)
