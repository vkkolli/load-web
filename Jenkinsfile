pipeline {
    agent any

    stages {
        stage('Setup') {
            steps {
                nodejs('Node') {
                    sh 'ng build --prod'
                }
            }
        }
    }
}
