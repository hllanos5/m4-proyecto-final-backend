import { pool } from '../config/db.js'
import bcrypt from 'bcrypt'

class User {
  static async all () {
    const [users] = await pool.execute(
      'SELECT id, nombre, paterno, materno, telefono, correo, password, imagen  FROM usuario'
    )
    return users
  }

  static async findById (id) {
    const [user] = await pool.execute(
      'SELECT id, nombre, paterno, materno, telefono, correo, password, imagen  FROM usuario',
      [id]
    )
    return user[0]
  }
  
  static async findOne (columna, valor) {
    const [user] = await pool.execute(
      `SELECT id, nombre, paterno, materno, telefono, correo, password, imagen  FROM usuario WHERE ${columna} = ?`,
      [valor]
    )
    return user[0]
  }
  

  static async create ({
    nombre,
    paterno,
    materno,
    telefono,
    correo,
    password,
    imagen
  }) {
    
    const camposObligatorios = []
    const datosGuardar = []

    if(nombre){
      datosGuardar.push(nombre)
      camposObligatorios.push('nombre')
    }
    if(paterno){
      datosGuardar.push(paterno)
      camposObligatorios.push('paterno')
    }
    if(materno){
      datosGuardar.push(materno)
      camposObligatorios.push('materno')
    }
    if(telefono){
      datosGuardar.push(telefono)
      camposObligatorios.push('telefono')
    }
    if(correo){
      datosGuardar.push(correo)
      camposObligatorios.push('correo')
    }

    if(password){
      const encriptada = await bcrypt.hash(password, 10)
      datosGuardar.push(encriptada)
      camposObligatorios.push('password')
    }

    if (imagen) {
      camposObligatorios.push('imagen')
      datosGuardar.push(imagen)
    }

    const stringCamposObligatorios = camposObligatorios.join(', ')
    const placeholders = camposObligatorios.map(() => '?').join(', ')

    const query = `INSERT INTO usuario(${stringCamposObligatorios}) VALUES (${placeholders})`
    const [resultado] = await pool.execute(query, datosGuardar)
    const user = await this.findById(resultado.insertId)

    delete user.password

    return user
  }
  
  static async deleteById (id) {
    const [resultado] = await pool.execute(
      'DELETE FROM usuario WHERE id = ?',
      [id]
    )
    return resultado
  }
  
  static async update ({
    id,
    nombre,
    paterno,
    materno,
    telefono,
    correo,
    password,
    imagen
  }) {
    let query = 'UPDATE usuario SET '
    const camposActualizar = []
    const valoresActualizar = []

    if (nombre) {
      camposActualizar.push('nombre = ?')
      valoresActualizar.push(nombre)
    }

    if (materno) {
      camposActualizar.push('materno = ?')
      valoresActualizar.push(materno)
    }

    if (paterno) {
      camposActualizar.push('paterno = ?')
      valoresActualizar.push(paterno)
    }

    if (telefono) {
      camposActualizar.push('telefono = ?')
      valoresActualizar.push(telefono)
    }

    if (correo) {
      camposActualizar.push('correo = ?')
      valoresActualizar.push(correo)
    }

    if (password) {
      camposActualizar.push('password = ?')
      const encriptada = await bcrypt.hash(password, 10)
      valoresActualizar.push(encriptada)
    }

    if (imagen) {
      camposActualizar.push('imagen = ?')
      valoresActualizar.push(imagen)
    }

    if (camposActualizar.length === 0) return undefined
   
    query += camposActualizar.join(', ') + ' WHERE id = ?'
    valoresActualizar.push(id)
    const [resultado] = await pool.execute(query, valoresActualizar)
    
    return resultado
  }
}

export default User
