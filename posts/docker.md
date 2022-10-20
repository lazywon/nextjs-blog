---
title: "Docker 개념과 사용 명령어 알아보기"
date: "2022-10-20"
description: "Docker 넌 누구니?"
# thumbnailUrl: "/posts/thumbnail/evolution-of-http.png"
tags: ["docker"]
---

## 목차

- [Docker란?](#docker란)
  - [Immutable Infrastructure 장점](#immutable-infrastructure-장점)
  - [Docker 이미지와 컨테이너](#docker-이미지와-컨테이너)
- [자주 사용하는 Docker 명령어 정리](#자주-사용하는-docker-명령어-정리)

---

# Docker란?

Docker는 컨테이너 기술을 사용하여 애플리케이션에 필요한 환경을 신속하게 구축하고 테스트 및 배포를 할 수 있게 해주는 플랫폼이다.

Docker는 Immutable Infrastructure를 구현한 프로젝트이다.

**Immutable Infrastructure**는 호스트 OS와 서비스 운영 환경(서버 프로그램, 소스 코드, 컴파일된 바이너리)을 분리하고, 한번 설정한 운영 환경은 변하지 않는다는 개념이다.

즉, 서비스 운영 환경을 이미지로 생성한 뒤 서버에 배포하여 실행하는데, 서비스가 업데이트되면 운영 환경 자체를 변경하지 않고, 이미지를 새로 생성하여 배포하는 것이다.

## Immutable Infrastructure 장점

- 편리한 관리
  - 서비스 운영 환경을 이미지로 생성하여 이미지 자체만 관리하면 된다. 특히, 이미지를 중앙 관리하여 체계적인 배포와 관리가 가능하며 이미지 생성 설정 파일을 버전 관리 시스템을 활용하여 관리할 수 있다.
- 확장
  - 이미지 하나로 서버를 계속 찍어낼 수 있으므로, 클라우드 플랫폼의 Auto Scaling 기능과 연동하여 손쉽게 서비스를 확장할 수 있다.
- 테스트
  - 개발자 PC나 테스트 서버에서 이미지 실행만 하면 서비스 운영 환경과 동일한 환경이 구성되기 때문에 테스트가 쉽다.
- 가벼움
  - 운영체제와 서비스 운영 환경을 분리하여 가볍고 어디서든 실행 가능한 환경을 제공한다.

## Docker 이미지와 컨테이너

Docker는 **이미지**와 **컨테이너**라는 개념이 있다.

베이스 이미지란, 리눅스 배포판의 유저랜드만 설치된 파일을 뜻한다.

> OS는 메모리 사용을 기준으로 커널 공간과 유저 공간으로 나눌 수 있는데, 유저 공간에서 실행되는 실행 파일과 라이브러리를 유저랜드(userland)라고 한다. 리눅스는 커널만으로 부팅할 수 없으며, 부팅에 필요한 최소 실행 파일과 라이브러리 조합을 유저랜드라 할 수 있다. 보통 리눅스 배포판에서 유저랜드는 부팅에 필요한 실행 파일과 라이브러리 그리고 고유의 패키징 시스템을 포함한다.

원한다면 베이스 이미지를 직접 만들 수도 있다.

매번 베이스 이미지에 필요한 프로그램과 라이브러리, 소스를 설치하면 용량이 큰 이미지가 중복되어 생성될 것이라 생각되지만, **Docker 이미지는 베이스 이미지에서 바뀐 부분만 이미지로 생성하고, 실행할 때는 베이스 이미지와 바뀐 부분을 합쳐서 실행**한다.

즉, Docker는 이미지를 통째로 생성하지 않고, 바뀐 부분만 생성한 뒤 부모 이미지를 계속 참조하는 방식으로 동작한다. Docker에서는 이를 **레이어**라고 한다.

`Docker 컨테이너`는 **이미지를 실행한 상태**이다. 이미지로 여러 개의 컨테이너를 만들 수 있다.
운영체제로 보면 이미지는 실행 파일이고 컨테이너는 프로세스다.
Docker는 특정 실행 파일 또는 스크립트를 위한 실행 환경이라 보면 된다.

---

# 자주 사용하는 Docker 명령어 정리

> docker는 항상 *root 권한*으로 실행해야 한다. 따라서 일반 계정으로 접속 시 sudo를 앞에 붙여주어야 한다.

### Docker Hub에서 이미지 검색

```bash
sudo docker search ubuntu
```

### Docker Hub에서 이미지 받기

```bash
sudo docker pull <이미지 이름>:<태그>
sudo docker pull ubuntu:latest
```

### 로컬에 있는 Docker 이미지 목록 확인

```bash
sudo docker images
```

### Docker 이미지를 컨테이너로 생성한 뒤 bash 셸 실행하기

```bash
sudo docker run -i -t --name <컨테이너 이름> <이미지 이름> <실행할 파일> /bin/bash

// ubuntu 이미지를 hello 컨테이너로 생성한 뒤 ubuntu 이미지 안의 /bin/bash 를 실행한다.
sudo docker run -i -t --name hello ubuntu /bin/bash
```

- 이때, 우분투 이미지에서 /bin/bash 실행 파일을 직접 실행했기 때문에 여기서 exit으로 빠져나오면 컨테이너가 정지된다.
- -i(interactive), -t(Pseudo-try) 옵션을 사용하면 실행된 Bash 셸에 입력 및 출력을 할 수 있다.
- -name 옵션으로 컨테이너 이름을 정할 수 있고, 이름을 지정하지 않으면 Docker가 자동으로 이름을 생성하여 지정한다.

### Docker 컨테이너 목록 확인

```bash
sudo docker ps -a
```

- -a 옵션: 정지된 컨테이너까지 모두 출력

### Docker 컨테이너 시작

```bash
sudo docker start <컨테이너 이름 or 컨테이너 ID>
sudo docker start hello
```

### Docker 컨테이너 재시작

```bash
sudo docker restart <컨테이너 이름 or 컨테이너 ID>
```

### 시작한 Docker 컨테이너에 접속하기

```bash
sudo docker attach <컨테이너 이름 or 컨테이너 ID>
```

### 외부에서 컨테이너 내부 셸 실행

```bash
sudo docker exec -it <컨테이너 이름 or 컨테이너 ID> /bin/bash
```

### Docker 컨테이너 정지

```bash
sudo docker stop <컨테이너 이름 or 컨테이너 ID>
```

- `sudo docker ps`를 해보면 컨테이너를 정지했기 때문에 출력되지 않는다.

### Docker 컨테이너 삭제

```bash
sudo docker rm <컨테이너 이름 or 컨테이너 ID>
```

- 컨테이너를 아예 삭제했기 때문에 `sudo docker ps -a`를 해도 출력되지 않는다.

### Docker 이미지 삭제

```bash
sudo docker rmi <이미지 이름 or 이미지 ID>:<태그>
sudo docker rmi ubuntu:latest
```

- `sudo docker rmi ubuntu` 이런식으로 이미지 이름만 지정한다면 태그는 다르지만 ubuntu 이름을 가진 모든 이미지가 삭제된다.
- `sudo docker images`로 확인 가능하다.

---

- 참고
  - 『가장 빨리 만나는 Docker』
