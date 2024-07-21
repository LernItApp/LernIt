# LernIt
LernIt is a simple but effective learning solution for students! It emphaises efficiency and performance when it comes to learning new things, regardless of what you are learning!
Visit the site at: https://lernit.site/

## Docker

### Running with Docker
Before you begin, ensure that you have Docker installed on your system. You can download and install Docker from [here](https://www.docker.com/get-started).

### Building and Running the Docker Container

To build and run the Docker container for this project, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/LernItApp/LernIt.git
    ```

2. Navigate to the project directory:

    ```bash
    cd LernIt
    ```

3. Build the Docker image using the provided Dockerfile:

    ```bash
    docker build -t lernit .
    ```

4. Run the Docker container:

    ```docker
    docker run -p 3000:3000 lernit
    ```

    This command will start the container and map port 3000 from the container to port 3000 on your host machine, allowing you to access the application in your web browser at http://localhost:3000.

## How to Contribute
Contributions to this project are welcome and encouraged! Please make an issue on GitHub so we can discuss your contribution before you make a pull request.

# License
This project is licensed under the [MIT License](LICENSE.txt).
