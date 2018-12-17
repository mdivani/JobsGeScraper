const rp = require('request-promise');
const cheerio = require("cheerio");
const url = 'http://jobs.ge';

const jobsList = [];

// scrapVip if true function scraps VIP entries else regular entries are scraped
const jobsListScraper = (scrapVip = true) => rp(url)
.then(function(html){
    //success!
    const selector = scrapVip ? "vipEntries" : "regularEntries";
    const $ = cheerio.load(html);
    $(`.${selector} tr`).each((index, element) => {
        if (index > 0) {
            jobsList[index - 1] = {};
            jobsList[index - 1]["id"] = $(element).find("td a").first().attr("href").replace(/\//g, "");
            jobsList[index - 1]["title"] = $(element).find("td a").first().text();
            jobsList[index - 1]["company"] = $(element).find("td a").last().text();
            jobsList[index - 1]["startDate"] = $(element).find("td").last().prev().text();
            jobsList[index - 1]["endDate"] = $(element).find("td").last().text();
        }
    });
    return jobsList;
})
.catch(function(err){
    //handle error
    console.error(err);
});

module.exports = jobsListScraper;