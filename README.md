# LAB - Class 31-32

## Project: To Do App

### Author: KC Hofstetter (With help from Ryan Gallaway, I followed along during some lecture time)

### Problem Domain

A Web Application for securely managing a To Do List

The To Do Manager application has the following overall requirements:

- Designed to match the mock-up
  - Header, Main Section Footer
  - Use Mantine for styling and visual components
- The header should present the main menu
  - Home Link, which shows the list of To Do Items
- In the “Main” section
  - The list of items in the to do list
    - Based on user preferences, show listings in groups of (3, 5, etc) and provide the ability to view multiple “pages” of results
    - Each item in list should show the text of the item as well as the assignee
      - Based on user preferences, hide or show completed items
      - If shown, completed items should be styled differently making their status visually obvious

### Links and Resources

- [ci/cd](https://github.com/khofstetter94/todo-app/pull/6)
- [front-end application](https://animated-medovik-9e9e48.netlify.app/)

#### How to initialize/run your application

- `npm start`

#### Features / Routes

- The application will be created with the following overall architecture and methodologies

  - React
  - Functional Components
  - Settings delivered to the application using Context
  - User Login & Permissions delivered to the application using Context
  - Local Storage / Cookies for storing login status
  - Local Storage / Cookies for storing user preferences
  - Axios for performing API Requests
  - Mantine Component Library for styling
  - Test Driven Development, using Jest
  - Tests will be runnable locally
  - Deployment to cloud provider

#### Tests

- How do you run tests?
- Any tests of note?
- Describe any tests that you did not complete, skipped, etc

#### Documentation

- Describe how global state is consumed by the components
- Describe the operation of the hook: useForm()

#### UML

![UML](./img/Screen%20Shot%202022-11-01%20at%206.57.40%20PM.png)
