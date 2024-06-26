import { Router } from 'express'
import { body, param} from 'express-validator'
import { createProduct, getProducts, getProductsById, updateAvailabitlity, updateProduct } from './handers/product'
import { handleInputErrors } from './middleware'


const router = Router()

router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductsById
)
 
 router.post('/', 
   // Validacion
     body ('name')
         .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
     body ('price')
         .isNumeric().withMessage('Valor no valido')
         .notEmpty().withMessage('El precio no puede ir vacio')
         .custom(value => value > 0).withMessage('Precio no valido'),
       handleInputErrors,
       createProduct
)


 router.put('/:id', 
       // Validacion
     body ('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),
     body ('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
     body ('availability')
        .isBoolean().withMessage('Valor para disponibilidad  no valido'),
  handleInputErrors,
  updateProduct)


  router.patch('/:id', updateAvailabitlity)


  router.delete('/', (req, res) => {
     res.json('desde DELETE')
  
  })

  export default router