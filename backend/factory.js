const TangThuVien = require("./Services/tangthuvien")
const TruyenFull = require("./Services/truyenfull")

module.exports = class Factory {
    Inject(domainName) {
        if (domainName=='tangthuvien') {
            return new TangThuVien();
        }
    }
}