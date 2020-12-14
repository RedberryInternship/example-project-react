import { setUser } from '@sentry/react-native'
import { UserMeResponseType } from 'types'

/**
 * Remember user for sentry.
 */
export const rememberUser = (user: UserMeResponseType) => {
  user
    ? setUser(
      {
        id: `${user.id}`,
        username: `${user.first_name} ${user.last_name}`,
        email: user.email ?? '',
        phone_number: user.phone_number,
      },
    )
    : setUser(null)
}
