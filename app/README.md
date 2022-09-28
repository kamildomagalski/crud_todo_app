
# ToDoApp

Simple and very common project of ToDoApp to manage your daily tasks. 
 
Try it out! [Demo](https://todoapp-5c66f.web.app/)
 
<hr>

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Contact](#contact)
<hr>

## General info
This in a simple app created for the recruitment purposes. <br>
It uses LocalStorage to keep entered tasks in browser memory. This increases  functionality as data persist after closing the app tab. 
In App You can add and delete tasks, sort them ascending/descending by name, priority or status (done/not done).
Tasks are display on a selected number of rows and split on multiple pages if needed.
<hr>

## Technologies
* React - version 16.3
* Create React App
* Sass - version 4.14
* uuid - version 8.3.1
<hr>

## Setup
#### To run the project You need to clone this repository and use npm to install all packages. 
>For more information see [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)


#### To build the project use:
### `npm install`
Runs the installation of all necessary packages to run the project.


### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
<hr>

#### Other available scripts, you can run in the project directory:
#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
<hr>

### How to use it?
1. On first run you have to enter a few tasks (browser local storage will be empty)
2. At the top you can add new tasks by filling form and hitting add task button. Proper validation will be executed.
3. Below, the tasks are being displayed in a table-looking section. 
4. Clicking on column headers you will sort tasks
5. On each task can be set to done by clicking empty square, it can be also undone.
6. When you mouse-enter on task, a trash bin icon will be desplayed (on mobile devices it's always on). By clicking it you delete this task.
7. At the bottom, you can set hom many tasks are beeing displayed on a single page, which tasks are you currently displaying and a number of all tasks. In bottom right corner are buttons for changing pages(disabled when single page. 
<hr>

### Features
List of completed features:
* Fully RWD both desktop and mobile
* Typical functionality of to do app


Possible toDo's:
* custom inputs
* add swpie events on mobile devices
* external database inteed of local storage
* support for different languages
<hr>

## Contact
Created by [@Kamil Domagalski](kdbrasi360@gmail.com) - feel free to contact me!