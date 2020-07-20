import {
  newReceta,
  newUsuario,
  borrarReceta,
  consultaUsuario,
  listaUsuario,
  obtenerUsuario,
  newIngrediente,
  listaIngrediente,
  completarIngredientes,
  completePasos,
  obtenerReceta,
  obtenerPasos,
  obtenerIngReceta,
  addIng,
  obtenerIngDespensa,
  borrarIngDespensa,
  getUsuarioId,
  listaRecetas,
  listaMisRecetas

} from './model'
import { response } from 'express';
import { createPool } from 'mysql';
import { get } from 'request-promise';
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
  newReceta(req.body)
    .then(result => {
      console.log("respuesta nueva receta = ",result.insertId)
      res.json(result)
    })
    .catch(error => {
      res.json(error)
    })
}

export const completarIng = (req, res) => {
  console.log("controller",req.body)
  completarIngredientes(req.body)
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      res.json(error)
    })
}

export const completarPasos = (req, res) => {
  console.log("controller",req.body)
  completePasos(req.body)
    .then(result => {
      res.json(result)
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
  listaIngrediente()
    .then(result => {
      console.log(result,"acaaa")
      res.json(result)
    })
    .catch(error => {
      res.json(error)
    })
}

export const allRecetas = (req, res) => {
  console.log('obtener todas las recetas')
  listaRecetas()
    .then(result => {
      console.log(result,"acaaa")
      res.json(result)
    })
    .catch(error => {
      res.json(error)
    })
}

export const misRecetas = (req, res) => {
  console.log('obtener mis recetas',req.body)
  listaMisRecetas(req.body)
    .then(result => {
      console.log(result,"acaaa")
      res.json(result)
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

  export const getUsuario = (req, res) => {
    console.log("get usuario id")
    getUsuarioId(req.body).then(
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


//--funciones Para mostrar una receta completa--//

export const getReceta = (req, res) => {
  console.log("Controller get Receta", req.body)
  obtenerReceta(req.body).then(
    result => { 
      console.log("resultado get resta",result)
      res.send(result)
    },
    error => {
      console.log('ERRORAZO Get Receta')
      res.json({ error: error })
    }
  )
}

export const getPasos = (req, res) => {
  console.log("Get Pasos")
  obtenerPasos(req.body).then(
    result => {
      console.log(result,"resultado Get Pasos")
      res.send(result)
    },
    error => {
      console.log('ERRORAZO Get Pasos')
      res.json({ error: error })
    }
  )
}
export const getIngReceta = (req, res) => {
  console.log("Get Ing Receta")
  obtenerIngReceta(req.body).then(
    result => {
      console.log("resultado Get Ing Receta",result)
      res.send(result)
    },
    error => {
      console.log('ERRORAZO Get Ing Receta')
      res.json({ error: error })
    }
  )
}





  //--Despensa--//

  export const addIngDespensa = (req, res) => {
    console.log("controller",req.body)
    addIng(req.body)
      .then(result => {
        res.json(result)
      })
      .catch(error => {
        res.json(error)
      })
  }
  

  export const getIngDespensa = (req, res) => {
    console.log("Aca va el id",req.query)
    obtenerIngDespensa(req.query).then(
      result => {
        console.log(result,"resultado Get Ing Despensa")
        res.json(result)
      },
      error => {
        console.log('ERRORAZO Get Ing Despensa')
        res.json({ error: error })
      }
    )
  }

  export const eliminarIngDesp= (req, res) => {
    borrarIngDespensa(req.body)
      .then(result => {
        res.json(response)
      })
      .catch(error => {
        res.json(error)
      })
  }

  
  