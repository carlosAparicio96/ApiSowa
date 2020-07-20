import { mysql as mysqlConfig } from '../../config'
import Mail from 'nodemailer/lib/mailer'

var mysql = require('mysql')
//login

export const institucion = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'select nombre,correo,direccion,telefono,logo,vision from institucion where id=?'
    connection.query(sql, id, (error, results, field) => {
      if (error) console.log(error)
      else resolve(results)
    })
    connection.end()
  })
}
export const parvularios = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'select nombre,lugar_estudios,certificado_in,certificado_antecedentes,correo,fotografia from parvulario where id_institucion=?'
    connection.query(sql, id, (error, results, field) => {
      if (error) console.log(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const authApoderado = data => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'select * from apoderado where correo=? && password=?'
    var dats = [data.email, data.password]
    connection.query(sql, dats, (error, results, field) => {
      if (error) console.log(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const setTokenUser = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    console.log(datos)
    var sql =
      'UPDATE apoderado SET token = ? WHERE (apoderado.id = ?)'
    var dats = [
      datos.token,
      datos.id
    ]
    connection.query(sql, dats, (error, results, field) => {
      if (error) console.log(error)
      else resolve(results)
    })
    connection.end()
  })
}

/////Medicamentos

//APODERADOS aQUI
export const apoderadoParvulo = (id) => {
  return new Promise((resolve, reject) => {
    var sql = 'SELECT A.* FROM apoderado AS A INNER JOIN APOPARVULO AS AP ON AP.id_apoderado=a.id WHERE AP.id_parvulo=?'
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    connection.query(sql, id, (error, results, field) => {
      if (error) console.log('error', error)
      else resolve(results)
    })
    connection.end()
  })
}

export const listaApoderados = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.query(
      'select id,nombre,fotografia,direccion,telefono,correo from apoderado',
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      }
    )
    connection.end()
  })
}


export const editApoderado = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql =
      'UPDATE apoderado SET nombre = ?, rut = ?, direccion = ?, situacion_c = ?, parentesco = ?, correo = ?, telefono= ?, fotografia = ? WHERE (apoderado.id = ?)'
    var dats = [
      datos.nombre,
      datos.rut,
      datos.direccion,
      datos.situacion_c,
      datos.parentesco,
      datos.correo,
      datos.telefono,
      datos.fotografia,
      datos.id
    ]
    connection.query(sql, dats, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

// PARVULOS AQUI

export const hijos = id => {
  console.log("pase por aqui")
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'SELECT P.* FROM parvulo AS P INNER JOIN APOPARVULO AS AP ON AP.id_parvulo=p.id WHERE AP.id_apoderado=?'
    connection.query(sql, id, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

//----carloco----///

//--recetas--//

export const borrarReceta = id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var sql = 'DELETE FROM receta WHERE (receta.id = ?)'
    connection.query(sql, id, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}
export const completarIngredientes = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats = [
      datos.ingrediente,
      datos.cantidad,
      datos.idReceta
    ]
    var sql =
      'INSERT into ingredientesReceta(ingrediente,cantidad,idReceta) values (?)'
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const completePasos = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats = [
      datos.nPaso,
      datos.descripcion,
      datos.idReceta
    ]
    var sql =
      'INSERT into pasosRec(nPaso,descripcion,idReceta) values (?)'
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}


export const newReceta = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats = [
      datos.nombreRec,
      datos.tipoRec,
      datos.descripcion,
      datos.fotoRec,
      datos.idUsuario
    ]
    var sql =
      'insert into Receta(nombreRec,tipoRec,descripcion,fotoRec,idUsuario) values (?)'
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const newIngrediente = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats = [
      datos.nombreIngrediente
    ]
    var sql =
      'insert into Ingrediente(nombreIngrediente) values (?)'
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const listaIngrediente = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.query(
      'select * from Ingrediente',
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      }
    )
    connection.end() 
  })
}
export const listaRecetas = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.query(
      'select * from Receta ORDER BY idReceta',
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      }
    )
    connection.end() 
  })
}
export const listaMisRecetas = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats = [
      datos.idUsuario
    ]
    var sql =
      'select * from Receta where idUsuario=?'
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

//---usuarios--//

export const newUsuario = datos => {
  console.log("pase por el new usuario")
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats = [
      datos.nombreUsr,
      datos.correo,
      datos.password,
      datos.usuario  
    ]
    var sql = 'insert into Usuario(nombreUsr,correo,password,usuario) values (?)'
    connection.query(sql,[dats], (error, results, field) => {
      if (error) reject(error)
      else resolve({sucess: true})
    })
    connection.end()
  })
}

export const consultaUsuario = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.correo,
    ]
    var sql = 'select * from Usuario where correo=?'
    connection.query(sql, dats, (error, results, field) => {
     /*  console.log(results,"esta wea",results.length," - ",field) */
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}
export const getUsuarioId = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.idUsuario,
    ]
    var sql = 'select usuario from Usuario where idUsuario=?'
    connection.query(sql, dats, (error, results, field) => {
     /*  console.log(results,"esta wea",results.length," - ",field) */
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const obtenerUsuario = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.correo,
      dato.password
    ]
    var sql = 'select * from Usuario where correo=? and password=?'
    connection.query(sql, dats, (error, results, field) => {
     /* console.log(results,"esta wea",results.length," - ",field) */
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}


export const listaUsuario = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.query(
      'select id,nombre,apellido,correo from usuario',
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      }
    )
    connection.end()
  })
}

//--Querys para mostrar la receta completa--//

export const obtenerReceta = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.idReceta,
    ]
    var sql = 'select * from Receta where idReceta=?'
    connection.query(sql, dats, (error, results, field) => {
     /*  console.log(results,"esta wea",results.length," - ",field) */
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const obtenerPasos = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.idReceta,
    ]
    var sql = 'select * from pasosRec where idReceta=? ORDER BY nPaso'
    connection.query(sql, dats, (error, results, field) => {
     /*  console.log(results,"esta wea",results.length," - ",field) */
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const obtenerIngReceta = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.idReceta,
    ]
    var sql = 'select * from ingredientesReceta where idReceta=?'
    connection.query(sql, dats, (error, results, field) => {
     /*  console.log(results,"esta wea",results.length," - ",field) */
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}



//--Despensa--//

export const addIng = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats = [
      datos.idUsuario,
      datos.idIngred,
      datos.cantidad
    ]
    var sql =
      'insert into Despensa(idUsuario, idIngred, cantidad) values (?)'
    connection.query(sql, [dats], (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const obtenerIngDespensa = data => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      data.idUsuario,
    ]
    var sql = 'select d.idIngred,i.nombreIngrediente,d.cantidad from Despensa d '
            + 'inner join Ingrediente i '
            + 'on d.idIngred = i.idIngrediente '
            + 'where idUsuario = ? '
    connection.query(sql, dats, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

export const borrarIngDespensa = datos => {
  console.log(datos);
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      datos.idUsuario,
      datos.idIngred,
    ]
    var sql = 'DELETE FROM Despensa WHERE idUsuario=? and idIngred=?'
    connection.query(sql, dats, (error, results, field) => {
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })

  
}


// Claudio Modificar Usuario

// Modificar Nombre Usuario

export const ModUsuarioNombre = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.nombreUsr,
      dato.idUsuario,
    ]
    var sql = 'update Usuario Set nombreUsr=? where idUsuario=?'
    connection.query(sql, dato, (error, results, field) => {  
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

// Modificar Correo Usuario

export const ModUsuarioCorreo = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.correo,
      dato.idUsuario,
    ]
    var sql = 'update Usuario Set correo=? where idUsuario=?'
    connection.query(sql, dato, (error, results, field) => {  
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

// Modificar Password Usuario

export const ModUsuarioPassword = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.password,
      dato.idUsuario,
    ]
    var sql = 'update Usuario Set password=? where idUsuario=?'
    connection.query(sql, dato, (error, results, field) => {  
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

// Buscar Nombre usuario

export const consultaNombreUsuario = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.idUsuario,
    ]
    var sql = 'select nombreUsr from Usuario where idUsuario=?'
    connection.query(sql, dats, (error, results, field) => {
     /*  console.log(results,"esta wea",results.length," - ",field) */
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

// Buscar Correo usuario

export const consultaCorreoUsuario = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.idUsuario,
    ]
    var sql = 'select correo from Usuario where idUsuario=?'
    connection.query(sql, dats, (error, results, field) => {
     /*  console.log(results,"esta wea",results.length," - ",field) */
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}

// Buscar Password Usuario

/*export const consultaCorreoUsuario = dato => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats= [
      dato.idUsuario,
    ]
    var sql = 'select password from Usuario where idUsuario=?'
    connection.query(sql, dats, (error, results, field) => {
      console.log(results,"esta wea",results.length," - ",field) 
      if (error) reject(error)
      else resolve(results)
    })
    connection.end()
  })
}*/



