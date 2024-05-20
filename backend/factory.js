const Domain1 = require("./Services/domain1")

module.exports = class Factory {
    Inject(domainName) {
        if (domainName=='domain1') {
            return new Domain1();
        }
    }
}