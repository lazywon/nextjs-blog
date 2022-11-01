---
title: "Web 서버"
date: "2022-10-31"
description: ""
# thumbnailUrl: "/posts/thumbnail/evolution-of-http.png"
tags: ["nginx", "apache"]
---

## 목차

---

## 들어가며..

apache 웹서버 에서 nginx 웹서버로 변경하면서 둘의 차이점과 장단점에 대해 궁금해졌다. 또한 flask를 함께 연동하고 있는데 관련하여 파이썬 프로세스 처리 동작 방식이 어떤식으로 되는지 구체적으로 알아보고 싶었다.
배포 작업 시 L4의 분리 없이도 웹서버 reload 명령 만으로 수정된 소스코드 반영이 어떻게 가능한건지 확실히 파헤쳐 보고자 한다.

그러기 전에 기존에 사용하던 Apache 웹 서버와 Nginx 웹서버에 대해 확실히 알아가 보자.

## Web Server의 종류

### Apache

### Nginx

### 사용자가 거치는 경로

> DNS -> L4 -> 방화벽 -> Nginx -> gunicorn -> flask

### nginx와 gunicorn 간 통신 방식

서버에 최초 도달 시 요청은 nginx가 받으며, static 파일에 대한 요청은 nginx가 처리한다.

그 외의 요청은 Unix Socket을 통해 웹서버로 proxy되어 gunicorn이 받게 된다.

해당 요청을 gunicorn master가 받고, 돌고 있는 worker(프로세스) 중 하나에 할당한 후, python 코드를 실행한다.
gunicorn worker type은 I/O가 많은 작업에 적합한 `gevent`로 설정하였다. 관련 웹 애플리케이션에서 DB 통신과 I/O 작업이 대부분이기 때문에 선택하였다. 다른 옵션으로 worker type `sync`가 있는데, 이는 동기적으로 threads 옵션의 수만큼 thread에 작업을 할당하는 방법이다. 이 옵션은 CPU 사용이 많은 작업에 적합하다.

현재 구조상 nginx와 gunicorn은 완전히 독립된 프로그램으로 서로 영향을 끼치는 것 없이 request와 response만 주고받는다.

nginx와 gunicorn 모두 reload 사용 가능하여, 기존에 서버 L4 분리 후 apache restart 했던 것과 달리, nginx 설정 변경이나 python 소스 코드 변경 후 L4 분리 필요 없이 그냥 reload만 하면 된다.
