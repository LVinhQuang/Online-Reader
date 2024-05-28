// API: truyen.tangthuvien.vn
const cheerio = require('cheerio');

const URL = 'https://truyen.tangthuvien.vn';

module.exports = class TangThuVien {
    Print() {
        console.log('Domain 1');
    }

    async GetFeaturedNovels() {
        try {

            let url = URL + '/tong-hop?rank=nm&time=m&page=1'
            let htmlData = await fetch(url);

            if (!htmlData.ok) {
                throw `${URL} is not available`
            }

            htmlData = await htmlData.text();

            const $ = cheerio.load(htmlData);
            const books = [];

            $('body.loaded .rank-box.box-center.cf .main-content-wrap.fl .rank-body .rank-view-list .book-img-text ul li').each((index, element) => {
                const book = {};

                // Extract link and name
                const linkElement = $(element).find('.book-img-box a');
                book.link = linkElement.attr('href');
                book.title = linkElement.find('img').attr('alt');
                book.image = linkElement.find('img').attr('src');

                // Extract author details
                //book.author = $(element).find('p.author a.name').text();

                // Extract status
                //book.status = $(element).find('p.author').text().includes('Đang ra') ? 'Đang ra' : 'Hoàn thành';

                // Extract number of chapters
                //book.numberChapter = $(element).find('span.KIBoOgno').text();

                // Extract intro
                //book.intro = $(element).find('p.intro').text().trim();

                // Extract update date
                //book.update = $(element).find('p.update span').text();

                // Add the book object to the books array
                books.push(book);
            });

            return books;

        } catch (error) {
            throw error;
        }
    }

    async GetNovelDetail(name) {
        try {
            let url = URL + '/doc-truyen/' + name;
            let htmlData = await fetch(url);

            htmlData = await htmlData.text();

            let $ = cheerio.load(htmlData);

            // crawl data
            let result = {}

            // book image
            const image = $('body.loaded .book-detail-wrap.center990 .book-information.cf .book-img a img').attr('src');

            // book infor
            const bookInfoTag = 'body.loaded .book-detail-wrap.center990 .book-information.cf .book-info ';
            const title = $(bookInfoTag + 'h1').text().trim();
            const author = $(bookInfoTag + '.tag a.blue').text().trim();
            const status = $(bookInfoTag + '.tag span.blue').text().trim();
            const genres = $(bookInfoTag + '.tag a.red').text().trim();
            const intro = $('.book-intro p').html();

            // chapter
            const bookId = $('head meta[name="book_detail"]').attr('content');
            const chaptersURL = URL + '/doc-truyen/page/' + bookId.toString() + '?limit=1000000&web=1';
            let htmlChapters = await fetch(chaptersURL);
            htmlChapters = await htmlChapters.text();
            let chapters = [];

            $ = cheerio.load(htmlChapters);
            $('body ul.cf li').each((index, element) => {
                let chapter = {
                    title: $(element).find('a').attr('title'),
                    link: $(element).find('a').attr('href')
                };
                chapters.push(chapter);
            })

            result = {
                title: title,
                image: image,
                author: author,
                status: status,
                genres: [genres],
                intro: intro,
                numberOfChapters: chapters.length,
                chapters: chapters
            }

            return result;
        } catch (error) {
            throw error;
        }

    }
}