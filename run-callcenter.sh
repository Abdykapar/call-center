git pull origin master
npm install
rm -rf dist/css
rm -rf dist/js
rm -rf dist/static
npm run build
cp -avr static dist/
