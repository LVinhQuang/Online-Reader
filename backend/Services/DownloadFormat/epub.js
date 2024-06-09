const Epub = require("epub-gen");
const path = require('path');
const fs = require('fs');
const DomainFactory = require('../../DomainFactory');
module.exports = new class EPUB {
    async Download(req, res) {
        const Domain = DomainFactory.getDomain(req.params.domain);
        let DetailNovel = await Domain.GetNovelDetail(req.params.name);
        let DetailChapter = await Domain.GetChapter(req.params.name, req.params.chapter);
        let title = DetailNovel.title;
        let chapter = DetailChapter.chapterTitle;
        let author = DetailNovel.author;

        const options = {
            title: title,
            author: author,
            content: [
                {
                    title: chapter,
                    data: DetailChapter.content
                }
            ]
        };
        //console.log(options);
                
        const outputPath = path.join('./Services/book.epub');

        // Generate the EPUB file
        try {
            await new Epub(options, outputPath).promise;
            
            // Send the file as a response
            res.download(outputPath, 'book.epub', (err) => {
                if (err) {
                    console.error("Error while downloading file:", err);
                    res.status(500).send("Error downloading file");
                } else {
                    // Clean up the file after download
                    fs.unlinkSync(outputPath);
                }
            });
        } catch (error) {
            console.error("Error generating EPUB:", error);
            res.status(500).send("Error generating EPUB");
        }        
    }
}