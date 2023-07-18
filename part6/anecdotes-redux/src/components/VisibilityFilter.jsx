import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter: <input type='text' onChange={ e => dispatch(filterChange(e.target.value))} />
    </div>
  )
}

export default VisibilityFilter