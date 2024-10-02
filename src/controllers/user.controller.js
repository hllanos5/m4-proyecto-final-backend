import User from '../models/User.js'

class UserController {
  static async index (req, res) {
    //#swagger.tags = ['User']
    try {
      const users = await User.all()
      res.json(users)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    //#swagger.tags = ['User']
    try {
      delete req.user.password
      res.json(req.user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  static async create (req, res) {
    //#swagger.tags = ['User']
    try {
      const { nombre, paterno, materno, telefono, correo, password, imagen } = req.body
      if (!correo || !password ) return res.status(400).json({ message: 'Faltan datos' })

      const user = await User.create({
        nombre,
        paterno,
        materno,        
        telefono,
        correo,
        password,
        imagen
      })

      res.status(201).json({ message: 'Usuario creado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  
  static async delete (req, res) {
    //#swagger.tags = ['User']
    try {
      const { id } = req.params
      const resultado = await User.deleteById(id)

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'El usuario ya fue eliminado' })

      res.json({ message: 'Usuario eliminado' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async updatePut (req, res) {
    //#swagger.tags = ['User']
    try {
      const { id } = req.params
      const {
        nombre,
        paterno,
        materno,
        telefono,
        correo,
        password,
        imagen
      } = req.body

      if (!nombre || !paterno || !materno || !telefono || !correo || !password ) return res.status(400).json({ message: 'Datos incompletos' })
      
      const resultado = await User.update({
        id: id,
        nombre,
        paterno,
        materno,
        telefono,
        correo,
        password,
        imagen
      })

      if (resultado.affectedRows === 0) return res.status(400).json({ message: 'No se pudo actualizar el usuario' })

      const user = await User.findById(id)
      delete user.password

      res.json({ message: 'Usuario actualizado', data: user })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

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
  }
}

export default UserController
