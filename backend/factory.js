const TangThuVien = require("./Services/tangthuvien")
const TruyenFull = require("./Services/truyenfull")

module.exports = class Factory {
    constructor(domainName) {
        const Domain = require(`${global.ListDomain[domainName]}`)
        return new Domain();
    }
}