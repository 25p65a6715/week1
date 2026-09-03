pipeline {
    agent any

    stages {
        stage('Checkout Source') {
            steps {
                // Jenkins automatically pulls the Git repo when using "Pipeline from SCM"
                checkout scm
            }
        }
        stage('Execute Script') {
            steps {
                // Runs your Python file just like your freestyle execution shell did
                sh 'python3 file.py'
            }
        }
    }
}
