const listScraper = require("./scraper/listScraper");

const scrapVip = false;
listScraper(scrapVip).then((list) => console.log(list.length));