const express = require('express');
const router = express.Router();
const apiController = require('../controllers/module-controller');
const notFoundController = require('../controllers/not-found-controller');

module.exports = function(app){

router.get('/graphql/:module', apiController.all);
router.post('/graphql/:module', apiController.create);
router.get('/graphql/:module/:id', apiController.get);
router.put('/graphql/:module/:id', apiController.update);
router.delete('/graphql/:module/:id', apiController.destroy);

router.get('*', notFoundController.show);

return router;
}