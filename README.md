## Guest Note App `Initial Document`

This document provides instructions on setting up the development environment and getting started with the Guest Note App, a platform for sending and receiving notes.

**Project Setup:**

Install the required dependencies using npm:

```bash
npm install
```

This will install all the necessary packages for running the application, including development tools.

**Development Environment Configuration:**

**Optional: Create Environment File (.env)**

* In the project root directory, create a file named `.env`. This file will store sensitive information (e.g., database credentials) that should not be committed to version control.

    **Important:**  **Do not**  include the `.env` file in your version control system (e.g., Git). You can create a `.gitignore` file to specify files to exclude from version control.

* Inside the `.env` file, define environment variables that your application will use. You can find an example in `.env.example` file

**Running the Application (Development Mode):**

1. Start the development server with hot reloading using `nodemon`:

   ```bash
   npm run dev
   ```

   This will start the application in development mode, watching for changes in your source code and automatically restarting the server when changes are detected.

**Testing:**

The project utilizes Jest for unit testing. You can run the tests using:

```bash
npm run test
```

**Contributing:**

Feel free to contribute to this project by creating pull requests with your improvements or bug fixes.

**License:**

This project is licensed under the ISC License.
