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

