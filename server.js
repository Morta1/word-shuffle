// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { getCsvContent } = require("./be/utils");
const { CLIENT_RENEG_WINDOW } = require("tls");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    const content = getCsvContent();
    res.data = {
      content,
    };
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
