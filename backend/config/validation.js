module.exports = (req, res) => {
    const { username, password, name, email, phone } = req.body

    const unameRegExp = /^[a-zA-z0-9\s]{2,10}$/
    unameRegExp.test(username) ? console.log('pass') : console.log('Check username validation')

    const pwRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[a-z\d@$!%*#?&\s]{4,15}$/
    pwRegExp.test(password) ? console.log('pass') : console.log('Check password validation')

    const nameRegExp = /^[a-zA-z가-힣\s]{2,10}$/
    nameRegExp.test(name) ? console.log('pass') : console.log('Check name validaion')

    const emailRegExp = /^[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*@[0-9a-zA-Z\s]([-_.]?[0-9a-zA-Z\s])*.[a-zA-Z\s]{2,3}$/i
    emailRegExp.test(email) ? console.log('pass') : console.log('Check email validation')

    phone.replace(' ', "")
    const phoneRegExp = /^\d{3}-\d{3,4}-\d{4}$/
    phoneRegExp.test(phone) ? console.log('pass') : console.log('Check phone validation')

    return { username, password, name, email, phone }
}