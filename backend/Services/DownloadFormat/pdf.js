const PDFDocument = require('pdfkit');
const DomainFactory = require('../../Factory/DomainFactory');
const fs = require('fs');

module.exports = new class PDF {
    removeHtmlTags(html) {
        return html.replace(/<[^>]*>/g, '');
    }

    async Download(req, res) {
        const doc = new PDFDocument();
        const Domain = DomainFactory.GetDomain(req.params.domain);
        let DetailChapter = await Domain.GetChapter(req.params.name, req.params.chapter);
        let title = DetailChapter.title;
        let chapter = DetailChapter.chapterTitle;

        // Set response headers for PDF download
        res.setHeader('Content-disposition', 'attachment; filename=document.pdf');
        res.setHeader('Content-type', 'application/pdf');

        // Pipe the PDF content to the response
        doc.pipe(res);
        
        // Add content to the PDF document
        doc.pipe(fs.createWriteStream('output.pdf'));
        var data = DetailChapter.content.split("<br><br>").join("\n");
        data = this.removeHtmlTags(data);

        doc.font('./Fonts/Roboto-Black.ttf');        
        doc.fontSize(20).text(title, { align: 'center', embedFonts: true, encoding: 'utf-8' });
        doc.fontSize(18).text(chapter, { align: 'center', embedFonts: true, encoding: 'utf-8' });
        doc.font('./Fonts/Roboto-Light.ttf');
        doc.fontSize(16).text(data, { embedFonts: true, encoding: 'utf-8' });        
        
        doc.end();
    }
}