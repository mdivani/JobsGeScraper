const listScraper = require("./scraper/listScraper");

const scrapVip = true;
listScraper(scrapVip).then((list) => console.log(list));