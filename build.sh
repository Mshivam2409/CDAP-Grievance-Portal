rm -rf build/
mkdir -p build/web
mkdir -p build/database

cd client
yarn run build
cp -a build/* ../build/web
rm -rf build/

cd ../server
yarn run tsc
cp -a  build/* ../build
cp -a  src/data/* ../build/database
cp -a  package.json ../build
rm -rf build/

cd ../build
yarn install --prod
touch .env
cat>>.env<<"EOF"
NODE_ENV=production
DIR=.
NODE_PATH=./
PORT=8000
BUILD_DIRECTORY=web
EOF