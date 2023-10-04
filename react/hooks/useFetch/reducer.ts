export type StateProps<T> = {
  data?: T
  error?: Error,
  loading?: boolean
}

type ActionProps<T> = {type: 'loading'} |
{type: 'fetched', payload?: T} |
{type: 'error', payload?: Error}

export const reducer = <T>(state: StateProps<T>, action:ActionProps<T>)=>{
  switch (action.type) {
      case 'loading':
          return {...state, loading: true}
      case 'fetched':
          return {...state, data: action.payload, loading: false}
      case 'error':
          return {...state, error: action.payload, loading: false}

      default:
          return  state
  }
}
