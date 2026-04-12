pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        TARGET_BRANCH = "${env.BRANCH_NAME ?: 'main'}"
    }

    stages {
        stage('Clone repository') {
            steps {
                deleteDir()
                checkout scm
                sh 'git status --short --branch'
            }
        }

        stage('Build project') {
            steps {
                sh '''
                    set -e
                    rm -rf dist
                    mkdir -p dist
                    cp index.html styles.css script.js dist/
                '''
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Test application') {
            steps {
                sh '''
                    set -e
                    test -f dist/index.html
                    test -f dist/styles.css
                    test -f dist/script.js
                    grep -qi "<title>" dist/index.html
                    grep -qi "Tech Mart" dist/index.html
                '''
            }
        }

        stage('Deploy application') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                    set -e
                    rm -rf deploy
                    mkdir -p deploy
                    cp -r dist/* deploy/
                '''
                archiveArtifacts artifacts: 'deploy/**', fingerprint: true
            }
        }

        stage('Commit and push to GitHub') {
            steps {
                sh '''
                    set -e
                    git config user.name "jenkins-bot"
                    git config user.email "jenkins-bot@local"
                    git add dist deploy

                    if git diff --cached --quiet; then
                        echo "No generated changes to commit."
                        exit 0
                    fi

                    git commit -m "ci: update build and deploy artifacts [skip ci]"
                '''

                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-credentials',
                        usernameVariable: 'GIT_USERNAME',
                        passwordVariable: 'GIT_TOKEN'
                    )
                ]) {
                    sh '''
                        set -e
                        auth_header=$(printf "%s:%s" "$GIT_USERNAME" "$GIT_TOKEN" | base64 | tr -d '\n')
                        git -c http.extraheader="AUTHORIZATION: Basic $auth_header" push origin "HEAD:${TARGET_BRANCH}"
                    '''
                }
            }
        }
    }
}