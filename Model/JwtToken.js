const jwt = require('jsonwebtoken');

class JwtToken {
    constructor() {
        this.secretKey = process.env.SECRET_KEY;
        this.expireDate = 60 * 60 * 24;
    }

    createToken(payload) {
        if (!this.secretKey) {
            throw new Error("Secret key is not defined!");
        }
        return jwt.sign({ data: payload }, this.secretKey, { expiresIn: this.expireDate });
    }

    validateToken(jwtToken) {
        try {
            if (!jwtToken) {
                throw new Error("Invalid token: payload not received!");
            }

            const tokenArray = jwtToken.split(" ");

            if (tokenArray.length !== 2) {
                throw new Error("Invalid token: invalid format!");
            }

            const [schema, token] = tokenArray;

            const decoded = jwt.verify(token, this.secretKey);

            return {
                status: "VALID",
                data: decoded,
                message: "Valid token."
            };
        } catch (error) {
            return {
                status: "INVALID",
                data: null,
                message: `Token validation failed: ${error.message}`
            };
        }
    }
}

module.exports = JwtToken;
