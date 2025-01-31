---
title: PDF Accessibility testing using GrackleDocs Grackle Go
summary: A quick overview on the Grackle Go PDF accessibility checker
author: swilkinson
date: 2025-01-31
toc: false
tags:
  - PDF
  - GrackleGo
  - Documents
isGuide: true
---
I logged into GrackleDocs Grackle GO (external website) and went to the dashboard.

I then uploaded the PDFs I wished to test.

The file was uploaded.

I then uploaded the second file to be tested.

## First document

The details of the file are shown at the top of the report

Then the report gives the grade of the report, alongside the number of passed, warned, and failed.
Grade B means that the document requires review, but passes most of the requirements, typically reports minimal errors, and may contain several cautions.

There are 2 pages in which the fonts are not embedded causing 3 failures for each font.

There is an annotation that is missing an alternative description.

There is an invalid use of an “L” structure element in “L”. This issue occurs when list structure in a PDF does not meet the expected hierarchy because the list items are not nested correctly.

The “DisplayDocTitle” entry is not set (to true) so that the document title is not displayed in the top bar and the filename is shown – it should be the document title on display.

The PDF/UA identifier is missing, which means that the PDF does not have the required metadata tag showing that it complies with the PDF/UA (Portable Document Format for Universal Accessibility) standard – this should not be set unless the document passes all the tested criteria.
The XMP metadata missing in document, means that the overall language needs to be set for document.
The Title missing in document’s XMP metadata, means that a meaningful title has not been entered in the Title field of the document.

## Second document

The details of the file are shown at the top of the report

Then the report gives the grade of the report, alongside the number of passed, warned, and failed

Grade B means that the document requires review, but passes most of the requirements, typically reports minimal errors, and may contain several cautions.

The issues are as follows

There is 1 page in which the fonts are not embedded causing 3 failures for each font.

The “DisplayDocTitle” entry is not set (to true) so that the document title is not displayed in the top bar and the filename is shown – it should be the document title on display.

The PDF/UA identifier is missing, which means that the PDF does not have the required metadata tag showing that it complies with the PDF/UA (Portable Document Format for Universal Accessibility) standard – this should not be set unless the document passes all the tested criteria.
The XMP metadata missing in document, means that the overall language needs to be set for document.
The Title missing in document’s XMP metadata, means that a meaningful title has not been entered in the Title field of the document.

## Useful links

•	GrackleDocs Grackle GO (external website)
•	Understanding Your GrackleScan Grade (external website)
