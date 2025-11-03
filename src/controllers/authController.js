//import dependencies

const db = require("../config/db"); //db connection
const jwt = require("jsonwebtoken"); //jwt token
const bcrypt = require("bcrypt"); //pas hash

//proses register

exports.register = async(req, res) => {
    try{
        //ambil uname dan pass dari request body
        const{
            username, password
        } = req.body;

        //validasi input - pastikan uname dan pass ada
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username dan password dibutuhkan" 
            });
        }

        // cek apakan uname sudah ada di database
        const[existingUser] = await db.query("SELECT id FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Username already axist"
            });
        }

        //hash pass dengan bcrypt (salt rounds = 10)
        const hashedPassword = bcrypt.hashSync(password, 10);

        //insert user baru ke database
        const [result] = await db.query(
            "INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]
        );

        // response sukses dengan data user yang baru dibuat
        res.status(201).json({
            success: true,
            message: " user registered successfully",
            data: {
                id: result.insertId,
                username
            }
        });

    }catch(error){
        //handle error databse atau server
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

//proses login
exports.login = async(req, res) => {
    try{
        //ambil uname dan pass dari request body
        const{
            username, password
        } = req.body;

        //validasi input - pastikan uname dan pass ada
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username dan password dibutuhkan" 
            });
        }

        //cari user berdasarkan username
        const[results] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        const user = results[0];

        //cek apakah uname dan pass cocok?
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                success: false,
                message: "invalid credentials" 
            });
        }

        //generate jwt token dengan payload user info
        const token = jwt.sign(
            {id: user.id, username: user.username}, //payload
            process.env.jwt_SECRET,                 //secret key
            {expiresIn: "1h"}                       //token berlaku 1 jam
        );

        // response sukses dengan token
        res.json({success: " true, false}"});

    }catch(error){
        //handle error databse atau server
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

