---
title: Visually hiding text
summary: Sometimes we may need to visually hide text, particularly when this is
  in place of a visual affordance, that requires a text-alternative, of course
  there are considerations to make before we do.
author: dlee
date: 2023-03-31
toc: true
tags:
  - HTML
  - CSS
  - Best practice
isGuide: true
---
## Intro into visually hiding text

Sometimes the sites we build or test may have visual affordances other than text, these may be images, icons or CSS generated content that is also not text. An example of one element could be the "Hamburger" menu, which could be created in several different ways and if this graphical information is not accompanied by visual text, then naturally we need to provide a text alternative. The same can be said for other aspects of iconography, but depending on how the graphic was marked up, we should always reach for the best tool for the job, to ensure anybody who accesses the site can understand the control's purpose, irrespective of whether they use assistive technologies or not.

Oftentimes we find visually hidden text that is aimed specifically at screen reader users, additional instructions, extended labels and other text-based information. This of course can adversely affect other users, such as users of voice input software, as while the original intent may have been "To help screen reader users", the result is often problematic for other users and the intent to help one set of disabled users has made tasks considerably more difficult for other sets of disabled users. Accessibility is not just about getting your site to work for a screen reader user, it is about getting it to work for all disabled users, so they can access sites in a a way that works for them, consume all the information and complete the same tasks as non-disabled people.

## When hiding text can be bad

There are definitely times where we should add hidden text and there are more times where we shouldn't, take the following example:

```html
<button aria-label="Click this button to open the modal to edit your profile">
  Settings
</button>
```

This is something we encounter quite often and have to write up the issue and explain both why it makes life difficult for some folks and also why it fails [SC 2.5.3 label in Name (A)](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html). Let's quickly go over some of the problems with this:

A visible label is the only information a voice input user has to determine the purpose of that control, as far as they are initially concerned that button is called Settings and why would they think any different? If you went to the local supermarket and purchased an ordinary looking box of Corn Flakes, then the following morning you opened this box of Corn Flakes only to discover that due to some poor quality assurance (QA) at the cereal factory, you have Rice krispies and you hate Rice krispies, you're going to be fuming, right? You may then have the hassle of having to grab something to go from a shop somewhere on your travels and this unnecessary diversion may result in you being late for something.

So, when developers do the above, what they are actually doing is misleading people, through bad QA and misunderstandings. On the outside, their `<button>` looks pretty self-explanatory, a button that will somehow display some settings, but if you're accessing a website with your voice and instructing your voice input software "Click, settings", you're not getting the Corn Flakes or anything else, for that matter. So you would need to take an unnecessary diversion and bring up the mouse grid, show numbers or show labels, which will likely be an unwelcome hassle. Why does this happen? Because the visible label is not included in the accessible name, our example used an `aria-label` to overwrite that visible label and the string of text within the `aria-label`'s value does not include the word "Settings", so we have a complete mismatch.

Another issue with the above, is providing redundant instructions in controls. Again, I can at least understand what the intent was, it was to provide a screen reader user with a little more information, but in doing so, we have added extra verbosity and told them things they already know.

As an example, if a screen reader user has made it to your site, they have probably done so after several steps, some of which could be:

1. Turn on computer
2. Login to user account
3. Launch a browser
4. Locate the search and type in a query
5. Find a link to your site in the search results and navigate to it

In order to get that far, just like everybody else, they had to click things along the way, for sighted users we would ordinarily use several visual cues to determine what can be interacted with, colours, borders, shapes, underlines, locations and much more, a screen reader user will hear audible cues, such as "Button, login", "Link, your site dot com" etc. So, we don't need to mention the words "button" or "click here" in our button at all, as all that information was already understandable. In fact, we don't need the aria-label, because the button itself has a text label and if that text label does not make if obviously clear what the purpose of the control is, then we could come up with a more suitable name.

## So when is it Ok to hide text visually?

There are of course situations where you may need to hide text, as you may need to provide a text-alternative for something that otherwise omits textual labels. Examples of such could be the "Hamburger" menu I mentioned earlier or a magnifying glass icon on a Search button, which is also pretty much universally understood. Obviously we know that graphical elements should have a text alternative when they perform a function or inform users of other information necessary to understanding of a part of a site. There are several types of visually hidden text and when I use the term "visually hidden", I'm including alt-text, ARIA labels or descriptions, text that is hidden with CSS and even the title attribute, because you only ever see that with a mouse or trackpad. 

But it's important that we don't overuse this, generally speaking, if an instruction is required for operation of part of a website and it is not clear through other visual means, then it's likely that more than just screen reader users would benefit from the same instructions. Is a design ever that spectacular that it leaves everybody guessing and confused as to what they need to do? A little help text never hurt anybody and as Steve Jobs once said:

> The design is not just what it looks like and feels like. The design is how it works

Which basically means no matter how pretty we think our sites are, if they don't work properly and users cannot figure out how to use them, then the design is flawed, well that's my interpretation for this context, anyway.

### A quick explanation of each method for visually hiding text

I'll do a quick run through of some of the most common "invisible text" methods.

#### Using an `aria-label`

`aria-label`, this provides a non-visible name to an element on a website, that could be a user interface component, a link a region or anything that has a supported role. There can be issues with using this, in that many translation services ignore the value, so when you have a user accessing your site translated into a language other than the authored language, these elements may not make any sense. We already used `aria-label` in the earlier code example and discussed other common issues.

#### Using `aria-labelledby`

`aria-labelledby`, similar to `aria-label`  we're reaching for ARIA here, to provide an accessible name to an element, but this particular attribute works in a completely different way. The value does not take a string of text, it references other nodes on the page, it doesn't have to be just one node, it can be many and it can even self-reference. The advantage of this attribute is we can reference text that already exists elsewhere on the page and that referenced text would be translated along with other text on the page, so we have avoided the issues of translation. Another cool feature of `aria-labelledby` is, it ignores all of the methods used to completely hide something, so in CSS it will ignore display: none; and visibility: hidden; in HTML it will ignore the hidden attribute and in ARIA it will ignore aria-hidden="true", this is by design, so we can still get a name from an otherwise completely hidden node, like in the following example:

```html
<nav>
  <button aria-expanded="false" aria-controls="navList" aria-labelledby="hiddenNode">
    <span class="naviagtion__bar"></span>
  </button>
  <ul id="navList">
    <!-- List items with links would be here -->
  </ul>
</nav>
<main>
</main>
<footer>
  <p id="hiddenNode" style="display: none">Menu</p>
</footer>
```

In the above code example, this is a quite extreme example, it wouldn't be best practice to have our reference to a hidden node that far away from the element we need to provide a name to. That is not because it will work any differently, it's just because another developer on the team may find it and think it's an artefact of some kind, which is not actually being used and delete it. Assuming there are processes and/or tools in place, this would be easily picked up as we would now have 2 errors, relating to our button:

* [SC 4.1.2 Name, Role, Value (A)](https://www.w3.org/WAI/WCAG21/Understanding/parsing.html) as our button has no accessible name
* [SC 1.3.1 Info and Relationships (A)](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html) as the value of `aria-labelledby` must point to an ID of an element in the DOM and as it no longer exists, that programmatic relationship cannot exist

But, human error is commonplace, so perhaps it would be best to have the node closer to the button, as then it should be easier to understand its purpose. Also, I have only included an inline style for brevity.

Just to add a disclaimer here, I'm not an expert in internationalisation, but the text node I hid with an inline style did translate when I changed my browser's default language, but I only used one browser for this and used the default language selection tools within. I don't know if this would always work and I'm being cautious as I wouldn't ordinarily write an inline style and I am not 100% sure whether all translation services would successfully translate that particular node, i suspect it will always work the same, but I want to be transparent about the very limited test I performed.

#### Using alt text

This one is pretty straightforward, if we have an image of a magnifying glass we want to put in a button that performs a search query, we can just give that graphic some alt text, users will never see the text (unless the image doesn't load) and it provides an accessible name to our button, without reaching for ARIA, like so:

```html
<button>
  <img src="magnifying-glass.png" alt="Search">
</button>
```

The above example works just fine, as the "Contents" of the button, is the image, which has an alt text value of "Search", so in the absence of other naming conventions, the button gets the accessible name "Search" from the alt attribute's value, so no trickery involved in this.

#### Using CSS to hide some text

We can use CSS alone, which is useful when we cannot use an alt attribute as maybe our graphic is created with CSS as opposed to an image and given that the [first rule of ARIA](https://www.w3.org/TR/using-aria/#firstrule) states:

> If you *can* use a native HTML element [[HTML51](https://www.w3.org/TR/using-aria/#bib-html51)] or attribute with the semantics and behaviour you require **already built in**, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible**, then do so**

So, as a button will happily accept an inline element's text string to formulate its accessible name, we can add some text inside the button, using a suitable HTML tag (I'm going for a <span>) and then I'll hide it visually, but ensure it is still passed to the button's accessible name calculation, first we'd create our HTML element, like so:

```html
<nav>
  <button aria-expanded="false" aria-controls="navList">
    <span class="naviagtion__bar"></span>
    <span class="visually-hidden">Menu</span>
  </button>
  <ul id="navList">
    <!-- List items with links would be here -->
  </ul>
</nav>
```

I've called my class "visually-hidden", but of course you are free to call it whatever makes sense to you. Then we can write our CSS for our new visually-hidden class:

```css
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}
```

This will visually hide the node it is applied to, by essentially reducing its size to nothing, so it does not display on the screen. As it is just invisible and not hidden from the accessibility tree, we still get the desired name of "Menu" for our control, which would typically be well understood to our users.

So, where we need to hide text, especially inside a control, such as a button, this is a popular approach to take, that doesn't require ARIA.

You may be familiar with this pattern which is commonly used in "Skip links" in that they typically only display when they receive keyboard focus, of course, we would need to add some additional CSS, like so:

```html
<style>
  .skip {
    /* Whatever styles you want to display when the element has focus */
  }

  .visually-hidden:not(:focus):not(:active) {
    position: absolute;
    height: 1px;
    width: 1px;
    overflow: hidden;
    white-space: nowrap;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
  }
</style>

<a href="#main" class="skip visually-hidden" tabindex=""-1>Skip to content</a>
```

In the above example, we are essentially telling CSS to only hide this element visually, when it does not have :focus and it is not :active, using the "negation pseudo class" `:not()`. I added a second class where I would add some styles I'd want to display when the element does have focus, depending how many times you use this CSS, it may be doable without the additional class, but this is just an example.

## How not to hide important text

It's quite common for us to discover text that is supposed to be available to assistive technologies, but it is completely hidden and by completely I mean out of sight and not exposed to the accessibility tree. An example that I have encountered recently was similar to this:

```html
<style>
  .screen-reader-text {
    display: none;
  }
</style>

<p class="screen-reader-text">* denotes field is required</p>
```

In the above example it's safe to assume the developer(s) wanted to tell screen reader users what the asterisk on an input means, but intent can often go wrong, if we don't at least test our efforts or look them up from one of the many reputable sources out there. There's a couple of issues with this approach:

* Nobody can see and it's wrong to assume that everybody knows what the asterisk means
* Nobody will hear it, as a screen reader will be unaware of its existence

Of course, there are much better ways of informing users which fields are required and if you need to tell a screen reader user which fields are required, then you also need to tell everybody else. You could just add "(required)" to the end of the label and call it good.

## Wrapping up

So, there are valid use cases for hiding text and where possible this should be done when the visual information is clearly understood by a common graphic or CSS created visual etc and should be done sparingly. As discussed, there are several ways of achieving this and it's important to select the most robust method for your use case.

* If the element contains an image, use alt text
* If translation matters, avoid aria-label
* If the name can be referenced by a close by node and for whatever reason you can't add a visually hidden node, use aria-labelledby="\[IDref of close by node]"
* If the element has a CSS created icon, perhaps adding a text node inside and hiding it with CSS is the way to go

In any event, make sure the hidden text matches the controls purpose and is succinct, but informative, consider all users in your approach and most importantly, test your work with assistive technologies, tools and ideally disabled users.