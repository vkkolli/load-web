pipeline {
  environment {
    registry = '192.100.0.24:32000/loadboard-poc'
    dockerImage = ''
    DOCKER_HOME = ''
    dockerTool = 'Docker'
  }
  agent {
    kubernetes {
      label 'loadboard-builder'  // all your pods will be named with this prefix, followed by a unique id
      idleMinutes 5  // how long the pod will live after no jobs have run on it
      yamlFile 'jenkins-slave-pod.yaml'  // path to the pod definition relative to the root of our project
      defaultContainer 'docker'  // define a default container if more than a few stages use it, will default to jnlp container
    }
  }

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
          dockerImage = docker.build registry + ":$env.BUILD_ID"
        }
      }
    }
    stage('Deploy Image') {
      steps {
        script {
          withDockerRegistry(toolName: dockerTool, url: '192.100.0.24:32000') {
            dockerImage.push()
            dockerImage.push('latest')
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      steps {
        sh "docker rmi $registry:$env.BUILD_ID"
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'echo Here!!'
      }
    }
  }
}
