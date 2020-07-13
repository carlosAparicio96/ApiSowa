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
export const completeRec = datos => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(mysqlConfig)
    connection.connect()
    var dats = [
      datos.ingredientes,
      datos.pasoRec,
      datos.id
    ]
    var sql =
      'insert into Receta(ingredientes,pasoRec) values (?) where idReceta =id'
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
      datos.idUsuario
    ]
    var sql =
      'insert into Receta(nombreRec,tipoRec,descripcion,idUsuario) values (?)'
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
      'select nombreIngrediente from Ingrediente',
      (error, results, field) => {
        if (error) reject(error)
        else resolve(results)
      }
    )
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


