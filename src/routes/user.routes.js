import { Router } from 'express'
import UserController from '../controllers/user.controller.js'
import { validateUserById } from '../middlewares/user.middleware.js'

const router = Router()
router.get('/', UserController.index)
router.get('/:id', validateUserById, UserController.getById)
router.post('/', UserController.create)
router.delete('/:id', validateUserById, UserController.delete)
router.put('/:id', validateUserById, UserController.updatePut)
router.patch('/:id', validateUserById, UserController.updatePatch)

export default router
