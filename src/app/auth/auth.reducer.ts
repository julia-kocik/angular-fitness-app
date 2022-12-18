import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./auth.actions";

export interface State {
  isAuthenticated: boolean
  userid: string
}

const initialState: State = {
  isAuthenticated: false,
  userid: ''
}

export function authReducer(state: State = initialState, action: AuthActions): State {
  switch(action.type) {
    case SET_AUTHENTICATED: {
      return {
        isAuthenticated: true,
        userid: action.payload
      }
    }
    case SET_UNAUTHENTICATED: {
      return {
        isAuthenticated: false,
        userid: ''
      }
    }
    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getUserId = (state: State) => state.userid;
