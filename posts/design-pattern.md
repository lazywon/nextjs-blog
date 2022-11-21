---
title: "디자인 패턴 비교 및 정리"
date: "2022-11-21"
description: "프론트엔드 관점에서의 아키텍처, 디자인 패턴 알아보기"
thumbnailUrl: "/posts/thumbnail/design-pattern.png"
tags: ["design-pattern", "MVC", "MVVM", "FLUX", "redux"]
---

## 목차

---

# 들어가며..

사용하고 있기도 하면서 자주 들어본 아키텍처에 대해 정리해보려고 한다. 막상 설명해보라고 하면 한마디도.. 하지 못할것 같아서 이번 기회에 정리해 본다.
그 중에서도 웹 프론트엔드 관점에서 사용되는 아키텍처 패턴의 종류에 대해 알아보자.

아키텍처는 프로그램을 잘 설계하여 만들고 유지보수 하는 비용을 최소화하는 목표를 갖는다. 좋은 아키텍처는 개발을 편리하게 하고, 코드 가독성을 좋게 하며, 유지 보수가 쉽도록 도와준다. 소프트웨어 관점에서 지속적으로 관리가 잘 되는 코드를 위해서는 좋은 아키텍처가 필요하다. 그러기 위해 웹에서도 좋은 아키텍처의 모습이 지속적으로 진화하고 있다.

> 아키텍처와 디자인 패턴 용어가 헷갈리는데, 아키텍처는 더 큰 뼈대를 말하고 디자인 패턴은 코드 수준에서의 설계를 담당하는 것이라고 보면 된다.

# MVC 아키텍처

Model, View, Controller로 이루어진 고전적인 아키텍처이다.

- Model
  - 어플리케이션에서 사용되는 데이터와 그 데이터를 처리하는 부분
- View
  - 사용자에게 보여지는 UI 부분
- Controller
  - 사용자 입력(Acrion)을 받아 처리하는 부분
  - Model의 데이터를 받아서 화면에 그리고, 화면으로 부터 사용자의 동작을 받아서 Model을 변경한다. 이러한 Model과 View사이의 중간 역할을 하는 것

웹 서비스 초창기 시절 MVC는 데이터베이스를 Model로 취급하고, HTML과 CSS, JS를 포함한 클라이언트 영역을 View로, 가운데서 라우터를 통해 데이터를 처리하고 새로운 HTML을 만들어 보여주는 백엔드 영역을 Controller라고 취급했다.

이후 jQuery가 등장하며, ajax로부터 받는 데이터를 Model로 취급하고, HTML과 CSS로 만드어지는 화면을 View로, JS가 중간에서 서버의 데이터를 받아 화면을 바꾸고 이벤트를 처리해서 서버에 데이터를 전달하는 Controller의 역할을 수행하게 되었다. 즉, 기존의 서버 라우터에서 하던 어떤 역할들이 이제 클라이언트의 자바스크립트가 처리하게 되었고 Database는 백엔드의 역할이며 REST API의 ajax 데이터가 Model이 된다.
이 시절 Controller의 가장 주요한 역할을 했던 게 바로 jQuery이다.

# MVVM 아키텍처

그 다음으로 나온 아키텍처로, Model, View, ViewModel로 구성되어 있으며 Model과 View는 다른 패턴과 동일하다.

- ViewModel
  - View를 그리는 Model만 다루게 되었다는 의미로, 상태와 연산 View의 실제 논리 및 데이터 흐름을 담당
  - 상태 데이터를 변경하면 즉시 View에 반영된다.

서버에서 개발을 할 때에는 html이 전체적으로 렌더링으로 되다보니 `{{ }}, <?= ?>, <%= %>` 와 같은 치환자로 통해 선언적으로 편하게 개발을 하는 반면, jQuery의 경우 수정해야 할 부분을 일일히 찾아서 수정을 해줘야 했다.

> 선언적 프로그래밍이란, 코드로 로직을 만들지 않고 약속된 선언을 바탕으로 해서 자동으로 필요한 코딩을 하는 거라고 생각하면 된다.

Model이 변하면 View를 수정하고 View에서 이벤트를 받아서 Model를 변경한다는 Controller의 역할은 그대로 인데 이를 구현하는 방식이 jQuery와 같은 DOM 조작에서, 템플릿과 바인딩을 통한 선언적인 방법으로 변하게 되었다.

그렇게 클라이언트 개발도 서버처럼 템플릿과 같이 선언적인 방식으로 개발 할 수 있도록 나온 것이 지금의 Angular, React, Vue 등 이다.

즉, MVC에서 MVVM으로 바뀌면서 컨트롤러의 반복적인 기능이 선언적인 방식으로 개선되었고, Model과 View의 관점을 분리하려 하지 않고 하나의 템플릿으로 관리하려는 방식으로 발전했다. 이러한 변화는 기존 class나 id와 같이 간접적으로 HTML에 접근 해야하는 불편함을 해소 해주었다.

# Container-Presenter 아키텍처

웹 서비스가 발전하면서 하나의 페이지 단위가 아닌, 페이지 안에 여러가지 모듈이 있고, 여러 화면들이 하나의 화면에서 구성이 될 수 있도록 발전하게 되었다.
즉, 화면단위가 아닌, 더 작게 재사용 할 수 있는 단위로 만들어 조립을 하는 방식인 *Component 패턴*으로 발전하게 되었다.

컴포넌트는 재사용이 가능해야 한다는 원칙에 따라 가급적 비즈니스 로직을 포함시키지 않으려고 했다.

따라서 비즈니스 로직을 관장하고 있는 컴포넌트를 Container 컴포넌트라 하고, 비즈니스 로직을 갖고 있지 않은 데이터만 뿌려주는 형태의 컴포넌트를 Presenter 컴포넌트로 분리하여 최상단에 Container를 두고, 비즈니스 로직을 관리하는 Container-Presenter 아키텍처가 만들어졌다.

## Props Drilling Problem

컴포넌트 구조가 복잡해짐에 따라 상위의 데이터를 하위의 props로 보내기 위해 중간 계층의 props를 하나씩 추가하는 문제를 `Props Drilling Problem`이라 한다.
쉽게 말해 가장 하위 컴포넌트에 데이터를 보내주기 위해 다른 컴포넌트들이 불필요하게 Props를 가지고 있어야 한다는 것이다.

위 아키텍처로 구현 시 Props Drilling Problem이 발생하게 되었다.

# FLUX 아키텍처

Props Drilling 문제를 해결하기 위해 페이스북에서 발표한 단방향 아키텍처인 FLUX 패턴이 생겨났다.

페이스북에서 MVC의 문제점으로, 컴포넌트의 재사용과 독립성을 지나치게 강조하다보니 같은 데이터를 공유하는 과정에서 props를 통해 데이터를 전달하는 문제들로 하여금 Model의 관리가 파편화 되는 문제를 지적하였다.

> 복잡하지 않은 어플리케이션에서는 양방향 데이터 흐름이 문제가 크지 않을 수 있다. 하지만 어플리케이션이 복잡해 진다면 이런 양방향 데이터 흐름은 새로운 기능이 추가 될 때에 시스템의 복잡도를 기하급수적으로 증가 시키고, 예측 불가능한 코드를 만들게 된다. 개발자가 만든 어플리케이션이 개발자도 예측 못할 버그들을 쏟아 내게 된다.

FLUX 패턴은 기존의 컴포넌트를 지향하는 MVC가 아닌, View를 하나의 범주로 두고 View에서 Action을 호출하면 Dispatcher를 통해 Store라는 공간에 Data가 보관이 되고 다시 뷰로 전달되는 흐름이다.

- Dispatcher
  - 모든 데이터 흐름을 관리하는 중앙 허브 역할 담당
  - Action이 발생되면 Dispatcher는 전달된 Action을 확인하고 등록된 콜백함수를 실행하여 Store로 전달
- Store
  - 어플리케이션의 모든 상태변경은 Store에서 결정된다.
  - Dispatcher로부터 수신받기 위해서는 Dispatcher에 콜백 함수를 등록해야 한다. Store가 변경되면 View에 변경되었다는 사실을 알려주게 된다.
- View
  - 화면에 나타내는 것 뿐만 아니라, 자식 View로 데이터를 흘러 보내는 View 컨트롤러의 역할도 한다.
- Action
  - Dispatcher에서 콜백 함수가 실행 되면 Store가 업데이트 되게 되는데, 이 콜백 함수를 실행 할 때 데이터가 담겨 있는 객체가 인수로 전달 되어야 한다. 이 전달 되는 객체를 Action이라고 하는데, Action은 대채로 액션 생성자(Action creator)에서 만들어진다.

## Redux

이후 FLUX 패턴을 이용한 구현체인 Redux가 탄생하게 되었다. 기존의 Props Drilling 문제를 정확하게 짚어주었고, Store, Dispatch, Reducer에 대한 개념을 정확하게 정리해 주었다.

FLUX 패턴은 각 프레임워크 진영에게 많은 영감을 주었으며 프레임워크와 더불어 본격적인 상태관리 라이브러리들이 만들어지기 시작하게 되었다.
Redux, Vuex 등이 대표적인 상태관리 라이브러리이다.

## FLUX 패턴의 한계

간단한 구조에서는 Props Drilling Problem이 치명적이지 않았고 상태를 관리하기 위해서 Action, Dispatch, Reducer를 만들고 관리하는데 들어가는 많은 부수적인 코드들로 인해 관리가 되려 어려워 진다는 문제가 있었다.

# React-Query

React-Query는 상태관리에 편향되어 있던 시각에서 벗어나 고전적인 ajax 데이터를 Model로 간주한다.
서버와의 fetch 영역을 Model로 간주하며, View는 React, Controller는 query와 mutations이라는 2가지 인터페이스를 통해 서버 데이터의 상태를 관리하고 캐싱, 동기화, refetch 등을 관리해주는 역할을 하도록 하여 기존의 복잡성을 덜어주었다.

---

- 참고
  - [프론트엔드 아키텍처의 가장 최근 트렌드는?](https://yozm.wishket.com/magazine/detail/1663/)
  - [프론트엔드에서 MV\* 아키텍쳐란 무엇인가요?](https://velog.io/@teo/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90%EC%84%9C-MV-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94)
  - [Flux로의 카툰 안내서](https://bestalign.github.io/translation/cartoon-guide-to-flux/)