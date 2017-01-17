# BB exercise to fetch all tags in a page

# To run
1. Please run `npm install`
2. Then run `npm run serve` to start the server
3. In browser, please navigate to http://localhost:3000/

A good site to test is `http://stackoverflow.com`.

# Known-issues
- Current implementation only fetches for the host in the specified url (no paths).
- Some URL validation was done, but you can still enter jibberish like `http://askdjf` and it will try to fetch for the page. The server will return a 404.
- the HTML/BODY tags are missing
- this doesn't really play well with HTTPS sites, you will often get a 301 response. Will need to add some redirect code to handle this case, but the application still renders out the tags in the 301 response.

# Disclaimers
I actually have very little experience writing the backend, so this was somewhat of a learning experience for me when writing `server.js`. Please bare with me.

## Server.js
Written using ExpressJS - most familiar with Javascript so this was my choice of language

Takes POST req to endpoint `/fetchtags` with a URL, returns the body of the specified page.

## fetchTags-ui.js
Front-end script, does a couple things:
- url validation by utilizing the location object (trims out paths)
- sends Ajax request when submitting form so user can keep trying pages without page reloading
- parses html string from response and outputs HTML tags into a div
- To refactor, I would definitely make everything into its own modules and require them in. I really wanted to get something out ASAP, so current form is a page with global functions.

## Markup
- `c-` for styling, `js-` for JS binding
