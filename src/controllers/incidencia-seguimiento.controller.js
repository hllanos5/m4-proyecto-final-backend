import IncidenciaSeguimiento from '../models/IncidenciaSeguimiento.js'

class IncidenciaSeguimientoController {

  static async index (req, res) {
    //#swagger.tags = ['IncidenciaSeguimiento']
    try {
      const incidenciaSeguimiento = await IncidenciaSeguimiento.all();
      res.json(incidenciaSeguimiento)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  static async getById (req, res) {
    //#swagger.tags = ['IncidenciaSeguimiento']
    try {
      const { id } = req.params
      const incidenciaSeguimiento = await IncidenciaSeguimiento.findById(id);
      res.json(incidenciaSeguimiento)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getBySeguimientoId (req, res) {
    //#swagger.tags = ['IncidenciaSeguimiento']
    try {
      const { id } = req.params
      const resultado = await IncidenciaSeguimiento.findBySeguimientoId(id);
      res.json(resultado)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  static async create (req, res) {
    //#swagger.tags = ['IncidenciaSeguimiento']
    try {
      const { incidencia_id, fecha, estado, comentario, usuario_id } = req.body
      if (!incidencia_id || !comentario || !usuario_id) return res.status(400).json({ message: 'Faltan datos' })

      const incidenciaDetalle = await IncidenciaSeguimiento.create({
        incidencia_id, 
        fecha,
        estado,
        comentario, 
        usuario_id
      })

      res.status(201).json({ message: 'IncidenciaSeguimiento creado', data: incidenciaDetalle })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  
  static async updatePut (req, res) {
    //#swagger.tags = ['IncidenciaSeguimiento']
    try {
      const { id } = req.params
      const {
        incidencia_id, 
        fecha,
        estado,
        comentario, 
        usuario_id
      } = req.body
      
      if (!incidencia_id || !fecha || !estado || !comentario || !usuario_id ) return res.status(400).json({ message: 'Datos incompletos' })
      
      const resultado = await IncidenciaSeguimiento.update({
        id: id,
        incidencia_id, 
        fecha,
        estado,
        comentario, 
        usuario_id
      })

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'No se pudo actualizar el usuario' })

      const incidencia = await IncidenciaSeguimiento.findById(id)

      res.json({ message: 'IncidenciaSeguimiento actualizado', data: incidencia })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  static async updatePatch (req, res) {
    //#swagger.tags = ['IncidenciaSeguimiento']
    try {
      const { id } = req.params
      const {
        incidencia_id, 
        fecha,
        estado,
        comentario, 
        usuario_id
      } = req.body

      const resultado = await IncidenciaSeguimiento.update({
        id: id,
        incidencia_id, 
        fecha,
        estado,
        comentario, 
        usuario_id
      })

      if (!resultado) return res.status(400).json({ message: 'No se enviaron datos para la actualización' })

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'No se pudo actualizar el usuario' })

      const incidencia = await IncidenciaSeguimiento.findById(id)
      
      res.json({ message: 'IncidenciaSeguimiento actualizado', data: incidencia })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default IncidenciaSeguimientoController
