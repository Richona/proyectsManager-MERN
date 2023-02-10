const express = require('express');
const router = express.Router();

const {profile, update, remove} = require('../controllers/usersController');
const checkToken = require('../middlewares/checkToken');

/* /api/users */
router
    .get("/profile", profile)
    
    .route('/profile/:id')
        .post(update)
        .delete(remove)

module.exports = router;
