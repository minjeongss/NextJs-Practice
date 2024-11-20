# NextJS 분석기 🪂

## 사용하는 이유

### ReactJS VS NextJS

- ReactJS: 사용자가 `라이브러리`를 호출하여 사용
- NextJs: `프레임워크`가 사용자의 코드를 호출하여 사용

### CSR VS SSR

- CSR: Client Side Rendering
  - 페이지 로드 전: 빈 html 존재
- SSR: Server Side Rendering
  - 페이지 로드 전: 표시할 html 존재(모든 컴포넌트와 페이지를 서버에서 우선적으로 렌더링함)

## 설치

- 명령어

```
npm init
npm install react@latest next@latest react-dom@latest
npm run dev
```

- package.json에서 추가적인 설정이 필요한 부분

```
{
  "scripts": {
    "dev": "next dev"
  },
  "license": "MIT",
}
```

## 구조: App Router

```
root/
│
├── app/
│   ├── (home)/
│   │   ├── page.tsx
│   ├── layout.tsx
│   └── not-found.tsx
│
├── component/
│   └── Navigation.tsx
└──
```

## 기능

### Hydration

- 초기 html을 interactive application으로 변경하는 작업

  - 초기: dummy html
  - 로딩 후: react 로드하여 interactive application

- Hydration 적용 과정
  1. server에서 모든 page, component에 대한 dummy html 생성
  2. client에서 dummy html을 우선적으로 보여줌
  3. background에서 프레임워크 초기화
  4. client에서 eventListener를 추가할 component를 `hydrate`하여, component에 대한 js 코드 다운로드
  5. hydrate 완료되면, dummy html 위에 interactive application 입히기 완료!

### Client component VS Server Component

- Client component
  - hydrate가 적용되는 component
  - server에서 render되고, client에서 hydrate가 진행됨
  ```
  "use client"
  ```
- Server Component
  - hydrate가 적용되지 않는 Component
  - server에서 render되고, 끝임!
  - `"use client"`가 적용되지 않는 나머지에 해당

### Layout

- 중첩으로 레이아웃이 설정됨
  ```
  <RootLayout>
    <AboutUsLayout>
  	  <AboutUs />
    </AboutUsLayout>
  </RootLayout>
  ```

### Meta Data

- 사용법

```
export const metadata: Metadata = {
  title: {
    template: "%s | NextJS",
    default: "NextJS",
  },
  description: "The best framewrork!",
};
```

- 중첩되는 것처럼 보이며, 실제론 병합되어 meta data가 header에 표시됨

### Route Group

- 폴더가 url 경로에 영향을 주지 않고, 경로를 구성함

- 사용법
  - (movies)
  ```
  root/
  │
  ├── app/
  │   └── (movies)/ #해당 위치
  │      └── movies/
  │          └── [id]/
  │               └── page.tsx
  │
  ```

### Dynamic Routes

- 동적 데이터에서 경로를 생성하는 경우에 활용됨

- 사용법
  - [id]
  ```
  root/
  │
  ├── app/
  │   └── (movies)/
  │      └── movies/
  │          └── [id]/ #해당 위치
  │               └── page.tsx
  │
  ```

### 병렬적 API 호출

- 방식

  1. Promise.all 사용
  2. Suspense 사용

- 장점
  - 페이지 일부만 로딩 컴포넌트가 대체될 수 있음
