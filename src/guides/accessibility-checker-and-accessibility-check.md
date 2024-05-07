---
title: Accessibility Checker and Accessibility Check
summary: Differences between Microsoft Word and PowerPoint Accessibility Checker
  and LibreOffice Writer Accessibility Check
author: swilkinson
date: 2024-05-07
toc: false
tags:
  - Microsoft
  - LibreOffice
  - Word
  - PowerPoint
  - Accessibility Checker
  - Accessibility Check
isGuide: true
---
<table>
  <caption>Differences between Accessibility Checker and Accessibility Check</caption>
  <thead>
    <tr>
      <th scope="col">What needs fixing</th>
      <th scope="col">Word Accessibility Checker</th>
      <th scope="col">PowerPoint Accessibility Checker</th>
      <th scope="col">Writer Accessibility Check</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Document title is set</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Document Language is set</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Missing alt-text on images, graphics, and OLE objects</th>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row"Low contrast colours between text and background</th>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Split cells, merged cells, nested tables (simple structure for tables)</th>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Blank table rows or columns</th>
      <td>Visually</td>
      <td>Visually</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Tables have column header information</th>
      <td>Yes</td>
      <td>Yes</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Fake or manual numbering</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">All sections have meaningful names</th>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
	</tr>
	<tr>
      <th scope="row">All slides have titles</th>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
	</tr>
	<tr>
      <th scope="row">Section names are unique</th>
     <td>No</td>
      <td>Yes</td>
      <td>No</td>
	</tr>
	<tr>
      <th scope="row">Slide titles are unique</th>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>      
	</tr>
	<tr>
      <th scope="row">Use of styles and built-in headings</th>
      <td>This is confusing because the “[Rules](https://support.microsoft.com/en-gb/office/rules-for-the-accessibility-checker-651e08f2-0fc3-4e10-aaca-74b4a67101c1#:~:text=The%20Accessibility%20Checker%20verifies%20your,error%2C%20warning%2C%20or%20tip.)” say that “Content is organized with headings and/or a Table of Contents (TOC)” and will display a Tip but the “[make your Word documents accessible](https://support.microsoft.com/en-gb/office/make-your-word-documents-accessible-to-people-with-disabilities-d9bf3683-87ac-47ea-b91a-78dcacb3c66d)” says this has to be done visually</td>
      <td>No</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Heading order incrementally increases with no skipping</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Meaningful hyperlink text</th>
      <td>Visually</td>
      <td>Visually</td>
      <td>Yes – when URLs are used rather than text</td>
	</tr>
	<tr>
      <th scope="row">Meaningful ScreenTips</th>
      <td>Visually</td>
      <td>Visually</td>
      <td>Writer does not do ScreenTips</td>
	</tr>
	<tr>
      <th scope="row">Does text Blink</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Text conveys additional meaning because of direct formatting</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Important information in Header or Footer</th>
      <td>Visually</td>
      <td>Visually</td>
      <td>Visually</td>
	</tr>
	<tr>
      <th scope="row">Footnotes and Endnotes</th>
      <td>No</td>
      <td>No</td>
      <td>Yes</td>
	</tr>
	<tr>
      <th scope="row">Image or object is inline with text</th>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>      
	</tr>
	<tr>
      <th scope="row">Document access is restricted</th>
      <td>Yes (could not replicate)</td>
      <td>Yes (could not replicate)</td>
      <td>No</td>
	</tr>
	<tr>
      <th scope="row">All content control fields have title</th>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>      
	</tr>
	<tr>
      <th scope="row">Layout tables are structured for easy navigation</th>
      <td>Yes (could not replicate)</td>
      <td>No</td>
      <td>No</td>
	</tr>
	<tr>
      <th scope="row">Closed captions are included for inserted audio and video</th>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
	</tr>
	<tr>
      <th scope="row">Reading order of the objects on a slide presentation is logical</th>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
	</tr>
	<tr>
      <th scope="row">Suggested alternative text</th>
      <td>Manually check – Intelligent Services</td>
      <td>Manually check – Intelligent Services</td>
      <td>Writer does not have “Intelligent Services”</td>
	</tr>
  </tbody>
</table>

## Useful links

* [Rules for the Accessibility Checker](https://support.microsoft.com/en-gb/office/rules-for-the-accessibility-checker-651e08f2-0fc3-4e10-aaca-74b4a67101c1#:~:text=The%20Accessibility%20Checker%20verifies%20your,error%2C%20warning%2C%20or%20tip.) (external website)
* [Make your Word documents accessible to people with disabilities](https://support.microsoft.com/en-gb/office/make-your-word-documents-accessible-to-people-with-disabilities-d9bf3683-87ac-47ea-b91a-78dcacb3c66d) (external website)
* [LibreOffice Accessibility Check](https://help.libreoffice.org/latest/sq/text/swriter/01/accessibility_check.html) (external website)
