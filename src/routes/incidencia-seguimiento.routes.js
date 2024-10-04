import { Router } from 'express'
import IncidenciaSeguimientoController from '../controllers/incidencia-seguimiento.controller.js'

const router = Router()
router.get('/', IncidenciaSeguimientoController.index)
router.get('/:id', IncidenciaSeguimientoController.getById)
router.get('/incidencia/:id', IncidenciaSeguimientoController.getBySeguimientoId)
router.post('/', IncidenciaSeguimientoController.create)

router.put('/:id',  IncidenciaSeguimientoController.updatePut)
router.patch('/:id', IncidenciaSeguimientoController.updatePatch)

export default router
