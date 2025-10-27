const tugasModel = require('../models/toDoModel');

const getAllTugas = async(req, res) => {
    try {
        const tugas = await tugasModel.getAllTugas();
        res.json({
            success: true,
            data: tugas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting tugas',
            error: error.message
        });
    }
};

const getTugasById = async (req, res) => {
    try {
        const {id_tugas} = req.params;
        const tugas = await tugasModel.getTugasById(id_tugas);

        if (!tugas) {
            return res.status(404).json({
                success: false,
                message: 'Tugas not found'
            });
        }

        res.json({
            success: true,
            data: tugas
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting tugas',
            error: error.message
        });
    }
};

const createTugas = async (req, res) => {
    try {

        //kode debug
        // console.log('Isi req.body:', req.body);

        const {judul, deskripsi, deadline, status, prioritas, dibuat_pada} = req.body;

        //simple validasi, di tutup karena sudah pakai middleware agar tidak terjadi double validasi
        // if (!judul || !deskripsi || !deadline || !status || !prioritas || !dibuat_pada) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'judul, deskripsi, deadline, status, prioritas, dibuat_pada are required'
        //     });
        // }

        const tugasId = await tugasModel.createTugas({judul, deskripsi, deadline, status, prioritas, dibuat_pada});

        res.status(201).json({
            success: true,
            message: 'Tugas created successfully',
            data: {id_tugas: tugasId, judul, deskripsi, deadline, status, prioritas, dibuat_pada}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating tugas',
            error: error.message
        });
    }
};

const updateTugas = async (req, res) => {
    try {

        // console.log("Params:", req.params);
        // console.log("Body:", req.body);

        const {id_tugas} = req.params;
        const {tugasId, judul, deskripsi, deadline, status, prioritas, dibuat_pada} = req.body;

        //simple validasi
        // if (!brand || !model || !year || !price) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Brand, model, year, price are required'
        //     });
        // }

        const affectedRows = await tugasModel.updateTugas(id_tugas, {judul, deskripsi, deadline, status, prioritas, dibuat_pada});

        if (affectedRows == 0) {
            return res.status(404).json({
                success: false,
                message: 'Tugas not found'
            });
        }

        res.json({
            success: true,
            message: 'Tugas update successfully',
            data: {id_tugas, judul, deskripsi, deadline, status, prioritas, dibuat_pada}
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating Tugas',
            error: error.message
        });
    }
};

const deleteTugas = async (req, res) => {
    try {
        const {id_tugas} = req.params;
        const affectedRows = await tugasModel.deleteTugas(id_tugas);

        if (affectedRows == 0) {
            return res.status(404).json({
                success: false,
                message: 'Tugas not found'
            });
        }

        res.json({
            success: true,
            message: 'Tugas delete successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting tugas',
            error: error.message
        });
    }
};

module.exports = {
    getAllTugas,
    getTugasById,
    createTugas,
    updateTugas,
    deleteTugas
};