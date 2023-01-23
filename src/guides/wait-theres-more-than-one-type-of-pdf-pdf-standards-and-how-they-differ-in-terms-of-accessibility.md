---
title: Wait, there's more than one type of PDF? PDF standards and how they
  differ in terms of accessibility.
summary: How do you make accessible PDF files? This article explains how to make
  an accessible PDF file and the different types and standards of PDF files.
author: hallen
date: 2023-01-23
toc: true
tags:
  - PDF
  - Accessible Documents
isGuide: true
---
PDF (Portable Document Format) files have been widely used for many years, and are even seen as a universal, simple solution which is compatible with almost everything. This has led to PDF files going from originally being a format for print to being widely used across many industries. Despite it initially seeming like a format that would be very accessible, by default it tends to not be, and there are many vastly different standards of PDF which can have many different implications for accessibility, and even the best formats require some work to be able to create properly.

There are many different types and standards of PDF files, and all are made differently. In this guide, I will list a few of those standards which might be used as examples (even though there are many more):

1. PDF Full Text and Graphics / PDF (FTG) / PDF Normal: This type of PDF includes both text, graphics and Images and was originally standardised to make PDFs that can be rendered at the best possible resolution. For a PDF to comply with this standard, you must have text as text, graphics as graphics, lines as lines, and only use an image when it is necessary (such as when you are adding an actual photograph)
2. PDF Image Only / PDF (I): This type of PDF is made up of images only, it's commonly used for sharing photographs or scanned documents. These files can be easily shared and read on a variety of devices, but they are not as accessible as other types of PDFs, due to not actually containing any text but simply an image, and therefore not being visible to any screen readers.
3. Searchable / OCR PDFs / PDF (I + HT): These documents usually originate from a PDF Image Only file that has been converted to this format using OCR (optical character recognition) software. Searchable / OCR PDF documents are essentially composed of two different layers. A JPEG or bitmap on top (to ensure that the document will look the same to the user) and a layer containing text beneath which has been created using OCR (optical character recognition) software to be able to determine the contents of the document. This allows people to highlight and search for text in the document, and use it more normally compared to an Image Only PDF, however, despite being an improvement, it is not even near to being fully accessible due to it lacking landmarks to add semantic meaning to the page.
4. PDF Universal Accessibility / PDF (UA): This standard is intended for creating PDFs that are accessible and requires things such as PDFs being tagged, in order to correctly represent to document's structures (tables, headings, lists, etc.), have a logical reading order, alternate text, embedded fonts and much more. These documents tend to be the most accessible but aren't as complicated to make as it sounds.

Note: This is just a very small sample of the many standards that exist, however from this you can see that not all documents are created equal and the accessibility of a PDF file can differ.

## Tips for making your PDF documents more accessible:

Whilst there are many different standards, and some have accessibility requirements, it is worth following these more general tips whenever you are making a PDF to ensure that it is more accessible:

### Always attempt to create PDFs from source files/media

To put it simply, the most accessible documents will have always have been converted directly from the original source (where it was created) For example, a word document can be converted directly, which is significantly better than converting things multiple times. One thing that you should attempt to avoid doing at all costs is scanning something using a scanner to "make it a PDF", as this produces documents that are inaccessible to people with disabilities, due to it simply being a bitmap/image.

### Ensure that PDF files have proper semantic headings and that all images and complex diagrams have alternate text

Note: If the original document that you want to turn into a PDF was made in Microsoft Word, Ben Watson had made a brilliant guide on [the basics of making accessible word documents](https://www.makethingsaccessible.com/guides/accessible-document-basics/) which outlines how to ensure that your document is ready to export.

One way to check if a PDF document is accessible within Adobe Acrobat Pro is by going to Tools > Accessibility > Full Check / Accessibility check this will allow you to check these basics if you have an Acrobat Pro licence. If you don't have a copy of Adobe Acrobat Pro, you can check on a browser if you can highlight text on a PDF, and that the original file had proper headings and alternate text, however unfortunately the only way to test this without an Acrobat Pro licence fully is to use an actual screen reader.

It is always good to use existing accessibility checkers, such as the one built into Microsoft Word and Adobe Acrobat to check the original or PDF documents.

### If you cannot find or do not have the original source for a document, use scanning / OCR tools to be able to add text to the scanned version

In the event that you need to use an image-only document, and there is no way to recover/find the original source document, you can use optical character recognition/scanning tools, such as what is built into Adobe Acrobat Pro to be able to create a text layer. You can either scan the original bitmap and use both or convert it entirely to just be the scanned document, deleting the original bitmap. In most cases, we would recommend using Adobe Acrobat Pro to convert scanned documents, as most other software is paid and usually even more limited.

After having scanned your image-only PDF, you can use software such as Adobe Acrobat Pro to create heading landmarks to make it more accessible.

### Be careful when using complex layouts to ensure that there is a logical reading order

Quite a lot of modern PDF templates and designs tend to have issues where they don't have a logical reading order. For example, a lot of templates that have layouts with multiple columns may not necessarily have used the order panel in Adobe Acrobat Pro to be able to show this, which can end up meaning that instead of reading down the individual column, like what would make sense to the user, some screen readers can end up reading across the whole document instead, which ends up meaning that the document does not make any sense to the user (due to the nature of the second column not being intended to be read with the first column, but separately) These kinds of layouts, when not properly specified, can pose large accessibility issues for some users.

On some versions of Adobe Acrobat Pro, you can ensure that your PDF document has a logical reading order by going to Tools > Accessibility > TouchUp Reading Order > Show Order Panel, to be able to change the reading order of your document so can be properly read by screen readers.

Overall, on this point, it is easiest to avoid complex layouts, however, when needed you can either ensure that your document can be read in a logical order by screen readers by using Adobe Acrobat Pro.

## Is it actually worth using PDF?

To put it shortly: not unless a document is explicitly made for print usage, and print usage only, at which point it should be published with another version of the document in an accessible format, such as HTML.

The Government Digital Service (GDS), has even published an article specifically discouraging the use of PDF files in most scenarios in its blog post, titled "[Why GOV.UK content should be published in HTML and not PDF](https://gds.blog.gov.uk/2018/07/16/why-gov-uk-content-should-be-published-in-html-and-not-pdf/)" To quote the blog post from the organisation:

> "Compared with HTML content, information published in a PDF is harder to find, use and maintain. More importantly, unless created with sufficient care PDFs can often be bad for accessibility and rarely comply with open standards."

They cover a range of issues, such as the fact that they are not able to change to fit the size of different screens, which especially becomes an issue when they are used on smaller screens such as smartphones, they are very hard to make somewhat accessible, they are not easily maintainable (to update things such as the layout and the standards of, say, 50,000 files, you would need to modify each one manually instead of being able to make changes in bulk, such as what can be done with most web content) and, unlike with most web content or word documents, users cannot adjust things such as colours and contrast, to be able to make a document easier for people to read.

Quite a lot of the time, it is just worth publishing something either as web content that has been made accessible or in formats such as odt (Open Document Text) files or OpenDocument format files, which can be made from within word, LibreOffice, OpenOffice or any modern document editor (and these pieces of software are free to use, unlike Adobe Acrobat Pro) This advice is echoed by the GDS.

## Potential legal issues with publishing a document exclusively in PDF as a public sector organisation

Public sector organisations are required to, when publishing PDF documents on their website, provide the files in an alternative format, such as a webpage (HTML) or an OpenDocument format file. Whilst there are exemptions to this, such as for schools and colleges in cases where a document is **not** needed to be able to access basic services, quite a lot of time, exclusively publishing documents on your website in PDF format, as a public sector organisation, may potentially be in breach of [The Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018](https://www.legislation.gov.uk/uksi/2018/852/contents/made) if published after 2018.

Overall, despite PDF files initially seeming like an accessible format, there can be many issues with the ways that most modern PDF files are created in terms of accessibility. By following these steps and understanding how types of PDF differ, you can ensure that everyone, including those with disabilities, can access the information in your documents in an equal way.