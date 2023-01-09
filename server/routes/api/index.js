const express = require('express'),
  { api: controller } = require('../../controllers');


const router = express.Router();

router.route('/main')
  .get(controller.getMain);

router.route('/json')
  .get(controller.getJson);

module.exports = router;