#Task RESTful API retriever
Simple Node.js API that will retrieve, add, delete or edit a task of
your choice.

##Routes
**URL**
- /tasks

**Method**
- GET

**URL params**
- None

**Data Params**
- None

**Success Response**
- **Data**
- `{success: true, message: 'All the tasks retrieved', data: [{_id: ..., task: ..., completed: 0}, {_id: ..., task: ..., completed: 1}]}`

**Error Message**
- **Data**
- `{ success: false, message: 'No data found', data: [] }`

----

**URL**
- /tasks

**Method**
- POST

**URL params**
- None

**Data Params**
- None

**Success Response**
- **Data**
- `{ success: true, message: 'Task added to the database', data: [] }`

**Error Message**
- **Data**
- Valid object but something went wrong.
- `{ success: false, message: 'Sorry, something went wrong', data: [] }`

**OR**
- **Data**
- Not a valid object to add to the db.
- `{ success: false, message: 'The new task was invalid!', data: []}`

----

**URL**
- /tasks/:id

**Method**
- PUT

**URL params**
- **Required**
- `id=[string 24 char (MongoDB Object Id)]`

**Data Params**
- None

**Success Response**
- **Data**
- The request needs to be sent as a valid object! Needs to contain all the information that the database needs to create a valid task! (the description of the task with a key of **task** and the **completed** flag to set if the task is completed or not.)
- `{ success: true, message: 'Task completed!', data: [] }`

**Error Message**
- **Data**
- If no changes were made.
- `{ success: false, message: 'Task already exists!', data: [] }`

**OR**
- **Data**
- if the object sent is not valid.
- `{ success: false, message: 'Not a valid object', data: [] }`

**OR**
- **Data**
- if the param id is not valid.
- `{ success: false, message: 'The id is not valid', data: [] }`

----

**URL**
- /tasks/:id

**Method**
- DELETE

**URL params**
- **Required**
- `id=[string 24 char (MongoDB Object Id)]`

**Data Params**
- None

**Success Response**
- **Data**
- `{ success: true, message: 'Task removed from the database', data: [] }`

**Error Message**
- **Data**
- If no changes were made.
- `{ success: false, message: 'Error! Task was not removed!', data: [] }`

**OR**
- **Data**
- if the id was not valid.
- `{ success: false, message: 'The id is not valid', data: [] }`