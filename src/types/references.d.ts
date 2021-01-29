import { NavigationContainerRef } from '@react-navigation/native';
import { Dispatch } from 'redux';

export type References = {
  reduxDispatch: Dispatch<any> | undefined,
  navigator: NavigationContainerRef | undefined
}
