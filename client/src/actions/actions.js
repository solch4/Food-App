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