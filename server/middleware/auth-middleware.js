const jwt = require('jsonwebtoken')

const authmiddlware = (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized user'
            })
        }

        let decodedtokenInfo

        try {
            decodedtokenInfo = jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized user'
            })
        }

        req.userInfo = decodedtokenInfo
        next()

    } catch (err) {
        next(err)
    }
}

module.exports = authmiddlware