pipeline {
    agent any

    environment {
        IMAGE_NAME = 'ec2-node-deployer'
        CONTAINER_NAME = 'ec2-node-deployer-container'
        DOCKER_REGISTRY = 'yusufdocker234'
        PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:yusufekoanggoro/ec2-node-deployer.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:latest ."
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                        sh "docker push $DOCKER_REGISTRY/$IMAGE_NAME:latest"
                    }
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh "docker stop $CONTAINER_NAME || true"
                    sh "docker rm $CONTAINER_NAME || true"
                    sh "docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $DOCKER_REGISTRY/$IMAGE_NAME:latest"
                }
            }
        }
    }
}
