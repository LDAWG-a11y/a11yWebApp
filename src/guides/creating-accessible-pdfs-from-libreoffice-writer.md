---
title: Creating accessible PDFs from LibreOffice Writer
summary: A guide to creating accessible PDFs from LibreOffice Writer
author: swilkinson
date: 2024-05-17
toc: true
tags:
  - LibreOffice
  - Writer
  - PDF
isGuide: true
---
## Before starting

* Make sure that your version of LibreOffice is Version 7 or above – check by going Help -> About LibreOffice, or if not installed, [download LibreOffice](https://www.libreoffice.org/download/download-libreoffice/) (external website)
* Older versions may require the tool to be turned on as an Advanced option (“Enable experimental features (may be unstable)”) but it is inbuilt in more recent versions
* Make sure that Adobe Acrobat Pro is up-to-date
* Download [PAC 2024](https://pac.pdf-accessibility.org/en) (external website)

## Demo file

An example file, LibreOffice-un-accessible.odt **(ODT 164KB)**, has been created which has issues that need to be corrected.

## Making documents correctly

### Title, Author etc.

While Title is the only field that is required in an accessible PDF, it is worth adding Keywords for SEO, adding the Subject, and a generic Contributor and a Publisher. If you do not wish the name of the real author all over the internet, replace them with organisation name.

### Headings

* Use the headings built into LibreOffice Writer
* The page content should be outlined in the headings, which helps AT users comprehend the page layout and navigate to interesting content:

  * Main heading = Heading 1
  * Sub-headings = Heading 2
  * Sub-sub-headings = Heading 3 etc.

### Lists

* Use the inbuilt document list controls within LibreOffice Writer to add ordered lists (numbers) and unordered lists (bullet points)
* AT users can understand lists created as lists because of the way content is organised
* Lists will communicate helpful information such as:

  * How many items the list has
  * Where the list starts and where the list finishes
  * Which list item the user is on

### Hyperlinks

* The destination of links should be communicated accurately and clearly
* Use URL shortening services such as [Bitly](https://bitly.com/pages/landing/bringing-us-all-a-bit-closer) (external website) or [TinyURL](https://tinyurl.com/app) (external website) if the document is to be printed, if not, make sure the link text is meaningful (link shorteners can be viewed as a security risk as the destination cannot be seen unless the link has been clicked!)
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

### Language

Leading screen reader software is multilingual.

#### Language of document

The language of the document must be set so that screen readers will read the document using the correct language profile.

#### Language of part of document

Content within the document written in a different language to the document’s default language must be identified.

### Tables

* Do **not** use tables to control layout
* Use tables to communicate relationships between data
* Make sure headers are identified
* Try to keep the table simple
* If the table is complicated, can it be split into multiple tables or into lists?

## Other things to take into account for accessibility

### Plain English

* Make sure sentences are short and concise, around 20-25 words
* Make sure words are kept simple
* Use common words. Complicated longer words (8 or 9 letters) will cause readers to skip shorter words (3,4, or 5 letters) that follow
* Use an **Active** voice rather than a **Passive** voice
* Where possible, use words containing one to two syllables
* Aim the language used at the level of a 9 year old as [recommended by GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) (external website) – remember in the UK, 7.1 million adults read at, or below, the level of an average 9 year old. [WCAG 3.15 Reading Level (AAA)](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#reading-level) (external website) recommends providing a simplified version of the text if it requires a reading age of more than 12 years old
* Use contractions, words made up of two short words joined with an apostrophe such as I’ve, can’t etc.
* Do not use double negatives
* Explain the unusual, to help give full information

### Why use it?

* The use of Plain English helps all users, including those who’s English is not their main language, and those who have cognitive impairment
* If the content is easy to read, it will be easy to understand when converted into alternative formats such as braille, or being read aloud by a screen reader
* Clear content converts more easily into British Sign Language

### Further help

* Free services, guides, and resources to help are available from the [Plain English Campaign](https://www.plainenglish.co.uk/) (external website)
* Measure the readability of the text using [Hemingway Editor](https://hemingwayapp.com/) (external website)

### Font

* Use a font that is “sans-serif” and clear such as Arial, Helvetica, or Verdana
* Minimum font-size of 12
* For continuous text, avoid using capitals - letters in lowercase are read more easily
* Do not use underlining and italics because they could make text harder to read
* Bold and large font can be helpful when emphasising and highlighting text
* Make sure that text is justified to the left, as this helps to make sure there is an even gap between words, and enables the start and end of each line to be found easily

### Colour

* Do NOT use colour by itself to show meaning
* Make sure that there is adequate contrast between background and text – use [TPGi’s Colour Contrast Analyzer (CCA)](https://www.tpgi.com/color-contrast-checker/) (external website) to check contrast

## LibreOffice Accessibility Check

[Accessibility Check](https://help.libreoffice.org/latest/sq/text/swriter/01/accessibility_check.html) (external website) tests LibreOffice Writer documents for the following potential accessibility issues:

* Check that the document title is set
* Check that the document language is set, or that all styles that are in use, have the language set
* Check all images, graphics, OLE objects for the alt (or title in some objects) text
* Check that tables do not include split or merged cells, which could be disorienting for users with visual impairments
* Check for fake/manual numbering (not using integrated numbering). For example writing "1." "2." "3." at the beginning of the paragraphs
* Check that hyperlink text is not a hyperlink itself - hyperlink should be described
* Check for the contrast between text and the background. The algorithm is described in the WCAG specification
* Check for blinking text, which can be problematic for people with cognitive disabilities or photosensitive epilepsy
* Check for footnotes and endnotes, which should be avoided
* Check for heading order. Order of the headings must increase incrementally with no skips (for example Heading 1 to Heading 3, skipping Heading 2)
* Check, if text conveys additional meaning with (direct) formatting

## Running the Accessibility Check

* Tools menu -> Accessibility Check… (or Alt + 8)
* The errors reported are:

  * Document: Document default language is not set
  * Document: Document title not set
  * Missing alternative or description text: 3 images
  * Table: “Table1” contains merges or splits
  * Formatting: The text formatting conveys additional meaning (58)
  * Formatting: Avoid newlines to create space (3)
  * Formatting: Avoid using empty table cells for formatting
  * Hyperlink: Hyperlink text is the same as the link address
  * Numbering: Simulated numbering “1. 2….”
  * Other: Avoid footnotes (2)
  * Other: Avoid endnotes
  * Other: Outline levels should start with level 1, instead of level 2
  * Other: Outline levels of headings not in sequential order
  * Other: A heading with outline level 4 must not follow a heading with outline level 2
  * Other: Text contrast is too low
  * Other Blinking text

## Fixing the issues

Note: sometimes you may need to save and close and reopen the document to get the Accessibility Check to recognise that you have fixed the error.

### Language

#### Language of document

* Click on the 

  ![Fix button](src/guideImg/1-fix-button.png)

   by “Document default language is not set” or Tools menu -> Options, Languages and Locales -> General 

  ![Options dialog, languages and locales, general showing user interface language, locale settings and default language for documents](src/guideImg/2-options-dialog-languages-and-locales.png)
* Tools -> Options, Language -> For All Text -> language required

#### Language of part of document

* Select text that is of a different language to the main document
* Tools -> Language -> For Selection (or For Paragraph, as applicable) -> language required

### Title

The error reported is “Document title not set” as this is a required field for accessibility.

* Click on the 

  ![Fix button](src/guideImg/1-fix-button.png)

   by “Document title is not set” 

  ![Enter document title in document title dialog box](src/guideImg/3-enter-document-title-in-document-title-dialog-box.png)
* Go to File menu -> Properties… and then Description tab 

  ![Description tab of properties dialog box showing title filled in](src/guideImg/4-description-tab-of-properties-dialog-box-showing-title-filled-in.png)
* Copy the contents of the Title into the Subject field
* Add applicable SEO keywords into Keywords field
* Add Contributor
* Add Publisher 

  ![Title, subject, keywords, contributor and publisher fields all completed](src/guideImg/5-title-subject-keywords-contributor-and-publisher-fields-all-completed.png)

### Alt text

The error reported is “Missing alternative or description text” because the images do not have alt text set or are not marked as decorative.

* Click on the 

  ![Fix button](src/guideImg/1-fix-button.png)

   by “Image name” 

  ![Alt text dialog box showing text field, alt text field and checkbox for marking image as decorative](src/guideImg/6-alt-text-dialog-box-showing-text-field.png)
* The fields are used as follows:

  * Text: used to enter a short description of the essential details of the selected object, and is available to be used by assistive technologies
  * Alt Text: allows the entry of a longer description for objects that are too complex or contain too much detail to be described adequately in the short Text field, and is available to be used by assistive technologies
  * Decorative: marks the object as purely decorative and is ignored by assistive technologies
* The Text Alternative (Text), Description (Alt Text), and Decorative options are also available by selecting the image, Right Click -> Properties, Options, Accessibility 

  ![Image dialog box with the options tab selected and the accessibility fields](src/guideImg/7-image-dialog-box-with-the-options-tab-selected.png)
* The exported PDF failed on the logo in the Header not having alt-text so make sure that both Text Alternative and Description fields are filled 

  ![Text Alternative and Description completed](src/guideImg/8-text-alternative-and-description-completed.png)

### Tables

#### Setting headings in tables

##### Inserting a table

* Table menu -> Insert Table 

  ![Insert table dialog box](src/guideImg/9-insert-table-dialog-box.png)

  Insert table dialog box with column and row fields, options, including setting Heading, and Repeat heading rows on new page as well as setting the table styles
* Checking the Heading means that the top row cells are now styled as Table Heading
* If the table is going to go more than one page, select “Repeat heading rows on new pages” or select “Don’t split table over pages” to stop this from happening

##### Editing a table

* Styles menu -> Manage Styles which brings up the Style pane
* Select top row of cells and change Styles from “Table Contents” to “Table Heading”

##### Repeating heading when table splits across pages

Right click on table and choose Table Properties, Text Flow tab and make sure that “Allow the table to split across pages and columns”, “Allow row to break across pages and columns”, and “Repeat heading” are checked 

![Allow the table to split across pages and columns, allow row to break across pages and columns, and repeat heading are checked](src/guideImg/10-allow-the-table.png)

#### Fixing errors

##### Table1” contains merges or splits

The first error being reported is “Table:  “Table1” contains merges or splits” 

![Single complex table with females and males](src/guideImg/11-single-complex-table-with-females-and-males.png)

* This problem can be sorted out by splitting the table into two tables, one for females and one for males, and Table Heading added to columns and rows 

  ![Females and Males tables separated into two tables with the headings set table headings](src/guideImg/12-females-and-males-tables-separated-into-two-tables-with-the-headings-set-table-headings.png)
* This problem can also be sorted out in the exported PDF using Adobe Acrobat Pro

##### The text formatting conveys additional meaning

The second error being reported is “Formatting: The text formatting conveys additional meaning”

![7:32 showing as the text formatting conveys additional meaning](src/guideImg/13-7-32-showing-as-the-text-formatting.png)

* To fix this error, set the text to Body Text 

  ![Times within table set to Body Text from Table Contents](src/guideImg/14-times-within-table-set-to-body-text-from-table-contents.png)
* Then set the times back to the Table Contents style

##### Avoid newlines to create space

* Make sure that “Formatting Marks” are visible by selecting View menu, Formatting Marks (or Ctrl + F10) 

  ![Females table with newline character after it](src/guideImg/15-females-table-with-newline-character-after-it.png)
* Delete the newline character after the table   
* To change space between the tables, open Table Properties, go to Table tab and amend the Spacing Below 

  ![Females and males tables with no newline character between them](src/guideImg/17-table-spacing-properties.png)

![Tables separated using table spacing properties](src/guideImg/18-tables-separated-using-table-spacing-properties.png)

##### Avoid using empty table cells for formatting

![Tables with empty cells](src/guideImg/19-tables-with-empty-cells.png)

##### Tables with empty cells

* There must never be blank heading cells so add an applicable title to the column heading even if [WCAG does allow for the first cell A1 to be blank](https://www.w3.org/WAI/tutorials/tables/) (external website) 

  ![Distance added, top row and first column made into Table Heading](src/guideImg/20-distance-added-top-row-and-first-column-made-into-table-heading.png)
* Different [screen readers will announce empty cells in different ways](https://www.accessibilityunraveled.com/pdf-remediation/how-to-handle-blank-data-cells-in-accessible-tables/) (external website) so the best solutions are to use “Not applicable” or “No value” 

  ![Not applicable and No value used where appropriate to replace empty table cells](src/guideImg/21-not-applicable-and-no-value-used-where-appropriate-to-replace-empty-table-cells.png)

### Headings

#### The text formatting conveys additional meaning

The error reported is “Formatting: The text formatting conveys additional meaning” because the potential headings are formatted using Bold rather than using Heading 1, Heading 2 etc.
Select text to be used as heading and style as appropriate.

#### “Outline levels of headings not in sequential order” and “A heading with outline level 4 must not follow a heading with outline level 2”

“Heading 4” is set to Heading 4, and the heading above is set to Heading 2, which means that there is either a heading between them that has been set incorrectly or either “Heading 2” or “Heading 4” are not set correctly. Correct the heading so they are now in sequential order.

### Lists

#### Simulated numbering “1. 2….” when headings are involved

  

![Headings with handwritten numbers](src/guideImg/22-headings-with-handwritten-numbers.png)

* Delete the numbers
* Set each heading to the same level as this is a list, they need to be the same
* Select the text


  ![All the text is selected that is to be numbered headings](src/guideImg/23-all-the-text-is-selected-that-is-to-be-numbered-headings.png)
* Select Tools menu and “Heading Numbering…”
  Heading numbering dialog box
* Change number to relevant styling
  Number styling set to 1, 2, 3...
* The headings will now be a properly created numbered list – this will apply to all headings at (in this instance as shown in the Level field) level 2
  Numbered list of headings
* Numbered list of headings is removed in the fixed document and replaced with appropriate Headings

#### Simulated numbering “1. 2….” when it is just a list

  Numbered list created manually

* Delete numbers
  Numbers deleted from list
* Select lines of text and use Ordered List button to create ordered list
  Correctly created ordered list

### Hyperlinks

#### Hyperlink text is the same as the link address

url text as a full url

* The link text is the full url
* Right click and “Edit Hyperlink…”
  Hyperlink settings in the Hyperlink dialog box
* Change the Text field to be descriptive text
  Text amended to Frequently Asked Questions (FAQs)
* Adobe Acrobat will automatically make text that appears to be a hyperlink clickable as a hyperlink without it being a proper hyperlink in the PDF document so text like below
  text that is a url but not a link in the original document
* Will be clickable in the exported PDF and should be made into a hyperlink in the original document using good link text
  Note: ScreenTips are not able to set unlike Microsoft Word

### Paragraphs

#### Text contrast is too low

 Contrast between text and background is too low

* Select text and change the text colour
  text is now of a colour that is not too low
* [TPGi’s Colour Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/) (external website) can be used to check the contrast between the text colour and the background

#### Avoid newlines to create space

* Make sure that “Formatting Marks” are visible by selecting View menu, Formatting Marks (or Ctrl + F10)
  text with newline formatting marks
* Delete unneeded newlines
  text with newline formatting marks but extra lines deleted

#### The text formatting conveys additional meaning

  paragraph that is erroring with the text formatting conveys additional meaning

* Select text and chose “Clear Formatting”
* Set text to required style (in this case “Body Text”)

#### Blinking text

Select text and go to Styles menu, and choose “Clear Formatting”. 

### Footnotes and Endnotes

Footnotes and Endnotes can be correctly defined and made accessible using Adobe Acrobat Pro but to get the Accessibility Check to pass footnotes and end notes must be put inline.

### Creating a table of contents or TOC

* Insert menu, Table of Contents and Index, Table of Contents, Index or Bibliography…
  Insert menu showing Table of Contents and Index, Table of Contents, Index or Bibliography...
* Gives you the options to automatically build TOC or create a customized TOC 
  Table of Contents, Index or Bibliography dialog box 
* Because heading styles have been applied, Writer uses them to create TOC 

## Artifacting objects

Header and Footer objects are artifacted when exported to PDF.

## Exporting to a PDF

* File, Export As, Export As PDF
* Remember to enable the Universal Accessibility (PDF/UA) option in PDF export and Tagged PDF (add document structure) is also selected

## Check for accessibility in Adobe Acrobat Pro PDF

Note: to be able to remediate PDFs, Adobe Acrobat Pro or equivalent PDF editing software is required.

* “Walk” the Tag Tree by clicking on the first item in the tree, then using the down arrow key (and right arrow key to open the tag where applicable, list etc.) so that the order the PDF is read can be checked
* In this case everything is good but if it is not, the tags will need to be rearranged into the correct order
* Click on “All tools” menu, “Prepare for accessibility” and choose “Check for accessibility” and “Start Checking”
* The document fails on “Tab order failed”, right click and “Fix” (hence order checked before doing this)

## Check for accessibility in PAC 2024

* Open PAC 2024 and drag and drop the PDF file onto
  Document selection tool
* The test will run and errors will be reported
  PDF/UA warnings regarding structure tree
* Click on “Results in Detail” button which opens up 
  Report dialog box
* And drill down to the warnings
  Possibly inappropriate use of a "Figure" structure element
* There are two warnings for ‘Possibly inappropriate use of a "Figure" structure element’, one in Structure Tree and the other in WCAG 4.1.1 Parsing

### Fixing this issue

* Open file in Adobe Acrobat
* Open Accessibility tags pane
* Find page and select some text by the image, and then click on the “…” and “Find Tag from Selection” so that the correct image can be found in the Accessibility tags pane
  Figure and image in accessibility pane
* Right click `<Figure>` tag and choose Properties
  Object properties dialog box
* Select “Edit Tag…” button and then open up the first `<Dictionary>` object
  Tag element dialog box
* Find the Placement attribute and select it
* Change from Block to Inline (sometimes it might need to be changed **TO** Block!)
* Hit the   PAC 2021 refresh button
* “The PDF/UA requirements checked by PAC are fulfilled.”

## Downloadable Microsoft Word version

[Creating accessible PDFs from LibreOffice Writer](https://www.makethingsaccessible.com/public/docs/creating-accessible-pdfs-from-microsoft-word.docx) **(Word 2.09MB)**

## Useful links

* [LibreOffice](https://www.libreoffice.org/download/download-libreoffice/) (external website)
* [PAC 2024](https://pac.pdf-accessibility.org/en) (external website)
* [TPGi’s Colour Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/) (external website)
* [Writing for GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) (external website)
* [Plain English Campaign](https://www.plainenglish.co.uk/) (external website)
* [Hemingway Editor](https://hemingwayapp.com/) (external website)
* [WebFX Readability Test](https://www.webfx.com/tools/read-able/) (external website)
* [Plain English – Advisory eLaHub](https://www.elahub.net/9-readability/) (external website)
* [WCAG 3.15 Reading Level (AAA)](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.1#reading-level) (external website)
* [Accessible Document Basics](https://www.makethingsaccessible.com/guides/accessible-document-basics/)
* [Creating meaningful alternative text](https://www.makethingsaccessible.com/guides/creating-meaningful-alternative-text/)
* [Alt Text in LibreOffice](https://help.libreoffice.org/24.2/en-GB/text/shared/01/05190100.html?System=WIN&DbPAR=WRITER&HID=cui/ui/objecttitledescdialog/dialog-action_area5#bm_id1826227) (external website)
* [Using Tables within LibreOffice Writer](https://books.libreoffice.org/en/WG73/WG7313-Tables.html) (external website)
* [Working with Tables in LibreOffice](https://wiki.documentfoundation.org/images/1/1d/WG4009-WorkingWithTables.odt) (external website)
* [How to handle blank data cells in accessible tables](https://www.accessibilityunraveled.com/pdf-remediation/how-to-handle-blank-data-cells-in-accessible-tables/) (external website)
* [Accessibility Check](https://help.libreoffice.org/latest/sq/text/swriter/01/accessibility_check.html) (external website)
* [Exporting to a PDF](https://help.libreoffice.org/latest/en-US/text/shared/01/ref_pdf_export.html) (external website)
* [Possibly inappropriate use of a "Figure" structure element when using PAC 2021](https://www.youtube.com/watch?v=11jqU2WbKno) (external website)
* [Accessibility Checker and Accessibility Check](https://www.makethingsaccessible.com/guides/accessibility-checker-and-accessibility-check/)
*
