# Welcome to Make Things Accessible

In order to contribute to our site, you would need to receive an invite, so you can login to our Content Management System, if you haven't yet received one and are part of the UK education sector, please send an email to info@makethingsaccessible.com along with a few details:

- Your first and last name (required)
- Your job title (Optional but strongly recommended you do provide it)
- Your organisation (Optional but strongly recommended you do provide it)
- A short bio, just tell us a bit about your experience and help users get to know you a little
- A profile picture (optional and ideally this would be square 192 * 192px)
- Optional contact methods are:
  - Your Twitter handle
  - Your LinkedIn
  - Your email
  - Your website if you have one
  
Once you send us all of those, we can create you a user account, so the guides you create are attributed to you. Just a quick heads up, we are very fortunate to have our hosting provided to us for free, by the awesome folks at Netlify and a condition of our free Open Sorce account is that we provide information on a non-commercial basis, so please ensure:
  - You do not canvas for work
  - You do not promote goods or services as part of any paid promotions
  
  It's fine to discuss software, courses and assistive tech, but not for monetary or personal gain.
  
## How to create guides in the CMS

Upon logging in, you will be presented with the primary CMS screen which contains 2 important links in the header (top) area: Contents and Workflow.

The Contents link is where we create content for our website, within the Collections panel we would want to ensure that Guides is the active option and then we would be presented with a list of all guides in the CMS and also a New Guides button, clicking this button will take us to the CMS where we can create a guide.

![Screenshot of the primary screen, the Contents link is Active and arrows display the workflow to create a guide](https://user-images.githubusercontent.com/112703337/213128042-5d363040-2bb3-4b6c-821b-4fece83f24be.png)

There are several fields we must fill out before we get down to actually writing our content, we'll explain best practices for each, to help you quickly get to the content you want to write.

### Title

This is the title of your guide and also what will appear on search engine results, keep this to a reasonable length and ensure it's meaningful, this will help with discoverability for search engines, but primarily it will provide site visitors with a good indicator of the guide topic. Your Guide title will need to be unique, so please ensure you do not create a guide with a title that already exists in the system, as this won't post, as the URL for that page is derived from the Guide title

### Summary

This should ideally be 2 or 3 sentences, further explaining the topic of the Guide, this will be displayed on the card panel, along with the title and author, this is also displayed on a search engine result and ideally should be about 160 characters in length.

### Author

Prior to being sent a request, you will have been added to the author's list, this is a Select input, you simply select your name from the list of options within

### Table of Contents

This toggle switch is off by default, so no table of contents will be displayed, we should only add a table of contents where we have 4 or more Heading 2s in our Guide content, if you have 4 or more, then toggle this switch and a table of contents will automatically be generated for you

### Tags

A Guide must have at least 1 tag and it should not ever have more than 5. Tags help users find related content in the system or search by a particular topic. At present, there is a potential issue with tags, that you need to consider before adding them. If we create a tag that already exists in the system but does not exactly match the case (lowercase uppercase), this will cause a publishing error and your guide will not be published. This will be resolved at a later date, but in the interim, visit https://www.makethingsaccessible.com/guides/ and open the Filters accordion, all current tags are available there, if using a tag that already exists, ensure that it is typed exactly as displayed in the Filter by tag section. You can of course create a new tag, but please ensure that the spelling and case is correct when you do, as an example WCAG (All capitals), PHP (All capitals).

There is an Add Tags button, which when clicked will expand the panel and reveal an input, this is where you type your tag name. To add another, simply click tha Add Tags button and an additional input will be revealed.

![The create tag option, displaying the expanded input after clicking the Add tags button](https://user-images.githubusercontent.com/112703337/213134359-dd4a8119-5cc2-4b06-a8bc-c314e6f1beec.png)

### Include Files

Should you wish to include a document on your Guide, it is necessary to upload it using this option, so you would click Choose Files and then you would likely want to choose Upload, which would upload from your device. Please ensure your file has a unique name, as this will cause an issue if it's non-unique, fortunately, all the documents are saved in the same folder and they are presented to you in the dialog for files. Uploading a file does nothing more than store it in a folder, we need to add the file link to our content by adding pasting the following 1. `<a href="docs/[..THE FILENAME AND EXTENSION..]" download>` this could definitely be improved, but ensure the HTML string for the `<a>` tag is identical to the example provided, delete the square barckets with all of their contents and then add your filename between the forward slsh after "docs" and the next double quote and ensure your filename along with its extension are identical to the one in the system.

## Creating page content

Finally, we have our required fields set, so now we can look into the editor, this is going to be similar to what many of you have encountered before on other CMS sites, such as WordPress etc. It's not as fully featured as many common CMS editors, but we can extend it and we are trying to make it more user friendly in places, especially for the new options we have created.

### Using the editor

We use Netlify CMS, which serves our needs and Netlify have kindly sponsored us to have free hosting, what an awesome bunch, right? The editor is both Rich Text and Markdown, you can simply toggle the switch to change your preferred input, I persoanlly use a combination of the two, as there are sometimes some features not available in the Rich Text editor and the Markdown editor lets me write HTML too.

![Screenshot of the editor, with the Rich Text and Markdown toggle highlighted](https://user-images.githubusercontent.com/112703337/213145524-a394c497-0df1-4650-8d05-c0e15d80f6d1.png)

So, first things first there are 9 buttons in the toolbar of the editor, which should be familiar to many of you, but I'll list them here:
- Bold, for bold text
- Itallic, for itallic text
- Code, this is for inline code, a small piece of code that does not appear in a standalone block like so `<h1>`
- Link, for creating a hyperlink
- Headings, for section, subsection etc, headings
- Blockquote, when we quote something somebody else said, we use a blockquote
- Unordered list, a standard bullet list, we can further indent by using the Tab key
- Ordered list, again we can further indent with the tab key
- Add Component, this is where additional blocks reside, I'll explain these in detail, shortly, as there are 1 or 2 caveats

When creating a guide, please don't use a Heading 1, your post title is marked up as the Heading 1, the title of the page, so you just need to use Heading 2s for sections, Heading 3s for subsections and so forth

#### Using the editor block components

Clicking the Add Component button will display a list of additional tools, we careted a few and Image and Code Block were already present, out of the box. We'll discuss thos first:

##### Image
We may want to add images, we select Image and a Block appears in the editor, we then select Choose an Image and either select an existing image or upload from our device. Once the image is uploaded, ensure it is the selected option, when you upload the image, it's the automatically selected one. 

Sadly the ability to upload an image doesn't appear keyboard accessible. This is the core Netlify CMS, so I'm not totally sure how to fix that, but rest assured, we'll definitely look into it and ask about.

Quick tip: If you're using a Mac, please rename your file before uploading, especially if it's a screenshot, as Netlify doesn't like the default filenames for Mac screenshots. We really should be giving every image a unique name, as we don't have any backend logic to handle clashes.

![Screenshot of the upload an image workflow, which is decribed in the next list items](https://user-images.githubusercontent.com/112703337/213448878-e84b49b7-1300-4ecd-8d53-adcf8d662156.png)

So, just to recap:

- In the Add Component button's expandable options, select Image
- Click the Upload button 
- Upload your image
- Click the Choose Selected button
- Your image will now appear in the editor, where you can add your alt text, ignore the title attribute though

##### Code Block

A code block is for giving more detailed code examples, as opposed to a small inline piece of code, these are standalone blocks, that appear in what looks like a code editor, you can either type your code directly into the block or paste it in. Just one thing we need to do first, to ensure the correct formatting takes place, is we need to click the cog icon (sadly this doesn't have an accessible name, meh! but I will look into that, but it's core Netlify stuff, so may be quite difficult for me to fix).

![Screenshot of the settings cog button, which appears in a Code Block](https://user-images.githubusercontent.com/112703337/213451601-bb729f02-a2b3-4bc2-bbfb-c851c48ffe94.png)

Upon clicking this unnamed button, we have access to some options, the only one we need to change is the first Select input, which is the Mode options. We simply need to select the language of our code, we're only typically going to be using HTML, CSS and JavaScript, so select the option which is most appropriate from those. If you have just one file, with HTML and any of the other options, the file should always be HTML and appropriate `<script>` and/or `<style>` tags should wrap the JS or CSS, respectively.

![Screenshot of the Mode selection for a Code Block, HTML has been selected as current mode](https://user-images.githubusercontent.com/112703337/213453572-66e9ba71-e1dd-4f24-ac52-663ce3c38baf.png)


##### Callouts

There are 3 types of callouts, one for a tip, one for info and warn for a warning:

- A tip callout should be used when you wish to provide a tip that relates to the current topic, as an example of when to use a Tip, assume we are writing about testing with the Axe browser extension, we may want to add a tip that says "Test the page with Axe and check the results, now open the modal and run Axe again, as it will not be able to identify issues that were previously hidden". You can of course use the Tip Callout for anything that makes sense, keyboard shortcuts, best practices, techniques, quirks or whatever else would be considered a helpful tip.
- An Info callout should be used to provide some additional info, that you would like to make users aware of, for example, if we were writing aboit using a screen reader and we were aware of a bug with a specific screen reader and browser pairing, you may wish to use the Info callout for that information, there are multiple scenarios for Info Callouts, mentioning a regulation, a software or hardware limitation, bugs, shortcuts or alternative techniques etc.
- A Warning callout is for something that could potentially be a bad practice and harm a user, prevent them from completing their task, make something difficult for them and even things that could affect your employer, such as failing to make things accessible could get you in a lot of troble and cause reputational harm

![Screensot of the Add Component button expanded, emphasis is added to the three callout types, Tip, Info and Warning](https://user-images.githubusercontent.com/112703337/215114236-7a698028-e648-486b-8ed6-83222c1418eb.png)

##### Accordion

We all know what an accordion is, right? For those that aren't familiar with the term, it's essentially a way of hiding some content until a user interacts with it. There are valid reasons we may want to use an accordion, we use them in the FAQs page, to help users find what they're looking for easily, we also use them in guides, from time to time, if we want to digress a little from the main topic, if we wanted to reveal answers to questions or we may be inclined to add some technical information in one of those, that wouldn't necessarily be relaevant for everybody that is reading that particular guide.

There are some things to be aware of when using an accordion, which I'll explain below:

The accordion block takes 3 inputs:

- A Heading level, it has a sensible default of 3, but it could be 2, 3, 4, 5 or 6, depending on where you use it and your page hierarchy, please do ensure it has the correct level, as we know all too well our users appreciate a heading hierarchy
- Title, this is the heading text, you selected the level with the previous step, now you simply add the text. try to keep it short and to the point
- Content, the content can be anything really, but please don't nest accordions, as 1 level of hiding stuff is quite enough. You can use the Rich Text editor in here, so you can add text, links, images and whatever else you need to hide from initial view.

Our accordions are progressively enhanced, that means that as an author, all you are creating is a heading and a container to hold your content in, if a user does access your content without JavaScript enabled, they will get the Minimum Viable Content, the heading and some associated content. There's a bit of magic that goes on behind the scenes, which enhances that heading and content to be an accessible accordion, you don't need to worry about that though, as this happens automagically.

Quick side note. When you initially create an accordion, it will be the blocks, if you save your page and come back later, you will see raw HTML in the rich text editor, this doesn't mean your accordion is broken and won't display correctly, it just means I have to figure some stuff out to keep it looking nice for us authors. If you do need to change anything, you would change the Title only between the `<h#>` [Your title] `</h#>` where the # represents the heading level 2 - 6, depending on your usage and the actual content would be between `<div class="accordion-panel">` [Your content]`</div>`. This is something to be aware of, I'll get it fixed as soon as I can figure it out and I get the time.

![Screenshot of the Add Component button in its expanded state, The Accordion option is highlighted and I have added arrows pointing to the Heading level, Title and Content blocks for the accordion](https://user-images.githubusercontent.com/112703337/215119423-11978bd4-039f-47ba-91f2-64c3c972b6c5.png)

##### Transcript Container

This should only be used directly after we embed a YouTube video and it should contain the transcript to the video. Much like the accordion, it's an expando widget, but this one uses the native HTML Details element, it must come directly after the video, so our users that need it can find it with ease and our users that need it don't have to scroll through a million lines of george talking about accessibility statements (Sorry, George :) )

How do I add a video, you may ask? Well, currently we need to go to YouTube and get the video we wish to embed and:

- Select the Share option
- Select the Embed option
- Check the "Enable privacy-enhanced mode" checbox (block those pesky cookies)
- Click the Copy button
- Return to Your Guide you are creating and toggle the switch to Markdown
- Paste from your clipboard the iFrame from YouTube in a suitable location
- Switch the toggle back to Rich Text
- Now Select the Transcript option from the Add Component button
- Copy your Transcript from wherever you have it and paste it in to the Details Editor
- If you only have one video on the page, there is no need to change the text in the Summary input, if you have more than one, just make sure each are specific


Much like the Accordion, this will display a block, but if you save and revisit, you will see raw HTML, I know, you're wondering if I even know what I'm doing, right? Don't worry, I'll get these fixed as soon as time permits, but at least we have those options right, even if they have little bits of snagging that need attention.

![Screenshot of the Add Component button expanded, the Transcript Container is highlighted and I have added arrows pointing to the Summary and Details inputs, the Summary input has a big red question mark added, as a rubbish attempt to say, we don't need to change this at all](https://user-images.githubusercontent.com/112703337/215125928-d14fbba8-5034-4847-93eb-3775b8620473.png)

### The Editor and Preview panes

All along we have been explaining how to create content in the Editor pane, you may have noticed there is another pane, too? This is the Preview pane and it gives a rough idea of what your content will look like, it's not styled exactly the same as our website, this is something we will add in later, but it's not as important as some other aspects. Rest assured, your content will look nicer in the live or preview views.

### Saving and Publishing

So, you have written your content and you want to publish it or get somebody to review it. At the top of the interface, there is a Save button, which as you may have already guessed, saves your content, first we need to hit that button, so we can progress.

![Screenshot of the Save button, in the Header area](https://user-images.githubusercontent.com/112703337/215128131-dbfba68e-f388-49d7-88fc-4834029cb529.png)

Now once that has saved, which takes a few seconds, 4 new buttons appear:

- The first is the Status and is a expando button, clicking it presents us with further options to change the Status of the Guide
  - Draft (default): It's just saved to our GitHub
  - In review: You want somebody to check it before publishing
  - Ready: You want to get it out there
- Publish, which is also an expando button, but Publish Now is the only option that matters here
- Delete Unpublished Entry, which will obviously delete you guide
- Check for preview, this is where you can see a live preview of your page, on the Make Things Accessible site, it's not actually on the site, but a clone has been created to preview your guide, you can of course share that link if you want somebody to check it over

If you want to publish, after saving you should change the Status to Ready and once that action is complete, then expand the Publish button and select Publish Now, it takes about 20 seconds for your guide to be live, as there is some wizardry happening in the background, most of which is related to the tools we use doing the heavy lifting for us

![Screenshot of the header area, illustrating that selecting save, will display new buttons, expanding the Status button will allow a user to select ready and then expanding the Publish button will allow them to select Publish Now, arrows have been used to show this workflow](https://user-images.githubusercontent.com/112703337/215136000-c34103ac-d31d-4534-901a-5a80724e2c18.png)

#### Editorial Workflow

If you just Publish your guide, this isn't really relevant, as your guide won't appear here. If you just save it, it will be assigned an Editorial status, the default being Draft, which you can change to either In Review or Ready. I guess the concept is, you change to In review, let your chosen reviewer know it's ready to be reviewed and once it is, they would then change the status to Ready, so you could publish it.

We're not enforcing any kind of workflow here, if your guide is accurate and ready to go, publish it, if you want someone to review, you can send them the link from the Check for Preview page or just get them to locate it in the Workflow page, your choice.

The Workflow page is accessed from the Home page, to get back to the Home page, after your content is saved, the link in the Header should say "Writing in Guides Collection, Changes Saved", clicking this will take you back to the Home page.

We previously discussed the Contents tab, within the Header, now we will touch upon the Workflow tab. If you save your guide and do not publish it, this is where you will find your guide and all others that other folks may be working on. There are 3 columns for the status and the status can be changed by clicking the Entry and using the Status and Publish options that were previously explained.

So if you have agreed to review an unpublished guide or you want to hold off on publishing yours, this is where you will find them.

![Screenshot of the Workflow page, with the three Guide status columns](https://user-images.githubusercontent.com/112703337/215140822-d69168f1-f1a5-40ec-9368-b44c4b11ce63.png)

## Editing your Information

You may want to edit your information, from time to time, new job, new skill edit, add or remove socials, well you can do all of that from the Authors page.
