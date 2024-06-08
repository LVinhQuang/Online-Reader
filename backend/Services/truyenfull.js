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
    async #GetChapterList(name, id) {
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

            let  {numberOfChapters, chapters} = await this.#GetChapterList(name, id);

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
            if (error.status === 404) {
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
            const title = $('.truyen-title').text();
            const chapterTitle = $('.chapter-title').text();
            if (chapterTitle === '') {
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

            //Get content
            $('#chapter-c').find('div[class*="ads"]').remove()
            let content = '';
            let paragraphs = $('#chapter-c p');
            if (paragraphs.length !== 0) {
                let allHtmlContent = [];
                paragraphs.each(function() {
                    allHtmlContent.push($(this).html());
                });
                content = allHtmlContent.join('');
            }
            else {
                content = $('#chapter-c').html()
            }

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
            let {numberOfChapters, chapters} = await this.#GetChapterList(name, id);

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
            let response = await fetch(this.baseUrl + 'tim-kiem/?tukhoa=' + keyword + '&page=' + page);
            let data = await response.text();
            if (!response.ok) {
                throw `${URL} is not available`
            }
            let $ = cheerio.load(data);
            let rs = {};
            let matchedNovels = [];
            $('.col-truyen-main .list-truyen .row').each((index, element) => {
                const title = $(element).find('.truyen-title a').text().trim();
                const author = $(element).find('.author').text().trim();
                const totalChapters = parseInt($(element).find('.text-info a').text().trim().split("Chương ")[1]);
                const link = $(element).find('.truyen-title a').attr('href');
                const image = $(element).find('[data-image]').attr('data-image');
                matchedNovels.push({ title, link, image, author, totalChapters });
            });

            // Get total pages of search result
            if (!matchedNovels.length == 0) {
                let totalPages = this.#getTotalPages($);
                rs.totalPages = totalPages;
            }
            else {
                let totalPages = 0;
                rs.totalPages = totalPages;
            }

            rs.matchedNovels = matchedNovels;

            return rs;

        } catch (error) {
            throw error;
        }
    }
}
