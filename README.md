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
* [Running Unit Tests](#running-unit-tests)
* [Development](#development)
* [Deployment with CI / CD](#deployment-with-ci-\-cd)
* [Project Structure](#project-structure)

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
* <img src="readme/assets/sentry.jpeg" height="25" style="position: relative; top: 5px" /> [Sentry @2.1.0](https://github.com/spatie/laravel-translatable) - Error monitoring tool
* <img src="readme/assets/i18next.png" height="25" style="position: relative; top: 5px" /> [i18next @19.4.4](https://github.com/spatie/laravel-translatable) - Error monitoring tool

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
### Running Unit tests
Docs soon....

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
### Deployment with CI
Docs soon...

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
│   ├─── helpers      # global helpers
│   ├─── hooks        # global react hooks
│   ├─── libraries    # library configurations
│   ├─── screens      # react navigation screens
│   ├─── services     # api services / axios calls
│   ├─── state        # redux state management and sagas
│   ├─── types        # global types
│   ├─── utils        # global utility functions
│   │- StartUpLayer.tsx # Starting point where you can do some work before app loads
- .eslintrc.json   # eslint config file
- .prettierrc.js   # prettier config file
- .sentryclirc     # sentry config file
- App.tsx          # react app
- babel.config.js  # babel config file
- package.json     # dependency manager configurations
- tsconfig.json    # typescript config file
```