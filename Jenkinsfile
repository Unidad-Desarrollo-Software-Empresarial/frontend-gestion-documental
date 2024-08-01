pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = "docker-compose.yaml"
        CREDENTIALS_ID = ""
        REPO_URL = "https://github.com/Unidad-Desarrollo-Software-Empresarial/frontend-gestion-documental.git"
    }

    stages {
        stage('Checkout'){
            steps {
                checkout([$class: 'GitSCM',
                            branches: [[name: '*/prod']],
                            doGenerateSubmoduleConfigurations: false,
                            extensions: [],
                            submoduleCfg: [],
                            userRemoteConfigs: [[url: "${REPO_URL}"]]
                        ])
            }
        }

        stage('Diagnose'){
            steps {
                sh 'echo $PATH'
                sh 'which git'
                sh 'docker -v'
            }
        }

        stage('Build'){
            steps{
                echo "Starting docker compose build"
                sh "docker compose build"
                echo "Ending docker compose build"
            }
        }

        stage('Deploy'){
            steps{
                echo "Starting deploy"
                sh "docker compose up -d"
            }
        }

    }
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Deployment Aprehenser was successful!'
        }
        failure {
            echo 'Deployment failed'
        }
    }
}