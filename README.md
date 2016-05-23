# Audio Player
Lightweight, no-frills audio player.


### Purpose
Currently, we use a very heavy and non-configurable third-party player for our podcasts (and any other audio). Why? I'm not too sure, but I think there is a legal reason for it.

In the meantime, let's try to make something better. And hey, while we're at it, let's introduce ReactJS to our codebase.

### Why it's better
The current player has several issues:

* We do not own or control any of the code or file hosting—if anything goes wrong here, we're hosed
* Large page weight for what features are delivered (~250kb)
* Very large number of requests, which is a killer on mobile (20 requests)
* Inflexible design sourced from vendor, not us

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

### Path to Production
A few things need to happen before we get too excited:

* Better build process (gzipping is a pain on S3, if we plan to go that route)
* Add dynamic URL support
* Add a loading indicator
* Change a few colors
* Feature audit—are we missing anything?
* Legal audit—is it okay that we're doing this?
* Design audit—can/should we improve anything else while we're at it?
* Internal code review (shouldn't take longer than 30 minutes)
 
### Getting Started
* After cloning the repo, run `npm install`. Make sure your local version of `node` is up-to-date.
* Start a local server: `sudo gulp server`. Admin priviliges are needed for port 80, feel free to change this.
* Everything you need is located in `/src`. Run `gulp` to compile these and watch for changes.

##### Deployment (very WIP)
* Run `gulp` to compile assets, just once.
* Run `NODE_ENV=production gulp compress-js` and `NODE_ENV=production gulp compress-css` to minify & gzip production-ready files.
* Upload to S3. Set permissions to public.
* Manually add `Content-Encoding` mime-types for CSS and JS to `gzip`.



