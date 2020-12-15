# Text formatting options
normal='\e[21m'
bold='\e[1m'
underlined='\e[4m'

white=$(tput setaf 7)
red='\e[31m'
green='\e[32m'
blue=$(tput setaf 6)

# Possibly passed argument, as to should happen cleaning before assembling the apk.
shouldClean=$1

# Go to android directory
cd android

# Build apk
if [ "$shouldClean" = "--clean" ]; then
  echo "\n\n${blue} Cleaning the last build... ${white}\n"
  ./gradlew clean
fi

echo "\n\n${blue} Building new apk... ${white}\n"
./gradlew assembleRelease

# Return to root directory
cd ../

# remove old build files

echo "\n\n${blue}Removing old build files... ${white}\n"
apk=./build/apk/espace*
sourcefiles=./build/sourcemaps/index.*

if ls $apk 1>/dev/null 2>&1; then
  rm $apk
fi

if ls $sourcefiles 1>/dev/null 2>&1; then
  rm $sourcefiles
fi

# temporary now date
temp_now=$(date +'%Y-%m-%d')

# Copy apk, bundled js and source map into the build folder
cp android/app/build/outputs/apk/release/app-release.apk ./build/apk/espace_$temp_now.apk
cp android/app/build/generated/assets/react/release/index.android.bundle ./build/sourcemaps
cp android/app/build/generated/sourcemaps/react/release/index.android.bundle.map ./build/sourcemaps

echo "\n\n${blue} Build files created!${white}"
