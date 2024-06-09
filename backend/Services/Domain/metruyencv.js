const cheerio = require('cheerio');

module.exports = new class MeTruyenCV {
    constructor() {
        this.baseUrl = 'https://metruyencv.com';
        this.allChapterUrl = 'https://backend.metruyencv.com/api/chapters?filter%5Bbook_id%5D=<bookId>&filter%5Btype%5D=published';
        this.searchUrl = 'https://backend.metruyencv.com/api/books/search?gender=1&keyword=<keyword>&page=<page>'
    }

    async GetFeaturedNovels() {
        try {
            let url = 'https://backend.metruyencv.com/api/books?filter%5Bgender%5D=1&filter%5Bstate%5D=published&filter%5Btype%5D=picked&include=author%2Cgenres%2Ccreator&limit=20&page=1&sort=-new_chap_at';
            let htmlData = await fetch(url);

            if (!htmlData.ok) {
                throw `${this.baseUrl} is not available`
            }

            htmlData = await htmlData.json();
            let books = [];

            htmlData.data.forEach(element => {
                let title = element.name;
                let link = element.link;
                let image = element.poster.default;

                let book = {
                    link: link,
                    title: title,
                    image: image
                }

                books.push(book);
            });

            return books;
        } catch (error) {
            throw error;
        }
    }

    async GetChapterList(name, id) {
        let url = this.allChapterUrl.replace('<bookId>', id);
        let htmlData = await fetch(url);

        htmlData = await htmlData.json();

        if(htmlData.data == null){
            return [];
        }

        let chapters = []

        htmlData.data.forEach(element => {
            let chapter ={}
            chapter.title = element.name
            chapter.link = this.baseUrl + '/truyen/' + name + '/chuong-'+element.index

            chapters.push(chapter)
        })

        return chapters

    }

    async GetNovelDetail(name) {
        try {
            let url = this.baseUrl + '/truyen/' + name;

            let htmlData = await fetch(url);
            htmlData = await htmlData.text();

            const $ = cheerio.load(htmlData);
            let book = {};

            let title = $('.font-semibold.text-lg.text-title').text();
            let image = $('.w-44.h-60.shadow-lg.rounded.mx-auto').attr('src');
            let author = $('.text-gray-500').first().text();
            let status = ""
            let genres = []

            $('div.leading-10.md\\:leading-normal.space-x-4 a').each((index, element) => {
                if (index == 0) {
                    status = $(element).find('span').text();
                }
                else{
                    genres.push($(element).find('span').text());
                }
            })

            let intro= $('.text-gray-600.dark\\:text-gray-300.py-4.px-2.md\\:px-1.text-base.break-words').html();


            //get chapter
            let chapters = [];
            let numberOfChapters = 0;

            let bookId = $('.block.mx-auto.mb-6.md\\:mb-0.md\\:inline-flex').attr('data-x-data')
            if(bookId){
                bookId = bookId.match(/\d+/g)[0]
            }

            chapters = await this.GetChapterList(name, bookId);
            numberOfChapters = chapters.length;


            book = {
                title: title,
                image: image,
                author: author,
                status: status,
                genres: genres,
                intro: intro,
                numberOfChapters: numberOfChapters,
                chapters: chapters
            }

            return book

        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async GetChapter(name, chapter) {
        try {
            let url = this.baseUrl + '/truyen/' + name + '/' + chapter;
            let htmlData = await fetch(url);

            htmlData = await htmlData.text();
            const $ = cheerio.load(htmlData);

            let result = {}
            let title = $('.text-title.font-semibold').text();
            let chapterTitle = $('.text-center.text-gray-600.dark\\:text-gray-400.text-balance').text();
            let content = $('.break-words').first().html();

            // get chapters
            let bookId = $('.flex.justify-center.space-x-4 button').eq(2).attr('data-x-data')
            if(bookId){
                bookId = bookId.slice(bookId.indexOf('(')+1, bookId.indexOf(','))
            }
            let chapters = await this.GetChapterList(name, bookId);

            // get links
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
            console.log(error);
            throw error
        }
    }

    async SearchNovel(keyword, page) {
        try {
            let url = this.searchUrl.replace('<keyword>', keyword).replace('<page>', page);

            let htmlData = await fetch(url);
            htmlData = await htmlData.json();

            let matchedNovels = [];
            let totalPages = htmlData.pagination.last;

            htmlData.data.forEach(element => {
                let title = element.name;
                let link = element.link;
                let image = element.poster.default;
                let author = element.author.name;
                let totalChapters = element.latest_index;

                let book = {
                    link: link,
                    title: title,
                    image: image,
                    author: author,
                    totalChapters: totalChapters
                }

                matchedNovels.push(book);
            });

            if(parseInt(page) > parseInt(totalPages)){
                matchedNovels = []
            }

            let result = {
                totalPages: totalPages,
                matchedNovels: matchedNovels
            }

            return result;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}