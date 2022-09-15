import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRecipe, getDiets } from '../../actions/actions';
import { formContainer, formBody, error } from './CreateRecipe.module.css'

// eslint-disable-next-line no-useless-escape
const imgRegexp = new RegExp('^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$')
const isBlankSpace = new RegExp("^\\s+$")

// cb
function validateText ({ name, summary, healthScore, image }) {
  const err = {}

  if (!name) err.name = 'Write the name'
  else if (isBlankSpace.test(name)) err.name = "Shouldn't be a blank space"
  else if (name.length > 50) err.name = "Maximum number of characters: 50"
  
  if (!summary) err.summary = 'Write the summary'
  else if (isBlankSpace.test(summary)) err.summary = "Shouldn't be a blank space"

  // optionals
  if (healthScore && (healthScore > 100 || healthScore < 0)) err.healthScore = 'Should be a number between 0 and 100'

  if (image && !imgRegexp.test(image.trim())) err.image = 'Should be a valid URL'
  
  return err
}

// component
function CreateRecipe () {
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

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!Object.values(input).join("")) return alert('Please complete the form')
    if (Object.keys(err).length) return alert ('Please complete the form with the correct data')

    const newRecipe = {
      name: input.name.trim(),
      summary: input.summary.trim(),
      healthScore: input.healthScore ? input.healthScore : null,
      instructions: input.instructions.trim(),
      image: input.image.trim(),
      diets: selectedDiet
    }
    console.log('newRecipe',newRecipe);
    dispatch(createRecipe(newRecipe))
    alert("Recipe submitted! \nIf you don't see any changes, please refresh the page.")
    navigate('/home')
  }

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  return (
    <div className={formContainer}>
      <button onClick={handleGoBack}>Go back</button>
      <h2>Submit your own recipe!</h2>
      <h5>Fields with * are required</h5>
      <form className={formBody} onSubmit={handleSubmit}>
        <label>Name *</label>
        <input value={input.name} name='name' onChange={handleChange} type='text' placeholder='Name' />
        {err.name && <p className={error}>{err.name}</p>}
        
        <label>Summary *</label>
        <textarea value={input.summary} name='summary' onChange={handleChange} placeholder='Summary' />
        {err.summary && <p className={error}>{err.summary}</p>}
        
        <label>Health Score</label>
        <input value={input.healthScore} name='healthScore' onChange={handleChange} type='number' min={0} max={100} placeholder='Health Score (0 - 100%)' />
        {err.healthScore && <p className={error}>{err.healthScore}</p>}
        
        <label>Instructions</label>
        <textarea value={input.instructions} name='instructions' onChange={handleChange} placeholder='Instructions' />
        
        <label>Image</label>
        <input value={input.image} name='image' onChange={handleChange} type='text' placeholder='Image URL' />
        {err.image && <p className={error}>{err.image}</p>}
        
        <label>Diets</label>
        <select onChange={handleSelectDiet} defaultValue='DEFAULT'>
          <option value="DEFAULT" disabled>Select diets...</option>
          {diets.map(diet => <option value={diet.name} key={diet.id}>{diet.name}</option>)}
        </select>
        <ul>
          {selectedDiet.map((diet,id) => 
            <li key={id}>
              {diet}
              <button value={diet} onClick={handleDeleteDiet}>X</button>
            </li>
          )}
        </ul>
        
        <button type='submit'>Submit recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;