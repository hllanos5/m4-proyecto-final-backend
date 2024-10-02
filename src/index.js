import express from 'express'
import { PORT } from './config/config.js'
import morgan from 'morgan'
import { validateCORS } from './middlewares/middleware.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import imagesRoutes from './routes/images.routes.js'
import incidenciaRoutes from './routes/incidencia.routes.js'
//import { docRoutes } from "./routes/doc.routes.js";


const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(validateCORS)

//Ruta de los contratos
//app.use('/api-docs', docRoutes);

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/incidencia', incidenciaRoutes)
app.use('/api/images', imagesRoutes)

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))