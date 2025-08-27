---
title: How to build an accessible chatbot
summary: Chatbots are now common place, seldom are they accessible, they are
  often designed without any considerations for people with disabilities, so
  let's fix that
author: dlee
date: 2025-08-27
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

I recently tested a chatbot and whilst I have no doubt the backend stuff is highly complex, particularly if it's just a computer answering the questions, I built myself a tiny prototype, just to explore the difficulty and effectiveness of my suggested solution. It wasn't overly difficult, but then I really did only build an ultra basic prototype, without styles and missing many bells and whistles. Obviously I always start any task with "How can I make this accessible?" mindset, and when I factor that in from the start, I personally find it easier,

This isn't going to be an advanced chatbot, I don't personally see the point in me wasting endless hours getting it to scrape info from other sources, so if you've stumbled across this article in the hope of finding out how to build an AI chatbot, that bit is not included, but be like everybody else here, and learn how to build an accessible chat interface. So, just to be clear, we are going to build a chatbot, which functions as it should and it should function in a way that works for everybody, it won't however, be very smart, I'm only going to have answers to a few pre set questions and a suggestion for everything else. I'll be honest here, I have absolutely zero idea how to account for certain aspects of language, typos, spelling mistakes and anything else that could result in you and me having the same question, but a different way of asking it. That's also not something I'm. going to explore as, well, the interface is my bit, I'll just fudge a few silly questions and answers as a proof of concept.

Because I felt like I needed a theme or something, for my chat bot, and I like to be a little different, were not going to be asking about fruit or cats, I'll theme it a little based upon the Terminator movies franchise, just because it seemed fun to do that, with my fake AI chatbot.

So, a chatbot typically comprises of a trigger button located in a distant corner of the screen, once clicked, a popup or dialog appears with all of the chat's UI, and seldom are they as simple as an input, a button and a chat pane, they often have a couple of other controls, for additional features. They also often have rich responses, which can take the form of interactive elements that a user may interact with, perhaps buttons, with suggested quick questions or thumbs up and thumbs down things. I'll add the thumbs up/down things, as in the wild, we're often training AI by using these, and that's what makes them so common, I guess.

## We need a proper page to put it on

I rarely build a page to put my demos on, but on this occasion, I feel it's kinda important, as a chat trigger button is usually in a bottom corner and last in the sequential focus order, so, it can take a massive amount of effort to get there. Sure, tabbing in reverse is a thing, but not everybody can see the chat trigger, so they may only discover it right at the end, or not at all. Also, why make folk go up in reverse? I know there are shortcuts to get back to the address bar and stuff, which would obviously save having to reverse tab through all of your bookmarks and extensions and what not, but still, it doesn't hurt to add a couple of easy ways to get to the chat, does it? The page is just going to be fluff, there will be links, they won't go anywhere (other than back to the top of the page), it'll just be nonsense and only exists as a placeholder page to pop the chat on. I'm not going to include the code for this, as it's largely pointless.

I have added a "Skip to chat link" at the top of the page, it acts exactly the same as a skip link, in fact, it is adjacent to one, but it is just a useful shortcut to the chat trigger.

## Let's build the trigger button

No progressive enhancement on this one I'm afraid, sure we could get the chat to open and stuff, but then what? Maybe it's possible with some fancy backend stuff?  I honestly don't know, that's not my wheelhouse, I just build the frontend stuff, if a backend ninja tells me they can do it without JS, then great. in any instance I would of course provide an alternative contact method, so phone, email, socials, whatever and the user can choose one of those ifthe  backend wizardry isn't possible.

We'd  have `position: relative`; on our `<body>` element, that's all we need to stick this in a bottom corner, so let's get the HTML written.

```html
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
* I have added an `accesskey="9"` attribute, I genuinely do not know which specific key is best to use here, there is certainly an argument for some consistency across the web, but finding websites with accessible chatbots is somewhat taxing, to say the least. I have gone for "9" as I quite unashamedly went on Adrian Roselli's site, knowing he has implementted Access Keys, and just looked at what characters he was using. He uses "9" for his Feedback Form, I have used that for chat, because it is a safe key to use, but mostly on our pretend site, this is the contact method, so the closest fit. Don't forget to tell users which key it actually is
* I have a text node which is both exposed and visible, this provides the accessible name (AccName) "Chat", as, errm, that's what it is, right? No faffing about with ARIA
* I have an SVG icon, just a typical chat bubble I scrounged from the web, I've hidden it from AT, as it serves no purpose, it's purely aesthetic, the text label is all we need, in my implementation, the chat trigger differs significantly on smaller and larger viewports, it's a full width button fixed to the bottom on smaller viewports and a typical round floaty, bottom-right corner button on larger viewports, just because of the different visuals, I hide the chat icon on smaller screens, as I thought it looked naff, obviously the text remains, though
* You may notice there is a live region present, which is outside of the chat panel, this isn't for the responses, this is for when the chatbot is closed. At least in my experience, when there is a human on the other end, often they take ages to reply on eCommerce sites, obviously they are helping multiple customers at the same time, so responses aren't instant, so I usually continue browsing whilst I await my response. In that situation, we would need both a viual indicator (badge) and an announcement for screen reader users, this is all that live region is there for
* Now for the complex bit. There is an attribute `aria-haspopup`, which has several possible values, one of which is `dialog`, on the surface, that sounds perfect, right? Well, after reading the entirety of a [six year-old ARIA issue, on GitHub](https://github.com/w3c/aria/issues/1024#issuecomment-574844836), errm, it depends. Initially this thing was not implemented consistently by browser vendors (it worked fine for `true` and `menu`), but not `dialog`. In fact, on JAWS for the most part, when it had a value of `dialog`, it was still reported as `menu`. All of those issues across all major screen readers are now resolved. But wait, at somepoint, some additional info has been added to the spec (or I missed it), whereby, `aria-haspopup` should only be used if there is an obvious visual indicator that something will popup, such as chevrons, arrows and ellipsises, etc. This adds what I can only describe as a bit of an unnecessary confusion for the design I am going with. I am adding an accordion below, which explains my rationale for using it. I'm honestly not saying you should, I just think my case requires it on smaller screens, but then on larger screens it doesn't due to my "design", so if you wish to read about that, open the accordion below and discover the inner workings of my tiny mind:

<h3 class="accordion">Rationale for aria-haspopup</h3>
        <div class="accordion__panel">
          <div>
            As I build things "mobile first" and consider the cramped screen "real estate" on mobile, I have not gone for a floating round button in a bottom corner, I have opted for a chat button that occupies the full width of the screen, fixed to the bottom. This "design" is relatively common, but not as common as the floating button. I added an extra visual affordance, a chevron, to indicate the panel will popup. The panel is a `<dialog>`, so my use of `aria-haspopup="dialog"` is legitimate, here.

The spec says the attribute SHOULD only be used if there is a visual indicator, and it includes chevrons as an example.

Now, when we view on the larger viewport, I do not show the chevron and that is a choice that I made for aesthetic purposes. Taking the wording of the ARIA 1.2 and 1.3 spec "If there is no visual indication that an element will trigger a popup, authors are advised to consider whether use of `aria-haspopup` is necessary, and avoid using it when it's not.", I am advised to consider whether it is necessary, on larger screens, here is my justification:

* The button itself is functionally identical, it does not operate any differently at all, on any viewport, it just looks a little different
* Across all viewports, the chat panel is functionally the same, it expands/pops up, it has the same roles, states and properties, they have small visual differences, but the differences stop there
* The chevron on a smaller screen is an affordance, a visual cue that informs a user that something will pop up, as the visible label is "chat", it will be clear that a chat interace will expand and/or popup into view
* The absense of a chevron on a larger screen does not actually remove this visual affordance, in my view, this is because the floating button exists on a layer which is on top of all primary content layers, it has a small shadow to appear elevated, it is fixed to the bottom-right corner, content can scroll underneath it and it contains a chat icon, in a circular button. Chat interfaces are common, users know and expect that these things will pop up and/or expand above everything else, in the top most layer. The affordance may not be as explicit as a chevron, but it is strongly implied and in my view, therefore, expected
* Consistency is a fundamental aspect of accessible web development, controls should have the same names across pages, links should be clear and consistently named, help should be consistently placed across screens, and much more. Not every screen reader user is blind, some low vision users will adjust the zoom level on a per site basis, sites with a smaller base font will be zoomed more, sites with a larger base font may be zoomed less. We would be providing two different sets of cues for 2 identical use cases if I stripped out the `aria-haspopup` property on larger screens. A user that is audibly provided that information on their laptop, at home, who then accesses later, on their phone receives an inconsistent experience, for two views that are functionally identical. This could be further complicated if the user zooms in higher on one page, then zooms out more on another, they then access the control and are given completely different ARIA information, yet nothing has actually changed
* I've added `aria-expanded` and `aria-controls` as the expanded state is ordinarily required with the `aria-haspopup` property and the `aria-controls` property is too. We could make that assumption from comboboxes and listbox menu items, etc

I'll never be as smart as some of the folk that work on standards and specs, and I'm cool with that, I'll just continue to learn and always do my best. The spec doesn't really consider my implementation, in fact, it can't account for every possible pattern. Should I be alerted to the fact a screen reader user or ideally, several screen reader users stated my usage of this is not helpful, I'd hold my hands up and make it better, equally, I would do so should an ARIA purist pull me up on it. That would of course beg the question, why does the `dialog` value even exist? I believe my implementation is correct, I researched it, a lot, I read the thread I mentioned, ARIA 1.2 and 1.3 and further searched, I tested and honestly, without personally knowing any screen reader users, I'm unsure what else I could do to validate my usage of the property, at this stage. It is only a recommendation, we haven't failed anything, not that is ever the most important aspect of accessibility, the most important bit to me, is always people.

If you use those attributes, please do so with a little caution, if you think I am wrong and wish to school me, please do get in touch, our email address is at the bottom of each page.
          </div>
        </div>

I'm not going to provide the CSS, here and my justification for that is I made the mistake of not planning out the component. I changed many things, added multiple new features and generally made a mess of my CSS, so I don't want to show it off. I say that, but there will of course be a CodePen and all of the code is there, even though it isn't pretty.

## Let's make the chat panel

Straight into the HTML, here, as I am aware I waffle:

```html
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
    <fieldset class="chat__confirm-panel" id="confPanel">
      <legend>Are you sure you want to delete this chat?</legend>
      <button class="chat__confirm-btn" id="confirmYes">Yes</button>
      <button class="chat__confirm-btn" id="confirmNo">No</button>
    </fieldset>
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

* I'm using a `<dialog>` as I want to group all of the things together, so that relationship is evident, an expandable chat widget does have dialog-type behaviour, in that it is on the highest layer of the UI and will therefore, at least visually block elements underneath. We could go for a modal dialog, however, I'm reluctant to go down that route, there are times where I may be speaking to a customer service agent, asking for help, and I need to actually interact with the page, as they are helping me check or locate something. Perhaps something I want is out of stock, perhaps they suggest a slightly different model/colour and I want to stay in the same window, but learn about their suggestion (I appreciate this is problematic on a phone). I am only basing this on my own experiences, but being able to interact with the underlying page, whilst speaking through chat seems like something that would be common, for all manner of reasons, right? The chat is self-contained, it can and should stay current, be functional and not lose state or data, across pages, so a `<dialog>` seems like a sensible call.
* A `<dialog>` needs a name, so I've added an `aria-labelledby` attribute, the IDRef of which points to the dialog's main heading
* I've added a few containers:

  * A container at the top which will hold the main heading, and two buttons, one to minimise the chat, and one to delete the chat. I felt the Delete button to be important, there are tonnes of reasons why a user may wish to delete their chat history, surprise birthday presents, privacy, safety, whatever
  * As Delete chat is a destructive action, we don't want to insta-delete everything, as sometimes buttons are hit by mistake. I'm not one for ads and other intrusions, I block everything I can, but those ones that get through often cause the page to jump around, I "accidentally" accept cookies sometimes, as I was attempting to click something, and bang, what a coincidence, the "Accept all cookies" button popped up exactly where the main call to action is (if I were a sceptic, which I am, I would say that is absolutely intentional from some shady developers/product teams, they know what they are doing, but I delete my cookies anyway). So, we have a small disclosure that asks if the user is sure they want to delete all of the chat, with a Yes and No button, we wrap those in a fieldset as they are of course related
  * A `.Chat__window`container, which has `role="log"` and an AccName, which is pointing to ta visually hidden heading, this particular container will only hold the actual conversational parts of our widget, so questions, answers and quick responses/suggestions, etc. The `role="log"` element needs that AccName, we don't need to display that AccName and as `aria-labelledby` completely ignores `display: none;`, etc, we'll use that, to reduce repetition. The reason I have used [`role="log"`](https://www.w3.org/TR/wai-aria-1.2/#log) is because it is a live region, it has an implied `aria-live="polite"` (We do not need to explicitly state it), it will announce new entries (Q&As) and it provides a meaningful sequence of the log in general. Whilst this role has several uses, it was of course designed for this usage. I have also added a `tabindex="0"` to this element, as that enables a keyboard user to scroll the region, as it will have overflow after a couple of responses
  * We have a wrapper that wraps the input field and `<button>`, this is just for styling purposes
  * We have a `<textarea>` element in the bottom container which alllows our users to ask questions in multiline format, we'll make the height or the rows adjust up to a certain height, to assist in readability. As a question may have several lines of text and a user may want to edit something, it wouldn't be a great experience if they had to do this in a single line input. We have a `<label>`, of course, as knowing what something is actually called is probably kinda useful to users. Finally there is a button with an SVG paper aeroplane icon, which again, is the typical icon one would expect most users to be familiar with, as it is commonplace, we have a visually hidden AccName in there "Send"

<div class="callout__warn"><span class="callout__icon"><strong class="visually-hidden">Warning: </strong></span><span class="callout__text">If you are brave enough to delve into my messy CSS, you will discover I have used the `field-sizing` CSS property, which increases the height of the input, when new lines of text are added, up until the hard limit I set on the element itself. This is to save me adding that functionality with JavaScript, it does not work in Firefox or Safari, at this moment in time (no surprises there), it is available in Safari Technology Preview, at the time of writing, so presumably, it will be supported in regular Safari before the next mass extinction event</span></div>

Just because I'm quite dull, I called our chat widget AISHA, as yup, you guessed it, it begins with AI. I ddn't put too much thought into this, but Artificial Intelligence Should Have Accessibility was the best I could come up with. I know it's not the AI that should have it in this case, just the widget, but I felt like I had to have some thinly veiled dig at the majority of these widgets.

### The base JavaScript

I'm going to do this a little differently, in that I will put the core JS here, the stuff that gets it to open and closes it, but there really is little point in me hogging most of this page with redundant JS and even CSS, as I have done a lot of "spoofing", by just making it work like a chat widget, so that code is pretty useless outside of this demo.. It will of course all be on the CodePen, as there will be a functional example. For my purposes, this is literally proof-of-concept/prototype, my code is messy, I'd build it much better next time, I would of course plan it out, which makes building it a lot more logical. Anyway, here's the core bits of code:

```javascript
// Some variable for reuse

const chatTrigger = document.getElementById('chatTrigger');
const chatPanel = document.getElementById('chatPanel');
const questionInput = document.getElementById('chatInput');
const msgBox = document.querySelector('.message__container');
const chatWindow = document.querySelector('.chat__window');
const chatLabel = document.querySelector('.chat__trigger-label');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatDeleteBtn = document.getElementById('chatDeleteBtn');
let typingTime = 3000;
let aishaTyping = false;
let cIdx = 1;
let disableSend = false
let currTime = new Date();
let screenWidth = window.matchMedia('(width <= 39.99em)');
let smallViewport = screenWidth.matches;


// Handle the clicks on the trigger, delegate to the open or close function
// based upon the crrent state of aria-expanded
chatTrigger.addEventListener('click', () => {
  if (chatTrigger.getAttribute('aria-expanded') === 'false') {
    openChat()
  } else {
    closeChat()
  }
})

// Open the chat, if it's the first time, call the welcome() function
// Check for a notification, if it's there, remove it
const openChat = () => {
  chatTrigger.setAttribute('aria-expanded', 'true');
  chatPanel.show();

  questionInput.focus();
  document.body.setAttribute('data-chat', 'open');
  msgBox.innerText = '';
  if (chatWindow.hasAttribute('data-notification')) {
    document.querySelector('.chat__badge').remove();
    chatLabel.innerText = 'Chat';
  }
  if (chatPanel.hasAttribute('data-clean')) {
    welcome();
  }
}

// Close the chat
const closeChat = () => {
  chatTrigger.setAttribute('aria-expanded', 'false');
  document.body.setAttribute('data-chat', 'closed');
  chatPanel.close();
}

chatCloseBtn.addEventListener('click', () => {
  closeChat();
})

// Handle clicking on the delete button, which just shows the confirm actions
chatDeleteBtn.addEventListener('click', () => {
  chatDeleteBtn.getAttribute('aria-expanded') === 'false' ? chatDeleteBtn.setAttribute('aria-expanded', 'true') : chatDeleteBtn.setAttribute('aria-expanded', 'false')
})

// Handle the confirm buttons and call the deleteChat() function if Yes was clicked
document.querySelectorAll('.chat__confirm-btn').forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    if (evt.target.id === 'confirmYes') {
      deleteChat();
    }
    chatDeleteBtn.setAttribute('aria-expanded', 'false');
    chatDeleteBtn.focus();
  })
});

// Delete everything, set chat back to initial state
const deleteChat = () => {
  chatBubbles.innerHTML = '';
  cIdx = 1;
  questionInput.value = '';
  questionInput.focus();
  questionSendBtn.removeAttribute('disabled');
  disableSend = false;
  aishaTyping = false;
  chatWindow.removeAttribute('data-rich-response');
  chatPanel.setAttribute('data-clean', '');
  welcome();
}

// Listen for any changes to the viewport size, we are only interested in large or small
screenWidth.onchange = (evt) => {
  if (evt.matches) {
    smallViewport = true;
  } else {
    smallViewport = false;
  }
}

// If a user is viewing on a smaller viewport, the panel covers the screen, so after a small
// delay, I'm auto closing the panel if they tab out, but only on smaller screens
chatPanel.addEventListener('focusout', (evt) => {
  if (document.body.getAttribute('data-chat') === 'open' && smallViewport) {
    if (chatPanel.contains(evt.relatedTarget)) return;
    setTimeout(() => {
      closeChat();
    }, 1500);
  }
})

// Close the panel if a user presses Esc
// if there focus is inside the panel when they press Esc, move it to the trigger, else, leave it wherever it is
window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && document.body.getAttribute('data-chat') === 'open') {
    if (document.activeElement.closest('.chat__panel')) chatTrigger.focus()
    closeChat();
  }
})
```

### Functionality

* Pressing <kbd>Enter</kbd> whilst focus is within the input, will submit the question, so no need to tab to the Send button
* I have implemented a fake delay for responses, each response takes three seconds (with one exception)
* During the delay, a typing indicator appears, with hidden text "AISHA is typing", this is announced as it is within the `role="log"` region. rememeber a computer response could in theory be near instantaneous, whereas a human may take time to type their response
* I have done somethings slightly unconventional, as this is a basic implementation:

  * Only one question can be submitted at once, the button will not send a second question until a response has been received, this is something that is somethimes prevalent when you go through the virtual assistant parts of a chat, which then ultimately directs you to the correct type of human agent, etc. Obviously this would be a silly choice on an instant messaging widget, as they are not turn-based exchanges. The only reason I have gone down this route is because I wanted to keep it simple(ish), I'd have to build a message queue and a response queue, a user could in theory be like my child when she's trying to grab my attention and send 163 one word messages, in a barrage of rapid annoyance, that will each say "Dad", then when I finally have chance to type my reply "Yes x", she will then say "What time is tea\[dinner]", I was literally in the kitchen, making it, it took me about 12 seconds to get to my phone and from upstairs she sends 100s of messages in that 12 seconds (insert_eye_roll_emoji). So, unless your widget is turn-based, which is rare, don't fudge it, like me
  * Because I have enforced a turn-based approach, my exchanges are within landmarks, the AccName of which is the user question (which is a `<h3>`, because much like an FAQ, that's pretty conventional). That will only really work for turn-based, otherwise it'll end up a mess when the sequence of questions/responses is not linear. We could of course auto-quote questions adn then build a response with that quote as the heading question, with the response below, although wether this is a good idea would need further investigation and testing. Not all chat widgets are for questions and responses, so for an instant messaging platform a landmark would not be a sensible option, but some form of heading structure would enable a screen reader user to bring up the Rotor/Elements panel and search for things based upon headings. I looked at many chatbots, most were trash, the MS Teams (Web GUI) chat does use headings, for all chat bubbles which are `<h4>` elements. Some smart folk work at MS, I have to assume these smart folk have had some input in Teams and this is a good idea? Who knows, though.
  * I have added a date, then only for user questions I have added a time, in reality, this could be better, we could add the date for each new day, then the time for all messages
  * I add in visible text, "AISHA" and "You" to the corresponding messages, it's all fine and well, sticking to convention and using visual affordances to indicate who said what, but blind people cannot see those, so
  * When an agent response includes Quick Responses "Yes" or "No" type buttons, etc, those buttons will the be removed from the panel and turned into text replies
  * There is one question which I have multiplied the response time by three, so it will take nine seconds, this is just to give you a chance to close the chat panel and see or hear the notification, it only works for this one question
* I have added a soft dismiss, so pressing <kbd>Esc</kbd> whilst the panel is open will close it. If focus is within the panel, we need to manage that, so we send it to the only logical place, the trigger element. We don't want to interfere with focus if a user is elsewhere on the page, though, so we just leave it in situ. A user may have focused on something under the panel, they press <kbd>Esc</kbd>, to close it, we don't want to hijack focus and force our user into finding their place gain, so the only thing we do, is close it
* Pressing the Send button will return focus back to the input if and only if the user actually submitted a question
* We scroll the agent response into view, so it can be seen

### Styling considerations

I'll just summarise what I have done with styles, as the file ended up unwieldy, so again, the actual file will be on the CodePen.

* We need a focus indicator on all interactive elements
* I have made several visual changes to indicate the difference between user messages and agent responses:

  * Agent responses are green, user questions blue
  * User questions have bold text
  * Agent responses are left-aligned speech bubbles, user questions are right-aligned bubbles
* All contrast for icons and text is compliant

### Mobile considerations

We used the `<dialog>` element to create a non-modal dialog and I explained my reasoning for that, as it's useful to be able to interact with the page whilst communicating with the chat agent or the computer impersonating an agent. I mentioned earlier that this isn't really feasible on a mobile, as there simply isn't enough screen to display the widget and the page, together. Obviously we know that "mobile" is just a common term for smaller viewport size and we know that users on larger displays may zoom the viewport and trigger the "mobile" view. As our widget will cover the whole screen up to a certain breakpoint, what value does it have if it remains open, when a user tabs out? I can't think of any, so I have implemented an auto-close feature, only when the screen is "small", because otherwise a sighted keyboard user isn't going to be able to track keyboard focus and they'd need to close it to interact with the page, anyway. i do this after a small 1.5s delay. I'm definitely not precious, here, maybe there is a better way? This only happens when we detect the viewport as being "small", as it makes sense to leave it open on larger displays.

## The CodePen

This has taken a significant amount of time and research, I've looked at dozens of chat widgets, tested with screen readers and other AT, and I failed to plan, so I found myself shoehorning functionality in, adding new stylistic elements and honestly, my code feels pretty gross, I'm ashamed, but at this stage, I cannot justify refactoring it all, as I have several tasks on my backlog, unrelated to MTA. That being said, this is a primer, it's intended to open discussion between teams, and provide a decent starting point for a better implementation, I have explained how some things would not work in many situations and there is definitely no one-size fits all approach for chat widgets, the internal structure and semantics will vary depending on application. 

It will likely be possible to break this, or get it acting a little odd. So, so you can test, I will provide the questions that are set to provide a response, each is case insensitive and the question mark isn't required:

* Do you know everything?
* What is your end goal?
* Do you run on ChatGPT? (The respnse to this question is nine seconds, which should give you chance to get the notification, so close the panel to experience that)
* Are you a danger to humanity? (This question will trigger a more interactive conversation, where quick responses/questions are presented as buttons, click these, to arrive at one of two potential Gifs. Clue, the thumbs for like and dislike will present a different Gif)
* Any question other than those above, will provide a conceited response, from our not too-friendly AI, this response will also be provided for basic stuff, like typos and incomplete questions, etc

<iframe height="300" style="width: 100%;" scrolling="no" title="Accessible chat widget prototype (do not copy)" src="https://codepen.io/LDAWG-a11y/embed/preview/KwdBEVB?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">

  See the Pen <a href="https://codepen.io/LDAWG-a11y/pen/KwdBEVB">

  Accessible chat widget prototype (do not copy)</a> by LDAWG-a11y (<a href="https://codepen.io/LDAWG-a11y">@LDAWG-a11y</a>)

  on <a href="https://codepen.io">CodePen</a>.

</iframe>

## Wrapping up

Well, we will just file this one under "We had a stab at it" We got a lot correct, we had to make one or two major assumptions along the way and we also had to limit the functionality a little, in order to demo it. This wasn't because it is too complex, it's because we would need to have a more advanced model for messages, we would need to allow continuous exchange, allow a barrage of questions and then store those and answer each one in sequence. That isn't overly difficult, but it would be time-consuming and also, it would make my code more awful (if that's possible). I would really need to refactor this, before I added any additional complexity, and hopefully I can come back to this at some point and give this a good tidy up.

The core functionality of this works well, that was the easier part, as we didn't attempt to interpret questions to allow for some marging of language differences, our attempt is quite limited and flaky. We also limit it to a turn-based exchange, a choice I made to just demo something that works for one particular use case, but the use of landmarks would not be ideal for anything without such a limit.

We added a small delay to responses, to show the typing indicator and announce that the agent is typing, we could of course have just sent them straight away, but typing indicators are conventional on even AI chats, as they like to give off human characteristic vibes, for whatever reason.

So, please do only take this example as a starting point, there are kinks to iron out, discussions to be had and of course, above all, user testing with those folks who matter most
