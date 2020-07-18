import { Router } from 'express'
import {
  obtenerApoderadoParvulo,
  obtenerMedicamento,
  mensajeria,
  obtenerApoderados,
  obtenerApoderado,
  editarApoderado,
  obtenerHijos,
  obtenerInstitucion,
  obtenerParvularios,
  nuevaReceta,
  eliminarReceta,
  registrarUsuario,
  inicioSesion,
  ingrediente,
  obtenerIng,
  completarIng,
  completarPasos,
  addIngDespensa,
  getReceta,
  getPasos,
  getIngReceta
} from './controller'
const router = new Router()
/* router.post('/children', obtenerHijos)

router.post('/parvularios', obtenerParvularios)
router.post('/institucion', obtenerInstitucion)

router.get('/:id', obtenerApoderadoParvulo)
 */
router.post('/receta', nuevaReceta)
router.post('/terminarIng',completarIng)
router.post('/terminarPasos',completarPasos)
router.delete('/:id',eliminarReceta)
router.post('/registro',registrarUsuario)
router.post('/iniciar',inicioSesion)
router.post('/ingrediente',ingrediente)
router.get('/obtenerIng',obtenerIng) 
router.post('/addDespensa',addIngDespensa)
router.post('/getReceta',getReceta)
router.post('/getPasos',getPasos)
router.post('/getIngReceta',getIngReceta)


/* router.post('/:id', obtenerApoderado)
router.get('', obtenerApoderados)
router.put('/:id', editarApoderado) */


/* router.post('/medicamento', obtenerMedicamento) */


export default router
