# Guest Note App 

This project is a Guest Note App that allows users to create and share notes. It provides functionalities for users to add, edit, and delete notes, making it a convenient tool for capturing and organizing ideas.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Development Documents](#development-documents)

## Introduction

This project provides a user-friendly Guest Note App designed for anyone who needs a convenient way to capture and manage their ideas. It offers essential functionalities for creating, editing, and deleting notes, making it perfect for jotting down quick thoughts, organizing to-do lists, or brainstorming on the go.

## Features:

* **Note Creation:** Users can create new notes with titles and content.
* **Note Share:** Users can share notes.
* **Data Persistence:** Notes are persisted using a MySQL database.
* **Instant Notification:** Users get notified with shared notification.
* **Daily Notification:** Users receives daily email with a summary of their notes within the last 24 hours.
* **User Authentication:** JWT tokens based authentication using `Passport.js`.

**Development Environment**

* **ubuntu**: 22.04.3 LTS
* **npm**: v8.19.4
* **node**: v20.11.1

**Technology Stack:**

* This project can be adapted to use various technologies:
    * **Backend Framework:** Node.js with Express.js
    * **Programming Language:** TypeScript
    * **Database Engine:** MySQL
    * **Object-Relational Mapper (ORM):** Prisma
    * **Authentication:** Passport.js
    * **Testing Framework:** Jest
    * **Task Scheduling:** node-schedule
    * **Email Sending:** nodemailer
    * **Real-Time Communication:** Socket.io
    * **Containerization:** Docker and Docker Compose


## Getting Started

1. **Clone the Repository:**

```bash
git clone https://github.com/AhmedHafez13/guest-note-app.git
```

2. **Install Dependencies:**

```bash
cd guest-note-app
npm install
```

**Development Environment Configuration:**

**Create Environment File (.env)**

* In the project root directory, create a file named `.env`. This file will store sensitive information (e.g., database credentials).

* Inside the `.env` file, define environment variables that your application will use. You can find an example in `.env.example` file.

**Running the Application (Development Mode):**

1. Start the development server with hot reloading using `nodemon`:

```bash
npm run dev
```

This will start the application in development mode, watching for changes in your source code and automatically restarting the server when changes are detected.

## Project Structure:

[**See Full Development Guide**](./_Dev_Files/Dev-Documents/03.01.Development-Guide.md)

* **src:** Contains the source code for the application.
    * **index.ts** and **server.ts**: Entry points for the application.
    * **config**: Stores configuration files.
    * **error-handler**: Handles errors and exceptions.
    * **middleware**: Contains middleware functions for request processing.
    * **settings**: Application settings and environment variables.
    * **notifications**: Handles notification functionalities (future implementation).
    * **types**: Custom TypeScript type definitions.
    * **shared**: Reusable components and utilities.
    * **models**: Data models for database entities.
    * **repositories**: Data access layer for interacting with the database.
    * **modules**: Each module represents a specific functionality (e.g., user management, notes).
        * Subdirectories within modules can hold controllers, enums, routes, services, types, validation logic, and tests.
* **types**: Global TypeScript type definitions.
* **.dockerignore**: Specifies files to exclude from Docker image creation.
* **.env**: Environment variables for configuration.
* **.gitignore**: Specifies files to ignore from version control.
* **backend.Dockerfile**: Dockerfile for building the application image.
* **docker-compose.yml**: Configuration file for Docker Compose.
* **jest.config**: Configuration file for Jest testing framework.
* **tsconfig.json**: Configuration file for the TypeScript compiler.
* **README.md**: Project documentation and usage instructions.

## API Documentation

Please refer to the [API documentation](./_Dev_Files/API-Documentation/README.md) for detailed information on available endpoints, request/response formats, and usage examples.

## Development Documents

- [**Project plan**](./_Dev_Files/Dev-Documents/README.md): A detailed plan outlining the development process.
- [**Development Guidelines**](./_Dev_Files/Dev-Documents/03.01.Development-Guide.md)
- [**User Stories**](./_Dev_Files/Dev-Documents/01.03.User-Stories.md)
- [**Component Design**](./_Dev_Files/Dev-Documents/02.01.Component-Design-Document.md)
- [**Database Design**](./_Dev_Files/Dev-Documents/02.02.Database-Design-Document.md)

**Contributing:**

Feel free to contribute to this project by creating pull requests with your improvements or bug fixes.

**License:**

This project is licensed under the ISC License.
