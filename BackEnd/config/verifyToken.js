const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) return res.status(401).json({ message: "Token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded;  

        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid Token" });
    }
};


const isFaculty = (req, res, next) => {
  ;
  if(req.user.role === "faculty") next();
  else res.status(401).json({ message: "Access Denied" });
};

const isMessStaff = (req, res, next) => {
  ;
  if(req.user.role === "mess-staff") next();
  else res.status(401).json({ message: "Access Denied" });
};

module.exports = { verifyToken, isFaculty , isMessStaff};
