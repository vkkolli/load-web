pipeline {
    agent any

    stages {
        stage('Build Angular') {
            steps {
                nodejs('Node') {
                    sh 'npm install'
                    sh 'ng build --prod'
                }
            }
        }
        stage('Build Docker Image') {
            environment {
                DOCKER_PATH = tool name: 'Docker', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
                DOCKER_HOME = "$DOCKER_PATH/bin"
                PATH = "$DOCKER_HOME:$PATH"
                // dockerImage = docker.build("192.100.0.24/loadboard-web:$BUILD_ID")
            }
            steps {
                sh "Docker Image: ${dockerImage}"
            }
        }
    }
}
