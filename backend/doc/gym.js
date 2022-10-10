getGymList((result) => {
    const { name, manager, address, phone, stateId, cityId, isBasement, operatingHours, description, starPlayerDesc, priceDescription, isDelete, regDatetime }
        = result
})

module.exports = getGymList