---
title: Creating an accessible PDF using PAVE
summary: PAVE is free online software that "can make your PDF documents
  accessible" for personal use.
author: swilkinson
date: 2025-09-10
toc: false
tags:
  - PDF
file:
  - /public/docs/not-run-accessibility-checker-in-word.pdf
isGuide: true
---
[The ICT Accessibility Lab at the ZHAW School of Engineering](http://accessibility.zhaw.ch/) have developed [PAVE](https://pave-pdf.org/) and made it available free of charge for personal use, as long as the PDF file is no larger than 5Mb.

## Demo file

I used the example file, [Word-un-accessible.docx](/docs/word-un-accessible.docx) **(DOCX 126KB)**, from the [Creating accessible PDFs from Microsoft Word guide](/guides/creating-accessible-pdfs-from-microsoft-word/), and saved it as [demo one](/docs/not-run-accessibility-checker-in-Word.pdf) **(PDF 131KB)** without fixing any accessibility issues in Microsoft Word.

## Check for accessibility in PAC 2024

I ran this file against [PAC 2024](https://pac.pdf-accessibility.org/en) and got the following errors:

* First heading is not on the first level error
* Numbered heading skips one or more heading levels
* 25 Table header cell has no associated subcell errors
* 4 warnings of Irregular table row
* 1 Alternative description missing for an annotation
* 1 PDF/UA identifier missing
* Title missing in document's XMP metadata

## Running PAVE

* Click on 

  ![Start PAVE](src/guideImg/1.start.png)

* I was then taken to the 
  ![Upload file page](src/guideImg/2.upload-file-1.png)

* I then clicked 

  ![Upload file - click to upload a new file and begin the accessibility validation process.](src/guideImg/3.upload-file-2.png)

* Selected the file and then got the results

  ![Results of running PAVE](src/guideImg/4.results.png)

### Automatic correction
* PAVE was already able to automatically correct 46 issues.

### Manual correction
* Title missing
* Some headings are not in the right order
* Table has no headers

#### Fixing Title missing
These can be 
