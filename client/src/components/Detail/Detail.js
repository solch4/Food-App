import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearDetail, getDetail } from '../../actions/actions';
// import styles from './Detail.module.css'

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

  return (
    <div>
      <button onClick={handleGoBack}>Go home</button>
      {Object.keys(detail).length ? 
        <div>
          <img src={image} alt={image} />
          <h1>{name}</h1>
          {healthScore && <p>Health score: {healthScore}%</p>}

          {(!createdInDB && !!diets.length) && <p>Diets: {diets.join(', ')}</p>}
          {(createdInDB && !!diets.length) && <p>Diets: {diets.map(d => Object.values(d)).join(', ')}</p>}

          <p>Summary: {summary?.replace(/<[^>]*>/g, '')}</p> {/* replace para eliminar las etiquetas fieras q me trae la api */}

          {instructions && <h3>Instructions</h3>}
          {!createdInDB && instructions?.map((inst, n) => <p key={n}>Step {n+1}: {inst}</p>)}
          {createdInDB && <p>{instructions}</p>}
        </div>
      : 'Loading...'}
    </div>
  );
}

export default Detail;