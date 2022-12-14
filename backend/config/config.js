const dotenv = require('dotenv')

dotenv.config()

function required(key, defaultValue = undefined) { //required 주의
    const value = process.env[key] || defaultValue

    if (value == null) {
        throw new Error(`Key '${key}' is undefiend`)
    }

    return value
}

const config = {
    encryption: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
    },
    port: parseInt(required('PORT', 4000)),
    db: {
        host: required('DB_HOST_URL'),
        port: required('DB_PORT', 3306),
        database: required('DB_DATABASE'),
        user: required('DB_USER'),
        password: required('DB_PASSWORD'),
    },
    cors: {
        allowedOrigin: required('CORS_ALLOW_ORIGIN'),
    },
    session: {
        key: required('SESSION_KEY'),
        secret: required('SESSION_SECRET'),
    },
    passport: {
        secret: required('PASSPORT_SECRET'),
    }
}

module.exports = config
