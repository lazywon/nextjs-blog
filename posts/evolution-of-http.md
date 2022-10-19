---
title: "HTTP 버전 별 특징 파헤치기"
date: "2022-10-18"
description: "HTTP의 변천사와 버전 별 특징에 대해 본격적으로 알아보기 😎"
thumbnailUrl: "/posts/thumbnail/evolution-of-http.png"
tags: ["http", "http/0.9", "http/1.0", "http/1.1", "http/2"]
---

## 목차

- [HTTP란?](#http란)
  - [HTTP(HyperText Transfer Protocol Version)](#httphypertext-transfer-protocol-version)
- [HTTP 변천사](#http-변천사)
  - [HTTP/0.9](#http09)
  - [HTTP/1.0](#http10)
  - [HTTP/1.1](#http11)
  - [HTTP/2](#http2)
    - [HTTP/1.1의 단점](#http11의-단점)
  - [이미지로 HTTP 통신 과정 비교하기](#이미지로-http-통신-과정-비교하기)

---

# HTTP란?

## HTTP(HyperText Transfer Protocol Version)

TCP 연결 기반 위에서 동작하는 프로토콜이다. 다시말해, 웹에서 클라이언트(브라우저)가 웹 서버(httpd, nginx, apache ..)정보를 주고받을 수 있는 프로토콜이다.

---

# HTTP 변천사

## HTTP/0.9

One-Line Protocol로 불리는 HTTP/0.9는 통신에 필요한 최소한의 기능만 갖추어, 실제 데이터의 전송만을 위해 사용되었다.

초기에는 버전 번호가 없는 상태로 발표되었으나, 이후 다른 버전들과 구분하기 위해 0.9 버전을 붙이게 되었다.

0.9 버전은 **단일 라인으로 구성**되었으며, **GET 메서드만 존재**했다.

어떤 데이터를 요청한다는 본문을 보내면 요청한 메시지에 대한 결과를 본문에 담아 응답하는 형태로, 에러가 발생했을 경우에도 응답 메시지의 본문에 에러를 적어 보냈다.
서버에 연결되면 프로토콜, 서버, 포트는 불필요해지기 때문에 아래와 같이 아주 단순한 형태를 띄었다.

```json
// 요청
GET /mypage.html

// 응답
<HTML>
A very simple HTML page
</HTML>
```

- HTTP/0.9 특징
  - 클라이언트-서버, 요청-응답 프로토콜
  - TCP/IP 통해 실행되는 ASCII 프로토콜
  - 하이퍼 텍스트 문서(HTML)을 전송하도록 설계되어, 다른 유형은 전송 불가하다.
  - 서버와 클라이언트 간 연결은 모든 요청 후에 닫힌다.
  * 상태, 오류코드가 없기 때문에 에러 발생한 경우 해당 파일 내부에 에러를 적어 보낸다.

## HTTP/1.0

매우 제한적이었던 HTTP/0.9에서 브라우저와 서버 모두 좀 더 융통성을 갖도록 빠르게 확장되었다.

이때부터 **Header**가 생겼다. 헤더는 해당 메시지 정보를 담고 있는 역할로, 헤더만 읽어도 해당 메시지의 개괄적인 의미를 파악할 수 있다.

`버전 정보`(HTTP/1.0)와 `상태코드`(200 OK), 문서의 타입인 `Content-Type`(text/html)을 통해 메시지가 정상적으로 데이터를 받아왔는지, 지금 받은 문서의 타입은 어떤 것인지 등을 확인하고 이에 대응할 수 있게 되었다.

```json
// 요청
GET /mypage.html HTTP/1.0
User-Agent: NCSA_Mosaic/2.0 (Windows 3.1)

// 응답
200 OK
Date: Tue, 15 Nov 1994 08:12:31 GMT
Server: CERN/3.0 libwww/2.17
Content-Type: text/html
<HTML>
A page with an image
  <IMG SRC="/myimage.gif">
</HTML>
```

HTTP-WG는 HTTP/1.0 구현의 일반적인 사용을 문서화한 [RFC 1945](https://www.rfc-editor.org/rfc/rfc1945)를 발표하였다.

- HTTP/1.0 특징
  - 버전 정보를 명시하기 시작했다.
  - 상태코드가 응답 첫 줄에 포함되어 브라우저가 요청에 대한 성공/실패를 바로 확인할 수 있다.
  - POST, HEAD가 추가되었다.
  - 요청과 응답에 Header 개념이 추가되면서 Content-Type을 이용하여 HTML 문서 외에 다른 유형의 문서들을 전송할 수 있게 되었다.

하지만, 1.0은 공식적인 표준은 아니었다.

## HTTP1.1

여러 개선사항과 업데이트가 표준에 통합되어 [RFC 2616](https://www.rfc-editor.org/rfc/rfc2616)으로 출시 되었다.

큰 맥락은 1.0과 동일하되 **일부 모호했던 기능들이 개선되며 진정한 표준으로 자리매김**하게 되었다.

당시 1.0버전에서는 모든 요청마다 새로운 연결을 맺어야 했다. 요청하는 컴퓨터와 응답하는 컴퓨터가 데이터를 통신하기 위해 연결을 하고 요청과 응답을 한 번씩 주고받고 나면 그 연결을 끊고 다시 새 연결을 하는 식이었다.(Short-lived connections)

문제는 **동일한 컴퓨터 사이에서 여러 개의 콘텐츠를 요청할 때에도 매 번 새 연결을 맺어야 했다는 점**이다.
특히 한 번 연결을 할 때마다 TCP에선 3-way-handshake가 이루어졌다. 한 번의 3-way-handshake만으로도 시간을 어느 정도 잡아먹는데, 데이터를 여러 번 주고받느라 몇 번을 반복하다 보니 속도가 눈에 띄게 느려지게 된 것이다. 초창기 웹에서는 이용하는 콘텐츠가 적어 큰 문제가 되지 않았지만 웹이 고도화되면서 불편함은 더욱 커졌다.

HTTP/1.1에서는 각 요청마다 TCP 연결을 반복했던 1.0과 달리 **한 번 TCP 연결을 맺으면 끊지 않고 계속 유지할 수 있게** 했다.(persistent connection) 이로써 반복되는 3-way-handshake를 단 한 번으로 줄여 메모리 자원을 절약하고 성능을 개선할 수 있게 되었다.

또한, 1.0에서는 이전 요청에 대한 응답이 도착해야만 다음 요청을 보낼 수 있었기에 앞선 요청에 대한 응답이 늦거나 돌아오지 않으면 뒤의 요청들은 막연히 기다려야만 하는 문제가 있었다. 1.1에서는 이전 응답과 상관없이 **한 번에 여러 개의 요청을 보낼 수 있도록 하여 통신 속도를 더욱 높였다**.(pipelining)

![](/posts/evolution-of-http/connection-comparison.png)

```json
// 요청
GET /en-US/docs/Glossary/Simple_header HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header

// 응답
200 OK
Connection: Keep-Alive
Content-Encoding: gzip
Content-Type: text/html; charset=utf-8
Date: Wed, 20 Jul 2016 10:55:30 GMT
Etag: "547fa7e369ef56031dd3bff2ace9fc0832eb251a"
Keep-Alive: timeout=5, max=1000
Last-Modified: Tue, 19 Jul 2016 00:59:33 GMT
Server: Apache
Transfer-Encoding: chunked
Vary: Cookie, Accept-Encoding
```

- HTTP/1.1 특징
  - connection 재사용이 가능해졌다.
  - pipelining 추가로, 이전 요청에 대한 응답이 완전히 전송되기 전에 다음 요청 전송을 가능케 하여, 통신 대기 시간을 낮추었다.
  - 청크된 응답을 지원한다.
  - 캐시 제어 메커니즘 도입
  - 언어, 인코딩, 타입 등을 포함한 contents를 전송하여, 가장 적합한 컨텐츠를 교환할 수 있게 되었다.
  - Header의 Host를 통해 동일 IP 주소에 다른 도메인을 호스트하는 기능이 서버 코로케이션(서버를 외부의 IDC에 맡겨서 위탁 관리하는 형태)을 가능케 했다.

## HTTP/2

2010년 전반기에 Google에서 SPDY 프로토콜을 구현하였다. 스피디 프로토콜은 **HTTP/1.1의 성능 제한을 해결**하고 **웹 페이지 로드 지연 시간을 줄이기 위해** 만들어졌다.

SPDY를 기반으로 HTTP/1.1의 단점을 개선한 HTTP/2가 탄생되었다. 한마디로, HTTP/2는 `성능, 속도 개선`을 목적으로 만들어졌다.

### HTTP/1.1의 단점

HTTP/1.1의 경우 서로 간의 연결은 계속 유지되었으나, 그 안에서는 아직도 **하나의 요청은 하나의 응답이라는 1:1 대응**을 이루고 있었다.

- RTT(Round Trip Time) 증가
  - RTT란, 요청(SYN)을 보낼 때부터 요청에 대한 응답(SYN + ACK)을 받을 때까지의 왕복 시간을 의마한다.
  - 매번 요청 별로 Connection을 만들고 TCP 상에서 동작하는 HTTP 특성상 3-Way-Handshake가 반복적으로 일어나며, 불필요한 RTT 증가와 네트워크 지연을 초래하여 성능을 저하시킬 수 있다.

또한 요청이 들어간 순서로 처리되어, 이전 요청 시간이 길어질 경우 이후 요청들도 덩달아 지연되는 문제가 있었다.

- HOL(Head Of Line) Blocking
  - HTTP/1.1의 Pipelining은 한 커넥션에 순차적인 여러 요청을 연속적으로 하고, 그 순서에 맞춰 응답을 받는 방식으로 지연 시간을 줄였지만, 순차적으로 응답을 받다보니 이전에 받은 응답이 길어지면 그 이후의 응답들은 지연된다.

이러한 문제를 해결하기 위해 HTTP/2에서는 이전 요청에 대한 응답을 대기하지 않고 이후 응답을 받을 수 있도록 **모든 요청과 응답을 병렬적으로 처리**하였다.

또한, **한 번의 요청만으로 여러 개의 응답을 받을 수(Multiplexed Streams)** 있었고, **클라이언트가 요청하지 않아도 서버에서 미리 필요한 리소스들을 푸시(Server Push)하는** 등 더 높은 성능과 빠른 속도를 보장할 수 있게 되었다.

이것을 가능케 한 기능이 바로 `Binary Framing`이다. 우리가 읽을 수 있는 텍스트 형식이었던 HTTP 메시지를 바이너리 형태로 캡슐화하여 같은 메시지라도 더 크기가 작아지고 효율적으로 전달할 수 있게 된 것이다.

- HTTP/2 특징
  - HTTPS로 작성된 웹 사이트의 경우 항상 TLS 위에서 동작한다.
  - HTTP 중복 헤더 압축
  - 텍스트가 아닌 바이너리 프로토콜을 사용하여 파싱이 더 빠르고, 오류 발생 가능성을 낮췄다.
  - 하나의 TCP 연결을 통해 여러 데이터 요청을 병렬로 전송하는 Multiplexed Streams이 가능해졌다.
  - 다른 스트립이 끼어드는 것을 허용하는 Full-duplex interleaving & Prioritization
  - Server Push를 통해 서버는 요청되지 않았지만 향후 요청에서 예상되는 추가 정보를 클라이언트에 전송할 수 있게 되었다.

## 이미지로 HTTP 통신 과정 비교하기

![](/posts/evolution-of-http/http-comparison.png)

---

- 참고
  - [MDN HTTP의 진화](https://developer.mozilla.org/ko/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)
  - [그림으로 쉽게 보는 TCP](https://brunch.co.kr/@swimjiy/39)
