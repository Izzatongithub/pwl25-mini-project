const jwt = require("jsonwebtoken");


const authenticateToken = (req, res, next) => {
    //ambil header authorization dari request
    const authHeader = req.headers["authorization"];

    // extract token dari header "Bearer<token>"
    // authHeader.split(" ")[1] mengambil bagian setelah bearer
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "access denied, token required"
        });
    }

    // verifikasi token menggunakan jwt secret
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        //jika token tidak valid atau expired
        if (err) {
            return res.status(403).json({
                success: false,
                message: "invalid or expired token"
            });
        }

        //jika token valid, simpan data user ke req.user
        //data ini bisa di akses di controller selanjutnya
        req.user = user;

        next();
    });
}; 

module.exports = authenticateToken