---
title: GrackleGo and PAC 2024
summary: These free PDF validators are really useful when remediating PDFs
author: swilkinson
date: 2024-11-05
toc: true
tags:
  - PDF
  - Validation
  - Remediation
file:
  - /public/docs/googledocs-un-accessible.pdf
  - /public/docs/word-un-accessible.pdf
isGuide: true
---
GrackleGo and PAC 2024 are both free validators.

[GrackleGo](https://www.grackledocs.com/en/products-services/grackle-go/) is hosted in the cloud and the document is validated on the [GrackleDoc’s](https://www.grackledocs.com/en/) servers – which could be an issue if the document has confidential information, whereas GrackleDoc’s [Grackle PDF](https://www.grackledocs.com/en/products-services/grackle-pdf/) is not free, but is downloaded to the user’s Windows PC and has a similar validator. 

The PAC 2024 validator is downloaded and installed on the user’s Windows PC.

## PAC 2024

I took a file ([Word-un-accessible.pdf](/public/docs/word-un-accessible.pdf)) and ran it through PAC 2024

![PAC 2024 results in detail](src/guideImg/1-pac-2024.png)

There’s no errors in the PDF/UA and WCAG sections and in the Quality section there are 26 warnings, which included ’[Tagged text consists of only whitespace](https://pac.pdf-accessibility.org/en/resources/pac-2024-quality-checks/tagged-text-consists-only-of-whitespace)’ (23) – ‘Tagged text consists of only whitespace, and its location can only be approximated’, ‘[“TOCI” elements contain “Link” elements](https://pac.pdf-accessibility.org/en/resources/pac-2024-quality-checks/toci-elements-contain-link-elements)’ (2) – ‘“TOCI” element does not contain a “Link” element that points to another element’, and ‘[Completeness of “Table” elements](https://pac.pdf-accessibility.org/en/resources/pac-2024-quality-checks/completeness-of-table-elements)’ – ‘“Table” structure is possible incomplete due to a missing “TH” or “TD” element’.

**Note** that the Quality Checks are not official technical criteria, and they are not required to be green for the PDF to be accessible, they serve as an indicator of potential errors.

### Warnings

#### Tagged text consists of only whitespace, and its location can only be approximated

There is empty whitespace such as 

![Empty white space in link within TOCI](src/guideImg/2-toci-whitespace.png)

and 

![empty paragraphs](src/guideImg/3-empty-paragraph.png)

### “TOCI” element does not contain a “Link” element that points to another element

TOCI objects without Link - OBJR links

And

“Table” structure is possible incomplete due to a missing “TH” or “TD” element
Unfortunately, PAC 2024 is not able to point out which, if any, table is possibly incomplete due to missing a TH or TD element.
Grackle Go
I uploaded the file to Grackle Go by   and selecting the PDF file

I then clicked   which created a scan and submitted the file

I had to wait for a little while for the scan to show Completed, don’t forget to hit the   

The Scan Results report can then be accessed by clicking on the Filename link

The Scan Results show details about the file including what application was used to generate the PDF, and both the “original file” and the report (put report here) can be downloaded using the following buttons

The Word-un-accessible.pdf file passed with an Accessible Grade of A but I have also tested GoogleDocs-un-accessible.pdf which fails with an Accessible Grade of F.
The report breaks down into Basic Requirements, Logical Structure, and Metadata and Settings with each part showing passes, warnings, and failures. 
When a particular issue is selected

The part of the report showing the page highlights the issue

This helps the user in tracking down the issue in Grackle PDF or other PDF editing software.
