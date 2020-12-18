module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['transform-remove-console'],
    ['babel-plugin-root-import'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          'test/*': ['./test/'],
          'assets/*': ['./assets/'],
        },
      },
    ],
  ],
}
