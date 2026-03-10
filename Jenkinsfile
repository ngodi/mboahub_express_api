pipeline {
    agent any

    environment {
        AWS_REGION     = 'eu-north-1'
        ECR_REPO       = 'mboahub-api'
        AWS_ACCOUNT_ID = credentials('AWS_ACCOUNT_ID')
        IMAGE          = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:latest"
    }

    triggers {
        // Trigger on push to main (requires GitHub webhook pointing to Jenkins)
        githubPush()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Configure AWS') {
            steps {
                withCredentials([
                    string(credentialsId: 'AWS_ACCESS_KEY_ID',     variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                        aws configure set aws_access_key_id     $AWS_ACCESS_KEY_ID
                        aws configure set aws_secret_access_key $AWS_SECRET_ACCESS_KEY
                        aws configure set default.region        $AWS_REGION
                    '''
                }
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region $AWS_REGION \
                    | docker login --username AWS --password-stdin \
                      ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                '''
            }
        }

        stage('Build & Push Image') {
            steps {
                sh '''
                    docker build -t $IMAGE .
                    docker push $IMAGE
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([
                    string(credentialsId: 'EC2_HOST',    variable: 'EC2_HOST'),
                    string(credentialsId: 'EC2_USER',    variable: 'EC2_USER'),
                    sshUserPrivateKey(
                        credentialsId: 'EC2_SSH_KEY',
                        keyFileVariable: 'SSH_KEY_FILE'
                    )
                ]) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no -i $SSH_KEY_FILE $EC2_USER@$EC2_HOST "
                            IMAGE=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO}:latest
                            cd ~/mboahub
                            docker pull \$IMAGE
                            docker-compose down
                            docker-compose up -d
                        "
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed — check logs above.'
        }
    }
}