---
title: How to build an accessible chatbot
summary: Chatbots are now common place, seldom are they accessible, they are
  often designed without any considerations for people with disabilities, so
  let's fix that
author: dlee
date: 2025-07-15
toc: true
tags:
  - HTML
  - JavaScript
  - CSS
  - Best practice
isGuide: true
---
## Intro

Pretty much everywhere we go on the web these days, we'll be greeted by some form of chat interface and their presence is showing no signs of slowing down. They're kind of like the self-service checkouts in supermarkets, in that they weren't quite as common when organisations had to actually pay people to be on the other end of these things, but now, as "AI" is seemingly everywhere, and organisations have discovered they don't have to pay people to answer questions, boom, they're popping up everywhere.

I'm not going to delve too deeply into my opinions on AI, sure, it has its uses in some scenarios, but ultimately it's not something I'm overly keen on, I'd much rather speak to a person than get a response devoid of human characteristics. I also prefer my responses to be accurate, not "best matched" based upon wherever the "AI" scrapes that data from. Anyway, this isn't an article about AI, not all chatbots are AI, most chatbots are in fact, just poorly marked up, which presents a huge barrier for folks with disabilities.

I recently tested a chatbot and whilst I have no doubt the backend stuff is highly complex, particularly if it's just a computer answering the questions, I built myself a tiny prototype, just to explore the difficulty and effectiveness of my suggested solution. It wasn't difficult at all, but then I always start any task with "How can I make this accessible?" mindset, and when I factor that in from the start, I personally find it easier,

This isn't going to be an advanced chatbot, I don't personally see the point in me wasting endless hours getting it to scrape info from other sources, so if you're looking for an answer to the question of "What is the meaning of the universe?", my chatbot will be of no use at all. So, just to be clear, we are going to build a chatbot, which functions as it should and it should function in a way that works for everybody, it won't however, be very smart, I'm probably going to only have answers to five questions and a suggestion for everything else. I'll be honest here, at this stage, I have absolutely zero idea how to account for certain aspects of language, typos, spelling mistakes and anything else that could result in you and me having the same question, but a different way of asking it. I'll probably Google that, later, maybe I will even ask AI how to do it and I'll either hate it more, or a little less.

So, a chatbot typically comprises of a trigger button located in a distant corner of the screen, once clicked, a popup or dialog appears with all of the UI components, and seldom are they as simple as an input, a button and a chat pane, they often have a couple of other controls, for additional features. They also often have rich responses, which can take the form of interactive elements that a user may interact with, perhaps buttons, with suggested quick questions or quick responses. I'll pop these in, as I don't want to be ultra basic in my implementation, I want it to look and operate like a chatbot, just an accessible chatbot.

## We need a proper page to put it on

I rarely build a page to put my demos on, but on this occasion, I feel it's kinda important, as a chat trigger button is usually in a bottom corner and last in the sequential focus order, so, it can take a massive amount of effort to get there. Sure, tabbing in reverse is a thing, but not everybody can see it, so they may only discover it right at the end, or not at all. Also, why make folk go up in reverse? I know there are shortcuts to get back to the address bar and stuff, which would obviously save having to reverse tab through all of your bookmarks and extensions and what not, but still, it doesn't hurt to add a couple of easy ways to get to the chat, does it? The page is just going to be fluff, there will be links, they won't go anywhere (other than back to the top of the page), it'll just be nonsense and only exists to highlight an issue, I'm not going to explain anything about this basic page of fluff, just the two shortcut features we will add. So, without further ado, our page:

```eex
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Boring Bob's Bonanza</title>
  </head>

  <style>
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    html {
      display: flex;
      justify-content: center;
    }

    body {
      position: relative;
      width: 88rem;
      max-width: 100%;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1.25rem;
      line-height: 1.5;
    }

    button,
    input {
      font: inherit;
    }

    p {
      margin-bottom: 1.5rem;
    }

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 2rem;
    }

    h3 {
      font-size: 1.75rem;
    }

    .skip-link {
      position: absolute;
      display: inline-block;
      padding: .375rem .75rem;
      line-height: 1;
      font-size: 1.25rem;
      background-color: rebeccapurple;
      color: white;
      transform: translateY(-1.5rem);
      transition: transform 250ms ease-in;
    }

    .skip-link:not(:focus) {
      transform: translateY(-2.75rem);
    }

    .nav {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 2.5rem;
      padding: 1.5rem 1rem;
      background-color: azure;
    }

    .nav__list {
      display: flex;
      gap: 1rem;
      list-style: none;
    }

    main {
      margin-bottom: 2.5rem;
      padding: 1.5rem 1rem;
    }

    footer {
      padding: 1.5rem 1rem;
      background-color: azure;
    }

    @media (min-width: 30em) {
      footer {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
      }
    }
  </style>

  <body>
    <header>
      <a href="#main" class="skip-link skip-link--main">Skip to main content</a>
      <a href="chatTrigger" class="skip-link skip-link--chat">Skip to chat-button</a>
      <nav class="nav">
        <ul class="nav__list">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Why?</a></li>
        </ul>
      </nav>
    </header>
    <main id="main">
      <h1>Hi, I'm Bob</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sint ex possimus dolor ipsa eos quae, placeat tenetur similique. Et amet iste, expedita minus, incidunt nulla vel odio aut ad, sunt doloribus reprehenderit soluta quae eveniet fugit voluptate reiciendis corrupti! Facere ipsum amet eligendi corrupti harum suscipit voluptates, vitae ex?</p>
      <h2>Why do they call me Boring Bob?</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, perferendis error sapiente sint eaque, alias, nemo quod corrupti ex esse illo eveniet. Illum aperiam esse quam. Nesciunt id commodi quam minus aut a fuga molestias sequi molestiae fugiat, voluptate provident repellat quas alias fugit assumenda debitis temporibus necessitatibus qui tenetur.</p>
      <h2>What do I sell?</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, doloribus. Fugiat neque officia sapiente sit aspernatur culpa excepturi voluptate atque laboriosam consequuntur, omnis esse debitis sequi eum at impedit iusto assumenda ab dicta dolores. Amet iure praesentium earum, incidunt illum facilis. Voluptates ut, consequatur quae non corrupti ad sequi incidunt?</p>
    </main>
    <footer>
      <div class="footer__primary">
        <h2>Accessibility Statement</h2>
        <p>I gave it a good go!</p>
        <p>You can access the chat quickly with Access Key "0" <a href="https://webaim.org/techniques/keyboard/accesskey">Read about Access Keys, on WebAim.</a></p>
      </div>
      <div class="footer__secondary">
        <h2>Dicount codes</h2>
        <p>Use code "BOBMYSTERY" for a mystery discount, ranging from 0.1% to 1%</p>
      </div>
    </footer>
  </body>
</html>
```

So, the only bit of note in the above code block is the shortcut to the chat widget, a 'skip to chat' link, that does exactly what it says on the tin (well, it will do when there is a chat trigger).

Just for this basic page, I've combined CSS and HTML into the same file, as nobody is going to want to use it.

We will pop in an additional shortcut, some of you may know where this is going, all will be revealed.

## Let's build the trigger button

No progressive enhancement on this one, I'm afraid, sure we could get the chat to open and stuff, but then what? Maybe it's possible with some fancy backend stuff?  I honestly don't know, that's not a neck of the woods I like to venture in. I would of course provide an alternative contact method, so phone, email, socials, whatever and the user can choose one of those if JS is something they have turned off.

We already have `position: relative`; on our `<body>` element, that's all we need to stick this in a bottom corner, so let's get the HTML written.



```ecr
<button class="chat__trigger" aria-expanded="false" aria-haspopup="dialog" id="chatTrigger" accesskey="0">
  <span class="chat__trigger-label">Chat</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" aria-hidden="true" focusable="false" class="chat__trigger-icon">
    <path xmlns="http://www.w3.org/2000/svg" d="M 5.355469 23.789062 C 5.777344 24.210938 5.988281 24.796875 5.929688 25.390625 C 5.789062 26.746094 5.523438 28.085938 5.132812 29.390625 C 7.925781 28.742188 9.628906 27.996094 10.402344 27.605469 C 10.839844 27.382812 11.347656 27.328125 11.820312 27.457031 C 13.183594 27.820312 14.589844 28.003906 16 28 C 23.992188 28 30 22.386719 30 16 C 30 9.613281 23.992188 4 16 4 C 8.007812 4 2 9.617188 2 16 C 2 18.9375 3.234375 21.660156 5.355469 23.789062 M 4.371094 31.597656 C 3.894531 31.691406 3.421875 31.777344 2.945312 31.855469 C 2.542969 31.921875 2.238281 31.503906 2.398438 31.132812 C 2.574219 30.714844 2.738281 30.289062 2.886719 29.859375 L 2.890625 29.839844 C 3.386719 28.398438 3.792969 26.742188 3.941406 25.199219 C 1.484375 22.738281 0 19.519531 0 16 C 0 8.269531 7.164062 2 16 2 C 24.835938 2 32 8.269531 32 16 C 32 23.730469 24.835938 30 16 30 C 14.414062 30.003906 12.835938 29.796875 11.304688 29.386719 C 10.265625 29.914062 8.027344 30.871094 4.371094 31.597656 "/>
  </svg>
</button>
```

Naturally, we want a button, as it will do button things, as opposed to link things, I'll just go over the bits I have done:

* I have an ID that matches the one I set for the Skip to Chat link, so that woulks now
* I have added an `accesskey="0"` attribute, I genuinely do not know which specific key is best to use, here, there is certainly an argument for some consistency across the web, but finding websites with accessible chatbots is somewhat taxing, to say the least. I have gone for "0" as I quite unashamedly went on Adrian Roselli's site, knowing he has implementted Access Keys, and just looked at what characters he was using. He uses "0" for the accessibility statement, I have used that for chat, only because is appears a safe key to use, please, do your own research and don't forget to tell users which key it actually is, I'll add a slight modification to ours, shortly
* I have a text node which is both exposed and visible, this provides the accessible name (AccName) "Chat", as, errm, that's what it is, right? No faffing about with ARIA and I'm not adding any hidden text in there
* I have an SVG icon, just a typical chat bubble I scrounged from the web, I've hidden it from AT, as it serves no purpose, it's purely aesthetic and nobody needs repeating content, nobody needs repeating content, sorry 

<div class="callout__info"><span class="callout__icon"><strong class="visually-hidden">Info: </strong></span><span class="callout__text">In the interests of transparency, I initially added aria-haspopup="dialog", but then removed it, after reading through the entirety of a 5 year old W3C GitHub issue, I removed it, as initially screen readers such as JAWS did not announce it was a dialog, then they fixed it, but then the group decided it should not be used in that context. For my demo, "Chat" is perhaps sufficiently obvious, but if you have a chatbot that has a human name, like "Dave" or "Maggie", then I think visually hidden text is the only option you have, such as "Dave, opens chat window", or whatever. I don't particularly like that approach, as I'd rather just have one button and I know not to change the AccName, *insert shrug emoji. Also, I know that VoiceControl on MacOS will only do something if the user knows the full AccName, which of course they won't if we hide part of it. But I totally understand the W3C has to battle with getting many vendors to implement things in a consistent manner and that appears to be the boss fight part of the role.</span></div>

That's that, I'll pop the CSS below, I'm not doing a line-by-line explanation for that, I'll just outline a few key bits

```css
.no-js .chat__trigger,
.no-js .chat__panel {
  display: none !important;
}

.chat__trigger {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px solid rebeccapurple;
  border-radius: 50%;
  padding: .25rem;
  height: 5rem;
  width: 5rem;
  font-weight: 600;
  color: #fff;
  background-color: rebeccapurple;
  box-shadow: -4px 4px 3px 1px rgba(0,0,0,0.4);
  cursor: pointer;
  z-index: 10;
}

.chat__trigger:focus-visible {
  outline: 3px solid rebeccapurple;
  border-color: #fff;
  box-shadow: 0 0 0 0 rgba(0,0,0,0.4);
  transition: outline 300ms ease-in, border-color 300ms ease-in;
}

.chat__trigger-icon path {
  stroke: #fff;
}
```

If JS isn't available, don't show the trigger button or the panel, as they won't work and that will be boring

* Position: fixed; I've placed mine in the bottom right corner, as that seems to be convention and it is always locked to that position in the viewport, not the page, the bit that is displayed at any given time
* I added a decent focus indicator
* the rest is just styles to make it look the way it does, it's not perfect, it's not the fanciest, but we're not here for design lessons, well, if you are, you might be in the wrong place
* One issue with this, I haven't really done anything to prevent it blocking content, this will likely be a big issue on sites that have a tonne of stuff in the footer, especially on mobile or whilst zoomed. I'm not going to address that, here, but it's an easy fix, just calculate the height from the bottom of the page to the top of where the outline is, when focused, then add that as padding to the bottom of the footer, for us, that would be 99px, as:

  * We have a position of bottom: 1rem, which means 1rem (16px) from the bottom of the page
  * The height is 5rem, so 80px, we used box-sizing: border-box, so we don't need to worry about borders
  * Our outline is 3px
  * Add those all together and we get 99px, but I like to work in rems, 16 * 6 is 96px, we still need to account for the outline (although, not really necessary, but we'll add a little extra anyway, 6.5rem, should do it. yup, it doesn't look great, i'll leave you to fight your designer, I'll hold your coat. Seriously, though, the padding can be added to the body, this was just a quick and dirty fix, showing I do consider these things

## Let's make the basic chat panel

Straight into the HTML, here, as I am aware I waffle:

```eex
<dialog class="chat__panel" aria-labelledby="chatTitle" open>
  <h1 class="chat__title">Chat Assistant</h1>
  <div class="chat__upper">
  </div>
  <div class="chat__window">
  </div>
  <div class="chat__lower">
    <input type="text" class="chat__input">
    <button type="button" class="chat__submit"><span class="visually-hidden">Send</span></button>
  </div>
</dialog>
```

Quick explainer (this is incomplete):

* I'm using a `<dialog>` as I want to group all of the things together, so that relationship is evident, an expandable chat widget does have dialog-type behaviour, in that it is on the highest layer of the UI and will therefore, at least visually block elements underneath. We could go for a modal dialog, however, I'm reluctant to go down that route, there are times where I may be speaking to a customer service agent, asking for help, and I need to actually interact with the page, as they are helping me. Perhaps something I want is out of stock, perhaps they suggest a slightly different model/colour and I want to stay in the same window, but learn about their suggestion. I am only basing this on my own experiences, but being able to interact with the underlying page, whilst speaking through chat seems like something that would be common, for all mannaer of reasons, right? The chat is self-contained, it can and should stay current, be functional and not lose state or data, across p
* A `<dialog>` needs a name, so I've added an `aria-labelledby` attribute, the IDRef of which points to the dialog's main heading
