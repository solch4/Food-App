import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export function getRecipes () {
  return async function (dispatch) {
    const res = await axios.get(`${baseUrl}/recipes`)
    dispatch({
      type: 'GET_RECIPES',
      payload: res.data
    })
  }
}

export function getDiets () {
  return function (dispatch) {
    axios
      .get(`${baseUrl}/diets`)
      .then(res => dispatch({
        type: 'GET_DIETS', 
        payload: res.data
      }))
  }
}

export function searchByName (name) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${baseUrl}/recipes?name=${name}`)
      dispatch({
        type: 'SEARCH_BY_NAME',
        payload: res.data
      })
    } catch (e) {
      return dispatch({
        type: 'SEARCH_BY_NAME',
        payload: e.response.data
      })
    }
  }
}

export function filterByDiet (value) {
  return {
    type: 'FILTER_BY_DIET',
    payload: value
  }
}

export function sortByName (value) {
  return {
    type: 'SORT_BY_NAME',
    payload: value
  }
}

export function sortByHealthScore (value) {
  return {
    type: 'SORT_BY_HEALTHSCORE',
    payload: value
  }
}

export function getDetail (id) {
  return async function (dispatch) {
    const res = await axios.get(`${baseUrl}/recipes/${id}`)
    dispatch({
      type: 'GET_DETAIL',
      payload: res.data
    })
  }
}

export function clearDetail () {
  return {
    type: 'CLEAR_DETAIL'
  }
}