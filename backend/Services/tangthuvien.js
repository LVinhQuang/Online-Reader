// API: truyen.tangthuvien.vn
const cheerio = require('cheerio');


module.exports = class TangThuVien {
    constructor() {
        this.baseUrl = 'https://truyen.tangthuvien.vn';
        this.allChapterUrl = 'https://truyen.tangthuvien.vn/doc-truyen/page/<bookId>?limit=1000000&web=1';
    }

    async GetFeaturedNovels() {
        try {

            let url = this.baseUrl + '/tong-hop?rank=nm&time=m&page=1'
            let htmlData = await fetch(url);

            if (!htmlData.ok) {
                throw `${this.baseUrl} is not available`
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

    async GetChapterList(name = "", id) {
        let chaptersURL = this.allChapterUrl.replace('<bookId>', id);

        let htmlChapters = await fetch(chaptersURL);
        htmlChapters = await htmlChapters.text();
        let chapters = [];

        let $ = cheerio.load(htmlChapters);
        $('body ul.cf li').each((index, element) => {
            let chapter = {
                title: $(element).find('a').attr('title'),
                link: $(element).find('a').attr('href')
            };
            chapters.push(chapter);
        })

        return chapters;
    }

    async GetNovelDetail(name) {
        try {
            let url = this.baseUrl + '/doc-truyen/' + name;
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
            let chapters = await this.GetChapterList(name, bookId);

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

    async GetChapter(name, chapter) {
        try {
            let url = this.baseUrl + '/doc-truyen/' + name + '/' + chapter;
            let htmlData = await fetch(url);

            htmlData = await htmlData.text();

            let $ = cheerio.load(htmlData);

            // crawl data
            let result = {}

            let title = $('.truyen-title a').attr('title');
            let chapterTitle = $('.col-xs-12.chapter h2').text();
            let content = $('.box-chap').html();

            // get chapters
            let bookId = $('input[name="story_id"]').val();
            let chapters = await this.GetChapterList(" ", bookId);

            // get cur, prev, next link
            let curLink = url;

            let prevLink = null;
            chapters.forEach((chapter, index) => {
                if (chapter.link === curLink) {
                    if (index > 0) {
                        prevLink = chapters[index - 1].link;
                    }
                }
            });

            let nextLink = null;
            chapters.forEach((chapter, index) => {
                if (chapter.link === curLink) {
                    if (index < chapters.length - 1) {
                        nextLink = chapters[index + 1].link;
                    }
                }
            });


            // assign result
            result = {
                title: title,
                chapterTitle: chapterTitle,
                curLink: curLink,
                prevLink: prevLink,
                nextLink: nextLink,
                content: content,
                numberOfChapters: chapters.length,
                chapters: chapters
            }

            return result;

        } catch (error) {
            throw error;
        }
    }

    async SearchNovel(keyword, page) {

        try {
            let url = this.baseUrl + '/ket-qua-tim-kiem?term=' + keyword + '&page=' + page;

            let htmlData = await fetch(url);
            htmlData = await htmlData.text();

            let $ = cheerio.load(htmlData);

            let result = {};
            let totalPages = 0;
            let matchedNovels = [];

            // get total pages
            totalPages = $('.pagination li');
            totalPages = totalPages.eq(-2).find('a').attr('href');
            if(totalPages)
                totalPages = parseInt(totalPages.split('=').pop())
            else{
                totalPages = $('.pagination li');
                totalPages = totalPages.eq(-2).find('span').text();
                totalPages = parseInt(totalPages)
            }

            if(parseInt(page) > totalPages){
                return {
                    totalPages: totalPages,
                    matchedNovels: matchedNovels
                }
            }

            $('.book-img-text ul li').each((index, element) => {
                let novel = {
                    title: $(element).find('.book-mid-info h4 a').text(),
                    link: $(element).find('.book-img-box a').attr('href'),
                    image: $(element).find('.book-img-box a img').attr('src'),
                    author: $(element).find('.author .name').text(),
                    totalChapters: $(element).find('.author .KIBoOgno').text(),
                }

                matchedNovels.push(novel);
            });

            result = {
                totalPages: totalPages,
                matchedNovels: matchedNovels
            }

            return result;
        } catch (error) {
            throw error;
        }

    }
}