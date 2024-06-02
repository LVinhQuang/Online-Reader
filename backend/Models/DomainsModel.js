const fs = require('fs');

module.exports = class Domains {
    async GetAllDomains(){
        try {
            let files = fs.readdirSync('./Services');
            let domains = [];
            files.forEach(file => {
                let domain = file.split('.')[0];
                domains.push(domain);
            });
            return domains;
            
        } catch (error) {
            throw error;
        }
    }
}