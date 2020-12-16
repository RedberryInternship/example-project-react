# Formatting
blue=$(tput setaf 6)
white=$(tput setaf 7)

# Current dir
currentDir=$(dirname "$0")
baseDir=$currentDir/..

# Get sentry cli from node modules
centryCLI="$baseDir/node_modules/@sentry/cli/bin/sentry-cli"

# Chosen platform
chosenPlatform=$1

if [ "$chosenPlatform" != 'android' ] && [ "$chosenPlatform" != 'ios' ]; then
  echo "Invalid arguments provided!" 1>&2
  exit 64
fi

# sourcemaps dir
androidFilesDir="$baseDir/out/android"
iosFilesDir="$baseDir/out/ios"

if [ $chosenPlatform = 'android' ]; then
  filesDir=$androidFilesDir
fi

if [ $chosenPlatform = 'ios' ]; then
  filesDir=$iosFilesDir
fi

# Domain for versions
domain="ge.e-space.api"

echo "${blue}Please, give me the current version... ${white}"
read version

echo "${blue}\nPlease, give me the current build number...${white}"
read build_number

$centryCLI releases \
  files "$domain-$version" \
  upload-sourcemaps \
  --dist "$build_number" \
  --strip-prefix "$(pwd)" \
  $filesDir
