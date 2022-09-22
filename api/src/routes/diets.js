const { Router } = require('express');
const { getApiInfo } = require('../controllers/index.js')
const { Diet } = require('../db.js')

const router = Router();

// '/diets'

/* GET /diets:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos
con los tipos de datos indicados por spoonacular acá */
router.get('/', async (req, res) => {
  const allInfo = await getApiInfo()
  
  // este no me funcó pq algunas dietas me las guarda repetidas
  /* for (const recipe of allInfo) {
    recipe.diet.forEach(d => {
      Diet.findOrCreate({
        where: {
          name: d
        }
      })
    });
  } */

  const allDiet = allInfo.map(recipe => recipe.diets).flat()
  const allDietSet = new Set(allDiet)
  const allDietArray = [...allDietSet]

  allDietArray.forEach(d => {
    Diet.findOrCreate({
      where: {
        name: d
      }
    })
  })

  const allDiets = await Diet.findAll()
  res.status(200).send(allDiets)
})


module.exports = router 