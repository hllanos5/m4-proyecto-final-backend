import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

class AuthController {
  static async login (req, res) {
    //#swagger.tags = ['Auth']
    try {
      const { correo, password } = req.body

      const user = await User.findOne('correo', correo)
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

      const esValida = await bcrypt.compare(password, user.password)

      if (!esValida) return res.status(401).json({ message: 'Credenciales inválidas' })

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' })
      res.json({ message: 'Inicio de sesión exitoso', token })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async me (req, res) {
    //#swagger.tags = ['Auth']
    try {
      delete req.user.password
      res.json(req.user)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default AuthController
