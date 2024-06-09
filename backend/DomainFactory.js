const fs = require('fs');
const path = require('path');

module.exports = new class DomainFactory {
    constructor() {
        this.domainCache = new Map();
        let files = fs.readdirSync(path.resolve(__dirname, './Services/Domain'));
        files.forEach(file => {
            let domainName = file.split('.')[0];
            this.addDomain(domainName);
        });
    }

    addDomain(domainName) {
        const newDomain = require(`./Services/Domain/${domainName}`);
        this.domainCache.set(domainName, newDomain);
    }

    removeDomain(domainName) {
        this.domainCache.delete(domainName);
    }

    getDomain(domainName) {
        return this.domainCache.get(domainName);
    }
}