pipeline {
    environment {
        registry = '192.100.0.24:32000/loadboard-poc'
        dockerImage = ''
        DOCKER_HOME = ''
    }
    agent  any

    stages {
        stage('Build Angular') {
            steps {
                script {
                    DOCKER_HOME = tool name: 'Docker', type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool'
                    echo DOCKER_HOME
                    env.PATH = "$DOCKER_HOME/bin:$env.PATH"
                    echo env.PATH
                    dockerImage = docker.build("$registry:$BUILD_ID")
                    withDockerRegistry(toolName: 'Docker', url: '192.100.0.24:32000') {
                        dockerImage.push()
                    }
                }
            }
        }
    }
}
