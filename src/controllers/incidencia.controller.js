import Incidencia from '../models/Incidencia.js'

class IncidenciaController {
  static async index (req, res) {
    //#swagger.tags = ['Incidencia']
    try {
      console.log(req.user);
      const { rol, id } = req.user;
      let incidencias = [];
      if(rol === 'ADMIN'){
        incidencias = await Incidencia.all();
      }
      else{
        incidencias = await Incidencia.allByUser(id);
      }
      
      res.json(incidencias)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async reporteEstado (req, res) {

    //#swagger.tags = ['Incidencia']
    try {
      
      const incidencias = await Incidencia.reporteEstado();
      res.json(incidencias)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async reportePrioridad (req, res) {
    //#swagger.tags = ['Incidencia']
    try {
      
      const incidencias = await Incidencia.reportePrioridad();
      res.json(incidencias)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  static async getById (req, res) {
    //#swagger.tags = ['Incidencia']
    try {
      const { id } = req.params
      const incidencias = await Incidencia.findById(id);
      res.json(incidencias)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  static async create (req, res) {
    //#swagger.tags = ['Incidencia']
    try {
      const { usuario_id, titulo, descripcion, estado, prioridad } = req.body
      if (!usuario_id || !titulo || !descripcion || !estado || !prioridad) return res.status(400).json({ message: 'Faltan datos' })

      const user = await Incidencia.create({
        usuario_id, 
        titulo,
        descripcion,
        estado, 
        prioridad
      })

      res.status(201).json({ message: 'Incidencia creado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  

  static async updatePut (req, res) {
    //#swagger.tags = ['Incidencia']
    try {
      const { id } = req.params
      const {
        usuario_id, 
        titulo,
        descripcion,
        estado, 
        prioridad
      } = req.body
      
      if (!usuario_id || !titulo || !descripcion || !estado || !prioridad ) return res.status(400).json({ message: 'Datos incompletos' })
      
      const resultado = await Incidencia.update({
        id: id,
        usuario_id, 
        titulo,
        descripcion,
        estado, 
        prioridad
      })

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'No se pudo actualizar el usuario' })

      const incidencia = await Incidencia.findById(id)

      res.json({ message: 'Incidencia actualizado', data: incidencia })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  static async updatePatch (req, res) {
    //#swagger.tags = ['Incidencia']
    try {
      const { id } = req.params
      const {
        usuario_id, 
        titulo,
        descripcion,
        estado, 
        prioridad
      } = req.body

      const resultado = await Incidencia.update({
        id: id,
        usuario_id, 
        titulo,
        descripcion,
        estado, 
        prioridad
      })

      if (!resultado) return res.status(400).json({ message: 'No se enviaron datos para la actualización' })

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'No se pudo actualizar el usuario' })

      const incidencia = await Incidencia.findById(id)
      
      res.json({ message: 'Incidencia actualizado', data: incidencia })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default IncidenciaController
