const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports.server = (routes) => {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cookieParser());

  app.use(express.static(process.cwd() + '/server/public'));
  
  routes.forEach(route => {
    app.use(route);
  });
    return app;
}

const shapeFlags = flags =>
  flags.reduce((shapedFlags, flag) => {
    const [flagName, rawValue] = flag.split("=");
    // edge case where a cookie has a single flag and "; " split results in trailing ";"
    const value = rawValue ? rawValue.replace(";", "") : true;
    return { ...shapedFlags, [flagName]: value };
  }, {});

const extractCookies = headers => {
  const cookies = headers["set-cookie"]; // Cookie[]

  return cookies.reduce((shapedCookies, cookieString) => {
    const [rawCookie, ...flags] = cookieString.split("; ");
    const [cookieName, value] = rawCookie.split("=");
    return { ...shapedCookies, [cookieName]: { value, flags: shapeFlags(flags) } };
  }, {});
};


module.exports.parseCookie = extractCookies;