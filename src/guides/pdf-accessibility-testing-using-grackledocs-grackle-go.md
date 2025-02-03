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
I logged into [GrackleDocs Grackle GO (external website)](https://www.grackledocs.com/en/products-services/grackle-go-2/) and went to the dashboard

![Grackle Go dashboard](src/guideImg/1-grackle-go-dashboard.png)

I then uploaded the PDFs I wished to test

![Uploading PDF to Grackle Go](src/guideImg/2-grackle-go-upload-file.png)

The file was uploaded

![File uploaded into Grackle Go](src/guideImg/3-grackle-go-file-uploaded.png)

I then uploaded the second file to be tested

![Second file uploaded](src/guideImg/4-grackle-go-2nd-file-uploaded.png)

## First document

The details of the file are shown at the top of the report

![Scan results details](src/guideImg/5-grackle-go-file1-results-details.png)

Then the report gives the grade of the report, alongside the number of passed, warned, and failed.

Grade B means that the document requires review, but passes most of the requirements, typically reports minimal errors, and may contain several cautions

![B grade with 5642 passed, 1 warned and 8 failed. 3 errors with font not embedded](src/guideImg/5-grackle-go-file1-results-report-1.png)

There are 2 pages in which the fonts are not embedded causing 3 failures for each font

![No warnings or failures on the ISO and Natural Language sections.](src/guideImg/6-grackle-go-file1-results-report-2.png)

![Error - alternative description missing for an annotation](src/guideImg/7-grackle-go-file1-results-report-3.png)

There is an annotation that is missing an alternative description.

![Error - invalid use of a "L" structure element in "L"](src/guideImg/8-grackle-go-file1-results-report-4.png)

There is an invalid use of an “L” structure element in “L”. This issue occurs when list structure in a PDF does not meet the expected hierarchy because the list items are not nested correctly.

![Error - "DisplayDocTitle" entry is not set](src/guideImg/9-grackle-go-file1-results-report-5.png)

The “DisplayDocTitle” entry is not set (to true) so that the document title is not displayed in the top bar and the filename is shown – it should be the document title on display.

![Errors - PDF/UA identifier missing, XMP metadata missing in document, and title missing in document's XMP metadata](src/guideImg/10-grackle-go-file1-results-report-6.png)

The PDF/UA identifier is missing, which means that the PDF does not have the required metadata tag showing that it complies with the PDF/UA (Portable Document Format for Universal Accessibility) standard – this should not be set unless the document passes all the tested criteria.

The XMP metadata missing in document, means that the overall language needs to be set for document.

The Title missing in document’s XMP metadata, means that a meaningful title has not been entered in the Title field of the document.

## Second document

The details of the file are shown at the top of the report

![Scan results details](src/guideImg/11-grackle-go-file2-results-report-1.png)

Then the report gives the grade of the report, alongside the number of passed, warned, and failed

![B grade, 8687 passed, 1 warned, and 6 failed](src/guideImg/12-grackle-go-file2-results-report-2.png)

Grade B means that the document requires review, but passes most of the requirements, typically reports minimal errors, and may contain several cautions.

![No warnings and 3 errors in the fonts](src/guideImg/13-grackle-go-file2-results-report-3.png)

![No warnings and no errors](src/guideImg/14-grackle-go-file2-results-report-4.png)

![No warnings and 1 error in document settings, and 1 warning and 2 errors in metadata](src/guideImg/15-grackle-go-file2-results-report-5.png)

The issues are as follows

![No warnings and 9 errors of fonts not embedded in pages](src/guideImg/16-grackle-go-file2-results-report-6.png)

There is 1 page in which the fonts are not embedded causing 3 failures for each font.

![Error - "DisplayDocTitle" entry is not set](src/guideImg/17-grackle-go-file2-results-report-7.png)

The “DisplayDocTitle” entry is not set (to true) so that the document title is not displayed in the top bar and the filename is shown – it should be the document title on display.

![1 warning, PDF/US identifier missing, 1 error XMP metadata missing in document, and 1 error Title missing in document's XMP metadata](src/guideImg/18-grackle-go-file2-results-report-8.png)

The PDF/UA identifier is missing, which means that the PDF does not have the required metadata tag showing that it complies with the PDF/UA (Portable Document Format for Universal Accessibility) standard – this should not be set unless the document passes all the tested criteria.

The XMP metadata missing in document, means that the overall language needs to be set for document.

The Title missing in document’s XMP metadata, means that a meaningful title has not been entered in the Title field of the document.

## Useful links

•	[GrackleDocs Grackle GO (external website)](https://www.grackledocs.com/en/products-services/grackle-go-2/)
•	[Understanding Your GrackleScan Grade (external website)](https://www.grackledocs.com/en/understanding-your-gracklescan-grade/)
