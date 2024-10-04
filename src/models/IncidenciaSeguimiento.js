import { pool } from '../config/db.js'

class IncidenciaSeguimiento {
  static async all () {
    const [resultado] = await pool.execute(
      'SELECT id, incidencia_id, fecha, estado, comentario, usuario_id FROM incidencia_seguimiento'
    )
    return resultado
  }

  static async findById (id) {
    const [resultado] = await pool.execute(
      'SELECT id, incidencia_id, fecha, estado, comentario, usuario_id FROM incidencia_seguimiento WHERE id = ?',
      [id]
    )
    return resultado[0]
  }

  static async findBySeguimientoId (id) {
    const [aIncidencia] = await pool.execute(
      `SELECT a.id, i.id as incidencia_id, a.fecha, a.estado, a.comentario, i.usuario_id,  
        concat_ws(' ',  u.nombre , u.paterno , u.materno ) as nombres, u.rol,
        i.titulo, i.descripcion , i.prioridad 
        FROM incidencia_seguimiento a 
        left join incidencia i  
        on (a.incidencia_id = i.id)
        left join usuario u 
        on (u.id = i.usuario_id)
        WHERE a.incidencia_id = ? ORDER BY a.id desc`,
      [id]
    )
    return aIncidencia
  }
  

  static async create ({
    incidencia_id, 
    fecha,
    estado,
    comentario, 
    usuario_id
  }) {
    
    const camposObligatorios = []
    const datosGuardar = []

    if(incidencia_id){
      datosGuardar.push(incidencia_id)
      camposObligatorios.push('incidencia_id')
    }
    if(fecha){
      datosGuardar.push(fecha)
      camposObligatorios.push('fecha')
    }
    if(estado){
      datosGuardar.push(estado)
      camposObligatorios.push('estado')
    }
    if(comentario){
      datosGuardar.push(comentario)
      camposObligatorios.push('comentario')
    }
    if(usuario_id){
      datosGuardar.push(usuario_id)
      camposObligatorios.push('usuario_id')
    }

    const stringCamposObligatorios = camposObligatorios.join(', ')
    const placeholders = camposObligatorios.map(() => '?').join(', ')

    const query = `INSERT INTO incidencia_seguimiento(${stringCamposObligatorios}) VALUES (${placeholders})`
    const [resultado] = await pool.execute(query, datosGuardar)
    const incidenciaSeguimiento = await this.findById(resultado.insertId)

    return incidenciaSeguimiento
  }
  
  static async update ({
    id,
    incidencia_id, 
    fecha,
    estado,
    comentario, 
    usuario_id
  }) {
    
    let query = 'UPDATE incidencia_seguimiento SET '
    const camposActualizar = []
    const valoresActualizar = []

    if (incidencia_id) {
      camposActualizar.push('incidencia_id = ?')
      valoresActualizar.push(incidencia_id)
    }

    if (fecha) {
      camposActualizar.push('fecha = ?')
      valoresActualizar.push(fecha)
    }

    if (estado) {
      camposActualizar.push('estado = ?')
      valoresActualizar.push(estado)
    }
    

    if (comentario) {
      camposActualizar.push('comentario = ?')
      valoresActualizar.push(comentario)
    }

    if (usuario_id) {
      camposActualizar.push('usuario_id = ?')
      valoresActualizar.push(usuario_id)
    }

    if (camposActualizar.length === 0) return undefined
   
    query += camposActualizar.join(', ') + ' WHERE id = ?'
    valoresActualizar.push(id)
    const [resultado] = await pool.execute(query, valoresActualizar)
    
    return resultado
  }
}

export default IncidenciaSeguimiento
