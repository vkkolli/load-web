pipeline {
  environment {
    registry = '192.100.0.24:32000/loadboard-web'
    IMAGE = "$registry:$env.BUILD_ID"
    kubeDeployTemplate = 'deployment.yaml'
    kubeDeploy = 'deployment-k8.yaml'
  }
  agent {
    kubernetes {
      label 'loadboard-angular-builder'  // all your pods will be named with this prefix, followed by a unique id
      idleMinutes 5  // how long the pod will live after no jobs have run on it
      yamlFile 'jenkins-slave-pod.yaml'  // path to the pod definition relative to the root of our project
      // define a default container if more than a few stages use it, will default to jnlp container
      defaultContainer 'dind'
    }
  }

  stages {
    stage('Building image') {
      steps {
        sh "docker build -t $IMAGE ."
      }
    }
    stage('Deploy Image') {
      steps {
        sh "docker tag $IMAGE $IMAGE"
        sh "docker push $IMAGE"
        sh "docker tag $IMAGE $registry:latest"
        sh "docker push $registry:latest"
      }
    }
    stage('Remove Unused docker image') {
      steps {
        sh "docker rmi $IMAGE"
      }
    }
    stage('Prepare Kubernetes Deployment') {
      steps {
        sh "sed 's|\$IMAGE|$IMAGE|' $kubeDeployTemplate > $kubeDeploy"
      }
    }
    stage('Deploy to Kubernetes') {
      steps {
        script {
          kubernetesDeploy configs: kubeDeploy, kubeconfigId: 'Kube-Config'
        }
      }
    }
  }
}
