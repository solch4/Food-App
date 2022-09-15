const { Router } = require('express');
const { getApiInfo, getDBInfo, getAllInfo } = require('../controllers/index.js')
const { Diet, Recipe } = require('../db.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/* GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado */
router.get('/recipes', async (req,res) => {
  const name = req.query.name
  const allInfo = await getAllInfo()
  if (name) {
    const searchResults = await allInfo.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()))
    searchResults.length 
      ? res.status(200).send(searchResults)
      : res.status(404).send('Recipe not found')
  }
  else res.status(200).send(allInfo)
})

/* GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados */
router.get('/recipes/:id', async (req, res) => {
  try {
    const id = req.params.id
    const allInfo = await getAllInfo()
    const detail = allInfo.find(recipe => recipe.id == id)
    detail
      ? res.status(200).send(detail)
      : res.status(404).send('Recipe not found')
  } catch (e) {
    console.log('error get /recipes/:id', e);
    res.status(400).send('Something went wrong')
  }
})

/* POST /recipes:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas. */
router.post('/recipes', async (req,res) => {
  try {
    const { name, summary, healthScore, instructions, image, diets } = req.body
    
    if (name && summary) {
      const newRecipe = await Recipe.create({
        ...req.body,
        name: name[0].toUpperCase() + name.slice(1),
        summary: summary[0].toUpperCase() + summary.slice(1),
        instructions: instructions ? instructions[0].toUpperCase() + instructions.slice(1) : null,
        image: image ? image : 'https://static.educalingo.com/img/en/800/food.jpg'
      })
      const dietsAux = await Diet.findAll({
        where: {
          name: diets
        }
      })
      newRecipe.addDiet(dietsAux)
      console.log('POST newRecipe:',newRecipe);
      res.status(201).send('Recipe created successfully!')
    } else res.status(400).send('Error 400: Bad request')
    
  } catch (e) {
    console.log('error post', e);
    res.status(400).send('Something went wrong')
  }
})


// '/diets'

/* GET /diets:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos
con los tipos de datos indicados por spoonacular acá */
router.get('/diets', async (req, res) => {
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


module.exports = router;
