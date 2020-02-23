import {useEffect, useRef} from 'react'
import {Platform} from 'react-native'
import Defaults from './defaults'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'react-native-firebase'

const iosConfig = {
  clientId:
    '480798332479-e4nt83nh3en888jq8vdtaiqv40u1k07r.apps.googleusercontent.com',
  appId: '1:480798332479:ios:54159517e51c7890038a8a',
  apiKey: 'AIzaSyBJKYL5eKCce-l9c0MfDdHVbmGj24JqPMg',
  databaseURL: 'https://espace-739b6.firebaseio.com',
  storageBucket: 'espace-739b6.appspot.com',
  messagingSenderId: '480798332479',
  projectId: 'espace-739b6',

  // enable persistence by adding the below flag
  persistence: true,
}

const androidConfig = {
  clientId:
    '480798332479-tvo4q62f8eocb5vjqsad28rp4cs4qpf4.apps.googleusercontent.com',
  appId: '1:480798332479:android:3dc2641ca2616c55038a8a',
  apiKey: 'AIzaSyCxqETw2uFjKw2aVMhi3TKByj0eumVDXh4',
  databaseURL: 'https://espace-739b6.firebaseio.com',
  storageBucket: 'espace-739b6.appspot.com',
  messagingSenderId: '480798332479',
  projectId: 'espace-739b6',

  persistence: true,
}
type This = {
  channel: any
}
const useFirebase = (): void => {
  const _this = useRef<This>({channel: ''})
  useEffect(() => {
    initialRun()
  }, [])

  const initialRun = async (): Promise<any> => {
    if (!firebase.apps.length)
      firebase.initializeApp(
        // use platform specific firebase config
        Platform.OS === 'ios' ? iosConfig : androidConfig,
        // name of this app
        'Espace',
      )
    // console.log(firebase);
    const permissionStatus = await firebase.messaging().hasPermission()

    if (!permissionStatus) await requestPermission()
    createNotificationListeners()

    const onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(tokenRefresh)

    const notificationListener = firebase
      .notifications()
      .onNotification((message: any) => {
        renderNotification(message)
      })

    return (): void => {
      onTokenRefreshListener()
      notificationListener()
    }
  }

  const tokenRefresh = async (newFCMToken: string): Promise<void> => {
    // handle token change, if change update everywhere
    const fcmToken = await AsyncStorage.getItem('fcmToken')
    if ((fcmToken === null || fcmToken !== newFCMToken) && Defaults.token) {
      console.log(Defaults.FCMToken)
      Defaults.FCMToken = newFCMToken
      AsyncStorage.setItem('fcmToken', newFCMToken)
    }
  }

  //3
  const getToken = async (): Promise<void> => {
    let fcmToken: string | null = await AsyncStorage.getItem('fcmToken')

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        AsyncStorage.setItem('fcmToken', fcmToken)
      }
    }

    Defaults.FCMToken = fcmToken

    console.log(Defaults.FCMToken, 'Defaults.FCMToken')
  }

  //2
  const requestPermission = async (): Promise<void> => {
    try {
      await firebase.messaging().requestPermission()
      await firebase.messaging().ios.registerForRemoteNotifications()
      // User has authorized
      getToken()
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected')
    }
  }

  const createNotificationListeners = (): void => {
    // Build a channel
    _this.current.channel = new firebase.notifications.Android.Channel(
      'Notification',
      'Notification',
      firebase.notifications.Android.Importance.Max,
    )
      .setDescription('Notification chanel description')
      .setSound('alert')

    // Create the channel
    firebase.notifications().android.createChannel(_this.current.channel)

    // Build a channel group
    const channelGroup = new firebase.notifications.Android.ChannelGroup(
      'Daily-notification',
      'Daily-notification',
    )

    // Create the channel group
    firebase.notifications().android.createChannelGroup(channelGroup)

    /*
     * Triggered for data only payload in foreground
     * */
    firebase.messaging().onMessage(message => {
      renderNotification(message)
    })
  }

  const renderNotification = (message: any): void => {
    console.log(message, 'message')

    const notification = new firebase.notifications.Notification()
      .setNotificationId('notification_dat._notificationId')
      .setTitle(message._title)
      .setBody(message._body)
      // .setSubtitle(notification_dat._body)
      .setSound('default')
      .android.setColor('#fb634f')
      .android.setChannelId(_this.current.channel.channelId)
      // .android.setSmallIcon('ic_launcher_round')
      // .ios.setBadge(2)
      // .android.setTag("tag")
      // .android.setBigPicture(notification.data.image)
      .android.setAutoCancel(true)
      .android.setPriority(firebase.notifications.Android.Priority.High)
    firebase
      .notifications()
      .displayNotification(notification)
      .catch(err => console.log(err))
  }
}

export default useFirebase
