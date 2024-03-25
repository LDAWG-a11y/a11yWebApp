---
title: Creating a Skip to Content link
summary: Learn why we should add a Skip Link to our sites, who benefits from
  them and discuss a couple of ways we can build one, along with some best
  practice accessibility considerations
author: dlee
date: 2023-09-01
toc: false
tags:
  - HTML
  - CSS
  - Best practice
isGuide: true
---
## Intro

As the page title suggests, we're going to deep dive into Skip Links. In my experience (which of course is not necessarily the same as everybody else's) I consider a Skip Link to be an element that allows a user to skip over some content, usually because it may take some effort to get past that content by tabbing through it. Other folks may call them something different, such as Jump Links and this may in fact be reflected in the visible label of the element, which can differ from site to site, some common examples are:

* Skip to main
* Skip navigation
* Skip to content
* Jump to main
* Jump to content

There are undoubtedly more names for Skip Links out in the wild, whether you want to Hop, Skip or Jump to the main content of your page, I'm just going to call them Skip Links in this guide, just for consistency's sake.

## A bit of a deep dive into skip links.

This isn't going to be the most in-depth guide out there, hopefully it will provide enough understanding on why these are really helpful for folks and I consider them to be a quick win, in that it takes mere minutes to create one and by doing so, you're making your site more usable to folks that don't use a mouse.

### What is a skip link?

It is just a link with a href that points to another area on the page via an ID reference. the most common place to find these would be at the top of a page, they'll seldom be visible until they receive keyboard focus, as they're often hidden away until they do receive focus, but sometimes you may encounter Skip Links that are always visible, both work, they achieve the same thing.

When used at the top of a page, the purpose is usually to allow keyboard users to tab to the Skip Link and then press <kbd>Enter</kbd>, so their keyboard focus moves to the start of the actual page content. This reduces both the repetition and effort required to actually get to the parts of the page a user is interested in. As an example, some sites may have a significant number of interactive elements in the page's `<header>` area, I've got a site open right now, that has the following:

* Logo, which is wrapped in a link and points to the Home page
* 4 social media links
* Search input
* Search button
* Navigation menu with 9 links

That's 16 interactive elements there, which a keyboard user would have to <kbd>Tab</kbd> through to get to the content they are interested in. As this navigation is identical across all pages and it requires at least 5 pages to complete the transaction on the site I have open, then it is at least 5 * 16 = 80 additional tab stops that a keyboard user must endure, when they didn't actually need the navigation in the first place.

If the site I have open had a Skip Link a user could have used it on each of the 5 pages I looked at and reduced the number of keypresses by 70, as using the Skip Link typically takes 2 keypresses <kbd>Tab</kbd> and then <kbd>Enter</kbd>. It makes navigation less arduous, enabling users to complete tasks more efficiently and with less effort.

### Why are skip links important?

For those of you who may be new to accessibility, you may be wondering why it is important, you may understand that some users cannot use pointing devices and also think something along the lines of "It's not really a great amount of effort to press keys" or "If I hold <kbd>Tab</kbd> down, it'll quickly move through all the interactive elements until I let go".

I don't rely on a keyboard, I'm fortunate enough to be able to use pointing devices, such as a mouse, touchscreen or trackpad, so to me, at this moment in time, it is not a great amount of effort to press the <kbd>Tab</kbd> key, I also have the required dexterity, reflexes and fine-motor skills to hold <kbd>Tab</kbd> down and let go roughly where I want it to be. You may not have any motor disabilities and your experience of using a website may be similar if you try to navigate a site with a keyboard.

The important thing to remember is what a non-disabled person experiences is often completely different to what a person with a disability experiences. We need to look beyond how we interact with sites and consider the varying needs of others, the goal has to be making our sites easier to use for everybody, some considerations could be:

* A user may not be able to use their hands at all, they may use alternative input devices, such as a mouth stick, foot pedals, a head wand or maybe eye-tracking
* A user may have have a disability that causes them discomfort or pain, meaning without a Skip Link we may be causing them some physical harm by not considering their circumstances
* A user may have tremors, tics or not have the required precision to hit the keys accurately, which could make their task very difficult

That list is by no means exhaustive and there are many more reasons why forcing users to tab through unnecessary interactive elements can be harmful.

It's also worth pointing out that users can get frustrated and frustrated users are more likely to bounce away from your website than happy ones, that's pretty much accepted by everyone. A user who relies on a keyboard may get sick of repeatedly tabbing through the navigation on every page of your site, they may just go elsewhere (if that is an option) as they are not prepared to put up with the physical or mental fatigue of repeatedly tabbing through things that can easily be skipped

### Do they benefit screen reader users, too?

They can do, but I guess the correct answer here is: It depends. Screen readers have built-in navigation menus their users can access to skip to certain parts of a site (assuming the site has decent HTML), this could be headings, landmarks, lists, links, images and other aspects of the site. Which method they prefer would of course come down to individual preferences. Although it is safe to say, by adding a Skip Link to your site, you enable users of screen readers to choose how they want to navigate along with providing keyboard-only users with a way of getting to the important content easily.

### Do we use them just for skipping the navigation?

In a word: Nope. Whilst it is more common to find Skip Links at the top of a page to skip over the navigation, they certainly don't need to be limited to that. Some examples of content a user may not want to tab through could be:

* Social media feed, these things can oftentimes seemingly go on forever and it could take hundreds of tab stops to get out of them
* Filters for searching, sometimes there may be some complex filtering on a page, with multiple inputs and the user may not be interested
* Side panels, sometimes a side panel may have a list of links, for posts by month, since the website was created, there could be well over 100 tab stops there

Again, the above is not a comprehensive list, it's just to give you food for thought. But ultimately, if there is something on a site that is not likely to be important to everybody, but would take a considerable number of keypresses to bypass, then adding additional Skip Links may be super beneficial for some folks.

You may choose to place it above the content you think users may want to skip over or you may add additional links at the top of the page, just ensure the labels for each are unique, understandable and they do actually skip to where a user wants to be.

### Are they required by WCAG?

This is another "it depends" answer, I hate those too. [WCAG 2.4.1  Bypass Blocks (A)](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html) states: "A mechanism is available to bypass blocks of content that are repeated on multiple Web pages". So, at the very least, if there are repeated blocks of interactive content across pages, there needs to be a way of bypassing those.

A mechanism does not explicitly require it to be a Skip Link, but it's on us to provide that mechanism. There are browser extensions out there that can somewhat help keyboard users navigate to landmarks similar to the way a screen reader can, but we should not be directing our users to install plugins. Any of you ever had a job where your system is locked down and you have to ask IT to download every single piece of software for you and they don't let you have browser plugins as they cannot verify their security? Ahh, fun times, this is just one reason why we should not expect users to go off and find a plugin, some simply can't and some just would have no idea how to.

If you have a site that uses a mobile menu across all viewports and it is the only interactive element in the navigation, then there's little point in adding a tab stop to skip a single tab stop, in fact, the wording in the understanding document states: "Small repeated sections such as individual words, phrases or single links are not considered blocks for the purposes of this provision", So, as long as the repeating content (the navigation) only contains a very small number of interactive elements, it's not required, again there is no indication of what a sensible number would be, so you would be required to make your own judgement call. I would perhaps recommend adding one for anything over 4 or 5 tab stops, but others may have a different view.

You may have a navigation that is expanded on page load, but is also collapsible, that too is considered a mechanism. As long as that control came before the links and a user could collapse them and move on, this too would be fine.

Use of landmarks is one of the Sufficient Techniques to pass this success criterion, assuming you have a good HTML structure, like so:

```html
<header>
  <nav>
    <ul>
      <!-- Nav links -->
    </ul>
  </nav>
</header>
<main>
  <h1>Page title</h1>
  <!-- The content -->
</main>
<footer>
  <!-- Footer stuff -->
</footer>
```

The use of landmarks and headings do provide a way to skip over repeating blocks of content, although in reality that is not super useful for keyboard-only users and primarily only benefits screen reader users.

Honestly, you can wade through heaps of discussions on this matter and come away with more questions than answers as to what is required to pass this success criterion.

I have seen some folks that are way more experienced than me state "Yes, landmarks and/or headings are sufficient", but then I have seen others state "Landmarks aren't accessibility supported, as a keyboard-only user doesn't benefit from them". As both of these views have been put out there by people smarter than me and the Understanding Document does nothing to clarify either way, it's arguably better to be on the "They're required" side of the fence, if there is a user benefit on that site and no other mechanism.

If you have a site that uses the correct landmarks, has a good heading structure (especially the `<h1>` that introduces the main content) and has a Skip Link to skip over repeated content, then you'd typically have a good structure which enables all users to navigate in their preferred way, so save yourself the "WCAG interpretation" headache and put users first.

### Where should focus be sent to?

Some sites send it to the `<main>` landmark, some to the primary title, which would ordinarily be the `<h1>`. In reality, if it goes to the `<main>` landmark, a screen reader user will usually hear they are on the main landmark and if they hear "heading 1" and the text within the heading, that will also make sense. If sending focus to your main content, it's a good idea to have the main role, as if it is just a `<div>`, then it may just be silence as obviously there is no role to announce. There may of course be other sensible places to send focus to, depending on the specifics of the site, but generally speaking, the `<main>` element or the `<h1>` are usually going to be a good call.

## You've waffled enough, how do I make one?

We basically need 2 ingredients here, a tiny bit of HTML and some CSS, absolutely no JS needed.

First things first, we need an actual link, which we will want to position at the top of our page, in fact, it should be the very first thing a user discovers, so putting it as the first item in the `<header>` makes the most sense, this is our HTML:

### The skip link's HTML

```html
<a href="#pageTitle" class="skip-link">Skip to content</a>
```

### The target's HTML

```html
<!-- The target of the skip link could be like so: -->
<main>
  <h1 tabindex="-1" id="pageTitle">Hello</h1>
  <!-- Page content -->
</main>
    
```

### Overview of the above HTML snippets

In the skip link's HTML, we're using a link and that link's href points to `#pageTitle` which is the ID of the page's `<h1>` in our example

We also add a class, so we can easily style it

In the target's HTML, we make sure that ID reference is present on the `<h1>` and we also add `tabindex="-1"` to our target (the `<h1>`), this is because some older browsers did not actually send focus to the non-interactive element, so a keyboard user would still have to tab from the start of the page. So by adding this attribute, it will ensure that programmatic focus does in fact land on our target, even in older browsers. This is worth putting in as whilst we may assume that most folks have updated their browsers recently, there are still folks who cannot, so we're ensuring they can also skip to our target.

### Let's style it

There are a 2 approaches we could use here, we could have a persistently visible Skip Link, which basically means it's up at the top, a sighted user will see it when the page loads and it's easy to discover or we could have a Skip Link that is initially hidden and only displays on keyboard focus. Whilst it is technically out of view, as soon as a user presses <kbd>tab</kbd> to move focus into your page,it then shows, due to the CSS we will use. Whichever approach you chose, just make sure it is right for your site, users and stakeholders.

It doesn't make a great deal of sense for me to show you how to create a persistent Skip Link, as just that HTML alone would be technically be enough, of course you'd want to make sure the text was readable, with sufficient contrast and there was a good focus indicator, but that would likely be dictated by your site's styles.

So, without further waffling, let's just add the CSS:

```css
/* Set some base styles, so it is easy to see */
.skip-link {
  position: absolute;
  display: inline-block;
  padding: .375rem .75rem;
  line-height: 1;
  font-size: 1.25rem;
  background-color: rebeccapurple;
  color: white;
  /* Ensure the Y position is set to zero and any movement on the transform property */
  transform: translateY(0);
  transition: transform 250ms ease;
}

/* When it is not focused, transform its Y position by its total height, using a negative value, so it hides above the viewport */
.skip-link:not(:focus) {
  transform: translateY(-2rem);
}
```

In the above CSS, we're setting styles for how we want it to look when it is actually visible, I've just added a background, decent contrast and a good sized font. I've also ensured I used relative units (rem)

I also calculated the height of the Skip Link as 2rem, using this method: 1.25rem (font size) + .375rem (bottom padding) + .375rem (top padding) = 2rem.

By using the `:not()` negation selector, we are saying when the link does not have focus, move it upwards by 2rem, so it is out of view, above the viewport. we need to use a negative value of 2rem to achive this, as negative values push elements up vertically, when using `transformY()`

Just a quick note before we get to the CodePen, this works as I intended here, but it will depend on your site margins, the body element having `position: relative`; set and other aspects that you may need to tweak for your use case.

### The skip link in action:

I have added a few extra bits of CSS here, I have also added the text of the `<h1>` into a `<span>` element, as I wanted a focus indicator to show a user where focus is. I am aware that if I click `<h1>` with a mouse, the focus indicator does display, which may not be desirable for everybody, but that's beyond the scope of this guide.

<p class="codepen" data-height="300" data-preview="true" data-theme-id="dark" data-default-tab="css,result" data-slug-hash="WNLobNR" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/WNLobNR">
  Skip link example</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

### An alternative approach

This method is more common than the one I have just explained and this essentially sets the unfocused Skip Link to smaller than a pixel when not focused and displays as intended when it is focused:

```css
.skip-link {
  position: absolute;
  display: inline-block;
  padding: .375rem .75rem;
  line-height: 1;
  font-size: 1.25rem;
  background-color: rebeccapurple;
  color: white;
}

.skip-link:not(:focus) {
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
}
```

Using similar CSS for the page and `<h1>` as the previous example, our Skip Link works exactly the same, but this time it just instantly appears, as can ve viewed in the following CodePen:

<p class="codepen" data-height="300" data-preview="true" data-theme-id="dark" data-default-tab="css,result" data-slug-hash="VwqmYbw" data-user="LDAWG-a11y" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/VwqmYbw">
  Skip link clip method</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Wrapping up

In a nutshell, Skip Links are a super useful way of skipping blocks of repeated content and users will be pleased that you have considered their needs by implementing one. It's very little effort to create one and as typically they are hidden out of view until a keyboard user moves focus on to it, then I cannot see why anybody would push back on having one, although I know they some folks do push back (whatever their reasons for that are, they're almost certainly wrong).