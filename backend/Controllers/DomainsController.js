const DomainFactory = require('../Factory/DomainFactory');

module.exports = {
    GetAllDomains: async function(req, res){
        try {
                        
            let Data = DomainFactory.GetAllDomains();

            res.status(200).json({data:Data});
            
        } catch (error) {
            //console.log(error)
            res.status(500).json({ message: error });
        }
    }
}