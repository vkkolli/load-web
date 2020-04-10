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
            tools {
                Docker 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
            }
            environment {
                dockerImage = docker.build("192.100.0.24/loadboard-web:$BUILD_ID")
            }
            steps {
                sh "Docker Image: ${dockerImage}"
                sh "echo $PATH"
            }
        }
    }
}
