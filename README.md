# schedule

There are 4 repos in application

[Front End](https://github.com/MITIT-DEP22/schedule_mitit_front) <br>
Created in 2023 by:

- [Dmytro Bykov](https://github.com/pishexod)

[Back End](https://github.com/MITIT-DEP22/schedule-backend) <br>
Created in 2023 by:

- [Denys Hryshchenko](https://github.com/Denys11333)

[Parser](https://github.com/MITIT-DEP22/schedule-parser) <br>
Created in 2023 by:

- [Denys Hryshchenko](https://github.com/Denys11333)
- [Dmytro Bykov](https://github.com/pishexod)

[Google Module](https://github.com/MITIT-DEP22/schedule.google-modules) <br>
Created in 2023 by:

- [Denys Hryshchenko](https://github.com/Denys11333)
- [Dmytro Bykov](https://github.com/pishexod)

# To start application

1. Fill enviroment

```bash
# SCHEDULE FRONTEND
SCHEDULE_FRONT_PORT=

# SCHEDULE BACKEND
SCHEDULE_BACKEND_PORT=

# SCHEDULE PARSER
SCHEDULE_PARSER_PORT=

# SCHEDULE GOOGLE MODULES
SCHEDULE_GOOGLE_MODULES_PORT=

# SCHEDULE DATABASE
SCHEDULE_MONGODB_PORT=
SCHEDULE_MONGODB_INIT_USERNAME=
SCHEDULE_MONGODB_INIT_PASSWORD=
SCHEDULE_MONGO_URL=
SCHEDULE_MONGO_DB_NAME=

# SCHEDULE API GATEWAY
API_GATEWAY_PORT=

API_GATEWAY_BACKEND_ROUTE=<ROUTE> for example /api
API_GATEWAY_BACKEND_PROTOCOL=<PROTOCOL>

API_GATEWAY_PARSER_ROUTE=<ROUTE>
API_GATEWAY_PARSER_PROTOCOL=<PROTOCOL>

API_GATEWAY_GOOGLE_MODULES_ROUTE=<ROUTE>
API_GATEWAY_GOOGLE_MODULES_PROTOCOL=<PROTOCOL>

# IP ADDRESS OR DOMAIN OF MACHINE
HOST_IP=<host>

# VOLUMES
SSL_PATH_ON_OS=
SSL_PATH_IN_CONTAINER=
```

2. Fill enviroment in each service

3. Execute command

```bash
docker compose up --build
```
