---
title: WCAG Checklist - MVP Testing
summary: This guide walks you through Web Content Accessibility Guidelines
  (WCAG) testing to a minimum viable product (MVP standard for users that have
  not completed much testing before. It covers what we feel are some of the most
  impactful criteria to check under WCAG but is by no means an exhaustive audit
  and must be followed up with in depth WCAG checking.
author: mpateman
date: 2023-01-06
toc: false
isGuide: true
---
## Web Content Accessibility Guidelines (WCAG) MPBW MVP 

1. Identify a journey through representative sample of content e.g. Home page menus, sample page with form, sample page with video  
2. Go to the first page in your test 
3. Run the Microsoft Accessibility Insights tool 

   * This will check:

     * Language of page*
     * Presence of alt text
     * Colour contrast etc etc\
       Next to check would be the Language of the page the HTML is written for **(page Language)**, Check that all visual elements (e.g. pictures, charts and images etc) have meaningful text alternatives for non-visual users **(non-text content) \*\*\*\*** ou can do this by using the inbuilt accessibility Insights checker [Both Edge and Chrome extensions available). The checker will either explain how you can find the information or check for it within the extension for you. 
4. Record the results on the Accessibility Audit Template (link) which includes sample entries to show you what is required e.g. screenshot, WCAG number and how to fix. 

## Script for testing. 

Firstly, starting at the top of the page, looking at the title of the tab, does this makes sense and is it easy to distinguish from other open tabs? Is the page title in use the same as the page you are on and does it reflect the organisation responsible? **(Page titled).** Using just the tab key can you move through the page and interact with every element that you could click on with a mouse or pointer for example links, buttons and menus? **(Keyboard).** When tabbing through are there any options to skip to content so you do not have to tab lots of times to get to the page main section **(Bypass Blocks).** When using the tab button does it move down the page in a logical order - typically top to bottom and left to right or does the page move somewhere other than expected **(Meaningful Sequence, Focus Order).** Can you clearly see where you are tabbing (through a border around each selected element) **(Focus Visible)**? Does the page wrap when you have got to the bottom (automatically return to the first interactive element)? Did you get stuck anywhere e.g. embedded Twitter feeds **(No Keyboard Trap).** 

Next check how the page works when you zoom in, set the zoom to 400+% (COMMAND and + (Mac), and CTRL and + (Windows)) and make sure you can still tab around and use all the options as you would expect and that everything still fits on the screen without the need for left to right scrolling **(Reflow).**

As you are moving around the page, please make sure that you look at any buttons or links and that they are correctly described and have an appropriate role, so buttons are actually classed as buttons and links are classed as links **(Name, Role, Value)** and have appropriate descriptions (**Label in name)** - see image below of inspect element result for a button**.**To check this press (COMMAND and Option and C (Mac) and CTRL and SHIFT and C (Windows)**:**

![Inspect an Element ](src/guideImg/microsoftteams-image-2-.png)

Does the page have any input fields on it? Can you use these correctly and do they make sense when [using a screen reader](https://www.makethingsaccessible.com/guides/screen-reader-basic-website-testing/)? **(Labels or Instructions).** Check that all headings and labels, so all headings **(**e.g. H1, H2 and H3 etc.**)** and labels (e.g. input fields on any forms) clearly describe the purpose of the contents or groupings on the screen elements without any ambiguity in their understanding **(Heading and Labels).** When you move through these fields, enter some incorrect text to create an error, does your focus move to the error when using a screen reader and is this clearly displayed and described? **(Error Identification).** If entering the text to a query box, or dropdown combo box and it does not error, does the change of information load any new page or does the page allow that option to sit there so you can tab to the next field **(On Input).** When you are moving through these elements, or buttons do they have meaningful description information via a screen reader or other reader **(Label in Name).**

Next there are a few single options to check for.   

Firstly, look at the links on the page to make sure you understand what would happen if you clicked on the link (e.g. is the destination clear?). Does the link make sense on its own? The purpose of a link must be determined from the text of the link itself or the context surrounding this link **(Link Purpose).**

Lastly, if there is any media content on the page make sure there are captions **(Captions)** for any video and that any captioned text displays in time with the video. If audio only, then a transcript of that text is available to download **(Audio only and video only).** If there are parts of the video only visually convey meaning, then Audio description would need to be added for non-visual users along with any transcript download **(Audio Descriptions and media alternatives)**.  

Below are the minimum WCAG points that we believe should be checked on a first sweep by users that have not done much testing before:

### \*\*\*\*Add WCAG of the Day type descriptions to each of the below:

**Add 2.2 e.g. Contact info**

### Perceivable  

##### 1.1.1 Non text Content (A) - Accessibility Insights 

“Non-text content” means anything on the site that isn't text; generally images, videos, audio, charts, maps, and other content that requires interpretation but would not be read aloud by a screen reader looking for text.

##### 1.2.1 Audio-only and video-only (A) - Manual 

When video content, with no audio, is presented to someone who is blind, they cannot see it. Likewise, when audio-only content is presented to someone who is deaf or has a severe hearing impairment, they cannot hear it. These people are excluded from this type of content within the site or application.

##### 1.2.2 Captions (A) - Manual 

Captions are a text form of audio information in video and animations. This includes the words that are spoken, who is speaking when it is not evident, and important sounds like music, laughter, and noises. Captions must be synchronized with the visual content to contextualize them.

##### 1.2.3 Audio descriptions and media alternatives (A) - Manual 

1.3.1 Info and Relationships (A) - Accessibility Insights, Manual/Headings Map Chrome plugin, Manual (screen reader), Manual (screen reader) 

1.3.2 Meaningful Sequence (A) - Accessibility Insights (tab stops check) 

1.4.3 Contrast minimum (AA) - Accessibility Insights 

1.4.10 Reflow (AA) - Manual 

### Operable 

2.1.1 Keyboard (A) - Accessibility Insights (tab stops check) 

2.1.2 No Keyboard Trap (A) - Accessibility Insights (tab stops check) 

2.4.1 Bypass Blocks (A) - Manual 

2.4.2 Page Titled (A) - Manual  

2.4.3 Focus Order (A) - Accessibility Insights (tab stops check) 

2.4.4 Link Purpose (A) - Manual 

2.4.6 Headings and Labels (AA) - Manual/Headings Map Chrome plugin 

2.4.7 Focus Visible (AA) - Manual 

2.5.3 Label in Name (A) - Manual (screen reader) 

### Understandable 

3.1.1 Language of Page (A) - Accessibility Insights  

3.2.1 On Focus (A) - Manual (screen reader) 

3.2.2 On Input (A) - Manual (screen reader) 

3.3.1 Error Identification (A) - Manual (screen reader) 

3.3.2 Labels or Instructions (A) - Manual (screen reader) 

### Robust 

4.1.2 Name, Role, Value (A) - Accessibility Insights