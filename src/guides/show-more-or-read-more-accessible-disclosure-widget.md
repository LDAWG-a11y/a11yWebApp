---
title: Build a Show More accessible disclosure widget
summary: Show, Reveal or Read More widgets typically reveal a small teaser and a
  button, they disclose additional content, should that button be clicked. Let's
  build one, accessibly
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

Much like their cousins the accordions a Show More widget is just a disclosure widget under the hood. It's a relatively simple construct, in that it is comprised of a button which will toggle the visibility of some previously hidden content. Often these widgets have a button that has visible text such as "Reveal More", "Show More", "Continue Reading" or "Read More", I'm sure there are other naming conventions I am missing, too. Just because I want to refer to this widget with one name, throughout this article, I'm going to call it a "Show More" widget, i actually gave this way more consideration than you may expect, too.

There are of course some significant differences, which mean we have some additional considerations, let us just list a few, before we proceed:

* The teaser part of the widget wouldn't be interactive like it is with an accordion, it would typically be static content, usually this would be text, enough of a snippet to perhaps entice a user into reading or consuming the hidden content
* There would then be an isolated button, which toggles the visibility of the remainder of the content, this would typically come after the teaser text, in our example, this button will be called "Show More", but there are of course many other alternatives and I have to admit, I can't find any supporting evidence to say which is the best naming convention
* Focus management requires a little bit of extra consideration, as we need to manage that logically. With an accordion, we'd typically leave focus in situ, on the button element, but with a Show More that may not be very helpful, depending on the button's position after we disclose that new content
* Do we offer users the ability to "Show Less"? I think that makes perfect sense, if it can be expanded, then to me it should also be collapsible. Every time I have ever built a disclosure widget, I have always offered a way to hide that newly disclosed content again, because if it benefitted users in some way by being initially collapsed, then once it is expanded that same benefit should be afforded to our users to collapse it again. Fatigue is a thing, having to scroll through tonnes of content could be tiring or uncomfortable for some users, it could also increase cognitive load for some, too. I'm sure if we drilled down deeply, we'd find many more negative affects
* As we are going to offer a way to collapse it again, we do need to consider the button's visible label (AccName), as "Show More" will stop making sense, once more stuff is actually shown. We could of course use `aria-pressed`, but as we will be using aria-expanded this could perhaps be a bit verbose. How many states do we need on a single button, what value is to be had from telling our users the button is both pressed and expanded or not pressed and collapsed? [Obviously, both elements are supported on the button element in the ARIA 1.2 spec](https://www.w3.org/TR/wai-aria-1.2/#button), but it doesn't appear to obviously state that more than one state is encouraged. there can also be an issue with changing the AccName of a button, in that in some instances that change of AccName isn't passed to the Accessibility Tree, or the AT being used. So, given that we would not ordinarily use `aria-pressed` on a disclosure and we still need the widget's controls to make sense, we're just going to use two buttons, obviously only one will ever be present at any given time, as always, I'm open to suggestions and critique, so feel free to get in touch if I'm wrong

I'm quite satisfied those are the main differences, sure we'll likely encounter some nuance, along the way, but as long as we understand basic disclosure widgets and are aware of these extra considerations, we'll figure any unforeseen stuff out, along the way. I'm just gonna throw it out there that I have never actually built one of these before, I've tested them and yup, they were 'Meh' and I've told folks how to fix them, but I didn't actually build one. Not to worry though, I understand the concept and I know enough to be able to consider all users in my approach, so we'll be golden.

## Are they actually useful?

Well, they're quite common, they're typically found on blog or news sites, so no matter what our opinion is, it won't make them go away, if we say there are better alternatives. Maybe for a blog or news site, there are better alternatives, as the article could be on its own page, like this one, but perhaps there are situations where it does make sense, if the articles are quite small, maybe? I've also seen them on eCommerce sites, where the product description may use this pattern. A brief teaser or snippet of text, that front loads the most important part of the product description and then should a user want to learn more, they would click the expando button.

There is an argument that they can neatly tuck stuff away on a content-heavy page, to make scrolling or otherwise exploring the content a bit more efficient and they likely serve this purpose quite well. i'm actually kinda on the fence, they're a part of the web and it's obviously our duty to make all parts of websites we have some input on accessible.

## Let's get stuck in

So, let's go with our minimal viable experience and as always, I'll progressively enhance this. I'm going to just use text and if the user or user agent has JS disabled, they will just get the text, no fancy interaction, just the text.

I'm just going to play it safe and use Lorem Ipsum, which isn't engaging, by design, but I don't know what else to use. Just as a sort of funny aside, I was building a component on a previous job before and as I am easily entertained, I sometimes write unconventional things in my `console.log`s and also use stuff other than Lorem Ipsum. One time, I found a Samuel L. Jackson Ipsum generator, which, you guessed it, generated many words that Sam the Man says in his many films. This was a little entertaining to me, whilst I was working locally, but I almost submitted it in a pull request, because I forgot. Fortunately, by some miracle of the universe, I realised just as I was about to do a push, I got a glimpse of an F-bomb on my feature and managed to remove all trace of that, before I actually sent my code to GitHub, phew. So, the moral of that pointless story is: don't be a Darren, just play it safe with good old Lorem Ipsum. I definitely don't do this any more, so we won't be seeing any of those shenanigans in my content or code.

```html
<h1>All the articles on the same page</h1>

<article class="article">
  <h2 class="article__title">My first article</h2>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quos voluptates ratione culpa nemo numquam nobis dignissimos eius eaque non similique, asperiores doloribus, ab quod fuga, corporis molestiae ea autem harum iste suscipit commodi! Corporis odio eligendi in mollitia ipsum aperiam atque, dolorum, cumque dignissimos deserunt, modi libero impedit dicta!</p>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus magni blanditiis assumenda, eos labore vel atque sit officiis eum voluptatum! In nisi ut earum rerum pariatur vero fuga nihil commodi? Neque, fugit. Magni sint dignissimos nisi dolorem delectus cumque quia mollitia laudantium culpa? Delectus quam id placeat iste ipsa porro?</p>
</article>

<article class="article">
  <h2 class="article__title">My second article</h2>
  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores cumque doloribus exercitationem nulla omnis obcaecati, quam ducimus repellendus voluptatum mollitia nemo pariatur eaque illum, dignissimos debitis! Repellat fuga obcaecati, quae et saepe odio sequi repellendus itaque exercitationem quaerat odit culpa suscipit ea praesentium at cupiditate sed quibusdam beatae repudiandae voluptates.</p>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam saepe reiciendis eius, accusantium quia aliquid maxime deleniti enim consectetur esse id, ipsa praesentium dolor doloremque rerum quidem ut iusto a distinctio quasi vitae quam facilis. In voluptates fugiat enim culpa aliquid nemo nisi modi ipsum, corporis saepe. Accusamus, nemo tempora.</p>
</article>

<article class="article">
  <h2 class="article__title">My third article</h2>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, magni. Dicta ipsa, dolorum minus id cum quibusdam placeat accusamus labore tenetur sed ipsum assumenda veritatis, quo ad expedita neque explicabo excepturi commodi deleniti? Doloribus consequatur voluptate sed quos exercitationem fuga id eaque perspiciatis voluptas voluptatum, asperiores vitae porro saepe repellendus!</p>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nobis consequatur cumque, mollitia aperiam aliquid inventore. Sequi ipsam cum harum maxime perspiciatis facilis dignissimos repudiandae quasi! Accusantium quod id doloremque aspernatur harum ipsam, repellat dolorum magnam consequatur fugiat sed sequi fugit eligendi molestias voluptatem quaerat recusandae debitis temporibus assumenda expedita?</p>
</article>
```

There we go, pretty straightforward stuff, for now. 

* So, we have a `<h1>`, which just provides a page title
* We have three articles which we will soon manipulate with JS

  * Each article has a distinct heading
  * Each article has two paragraphs of text and each of those paragraphs contain exactly 50 words of good old Lorem Ipsum

I've just gone for three articles as one seemed quite lazy on my behalf, two probably seemed enough, but as I was uncertain, I went for three, for good measure. I also added two paragraphs to each, as we will be manipulating a potion of the first one and having two paragraphs helps me to build something that won't break in a slightly different use case.

We're going to tackle the JS next and we'll add the pretty styles at the end. Remember I said i have never actually built one of these before? Just because I'm a bit stubborn, I'm not even going to look at anybody else's efforts, no research, no looking at anybody else's code, I'm just going to have a stab at it, for fun.

This is going to be by no means bulletproof, it will be accessible, but it won't be ready to plonk in a content management system (CMS) as we'd need to consider a bit more, such as the author being able to make a selection, to set their own "teaser", etc. That would actually be quite cool to take a stab at, but I feel I may be over-complicating things a bit (not that i ever do that, honest), so what I will do, is simply extract the first 30 words from the paragraph, for no other reason than 30 seems like a fun number to use here. In production on a CMS, this hard-coded value would be brittle, as those first 30 words may come from more than one paragraph or other element. So, I do know all of this, but I feel like a basic implementation is for the best in this guide. We're essentially only concerned in the mechanics and accessibility, so it should go without saying, don't just go plonking this in a CMS, as it'll end up breaking.

So, without further ado, here's the JS:
