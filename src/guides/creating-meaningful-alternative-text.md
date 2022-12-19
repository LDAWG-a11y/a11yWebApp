---
title: Creating meaningful alternative text
summary: Properly explaining images and other graphics in text provides users of
  assistive technologies with the best chance of understanding the purpose of
  the image and/or the information it conveys. There are several ways of writing
  alternative text or alt text and also many considerations
author: dlee
date: 2022-12-19
toc: false
tags:
  - Images
  - Alt Text
  - Best Practice
isGuide: true
---
## Introduction to Alternative Text

Alternative Text is simply providing an image with a text alternative so that the information the image conveys can be consumed by a wider range of people, this is especially important for blind and some low-vision users, who rely on alternative text to be read out by their screen reader and/or refreshable Braille display, to understand images and their purpose.

There are several ways of writing alternative text and sometimes the methods for adding alternative text will differ greatly from websites, to documents, to social media. We're not going to focus on the How to add alt text to \[Specific application or website] here, that will be addressed in guides for each of those particular platforms. We're primarily focusing on how to write good alternative text, and considering some best practices along the way.

Typically, across the web and in office applications, we have a nifty way to add alternative text, called Alt Text. In HTML (the code for creating website structure), we'd add this as an attribute, like so `<img src="path.jpg" alt="Some useful text description of our image">`, in office type applications, we'd add this information with an option, but the principle is fundamentally the same. 

When a screen reader encounters an image which has Alt Text it will either say "Image" or "Graphic" (depending on which screen reader it is) and then proceed to read out the text in the Alt Text attribute, so as authors we have a duty to make that Alt Text meaningful.

## Types of images

We will use the term image to refer to pictures, icons, screenshots and complex images of any type. We can categorise images, for the purpose of adding Alt Text into 5 distinct types.

### Decorative images

A decorative image is typically an image that serves absolutely no purpose other than to make a page or document look pretty, fill some space, break up large chunk of text or any other reason where it adds no information to the page content and is not related to it in any way. Some marketing images fall into this category, we may encounter images such as "woman on a phone", "man with a tablet", "woman showing group of employees some graphs on a laptop". If these images are stock type images, you got them from some online source, then in most instances, these should be decorative.

In HTML we would provide that image with a so-called null alt attribute, this means the alt attribute is present (it must be present) but its value is an empty string, like so `<img src="path.jpg" alt="">` this means that a screen reader user cannot access this image, it's as if it isn't there at all (That's OK, if it is truly decorative).

### Functional images

A functional image is a graphic that can be clicked and it either does something or goes somewhere. Examples of that being, a bin icon in your email, which moves an email o emails to the trash bin, an app icon on your phone, for settings, social media or pretty much everything else or a logo on a website that when clicked usually takes a user to the homepage.

The test for this is if I can interact with it in some way and it does something in after I do, then it's interactive and therefore functional.

For functional images we typically want to write the purpose of the interaction as opposed to describing the actual image, as an example "A sharp looking pencil, at a 45 degrees angle, seemingly writing on paper" Isn't all that helpful, when the purpose of the button is simply to edit something, so we would provide alternative text of "Edit", as that adequately describes the purpose of the control.

### Informative images

An informative image is any image that either adds information to or supports the information on a page, typically we would describe these images succinctly and more importantly, we would consider their purpose before writing the description. 

Examples of informative images could be:

* A page of the board members, each contains a profile photo, each image is informative
* An image of some students, receiving an award, it supports or validates the surrounding text
* An icon that serves as a visual label, but is not itself functional, such as a telephone icon, next to an input
* An image that you refer to anywhere on the page, if we're saying "as can be seen in the image below, then we don't really want to be hiding that image from people, as they may want to download it, but if it's hidden or marked as decorative, they won't be able to find it
* An image that if removed, removes some of the meaning of that page
* An image that validates the content of that page in some way

Typically we'd want to describe the intent of the image, as opposed to explaining insignificant details, as an example "Nadia receiving her award for Engineering Excellence, presented by the Vice Chancellor and Head of the school of Engineering", is much better than "Nadia, who is wearing black shiny shoes, with silver decorative features and no laces, blue ankle length trousers and a white blouse, is receiving her award from Dr Smith, who is wearing..." you get the idea, those elements of the image are inconsequential, the important information is Nadia is receiving her award and the people that presented that award are. The subject of the page would likely be Nadia's achievements, the image just validates that content.

### Complex images

There are times where images may be extremely complex, they could be data visualisations, blueprints, diagrams, artists impressions, architectural drawings many other images. If we had a page about the Mona Lisa, on a school of art page, we'd want to describe the finer details of that image in text, just like we would for all the aforementioned images, but in this instance, we wouldn't really want to do it in Alt Text, we'd ideally be describing the image in visible text, that everybody can access.

Some complex images can immediately be understood by people who can see it, but are also in the know, it's a subject familiar to them. Let's imagine we have hired an architect to redesign the main foyer of a campus, another architect could look at those detailed drawings and make some noises of approval, such as "hmmm", or "ahhhh" and fully understand the detailed aspects of what is proposed, but, if like me, you can appreciate a good artist's impression, but have absolutely no idea of how to interpret the finer details or technical considerations, we'd all benefit from this being explained in the surrounding text. Whilst Alt Text used to have limits, it doesn't appear to anymore, but that doesn't mean we should stuff it with 20,000 words, as that experience isn't the best for screen reader users, but if we adequately describe that image on the page and then provide the image with a nice succinct Alt Text, such as "Architect's proposal for the main foyer, image taken from the current front door", should a user wish to download that image, perhaps to send to a friend or colleague, they can do so and it has a nice and short description and the more detailed description is available for everybody.

This kind of logic also applies to charts and such, if we have no choice but to put images of charts on a page, those charts would need to be described accurately on the page itself, adding a complex chart with no supporting text would pretty much confuse all of us.

### Emotion-rich images

This is perhaps where we can get into a little nuance, around images, as not every screen reader user may want to listen to these, but some will, everybody is different.

An emotion-rich image is typically something that is placed on a page to illicit a positive or negative emotional response within users that encounter it. Some examples could be:

* A group of students huddled around a PC, one of them is showing the others some information he has just found, they all look engaged and it's clear to see that they are enjoying their academic experience and perhaps forging lifelong relationships. If the purpose of the page is for visitors to enrol and this image evokes a sense of happiness, because you interpret that image to convey there is much more to university than learning, then this could perhaps be an emotion-rich image
* A page on childcare for students that are parents, one of the images is funny, because a small child got a little carried away with the green paint and painted themselves, you may have selected that image to make people laugh, this could be an example of an emotion-rich image

Later we'll link to the Alt Decision Tree, but Emotion-rich images don't feature in that, this is something I stumbled across reading a blog of somebody in the Accessibility industry who is hugely respected. Léonie is a screen reader user and also amongst many other notable things sits on the one of the W3C's working groups. [I refer and link to this article often, as it helps us understand the perspective of a screen reader user](https://tink.uk/text-descriptions-emotion-rich-images/), from somebody who relies on a screen reader, but is also involved in creating the standards for accessible websites and content.

Imagine we had 50 screen reader users and we asked them if they would like these images, that would otherwise be marked as decorative to be considered emotion-rich and supplied with Alt Text. It's not going to be a case of all 50 people said the same thing, everybody is unique and everybody has their own preferences. Now, if we marked these funny, heartwarming, smile-inducing or heart string pulling images as decorative, what we are doing is making a decision, that decision is No screen reader user can access this image, ever. I'm not a screen reader user, but I do believe the core principles of accessibility include both choice and alternatives. If we describe an image placed on a page to evoke some emotional response, if a user encounters it and thinks "Not interesting", they can simply move away and listen to other parts of the content they are interested in, but if we mark it as decorative, then those that would have wanted to hear about it, simply cannot, as it doesn't exist to them.

Definitely don't abuse this and explain those marketing images that are "Main in a suit, shaking the hand of a lady in a suit" because, in that instance, it's likely nobody cares whether they are there or not, other than the team who decided to put them there.

### It's a judgement call

There is no exact science about alternative text, a lot of it comes down to making a judgement call, but by learning about others' lived experiences and considering how are choices can impact users, we can at least make informed judgements and hopefully we will get it right at least most of the time.