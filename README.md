<div style="display:flex; align-items: center">
  <img src="readme/assets/logo.png" alt="drawing" width="100" style="margin-right: 20px" />
  <h1 style="position:relative; top: -6px" >E Space Mobile App</h1>
</div>

---
E Space Mobile App helps people to find e-car charger nearby and charge their electric cars easily.


#
### Table of Contents
* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Testing](#testing)
* [Development](#development)
* [Project Structure](#project-structure)
* [Deployment](#deployment)

#
### Prerequisites

* <img src="readme/assets/node.png" width="25" style="position: relative; top: 8px" /> *Node JS @12.X and up*
* <img src="readme/assets/yarn.jpeg" width="25" style="position: relative; top: 7px" /> *Yarn @1.X and up*
* <img src="readme/assets/npm.png" width="35" style="position: relative; top: 4px" /> *npm @6 and up*
* <img src="readme/assets/typescript.png" width="20" style="position: relative; top: 6px" /> *TypeScript@4.X and up*


#
### Tech Stack

* <img src="readme/assets/react.png" height="18" style="position: relative; top: 4px" /> [React @16.11.0](https://reactjs.org) - front-end framework
* <img src="readme/assets/react-native.png"  height="20" style="position: relative; top: 4px" /> [React Native @0.62.2](https://reactnative.dev/) - Mobile hibryd applications framework
* <img src="readme/assets/redux.png" height="18" style="position: relative; top: 4px" /> [Redux @4.0.5](https://redux.js.org/) - State management tool
* <img src="readme/assets/redux-saga.png" height="18" style="position: relative; top: 4px" /> [Redux Saga @1.1.3](https://redux-saga.js.org/) - Side effect manager
* <img src="readme/assets/jwt.png" height="18" style="position: relative; top: 4px" /> [JWT Auth](https://jwt.io/) - Authentication system
* <img src="readme/assets/sentry.jpeg" height="25" style="position: relative; top: 5px" /> [Sentry @2.1.0](https://sentry.io/) - Error monitoring tool
* <img src="readme/assets/i18next.png" height="25" style="position: relative; top: 5px" /> [i18next @19.4.4](https://react.i18next.com/) - library for translation
* <img src="readme/assets/detox.png" height="25" style="position: relative; top: 5px" /> [Detox @18.12.0](https://github.com/wix/Detox) - React Native E2E testing tool

#
### Getting Started
1\. First of all you need to clone E Space repository from github:
```sh
git clone https://github.com/e-space1/espace-mobile.git
```

2\. Next step requires  install all the dependencies.
```sh
npm install
```
or
```sh
yarn
```

3\. after you have installed all the node dependencies, it's time to install ios pods:
```sh
cd ios && pod install
```

4\. after that you can run e-space application from terminal:
```sh
yarn ios
```
or
```
yarn android
```

For more information about running apps with simulator and on real device check out [docs](https://reactnative.dev/docs/running-on-device)

#
### Testing
E-Space is test driven. we are using several testing approaches and tools. 
1. For components integrity and structure we are using ``` @testing-library/react-native ```. you can find component tests into following path: ```src/tests/components/*.spec.tsx```
1. We also test logical units of our app, which includes filtering data, validation, user actions and so on, for which we are using ``` jest```. you can find logical unit tests into the following path: ```src/tests/logic/*.spec.ts```
1. We also have e2e tests for our app flows, which can only be run in testing environment because it alerts the actual database, aftermath the database is reset, but for caution we allow e2e testing only in development environment. for e2e testing we are using ```detox``` and you can find actual tests and configuration into the following path: ```src/tests/e2e/*.e2e.ts```

you can run component and unit tests using following command:
```sh
yarn tests
```

for e2e tests, there are some building steps to take into account:
1. You need to have `iPhone 11` simulator installed to run the tests.
1. You need to run `yarn e2e:build` to build application at the first time to build the application.
1. You need to run metro packager `yarn start`
1. Start your `iPhone 11` simulator
1. And run your tests by executing `yarn e2e`

`Warning: ` *Sometimes e2e tests fails asserting(seeing) dropdown alert, which I come to understand that it is the detox issue*


#
### Development

You can manage environment server api from the **src/utils/const.ts** file:

```ts
// export const domain = 'http://127.0.0.1:8000/'
// export const domain = 'https://api-dev.e-space.ge'
export const domain = 'https://app.e-space.ge' // prod
```
during development should most likely have uncommented **https://api-dev.e-space.ge** api.

Before deployment to app store/play store you should change this so that **https://app.e-space.ge** would be uncommented.


#
### Project Structure

```bash
├─── android  # native android project files
├─── ios      # native ios project files
├─── out      # place where build files and sourcemaps are stored
├─── patches  # library fixes
├─── readme   # readme assets
├─── scripts  # custom scripts that are ran by the package json scripts
├─── src      # project source codes
│   ├─── assets       # project images and fonts
│   ├─── components   # reusable components
│   ├───├─── component-folder   # component folder name
│   ├───├───├─── index.ts               # export default component
│   ├───├───├─── component-name.tsx     # react component
│   ├───├───├─── use-component-name.tsx # [OPTIONAL] react hook
│   ├───├───├─── types.d.ts             # [OPTIONAL] component scoped types
│   ├───├───├─── helpers.ts             # [OPTIONAL] component scoped helpers
│   ├───├───├─── utils.ts               # [OPTIONAL] component scoped utility functions
│   ├───├─── index.ts   # export all components
│   ├─── helpers      # global helpers
│   ├─── hooks        # global react hooks
│   ├─── libraries    # library configurations
│   ├─── screens      # react navigation screens
│   ├───├─── screen-folder  # react navigation screens
│   ├───├───├─── index.ts            # export default screen
│   ├───├───├─── screen-name.ts      # react screen component
│   ├───├───├─── use-screen-name.ts  # [OPTIONAL] react screen hook
│   ├───├───├─── helpers.ts          # [OPTIONAL] screen scoped helpers
│   ├───├───├─── utils.ts            # [OPTIONAL] screen scoped utility functions
│   ├───├───├─── types.d.ts          # [OPTIONAL] screen scoped types
│   ├─── services     # api services / axios calls
│   ├─── state        # redux state management and sagas
│   ├─── types        # global types
│   ├─── utils        # global utility functions
│   │- StartUpLayer.tsx # Starting point where you can do some work before app loads
├─── tests        # tests folder
│   ├─── components   # components testing
│   ├─── logic        # unit testing
│   ├─── e2e          # e2e testing
│   ├─── factory      # entity factory
│   ├─── mock         # jest mocks
- .eslintrc.json   # eslint config file
- .prettierrc.js   # prettier config file
- .sentryclirc     # sentry config file
- App.tsx          # react app
- babel.config.js  # babel config file
- package.json     # dependency manager configurations
- tsconfig.json    # typescript config file
```

### Deployment

We have helper scripts which help us in deployment process.
Before every deployment we need to create source maps for each platform android and ios and then upload to sentry with the right build number and version for sentry to be able to identify each error message and to give us more accurate messages and code debugging utilities...

1. Before deployment we need to generate javascript bundle and sourcemap files
    * for android: `yarn bundle-android` which will generate source and sourcemap for android in the following path - `out/android`
    * for ios: `yarn bundle-ios` which will generate source and sourcemap for android in the following path - `out/ios`
1. Then we need to upload these source maps into the sentry repository:
    * for android: `yarn upload-android-sourcemaps`, which will prompt as with version and build number, and we need to provide those for sentry 
    * for ios: `upload-ios-sourcemaps`, which will prompt as with version and build number, and we need to provide those for sentry
1. Next we can upload our applications into the stores

also there is helper for generating android apk:
`yarn generate-apk`
this command will generate android production application and will put output into the following path: `out/apk/espace_YYYY_MM_DD.apk`