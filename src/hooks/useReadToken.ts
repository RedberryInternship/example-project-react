import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { readTokenFromStorageAndUpdateState } from 'state/actions/userActions'

/**
 * Read token from the storage upon start up.
 */
const useReadToken = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(readTokenFromStorageAndUpdateState())
  }, [dispatch])
}

export default useReadToken
