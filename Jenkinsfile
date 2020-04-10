pipeline {
  environment {
    registry = '192.100.0.24:32000/loadboard-poc'
    dockerImage = ''
    DOCKER_HOME = ''
    dockerTool = 'Docker'
  }
  agent  any

  stages {
    stage('Cloning Git') {
      steps {
        git 'https://cjpeter@bitbucket.org/CEI_CJ/loadboard-web.git'
      }
    }
    stage ('Setup Docker') {
      steps {
        script {
          DOCKER_HOME = tool(name: dockerTool, type: 'org.jenkinsci.plugins.docker.commons.tools.DockerTool')
          echo DOCKER_HOME
          env.PATH = "$DOCKER_HOME/bin:$env.PATH"
          echo env.PATH
        }
      }
    }
    stage('Building image') {
      steps {
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps {
        script {
          withDockerRegistry(toolName: dockerTool, url: '192.100.0.24:32000') {
            dockerImage.push()
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps {
        sh "docker rmi $registry:$BUILD_NUMBER"
      }
    }
  }
}
