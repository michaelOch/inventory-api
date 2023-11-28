const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });
            req.user = decoded.UserInfo.email;
            req.type = decoded.UserInfo.type;
            next();
        }
    )
}

const adminAuthorization = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' });
            req.user = decoded.UserInfo.email;
            req.type = decoded.UserInfo.type;

            if (decoded.UserInfo.type.includes('admin')) {
                
                next();
            } else {
                console.log('Forbidden. You have no access to this resource')
                return res.status(403).json({status: false, msg: "Forbidden. You have no access to this resource"});
            }
        }
    )

}

module.exports = {
    verifyJWT,
    adminAuthorization
};