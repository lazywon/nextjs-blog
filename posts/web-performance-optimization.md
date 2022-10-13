---
title: "웹 성능 최적화 방안에 대해"
date: "2022-10-06"
description: "성능 최적화 방안에 대해 정리해 보자 !"
thumbnailUrl: "/posts/thumbnail/web-performance-optimization.jpg"
tags: ["성능최적화", "렌더링 최적화", "로딩 최적화"]
---

## 성능 최적화란 ?

성능최적화를 **로딩 최적화**와 **렌더링 최적화**로 구분할 수 있다.

> 성능 최적화 = 로딩 최적화 + 렌더링 최적화

웹 애플리케이션에서 성능 개선점을 찾기 위해서는 브라우저 로딩 과정을 이해해야 한다.

#

로딩, 렌더링 과정을 종합적으로 최적화 하면 웹 성능을 평가하는 핵심적인 웹 지표`(LCP,FID,CLS)` 수치를 개선할 수 있다.

#### Core Web Vitals

- **LCP(Largest Contentful Paint)**
  - 페이지가 얼마나 빨리 로딩되는지 측정한다. 화면을 가장 많이 차지하는 콘텐츠가 로딩되는 시점을 측정한다.
- **FID(First Input Delay)**
  - 응답성을 측정한다. 링크를 누르는 등, 사용자가 페이지와 처음 상호작용할 때 얼마나 시간이 걸리는지 측정한다.
- **CLS(Cumulative Layout Shift)**
  - 시각적 안정성을 측정한다. 페이지가 로딩되면서 이미지나 텍스트 위치가 바뀌는 정도를 의미한다. 의도치 않게 페이지 구성 요소 위치가 바뀐다면 CLS가 증가한다.

#### 렌더링 관련 지표

사용자 기준의 성능을 측정하는 지표이다.

- **FP(First Paint)**
  - 흰 화면에서 화면에 무언가가 처음으로 그려지기 시작하는 순간
- **FCP(First Contentful Paint)**
  - 텍스트나 이미지가 출력되기 시작하는 순간
- **FMP(First Meaningful Paint)**
  - 사용자에게 의미있는 콘텐츠가 그려지기 시작하는 첫 순간. 콘텐츠를 노출하는데 필요한 CSS, JS 로드가 시작되고 스타일이 적용되어 주요 콘텐츠를 읽을 수 있다.
  - 가장 중요한 시점으로, 로딩이 끝날 때까지 흰 화면 대신 의미있는 콘텐츠를 먼저 보여주어 사용자에게 긍정적인 인상을 줄 수 있다. 따라서, 사용자 기준에서 성능을 좋게 하기 위해 FMP를 앞당겨야 한다.
- **TTI(Time To Interactive)**
  - 자바스크립트 초기 실행이 완료되어 사용자가 직접 행동을 취할 수 있는 순간

#

### 성능 측정 도구 🛠

- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [PageSpeed Insights](https://pagespeed.web.dev/?utm_source=psi&utm_medium=redirect&hl=ko)

#

## 렌더링 최적화

`렌더링 차단 리소스`란 브라우저의 렌더링을 막는 소스들로 일반적으로 **css와 js 파일**을 말한다. (_모든 css와 js가 렌더링 차단 리소스인 것은 아니다._)

웹 페이지 렌더링 최적화 목표는 **리플로우를 최대한 적게 발생시키면서, 빠르게 화면을 그리는 것**이다.

#

### CSS 최적화

#### Reflow, Repaint를 고려한 스타일 작성하기

- Reflow
  - **JavaScript > Style > Layout > Paint > Composite** 순으로 브라우저가 그려진다.
  * 이때, 레이아웃의 넓이, 높이, 위치 등에 영향을 주는 css 속성을 변경할 경우 **Layout**부터 다시 그려지게 된다. 이를 **리플로우** 또는 **레이아웃**이라고 한다.
- Repaint
  - 레이아웃에 영향을 주지 않는 속성을 변경하면 레이아웃을 건너뛰고 페인트 작업부터 다시 수행하게 되는데 이를 **리페인트**라고 한다.

* 리플로우가 일어나면 브라우저가 전체 픽셀을 다시 계산하기 때문에 **되도록 리페인트 속성을 사용해 스타일을 작성하는 것이 성능 면에서 좋다**.
* Reflow를 발생시키는 속성
  ```plain
  position / width / height / margin / padding / display / top / left / right / bottom / box-sizing / background-color / border-color / text-align / border / border-width / font-family / float / font-size / font-weight / line-height / vertical-align / white-space / word-wrap / text-overflow / text-shadow ...
  ```
* Repaint를 발생시키는 속성
  ```plain
  color / border-style / visibility / background / background-image / background-position / background-repeat / background-size / text-decoration / outline / outline-style / outline-color / outline-width / border-radius / box-shadow ...
  ```
* Reflow와 Repaint를 발생시키지 않는 속성
  ```plain
  opacity / transform / cursor / z-index ...
  ```
* [레이아웃과 리페인트 발생시키는 CSS 속성 목록](https://docs.google.com/spreadsheets/u/0/d/1Hvi0nu2wG3oQ51XRHtMv-A_ZlidnwUYwgQsPQUg1R2s/pub?single=true&gid=0&output=html)

#### 사용하지 않는 css 제거하기

- css는 렌더링 차단 리소스이기 때문에 사용하지 않는 css는 제거하는 것이 좋다.
- `Unused css`는 **구글 크롬 라이트하우스**를 통해 확인할 수 있다.

#### 간결한 스타일 작성하기

- css가 복잡하고 방대할 수록 레이아웃을 그리는 데에 시간이 많이 소요된다. 복잡한 셀렉터 사용은 지양하고, 선택자를 간결하게 사용하여 특이성을 낮게 유지하는 것이 좋다.
  ```css
  /* 🔺 */
  .container .item {
    ...;
  }
  /* ✅ */
  .item {
    ...;
  }
  ```

#

### HTML 최적화

#### 인라인 스타일을 사용하지 않는다.

- HTML 요소에 style을 통해 인라인 스타일을 작성하면 불필요한 코드 중복이 발생하기 쉽다.
- 인라인 스타일은 웹 페이지가 그려지면서 레이아웃에 영향을 미치면서 추가로 리플로우를 발생시킨다.

#### 복잡한 DOM 트리 지양하기

- DOM 트리가 깊고, 자식 요소가 많을수록 DOM 트리는 커지고, 이에 따라 DOM 변경 시 계산해야하는 것이 많아진다.
- 불필요하게 감싼 요소는 제거하자.

### 애니메이션 최적화

한 프레임 처리가 **16ms(60fps)내로 완료**되어야 렌더링 시 끊기는 현상 없이 자연스러운 렌더링을 만들어낼 수 있다.
자바스크립트 실행 시간은 10ms 이내에 수행되어야 레이아웃, 페인트 등 과정을 포함했을 때 16ms 이내에 프레임이 완료될 수 있다.

#### requestAnimationFrame() 사용하기

- requestAnimationFrame API를 사용하면 브라우저 프레임 속도(보통 60fps)에 맞추어 애니메이션을 실행할 수 있도록 해준다. setInterval, setTimeout과 달리 프레임 시작할 때 호출되기 때문에 일정한 간격으로 애니메이션을 수행할 수 있는 장점이 있으며, 현재 페이지가 보이지 않을 때는 콜백함수가 호출되지 않기 때문에 불필요한 동작을 하지 않는다.

#### CSS 애니메이션 사용하기

- 애니메이션 구현 시 자바스크립트 api, 라이브러리를 사용하는 것보다는 css를 통해 구현하는 것이 성능면에서 좋다.
- `transform`은 리플로우와 리페인트 모두 발생시키지 않고 합성만 발생시키는 속성이다. 때문에 애니메이션에서 사용 시 렌더링 속도를 향상시킬 수 있다.
- position 설정 시 `absolute`나 `fixed`로 설정하면 주변 레이아웃에 영향을 주지 않는다.

#

### Javascript 최적화

#### 강제 동기 레이아웃과 레이아웃 스래싱(thrashing) 피하기

- 레이아웃 단계가 완료되기 전에 요소의 위치나 크기를 변경한 후 바로 가져오려고 하면, 강제로 레이아웃이 발생한다. 이것을 `강제 동기 레이아웃` 이라고 한다.
- 이 레이아웃을 반복적으로 발생시키는 것을 `레이아웃 스레싱`이라고 한다.

#

## 로딩 최적화

### 렌더 블로킹 최적화

최적화의 첫 번 째 단계는 **블록 리소스를 최적화하는 것**이다.

#

#### CSS 최적화

- CSS파일 최상단 `<head>` 태그 아래에 불러오기

  - 렌더 트리를 구성하기 위해서는 DOM 트리와 CSSOM 트리가 필요하다. DOM 트리는 파싱 중에 태그를 발견할 때마다 순차적으로 구성할 수 있지만, CSSOM 트리는 CSS를 모두 해석해야 구성할 수 있다. 따라서, CSSOM 트리가 구성되지 않으면 렌더 트리를 만들지 못하고 렌더링이 차단된다. 이러한 이유로, 렌더링이 차단되지 않도록 **CSS는 항상 HTML 문서 최상단 (`<head>` 아래)에 배치하는 것이 좋다.**

- CSS 미디어 쿼리 사용하기

  - 특정 조건에서만 필요한 CSS 파일이 있을 경우, 해당 스타일을 사용하는 경우에만 로드할 수 있도록 `media` 속성을 명시하여 사용한다. 반응형 웹 제작시 유용하게 사용할 수 있다.

  ```html
  <link href="style.css" rel="stylesheet" />
  <link href="print.css" rel="stylesheet" media="print" />
  <link href="portrait.css" rel="stylesheet" media="orientation:portrait" />
  <link
    href="style.css"
    rel="stylesheet"
    media="(min-width:320px) and (max-width:768px)"
  />
  ```

- 외부 스타일시트를 가져올 때 사용하는 `@import` 사용은 피하기
  - `@import`를 사용했을 때 브라우저는 스타일시트를 병렬로 다운로드 할 수 없기 때문에 로드 시간이 늘어날 수 있다.

#

#### JavaScript 최적화

- 자바스크립트는 HTML 문서 최하단 (`</body>` 직전)에 배치한다.
  - 자바스크립트는 DOM 트리와 CSSOM 트리를 동적으로 변경할 수 있기 때문에 HTML 파싱을 차단하는 블록 리소스이다.
  - `<script>` 태그를 만나면 스크립트가 실행되며 그 이전까지 생성된 DOM에만 접근할 수 있다. 그리고 스크립트 실행이 완료될 때까지 DOM 트리 생성이 중단된다.
  - 외부에서 가져오는 자바스크립트의 경우 모든 스크립트가 다운로드되고 실행될 때까지 DOM 트리 생성이 중단된다.
- defer, async 속성 사용하기

  - `<head>` 아래에 포함되어 있거나 HTML 내부에 `<script>` 태그가 포함되어 있을 때도 HTML 파싱을 멈추지 않게 할 수 있는 방법이다.
  - `<script>` 태그에 defer나 async 속성을 명시하면 스크립트가 DOM 트리와 CSSOM 트리를 변경하지 않겠다는 의미이기 때문에 브라우저가 파싱을 멈추지 않는다.

    - `async`는 다운로드 후 즉시 실행한다. 빨리 실행되어야 할 때 사용하면 된다.
    - `defer`는 웹페이지가 모두 그려지고 DOM이 들어왔을 때 스크립트를 실행한다. 마지막에 파싱해도 상관없을 때 사용하면 된다.

    ```html
    <!-- 병렬 다운로드 & 즉시실행 -->
    <script async src="test.js"></script>

    <!-- 병렬 다운로드 & 지연실행 -->
    <script defer src="test.js"></script>
    ```

  - 단, 이 속성들은 브라우저 지원 범위가 한정적이므로 사용에 유의해야한다.

#

### 이미지 최적화

#### picture 태그 사용하기

- picture나 source 요소는 화면에 출력되는 요소가 아니다.
- `<picture>` 태그의 `type` 속성을 통해 사용자 환경에 맞는 이미지를 제공할 수 있다.
  - webp - IE 미지원, jpg/png 대비 30 ~ 70% 수준의 용량
  - avif - 크롬/삼성인터넷 지원, 저용량이면서 고품질
- 만약 브라우저가 avif를 지원하면 avif를 사용하고, 그렇지 않은 경우 webp를 사용하고, 둘 다 지원하지 않을 경우 jpg/png 이미지를 사용한다.
  ```html
  <picture>
    <source srcset="sample.avif" type="image/avif" />
    <source srcset="sample.webp" type="image/webp" />
    <img src="sample.jpg" alt />
  </picture>
  ```
- `media` 속성을 사용해서 브라우저 사이즈에 맞는 이미지를 제공할 수 있다. 즉, 해상도에 따라 출력할 이미지를 지정할 수 있다.
  ```html
  <picture>
    <source srcset="sample.webp" media="(max-width: 760px)" />
    <!-- 브라우저의 넓이가 760px 이하일때 sample.webp 이미지 출력-->
    <img src="pc.webp" alt />
  </picture>
  ```

#### `<img>` 지연로딩 활용하기

- `loading` 속성을 사용해서 이미지를 브라우저 화면에 지연/병렬 로딩할 수 있다.
- 사용 가능한 값으로 auto, lazy, eager가 있다.
  - auto: default 값. `loading` 속성을 쓰지 않은 것과 같다.
  - lazy: 화면상에 보이는 부분만 먼저 출력하고 화면 바깥쪽 이미지들은 로딩하지 않는다. 사용자가 화면을 위로 올리면 아래쪽에 있던 이미지가 올라오면서 로딩된다.
  - eager: 화면 위치에 상관없이 페이지가 로딩되자마자 이미지를 로드한다.
    ```html
    <img src="sample.jpg" loading="lazy" alt />
    ```

#### 스프라이트 이미지 사용하기

- 여러개 이미지를 하나의 이미지로 만들어 css의 background-position 속성을 사용하여 부분적으로 이미지를 사용하는 방법이다.
- 이미지 파일 개수 자체를 줄여 리소스 요청 개수를 줄일 수 있다.

#

### 웹팩(Webpack) 사용

- 모듈 번들러 웹팩을 사용하여 css와 js 파일을 **번들링**하여(하나의 파일로 묶어) 리소스 요청을 줄일 수 있다.

#

### CDN 사용

- CDN(Content Delivery Network)은 유저에게 많은 콘텐처를 손실없이 빠르게 전달하는 서비스이다.
- 대용량 콘텐츠 다운 또는 스트리밍 등에 사용한다.
- 사용한 만큼 비용을 지불한다.

#

### 캐싱

- 사용자가 요청하는 html, css, js, image등 첫 요청 시에 내려받은 뒤 특정 위치에 복사본을 저장하고, 이후 동일한 URI의 리소스 요청이 왔을 때 이전에 저장해둔 파일을 사용해서 더 빠르게 로딩하도록 한다.
- 브라우저가 다운로드할 파일 개수 자체를 줄이므로 시간적 측면에서 이득이 크다.

---

- 참고
  - [[최적화] 웹 성능 최적화 방법 5분 완성](https://velog.io/@hsecode/%EC%B5%9C%EC%A0%81%ED%99%94-%EC%9B%B9-%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94-%EB%B0%A9%EB%B2%95-5%EB%B6%84-%EC%99%84%EC%84%B1)
  * [성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE#%EC%84%B1%EB%8A%A5-%EC%B5%9C%EC%A0%81%ED%99%94)
