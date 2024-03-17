# Home Control Web Application

## Introduction

Home Control is a dynamic web application designed to facilitate monitoring and management of smart home devices. This application provides users with a platform to control various devices within their smart home environment. 

## How to Use

1. **Installation**: Clone the repository to your local machine.
2. **Setup**: Install dependencies using `npm install`.
3. **Run**: Start the application with `npm start`.
4. **Access**: Open your web browser and navigate to `http://localhost:3000`.

## Specification

### Base Features

#### Home & About Pages
- Name and branding for the web application
- Brief information about the application
- Menu with links to other relevant pages

#### Add Device Page
- Form to add a new device with fields such as name, type, and status
- Client-side form validation
- Server-side functionality to store device data

#### Device Status Page
- Device selector input
- Display of status data for selected device
- Server-side functionality to retrieve device information

#### Control Device Page
- Device selector input
- Form to control device settings
- Submit button to apply changes
- Server-side functionality to update device settings

#### Delete Device Page
- Device selector input
- Delete button
- Extension: Confirmation modal before deletion
- Server-side functionality to delete device data

#### Navigation
- Fully navigable site with menu leading to all pages
- Home button on each page for easy navigation

### Extensions

#### Success Feedback
- Message to client indicating successful actions

#### Hot Reloading
- Reload relevant pages to reflect changes immediately

#### Disable Non-Applicable Fields
- Hide or disable fields not relevant to selected device type

#### Data Sanitisation
- Prevent malicious attacks by sanitizing user data

#### Front End Styling and GUI
- Modern and professional look using CSS styling
- Implementation of graphical controls for some device inputs

### Dependency Details

- **body-parser**: Middleware for parsing incoming request bodies.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **ejs**: Embedded JavaScript templates for generating HTML markup.
- **express**: Web framework for Node.js.
- **express-ejs-layouts**: Layout support for EJS templates in Express.js.
- **express-handlebars**: Handlebars view engine for Express.js.
- **express-validator**: Middleware for input validation in Express.js.
- **mysql**: MySQL database client for Node.js.
- **nodemon**: Utility that automatically restarts the server when changes are detected during development.

These dependencies are essential for running and developing the Home Control application.

## Conclusion

Home Control is a powerful tool for managing smart home devices. With its user-friendly interface and robust functionality, it offers a seamless experience for controlling and monitoring your home environment.
