---
title: How to build an accessible chatbot
summary: Chatbots are now common place, seldom are they accessible, they are
  often designed without any considerations for people with disabilities, so
  let's fix that
author: dlee
date: 2025-07-17
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
      margin: 0;
      padding: 0;
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
    textarea {
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
      padding:  1.5rem .25rem;
      background-color: azure;
    }

    .nav__list {
      display: flex;
      gap: 1rem;
      list-style: none;
    }

    .main {
      margin-bottom: 2.5rem;
      padding: 1.5rem .25rem;
    }

    .footer {
      padding:  1.5rem .25rem 3rem;
      background-color: azure;
    }

    @media (min-width: 30em) {
      .nav,
      .main,
      .footer {
        padding: 1.5rem 1rem;;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        gap: 1.5rem;
        padding-bottom: 3rem;
      }
    }
  </style>

  <body>
    <header>
      <a href="#main" class="skip-link">Skip to main content</a>
      <a href="chatTrigger" class="skip-link">Skip to chat-button</a>
      <nav class="nav">
        <ul class="nav__list">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Why?</a></li>
        </ul>
      </nav>
    </header>
    <main class="main" id="main">
      <h1>Hi, I'm Bob</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem sint ex possimus dolor ipsa eos quae, placeat tenetur similique. Et amet iste, expedita minus, incidunt nulla vel odio aut ad, sunt doloribus reprehenderit soluta quae eveniet fugit voluptate reiciendis corrupti! Facere ipsum amet eligendi corrupti harum suscipit voluptates, vitae ex?</p>
      <h2>Why do they call me Boring Bob?</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, perferendis error sapiente sint eaque, alias, nemo quod corrupti ex esse illo eveniet. Illum aperiam esse quam. Nesciunt id commodi quam minus aut a fuga molestias sequi molestiae fugiat, voluptate provident repellat quas alias fugit assumenda debitis temporibus necessitatibus qui tenetur.</p>
      <h2>What do I sell?</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus, doloribus. Fugiat neque officia sapiente sit aspernatur culpa excepturi voluptate atque laboriosam consequuntur, omnis esse debitis sequi eum at impedit iusto assumenda ab dicta dolores. Amet iure praesentium earum, incidunt illum facilis. Voluptates ut, consequatur quae non corrupti ad sequi incidunt?</p>
    </main>
    <footer class="footer">
      <div class="footer__primary">
        <h2>Accessibility Statement</h2>
        <p>I gave it a good go!</p>
        <p>You can access the chat quickly with Access Key "0" <a href="https://webaim.org/techniques/keyboard/accesskey">Read about Access Keys, on WebAim.</a></p>
      </div>
      <div class="footer__secondary">
        <h2>Dicount codes</h2>
        <p>Use code "BOBMYSTERY" for a mystery discount, ranging from 0.1% to 1%</p>
      </div>
      <!-- Trigger button will be here -->
    </footer>
  </body>
</html>
```

So, the only bit of note in the above code block is the shortcut to the chat widget, a 'skip to chat' link, that does exactly what it says on the tin (well, it will do when there is a chat trigger).

Just for this basic page, I've combined CSS and HTML into the same file, as nobody is going to want to use it.

We will pop in an additional shortcut, some of you may know where this is going, all will be revealed.

## Let's build the trigger button

No progressive enhancement on this one I'm afraid, sure we could get the chat to open and stuff, but then what? Maybe it's possible with some fancy backend stuff?  I honestly don't know, that's not my wheelhouse, I just build the fromtend stuff, if a backend ninja tells me they can do it without JS, then great. in any instance I would of course provide an alternative contact method, so phone, email, socials, whatever and the user can choose one of those if backend isn't possible.

We already have `position: relative`; on our `<body>` element, that's all we need to stick this in a bottom corner, so let's get the HTML written.

```ecr
<button class="chat__trigger" id="chatTrigger" accesskey="0" aria-haspopup="dialog" aria-expanded="false">
  <svg class="chat__trigger-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M4.016 17.84c.316.32.476.758.433 1.203a16.33 16.33 0 0 1-.601 3c2.097-.484 3.375-1.047 3.953-1.34.328-.168.71-.207 1.062-.11 1.024.27 2.078.41 3.137.407 5.996 0 10.5-4.21 10.5-9S17.996 3 12 3 1.5 7.215 1.5 12c0 2.203.926 4.246 2.516 5.84m-.739 5.86c-.355.07-.71.132-1.07.19-.3.051-.527-.261-.406-.542.129-.313.254-.633.363-.953l.004-.016c.371-1.078.676-2.32.789-3.48C1.113 17.054 0 14.64 0 12 0 6.203 5.371 1.5 12 1.5S24 6.203 24 12s-5.371 10.5-12 10.5a13.374 13.374 0 0 1-3.52-.46c-.78.394-2.46 1.112-5.203 1.66"/>
  </svg>
  <span class="chat__trigger-label">Chat</span>
</button>
```

Naturally, we want a button, as it will do button things, as opposed to link things, I'll just go over the bits I have done:

* I have an ID that matches the one I set for the Skip to Chat link, so that is functional now
* I have added an `accesskey="0"` attribute, I genuinely do not know which specific key is best to use here, there is certainly an argument for some consistency across the web, but finding websites with accessible chatbots is somewhat taxing, to say the least. I have gone for "0" as I quite unashamedly went on Adrian Roselli's site, knowing he has implementted Access Keys, and just looked at what characters he was using. He uses "0" for the accessibility statement, I have used that for chat, only because it appears a safe key to use, please, do your own research and don't forget to tell users which key it actually is, I'll add a slight modification to ours, shortly
* I have a text node which is both exposed and visible, this provides the accessible name (AccName) "Chat", as, errm, that's what it is, right? No faffing about with ARIA and I'm not adding any hidden text in there
* I have an SVG icon, just a typical chat bubble I scrounged from the web, I've hidden it from AT, as it serves no purpose, it's purely aesthetic, the text label is all we need
* Now for the complex bit. There is an attribute `aria-haspopup`, which has about six values, one of which is dialog, on the surface, that sounds perfect, right? Well, after reading the entirety of a [six year-old ARIA issue, on GitHub](https://github.com/w3c/aria/issues/1024#issuecomment-574844836), errm, it depends. Initially this thing was not implemented consistently by browser vendors (it worked fine for `true` and `menu`), but not `dialog`. In fact, on JAWS for the most part, when it had a value of dialog, it was still reported as menu. All of those issues across all major screen readers are now resolved. But wait, at somepoint, some additional info has been added to the spec (or I missed it), whereby, aria-haspopup should only be used if there is an obvious visual indicator that something will popup, such as chevrons, arrows and ellipsises, etc. This adds what I can only describe as a bit of an unnecessary confusion for the design I am going with, I will explain why when I run through the CSS

Just to save me pasting the same code in, the HTML for the trigger button is the very last element inside the `<footer>`, so it is inside a landmark, I left a comment in the original HTML indicating my intent That's that, I'll pop the CSS below, I'm not doing a line-by-line explanation for that, I'll just outline the important bits:

```css
.no-js .chat__trigger,
.no-js .chat__panel,
.skip-to-chat {
  display: none !important;
}

.chat__trigger {
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: .5rem;
  border-top: 3px solid rebeccapurple;
  padding: .375rem 4rem .375rem .375rem;
  height: 2.25rem;
  width: 100%;
  max-width: 25rem;
  color: #fff;
  background-color: rebeccapurple;
  cursor: pointer;
  z-index: 10;
}

.chat__trigger::before {
  content: "";
  position: absolute;
  top: .75rem;
  right: 1rem;
  border-top: 3px solid #fff;
  border-left: 3px solid #fff;
  height: 1rem;
  width: 1rem;
  transform: rotate(45deg);
  transition: border-color 300ms ease-in;
}

.chat__trigger:focus-visible {
  outline: transparent;
  color: rebeccapurple;
  background-color: #fff;
  transition: color 300ms ease-in, background-color 300ms ease-in;
}

.chat__trigger:focus-visible::before {
  border-color: rebeccapurple;
}

.chat__trigger:focus-visible path {
  stroke: rebeccapurple;
  fill: rebeccapurple;
}

.chat__trigger-icon path {
  stroke: #fff;
  fill: #fff;
  transition: stroke 300ms ease-in, fill 300ms ease-in;
}

@media (25em <= width <= 39.99rem) {
  .chat__trigger {
    right: .25rem;
    border-radius: 5px 5px 0 0;
  }
}

@media (min-width: 40em) {
  .chat__trigger {
    bottom: 1rem;
    right: 1rem;
    flex-direction: column;
    gap: .2rem;
    border-radius: 50%;
    padding: .375rem;
    height: 5rem;
    width: 5rem;
    box-shadow: -1px 1px 5px 4px rgba(46, 44, 48, 0.25);
  }

  .chat__trigger:focus-visible {
    outline: 3px solid rebeccapurple;
    outline-offset: 2px;
  }

  .chat__trigger::before {
    display: none;
  }
}
```

* If JS isn't available, don't show the trigger button, the panel, or the Skip to Chat link as they won't work and that will be pointless (unless a backend ninja can get it working without JS)
* As I build things "mobile first" and consider the cramped screen "real estate" on mobile, I have not gone for a floating round button in a bottom corner, I have opted for a chat button that occupies the full width of the screen. This is because I wanted both an icon and text inside my trigger button and it occupied quite a large bit of the screen at 320px(W), sure I could make it smaller, decrease font size and all of that, but why make folk strain or struggle with small text? It's actually quite late in the guide that I am back here, having just changed this, I wasn't happy with it, it was particularly rubbish in landscape on a virtual "iPhone 5", as it covered over 1/3 of the vertical height, sure I accounted for viewport padding, but it still felt annoying and poorly designed at that viewport size, so we have a smaller button, that is fixed exactly to the bottom of the screen

  * This is where it gets confusing. So, you may notice I have created an up arrow/chevron which indicates our `dialog` will popup, I provided this visual affordance as it isn't uncommon, it makes sense and it provides users with a robust indication of what will happen: the chat will popup. So reading the spec, the guidance is to use `aria-haspop="dialog"`, as that is what we are using, remember this is a property, not a state, so should be used in conjunction with `aria-expanded`, to inform unsighted users of the current state. All good so far, right?
  * Well, I did not intend to have anything other than a circular button in the bottom right corner, which would of course contain the same text and chat bobble icon. I have no intention of adding a chevron here, as it will look too busy, it isn't something I have ever seen and a floating circle button, positioned in the bottom right hand corner, with our icon and text, seems to provide all of the visual affordances a user could need. It's a very common pattern. So, now I am doing away with the arrow, in favour of a conventional circular button, the guidance indicated I should not use `aria-haspopup`. Consider this scenarion, a low vison user that uses a screen reader, has a quick tab through our page, they hear the information that this button is collapsed and has a dialog. They then zoom in enough to trigger the mobile view, the buttons shape and position change, but it is by no means anything drastic, it's still obviously the same control. Only now they focus on it, they have no idea it will open a dialog and there is no state, either
  * What do we do here? Sure, I am buiding this thing, I am designing (if you could call it that) and building it and I can do whatever I want regarding styles and stuff. I could easily change some aspect so it displays consistently (same shape, similar position) on all viewports, but that would be too easy, right? For what it is worth, I don't have any particular preference, I only changed the chat trigger to a circular button at the last hour, because it didn't feel like a very good user experience. i identified a problem, I came up with what I believe is a logical solution and now I face a conundrum. Do I use JS to remove the ARIA from the button when the viewport hits my chosen breakpoint (it's easy to do) or do i just roll with what I have, as technically, it's the same button that opens the same dialog, that does exactly the same thing across all viewports. Whilst there is no chevron for the circular button, there are affordances, albeit more discreet. The shape, floatiness, position, size, icon, text, shadow all make it visually obvious what will happen. It's obvious because these things are popping up (sigh) everywhere, users learn from sites, they have expectations, they expect things to work similarly ocross all sites. Due to the ubiquitous nature of this pattern, the majority of users will expect a panel of some description to pop up, within said panel, they can ask questions and receive answers
  * I'm going to apprehensively leave the attributes in. As this particular ARIA is only going to be communicated to screen reader users (it isn't going to affect anybody else) and I honestly do not know what to do for the best, here, logic says that nothing materially changes, some minor visual changes occur, but the functionality is identical and being consistent across our UIs helps meet user expectations. This is by no means me decididing what is best, I just find the attribute to be a little confusing and I'm certainly not a "know it all", but I do have decent reading comprehension and I haven't just designed a new pattern that doesn't exist elsewhere, because it does exist. So, I'm gonna stick with what I have, as always, I'm happy to discuss or even be schooled by a screen reader user or ARIA afficionado, my intent is to provide a consistent UI, the spec I rely on cannot cover pattern, so I am left in what appears to be a grey area. It does not fail any SC, however, its use may be superfluous or overly verbose and I cannot reach out to a bunch of screen reader users to get the only opinion that actually counts, so, I'm leaving it as is, I'm doing so with the best intentions and I'm more than happy to be schooled
* I added a decent focus indicator (colour inversion)
* The rest is just styles to make it look the way it does, it's not perfect, it's not the fanciest, but we're not here for design lessons, well, if you are, you might be in the wrong place
* One potential issue that I have crudely "solved" is I have added an extra bit of `padding` to the `<footer>`'s bottom, which ensures a user can scroll down a little further, so the position: fixed; trigger button does not obscure any content at all

## Let's make the basic chat panel

Straight into the HTML, here, as I am aware I waffle:

```eex
<dialog class="chat__panel" aria-labelledby="chatTitle" open id="chatPanel">
  <div class="chat__upper">
    <h1 class="chat__title" id="chatTitle">Chat Assistant</h1>
    <button class="chat__settings-btn"><span class="visually-hidden">Settings</span></button>
    <button class="chat__close-btn" id="chatCloseBtn"><span class="visually-hidden">Close</span></button>
  </div>
  <div class="chat__window" role="log" aria-labelledby=”cLog”>
    <h2 class="chat__window-title" id="cLog">Chat log</h2>
  </div>
  <div class="chat__lower">
    <label class="chat__input-label" for="chatInput">Ask us anything...</label>
    <textarea type="text" id="chatInput" class="chat__input"></textarea>
    <button type="button" class="chat__submit"><span class="visually-hidden">Send</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 32 32">
      <path d="M10.648 29.523a.517.517 0 0 0 .809.426l3.563-2.43-4.372-2.085ZM31.832 2.098a.517.517 0 0 0-.578-.086L.512 17.094a.912.912 0 0 0-.512.828.922.922 0 0 0 .52.82l8.105 3.86 16.2-13.317L10.632 23.56l10.094 4.808a.908.908 0 0 0 1.242-.488l9.996-25.211a.513.513 0 0 0-.133-.57Zm0 0"/>
    </svg>
  </button>
  </div>
</dialog>
```

Quick explainer:

* I'm using a `<dialog>` as I want to group all of the things together, so that relationship is evident, an expandable chat widget does have dialog-type behaviour, in that it is on the highest layer of the UI and will therefore, at least visually block elements underneath. We could go for a modal dialog, however, I'm reluctant to go down that route, there are times where I may be speaking to a customer service agent, asking for help, and I need to actually interact with the page, as they are helping me. Perhaps something I want is out of stock, perhaps they suggest a slightly different model/colour and I want to stay in the same window, but learn about their suggestion (I appreciate this is problematic on a phone). I am only basing this on my own experiences, but being able to interact with the underlying page, whilst speaking through chat seems like something that would be common, for all mannaer of reasons, right? The chat is self-contained, it can and should stay current, be functional and not lose state or data, across pages, so a <dialog> seems like a sensible call.
* A `<dialog>` needs a name, so I've added an `aria-labelledby` attribute, the IDRef of which points to the dialog's main heading
* I have added the `open` attribute as a temporary measure, this is just so I can see the element and style it, we will remove it when we add the JS functionality
* I've added a few containers:

  * A container at the top which will hold the main heading, a text node "Chat log" for the panel, a settings button and a close button
  * A `.Chat__window `container, which has `role="log"` and an AccName, which is pointing to the "Chat log" node, this particular container will only hold the actual conversational parts of our widget, so questions, answers and quick questions, etc. The `role="log"` element needs that AccName, we don't need to display that AccName and as `aria-labelledby` completely ignores `display: none;`, etc, we'll use that, to reduce repetition, also, because I'm hoping it won't be announced as part of the spoken output of conversations, I can't see why it would be, but we'll figure that out when we get there. The reason I have used [`role="log"`](https://www.w3.org/TR/wai-aria-1.2/#log) is because it is a live region, it has an implied `aria-live="polite"` (We do not need to explicitly state it), it will announce new entries (Q&As) and it provides a meaningful sequence of the log in general. Whilst this role has several uses, it was of course designed for this usage
  * We have a `<textarea>` element in the bottom container which alllows our users to ask questions in multiline format, we'll make the height or the rows adjust up to a certain height, to assist in readability. As a question may have several lines of text and a user may want to edit something, it wouldn't be a great experience if they had to do this in a single line input. We have a `<label>`, of course, as knowing what something is actually called is probably kinda useful to users &#x1F60F . Finally there is a button with the paper aeroplane icon as an SVG, which again, is the typical icon one would expect most users to be familiar with, as it is very common, we have a visually hidden AccName in there "Send"

The above is not quite complete, honestly, I don't have a plan or design sketched out for these things, so it's likely that I may need to modify something, a little later if I discover we need something else to increase usability for everyone. Anyway, I'm going to add some basic styles, just to get it looking half-decent and like a chat widget:
