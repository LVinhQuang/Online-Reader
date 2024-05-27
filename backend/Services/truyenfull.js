const puppeteer = require('puppeteer');

module.exports = class TruyenFull {
    constructor() {
        this.baseUrl = 'https://truyenfull.vn/';
    }

    async GetFeaturedNovels() {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(this.baseUrl, { waitUntil: 'networkidle2' });
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

    async GetNovelDetail(name) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(this.baseUrl + name, { waitUntil: 'networkidle2' });
        const data = await page.evaluate(() => {
            const title = document.querySelector('h3.title').innerHTML;
            const image = document.querySelector('.book img').src;
            const intro = document.querySelector('.desc-text').innerHTML;
            const author = $('.info').find("div:has(h3:contains('Tác giả:'))").find('a').text();
            const status = $('.info').find("div:has(h3:contains('Trạng thái:'))").find('span').text();
            const genres = $('.info')
                .find("div:has(h3:contains('Thể loại:'))")
                .find('a')
                .map(function () {
                    return $(this).text();
                })
                .get();

            var chapters = []
                

            // Lấy ra tất cả các thẻ div có class là "col-xs-12 col-sm-6 col-md-6"
            var divElements = document.querySelectorAll('.col-xs-12.col-sm-6.col-md-6');

            // Duyệt qua từng phần tử div
            divElements.forEach(function (divElement) {
                // Tìm tất cả các thẻ li trong từng div
                var listItems = divElement.querySelectorAll('ul.list-chapter li');

                // Duyệt qua từng thẻ li
                listItems.forEach(function (listItem) {
                    // Lấy giá trị của thuộc tính href
                    var link = listItem.querySelector('a').getAttribute('href');

                    // Lấy giá trị của thuộc tính title
                    var title = listItem.querySelector('a').getAttribute('title').split(' - ')[1];

                    // Tạo một đối tượng mới đại diện cho chương và thêm vào mảng chapters
                    chapters.push({ "link": link, "title": title });
                });
            });

            return {
                title: title,
                image: image,
                author: author,
                genres: genres,
                status: status,
                intro: intro,
                chapters: chapters,
            }
        });
        return data;
    }
}
