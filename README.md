# Local Development Instructions
Prerquisites:
-Download Docker ---> (https://docs.docker.com/get-docker/)
-Download Git    ---> (https://github.com/git-guides/install-git
-Clone this repo ---> (https://github.com/bjornburrell-qcbb/Docker-Book-Review.git) 

git clone https://github.com/bjornburrell-qcbb/Docker-Book-Review.git

Run `npm i` inside the client directory

Run `npm i` inside the server directory

Run `docker-compose up --build` inside the main project directory

Once your container starts, you can access the database and web app locally

Access the Adminer(database gui) at `http://localhost:8000/`
Adminer creds: server = `mysql_db`  Username = `root`  password = `MYSQL_ROOT_PASSWORD`

Access the application at `http://localhost:3050/` 
