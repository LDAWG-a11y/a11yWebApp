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

![Title missing section including edit properties link](src/guideImg/5.fix-title.png)

I clicked on the Edit Properties link

![t](src/guideImg/6.title-properties.png)

I added a Title, Subject, and Keywords, and also changed the Author to MakeThingsAccessible.

![Properties form with fields for title, language, author, subject, keywords and save button with the fields completed](src/guideImg/7.title-properties-fixed.png)

Then I clicked 

![Save button](src/guideImg/8.title-properties-fixed-save-button.png)

and the Document Properties are fixed.

#### Some headings are not in the right order

I clicked on 

![Show issue details](src/guideImg/9.show-issue-details.png)

Green elements are already tagged in the reading order and red elements are currently untagged. In this case pages 1,2, and 3 are fixed and 4, 5, and 6 have issues that require fixing.

![issue details showing all 6 pages of the document with red tags on pages that need fixing](src/guideImg/10.issue-details.png)

I then clicked on the "disclosure widget" for page 4

![disclosure widget for Page 4 issues that need fixing](src/guideImg/10-1.issue-details-disclosure-widget.png)

This shows what issues are on that page.

![disclosure widget for Page 4 issues that need fixing open showing invalid first heading level and table has no headers](src/guideImg/10-2.issue-details-disclosure-widget-open.png)

I then hovered my mouse over

![Heading order invalid heading level](src/guideImg/10-3.issue-details-disclosure-widget-header-hover.png)

And the relevant heading was highlighted

![Heading 2 highlighted in red](src/guideImg/10-3.issue-details-disclosure-widget-header-hover-main-page.png)

I then clicked on the "Invalid first heading level" text

![Invalid first heading level](src/guideImg/10-4.issue-details-disclosure-widget-header-invalid-first-heading-level.png)

And the tagging appeared

![Tagging with select element type, select content language, done and Save button](src/guideImg/10-5.issue-details-invalid-first-heading-level-tagging.png)

I changed the element type from Heading 2 to Heading 1 and clicked on the SAVE button.

![Tagging with element amended to Heading 1](src/guideImg/10-6.issue-details-invalid-first-heading-level-tagging-amended.png)

I clicked back on 

![Issue Details tab](src/guideImg/10-7.issue-details-tab.png)

And I am left with one issue on the page

![Table has no headers](src/guideImg/10-8.issue-details-table-has-no-headers.png)

Hovering over "Table has no headers" And it showed which table had the issue

![table with content highlighted red](src/guideImg/10-9.issue-details-table-has-no-headers-main.png)

I then clicked on "Reading Order" and looked through the tags until I found the relevant table

![Reading order tags showing table that needs a header](src/guideImg/10-10.issue-details-table-reading-order.png)




I clicked on the Edit button on the 


I then went to Page 5 which had the error 

![Invalid heading order](src/guideImg/10-30.issue-details-invalid-heading-order.png)

Which I could see when I hovered over the "Invalid heading order"

![Heading 4 highlighted in red on the page of the PDF](src/guideImg/10-31.issue-details-invalid-heading-order-main-page.png)


I clicked on "Invalid heading order" and the Tagging appeared

![Tagging showing element type Heading, heading level and content language](src/guideImg/10-32.issue-details-invalid-heading-order-tagging.png)

I amended the Heading level 4 to Heading level 1 as it is actually the first heading on that page.

![Tagging amended to Heading level 1](src/guideImg/10-33.issue-details-invalid-heading-order-tagging-amended.png)

I then clicked on the SAVE button.

This issue was fixed so I moved on to Page 6 which had this issue.

![Missing link alternate description](src/guideImg/10-40.issue-details-page-6.png)

Hovering over "Missing link alternate description" shows

![Link which has missing alternate description](src/guideImg/10-41.issue-details-page-6-main-page.png)

I opened up Tagging 

![Tagging for Link](src/guideImg/10-41.issue-details-page-6-tagging.png)






<strong>Hello</strong>

I then clicked on the arrow for Page 4

![Arrow button](src/guideImg/11.issue-details-arrow.png)

I then clicked on to the 

![Reading order tab](src/guideImg/12.issue-details-reading-order.png)

Which shows all the tags in reading order

![Reading order tab showing all tags in their reading order](src/guideImg/13.issue-details-reading-order-tab.png)
