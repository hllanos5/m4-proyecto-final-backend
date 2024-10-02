import Incidencia from '../models/Incidencia.js'

class IncidenciaController {
  static async index (req, res) {
    //#swagger.tags = ['Incidencia']
    try {
      const incidencias = await Incidencia.all();
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

      const user = await incidencia.create({
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
      console.log("Llegue");
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
  /*
  static async updatePatch (req, res) {
    //#swagger.tags = ['User']
    try {
      const { id } = req.params
      const {
        nombre,
        paterno,
        materno,
        telefono,
        username,
        correo,
        password,
        imagen
      } = req.body

      const resultado = await User.update({
        id: id,
        nombre,
        paterno,
        materno,
        telefono,
        username,
        correo,
        password,
        imagen
      })

      if (!resultado) return res.status(400).json({ message: 'No se enviaron datos para la actualización' })

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'No se pudo actualizar el usuario' })

      const user = await User.findById(id)
      delete user.password

      res.json({ message: 'Usuario actualizado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }*/
}

export default IncidenciaController
