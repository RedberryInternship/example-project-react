# Text formatting options
white=$(tput setaf 7)
blue=$(tput setaf 6)

baseDir="$(dirname "$0")/.."

# Possibly passed argument, as to should happen cleaning before assembling the apk.
shouldClean=$1

# Go into android folder
cd $baseDir/android

if [ "$shouldClean" = "--clean" ]; then
  echo "\n\n${blue} Cleaning the last build... ${white}\n"
  ./gradlew clean
fi

echo "\n\n${blue} Building new apk... ${white}\n"
./gradlew assembleRelease

# Go to root folder
cd ..

echo "\n\n${blue}Removing old build file... ${white}\n"
apk=$baseDir/out/apk/espace*

if ls $apk 1>/dev/null 2>&1; then
  rm $apk
fi

# temporary now date
temp_now=$(date +'%Y-%m-%d')

apk=$baseDir/android/app/build/outputs/apk/release/app-release.apk

if [ -f "$apk" ]; then
  # Copy apk out/apk folder
  cp $apk $baseDir/out/apk/espace_$temp_now.apk

  echo "\n\n${blue} Build files created!${white}"
fi
