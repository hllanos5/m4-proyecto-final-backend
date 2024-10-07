import { pool } from '../config/db.js'

class Incidencia {
  static async all () {
    const [respuesta] = await pool.execute(
      `SELECT a.id, i.id as incidencia_id, a.fecha, a.estado, a.comentario, i.usuario_id,  
      concat_ws(' ',  u.nombre , u.paterno , u.materno ) as nombres, u.rol,
      i.titulo, i.descripcion , i.prioridad 
      FROM incidencia_seguimiento a 
      left join incidencia i  
      on (a.incidencia_id = i.id)
      left join usuario u 
      on (u.id = a.usuario_id)
      ORDER BY a.id desc`      
    )
    return respuesta
  }

  static async allByUser (idUsuario) {
    const [respuesta] = await pool.execute(
      `SELECT a.id, i.id as incidencia_id, a.fecha, a.estado, a.comentario, i.usuario_id,  
      concat_ws(' ',  u.nombre , u.paterno , u.materno ) as nombres, u.rol,
      i.titulo, i.descripcion , i.prioridad 
      FROM incidencia_seguimiento a 
      left join incidencia i  
      on (a.incidencia_id = i.id)
      left join usuario u 
      on (u.id = a.usuario_id)
      WHERE i.usuario_id = ?
      ORDER BY a.id desc`, [idUsuario]   
    )
    return respuesta
  }

  static async reporteEstado () {
    const [respuesta] = await pool.execute('select count(*) as contador ,estado  from incidencia group by estado ')
    return respuesta
  }

  static async reportePrioridad () {
    const [respuesta] = await pool.execute(
      'select count(*) as contador ,prioridad  from incidencia group by prioridad '
    )
    return respuesta
  }

  static async findById (id) {
    const [respuesta] = await pool.execute(
      'SELECT id, usuario_id, descripcion, titulo, estado, prioridad, fecha_incidencia, fecha_cierre  FROM incidencia where id = ?',
      [id]
    )
    return respuesta[0]
  }
  

  static async create ({
    usuario_id, 
    titulo,
    descripcion,
    estado, 
    prioridad
  }) {
    
    const camposObligatorios = []
    const datosGuardar = []

    if(usuario_id){
      datosGuardar.push(usuario_id)
      camposObligatorios.push('usuario_id')
    }
    if(titulo){
      datosGuardar.push(titulo)
      camposObligatorios.push('titulo')
    }
    if(descripcion){
      datosGuardar.push(descripcion)
      camposObligatorios.push('descripcion')
    }
    if(estado){
      datosGuardar.push(estado)
      camposObligatorios.push('estado')
    }
    if(prioridad){
      datosGuardar.push(prioridad)
      camposObligatorios.push('prioridad')
    }

    const stringCamposObligatorios = camposObligatorios.join(', ')
    const placeholders = camposObligatorios.map(() => '?').join(', ')

    const query = `INSERT INTO incidencia(${stringCamposObligatorios}) VALUES (${placeholders})`
    const [resultado] = await pool.execute(query, datosGuardar)
    const incidencia = await this.findById(resultado.insertId)

    return incidencia
  }
  
  static async update ({
    id,
    usuario_id, 
    titulo,
    descripcion,
    estado, 
    prioridad
  }) {
    
    let query = 'UPDATE incidencia SET '
    const camposActualizar = []
    const valoresActualizar = []

    if (usuario_id) {
      camposActualizar.push('usuario_id = ?')
      valoresActualizar.push(usuario_id)
    }

    if (titulo) {
      camposActualizar.push('titulo = ?')
      valoresActualizar.push(titulo)
    }

    if (descripcion) {
      camposActualizar.push('descripcion = ?')
      valoresActualizar.push(descripcion)
    }

    if (estado) {
      camposActualizar.push('estado = ?')
      valoresActualizar.push(estado)
    }

    if (prioridad) {
      camposActualizar.push('prioridad = ?')
      valoresActualizar.push(prioridad)
    }

    if (camposActualizar.length === 0) return undefined
   
    query += camposActualizar.join(', ') + ' WHERE id = ?'
    valoresActualizar.push(id)
    const [resultado] = await pool.execute(query, valoresActualizar)
    
    return resultado
  }
}

export default Incidencia
