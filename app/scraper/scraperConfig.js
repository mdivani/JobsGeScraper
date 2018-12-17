const rp = require('request-promise');
const cheerio = require("cheerio");

const scraperConfig = (url) => rp(url).then((html) => cheerio.load(html));

module.exports = scraperConfig;