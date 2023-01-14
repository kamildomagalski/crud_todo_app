## CRUD ToDo App

### first project with a node.js backend and SQL database


#### Todo:
- handle errors when log with non existing user login
- add edit mode on frontend
- add setDone on frontend
- add webhooks
- deploy on AWS
- dynamic loading of todos
- password hash on backend (bcrypt) + decode JWT token on front to retrieve user data.
- share you tasks with anoyher user
- subtasks
- check if username is taken at registration
- ~~action logger middleware~~
- add some custom hooks to simplify logic (useLocalStorage, useToggleCheckbox, useInput)
- disable React DevTools on production 

#### Known bugs:
- doble rendering of ProvideAuth, PersistLogin component
- after logout should be no refresh-token request
