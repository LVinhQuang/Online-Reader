const router = require('express').Router();
const NovelController = require('../Controllers/NovelController');

router.get('/', NovelController.GetFeaturedNovels);
router.get('/:name', NovelController.GetNovelDetail);
router.get('/:name/:chapter', NovelController.GetChapter);

module.exports = router;