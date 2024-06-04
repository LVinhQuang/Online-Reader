const Factory = require('../factory');
//TODO: thay TangThuVien, Truyenfull thành factory -> Done

module.exports = {
    GetFeaturedNovels: async function(req, res){
        try{

            const Domain = new Factory(req.params.domain);

            let Data = await Domain.GetFeaturedNovels();
            
            res.status(200).json({data:Data});
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }
    },

    GetNovelDetail: async function (req, res) {
        try {

            const Domain = new Factory(req.params.domain);
            let Data = await Domain.GetNovelDetail(req.params.name);

            res.status(200).json({ data: Data });
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }
    },

    GetChapter: async function (req, res) {
        try {

            const Domain = new Factory(req.params.domain);
            let Data = await Domain.GetChapter(req.params.name, req.params.chapter);
            res.status(200).json({ data: Data });
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }
    },

    SearchNovel: async function (req, res) {
        try {
            const Domain = new Factory(req.params.domain);
            let Data = await Domain.SearchNovel(req.query.keyword,req.query.page);
            res.status(200).json({ data: Data });
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }


    },
}
