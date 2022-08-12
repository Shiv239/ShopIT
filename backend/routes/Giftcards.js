// Author : [Tejaswini Rallapali](sr805848@dal.ca) 

const express = require('express');
const router = express.Router();
const giftcardController = require('../controllers/Giftcards');

router.post('/addgiftcard', giftcardController.addGiftcard)
router.get("/fetchGiftCards", giftcardController.fetchAllGiftcards);
router.get('/fetchGiftcardByGiftcardID/:id?', giftcardController.fetchGiftcardByGiftcardID)

module.exports = router