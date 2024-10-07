import { Router } from 'express'
import IncidenciaController from '../controllers/incidencia.controller.js'
import { validateJWT } from '../middlewares/auth.middleware.js'

const router = Router()
router.get('/',validateJWT, IncidenciaController.index)
router.get('/:id', IncidenciaController.getById)
router.post('/', IncidenciaController.create)

router.get('/reporte-estado', IncidenciaController.reporteEstado)
router.get('/reporte-prioridad', IncidenciaController.reportePrioridad)

router.put('/:id',  IncidenciaController.updatePut)
router.patch('/:id', IncidenciaController.updatePatch)

export default router
