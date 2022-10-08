// climbing gym
const { promisePool } = require('../src/db')
const getGymList = require('../doc/gym')
const today = new Date()

const climbingInfo = {
    name: getGymList.name,
    manager: getGymList.manager,
    address: getGymList.address,
    phone: getGymList.phone,
    stateId: getGymList.stateId,
    cityId: getGymList.cityId,
    isBasement: getGymList.isBasement,
    operatingHours: getGymList.operatingHours,
    description: getGymList.description,
    starPlayerDesc: getGymList.starPlayerDesc,
    priceDescription: getGymList.priceDescription,
    isDelete: getGymList.isDelete,
    regDatetime: today,
}

try {
    const sql = `INSERT INTO gym SET ?`
    promisePool.query(sql, climbingInfo)
} catch (err) {
    res.status(500).json({ message: err.message })
}
