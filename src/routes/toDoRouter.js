const express = require('express');
const router = express.Router();

const toDoController = require('../controllers/toDoController');

const validateTugas = require('../middleware/tugasValidate');

//get all cars
router.get('/', toDoController.getAllTugas);

//get car by id
router.get('/:id_tugas', toDoController.getTugasById);

//post create new car
router.post('/', validateTugas, toDoController.createTugas);

//put tugas by id
router.put('/:id_tugas', validateTugas, toDoController.updateTugas);

//delete car by id
router.delete('/:id_tugas', toDoController.deleteTugas);

module.exports = router;