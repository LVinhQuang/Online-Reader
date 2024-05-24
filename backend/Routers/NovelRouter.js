const router = require('express').Router();
const NovelController = require('../Controllers/NovelController');

router.get('/', NovelController.GetFeaturedNovels);

module.exports = router;