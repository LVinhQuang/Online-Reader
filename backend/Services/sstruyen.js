const cheerio = require('cheerio');

module.exports = new class SsTruyen {
    constructor() {
        this.baseUrl = 'https://sstruyen.vn/';
        this.allChapterUrl = "https://sstruyen.vn/ajax.php?get_chapt&story_seo=";
    }

    async GetFeaturedNovels() {
        try {
            let response = await fetch(this.baseUrl);
            let data = await response.text();
            const $ = cheerio.load(data);
            let rs = [];
            $('.section-hot-book .col-xs-4.col-md-2').each((index, element) => {
                const title = $(element).find('a').first().attr('title');
                let tempLink = $(element).find('a').first().attr('href')
                const link = this.baseUrl + tempLink.substring(1);
                const image = $(element).find('a').first().find('img').attr('src')
                rs.push({ title, link, image });
            });
            return rs;
        } catch (error) {
            throw error;
        }
    }

    // Get chapter list of a novel
    async #GetChapterList(name) {
        try {
            // Get numbers of chapter
            let response = await fetch(this.allChapterUrl + name);

            if (!response.ok) {
                throw `${URL} is not available`
            }

            let data = await response.text();

            let $ = cheerio.load(data);
            var lastOptionValue = $('option').last().text()
            const numberOfChapters = parseInt(lastOptionValue.replace('Chương ', ''));
            

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
                if (response.status === 404) {
                    return {
                        title: null,
                        image: null,
                        author: null,
                        genres: null,
                        status: null,
                        intro: null,
                        numberOfChapters: null,
                        chapters: null,
                    }
                }
                throw `${URL} is not available`
            }
            let $ = cheerio.load(data);

            // const id = $('#truyen-id').val();
            const title = $('.row.wrap-detail.pc h1.title').text()
            const image = $('.row.wrap-detail.pc').find('img').attr('src')
            const intro = $('.row.wrap-detail.pc .content1 p').last().html()
            const author = $('.row.wrap-detail.pc .content1 p').first().find('a').text()
            const status = $('.row.wrap-detail.pc .content1 p .status').first().text()
            const genres = $('.row.wrap-detail.pc .content1 p').eq(1).find('a')
                .map((i, el) => $(el).text())
                .get();

            let  {numberOfChapters, chapters} = await this.#GetChapterList(name);

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
                if (response.status === 404) {
                    return {
                        title: null,
                        chapterTitle: null,
                        curLink: null,
                        prevLink: null,
                        nextLink: null,
                        content: null,
                        numberOfChapters: null,
                        chapters: null,
                    }
                }
                throw `${URL} is not available`
            }
            let $ = cheerio.load(data);
            const title = $('h1.rv-full-story-title').text();
            const chapterTitle = $('.rv-chapt-title h2').text()

            //Get content
            $('.content.container1').find('p').remove()
            const content = $('.content.container1').html();

            const curLink = $('link').first().attr('href')
            
            let prevLink = $('.pagination').first().find('.prev').find('a').attr('href');
            if (!prevLink) {
                prevLink = null;
            }
            else {
                prevLink = this.baseUrl + prevLink.substring(1).replace('#j_content', '');
            }

            let nextLink = $('.pagination').first().find('.next').find('a').attr('href');
            if (!nextLink) {
                nextLink = null;
            }
            else {
                nextLink = this.baseUrl + nextLink.substring(1).replace('#j_content', '');
            }

            let {numberOfChapters, chapters} = await this.#GetChapterList(name);

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
            // console.log(error)
            return {
                title: null,
                chapterTitle: null,
                curLink: null,
                prevLink: null,
                nextLink: null,
                content: null,
                numberOfChapters: null,
                chapters: null,
            }
        }
    }

    //Function to get total number of pages
    #getTotalPages($) {
        // Check if ul.pagination exists
        let $paginationUl = $('ul.pagination');
        if ($paginationUl.length === 0) {
            // Case 1: No pagination element, only one page
            return 1;
        }

        // Get all li elements inside the ul.pagination
        let $paginationItems = $paginationUl.find('li');

        // Initialize the lastPageNumber
        let lastPageNumber = 1;

        // Iterate through each li element to find the one containing 'Cuối'
        $paginationItems.each(function() {
            let $li = $(this);
            let $a = $li.find('a');

            if ($a.length > 0 && $a.text().includes('Cuối')) {
                // Case 3: There is a "Cuối" element
                // Get the page number from the "Cuối" element href
                let lastPageHref = $a.attr('href');
                let urlParams = new URLSearchParams(lastPageHref.split('?')[1]);
                lastPageNumber = parseInt(urlParams.get('page'));
                return false; // Break the loop
            } else {
                // Update lastPageNumber with the text content if it is a number
                let pageNumber = parseInt($li.text());
                if (!isNaN(pageNumber)) {
                    lastPageNumber = pageNumber;
                }
            }
        });

        return lastPageNumber;
    }

    async SearchNovel(keyword,page) {
        try {
            const limit = 27;     // Number of novels per page
            if (!page) {
                page = 1;
            }

            let response = await fetch(this.baseUrl + 'tim-truyen/' + keyword);
            let data = await response.text();
            if (!response.ok) {
                throw `${URL} is not available`
            }
            let $ = cheerio.load(data);
            let rs = {};
            let matchedNovels = [];
            $('.table-list.pc tr').each((index, element) => {
                const title = $(element).find('.info .rv-home-a-title').text()
                const author = $(element).find('.info a[itemprop="author"]').text()
                const totalChapters = parseInt($(element).find('.chap').text().replace('Chương ',''));
                const link = this.baseUrl + $(element).find('.image a').attr('href').substring(1);
                const image = $(element).find('.image a img').attr('src');
                matchedNovels.push({ title, link, image, author, totalChapters });
            });
            console.log(matchedNovels)
            let matchedNovelsPerPage = [];
            // Get total pages of search result
            if (!matchedNovels.length == 0) {
                let totalPages = Math.ceil(matchedNovels.length / limit);
                matchedNovelsPerPage = matchedNovels.slice((page - 1) * limit, page * limit);
            }
            else {
                let totalPages = 0;
                rs.totalPages = totalPages;
            }

            rs.matchedNovels = matchedNovelsPerPage;

            return rs;

        } catch (error) {
            throw error;
        }
    }
}
