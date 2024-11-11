# 소리마을 포팅 매뉴얼

## 목차

1. [환경 설정](#1-환경-설정)
- [기술 스택](#기술-스택)
- [외부 서비스](#외부-서비스)

2. [빌드 및 배포](#2-빌드-및-배포)
- [환경 변수 설정](#환경-변수-설정)
- [빌드](#빌드)
- [배포](#배포)

## 1. 환경 설정

### 기술 스택

- 이슈 관리: Jira
- 형상 관리: Gitlab
- 빌드/배포 관리: Jenkins
- 커뮤니케이션: Mattermost, Notion, Discord
- 디자인: Figma
- 개발 환경
  - IDE
    - Visual Studio Code 1.85.1
    - IntelliJ IDEA 2023.3.2 (Community Edition)
  - 서버
    - AWS EC2
      - Ubuntu 20.04.6 LTS
      - Nginx 1.18.0
      - OpenSSL 1.1.1f
      - Jenkins 2.448
    - AWS S3 Bucket
    - GPU server
      - Ubuntu 20.04.4 LTS
      - Device: NVIDIA Corporation GV100GL (Tesla V100 PCle 32GB)
  - Front-End
    - React 18.2.0
    - Redux 5.0.1
    - Tailwind CSS 3.4.1
    - Node.js 20.10.0
  - Back-End
    - Java 17 (Azul Zulu version 17.0.9)
    - Spring boot 3.2.3
    - MySQL 8.0.35
    - Redis 7.2.4
  - AI
    - Python 3.9.13
    - CUDA Toolkit 11.7.1
    - Anaconda 4.10.3

### 외부 서비스

- Kakao OAuth: [Kakao developers](https://developers.kakao.com/)
- Google OAuth: [Google Cloud](https://console.cloud.google.com/)
- AWS S3 Bucket: [AWS S3](https://s3.console.aws.amazon.com/)

## 2. 빌드 및 배포

### 환경 변수 설정

- Front/.env

  ```
  VITE_API_URL={Base URL}
  VITE_S3_URL={AWS S3 Bucket URL}
  ```

- Back/src/main/resources/application.yml

  - Base

    ```yml
    server:
      port : {port number}
      servlet :
        context-path: {base endpoint}
    ```

  - MySQL

    ```yml
    spring:
      datasource:
      url: {MySQL server URL}
      driver-class-name: com.mysql.cj.jdbc.Driver
      username: {MySQL username}
      password: {MySQL password}
      pool-name: Hikari Connection Pool
      # hikariCP property setting
      maximum-pool-size: 10
      connection-timeout: 5000
      connection-init-sql: SELECT 1
      idle-timeout: 600000
      max-lifetime: 1800000
      auto-commit: true
    ```

  - Redis

    ```yml
    jwt:
      redis:
        host: {host}
        port: {Redis port}
        password: {Redis password}
    ```

  - JWT

    ```yml
    jwt:
      token:
        secret-key: {key} 
      access-token:
        expire-length: 1800000
      refresh-token:
        expire-length: 1209600000
    ```

  - OAuth

    ```yml
    spring:
      security:
        oauth2:
          client:
            registration:
              kakao:
                client-id: {Kakao API key}
                client-authentication-method: POST
                client-secret: {Kakao API secret}
                redirect-uri: {BASE_URL}/login-callback/kakao
                authorization-grant-type: authorization_code
                client_name: kakao
              google:
                client-id: {Google API key}
                client-secret: {Google API secret}
                redirect-uri: {Base URL}/login-callback/google
              provider:
                kakao:
                  authorization-uri: https://kauth.kakao.com/oauth/authorize
                  token-uri: https://kauth.kakao.com/oauth/token
                  user-info-uri: https://kapi.kakao.com/v2/user/me
                  user-name-attribute: id
    ```

  - Swagger

    ```yml
    springdoc:
      packages-to-scan: com.usagi.sorimaeul.api.controller
      swagger-ui:
        path: /api-docs
        groups-order: DESC
        tags-sorter: alpha
        operations-sorter: alpha
        disabled-swagger-default-url: true
        display-request-duration: true
      api-docs:
        path: /api-docs/json
        groups:
          enabled: true
      show-actuator: true
      cache:
        disabled: true
      default-consumes-media-type: application/json;charset=UTF-8
      default-produces-media-type: application/json;charset=UTF-8
    ```

  - S3 Bucket

    ```yml
    cloud:
      aws:
        s3:
          bucket: {AWS S3 Bucket URL}
        region:
          static: {AWS S3 Bucket region}
        credentials:
          access-key: {AWS S3 Bucket key}
          secret-key: {AWS S3 Bucket secert}
        stack:
          auto: false
    ```
    
  - Loggin level

    ```yml
    logging:
      level:
        root: info
        org:
          springframework:
            root: debug
            web: debug
        com:
          sorimaeul: debug
        zaxxer:
          hikari:
            pool:
              HikariPool: debug
    ```

  - File Upload

    ```yml
    file:
      multipart:
        maxUploadSize: 1000000
        maxUploadSizePerFile: 1000000
    ```



- ai/rvcmodel/.env

  ```env
  BASE_URL={Base URL}
  S3_URL={AWS S3 Bucket URL}
  ```

### 빌드

- Front-End

  ```bash
  $ npm install
  $ npm run build
  ```

- Back-End

  ```bash
  $ chmod +x ./gradlew
  $ ./gradlew clean build
  ```

- AI

  - Pre-trained Model 준비 ([Hugging Face space](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main))

    - Aria2c 설치

      ```bash
      $ sudo apt install aria2
      ```

    - 모델 다운로드

      ```bash
      $ sh ./ai/rvcmodel/tools/dlmodels.sh
      ```

      - 이후 tools 폴더 내에 생성된 파일들을 각 위치로 이동
        - `ai/rvcmodel/assets/hubert/hubert_base.pt`
        - `ai/rvcmodel/assets/pretrained`
        - `ai/rvcmodel/assets/uvr5_weights`

    - `ai/rvcmodel/assets/rmvpe` 폴더에 RMVPE 피치 추출 파일 다운로드 ([rmvpe.pt](https://huggingface.co/lj1995/VoiceConversionWebUI/blob/main/rmvpe.pt))

  - ffmpeg 설치

    ```bash
    $ sudo apt install ffmpeg
    ```

  - 가상 환경 설정

    - 모델 학습 환경 (train)

      ```bash
      $ conda create -n train python=3.9
      $ conda activate train
      $ pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117
      $ pip install -r requirements-train.txt
      $ conda deactivate
      ```

    - 음성 추론 환경 (infer)

      ```bash
      $ conda create -n infer python=3.9
      $ conda activate infer
      $ pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117
      $ pip install -r requirements-infer.txt
      $ conda deactivate
      ```

    - 더빙 영상 인코딩 환경 (encode)

      ```bash
      $ conda create -n encode python=3.9
      $ conda activate encode
      $ pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117
      $ pip install -r requirements-encode.txt
      $ conda deactivate
      ```

### 배포

- Nginx 설정
  ```conf
  server {
      listen 80;
      server_name {Base URL};
      return 301 https://$host$request_uri;
  }

  server {
      listen 443 ssl;

      server_name {Base URL};

      ssl_certificate /etc/letsencrypt/live/{Base URL}/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/{Base URL}/privkey.pem;


      access_log   /var/log/nginx/access.log;
      error_log    /var/log/nginx/error.log;

      location /api {
          proxy_pass http://localhost:8000;
          proxy_set_header Connection '';
          proxy_http_version 1.1;
      }

      location /api/sse {
          proxy_pass http://localhost:8000;
          proxy_set_header Connection '';
          proxy_set_header Cache-Control 'no-cache';
          proxy_set_header X-Accel-Buffering 'no';
          proxy_set_header Content-Type 'text/event-stream';
          proxy_buffering off;
          chunked_transfer_encoding on;
          proxy_read_timeout 3600s;
      }

      location / {
          proxy_pass http://localhost:3000;
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_set_header Connection '';
          proxy_http_version 1.1;
      }

      location /create-dubbing {
          proxy_pass http://localhost:7864;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_set_header Connection '';
          proxy_http_version 1.1;
      }
  }
  ```

- Front-End

  - CI/CD : Jenkins pipeline

    ```shell
    pipeline {
        agent any
        stages {
            stage('Git Clone') {
                steps {
                    git branch: 'front', url: <git url>, credentialsId: <credential>
                }
            }
            stage('Setup Environment Variables') {
                steps {
                    dir("./Front") {
                        sh """
                        echo "<VARIABLE_KEY>=${env.VARIABLE_KEY}" > .env  # init
                        echo "<VARIABLE_KEY>=${env.VARIABLE_KEY}" >> .env  # add
                        """
                    }
                }
            }
            stage('FE-build') {
                steps {
                    dir("./Front") {
                        nodejs(nodeJSInstallationName: 'MyNode') {
                            sh '''
                            npm install
                            npm run build
                            '''
                        }
                    }
                }
            }
            stage('Compression') {
                steps {
                    dir("./Front") {
                        sh '''
                        rm -rf node_modules
                        rm package-lock.json
                        tar -cvf build.tar dist
                        '''
                    }
                }
            }
            stage('Deploy') {
                steps {
                    sshagent(credentials: ['aws_key']) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no <aws host> uptime
                            scp <tar file path> <aws host>:<path>
                            ssh -t <aws host> ./deployFE.sh
                        '''
                    }
                }
            }
        } 
    }
    ```

  - Shell Script

    ```shell
    fpid=$(pgrep -f dist)
    if [ -n "${fpid}" ]
    then
            kill -15 ${fpid}
            echo kill process ${fpid}
    else
            echo no process
    fi

    sleep 3

    rm -rf <project path>/dist
    tar -xvf <project path>/build.tar -C <project path>
    nohup serve -s <project path>/dist -l <port> >> application-FE.log 2> /dev/null &
    ```

- Back-End

  - CI/CD : Jenkins pipeline

    ```shell
    pipeline {
      agent any
      tools {
          gradle 'MyGradle'
      }
      stages {
          stage('Git Clone') {
              steps {
                  git branch: 'back', url: <git url>, credentialsId: <credential>
              }
          }
          stage('BE-Build') {
              steps {
                  dir("./Back") {
                      // gradlew 파일에 실행 권한 부여
                      sh 'chmod +x ./gradlew'
                      sh "./gradlew clean build"
                  }
              }
          }
          stage('Deploy') {
              steps {
                  sshagent(credentials: ['aws_key']) {
                      sh '''
                          ssh -o StrictHostKeyChecking=no <aws host> uptime
                          scp <jar file path> <aws host>:<path>
                          ssh -t <aws host> ./deployBE.sh
                      '''
                  }
              }
          }
      }
    }
    ```

  - Shell Script

    ```shell
    #!/bin/bash

    # 프로세스 종료 함수
    stop_process() {
        pid=$(pgrep -f SNAPSHOT)
        if [ -n "${pid}" ]; then
            echo "Stopping process ${pid}..."
            if kill -15 ${pid}; then
                echo "Process ${pid} successfully stopped."
            else
                echo "Failed to stop process ${pid}."
                exit 1  # 종료
            fi
        else
            echo "No process to stop."
        fi
    }

    # 프로세스 종료
    stop_process

    # 프로세스 종료 확인
    while true; do
        pid=$(pgrep -f SNAPSHOT)
        if [ -z "${pid}" ]; then
            echo "Process stopped. Starting jar file..."
            chmod +x <jar file path>
            nohup java -jar <jar file path> --jasypt.encryptor.password=<password> >> applicationBE.log 2>&1 /dev/null &
            break
        else
            echo "Process still running, PID: ${pid}. Waiting..."
            sleep 5
        fi
    done
    ```

- AI

  - train

    ```bash
    $ conda activate train
    $ nohup python train-model.py >> train-model.log 2>&1 &
    $ conda deactivate
    ```

  - infer

    ```bash
    $ conda activate infer
    $ nohup python infer-cover.py >> infer-cover.log 2>&1 &
    $ nohup python infer-dubbing.py >> infer-dubbing.log 2>&1 &
    $ conda deactivate
    ```

  - encode

    ```bash
    $ conda activate encode
    $ nohup python encode-dubbing.py >> encode-dubbing.log 2>&1 &
    $ conda deactivate
    ```
