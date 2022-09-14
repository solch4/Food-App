import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDiets } from '../../actions/actions';
import { formContainer, formBody } from './CreateRecipe.module.css'

function CreateRecipe () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoBack = () => navigate('/home')
  const diets = useSelector(state => state.diets)
  const [selectedDiet, setSelectedDiet] = useState([])

  const handleSelectDiet = (e) => {
    if (!selectedDiet.includes(e.target.value)) setSelectedDiet([...selectedDiet, e.target.value])
  }

  const handleDeleteDiet = (e) => {
    e.preventDefault()
    setSelectedDiet(selectedDiet.filter(d => d !== e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('subido')
  }

  useEffect(() => {
    dispatch(getDiets())
  }, [dispatch])

  return (
    <div className={formContainer}>
      <button onClick={handleGoBack}>Go back</button>
      <h2>Create your original recipe!</h2>
      <h5>Fields with * are required</h5>
      <form className={formBody} onSubmit={handleSubmit}>
        <label>Name *</label>
        <input type='text' placeholder='Name' />
        <label>Summary *</label>
        <textarea placeholder='Summary' />
        <label>Health Score</label>
        <input type='number' placeholder='Health Score %' />
        <label>Instructions</label>
        <textarea placeholder='Instructions' />
        <label>Image</label>
        <input type='text' />
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
        <button type='submit'>Create recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;