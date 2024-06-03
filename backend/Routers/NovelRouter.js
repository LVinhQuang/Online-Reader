const router = require('express').Router();
const NovelController = require('../Controllers/NovelController');

router.get('/:domain', NovelController.GetFeaturedNovels);
// router.get('/:domain/search', NovelController.SearchNovel);
router.get('/:domain/:name', NovelController.GetNovelDetail);
router.get('/:domain/:name/:chapter', NovelController.GetChapter);

module.exports = router;