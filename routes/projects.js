const express = require('express');
const router = express.Router();

const { list, store, detail, update, remove, addCollaborator, removeCollaborator } = require('../controllers/projectsController')

/* /api/projects */

router
    .route('/')
        .get(list)
        .post(store)
router
    .route('/:id')
        .get(detail)
        .put(update)
        .delete(remove)
router
    .post('/collaborator/add', addCollaborator)
    .post('/collaborator/remove',removeCollaborator)

module.exports = router;
