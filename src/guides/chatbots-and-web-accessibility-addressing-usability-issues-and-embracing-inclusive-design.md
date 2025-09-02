---
title: "Chatbots and Web Accessibility: Addressing Usability Issues and
  Embracing Inclusive Design "
summary: A deep-dive into the accessibility of chatbots, highlighting some of
  the barriers disabled people can face when interacting with common chat
  widgets and applications
author: mbegum
date: 2025-09-01
toc: false
tags:
  - Case study
  - Component
isGuide: true
---
## Introduction

Chatbots have become a common feature on websites, assisting users in finding information, completing tasks, or accessing customer support. While they offer convenience and automation, they often fall short in terms of accessibility.


Many chatbots fail to support screen readers, lack proper keyboard navigation, or use overlay elements that interfere with a site's usability. As digital services aim to be more inclusive, it is essential that chatbots are designed with accessibility in mind.

This article explores common usability issues with chatbots, outlines best practices for designing accessible chat experiences, highlights challenges associated with overlays, and draws inspiration from widely used messaging platforms to improve accessibility for all users.

## Common Usability Issues with Chatbots

### Pop-ups

Pop-ups are small windows or messages that appear on top of a webpage. They often show up in the corner of the screen hen users visit a website, and many chatbots use this design to offer help or answer questions.

Below is a table outlining common issues and best practices related to pop-up design:

<table>
  <thead>
    <tr>
      <th>Issue</th>
      <th>Best Practice</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Appearing too soon and interrupting the user</td>
      <td>Trigger the pop-up based on user behaviour (e.g., scroll depth or inactivity), not instantly on page load</td>
    </tr>
    <tr>
      <td>Blocking important content or buttons</td>
      <td>Place the pop-up in a non-intrusive area and allow repositioning or resizing on smaller screens</td>
    </tr>
    <tr>
      <td>Difficult to close</td>
      <td>Include a clear, accessible close button and allow keyboard dismissal (e.g., Esc key)</td>
    </tr>
  </tbody>
</table>

### Overlays

Overlays are panels or boxes that appear on top of the main content, but without opening a new page. They are often used for things like chat windows, forms, or image galleries. A chatbot overlay might expand from a corner of the screen and cover part of the page while staying in view as the user scrolls.

Unlike pop-ups, overlays are usually more interactive and remain open until the user closes them.

Below is a table outlining common issues and best practices related to overlay design:

<table>
  <tbody>
    <tr>
      <th>Issue</th>
      <th>Best Practice</th>
    </tr>
    <tr>
      <td>They can block important content or navigation.</td>
      <td>Make overlays dismissible using the keyboard (e.g., Esc key).</td>
    </tr>
    <tr>
      <td>
        <p>They may "trap" keyboard focus, making it hard to navigate out of them.</p>
      </td>
      <td>Avoid covering essential parts of the page unless necessary.</td>
    </tr>
    <tr>
      <td>Screen readers may not recognise them correctly without the right code.</td>
      <td>Use proper accessibility roles like <code>role="dialog"</code> and ensure the focus moves into and out of the overlay smoothly.</td>
    </tr>
  </tbody>
</table>

### Lack of Keyboard Accessibility

Keyboard navigation is essential because many users, including those with motor impairments, rely on keyboards instead of a mouse to interact with digital content. Ensuring that chatbots are fully operable via keyboard allows these users to navigate, input information, and engage with chatbot features effectively.


Below is a table outlining common issues and best practices related to keyboard navigation design:

<table>
	<thead>
		<tr>
      <th>Issue</th>
			<th>Best Practice</th>
		</tr>
  </thead>
  <tbody>
		<tr>
			<td>
				Chatbot is not reachable using the keyboard (Tab key).
			</td>
			<td>
				Ensure the chatbot can be focused and accessed using the Tab key from anywhere on the page.
			</td>
		</tr>
		<tr>
			<td>
				Keyboard navigation within the chatbot is missing or confusing.
			</td>
			<td>
				Implement intuitive keyboard controls, such as arrow keys to scroll and navigate options.
			</td>
		</tr>
		<tr>
			<td>
				Users cannot revisit or interact with previous messages via keyboard.
			</td>
			<td>
				Allow logical key commands to access and interact with message history and conversation elements.
			</td>
		</tr>
		<tr>
			<td>
				Chatbot is not fully usable without a mouse.
			</td>
			<td>
				Test the chatbot thoroughly with screen readers and keyboard-only navigation to ensure full accessibility.
			</td>
		</tr>
	</tbody>
</table>

In addition to keyboard support, it is vital to test chatbots with screen readers (like NVDA, JAWS, or VoiceOver) using only keyboard controls. This ensures that all interactive elements such as send buttons, input fields, and conversation threads are fully accessible without a mouse.

### Focus Indication and Clear Labels

Many chatbots often fail to provide clear focus visual indicators showing which part of the interface is currently active. Without clear focus indicators, users with visual or cognitive impairments may struggle to determine their location within the chatbot interface. Additionally, many chatbots lack accessible text labels for buttons, chat bubbles, and form fields, preventing screen readers from interpreting and relaying this information accurately.
Below is a table outlining common issues and best practices related to accessible chatbot interface design:

<table>	
  <thead>
		<tr>
      <th>Issue</th>
			<th>Best Practice</th>
		</tr>
  </thead>
  <tbody>
		<tr>
			<td>The chatbot does not receive focus indication on its main button or internal controls</td>
			<td>Ensure all interactive elements, including the main chatbot button and internal controls, have visible focus indicators</td>
		</tr>
		<tr>
			<td>The chatbot obscures important page content, such as the footer.
			</td>
			<td>Design the chatbot to avoid covering essential content, or allow users to move, minimise, or dismiss it easily</td>
		</tr>
		<tr>
			<td>Message input fields and controls lack text labels, and icons are used without explanation</td>
			<td>Provide accessible text labels for all inputs and controls and avoid relying on icons alone. Ensure all functions are clearly described for screen readers</td>
		</tr>
	</tbody>
</table>

### Announcing New Messages

Screen reader users need to be notified when a new message appears in the chat. If a chatbot does not announce incoming messages using ARIA live regions or other assistive techniques, users may miss critical updates, disrupting the conversation flow and causing confusion.

* New messages may not have visual or audio to alert users to new messages. Without the audio alert, screen readers may not know they have received a message for example
* New messages may be overly disruptive to the screen reader experience if done with aria assertive rather than aria polite

## Best Practices for Designing Accessible Chatbots

### Customisable Platforms

When developing chatbots, it is important to choose platforms that allow for accessibility customisation. This ensures that the chatbot can be tailored to meet the needs of all users, including those with disabilities.
Below is a table outlining common issues and best practices related to accessible design:

<table>
	<thead>
		<tr>
			<th>Feature</th>
			<th>Description</th>
		</tr>
  </thead>
  <tbody>
		<tr>
			<td>Ability to modify or add semantic HTML elements</td>
			<td>Enables the use of correct HTML tags such as <code><button></code>, <code><form></code>, and <code><label></code> to improve screen reader compatibility and structure</td>
		</tr>
		<tr>
			<td>Full support for ARIA roles and attributes</td>
			<td>Supports attributes like aria-label, aria-live, and aria-expanded to provide additional context and dynamic updates for assistive technologies</td>
		</tr>
		<tr>
			<td>Custom styling for focus indicators, contrast, and responsive design</td>
			<td>Allows the platform to apply visible focus styles, maintain sufficient colour contrast, and adapt layout for different screen sizes and devices</td>
		</tr>
	</tbody>
</table>

### Identifying Conversations and Announcing Updates

Chatbots that support multiple conversation threads must clearly label each thread (e.g., "HR Enquiry" or "IT Support") and indicate which one is currently active. Updates should be communicated using both visual and auditory cues to ensure users with different impairments receive timely information.
Provide Visual and Audio Cues Both visual and auditory cues help different users stay informed:

* **Visual cues**: Highlight or bold new messages in the chat.
* **Auditory cues**: Play a sound when a new message arrives (make sure it's not too loud or distracting). Use `aria-live="polite"` for announcing updates.

### Rich Media Accessibility

Multimedia content such as images, emojis, and audio clips must be made accessible:

* Use **alt text** for all images.
* Provide **high-quality audio** with **closed captions** for any media shared in the chat.
* Choose emojis that come with descriptive labels.

Note: There is much more to explore regarding emojis and their effective use in accessible design. In the future, we plan to release a more detailed guide on emoji accessibility, which will be linked here

### Accessible Language, Fonts, and Colour Contrast

Clear, simple language makes chatbot interactions more accessible for users with cognitive impairments or those who are non-native speakers. Additionally, using legible fonts and maintaining strong colour contrast ensures that text is readable by users with visual impairments or colour blindness.

## Challenges with Overlays and Chatbot Widgets

### Compliance Issues

Despite claims made by some chatbot vendors, many overlays and widgets do not meet WCAG standards. These tools may be marketed as accessibility solutions, but when implemented poorly, they can cause more harm than good especially for users who rely on screen readers or keyboard navigation.
If you are considering using a chatbot on your website, be aware that they can impact the accessibility of your website, and you should thoroughly test any new chatbot, widget, or 3rd party tool before adding it to your website.

### Redundancy and Overstated Value

Chatbot features themselves usually don't cause unnecessary repetition or confusion for users with disabilities. However, certain elements such as overlays can present challenges. Overlays may obstruct important page content and cause frustration for users who depend on assistive technologies like screen magnifiers or browser extensions.
One issue with chatbots is that many users prefer speaking to a human rather than AI. Some disabled users could worry that as AI-driven accessibility tools become more widespread, they might lead to a future where all interactions are automated, removing the human element from online experiences.

### User Overload

Too many automated suggestions or options can overwhelm users, especially those with cognitive impairments or unfamiliarity with chatbot interfaces. A cluttered or noisy interface that attempts to do too much can make it more difficult for users to focus and navigate the conversation effectively.

## Learning from Major Messaging Platforms (WhatsApp, iMessage)

### Consistency and Familiarity

Popular messaging apps such as WhatsApp and iMessage use simple, intuitive interfaces that are accessible to a broad range of users. Chatbots can replicate these familiar structures by using clear layouts, predictable navigation, and straightforward interactions.

### WhatsApp's Meta AI: What It Is

WhatsApp's Meta AI is a built-in chatbot powered by Meta's Llama 4 large language model, designed to assist users by answering questions and providing information directly in the app. It appears as a blue circle icon in the chat interface, offering help without leaving WhatsApp. Although Meta labels the feature as "optional," it cannot be removed from the app, making it a permanent fixture in the interface.

### Strengths of Meta AI

Meta AI offers several useful advantages, particularly for users with accessibility needs:

* **Quick Access to Information**: Users can easily ask for information, such as weather updates or general knowledge, through simple text or voice queries.
* **Supports Users with Visual or Cognitive Impairments**: It's especially helpful for those with visual impairments or cognitive challenges, who may find it easier to ask the AI for information rather than searching through other apps.
* **Instant Responses**: The AI reduces friction by providing instant replies, saving time and effort for users who need quick answers.

### Weaknesses in Terms of Chatbot Accessibility

There are several limitations related to Meta AI's accessibility features:

* **No Customisation Options**: Users cannot remove or customise the AI feature, which may be problematic for those who need a cleaner, more streamlined interface.
* **Clutter for Users with Sensory Sensitivities**: The persistent presence of the AI icon may create unnecessary create unnecessary clutter for users who require a cleaner interface or those with sensory sensitivities
* **Overwhelming for Some Users**: The permanent, mandatory integration of Meta AI may be overwhelming for individuals who prefer not to use it.
* **Limited Flexibility**: The lack of options to hide or turn off the AI limits its accessibility for users with specific cognitive or visual challenges.
* **Privacy Concerns**: there's concern about the impact on privacy, with experts noting the potential for the AI to access personal data, adding a layer of privacy risk for users.

### iMessage's Chatbot: What It Is

iMessage, Apple's messaging app, integrates AI-powered features aimed at improving user experience. While not as prominent as WhatsApp's Meta AI, iMessage uses AI in the form of predictive text, automated replies, and message suggestions. These features assist users by making it easier and faster to compose messages. iMessage also offers voice-to-text capabilities and a simple interface that responds to user commands.
Unlike WhatsApp's Meta AI, iMessage's AI features are more optional, allowing users to interact with them at their discretion rather than being a permanent fixture.

### Strengths of iMessage's Chatbot

* **Predictive Text and Suggested Replies**: iMessage suggests quick responses, which help users reply faster. This is especially useful for people with limited hand movement or those who need to reply quickly. It's especially helpful for users with limited dexterity or those who need faster responses, reducing the time spent composing messages.
* **Integration with Accessibility Features**: iMessage's integration with Apple's built-in accessibility tools, like voice-to-text, makes it a strong option for users with visual impairments. These features allow people to dictate messages and have them transcribed into text, enhancing accessibility for users with mobility or visual challenges.
* **User Control**: Unlike WhatsApp's Meta AI, iMessage's AI features are not forced onto the user. Instead, users can choose to interact with the chatbot features as needed, which provides more flexibility for those who prefer not to use AI.

### Weaknesses in Terms of Chatbot Accessibility

* **Limited Support for Cognitive Impairments**: iMessage's AI mainly offers predictive text, which may not be enough for users with cognitive impairments who require more detailed guidance or step-by-step support when composing messages.
* **Infrequent Customisation Options**: iMessage does not offer extensive customisation of its chatbot features. While users can benefit from predictive text, they cannot tailor these suggestions to fit their specific needs, such as changing the frequency or type of suggestions they receive.
* **Lack of Advanced AI Interaction**: iMessage lacks a more advanced AI for handling complex queries or providing personalised responses, which may limit its accessibility for users seeking advanced help or interaction
* **Privacy Concerns**: Some users may worry about how Apple uses their data, even though messages are end-to-end encrypted, particularly when considering the processing of voice and text data.

### Clear Notifications

Clear Notifications and Inclusive Features
Popular messaging platforms notify users of new messages, replies and typing indicators in ways that are clear and accessible manner. Chatbots should emulate this by using both visual and audio signals to alert users especially those with hearing or vision impairments. Offering customisable accessibility features such as font resizing, voice-to-text input and high contrast themes also improves usability for people with a wide range of needs.
Below is a table outlining common issues and best practices for clear notifications and accessible chatbot design:

<table>
	<thead>
		<tr>
      <th>Issue</th>
			<th>Best Practice</th>
		</tr>
  </thead>
  <tbody>
		<tr>
			<td>Users may miss new messages or typing indicators without clear alerts</td>
			<td>Provide visual cues such as highlighting new messages and audio signals like gentle sounds to notify users of updates</td>
		</tr>
		<tr>
			<td>Notifications can be overly disruptive or unclear</td>
			<td>Use ARIA live regions with polite settings, such as <code>aria-live="polite"</code>, to announce updates without interrupting the user</td>
		</tr>
		<tr>
			<td>Lack of personalisation for accessibility needs</td>
			<td>Include options to customise font size, contrast levels and input methods such as voice-to-text to support diverse user needs</td>
		</tr>
	</tbody>
</table>

## Conclusion

Chatbots have the potential to simplify online interactions but only if they are accessible to all users. Many current implementations fall short by using inaccessible overlays, lacking proper keyboard and screen reader support, or failing to provide clear communication cues. By adopting inclusive design principles, conducting thorough user testing with assistive technologies, and learning from successful messaging platforms, we can build chatbot experiences that are truly user-friendly and accessible for everyone. Designers and developers should prioritize accessibility testing and inclusive design to ensure chatbot technology benefits everyone.

## An example of an accessible chatbot

My colleage, Darren has created an accessible chatbot example, which considers many aspects discussed in this article. The guide walks you through the process of creating an accessible chatbot, although the example component is based upon a turn-based application, but further considerations are available for alternative implementations, for your consideration.

## References

1. [Chatbots: Are They Really Accessible?](https://www.horlix.com/chatbots/#:~:text=One%20of%20the%20main%20problems)
2. [Bureau of Internet Accessibility. Five Key Accessibility Considerations for Chatbots](https://www.boia.org/blog/five-key-accessibility-considerations-for-chatbots)
3. [Accessibility Audit UK. Accessibility Overlays Don't Work](https://accessibilityaudit.co.uk/accessibility-overlays-dont-work/)
4. [Overlay Fact Sheet. Understanding Overlay Tools and Their Limitations](https://overlayfactsheet.com/en/)
5. [Jinraj Jain. Concierge Bot: Handle Multiple Chatbots from One Chat Screen. Chatbots Life](https://chatbotslife.com/concierge-bot-handle-multiple-chatbots-from-one-chat-screen-ff7baae9d597)
6. [Web Accessibility Team. Messaging Apps: The Good, the Bad, and the Ugly](https://blog.hubspot.com/customers/messaging-apps-good-bad-ugly)
7. [W3C Web Accessibility Initiative (WAI) ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
8. [Overlay Fact Sheet (n.d.)]("https://overlayfactsheet.com/en/)
9. [Five Key Accessibility Considerations for Chatbots](href="https://www.boia.org/blog/five-key-accessibility-considerations-for-chatbots)
10. [BBC News WhatsApp defends 'optional' AI tool that cannot be turned off](https://www.bbc.co.uk/news/articles/cd7vzw78gz9o)
11. [Trusted Reviews What is Meta AI? The WhatsApp and Facebook AI chatbot explained](https://www.trustedreviews.com/explainer/what-is-meta-ai-facebook-4595670)
