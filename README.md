## Instructions for running this project locally.

You must first download the project:

### `git clone https://github.com/DeveloperSrMx/login_react_node_sql.git`

Once downloaded you must enter the folder:

### `cd login_react_node_sql`

Now it's easy, you just have to run the following command:

### `docker-compose up -d`

This command will run 3 containers corresponding to: database (dbmysql), reactjs application (web), nodejs api (api).

Now please wait a few minutes while the images of each container are downloaded, once the process has finished it may be that the environment is not completely ready, you must make sure by executing:

### `docker ps -a`

In our case, for each container the status must appear as "Up" and in the case of the database it must appear in addition to "Up", "healthy".

If everything is fine, you should already see the application in:

⭐ Open [http://localhost:3015](http://localhost:3015) to view it in the browser. ⭐

This project is dockerized to facilitate its development, execution and distribution. 😎

___
## About the project.
This project consists of an API in NodeJs, a Frontend in ReactJs and a database in MySQL.<br/> The API use Express, Sequelize as the ORM. OpenAPI for API documentation, Jest for unit tests, JWT (jsonwebtoken) for authentication and access to resources, bcryptjs to encrypt passwords.
<br/>The frontend is built with ReactJs, for route management use react-router-dom, axios for handling http requests and Bootstrap for styles.
<br/>As a database use MySQL.
<br/>As mentioned before, the entire local infrastructure is dockerized and managed with a single door of execution with docker-compose.
___
## Commands of interest.

To validate that the 3 containers are ready and healthy:

### `docker ps -a`

To review the logs for each container at runtime, you can run one of the following commands:

### `docker-compose logs -f web`
### `docker-compose logs -f api`
### `docker-compose logs -f dbmysql`

To stop everything:

### `docker-compose down`

To delete the database (binded):

### `rm -rf dbmysql/`

If you want to see the data in the database, you must execute the following command:

### `docker exec -it login_react_node_sql_dbmysql_1 mysql -uroot -p`

It will ask for the password, you must enter "password"
You must change the database:

### `use oysterdb;`

You can check if the user table exists:

### `show tables;`

If it exists, great! you can execute:

### `select * from users;`

That's it.