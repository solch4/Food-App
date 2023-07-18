import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export function getRecipes () {
  return async function (dispatch) {
    dispatch({ type: 'LOADING_RECIPES' })
    const res = await axios.get(`${baseUrl}/recipes`)
    const { data } = res.data;
    dispatch({
      type: 'GET_RECIPES',
      payload: data
    })
  }
}

export function getDiets () {
  return async function (dispatch) {
    const res = await axios.get(`${baseUrl}/diets`)
    const { data } = res.data;
    dispatch({
      type: 'GET_DIETS', 
      payload: data
    })
  }
}

export function searchByName (name) {
  return async function (dispatch) {
    try {
      dispatch({ type: 'LOADING_RECIPES' })
      const res = await axios.get(`${baseUrl}/recipes?name=${name}`)
      const { data } = res.data;
      dispatch({
        type: 'SEARCH_BY_NAME_SUCCESS',
        payload: data
      })
    } catch (e) {
      const { message } = e.response.data;
      dispatch({
        type: 'SEARCH_BY_NAME_ERROR',
        payload: message
      })
    }
  }
}

export function searchByHS (hs) {
  return async function (dispatch) {
    try {
      dispatch({ type: 'LOADING_RECIPES' })
      const res = await axios.get(`${baseUrl}/recipes?hs=${hs}`)
      const { data } = res.data;
      dispatch({
        type: 'SEARCH_BY_HS_SUCCESS',
        payload: data
      })
    } catch (e) {
      const { message } = e.response.data;
      dispatch({
        type: 'SEARCH_BY_HS_ERROR',
        payload: message
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
      const { data } = res.data;
      dispatch({
        type: 'GET_DETAIL',
        payload: data
      })
    } catch (e) {
      const { message } = e.response.data;
      dispatch({
        type: 'GET_DETAIL',
        payload: message
      })
    }
  }
}

export function clearDetail () {
  return {
    type: 'CLEAR_DETAIL'
  }
}

export function createRecipe (recipe) {
  return async function (dispatch) {
    try {
      const res = await axios.post(`${baseUrl}/recipes`, recipe)
      const { message, newRecipe } = res.data.data;
      alert(message);
      dispatch({
        type: 'CREATE_RECIPE',
        payload: newRecipe
      })
    } catch (e) {
      const { message } = e.response.data;
      alert(message);
    }
  }
}

export function deleteRecipe (id) {
  return async function (dispatch) {
    try {
      const res = await axios.delete(`${baseUrl}/recipes/${id}`)
      const message = res.data.data;
      alert(message);
      dispatch({
        type: 'DELETE_RECIPE',
        payload: id
      })
    } catch (e) {
      const { message } = e.response.data;
      alert(message);
    }
  }
}

export function editRecipe (payload, id) {
  return async function (dispatch) {
    try {
      const res = await axios.put(`${baseUrl}/recipes/${id}/edit`, payload)
      const { message, editedRecipe } = res.data.data;
      alert(message);
      dispatch({
        type: 'EDIT_RECIPE',
        payload: editedRecipe
      })
    } catch (e) {
      const { message } = e.response.data;
      alert(message);
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
