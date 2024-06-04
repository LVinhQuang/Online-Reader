
module.exports = class Factory {
    constructor(domainName) {
        const Domain = require(`${global.ListDomain[domainName]}`)
        return new Domain();
    }
}