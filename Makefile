

all:
	tsc --out web/main.js main.ts
	cp ./index.html web/
	cp ./monkey.json web/


clean:
	rm -rf web/
