const cheerio = require('cheerio');

module.exports = class TruyenFull {
    constructor() {
        this.baseUrl = 'https://truyenfull.vn/';
        this.allChapterUrl = 'https://truyenfull.vn/ajax.php?type=chapter_option&data=';
    }

    async GetFeaturedNovels() {
        try {
            let response = await fetch(this.baseUrl);
            let data = await response.text();
            const $ = cheerio.load(data);
            let rs = [];
            $('div[class^="item top"]').each((index, element) => {
                const title = $(element).find('.title h3').text();
                const link = $(element).find('a').attr('href').split('chuong-1')[0];
                const image = $(element).find('img').attr('src');
                rs.push({ title, link, image });
            });
            return rs;
        } catch (error) {
            throw error;
        }
    }

    async GetNovelDetail(name) {
        try {
            let response = await fetch(this.baseUrl + name);
            let data = await response.text();
            if (!response.ok) {
                throw `${URL} is not available`
            }
            let $ = cheerio.load(data);

            const id = $('#truyen-id').val();
            const title = $('h3.title').html();
            const image = $('.book img').attr('src');
            const intro = $('.desc-text').html();
            const author = $('.info').find("div:has(h3:contains('Tác giả:'))").find('a').text();
            const status = $('.info').find("div:has(h3:contains('Trạng thái:'))").find('span').text();
            const genres = $('.info')
                .find("div:has(h3:contains('Thể loại:'))")
                .find('a')
                .map((i, el) => $(el).text())
                .get();

            response = await fetch(this.allChapterUrl + id);

            if (!response.ok) {
                throw `${URL} is not available`
            }

            data = await response.text();

            $ = cheerio.load(data);
            var lastOptionValue = $('.chapter_jump option:last').val();
            const numberOfChapters = parseInt(lastOptionValue.replace('chuong-', ''));

            let chapters = []

            for (let i =0;i<numberOfChapters;i++) {
                chapters.push({
                    title: `Chương ${i}`,
                    link: `${this.baseUrl}${name}/chuong-${i}`
                });
            }

            return {
                title: title,
                image: image,
                author: author,
                genres: genres,
                status: status,
                intro: intro,
                numberOfChapters: numberOfChapters,
                chapters: chapters,
            }
        }
        catch (error) {
            throw error;
        }
    }
}
