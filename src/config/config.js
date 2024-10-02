import { config } from 'dotenv'

config()
export const HOST = process.env.SERVER_HOST 
export const PORT = process.env.PORT || 3000
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_DATABASE = process.env.DB_DATABASE || 'modulo4'
export const SECRET_KEY = process.env.SECRET_KEY
export const allowedOrigins = [undefined, 'http://localhost:5173']
