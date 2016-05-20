# Audio Player
Lightweight, no-frills audio player.


### Purpose
Currently, The New Yorker uses a very bloated and inflexible third-party player for our podcasts (and any other audio). Why? I'm not too sure, I guess there is some kind of partnership but nobody has given me a final answer on that.

In the meantime, let's try to make something better. And hey, while we're at it, let's introduce ReactJS to our team?

### Why it's better
The WNYC player has several issues:

* We do not own or control any of the code or file hosting—if anything goes wrong here, we're hosed
* Unimpressive page weight for what features are delivered (~250kb)
* Very large number of requests, which is a killer on mobile (20 requests)
* Inflexible design sourced from WNYC, not TNY

This version, still in its infancy, is better because:
* We own the code
* We host the code
* Smaller page weight (currently ~80kb)
* Fewer requests (3 requests)
* We can design anything we want

TNY developers' lives are made easier as well, because this uses:
* NPM
* Gulp
* ECMAScript 6 (via Babel)
* ReactJS
* a module system
* SCSS 




