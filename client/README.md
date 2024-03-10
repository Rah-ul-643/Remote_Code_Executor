# Remote Code Executor

This project is a web-based application that allows users to write, compile, and execute code in various programming languages. It also includes an AI bot assistant powered by Gemini AI.

## Demo
[Insert Demo Link]

## Authors
- [Rahul](https://github.com/Rah-ul-643)
- [Ankesh](https://github.com/Ankesh2004)
- [Harshdeep](https://github.com/Harshjerry) 

## Features

- **Implemented Code Santization**
- For each code run request, a separate Docker container is created which limits the interference with the host machine.
- The parameters like Time taken to run the code and Total memory used have been limited, allowing efficient management of resources.
- The code execution happens asynchronously, allowing the server to handle multiple requests at the same time.

## Prerequisites
- Docker
  ```
  curl -fsSL https://get.docker.com -o get-docker.sh
  ```
  ```
  sudo sh get-docker.sh
  ```

## Project Structure

### Client

The client is a React application that provides the user interface for the code editor and chat feature. It uses the Ace Editor for code editing and Styled Components for styling.

The client's source code is located in the `client/src` directory. The main entry point is `App.js`. The `components` directory contains the React components for the code editor and chat box. The `services` directory contains the API calls to the server.

### Server

The server is a Node.js application that handles compiling and executing the code, as well as managing the chat feature. It uses Express for routing and Socket.IO for real-time communication.

The server's source code is located in the `server` directory. The main entry point is `server.js`. The `controllers` directory contains the logic for handling requests. The `routes` directory contains the routes for the API. The `chatroom` directory contains the logic for the chat feature.

## Getting Started

To run the project locally, you need to have Node.js and npm installed.

1. Clone the repository.
   ```
   git clone https://github.com/Rah-ul-643/Remote_Code_Executor
   ```
3. Navigate to the `client` directory and run `npm install` to install the client's dependencies.
   ```
   cd client
   ```
   ```
   npm install
   ```
5. Run `npm start` to start the client. It will be available at http://localhost:3000.
   ```
   npm start
   ```
7. Navigate to the `server` directory and run `npm install` to install the server's dependencies.
   ```
   cd server
   ```
   ```
   npm install
   ```
9. Run `node server.js` to start the server.
    ```
   node server.js
    ```

## Screenshots
[Insert Screenshots]

## Demo Video
## Contributing

Contributions are welcome. Please make sure to update tests as appropriate.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


