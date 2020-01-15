type State = {
  user: Boolean | null,
  loading : boolean,
  authStatus : "failed" | "success"| null
}
type Action = {
  type : string,
  payload : any,
}


export const initialState : State = {
  user: null,
  loading : false,
  authStatus : null,
}

function reducer(state : State = initialState, {type, payload} : Action) : State{
  switch(type) {
    case 'AUTH_BEGIN':
      return {
        ...state,
        loading: true
      }

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: payload.user,
        authStatus: "success",
      }

    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        authStatus : "failed"
      }

    default:
      return state
  }
}

export default reducer