---
title: Build a Show More accessible disclosure widget
summary: Show, Reveal or Read More widgets typically reveal a small teaser and a
  button, they disclose additional content, should that button be clicked. Let's
  build one, accessibly
author: dlee
date: 2024-08-09
toc: false
tags:
  - HTML
  - CSS
  - JavaScript
isGuide: true
---
## Intro

Much like their cousins the accordions a Show More widget is just a disclosure widget under the hood. It's a relatively simple construct, in that it is comprised of a button which will toggle the visibility of some previously hidden content. Often these widgets have a button that has visible text such as "Reveal More", "Show More", "Continue Reading" or "Read More", I'm sure there are other naming conventions I am missing, too. Just because I want to refer to this widget with one name, throughout this article, I'm going to call it a "Show More" widget, I actually gave this way more consideration than you may expect, too.

There are of course some significant differences, which mean we have some additional considerations, let us just list a few, before we proceed:

* The teaser part of the widget wouldn't be interactive like it is with an accordion, it would typically be static content, usually this would be text, enough of a snippet to perhaps entice a user into reading or consuming the hidden content
* There would then be an isolated button, which toggles the visibility of the remainder of the content, this would typically come after the teaser text, in our example, this button will be called "Show More", but there are of course many other alternatives and I have to admit, I can't find any supporting evidence to say which is the better naming convention
* Focus management requires a little bit of extra consideration, as we need to manage that logically. With an accordion, we'd typically leave focus in situ, on the button element, but with a Show More that may not be very helpful, depending on the button's position after we disclose that new content
* Do we offer users the ability to "Show Less"? I think that makes perfect sense, if it can be expanded, then to me it should also be collapsible. Every time I have ever built a disclosure widget, I have always offered a way to hide that newly disclosed content again, as if it benefitted users in some way by being initially collapsed, then once it is expanded that same benefit should be afforded to our users to collapse it again. Fatigue is a thing, having to scroll through tonnes of content could be tiring or uncomfortable for some users, it could also increase cognitive load for some, too. I'm sure if we drilled down deeply, we'd find many more negative affects
* As we are going to offer a way to collapse it again, we do need to consider the button's visible label (AccName), as "Show More" will stop making sense, once more stuff is actually shown. I'm not going to go too deeply into that here, but at the end I will explain my rationale on what I have done

I'm quite satisfied those are the main differences, sure we'll likely encounter some nuance, along the way, but as long as we understand basic disclosure widgets and are aware of these extra considerations, we'll figure any unforeseen stuff out, along the way. I'm just gonna throw it out there that I have never actually built one of these before, I've tested them and yup, they were 'Meh' and I've told folks how to fix them, but I didn't actually build one. Not to worry though, I understand the concept and I know enough to be able to consider all users in my approach, so we'll be golden.

## Are they actually useful?

Well, they're quite common, they're typically found on blog or news sites, so no matter what our opinion is, it won't make them go away, if we say there are better alternatives. Maybe for a blog or news site, there are better alternatives, as the article could be on its own page, like this one, but perhaps there are situations where it does make sense, if the articles are quite small, maybe? I've also seen them on eCommerce sites, where the product description may use this pattern. A brief teaser or snippet of text, that front loads the most important part of the product description and then should a user want to learn more, they would click the expando button.

There is an argument that they can neatly tuck stuff away on a content-heavy page, to make scrolling or otherwise exploring the content a bit more efficient and they likely serve this purpose quite well. i'm actually kinda on the fence, they're a part of the web and it's obviously our duty to make all parts of websites we have some input on accessible.

## Let's get stuck in

So, let's go with our minimal viable experience and as always, I'll progressively enhance this. I'm going to just use text and if the user or user agent has JS disabled, they will just get the text, no fancy interaction, just the text.

I'm just going to play it safe and use Lorem Ipsum, which isn't engaging, by design, but I don't know what else to use. Just as a sort of funny aside, I was building a component on a previous job before and as I am easily entertained, I sometimes write unconventional things in my `console.log`s and also used to use stuff other than Lorem Ipsum. One time, I found a Samuel L. Jackson Ipsum generator, which, you guessed it, generated many words that Sam the Man says in his many films. This was a little entertaining to me, whilst I was working locally, but I almost submitted it in a pull request, because I forgot. Fortunately, by some miracle of the universe, I realised just as I was about to do a push, I got a glimpse of an F-bomb on my feature and managed to remove all trace of that, before I actually sent my code to GitHub, phew. So, the moral of that pointless story is: don't be a Darren, just play it safe with good old Lorem Ipsum. I definitely don't do this any more, so we won't be seeing any of those shenanigans in my content or code.

```html
<h1>All the articles on the same page</h1>

<div class="articles">
  <article class="article">
    <h2 class="article__title">My first article</h2>
    <p class="article__teaser">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quos voluptates ratione culpa nemo numquam nobis dignissimos eius eaque non similique.</p>
    <div class="article__content" tabindex="-1">
      <p>Asperiores doloribus, ab quod fuga, corporis molestiae ea autem harum iste suscipit commodi! Corporis odio eligendi in mollitia ipsum aperiam atque, dolorum, cumque dignissimos deserunt, modi libero impedit dicta!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus magni blanditiis assumenda, eos labore vel atque sit officiis eum voluptatum! In nisi ut earum rerum pariatur vero fuga nihil commodi? Neque, fugit. Magni sint dignissimos nisi dolorem delectus cumque quia mollitia laudantium culpa? Delectus quam id placeat iste ipsa porro?</p>
    </div>
  </article>

  <article class="article">
    <h2 class="article__title">My second article</h2>
    <p class="article__teaser">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores cumque doloribus exercitationem nulla omnis obcaecati, quam ducimus repellendus voluptatum mollitia nemo pariatur eaque illum.</p>
    <div class="article__content" tabindex="-1">
      <p>Dignissimos debitis! Repellat fuga obcaecati, quae et saepe odio sequi repellendus itaque exercitationem quaerat odit culpa suscipit ea praesentium at cupiditate sed quibusdam beatae repudiandae voluptates.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam saepe reiciendis eius, accusantium quia aliquid maxime deleniti enim consectetur esse id, ipsa praesentium dolor doloremque rerum quidem ut iusto a distinctio quasi vitae quam facilis. In voluptates fugiat enim culpa aliquid nemo nisi modi ipsum, corporis saepe. Accusamus, nemo tempora.</p>
    </div>
  </article>

  <article class="article">
    <h2 class="article__title">My third article</h2>
    <p class="article__teaser">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, magni. Dicta ipsa, dolorum minus id cum quibusdam placeat accusamus labore tenetur sed ipsum assumenda veritatis.</p>
    <div class="article__content" tabindex="-1">
      <p>Quo ad expedita neque explicabo excepturi commodi deleniti? Doloribus consequatur voluptate sed quos exercitationem fuga id eaque perspiciatis voluptas voluptatum, asperiores vitae porro saepe repellendus!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere nobis consequatur cumque, mollitia aperiam aliquid inventore. Sequi ipsam cum harum maxime perspiciatis facilis dignissimos repudiandae quasi! Accusantium quod id doloremque aspernatur harum ipsam, repellat dolorum magnam consequatur fugiat sed sequi fugit eligendi molestias voluptatem quaerat recusandae debitis temporibus assumenda expedita?</p>
    </div>
  </article>
</div>
```

There we go, pretty straightforward stuff, for now. So, just to be clear, in most cases we would have a content management system (CMS) doing a bit of the heavy lifting for us, in that we could get it to output the HTML we wanted, for later JS manipulation. Admittedly, I'm not fully sure of what the editor would give the author in the back office of that CMS, so I've made a couple of what I believe to be reasonable assumptions:

* There would be a way for the author to set the teaser part of the text, this could be a separate input or text selection
* There would be a way to add the rest of the text, either that would be an additional input or it would be the unselected text

I did consider just doing all of that our end, with JS, but then that seemed a little more brittle, as we would have to extract a certain amount of characters or words and unless we knew the cutoff the author wanted, we could cutoff too much or too little. We could, of course make the assumption that the author can select a portion of text and we receive a data attribute that has a number, that number would be equivalent to the character count of the teaser and then we could just extract those characters. perhaps this is how it would actually work? In a real life situation we would be furnished with that information from the CMS implementation team and we would be able to act accordingly. We're just simplifying the process here, as this is just a demo.

So, here's what we have in our HTML:

* We'll wrap all the articles in a container, just to make limiting the width and centering that little easier
* We have three articles which we will soon manipulate with JS

  * Each article has a distinct heading
  * Our teaser comes next, I've used a `<p>` tag with the class `article__teaser`, which is of course a block-level element, so the to-be-revealed content will be new paragraphs. This may not be the desired result, in which case we'd use `<span>` elements within paragraphs and have to do a little more DOM manipulation than we're going to do here
  * We're wrapping the to-be-revealed content in a `<div>` with a `article__content` class
  * I've added a `tabindex="-1"` to the article__content elements, for later focus management
  * Each `article__content` holds some text, in our case just a couple of short paragraphs of good old Lorem Ipsum

I've just gone for three articles as one seemed quite lazy on my behalf, two probably seemed enough, but as I was uncertain, I went for three, for good measure. I also added two paragraphs to each, as we will be manipulating a potion of the first one and having two paragraphs helps me to build something that won't break in a slightly different use case.

We're going to tackle the JS next and we'll add the pretty styles at the end. Remember I said I have never actually built one of these before? Just because I'm a bit stubborn, I'm not even going to look at anybody else's efforts, no research, no looking at anybody else's code, I'm just going to have a stab at it, for fun.

The first bit of JS we want is a small script to go in the site's `<head>` section, to add a class to the `<html>` element, for when JS is available:

```html
<head>
<!-- head stuff -->
<script>
  document.documentElement.classList.add('has-js');
</script>
<!-- Other head stuff -->
</head>
```

So, without further ado, here's the main JS:

```javascript
const articles = document.querySelectorAll('.article');
const showMoreHTML = `<div class="flex-c"><button class="article__show-btn" data-shown="false">Show more</button></div>`;

articles.forEach(article => {
  article.insertAdjacentHTML('beforeend', showMoreHTML);
  article.setAttribute('data-expanded', 'false');
});

document.querySelectorAll('.article__show-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.getAttribute('data-shown') === 'false') {
      btn.closest('.article').setAttribute('data-expanded', 'true');
      btn.setAttribute('data-shown', 'true');
      btn.textContent = 'Show less';
      btn.closest('.article').querySelector('.article__content').focus();
    } else {
      btn.closest('.article').setAttribute('data-expanded', 'false');
      btn.setAttribute('data-shown', 'false');
      btn.textContent = 'Show more';
    }
  })
})  
```

A quick explainer of the above:

* We grab a reference to each article with `articles`
* We create a string that is the button's HTML, with `showMoreHTML`
* We loop through our articles
* We insert (`insertAdjacentHTML`) the button's HTML string before the end (`'beforeend'`)of the `article`, so it is the last item in the article element
* We set a data attribute `data-expanded="false"`, as this will be our hook for the later CSS (We could have done this in the CMS)
* We loop through the new `<button>` elements assigning `btn` as each item in the loop
* Add an event listener to each button that fires on a `click` event
* Conditionally check whether the `btn` has the `data-shown="false"` attribute and value and if it has:

  * Set the `data-expanded` attribute on the article to `true`
  * Set the `btn`'s `data-shown` attribute to `true`
  * Change the text within the `btn` to 'Show less'
  * Find the related `article__content` add set `focus()` on it
* If the button has data-shown set to true, we are just returning everything back to its initial state

  * The article's `data-expanded` attribute set back to `false`
  * The `btn`'s `data-shown` attribute back to `false`
  * Set the `btn` text back to 'Show more'

And that is that done, not a great deal of JS to get our head's around there, hopefully just a simple one. There are a few bits I want to go over, but we'll just add the CSS here, first, as I don't tend to explain that bit in any great depth.

```css
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.125rem;
  line-height: 1.5;
}

button {
  font: inherit;
  cursor: pointer;
}

.flex-c {
  display: flex;
  justify-content: center;
}

.articles {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 2rem;
}

.article {
  border: 1px solid grey;
  border-radius: 4px;
  padding: .5rem;
  max-width: 55rem;
}

.has-js article[data-expanded="false"] .article__content {
  display: none;
}

.article__content:focus {
  outline: 2px solid rebeccapurple;
  outline-offset: 2px;
}

.article__show-btn {
  margin-top: .5rem;
  border: 2px solid rebeccapurple;
  border-radius: 2rem;
  padding: .25rem 1rem;
  font-size: 1rem;
  background-color: rebeccapurple;
  color: white;
}

.article__show-btn:focus-visible {
  outline: 2px solid rebeccapurple;
  outline-offset: 2px;
}
```

The only bit that is worth mentioning here is the following  `.has-js article[data-expanded="false"] .article__content {display: none;}`, this is the bit that hides the content and as we have our `has-js` class, it will only actually hide that content if JS is available. If there is no JS available, then the user gets just the text, which is exactly what we wanted or at least what we set out to achieve, anyway.

## My thought processes

In our example, the button is always at the end of the container, so this button would of course come after the newly revealed content after it has been displayed. That's obviously a big no no, as this could disorientate users, as newly revealed content must come next in the sequential focus order. But, what if there are no interactive items in our container, does the focus order matter? No, but the reading sequence does, so logic dictates we need to manage focus when the element expands and put it in the most sensible place. In our example we have a teaser and the remainder of the content, we make an assumption that whatever was in the teaser was enough to want our user to show the rest of the content, so they click our button. As they have "read" the teaser, let's just send focus to the remainder of the content, so they do not lose their place or have to "read" anything twice. we're trying to provide the best experience for our users and this of course removes a heap of potentially confusing situations that would occur, if we didn't manage focus correctly. The primary users who benefit here are of course screen reader users.

You may have noticed I have not used `aria-expanded` on or button that errm, expands? Some of you may know why and others may think "This joker doesn't know what he is doing" and you'd be right (I joke). Bear with me, I do actually know a decent bit of stuff, I promise. If we have an accordion, we would not change the visible label as that is also the heading text (usually), right? So we of course use `aria-expanded` to inform a user of "state". If we had a navigation button, we may have the AccName "Menu" and we are using a noun to inform a user what that is, so we would of course need to use `aria-expanded`, as again, that adds supplementary information on the element's current "state". It's always going to be "Menu" as we're naming the thing, not what it does. In our example, we're using verbs "Show more" and "Show less", they are self-explanatory and adding` aria-expanded` could make things a little confusing or overly verbose. The expanded "state" becomes irrelevant when we use self-explanatory labels as, for example "Show more, collapsed" and "Show less, expanded", sounds a little confusing, right? Like many, I learn from elsewhere and I have read this [article by Sarah Higley a few times, Playing with State](https://sarahmhigley.com/writing/playing-with-state/), I may appear to have deviated away from Sarah's recommendation of only change the name of play/pause buttons, but for everything else, change state. But I have done that intentionally, I'd hope Sarah would agree with me, but I don't personally know her, so I am not going to ask, but I do learn a great deal from her superior wisdom.

In Sarah's article you may have noticed that Sarah recommends not changing the AccName of buttons because that AccName change is not always reliably passed to assistive technologies. The "state" change is, but not the AccName recalculation. This doesn't apply to us, here as the issue with that is only evident when focus remains on that button. Sarah does go on to mention this, towards the end of her article, in that if the element has focus, changing state is much more reliable and changes to the AccName may not be passed to the AT. As we are managing focus, we don't need to worry about that. [There is of course an Adrian Roselli article cautioning against changing the AccName or AccDesc of buttons etc](https://adrianroselli.com/2020/12/be-careful-with-dynamic-accessible-names.html), so of course, be sure to do your own testing.

I have performed a limited set of tests myself, I wouldn't write this stuff without doing so and the tests I performed were:

* VoiceOver, Sonoma 14.5, all browsers up to date (09/08/2024)

  * Firefox (Developer edition)
  * Safari
  * Chrome
  * Edge
* Talkback, Android 14, both browsers up to date (09/08/2024)

  * Chrome
  * Firefox
* VoiceOver iPadOS 17.6.1, browser up to date (09/08/2024)

  * Safari
* NVDA (Through AssistivLabs) browser up to date

  * Chrome 

I do not currently have access to JAWS, so please take my tests with a pinch of salt and also, [AssistivLabs](https://assistivlabs.com/) kindly gave me a free version, a while back, as they're good folks like that. The recommended pairing was previously NVDA and Firefox, but now it is NVDA with Chrome, [you can check this with the WebAIM Screen reader User Survey 2024](https://webaim.org/projects/screenreadersurvey10/). That means I can only test the recommended pairing through AssistivLabs, as I have the free basic version.

In every single test above, the button was always announced as "Show less" when I moved focus back to it. Things did get a little flaky when I collapsed the article though, as focus of course remains on the button. This was perhaps only an issue on Android, although there was at least a beep sound, that indicated something had happened.

I have pretty much raw-dogged this, in that I have never built one previously, I haven't researched and I didn't go looking at anybody else's code. Instinctively, I initially created two buttons, managing the display properties to ensure only the correct one was ever shown at the right time and the incorrect one was hidden. I even wrote about it as I was coding up the example and explained why I had done this. Obviously, I have removed that from this article, as that is not the path I eventually chose. The reason I changed my mind was due to the collapsing of the article. As we would have been removing one button from the accessibility tree, then adding another to which we would have needed to have placed focus on, this of course triggered a whole announcement. I "thought" this may be potentially a bit noisy having all the initial information announced to our user. I could be wrong with my choice, maybe having two buttons would have been the better experience? This is of course where user testing comes in, pay some experienced screen reader users for their time and get better quality data than I can give you.

## Wrapping up

We have achieved what we set out to do, we can now toggle the display of some content. There are a couple of uncertainties, as I have pointed out and they related to should we use one button or two? As we are actually changing the AccName of the button, I have opted against using `aria-expanded`, which I believe is the right call, in this instance, as the labels are self-explanatory. There is some potential that when collapsing the article, the limited feedback given in some situations (mostly android), may be a little confusing. perhaps that confusion is mitigated enough, by the "beep" sound? perhaps by the fact a user can swipe away and get to the next article, without having to encounter the hidden content again? If you think I could have done better, get in touch. This was genuinely a "stab in the dark" type article, as I when I initially Googled the widget, I didn't see much in the way of accessibility, it was all UX stuff, so I just decided to not research, as it's not a complex component anyway.

## The CodePen

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
