build :
	docker build -t secreto-clone-client .

run :
	docker run -d -p 3000:3000 --name secreto-clone-client secreto-clone-client

start :
	docker start secreto-clone-client

stop :
	docker stop secreto-clone-client