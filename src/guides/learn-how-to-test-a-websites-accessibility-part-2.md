---
title: Learn how to test a website's accessibility (Part 2)
summary: This is the answer page for Part 1 of Testing a Website's Accessibility
author: dlee
date: 2025-11-04
toc: false
tags:
  - Best practice
isGuide: true
---
## Intro

Hopefully you have only arrived on this page after reading Part 1? I have somewhat hidden this page, so it does not appear in any of our site's navigation features and also should not appear in search engine results, so hopefully randomly stumbling across it should be unlikely. That being said, I know my method for hiding this page isn't bulletproof, so please do read the LINK TO PART 1 guide, before this one.

Well, let's get straight to it.

## Sitewide issues

When we test for Sitewide issues we are typically testing for issues that are repeated across multiple pages. We would of course write up everything that appeared in the site's `<head>` section, the `<nav>`, the `<footer>`, the general "theme", the site's responsiveness, abilty to zoom or increase text size and line height/letter spacing, the site's structure and any other repeated components such as side bars, cookie banners, chat widgets, etc. That being said, if an issue only appeared on one page for any of the aforementioned issues, then we would consider that issue specific to the page we found it on.

In all honesty, it's not worth getting hung up on where you reported the issue, as long as you found it and documented it, then that's the main thing. Also, don't worry if you never found some, the purpose here is to learn, it's not a competition or anything.

<h3 class="accordion">Sitewide answers</h3>
        <div class="accordion__panel">
          <div>
            * There was no secondary navigation present, the only method of navigation is the primary navigation in the site's header, this fails SC 2.4.5 Multiple ways (AA). This is something  I would find on "Visual inspection", I would actively look for a secondary navigation as none of the tools I use help me, here. Perhaps paid solutions do, but I'm happy just "looking" for a secondary naviagtion

  * The solution I opted for was to add the same links to the footer, this is a quick easy fix, easier than creating a search function and probably on par with adding all of the links to the Home page's main content or creating a site map
* The "H" key was mapped to advance focus to the so-called halp dialog, as "H" was used without requiring a modifier, too, then this fails SC 2.1.4 Character Key Shortcuts (A), this may have been difficult to find, if you had typed a "H" at any point, you probably would have noticed, otherwise, it could have easily been missed. Ordinarily, if a dev team implements shortcuts, then they will at least somewhere mention them in most instances, I have actually found mention of them in comments of the site's HTML, and nowhere else, i have also discovered failures by accident, by typing into form inputs. The issue with this SC is screen readers map use of printable character keys for shortcuts, in this case, "H" would navigate to the next heading

  * The solution I opted for was to map the "9" key (commonly used for "Help") with the accesskey attribute, as that requires modifier keys which will depend on operating system and/or browser. Another solution could have just been to do away with the shortcut. What I never did, which I absolutely would in the real world, is tell people that this shortcut exists, otherwise, there's little point in having it, also, that instruction would need to be in visible text, not ARIA, because then it would still exclude the majority of folks
* The colour of the focus indicator fails contrast requirements on all pages. This colour was selected as it is close to the 3:1 minimum, but close is not a pass and the threshold requires a contrast of at least 3:1 in order to pass 1.4.11 Non-text Contrast (AA). I would find this by using a combination of visual inspection and a tool to validate my suspicions, such as Color Contrast Analyzer. I would test the colour against every background it featured on and also
          </div>
        </div>
