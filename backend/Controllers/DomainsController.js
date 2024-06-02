const DomainsModel = require('../Models/DomainsModel');

module.exports = {
    GetAllDomains: async function(req, res){
        try {
           
            const Domains = new DomainsModel();
            let Data = await Domains.GetAllDomains();

            res.status(200).json({data:Data});
            
        } catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }
    }
}