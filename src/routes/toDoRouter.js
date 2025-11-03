const express = require('express');
const router = express.Router();

const toDoController = require('../controllers/toDoController');
const validateTugas = require('../middleware/tugasValidate');

//tambahkan middleware auth
const authenticateToken = require("../middleware/authMiddleware")

//get all data
router.get('/', authenticateToken, toDoController.getAllTugas);

//get car by id
router.get('/:id_tugas', toDoController.getTugasById);

//post create new data
router.post('/', authenticateToken, validateTugas, toDoController.createTugas);

// router.post('/', validateTugas, toDoController.createTugas);
// router.post('/', toDoController.createTugas);

//put tugas by id
router.put('/:id_tugas', authenticateToken, validateTugas, toDoController.updateTugas);

// router.put('/:id_tugas', validateTugas, toDoController.updateTugas);

//delete car by id
router.delete('/:id_tugas', toDoController.deleteTugas);

module.exports = router;