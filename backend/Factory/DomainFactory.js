const fs = require('fs');
const path = require('path');

module.exports = class DomainFactory {
    static domainCache = new Map()

    static InitDomainCache(dirname) {
        let files = fs.readdirSync(dirname)
        files.forEach(file => {
            let domainName = file.split('.')[0];
            this.AddDomain(domainName);
        })
    }

    static AddDomain(domainName) {
        const newDomain = require(`../Services/Domain/${domainName}`);
        this.domainCache.set(domainName, newDomain);
    }

    static RemoveDomain(domainName) {
        this.domainCache.delete(domainName);
    }

    static GetDomain(domainName) {
        return this.domainCache.get(domainName);
    }

    static GetAllDomains() {
        let domains =  Array.from(this.domainCache.keys());
        return domains;
    }
}