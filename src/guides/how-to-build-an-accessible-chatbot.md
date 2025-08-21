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

I'm not going to delve too deeply into my opinions on AI, sure, it has its uses in some scenarios, but ultimately it's not something I'm overly keen on, I'd much rather speak to a person than get a response devoid of human characteristics. I also prefer my responses to be accurate, not "best matched" based upon wherever the "AI" scraped that response from. Anyway, this isn't an article about AI, not all chatbots are AI, most chatbots are in fact, just poorly marked up, which presents a huge barrier for folks with disabilities.

I recently tested a chatbot and whilst I have no doubt the backend stuff is highly complex, particularly if it's just a computer answering the questions, I built myself a tiny prototype, just to explore the difficulty and effectiveness of my suggested solution. It wasn't overly difficult, but then I reall did only build an ultra basic prototype, without styles and missing some bells and whistles. Obviously I always start any task with "How can I make this accessible?" mindset, and when I factor that in from the start, I personally find it easier,

This isn't going to be an advanced chatbot, I don't personally see the point in me wasting endless hours getting it to scrape info from other sources, so if you've stumbled across this article in the hope of finding out how to build an AI chatbot, that bit is not included, but be like everybody else here, and learn how to build an accessible chat interface. So, just to be clear, we are going to build a chatbot, which functions as it should and it should function in a way that works for everybody, it won't however, be very smart, I'm probably going to only have answers to a few questions and a suggestion for everything else. I'll be honest here, at this stage, I have absolutely zero idea how to account for certain aspects of language, typos, spelling mistakes and anything else that could result in you and me having the same question, but a different way of asking it. That's also not something I'm. going to explore as, well, the interface is my bit, I'll just fudge a few silly questions and answers as a proof of concept.

So, a chatbot typically comprises of a trigger button located in a distant corner of the screen, once clicked, a popup or dialog appears with all of the chat's UI, and seldom are they as simple as an input, a button and a chat pane, they often have a couple of other controls, for additional features. They also often have rich responses, which can take the form of interactive elements that a user may interact with, perhaps buttons, with suggested quick questions or thumbs up and thumbs down things. I'll pop add the thumbs up/down things, as in the wild, we're often training AI by using these, and that's what makes them so common, I guess.

## We need a proper page to put it on

I rarely build a page to put my demos on, but on this occasion, I feel it's kinda important, as a chat trigger button is usually in a bottom corner and last in the sequential focus order, so, it can take a massive amount of effort to get there. Sure, tabbing in reverse is a thing, but not everybody can see the chat trigger, so they may only discover it right at the end, or not at all. Also, why make folk go up in reverse? I know there are shortcuts to get back to the address bar and stuff, which would obviously save having to reverse tab through all of your bookmarks and extensions and what not, but still, it doesn't hurt to add a couple of easy ways to get to the chat, does it? The page is just going to be fluff, there will be links, they won't go anywhere (other than back to the top of the page), it'll just be nonsense and only exists as a placeholder page to pop the chat on. I'm not going to include the code for this, as it's largely pointless.

I have added a "Skip to chat link" at the top of the page, it acts exactly the same as a skip link, in fact, it is adjacent to one, but it is just a useful shortcut to the chat trigger.

## Let's build the trigger button

No progressive enhancement on this one I'm afraid, sure we could get the chat to open and stuff, but then what? Maybe it's possible with some fancy backend stuff?  I honestly don't know, that's not my wheelhouse, I just build the fromtend stuff, if a backend ninja tells me they can do it without JS, then great. in any instance I would of course provide an alternative contact method, so phone, email, socials, whatever and the user can choose one of those ifthe  backend wizardry isn't possible.

We'd  have `position: relative`; on our `<body>` element, that's all we need to stick this in a bottom corner, so let's get the HTML written.

```ecr
<footer>
<!-- footer stuff -->
  <button class="chat__trigger" id="chatTrigger" accesskey="9" aria-haspopup="dialog" aria-expanded="false" aria-controls="chatPanel">
    <svg class="chat__trigger-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M4.016 17.84c.316.32.476.758.433 1.203a16.33 16.33 0 0 1-.601 3c2.097-.484 3.375-1.047 3.953-1.34.328-.168.71-.207 1.062-.11 1.024.27 2.078.41 3.137.407 5.996 0 10.5-4.21 10.5-9S17.996 3 12 3 1.5 7.215 1.5 12c0 2.203.926 4.246 2.516 5.84m-.739 5.86c-.355.07-.71.132-1.07.19-.3.051-.527-.261-.406-.542.129-.313.254-.633.363-.953l.004-.016c.371-1.078.676-2.32.789-3.48C1.113 17.054 0 14.64 0 12 0 6.203 5.371 1.5 12 1.5S24 6.203 24 12s-5.371 10.5-12 10.5a13.374 13.374 0 0 1-3.52-.46c-.78.394-2.46 1.112-5.203 1.66"/>
    </svg>
    <span class="chat__trigger-label">Chat</span>
  </button>
</footer>
<span class="message__container visually-hidden" aria-live="polite"></span>
```

Naturally, we want a button, as it will do button things, as opposed to link things, I'll just go over the bits I have done:

* I'm positioning the trigger as the last element inside the `<footer>`, so it is locatable within a landmark
* I have an ID that matches the one I set for the Skip to Chat link, so that is functional now
* I have added an `accesskey="9"` attribute, I genuinely do not know which specific key is best to use here, there is certainly an argument for some consistency across the web, but finding websites with accessible chatbots is somewhat taxing, to say the least. I have gone for "9" as I quite unashamedly went on Adrian Roselli's site, knowing he has implementted Access Keys, and just looked at what characters he was using. He uses "9" for his Feedback Form, I have used that for chat, because it is a safe key to use, but mostly on our pretend site, this is the contact method, so the closest fit.Don't forget to tell users which key it actually is
* I have a text node which is both exposed and visible, this provides the accessible name (AccName) "Chat", as, errm, that's what it is, right? No faffing about with ARIA
* I have an SVG icon, just a typical chat bubble I scrounged from the web, I've hidden it from AT, as it serves no purpose, it's purely aesthetic, the text label is all we need, in my implementation, the chat trigger differs significantly on smaller and larger viewports, it's a full width button fixed to the bottom on smaller viewports and a typical round floaty, bottom-right corner button on larger viewports, just because of the different visuals, I hide the chat icon on smaller screens, as I thought it looked naff, obviously the text remains, though
* Now for the complex bit. There is an attribute `aria-haspopup`, which has several possible values, one of which is \`dialog\`, on the surface, that sounds perfect, right? Well, after reading the entirety of a [six year-old ARIA issue, on GitHub](https://github.com/w3c/aria/issues/1024#issuecomment-574844836), errm, it depends. Initially this thing was not implemented consistently by browser vendors (it worked fine for `true` and `menu`), but not `dialog`. In fact, on JAWS for the most part, when it had a value of dialog, it was still reported as menu. All of those issues across all major screen readers are now resolved. But wait, at somepoint, some additional info has been added to the spec (or I missed it), whereby, \`aria-haspopup\` should only be used if there is an obvious visual indicator that something will popup, such as chevrons, arrows and ellipsises, etc. This adds what I can only describe as a bit of an unnecessary confusion for the design I am going with. I am adding an accordion below, which explains my rationale for using it. I'm honestly not saying you should, I just think my case requires it on smaller screens, but then on larger screens it doesn't due to my "design", so if you wish to read about that, open the accordion below and discover the inner workings of my tiny mind:

<h3 class="accordion">Rationale for aria-haspopup</h3>
        <div class="accordion__panel">
          <div>
            As I build things "mobile first" and consider the cramped screen "real estate" on mobile, I have not gone for a floating round button in a bottom corner, I have opted for a chat button that occupies the full width of the screen, fixed to the bottom. This "design" is relatively common, but not as common as the floating button. I added an extra visual affordance, a chevron, to indicate the panel will popup. The panel is a `<dialog>\`, so my use of \`aria-haspopup="dialog"` is legitimate, here.

The spec says the attribute SHOULD only be used if there is a visual indicator, and it includes chevrons as an example.

Now, when we view on the larger viewport, I do not show the chevron and that is a choice that I made for aesthetic purposes. Taking the wording of the ARIA 1.2 and 1.3 spec "If there is no visual indication that an element will trigger a popup, authors are advised to consider whether use of `aria-haspopup` is necessary, and avoid using it when it's not.", I am advised to consider whether it is necessary, on larger screens, here is my justification:

* The button itself is functionally identical, it does not operate any differently at all, on any viewport, it just looks a little different
* Across all viewports, the chat panel is functionally the same, it expands/pops up, it has the same roles, states and properties, they have small visual differences, but the differences stop there
* The chevron on a smaller screen is an affordance, a visual cue that informs a user that something will pop up, as the visible label is "chat", it will be clear that a chat interace will expand and/or popup into view
* The absense of a chevron on a larger screen does not actually remove this visual affordance, in my view, this is because the floating button exists on a layer which is on top of all primary content layers, it has a small shadow to appear elevated, it is fixed to the bottom-right corner, content can scroll underneath it and it contains a chat icon, in a circular button. Chat interfaces are common, users know and expect that these things will pop up and/or expand above everything else, in the top most layer. The affordance may not be as explicit as a chevron, but it is strongly implied and in my view, therefore, expected
* Consistency is a fundamental aspect of accessible web development, controls should have the same names across pages, links should be clear and consistently names, help should be consistently placed across screens, and much more. Not every screen reader user is blind, some low vision users will adjust the zoom level on a per site basis, sites with a smaller base font will be zoomed more, sites with a larger base font may be zoomed less. We would be providing two different sets of cues for 2 identical use cases if I stripped out the \`aria-haspopup\` property on larger screens. A user that is audibly provided that information on their laptop, at home, who then accesses later, on their phone receives an inconsistent experience, for two views that are functionally identical. This could be further complicated if the user zooms in higher on one page, then zooms out on another, they then access the control and are given completely different ARIA information, yet nothing has actually changed

I'll never be as smart as some of the folk that work on standards and specs, and I'm cool with that, I'll just continue to learn and always do my best. The spec doesn't really consider my implementation, in fact, it can't account for every possible pattern. Should I be alerted to the fact a screen reader user or ideally, several screen reader users stated my usage of this is not helpful, I'd hold my hands up and make it better, equally, I would do so should an ARIA purist pull me up on it. That would of course beg the question, why does the \`dialog\` value even exist? I believe my implementation is correct, I researched it, a lot, I read the thread I mentioned, ARIA 1.2 and 1.3 and further searched, I tested and honestly, without personally knowing any screen reader users, I'm unsure what else I could do to validate my usage of the property, at this stage. It is only a recommendation, we haven't failed anything, not that is ever the most important aspect of accessibility, the most important bit to me, is always people.

If you use those attributes, please do so with a little caution, if you think I am wrong and wish to school me, please do get in touch, our email address is at the bottom of each page.
          </div>
        </div>

I'm not going to provide the CSS, here and my justification for that is I made the mistake of not planning out the component. I changed many things, added multiple new features and generally made a mess of my CSS, so I don't want to show it off. I say that, but there will of course be a CodePen and all of the code is there, even though it isn't pretty.

## Let's make the chat panel

Straight into the HTML, here, as I am aware I waffle:

```eex
 <dialog class="chat__panel" aria-labelledby="chatTitle" id="chatPanel" data-clean>
  <div class="chat__upper">
    <h1 class="chat__title" id="chatTitle">AISHA Chat</h1>
    <button class="chat__close-btn" id="chatCloseBtn"><span class="visually-hidden">Minimise</span></button>
    <button class="chat__delete-btn" id="chatDeleteBtn" aria-controls="confPanel" aria-expanded="false">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <path d="M10.398 14.398H12V27.2h-1.602ZM15.2 14.398h1.6V27.2h-1.6ZM20 14.398h1.602V27.2H20Zm0 0" style="stroke:none;fill-rule:nonzero;fill-opacity:1"/>
        <path d="M26.398 3.2H20V1.601C20 .715 19.285 0 18.398 0h-4.796C12.715 0 12 .715 12 1.602v1.597H5.602C4.715 3.2 4 3.918 4 4.801V8c0 .883.715 1.602 1.602 1.602v20.796c0 .887.714 1.602 1.597 1.602h17.602c.883 0 1.597-.715 1.597-1.602V9.602C27.285 9.602 28 8.882 28 8V4.8c0-.882-.715-1.6-1.602-1.6ZM13.602 1.601h4.796v1.597h-4.796ZM24.8 30.398H7.199V9.602h17.602ZM26.398 8H5.602V4.8h20.796Zm0 0" style="stroke:none;fill-rule:nonzero;fill-opacity:1"/>
      </svg>
      <span class="visually-hidden">Delete chat</span>
    </button>
    <div class="chat__confirm-panel" id="confPanel">
      <p>Are you sure you want to delete this chat?</p>
      <button class="chat__confirm-btn" id="confirmYes">Yes</button>
      <button class="chat__confirm-btn" id="confirmNo">No</button>
    </div>
  </div>
  <div class="chat__window" role="log" aria-labelledby=”cLog” tabindex="0">
    <h2 class="chat__window-title" id="cLog">Chat log</h2>
    <div class="chat__bubbles"></div>
  </div>
  <div class="chat__lower">
    <label class="chat__input-label" for="chatInput">Ask me anything...</label>
    <div class="chat__input-wrapper">
      <textarea type="text" id="chatInput" class="chat__input"></textarea>
      <button type="button" class="chat__submit" id="sendQ"><span class="visually-hidden">Send</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" focusable="false" width="32" height="32" viewBox="0 0 32 32">
          <path d="M10.648 29.523a.517.517 0 0 0 .809.426l3.563-2.43-4.372-2.085ZM31.832 2.098a.517.517 0 0 0-.578-.086L.512 17.094a.912.912 0 0 0-.512.828.922.922 0 0 0 .52.82l8.105 3.86 16.2-13.317L10.632 23.56l10.094 4.808a.908.908 0 0 0 1.242-.488l9.996-25.211a.513.513 0 0 0-.133-.57Zm0 0"/>
        </svg>
      </button>
    </div>
  </div>
</dialog>
```

Quick explainer:

* I'm using a `<dialog>` as I want to group all of the things together, so that relationship is evident, an expandable chat widget does have dialog-type behaviour, in that it is on the highest layer of the UI and will therefore, at least visually block elements underneath. We could go for a modal dialog, however, I'm reluctant to go down that route, there are times where I may be speaking to a customer service agent, asking for help, and I need to actually interact with the page, as they are helping me. Perhaps something I want is out of stock, perhaps they suggest a slightly different model/colour and I want to stay in the same window, but learn about their suggestion (I appreciate this is problematic on a phone). I am only basing this on my own experiences, but being able to interact with the underlying page, whilst speaking through chat seems like something that would be common, for all mannaer of reasons, right? The chat is self-contained, it can and should stay current, be functional and not lose state or data, across pages, so a `<dialog>` seems like a sensible call.
* A `<dialog>` needs a name, so I've added an `aria-labelledby` attribute, the IDRef of which points to the dialog's main heading
* I have added the `open` attribute as a temporary measure, this is just so I can see the element and style it, we will remove it when we add the JS functionality
* I've added a few containers:

  * A container at the top which will hold the main heading, a text node "Chat log" for the panel, a Download button and a Minimise button
  * A `.Chat__window`container, which has `role="log"` and an AccName, which is pointing to the "Chat log" node, this particular container will only hold the actual conversational parts of our widget, so questions, answers and quick responses/suggestions, etc. The `role="log"` element needs that AccName, we don't need to display that AccName and as `aria-labelledby` completely ignores `display: none;`, etc, we'll use that, to reduce repetition, also, because I'm hoping it won't be announced as part of the spoken output of conversations, I can't see why it would be, but we'll figure that out when we get there. The reason I have used [`role="log"`](https://www.w3.org/TR/wai-aria-1.2/#log) is because it is a live region, it has an implied `aria-live="polite"` (We do not need to explicitly state it), it will announce new entries (Q&As) and it provides a meaningful sequence of the log in general. Whilst this role has several uses, it was of course designed for this usage
  * We have a wrapper that wraps the input field and <button>, this is just for styling purposes
  * We have a `<textarea>` element in the bottom container which alllows our users to ask questions in multiline format, we'll make the height or the rows adjust up to a certain height, to assist in readability. As a question may have several lines of text and a user may want to edit something, it wouldn't be a great experience if they had to do this in a single line input. We have a `<label>`, of course, as knowing what something is actually called is probably kinda useful to users &#x1F60F . Finally there is a button with the paper aeroplane icon as an SVG, which again, is the typical icon one would expect most users to be familiar with, as it is very common, we have a visually hidden AccName in there "Send"

Just because I'm quite dull, I called our chat widget AISHA, as yup, you guessed it, it begins with AI. I ddn't put too much thought into this, but Artificial Intelligence Should Have Accessibility was the best I could come up with. I know it's not the AI that should have it in this case, just the widget, but I felt like I had to have some thinly veiled dig at the majority of these widgets.

The above is not quite complete, honestly, I don't have a plan or design sketched out for these things, so it's likely that I may need to modify something, a little later if I discover we need something else to increase usability for everyone. Anyway, I'm going to add some basic styles, just to get it looking half-decent and like a chat widget:

For security purposes, we will need a way to clear the chat, I'm just going to generate that with JS, as, errm, I don't really have a reason, yet.

### The base JavaScript

I'm going to do this a little differently, in that I will put the core JS here, the stuff that gets it to open and allows a message to be sent and received, but there really is little point in me hogging most of this page with redundant JS and even CSS, as I have done a lot of "spoofing", by just making it work like a chat widget, so that code is pretty useless outside of this demo, I guess. It will of course all be on the CodePen, as there will be a functional example.

### Styling considerations

I'll just summarise what I have done with styles, as the file ended up unwieldy, so again, the actual file will be on the CodePen.

### Mobile considerations

We used the `<dialog>` element to create a non-modal dialog and I explained me reasoning for that, as it's useful to be able to interact with the page whilst communicating with the chat agent or the computer impersonating an agent. I mentioned earlier that this isn't really feasible on a mobile, as there simply isn't enough screen to display the widget and the page. Obviously we know that "mobile" is just a common term for smaller viewport size and we know that users on larger displays may zoom the viewport and trigger the "mobile" view. As our widget will cover the whole screen up to a certain breakpoint, then non-modal doesn't make sense here, a partially sighted user who has zoomed in to say 400% on a display that 1280 * 1024px (as an example) will only ever see the "mobile" view. If they use a keyboard, their entire screen is going to be overlaid with the widget and they will be able to tab out of it and focus on anything below, that puts us at risk of failing to consider their needs and expectations and also fails several WCAG SCs, as focus cannot be seen, it is obscured, focus order isn't logical and intuitive and the reading order is out of sorts.

None of that is good and makes using our site and widget pretty naff for some of our users, so this is something we definitely need to avoid. We could auto-close the dialog when a user tabs out, which would certainly make things much less confusing, as then we don't have all of the issues I touched upon. I'm sure some folks will disagree and some will agree, but if something covers the entirety of the screen and has exit methods (close button <kbd>Esc</kbd> press, etc) then to me that sounds modal. I don't think it being modal for the smaller viewports is going to cause any issues, the page is essentially blocked anyway as the widget covers the entire viewport. In our implementation, messages persist, it's not like we are clearing them out when a user closes the widget, they're still there, so they can close it, check something on the page and then open the widget to resume the chat. As this seems the most logical way to do this, I'm making the `<dialog>` modal until such a point we have some usable screen, which I'm going to consider to be a reasonable chunk of space above the widget. We can't really consider the space to the side usable if some of the page contents are obscured and there is no space at the top, as then there would be no way of viewing anything under the widget. If there is some space at the top, at least a user can scroll contents into that part to read paragraphs, etc.

Whilst I am doing this, there is another consideration, the on-screen keyboard. This reduces the viewport height, thus making the availble space smaller. The keyboard can be collapsed on my devices which are an iPad and a Samsung Galaxy phone and I assume that is true for other Android devices? I don't know for sure, though, but I expect that is a pretty important design feature. I'm not going to delve into this, I have built the widget "mobile" first but I haven't extensively tested on multiple devices, as I simply don't have them. But as always, test things across a range of devices, etc.
