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

    // Get chapter list of a novel
    async GetChapterList(name, id) {
        try {
            // Get numbers of chapter
            let response = await fetch(this.allChapterUrl + id);

            if (!response.ok) {
                throw `${URL} is not available`
            }

            let data = await response.text();

            let $ = cheerio.load(data);
            var lastOptionValue = $('.chapter_jump option:last').val();
            const numberOfChapters = parseInt(lastOptionValue.replace('chuong-', ''));

            // Get list of chapters
            let chapters = []

            for (let i = 1; i <= numberOfChapters; i++) {
                chapters.push({
                    title: `Chương ${i}`,
                    link: `${this.baseUrl}${name}/chuong-${i}`
                });
            }

            return {
                numberOfChapters: numberOfChapters,
                chapters: chapters,
            }
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

            let  {numberOfChapters, chapters} = await this.GetChapterList(name, id);

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

    async GetChapter(name, chapter) {
        try {
            let response = await fetch(this.baseUrl + name + '/' + chapter);
            

            let data = await response.text();
            if (!response.ok) {
                throw `${URL} is not available`
            }
            let $ = cheerio.load(data);
            const title = $('.truyen-title').text();
            const chapterTitle = $('.chapter-title').text();
            const content = $('#chapter-c p').html();
            const curLink = $('.chapter-title').attr('href');
            
            let prevLink = $('#prev_chap').attr('href');
            if (!prevLink.includes('truyenfull')) {
                prevLink = null;
            }

            let nextLink = $('#next_chap').attr('href');
            if (!nextLink.includes('truyenfull')) {
                nextLink = null;
            }

            let id = $('#truyen-id').val();
            let {numberOfChapters, chapters} = await this.GetChapterList(name, id);

            return { 
                title, 
                chapterTitle, 
                curLink, 
                prevLink, 
                nextLink, 
                content, 
                numberOfChapters, 
                chapters
            };

        } catch (error) {
            throw error;
        }
    }
}
