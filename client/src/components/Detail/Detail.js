import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearDetail, deleteRecipe, getDetail } from '../../actions/actions';
import backArrow from '../../assets/back-arrow.svg'
import { detailDiv, container, backBtn, body, img, title, category, subtitle, deleteEditBtnsContainer, deleteBtn, editBtn } from './Detail.module.css'

//la info proveniente de la api y de la db son tipos de datos distintos, x eso antes de renderizar algunas cosas pregunto si es createdInDB
function Detail() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const detail = useSelector(state => state.detail)
  const { image, name, diets, healthScore, summary, instructions, createdInDB } = detail

  useEffect(() => {
    console.log('me toy montando/actualizando');
    dispatch(getDetail(id))
  },[dispatch, id])

  // uso el useLayoutEffect pq el useffect me mostraba x 0.000000001 seg el detalle anterior
  useLayoutEffect(() => {
    console.log('me toy muriendo (espero)');
    dispatch(clearDetail())
  },[dispatch])
  
  const handleGoBack = () => navigate(-1)

  const handleDeleteRecipe = () => {
    if (!window.confirm(`Are you sure you want to delete the ${name} recipe? \nYou won't be able to revert this.`)) return
    dispatch(deleteRecipe(id))
    navigate(-1)
  }

  const handleEditRecipe = () => navigate(`/home/${id}/edit`)

  return (
    <div className={detailDiv}>
      <div className={container}>
        <button className={backBtn} onClick={handleGoBack}>
          <img src={backArrow} alt='Go back' />
        </button>
        {Object.keys(detail).length && typeof detail !== 'string' ? (
          <div className={body}>
            <img className={img} src={image} alt={image} />
            <h1 className={title}>{name}</h1>
            {healthScore && <h4>Health score: {healthScore}%</h4>}

            {(!createdInDB && !!diets.length) && <p><span className={category}>Diets: </span>{diets.join(' - ')}</p>}
            {(createdInDB && !!diets.length) && <p><span className={category}>Diets: </span>{diets.map(d => Object.values(d)).join(' - ')}</p>}

            <h2 className={subtitle}>Summary</h2>
            <p>{summary?.replace(/<[^>]*>/g, '')}</p> {/* replace para eliminar las etiquetas fieras q me trae la api */}

            {instructions && <h2 className={subtitle}>Instructions</h2>}
            {createdInDB 
              ? <p>{instructions}</p>
              : instructions?.map((inst, n) => <p key={n}><span className={category}>Step {n+1}: </span>{inst}</p>)}
            
            {createdInDB &&
              <div className={deleteEditBtnsContainer}>
                <button className={deleteBtn} onClick={handleDeleteRecipe}>Delete</button>
                <button className={editBtn} onClick={handleEditRecipe}>Edit</button>
              </div>}
          </div>
        ) : (
          Array.isArray(detail)
            ? <h3>Loading...</h3>
            : <h3>Recipe not found</h3>
        )}
      </div>
    </div>
  );
}

export default Detail;