const TangThuVien = require('../Services/tangthuvien');
const TruyenFull = require('../Services/truyenfull');
//TODO: thay TangThuVien, Truyenfull thành factory

module.exports = {
    GetFeaturedNovels: async function (req, res) {
        try {
            const Domain = new TangThuVien();//
            let Data = await Domain.GetFeaturedNovels();

            res.status(200).json({ data: Data });
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }
    },

    GetDetailNovel: async function (req, res) {
        try {
            const Domain = new TangThuVien();//
            let Data = await Domain.GetDetailNovel(req.params.name);

            res.status(200).json({ data: Data });
        }
        catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }
    }
}
