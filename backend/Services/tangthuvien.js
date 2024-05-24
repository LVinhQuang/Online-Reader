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
}