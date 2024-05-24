const router = require('express').Router();
const NovelController = require('../Controllers/NovelController');

router.get('/', NovelController.GetFeaturedNovel);

module.exports = router;