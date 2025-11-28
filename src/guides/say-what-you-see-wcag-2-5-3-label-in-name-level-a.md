---
title: Say what you see - WCAG 2.5.3 Label in Name Level A
summary: We're going to take a look at 2.5.3 Label in Name, here. The purpose of
  this requirement benefits users of speech input and requires the visible label
  be present in the accessible name
author: dlee
date: 2025-11-24
toc: false
tags:
  - ARIA
  - Assistive Technology
  - Best practice
isGuide: true
---
## Intro

Label in Name requires that the visble label be "present" in the accessible name (AccName), which seems like a super simple success crteirion (SC) to meet on the face of it, but I tend to have to fail sites on this SC pretty much every time I put my testing hat on. Let's look at this in details, let's try to understand where developers often go wrong and we'll consider how it can go wrong. 

When I was a kid growing up in the UK, there was a TV game show called [Catchphrase](https://en.wikipedia.org/wiki/Catchphrase_(British_game_show)) and today I have just learned that it was based on an American TV show of the same name, which is good as more folks may get my cheesy jokes and references. The original version was hosted by an Irish chap, a comedian named Roy Walker and the game would typically show a crudely animated image (it was the late 80s/90s) that would have an animated character Mr Chips pointing at something or otherwise acting something out to give the contestants a clue as to what the image depicted. The image would always depict a "popular" catchphrase that may be used in regular language, etc, although to me, some seemed quite obscure. The reason why I am making this reference is because Roy's primary catchphrase was always "Say what you see" and I think that fits perfectly with the intent of this SC.

## 2.5.3 Label in Name refresher

> "For user interface components with labels that include text or images of text, the name contains the text that is presented visually." 
>
> \-- WCAG

On the face of it, it really is as simple as it sounds, if we have a button which is of course a type of user interface control and that button has a name that is visible to users, then that visible name MUST be present in the AccName. On the Understanding doc it is noted that a Best Practice is to ensure the visible part of a control's AccName is front loaded, it is the beginning of the string of text that forms the overall AccName. A better Best Practice would be to ensure the visble label and the AccName are identical, although there are some situations where that may prove a challenge.

Just to be clear, if a control does not have any form of text label, this SC does not apply. We would of course need to ensure it had an AccName and if it did not, we would reach for 4.1.2 Name, Role, Value (A) or potentially 2.4.4 Link Purpose (In Context) if it were a link with no Accname, although either would work, here, what matters is it gets reported and fixed. As an example a magnifying glass on a Search input, a 'hamburger' icon on a menu button or social media icons, etc would not fail this SC, if they were icon only controls/links, as the visible label is a "universally understood icon" and this SC explicitly requires a visible text label. That text label can be actual text, SVG text or an image of text.

## Who is this SC for?

The intent of this SC is to make operation of sites for users of voice input software more predicatable and easier, in that when they see a control with a visible label called "Settings" they can simply *say what they see* and instruct their software to "Click, Settings" and as if by magic the Settings button will activate and do whatever it was supposed to do (assuming the button works properly, of course).

Labels are something the majority of us rely on, be they labels on packaged products we're buying, something we're grabbing out of a cupboard anything at all that requires us to be informed in some way about an item. That label does not always have to be just text, of course, Braille is common on some products and some products have iconography and those icons can convey some information about the product or how to use or interact with it.

In the physical world labels serve as a fundamental identifier for determining what something is, what it may contain or indeed what it does. Let's take food cans as an example, sure, there are several sizes and even a few shapes, but let's just imagine the regular sized cylindrical can that contains baked beans, etc. We may have multiple cans of this shape and style in our cupboards and for those of that look at items to identify them, we do so be recognising or reading the label (blind users may have Braille labels). Now let's say we have 20 cans of food and there are no duplicates, and let's say that some malicious Elf on the Shelf character thought it would be a good prank to remove the label from every can and swap them all over. The following day we fancy beans on toast or something, we go to the cupboard, see a can with a beans label and open it up to discover coconut milk or something. At this stage, we are unaware the pesky elf has crossed the line and messed with our food, why aren't there beans in a can which was clearly labelled "beans"? We did not do anything wrong, we used a label as an identifier, we have likely done similar thousands of times, this has never happened. Why would the beans factory have coconut milk? How are there not beans in a labelled beans can? At this point, we'd be pretty frustrated, right? We really fancy beans on toast though, so sometimes I like to think I'm a little smart (I'm not) and I'd look in the cupboard for the coconut milk, thinking maybe the beans are in that can and someone is winding me up. I open the coconut milk and kidney beans, grrr. Now I'm kinda angry, hangry, even. I just want beans on toast, but my tinned food cupboard is like an evil lucky dip, I don't want to open all 20 cans looking for beans, the odds aren't great of me finding them early on. I quit, I just have toast and butter, not what I really wanted, but the labels aren't useful, anymore.

My silly analogy demonstrates what can happen when things are labelled incorrectly. Frustration, difficulty, extra steps, disappointment and a whole host of other negative feelings, etc. Voice users encounter this on the regular, they *say what they see* after instructing their software to "click" and the expectation is that control will be activated. When nothing happens after they instruct their software to click something that is because because its  visible label is a lie and their software does not find that visible label in the accessibility tree, then what do they do? They may then have to go through additional steps, workarounds for poor  design, copy or code, or ARIA misuse. Additional effort that introduces additional challenges, additional faff and a long list of negative feelings for our user. We wouldn't put a Facebook icon as the only visual identifier for a Add to Cart button, would we? We'd take a huge sales hit if we did, right? So, why create unnecessary obstacles for voice input users? Afterall, their goals are the same, they just want to buy whatever we are selling, etc, they just access in a slightly different way than someone who is using their hands and/or fingers to operate their device.

### Where developers go wrong

Where developers often go wrong is by giving screen reader users too much information, such as visually hidden instructions and this can and often does cause an issue for voice input users. Let's take this example code:

```html
<nav>
  <img src="/logo.png" alt="ACME logo">
  <button 
    aria-expanded="false" 
    aria-controls="somePanel" 
    aria-label="Click this button to access the site navigation">
      <i class="fa-hamburger"></i>
      <span> Menu</span>
  </button>
  <div id="somePanel">
    <!-- Stuff -->
  </div>
</nav>
```

The HTML above is the starting point for a common disclosure widget, which is a `<button>` inside a `<nav>` and there is a close-by logo which is also in that `<nav>`. We can determine that accessibility has at least been considered by somebody, as we have HTML5 elements, we have the `aria-expanded` state and we even have a programmatic reference with the `aria-controls` property and a valid IDRef. We have an icon inside the `<button>` and some visible text which is "Menu", so we have met the requirements for 4.1.2 Name, Role, Value and 1.3.1 Info and Relationships. Awesome that's a great start, but there is one glaring issue.

Our old friend the Accessible Name and Description Computation (algorithm) rares its head. So whilst sighted users can see that the control is visually labelled as Menu, what they see, is technically a lie. For a person that can see the control and does not use either a screen reader or voice input software, this is  something that they will be blissfully unaware of, they will just click the button, and go about their business.

A screen reader user that has at least enough vision to make out the text and icon will get a mismatch, as what they see is not what they will hear. This is unlikely to be a showstopper (in our example), but it's still a mismatch and could cause some confusion. Unfortunately this wouldn't be the most inaccessible thing they encountered that day, as at least this will work, it's not great, but it's not functionally inaccessible.

A blind screen reader user will not be aware of the visible text, they will hear the AccName only, again, this is "inaccessible", to them, it still works, it still makes "enough" sense, but, I know that superfluous instrcuctions in AccNames will get really old, really quick for screen reader users and pretty much the entirety of that label is completely redundant, so let's break that down:

* "Click", Our screen reader user made it to your site, they don't really need to be informed on how to operate something as basic as a button, they did plenty of clicking to get to where they are
* "this button", they know it's a button, their screen reader told them that. The developer used the `<button>` element, they made sure this info would be passed to the accessibility tree and I'm sure our screen reader user does appreciate repetition, repetition (sorry)
* "to access the" implies that in its current 'unclicked' state, the site navigation is unavailable, the developer told them that already when they used `aria-expanded="false"`, so our screen reader user knows that the related panel would not be currently exposed, as the state informs them it is collapsed
* Finally, we are left with "site navigation", which is technically what it is, that would be the only bit of info they would actually need. I personally use "Menu", as it's more succinct, it's universally understood and the user would know they were in a navigation landmark, because I would have my "Menu" inside a `<nav>` element. But navigation would work fine, too, it is a little repetition, but not unnecessary repetition, but if using "navigation", then of course, the visible label must also

So, our voice users, whether they be a fan of catchphrase or not, will say what they see and absolutely nothing will happen because there is no control on the current page that has the AccName "Menu", and that info would not have been passed to the accessibility tree. So, in catchphrase terms, Roy would say his other catchphrase "It's good, but it's not right" and that will be the end of that. Now, voice input software does have alternative ways to navigate sites that have poor labels, such as "show, grid", "Show labels" or "show, numbers", I'm not going to explain these, they're extra steps, extra unnecessary steps and they absolutely are not an excuse to meet the SC.

### Why is this so, why does it happen?

Honestly, I can usually put it down to one of two things:

* A developer tried to help, they tried their best, but do not fully understand the broader scope of disabilities and WCAG and erroneously assumed screen reader users need additional instructions, for basic controls
* The framework the developer used, tried to help, but did not have a full understanding, either

There are undoubtedly a couple of more, as one example, as many folk have jumped on the AI hype train, then there will undoubtedly be instances in the wild, where AI has spewed out some not very good HTML, because, errm AI.

So, what about Best Intentions, when a developer uses the correct pattern like in my earlier HTML example, but also, they whack an `aria-label`on, for good measure? From a tester/developer perspective, I can at least understand what they were trying to achieve. In some respects, it's great that developers are "trying" to make accessible interfaces, but also, it's not great for the users that are seemingly forgotten about, in that they now have a barrier, that wouldn't have been present, had that dev just left ARIA in the toolbox.

ARIA is a very powerful tool, it's not like chip spice (A seasoning for chipped potatoes, in the US maybe there is a fries spice?) where we may just give our chips or fries a generous coating, perhaps knowing that the more spice there is, the better. The inverse is kind of true, in that the less ARIA there is, is often (not always) better, but if somebody doesn't know how to use ARIA, then, no ARIA is usually better than bad ARIA, as is often said.

So, by "trying" to help screen reader users and focusing solely on their experience, we can make the experience much worse for other groups of users, particularly voice input users. 

A knowledge of the AccName and AccDesc algorithm is a helpful tool, it is in fact built into the DevTools, so developers and testers can access an element's name calculation, this is a very useful tool to me, as I can take a screenshot and it assists with my explanation to the developers, but how does it actually work, under the hood and how many ways are there to create an AccName mismatch?

#### The AccName Computation

Fogetting the AccDesc part of this algorithm, we'll just look at the AccName part, as that is the only bit that can fail Label in Name, descriptions are supplementary and do no count.

Everything that is computed for the AccName has a power or precedence, and the one with the lowest precedence has the greater power and will ultimately be crowned the winner of the naming tournament.

Just to make my life easier, when I refer to "Contents" that is either the text content of the user interface component or the text content of whichever descendant contains text content.

If a user interface component or one of its descendants has only a title attribute as the name, then that is the AccName

If the node or a descendant has text contents and a title, then the AccName is the text contents and the title becomes the AccDesc

If the element has the previous naming conventions, and an `aria-label`, then the AccName will be the contents of the `aria-label`, irrespective of what the visible text is, the visible text no longer exists to the accessibility tree and we have our first mismatch

If all of those things above are present and we chuck `aria-labelledby` on there, with a reference to a known text node, then not only does the text label no longer exist to the accessibility tree, but the `aria-label` no longer exists, either. The AccName will become the referenced node computed from the `aria-labelledby` property, this attribute has the most power, it wins, always, it has a precedence of one, it is the Undisputed heavyweight champion of ARIA naming and no contender can take that mantle from them. `aria-label` has a precedence of two, it can only be defeated by `aria-labelledby,` but if `aria-labelledby` is not present and `aria-label` is, then `aria-label` will always win

I have taken a screenshot of the computed name from the DevTools, for the example HTML I provided earlier:

![A screenshot of the accessibility pane in Chrome's DevTools, showing the AccName computation at work](src/guideImg/dl-lin-1.png)

In the screenshot above, the computed accessibility properties are presented in the Accessibility pane. There is an order and that order is the precedence or power of possible naming methods. As this is for a button, there are five possible naming methods to be considered, let's start from the bottom:

* title: Not specified, our element does not have a title, therefore, it cannot be considered for the AccName and will not be converted to the AccDesc
* Contents: "Menu", this text has a strikethrough, meaning its lost the naming battle
* From label: Not specified, we do not have a label with a correct IDRef naming our button, so this cannot feature in the final computation
* aria-label: "Click this button to access the site navigation", ahh, this is waht defeated the "Contents", because aria-label has more power and will always win
* aria-labelledby: not specified, this heavyweight champion wasn't at this fight, so cannot be computed in the AccName

The result of the above is the `aria-label` is the AccName and the visible label is Menu. This is simply a case of don't use ARIA unless you really have to, the Contents provided a universally understood Accname and it was visible, too, so why use ARIA?

#### Visually hidden text

This one is quite rare, but i have encountered it a few times and I genuinely do not know the intent behind it, but I flagged it, nonetheless, so let's consider the following HTML:

```html
<button>
  <span aria-hidden="true">Submit</span>
  <span class="visually-hidden">Complete form</span>
</button>
```

So, in the above example we have two nodes inside a button, the first for some unknown reason has `aria-hidden="true"` present, which obviously tells all the browser wizardry to ignore the contents of that node and its descendants. So the wizardry will then look at the sibling node, which is not visible to anybody (unless they disable CSS) and will grab that to pass to the accessibility tree and that becomes the AccName. We now have a mismatch, visually the label says Submit, but programmatically the word "Submit" does not feature in the AccName as it is "Complete form", so again, it fails. The first label did not need ARIA, the second one does not need to exist, "Submit" is universally understood to mean "Complete the form (or this part of it".

### A thought process

If, just for one moment we break down what words are (this is not my wheelhouse, so bear with):

Letters are in their base form, shapes, those of us looking at letters will recognise them to be a letter and know which letter it is by its shape? Braille users will feel raised dots and know which letter it is by the position of the dots and the pattern they are in.

A word is made up of letters, for those letters to form that word, each letter must be placed in its correct position and that creates a sequence of letters that make a word? I guess using that logic, a word is a sort of shape, or its outline probably is?

So, assuming the same size font, and style, etc, the word's shape must fit somewhere in the AccName's shape, right?

Why am I rambling about shapes? Well, as letters are shapes and those shapes need to be in a correct sequence to form a word, this is a useful thought-process as to whether the visible label is in the AccName. We can consider the AccName to be the typical shape sorting cube a small child will use at home and at nursery and the visible label to be the shape they would be encouraged to slot into that cube. The shape will need to fit into the cube's cut-out, much like the visible label will need to fit inside the AccName.

![An AI-generated image of an upset toddler, the toddler is trying to get a trinagle shape into the circular cut out of the shape sorting cube. The triangle doesn't fit, as it is bigger than the circular cut out, the triangle has the word 'Menu' labelled on it, there is a label pointing to the circle that says 'Click this button to access the site navigation' and I attempted to make this connection with the button i created earlier.](src/guideImg/dl-lin-child-shape.png)

We don't actually "need" to consider this, but I thought it would be a decent thought-process, to use an image I had an idea of getting AI to create:

I wanted the shape to be an outline of the word "menu" and the cutout to be an outline of the text "Click this button to access the site navigation", but I couldn't quite get it to do exactly as I wanted (garbage in, garbage out?). I also didn't want the child to look so upset, I wanted them to look confused. Still, it works well, as a light-hearted image highlighting the child's frustration at that shape not fitting anywhere in their cube. They just want to complete their task, but poor design and lack of quality control (testing) has introduced a barrier. This is how websites with AccName mismatches are, they cause frustration, lack consideration for voice input users and have clearly not been tested properly, otherwise, they would just work.

We know that the sequence of visible characters must be present in the AccName, but just to make sure we understand that fully, let's consider some other examples:

<table>
<thead>
<tr>
<th>Visble label</th>
<tr>
</thead>
</table>

* AccName = "Click this button to access the site navigation" & Visible label = "Menu": FAIL. That sequence of letters does not feature in the Accname
* AccName = "Our fab outdoor activities" Visble label = "About": FAIL. That sequence of letters does not feature in the AccName, it sort of does, but it doesn't. the last two characters of "fab" and the first three of "outdoor" do indeed spell "about", however, the sequence is interupted by a space and that space was there to separate words, so we cannot alter the meaning of bits of chopped up words to satisfy this SC, which we wouldn't do, anyway, but it's just an example
* AccName = "Site Menu" & Visible label = "Menu": Pass. The word "Menu" is present in the AccName, so this techically passes (it's not a best practice though)
* AccName = "Profile Menu" & Visible label = "Profile": PASS. The word "Menu" is featured in the AccName and the visible label features first (WCAG Best Practice)
* AccName = "Username" & Visible label = "Username": PASS. This would be an actual "Best Practice", as say what you see would work perfectly here

Does letter case matter? is "menu" the same as "Menu" or even "MENU"? I am by no means an expert, here, but, in my experience "menu" and "Menu" do not matter, because how would the software know I was pronouncing a word with a capital M at the beginning, verses one that doesn't and vice versa? This is something that WCAG also note in the Understanding Document, in that, the first letters of words capitalised does not matter. It does not seem to mention whether all caps matters, and I suspect that this could be due to an all caps word can sometimes effect the meaning in human language? I have never personally experienced an issue where the letters being all in uppercase in the AccName have caused an issue because the software has interpreted it as an initialism/acronym, etc. Voice input software isn't my usual input modality, I do use it for testing, but beyond that, I don't use it, so my experience is quite limited. I know that sometimes screen readers will output initialisms/acronys as opposed to the word, as they would parse it as the initialism/acronym, so whilst I cannot say for certain whether this is an issue or not, always err on the side of caution and follow WCAG's advice "When in doubt, where a meaningful visible label exists, match the string exactly for the accessible name".

So the key takeaway here is that the sequence of letters, as presented visually, MUST appear in that exact same order in the AccName. Whilst we do not typically pronounce punctuation, we do provide other audible cues to indicate it, such as short or longer pauses for commas and full stops (periods), respectively, we do not ask a question like this "do we, question mark" so these can be ignored, as can other punctuation symbols, such as colons, ellipses and what not, which is also mentioned in the Understanding Document. A space is a form of punctuation and whilst it does interupt a string, it does not necessarily change the meaning. It's quite common that company names are two or more words with no space, even product names are and they often use kebab case (hyphenated words) or Pascal case (no spaces, each word starts with a capital, including the first word). Let's take the example of VoiceOver, a prime example of Pascal case for Apple's screen reader, let's consider this link:

```
<a href="https://support.apple.com/en-gb/guide/voiceover/welcome/mac" aria-label="VoiceOver">Voice Over</a>
```

Using Voice Control, should I command "Click, Voiceover" (as I ordinarily would), it works as expected, as that space has not affected the meaning. People do not all speak at the same speed, so the software seemingly accounts for this, to an extent. Should I increase the pause between words, though, nothing happens. I am saying what I see, in that i am leaving a pause between two words, as that is exactly what I see. Let's see how the inverse works, with the following code

```
<a href="https://support.apple.com/en-gb/guide/voiceover/welcome/mac" aria-label="Voice Over">VoiceOver</a>
```

Now if I say "Click, VoiceOver" a bit fast, nothing happens, should I slow it down a bit to account for the hidden pause, then it works. Does the sequence affect the meaning, given our very limited tests? I think the meaning remains the same, irrespective of the pause, however, it does affect operation, in that I ran into problems in both cases. Noted, I only used one voice input software, so my test is far from empirical, I also used the one that has a parent company that often requires their customers to do things a little differently (holding a phone and stuff), so perhaps I was destnied to find an issue? Okay, I agree, so let's use some others:

#### Voice Access on Android

Using the same limited tests as I did for Voice Control, I did not face the same problem. So the space did not affect the operation, in my tests. 

## An issue with mismatches

We have already discussed the issues when the visible label isn't present in the AccName, even looking at how the sequence being broken with a space is a failure, but we also need to look a little beyond that, we need to consider how different tools operate. 

I do not have all voice input software at my disposal, I do not have access to Dragon, which I know many users use as their main voice input software.

I want to speak specifically about VoiceControl, the voice input software that comes built in with MacOS and iOS devices. It used to be the case that VoiceControl expected the user to announce the full AccName, so commanding "Click, Submit" would not work for an this type of button:

```
<button type="submit" aria-label="Submit the form">Submit</button>
```

WCAG state in their best practice that the visible label should be at the beginning of the string, yet, this did not used to work, as VoiceControl was a bit of an outlier in that it expected the full string to be spoken. It has recently been "fixed", in that Voice Control now expected the visible label to be present at the beginning of the AccName, which aligns with WCAG's best practice. I believe most voice inputs software just expect the visible label to be present anywhere in the AccName string, so there is of course a difference.

Going back to my earlier recommendation, if we can just label a control with text and not use hidden text such as ARIA/visibly hidden text to modilfy or append the visible label in a non-visual manner, then that will always be the optimal strategy. There are occasions where this isn't always possible and we may need to append a control's AccName with additional text, but this is something we should do as a last resort.

## Back to Catchphrase
