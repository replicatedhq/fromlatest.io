
clean:
	rm -rf node_modules
	grunt clean

deps:
	npm install

run:
	grunt watch > /dev/null &
	grunt serve

build:
	grunt build
	
release:
	grunt build:release
