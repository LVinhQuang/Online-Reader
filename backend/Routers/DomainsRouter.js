const router = require('express').Router();
const DomainsController = require('../Controllers/DomainsController');

router.get('/', DomainsController.GetAllDomains);

module.exports = router;