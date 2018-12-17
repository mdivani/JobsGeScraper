const listScraper = require("./scraper/listScraper");
const scraperConfig = require("./scraper/scraperConfig");

const scrapVip = false;
const url = "http://jobs.ge";

listScraper({scrapVip, url})
.then((list) => {
    const promises = list.map((job) => {
        const jobUrl = `${url}/${job.id}/`;
        return scraperConfig(jobUrl)
        .then(($) => {
            job["description"] = $("#wrapper .content .ad tr").last().find("td").text();
            return job;
        });
    });
    return Promise.all(promises);
})
.then((jobs) => console.log(jobs));;