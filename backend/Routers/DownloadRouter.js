const router = require('express').Router();
const DownloadController = require('../Controllers/DownloadController');

router.get('/:domain/:name/:chapter/:type', DownloadController.Download);
router.get('/types', DownloadController.DownloadTypes)

module.exports = router;