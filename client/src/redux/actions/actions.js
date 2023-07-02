import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export function getRecipes () {
  return async function (dispatch) {
    dispatch({ type: 'LOADING_RECIPES' })
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
      dispatch({ type: 'LOADING_RECIPES' })
      const res = await axios.get(`${baseUrl}/recipes?name=${name}`)
      dispatch({
        type: 'SEARCH_BY_NAME_SUCCESS',
        payload: res.data
      })
    } catch (e) {
      dispatch({
        type: 'SEARCH_BY_NAME_ERROR',
        payload: e.response.data
      })
    }
  }
}

export function searchByHS (hs) {
  return async function (dispatch) {
    try {
      dispatch({ type: 'LOADING_RECIPES' })
      const res = await axios.get(`${baseUrl}/recipes?hs=${hs}`)
      dispatch({
        type: 'SEARCH_BY_HS_SUCCESS',
        payload: res.data
      })
    } catch (e) {
      dispatch({
        type: 'SEARCH_BY_HS_ERROR',
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
    try {
      const res = await axios.get(`${baseUrl}/recipes/${id}`)
      dispatch({
        type: 'GET_DETAIL',
        payload: res.data
      })
    } catch (e) {
      dispatch({
        type: 'GET_DETAIL',
        payload: e.response.data
      })
    }
  }
}

export function clearDetail () {
  return {
    type: 'CLEAR_DETAIL'
  }
}

export function createRecipe (newRecipe) {
  return async function (dispatch) {
    try {
      const { data } = await axios.post(`${baseUrl}/recipes`, newRecipe)
      alert(data.message)
      dispatch({
        type: 'CREATE_RECIPE',
        payload: data.newRecipe
      })
    } catch (e) {
      alert(e.response.data)
    }
  }
}

export function deleteRecipe (id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.delete(`${baseUrl}/recipes/${id}`)
      alert(data.message)
      dispatch({
        type: 'DELETE_RECIPE',
        payload: data.id
      })
    } catch (e) {
      alert(e.response.data)
    }
  }
}

export function editRecipe (payload, id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.put(`${baseUrl}/recipes/${id}/edit`, payload)
      alert(data.message)
      dispatch({
        type: 'EDIT_RECIPE',
        payload: data.editedRecipe
      })
    } catch (e) {
      alert(e.response.data)
    }
  }
}

export function saveScrollY (n) {
  return {
    type: 'SAVE_SCROLL_Y',
    payload: n
  }
}

export function addFavoriteRecipe(recipe) {
  return {
    type: 'ADD_FAVORITE_RECIPE',
    payload: recipe
  }
}

export function deleteFavoriteRecipe(recipe) {
  return {
    type: 'DELETE_FAVORITE_RECIPE',
    payload: recipe
  }
}

//pagination
export function setActualPage (n) {
  return {
    type: 'SET_ACTUAL_PAGE',
    payload: n
  }
}
export function setMinPageNumber (n) {
  return {
    type: 'SET_MIN_PAGE_NUMBER',
    payload: n
  }
}
export function setMaxPageNumber (n) {
  return {
    type: 'SET_MAX_PAGE_NUMBER',
    payload: n
  }
}

//select values home
export function setFilterSelectValue (payload) {
  return {
    type: 'SET_FILTER_SELECT_VALUE',
    payload
  }
}
export function setSortSelectValue (payload) {
  return {
    type: 'SET_SORT_SELECT_VALUE',
    payload
  }
}
