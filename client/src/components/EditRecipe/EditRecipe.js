import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editRecipe, getDiets } from '../../actions/actions';
import backArrow from '../../assets/back-arrow.svg'
import { formDiv, formContainer, backBtn, title, form, category, error, dietContainer, item, deleteBtn, submitBtn } from './EditRecipe.module.css'

// eslint-disable-next-line no-useless-escape
const imgRegexp = new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$')

// cb
function validateText ({ name, summary, healthScore, image }) {
  const err = {}

  if (name && name.length > 50) err.name = `Maximum number of characters: 50 (${name.length}/50)`
  
  if (summary.trim() && summary.trim().length < 10) err.summary = `Minimum number of characters: 10 (${summary.trim().length}/10)`

  if (healthScore && (healthScore > 100 || healthScore < 0)) err.healthScore = 'Should be a number between 0 and 100'

  if (image && !imgRegexp.test(image.trim())) err.image = 'Should be a valid URL'
  
  return err
}

// component
function EditRecipe () {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const diets = useSelector(state => state.diets)
  const [selectedDiet, setSelectedDiet] = useState([])
  const [err, setErr] = useState({})
  const [input, setInput] = useState({
    name: '',
    summary: '',
    healthScore: '',
    instructions: '',
    image: '',
    diets: []
  })
  
  const handleGoBack = () => navigate(-1)

  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
    setErr(validateText({...input, [e.target.name]: e.target.value}))
  }

  const handleSelectDiet = (e) => {
    if (!selectedDiet.includes(e.target.value)) setSelectedDiet([...selectedDiet, e.target.value])
  }

  const handleDeleteDiet = (e) => {
    e.preventDefault()
    setSelectedDiet(selectedDiet.filter(d => d !== e.target.value))
  }

  const handleEditRecipe = (e) => {
    e.preventDefault()

    // si no hay cambios o solo hay espacios en blanco en los inputs no envía el form
    if (!Object.values(input).join("").trim() && !selectedDiet.length) return alert('There are no changes \nIf you want to edit the recipe please complete the form.')
    if (Object.keys(err).length) return alert ('Please complete the form with the correct data')
    
    const dataEditRecipe = {}
    if(input.name.trim()) dataEditRecipe.name = input.name.trim()
    if(input.summary.trim()) dataEditRecipe.summary = input.summary.trim()
    if(input.healthScore) dataEditRecipe.healthScore = input.healthScore
    if(input.instructions.trim()) dataEditRecipe.instructions = input.instructions.trim()
    if(input.image.trim()) dataEditRecipe.image = input.image.trim()
    if(selectedDiet.length) dataEditRecipe.diets = selectedDiet

    console.log('dataEditRecipe',dataEditRecipe);
    dispatch(editRecipe(dataEditRecipe, id))
    navigate('/home')
  }

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  return (
    <div className={formDiv}>
      <div className={formContainer}>
        <button className={backBtn} onClick={handleGoBack}>
          <img src={backArrow} alt='Go back' />
        </button>

        <h1 className={title}>Edit your recipe</h1>

        <form className={form} onSubmit={handleEditRecipe}>
          <label className={category}>Name</label>
          <input value={input.name} name='name' onChange={handleChange} type='text' placeholder='Name' />
          {err.name && <p className={error}>{err.name}</p>}
          
          <label className={category}>Summary</label>
          <textarea value={input.summary} name='summary' onChange={handleChange} placeholder='Summary' />
          {err.summary && <p className={error}>{err.summary}</p>}

          <label className={category}>Health Score</label>
          <input value={input.healthScore} name='healthScore' onChange={handleChange} type='number' min={0} max={100} placeholder='Health Score (0 - 100%)' />
          {err.healthScore && <p className={error}>{err.healthScore}</p>}
          
          <label className={category}>Instructions</label>
          <textarea value={input.instructions} name='instructions' onChange={handleChange} placeholder='Instructions' />
          
          <label className={category}>Image</label>
          <input value={input.image} name='image' onChange={handleChange} type='text' placeholder='Image URL' />
          {err.image && <p className={error}>{err.image}</p>}
          
          <label className={category}>Diet</label>
          <select onChange={handleSelectDiet} defaultValue='DEFAULT'>
            <option value="DEFAULT" disabled>--select type of diet--</option>
            {diets.map(diet => <option value={diet.name} key={diet.id}>{diet.name}</option>)}
          </select>
          <ul className={dietContainer}>
            {selectedDiet.map((diet,id) => 
              <li className={item} key={id}>
                {diet}
                <button className={deleteBtn} value={diet} onClick={handleDeleteDiet}>X</button>
              </li>
            )}
          </ul>
          
          <button className={submitBtn} type='submit'>Save changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;