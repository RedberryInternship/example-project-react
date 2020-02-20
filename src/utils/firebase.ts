// import React from "react";
// import { Platform,Alert,AppRegistry,View } from 'react-native';
// import Defaults from "./defaults";
// import AsyncStorage from "@react-native-community/async-storage";


// // pluck values from your `GoogleService-Info.plist` you created on the firebase console
// const iosConfig = {
//   clientId: '704554134224-jjc2o78c84jih86btjknh3ed5rs79n2e.apps.googleusercontent.com',
//   appId: '1:704554134224:ios:1fa06d9f5cbbc68b',
//   apiKey: 'AIzaSyDg1MDfdH_KPy4W0MP2gGkZABL-m12pBQY',
//   databaseURL: 'https://lunchoba-5b9e9.firebaseio.com',
//   storageBucket: 'lunchoba-5b9e9.appspot.com',
//   messagingSenderId: '704554134224',
//   projectId: 'lunchoba-5b9e9',
    
//   // enable persistence by adding the below flag
//   persistence: true,
// };

// // pluck values from your `google-services.json` file you created on the firebase console
// const androidConfig = {
//   clientId: "704554134224-t1j453ggmb0fstbnghhtm0g512gdclrr.apps.googleusercontent.com",
//   appId: "1:704554134224:android:d57c45c57a0a60ca",
//   apiKey: "AIzaSyBI-QR8_RkbDvvZjG9ZMun6XVKzx8p5fig",
//   databaseURL: 'https://lunchoba-5b9e9.firebaseio.com',
//   storageBucket: 'lunchoba-5b9e9.appspot.com',
//   messagingSenderId: '704554134224',
//   projectId: 'lunchoba-5b9e9',
  
//   // enable persistence by adding the below flag
//   persistence: true,
// };

// class Ntification extends React.PureComponent {
  
//     componentDidMount=  async () => {
//         if (!firebase.apps.length)
//         firebase.initializeApp(
//             // use platform specific firebase config
//             Platform.OS === 'ios' ? iosConfig : androidConfig,
//             // name of this app
//             'lunchoba',
//         );
//         this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(async newFCMToken => {
            
//             // handle token change, if change update everywere
//             let fcmToken = await AsyncStorage.getItem('fcmToken');
//             if((fcmToken === null || fcmToken !== newFCMToken) && Defaults.token){

//                 console.log(Defaults.FCMToken);
//                 Defaults.FCMToken = newFCMToken;
//                 AsyncStorage.setItem('fcmToken', newFCMToken);
//             }
//         });
//         // console.log(firebase);
//         this.checkPermission();
//         await this.createNotificationListeners();
//     }
    
//     componentWillUnmount() {
//         this.notificationListener();
//         this.checkPermission();
//         this.createNotificationListeners();
//     }
    
//     //1
//     async checkPermission() {
//         const enabled = await firebase.messaging().hasPermission();
//         if (enabled) {
//             this.getToken();
//         } else {
//             this.requestPermission();
//     }
//     }
    
//     //3
//     async getToken() {

//         let fcmToken: string | null = await AsyncStorage.getItem('fcmToken');
        
//         if (!fcmToken) { 
//             fcmToken = await firebase.messaging().getToken();
//             if (fcmToken) {
                
//                 // user has a device token
//                 AsyncStorage.setItem('fcmToken', fcmToken);
//             }
//         }

//         Defaults.FCMToken = fcmToken;

//         console.log(Defaults.FCMToken);
        
//     }
    
//     //2
//     requestPermission = async () =>  {
//         try {
//             await firebase.messaging().requestPermission();
//             await firebase.messaging().ios.registerForRemoteNotifications();

//             // User has authorised
//             this.getToken();
//         } catch (error) {
//             // User has rejected permissions
//             console.log('permission rejected');
//         }
//     }
    
//     createNotificationListeners = async () => {
//       // Build a channel
//       this.channel = new firebase.notifications.Android.Channel('Notification', 'Notification', 
//       firebase.notifications.Android.Importance.Max).setDescription('Notification chanel description').setSound('alert');
      
//       // Create the channel
//       firebase.notifications().android.createChannel(this.channel);
      
//       // Build a channel group
//       const channelGroup = new firebase.notifications.Android.ChannelGroup('Daily-notification', 'Daily-notification');
      
//       // Create the channel group
//       firebase.notifications().android.createChannelGroup(channelGroup);
      
//       /*
//       * triggered when a particular notification has been received in foreground
//       * 
//       */
//       this.notificationListener = firebase.notifications().onNotification((message) => {
//         this.renderNotification(message)
//       });
      
//       /*
//       * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
//       * */
//       firebase.notifications().onNotificationOpened((notificationOpen) => {
//         const { title, body } = notificationOpen.notification;
//         Mixpanel.trackWithProperties("Notification", {status: "opened from background state by notification"})

//         if(body || title)
//             Defaults.dropdown.alertWithType('success',title,body);

//         // firebase.analytics().setCurrentScreen("fromNotification");
//         firebase.notifications().removeAllDeliveredNotifications()
//       });
      
//       /*
//       * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
//       * */
//       const notificationOpen = await firebase.notifications().getInitialNotification();
//       if (notificationOpen) {
//         // firebase.analytics().setCurrentScreen("fromNotification");
//         Mixpanel.trackWithProperties("Notification", {status: "opened from killed application by notification"})

//         const { title, body } = notificationOpen.notification;
//         if(body || title)
//             Defaults.dropdown.alertWithType('success',title,body);

//         firebase.notifications().removeAllDeliveredNotifications()

//       }
//       /*
//       * Triggered for data only payload in foreground
//       * */
//       firebase.messaging().onMessage((message) => {

//             this.renderNotification(message)

//         });
//     }

//     renderNotification = (message) => {
//         console.log(message, "message");

//         if(Defaults.token)

//         Mixpanel.trackWithProperties("Notification", {status: "Received Notification"})

//         const notification_dat = message
        
//         const notificatiosn = new firebase.notifications.Notification({ show_in_foreground: true })
//         .setNotificationId("notification_dat._notificationId")
//         .setTitle(notification_dat._title)
//         .setBody(notification_dat._body)
//         // .setSubtitle(notification_dat._body)
//         .setSound('default')
//         .android.setColor('#fb634f')
//         .android.setChannelId(this.channel.channelId)
//         .android.setSmallIcon("ic_launcher_round1")
//         // .ios.setBadge(2)
//         // .android.setTag("tag")
//         // .android.setBigPicture(notification.data.image)
//         .android.setAutoCancel(true)
//         .android.setPriority(firebase.notifications.Android.Priority.High);
//         firebase.notifications().displayNotification(notificatiosn).catch(err =>console.log(err));
//     }

//     render(){
//         return(
//             <View></View>
//         )
//     }
// } 

// export default  Ntification;