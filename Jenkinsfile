pipeline {  
    agent any

    environment {
            timestamp = "${System.currentTimeMillis() / 1000L}"
        }

    stages {

        stage('Prepare') {
            steps {
                script {
                    // Get the ID of the sbb:latest image
                    def oldImageId = sh(script: "docker images fe_taelim:latest -q", returnStdout: true).trim()
                    env.oldImageId = oldImageId
                }

                git branch: 'distribution',
                    url: 'https://github.com/ckd0523/taelim-front.git'
            }

            post {
                success {
                    sh 'echo "Successfully Cloned Repository"'
                }
                failure {
                    sh 'echo "Fail Cloned Repository"'
                }
            }
        }

        stage('Docker Build') {  
            steps {  
                sh 'docker build --no-cache -t fe_taelim:${timestamp} .'
            }  
        }

        stage('Run Docker Container') {
            steps {
                script {
                    // Check if the container is already running
                    def isRunning = sh(script: "docker ps -q -f name=fe_taelim", returnStdout: true).trim()

                    if (isRunning) {
                        sh "docker rm -f fe_taelim"
                    }

                    // Run the new container
                    try {
                        sh """
                        docker run \
                          --name=fe_taelim \
                          -p 80:80 \
                          -p 443:443 \
                          -v /docker_projects/fe_taelim/volumes/gen:/gen \
                          -v /etc/letsencrypt:/etc/letsencrypt \
                          --restart unless-stopped \
                          --network app \
                          -e TZ=Asia/Seoul \
                          -d \
                          fe_taelim:${timestamp}
                        """
                    } catch (Exception e) {
                        // If the container failed to run, remove it and the image
                        isRunning = sh(script: "docker ps -q -f name=fe_taelim", returnStdout: true).trim()

                        if (isRunning) {
                            sh "docker rm -f fe_taelim"
                        }

                        def imageExists = sh(script: "docker images -q fe_taelim:${timestamp}", returnStdout: true).trim()

                        if (imageExists) {
                            sh "docker rmi fe_taelim:${timestamp}"
                        }

                        error("Failed to run the Docker container.")
                    }

                    // If there's an existing 'latest' image, remove it
                    def latestExists = sh(script: "docker images -q fe_taelim:latest", returnStdout: true).trim()

                    if (latestExists) {
                        sh "docker rmi fe_taelim:latest"

                        if(!oldImageId.isEmpty()) {
                            sh "docker rmi ${oldImageId}"
                        }
                    }

                    // Tag the new image as 'latest'
                    sh "docker tag fe_taelim:${env.timestamp} fe_taelim:latest"
                }
            }
        }
    }  
}