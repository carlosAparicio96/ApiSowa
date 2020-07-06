import {
  newReceta,
  newUsuario,
  borrarReceta,
  consultaUsuario,
  listaUsuario,
  obtenerUsuario,
  newIngrediente,
  listaIngrediente
} from './model'
import { response } from 'express';
var jwt = require('jsonwebtoken');

/* export const obtenerUsuario = (req, res) => {
  res.json({ hola: 'negro' })
} */
export const obtenerInstitucion = (req, res) => {
  let id_institucion = decifrateToken(req.body.token).id_institucion
  institucion(id_institucion).then(
    result => {
      res.json(result)
    },
    error => {
      console.log(error)
    }
  )
}
export const obtenerParvularios = (req, res) => {
  let body = req.body
  console.log(body)
  parvularios(id_institucion).then(
    result => {
      res.json(result)
    },
    error => {
      console.log(error)
    }
  )
}


export const obtenerHijos = (req, res) => {
  hijos(decifrateToken(req.body.token).id).then(result => {
    res.send(result)
  }, error => {
    console.log(error)
    res.json({ error: error })
  })
}


export const obtenerApoderadoParvulo = (req, res) => {
  var id = req.params.id
  apoderadoParvulo(id).then(result => {
    res.send(result)
  }, error => {
    console.log('ERRORAZO')
    res.json({ error: error })
  })
}

export const obtenerMedicamento = (req, res) => {
  medicamento(req.body).then(
    result => {
      res.send(result)
    },
    error => {
      console.log('ERRORAZO')
      res.json({ error: error })
    }
  )
}

export const obtenerApoderados = (req, res) => {
  listaApoderados().then(
    result => {
      res.json(result)
    },
    error => {
      res.json({ error: error })
    }
  )
}
export const obtenerApoderado = (req, res) => {
  apoderado(req.body.id).then(
    result => {
      res.send(result)
    },
    error => {
      console.log('ERRORAZO')
      res.json({ error: error })
    }
  )
}
export const nuevoTutor = (req, res) => {
  newTutor(req.body)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}
export const editarApoderado = (req, res) => {
  editApoderado(req.body)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}
// ----------------------Parvulos------------------
function decifrateToken(token) {
  var decoded = jwt.verify(token, 'tokent');
  return decoded
}


//---Carloco----//

//--Receta--//

export const nuevaReceta = (req, res) => {
  console.log('nueva receta')
  newReceta(req.body)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}

export const eliminarReceta= (req, res) => {
  var id = req.params.id
  borrarReceta(id)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}

export const ingrediente = (req, res) => {
  console.log('nuevo ingrediente')
  newIngrediente(req.body)
    .then(result => {
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}

export const obtenerIng = (req, res) => {
  console.log('obtener ingrediente')
  listaIngrediente(req.body)
    .then(result => {
      console.log(result,"acaaa")
      res.json(response)
    })
    .catch(error => {
      res.json(error)
    })
}

//--Usuario--//

export const inicioSesion = (req, res) => {
  console.log("iniciar sesion")
  obtenerUsuario(req.body).then(
    result => {
      console.log(result,"acaaa")
      res.send(result)
    },
    error => {
      console.log('ERRORAZO')
      res.json({ error: error })
    }
  )
}


  export const registrarUsuario = (req, res) => {
    console.log(req.body)
    consultaUsuario(req.body).then(
      result => {
        console.log(result)
        if( result.length == 0){
          newUsuario(req.body)
            .then(result2 => {

            console.log(result2,"aqui")
            res.send(result2)
          })
            .catch(error => {
            res.json(error)
        })
        }
        else{
          res.send({sucess: false})
        }
      },
      error => {
        console.log('error',error)
        res.json({ error: error })
      }
    )
  }