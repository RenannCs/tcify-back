const jwt = require('jsonwebtoken');
require('dotenv').config();

class JwtToken {
    constructor() {
        this.secretKey = process.env.SECRET_KEY;
        //this.expireDate = 60 * 60 * 24;
    }

    createToken(payload) {
        if (!this.secretKey) {
            throw new Error("Secret key is not defined!");
        }
        return jwt.sign({ data: payload }, this.secretKey);
    }


    createGuestToken() {
        if (!this.secretKey) {
            throw new Error("Secret key is not defined!");
        }
        return jwt.sign(this.secretKey);
    }

    validateToken(jwtToken) {
        try {
            if (!jwtToken) {
                throw new Error("Invalid token: payload not received!");
            }

            const tokenArray = jwtToken.split(" ");

            if (tokenArray.length !== 2 || tokenArray[0].toLowerCase() !== "bearer") {
                throw new Error("Invalid token: invalid format!");
            }

            const [schema, token] = tokenArray;

            const decoded = jwt.verify(token, this.secretKey);

            return {
                status: true,
            };
        } catch (error) {
            return {
                status: false,
                error: error.message
            };
        }
    }
}

module.exports = JwtToken;
