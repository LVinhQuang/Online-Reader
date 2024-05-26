const TangThuVien = require('../Services/tangthuvien');
const TruyenFull = require('../Services/truyenfull');
//TODO: thay TangThuVien, Truyenfull thành factory

module.exports = {
    GetFeaturedNovels: async function(req, res){
        try{
            const Domain = new TruyenFull();//
            console.log(Domain);
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
            const Domain = new TruyenFull();//
            let Data = await Domain.GetNovelDetail(req.params.name);

            res.status(200).json({ data: Data });
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }
    }
}
