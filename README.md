# Remote Code Executor

The Remote Code Executor is a web-based application designed to let users write, compile, and execute code in multiple programming languages directly from their browsers. This tool provides an interactive, efficient, and accessible platform for coding, testing, and collaboration, with AI assistance for guidance.
## Features

- **Multi-Language Support**:  
  Supports various programming languages, including Python, JavaScript, C++, and Java. Each language runs in an isolated environment, ensuring security and reliability in execution.

- **Multi-File System**:  
  Users can create, manage, and execute projects that include multiple files, allowing for complex, multi-file applications to be developed within the platform. This feature is ideal for building modular codebases or applications with interdependent files.

- **Security**:  
  The platform prioritizes security by using sandboxing and containerization to isolate code execution environments, reducing the risks associated with running untrusted code. Additionally, rate limiting, input validation, and logging mechanisms are implemented to prevent misuse and enhance safety.

- **Collaborative Coding**:  
  Real-time collaboration enables multiple users to work on code together seamlessly, with features like shared cursors, live updates, and version history. This makes it easier for teams to work together, learn, and debug efficiently.

- **AI Assistant**:  
  An integrated chatbot powered by **Gemini AI** provides on-demand assistance with coding, debugging, and general programming questions. The AI assistant offers contextual help to improve productivity and guide users through coding challenges.


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
2. Navigate to the `client` directory and run `npm install` to install the client's dependencies.
   ```
   cd client
   ```
   ```
   npm install
   ```
3. Run `npm start` to start the client. It will be available at http://localhost:3000.
   ```
   npm start
   ```
4. Navigate to the `server` directory and run `npm install` to install the server's dependencies.
   ```
   cd server
   ```
   ```
   npm install
   ```
5. Build the Docker images
    
    ```bash
      cd Dockerfiles
    ```
    
    ```bash
      sudo docker build -t java:v1 ./java 
    ```
    ```bash
      sudo docker build -t cpp:v1 ./cpp 
    ```
    ```bash
      sudo docker build -t py:v1 ./python 
    ```
6. Run `node server.js` to start the server.
    ```
   node server.js
    ```

## Screenshots
![Screenshot 1](https://ibb.co/YfY6GYk)
![Screenshot 2](https://ibb.co/rFxXSLf)
![Screenshot 3](https://ibb.co/WnZLr13)
![Screenshot 4](https://ibb.co/X2DXG09)
![Screenshot 5](https://ibb.co/m59dmZb)
![Screenshot 6](https://ibb.co/0G0dhj8)
![Screenshot 7](https://ibb.co/6HxSpMN)
![Screenshot 8](https://ibb.co/P9QXLKj)
![Screenshot 9](https://ibb.co/vDyjsgp)


## Contributing

Contributions are welcome. Please make sure to update tests as appropriate.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
