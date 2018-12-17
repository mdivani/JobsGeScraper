const scraperConfig = require("./scraperConfig");

const jobsList = [];

// scrapVip if true function scraps VIP entries else regular entries are scraped
const jobsListScraper = ({scrapVip = true, url = "http://jobs.ge"}) => scraperConfig(url).then(($) => {
    const selector = scrapVip ? "vipEntries" : "regularEntries";

    $(`.${selector} tr`).each((index, element) => {
        // skip header row
        if (index > 0) {
            jobsList[index - 1] = {};
            jobsList[index - 1]["id"] = $(element).find("td a").first().attr("href").replace(/\//g, "");
            jobsList[index - 1]["title"] = $(element).find("td a").first().text();
            jobsList[index - 1]["client"] = $(element).find("td a").last().text();
            jobsList[index - 1]["clientUrl"] =`${url}${$(element).find("td a").last().attr("href")}`;
            jobsList[index - 1]["startDate"] = $(element).find("td").last().prev().text();
            jobsList[index - 1]["endDate"] = $(element).find("td").last().text();
        }
    });
    return jobsList;
}).catch(function(err){
    //handle error
    console.error(err);
});

module.exports = jobsListScraper;