const db = require('../config/db');

const getAllTugas = async() => {
    try{
        const [rows] = await db.query('SELECT * FROM tugas');
        return rows;
    }catch(error){
        console.error('Error in getAllTugas model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const getTugasById = async (id_tugas) => {
    try {
        const[rows] = await db.query('SELECT * FROM tugas WHERE id_tugas = ?', [id_tugas]);
        return rows[0];
    } catch (error) {   
        console.error('Error in getTugasById model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

const createTugas = async (tugasData) => {
    try {
        const {judul, deskripsi, deadline, status, prioritas, dibuat_pada} = tugasData;
        const [result] = await db.query(
            'INSERT INTO tugas(judul, deskripsi, deadline, status, prioritas, dibuat_pada) VALUES (?, ?, ?, ?, ?, ?)',
            [judul, deskripsi, deadline, status, prioritas, dibuat_pada]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error in createCar model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
        

    }
};

const updateTugas = async (id_tugas, tugasData) => {
    try {
        const {judul, deskripsi, deadline, status, prioritas, dibuat_pada} = tugasData;
        const [result] = await db.query(
            'UPDATE tugas SET judul = ?, deskripsi = ?, deadline = ?, status = ?, prioritas = ?, dibuat_pada = ? WHERE id_tugas = ?',
            [judul, deskripsi, deadline, status, prioritas, dibuat_pada, id_tugas]
        );
        return result.affectedRows;
    } catch (error) {
        console.error('Error in updateTugas model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
        

    }
};

const deleteTugas = async (id_tugas) => {
    try {
        const [result] = await db.query('DELETE FROM tugas WHERE id_tugas = ?', [id_tugas]);
        return result.affectedRows;
    } catch (error) {
        console.error('Error in deleteTugas model:', error.message);
        throw new Error(`Database query failed: ${error.message}`);
    }
};

module.exports = {
    getAllTugas,
    getTugasById,
    createTugas,
    updateTugas,
    deleteTugas
}