rm -rf build/
mkdir -p build/web

cd client
yarn run build
cp -a build/* ../build/web
rm -rf build/

cd ../server
yarn run tsc
cp -a  build/* ../build
cp -a  package.json ../build
rm -rf build/

cd ../build
yarn install --prod