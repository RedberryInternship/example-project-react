# Formatting
blue=$(tput setaf 6)
white=$(tput setaf 7)

# Current dir
buildDir=$(dirname "$0")

# Get sentry cli from node modules
centryCLI="$buildDir/../node_modules/@sentry/cli/bin/sentry-cli"

# sourcemaps dir
filesDir="$buildDir/sourcemaps"

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
  --strip-prefix ../ \
  $filesDir
