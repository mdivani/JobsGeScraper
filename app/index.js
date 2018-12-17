const vipListScraper = require("./scraper/vipListScraper");

vipListScraper().then((list) => console.log(list));