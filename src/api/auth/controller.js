import { authAdministrador, setTokenAdmin } from '../admin/model'
import { authApoderado, setTokenUser } from '../usuario/model'
import { authParvulario, setTokenTeacher } from '../teacher/model'
var jwt = require('jsonwebtoken');

export const authUser = (req, res) => {
  authApoderado(req.body).then(
    result => {
      if (result == '') {
        console.log("nop")
        res.json({ sucess: false })
      } else {
        setTokenUser({ id: result[0].id, token: createToken(result[0]) })
        res.json({ success: true, token: createToken(result[0]), rol: 'user' })
      }
    },
    error => {
      console.log(error)
    }
  )
}
export const authTeacher = (req, res) => {
  authParvulario(req.body).then(
    result => {
      if (result == '') {
        console.log("nop")
        res.json({ sucess: false })
      } else {
        setTokenTeacher({ id: result[0].id, token: createToken(result[0]) })
        res.json({ success: true, token: createToken(result[0]), rol: 'teacher' })
      }
    },
    error => {
      console.log(error)
    }
  )
}
export const authAdmin = (req, res) => {
  authAdministrador(req.body).then(
    result => {
      if (result == '') {
        console.log("nop")
        res.json({ sucess: false })
      } else {
        setTokenAdmin({ id: result[0].id, token: createToken(result[0]) })
        res.json({ success: true, token: createToken(result[0]) })
      }
    },
    error => {
      console.log(error)
    }
  )
}



function createToken(info) {
  console.log(info)
  var json = { 'id': info.id, 'id_institucion': info.id_institucion }
  console.log("soy el json", json)
  var token = jwt.sign(json, 'tokent');
  console.log("soy el token", token)
  return token
}

function decifrateToken(token) {
  var decoded = jwt.verify(token, 'tokent');
  return decoded
}