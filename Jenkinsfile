pipeline {
    agent any

    environment {
        IMAGE_NAME = 'ec2-node-deployer'
        CONTAINER_NAME = 'ec2-node-deployer-container'
        DOCKER_REGISTRY = 'yusufdocker234'
        PORT = '3000'

        DOCKER_IMAGE = "${DOCKER_REGISTRY}/${IMAGE_NAME}"
        DOCKER_TAG = "latest"
        DOCKER_FULL_IMAGE = "${DOCKER_IMAGE}:${DOCKER_TAG}"
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
                    dockerImage = docker.build("${DOCKER_FULL_IMAGE}", "--no-cache --pull .")
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo "*** Logging in to Docker Hub ***"'
                        sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin || exit 1'
                    }
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    sh "docker push ${DOCKER_FULL_IMAGE} || exit 1"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    sh "docker pull ${DOCKER_FULL_IMAGE}"
                    sh "docker stop $CONTAINER_NAME || true"
                    sh "docker rm $CONTAINER_NAME || true"
                    sh "docker run -d --name $CONTAINER_NAME -p $PORT:$PORT $DOCKER_FULL_IMAGE || exit 1"
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker rmi ${DOCKER_FULL_IMAGE} || true"
            }
        }
    }

    post {
        success {
            echo 'Deployment berhasil! 🚀'
        }
        failure {
            echo 'Deployment gagal! ❌'
        }
        always {
            sh "docker logout"
        }
    }
}
