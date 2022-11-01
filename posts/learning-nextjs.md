---
title: "Next.js 시작하기"
date: "2022-10-27"
description: ""
# thumbnailUrl: "/posts/thumbnail/evolution-of-http.png"
tags: ["nextjs"]
---

## 목차

---

## Next.js 개념과 사용하는 이유

Next.js는 React 기반 서버 사이드 렌더링 프레임워크이다.
React를 사용하여 UI를 구축한 다음 Next.js 기능을 점진적으로 채택하여 라우팅, 데이터 가져오기, 통합과 같은 일반적인 애플리케이션 요구 사항을 해결하는 동시에 개발자 및 최종 사용자 경험을 개선할 수 있다.

### Next.js 작동 방식

- Javascript 및 CSS 파일은 프로덕션을 위해 자동으로 축소됨
- 번들링
- 코드 분할 지원
  - 코드 분할은 애플리케이션 번들을 각 진입점에 필요한 더 작은 청크로 분할하는 프로세스이다. 해당 페이지를 실행하는 데 필요한 코드만 로드하여 애플리케이션의 초기 로드 시간을 개선하는 것이 코드 분할의 목표이다.
- Pre-rendering

  - SSR 및 SSG는 결과가 클라이언트로 전송되기 전에 외부 데이터를 가져오고 React 구성 요소를 HTML로 변환하기 때문에 사전 렌더링이라 한다.
  - Next.js는 기본적으로 모든 페이지를 미리 렌더링한다. 즉, HTML이 Javascript로 수행되는 대신 서버에서 미리 생성됨을 의미한다.

- SSR
  - HTML이 각 요청에 대해 서버에서 생성된다. 그런 다음 페이지 인터렉션을 위한 생성된 HTML, JSON 데이터, 자바스크립트가 클라이언트로 전송된다.
  - hydration
    -

React는 CSR

### 프로젝트 세팅

#### spec

- Package managing : npm
- Language : typescript
- Library : React
- Framework : Next.js

간편하게 `Next.js` 초기 설정이 다 된 모듈을 다운로드 해서 사용하겠다.

```bash
$ npx create-next-app <프로젝트명> <옵션 값>
$ npx create-next-app next-blog --typescript
```

프로젝트 실행 명령은 프로젝트 root 경로에서 개발할 때는 `npm run dev`를 입력하고, 운영할 때는 `npm run start`를 입력하면 된다.
