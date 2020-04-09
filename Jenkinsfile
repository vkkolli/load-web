pipeline {
    agent { any }
    stages {
        stage('Setup') {
            steps {
                nodejs('Node') {
                    ng build --prod
                }
            }
        }
    }
}
