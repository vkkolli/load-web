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
            steps {
                def DOCKER_PATH = tool name: 'Docker', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
                def DOCKER_HOME = "${DOCKER_PATH}/bin"
                env.PATH = "${DOCKER_HOME}:${env.PATH}"
                def customImage = docker.build("192.100.0.24/loadboard-web:${env.BUILD_ID}")
            }
        }
    }
}
