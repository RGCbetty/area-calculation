const { master_list } = require('../../../../utils/dbconfig')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

exports.signin = async (req, res) => {
  try {
    let user = await master_list.view('delo', 'byEmployeeCode', {
      key: req.body.username,
    })
    let passwordIsValid =
      user.rows[0].value.password == md5(req.body.password) ? true : false
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!',
      })
    }
    let token = jwt.sign({ id: user.rows[0].id }, process.env.SECRET_KEY, {
      expiresIn: 86400, // 12 hours
    })
    // let decode = jwt_decode(token)
    let userInfo = {
      name: user.rows[0].value.fullName,
      employeeCode: user.rows[0].value.employeeCode,
      department: user.rows[0].value.department,
      section: user.rows[0].value.section,
      team: user.rows[0].value.team,
    }
    return res.status(200).send({
      user: userInfo,
      accessToken: token,
    })
  } catch (err) {
    console.log(err)
    return res.status(200).send({ message: 'User not found' })
  }
}

exports.validate = (req, res, next) => {
  const token = req.get('x-access-token')
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: 'Forbidden!',
      })
    }
    return res.status(200).send({ message: 'Validated!' })
  })
  next()
}
