const puppeteer = require("puppeteer");

module.exports = class TruyenFull {
    constructor() {
        this.baseUrl = 'https://truyenfull.vn/';
    }

    async GetFeaturedNovel() {
        const browser = await puppeteer.launch({headless: true});
        const page = await browser.newPage();
        await page.goto(this.baseUrl, {waitUntil: 'networkidle2'});
        const data = await page.evaluate(() => {
            let rs = [];
            const items = Array.from(document.querySelectorAll('div[class^="item top"]'));
            items.forEach(item => {
                const title = item.querySelector('.title h3').innerText;
                const link = item.querySelector('a').href;
                const image = item.querySelector('img').src;
                rs.push({ title, link, image });
            });
            return rs;
        });
        return data;
    }

    async GetNovelDetail(novel) {
        
    }
}
