const validateTugas = (req, res, next) => {
    //cek apakah req.body ada
    if (!req.body || Object.keys(req.body).length == 0) {
        return res.status(400).json({
            message: "Request body is required. Please provide"
        });
    }

    //lakukan validasi pada tiap isian
    const{judul, deskripsi, deadline, status, prioritas, dibuat_pada} = req.body;
    if (!judul || !deskripsi || !deadline || !status || !prioritas || !dibuat_pada) {
        return res.status(400).json({
            message: "judul, deskripsi, deadline, status, prioritas, dibuat_pada are required"
        });
    }
    next();
};

module.exports = validateTugas;