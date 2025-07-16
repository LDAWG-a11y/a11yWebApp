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
      transform: translateY(-3.75rem);
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
    </header>
  </body>
</html>
```

So, the only bit of note in the above code block are the two shortcuts to the chat widget:

A 'skip to chat' link, that does exactly what it says on the tin (well, it will do when there is a chat trigger)

A shortcut
