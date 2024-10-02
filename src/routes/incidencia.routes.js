import { Router } from 'express'
import IncidenciaController from '../controllers/incidencia.controller.js'

const router = Router()
router.get('/', IncidenciaController.index)
router.get('/:id', IncidenciaController.getById)
router.post('/', IncidenciaController.create)

router.put('/:id',  IncidenciaController.updatePut)
/*router.patch('/:id', IncidenciaController.updatePatch)*/

export default router
