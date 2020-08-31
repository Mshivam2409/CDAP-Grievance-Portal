rm -rf build/
mkdir -p build/web
mkdir -p build/data

cd client
yarn run build
cp -a build/* ../build/web
rm -rf build/

cd ../server
yarn run tsc
cp -a  build/* ../build
cp -a  src/data/* ../build/data
cp -a  package.json ../build
rm -rf build/

cd ../build
yarn install --prod
touch .env
cat>>.env<<"EOF"
NODE_ENV=production
DIR=.
NODE_PATH=./
PORT=5000
BUILD_DIRECTORY=web
DATABASE_DIR=data/audio
EOF