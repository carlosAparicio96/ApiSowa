import { Router } from 'express'
import { authUser, authAdmin, authTeacher } from './controller'

const router = new Router()

router.post('/user', authUser)
router.post('/teacher', authTeacher)
router.post('/admin', authAdmin)

export default router
