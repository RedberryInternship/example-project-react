# Text formatting
white=$(tput setaf 7)
blue=$(tput setaf 6)

# Project root directory
currentDir=$(dirname $0)
baseDir="$currentDir/.."

# Chosen platform: android | ios
chosenPlatform=$1

if [ "$chosenPlatform" != "android" ] && [ "$chosenPlatform" != "ios" ]; then
  echo 'Invalid argument!' 1>&2
  exit 64
fi

if [ "$chosenPlatform" = "android" ]; then
  echo "${blue}Creating android js bundle...${white}\n"
  npx react-native bundle \
    --dev false \
    --platform android \
    --entry-file $baseDir/index.js \
    --bundle-output $baseDir/out/android/index.android.bundle \
    --sourcemap-output $baseDir/out/android/index.android.bundle.map
  echo "${blue}Android js bundle created!${white}\n\n"
fi

if [ "$chosenPlatform" = 'ios' ]; then
  echo "${blue}Creating ios js bundle...${white}\n"
  npx react-native bundle \
    --dev false \
    --platform ios \
    --entry-file $baseDir/index.js \
    --bundle-output $baseDir/out/ios/index.ios.bundle \
    --sourcemap-output $baseDir/out/ios/index.ios.bundle.map
  echo "${blue}ios js bundle created!${white}"
fi
