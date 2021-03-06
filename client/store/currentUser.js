import axios from 'axios';
import history from '../history';
import { resetCurrentOrder, emptyCart } from '../store';

// action types
const GET_CURRENT_USER = 'GET_CURRENT_USER';
const REMOVE_USER = 'REMOVE_USER';

// action creator
const getCurrentUser = user => ({ type: GET_CURRENT_USER, user });
const removeUser = userId => ({type: REMOVE_USER, userId});

/**
 * REDUCER
 */
export default function (currentUser = {}, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return currentUser;
  }
}

// thunks
export const fetchCurrentUser = id => dispatch => {
  axios.get(`/users/${id}`)
  .then(user => dispatch(getCurrentUser(user.data)))
  .catch(err => console.error(`error fetching user id: ${id}`, err))
}

export const me = () => dispatch => {
  axios.get('/auth/me')
  .then(res => {
    dispatch(getCurrentUser(res.data || {}));
    if (res.data) {
      dispatch(emptyCart());
    }
  })
  .catch(err => console.log(err))
}

export const auth = (email, password, method) => dispatch => {
  axios.post(`/auth/${method}`, { email, password })
  .then(res => {
    dispatch(getCurrentUser(res.data))
    history.push('/home')
    }, authError => { // rare example: a good use case for parallel (non-catch) error handler
    dispatch(getCurrentUser({error: authError}))
  })
  .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
}

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(_ => {
        dispatch(removeUser());
        dispatch(resetCurrentOrder());
        history.push('/login')
      })
.catch(err => console.log(err))
