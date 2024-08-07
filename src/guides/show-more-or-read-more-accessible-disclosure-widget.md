---
title: Show More or Read More accessible disclosure widget
summary: Show or read More widgets typically reveal a small teaser and a button,
  they disclose additional content, should that button be clicked. Let's build
  one, accessibly
author: dlee
date: 2024-08-07
toc: false
tags:
  - HTML
  - CSS
  - JavaScript
isGuide: true
---
## Intro

Much like their cousins the accordions a Show/Read More widget is just a disclosure widget under the hood. It's a relatively simple construct, in that it is comprised of a button which will toggle the visibility of some previously hidden content.

There are of course some significant differences, which mean we have additional considerations, let us just list a few, before we proceed:

* The teaser part of the widget wouldn't be interactive, like an accordion, it would typically be static content, usually this would text, enough to perhaps entice a user into reading or consuming the hidden content
* The button would either say Show More or Read More and follow the teaser text, there could of course be multiple of these widgets on a page and unlike accordions, their buttons would all have the same accessible name
* Focus management requires a little bit of extra consideration, as we need to manage that logically. With an accordion, we'd typically leave it in situ, on the button element, but with a Read/Show more that may not be very helpful, depending on the button's position after we disclose that new content

I'm quite satisfied those are the main differences, sure we'll likely encounter some nuance, along the way, but as long as we understand basic disclosure widgets and are aware of these extra considerations, we'll figure any unforeseen stuff out, along the way. I'm just gonna throw it out there that I have never actually built one of these before, I've tested them and yup, they were 'Meh' and I've told folks how to fix them, but I didn't actually build one. Not to worry though, I understand the concept and I know enough to be able to consider all users inn my approach, so we'll be golden.

## Does the button's accessible name matter?

Well, words usually tend to matter a lot, more so when we are making interfaces understandable and operable for the whole range of users and the individual differences they have. So, that begs the question, shall we call it Read More or Show More? I guess it depends and I'm going to make a few of assumptions here as my Google-fu hasn't yielded anything I can link to, to back up my assumptions. 

* Consistency is key, whatever we go with, let's try to stick to the same naming conventions for like-for-like elements across the site. This of course satisfies user expectation, in that they will encounter the first instance of the usage and learn what to expect from that, going forward
* Would Read More be more fitting if what we disclosed was primarily text? To me that makes sense, if it were a blog or news site and the teaser text was visible and expanding the content revealed something that was primarily text, in my mind, that makes perfect sense, as the user will mostly be "reading" or having that text read out to them, in which case, it's still reading. there could of course, be supporting images, I'm not saying that if there are images in there, we shouldn't use Read More, just if the disclosed content could typically be understood by reading, then Read More seems like a good fit
* Would Show More be better suited to something that was primarily visual? Perhaps a series of images or charts and not very text heavy. This kind of makes sense to me, but you can of course "show" words, too, so I guess this is where it gets a little woolly, so to speak
* What about "Reveal", that fits pretty well, too, it doesn't imply what is to come, so seems a decent 'on the fence' label, as we will ultimately be revealing something. I found this just a few moments ago, when I was trying to find any useful discussion on the naming, [it's a Jeremy Keith article, you may know him as Adactio](https://adactio.com/journal/10365). The article is about 8 years old now, but we're not going to be copying Jeremy's code, as I want to write my own

I've managed to waffle through four bullet points, without actually giving anybody a definitive answer, and that is simply because I don't actually know. The above are considerations and as words usually matter, perhaps you could ask a content designer on your team for something more definitive. So, I hear you ask, what are we going to go for? Well, my virtual friends, none of the above, we're going to combine the best bits and roll with that, as I'm winging it a bit here. I'm just going with "Reveal more", because that sounds clear enough for all use cases and I don't know if the Read/Show thing is actually an issue, or I've just made a pointless point about something that doesn't actually matter, probably the latter, sorry, my bad.

## Let's get stuck in

So, let's go with our minimal viable experience and as always, I'll progressively enhance this. I'm going to just use text and if the user or user agent has JS disabled, they will just get the text, no fancy interaction, just the text.

I'm just going to play it safe and use Lorem Ipsum, which isn't engaging, by design, but I don't know what else to use. Just as a sort of funny aside, I was building a component on a previous job before and as I am easily entertained, I sometimes write unconventional things in my `console.log`s and also use stuff other than Lorem Ipsum. One time, I found a Samuel L. Jackson Ipsum generator, which, you guessed it, generated many words that Sam the Man says in his many films. This was a little entertaining to me, whilst I was working locally, but I almost submitted it in a pull request, because I forgot. Fortunately, by some miracle of the universe, I realised just as I was about to do a push, I got a glimpse of an F-bomb on my feature and managed to remove all trace of that, before I actually sent my code to GitHub, phew. So, the moral of that pointless story is: don't be a Darren, just play it safe with good old Lorem Ipsum. I definitely don't do this any more, so we won't be seeing any of those shenanigans in my content or code.
