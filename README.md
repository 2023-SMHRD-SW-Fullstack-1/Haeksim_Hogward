# 호그와드
<br>

## 👀 지도API를 활용한 소셜인증 서비스
![메인페이지](https://github.com/2023-SMHRD-SW-Fullstack-1/Haeksim_Hogward/assets/107793363/6cfdf45d-a43b-4be6-afce-4864dcda75bf)
<br>

## 📅 프로젝트 기간
2023-5-27 ~ 2023-6-27 (4주)
<br>

## ⭐ 주요 기능
* 회원가입 및 로그인
* 카카오맵API 를 활용한 동적 지도 구현
* 사용자의 위치에 따른 인증 활성화기능
* 사용자의 인증ㅅ와드
<br>

## 📅 프로젝트 기간
2023-5-27 ~ 2023-6-27 (4주)
<br>

## ⭐ 주요 기능
* 회원가입 및 로그인
* 마이페이지 기능
* 카카오맵API 를 활용한 동적 지도 구현
* 사용자의 위치에 따른 인증 활성화기능
* 사용자의 인증순서에 따른 동적 애니메이션 기능
* 페이징 기법이 적용된 피드 기능
<br>

## ⛏ 기술스택
![015](https://github.com/2023-SMHRD-SW-Fullstack-1/Haeksim_Hogward/assets/107793363/438e311f-eef2-462b-8973-76667e44b22b)
<br>

## ⚙ 시스템 아키텍처

<br>

## 📌 SW유스케이스
![유스케이스](https://github.com/2023-SMHRD-SW-Fullstack-1/Haeksim_Hogward/assets/107793363/012c26b7-d339-4c47-8c21-00e2a6869a62)
<br>

## 📌 ER다이어그램
![013](https://github.com/2023-SMHRD-SW-Fullstack-1/Haeksim_Hogward/assets/107793363/1f001e68-1642-468c-a552-77363eaa1819)
<br>

## 🖥 시연 영상
https://github.com/2023-SMHRD-SW-Fullstack-1/Haeksim_Hogward/assets/107793363/6bd4431e-73f9-4fb7-8d6c-919f3f1a924f
<br>

## 👨‍👩‍👦‍👦 팀원 역할

### * 김혁(팀장)

#### 프로젝트 총괄 - git, git branch 관리

#### D.A/M

- 광주데이터 (구 단위로) 서버에서 가져온 데이터 광주로 필터링 및 데이터 처리
- 다각형 지도 표현하기 위해 TmapAPI 를 이용해 좌표 경계값 데이터 수집 및 전처리
  
#### Front-End

- 애니메이션 발자국지도
  
  - 발자국 지도 컴포넌트화 설계
  - 발바닥 객체 설계 및 기본 animation style 지정
  - 지도 좌표 수집
  - 좌표의 거리에 따라 발자국 생성 로직 구현
  - 다음 좌표 각도에 따라 발자국 객체 회전하는 로직 구현
  - 디자인
  
- 카카오 지도


  - 서버에서 가지고 온 데이터 테마별 필터링하여 지도에 표현하는 기능
  - Swiper를 이용한 슬라이더 구현
  - GeolocationAPI 와 Haversine formula 공식을 이용한 위치기반 인증여부 확인 기능
  - 사용자의 인증여부에 따라 다각형 지도 내부의 밝기가 변하는 기능
  - debounce를 이용한 리사이즈 반응형 설계 및 구현
  - mui/material 을 이용한 이미지 리스트 기능
  - 디자인

- 피드 페이지

  - react-infinite-scroll을 이용한 인피니티 스크롤 페이징 기능 구현
  - DB에 저장과 별개로 성능개선을 위한 임시댓글 로직 구현
  - 랭킹 데이터 연결 및 보완
  - 디자인

#### Back-end

- 페이징 기능 설계, API 기능및 SQL구문 작성
- 댓글 기능 설계 및 API기능 및 DB테이블 설계,구현

---

### * 김대혁

#### Front-End
- 피드 페이지
  - 피드 페이지 기본 틀 구축
  - 피드 페이지 리액트 모달 창 구현
  - 피드 페이지 리엑트 모달 디자인 
  - 피드 랭킹 기본 틀 구축
 
- 마이페이지
  - 마이페이지 기본 틀 구축
  
- 카카오톡 고객센터(채팅하기) API연결 및 구현

---

### * 김다영

#### D.A/M
- 랜드마크 데이터 수집

#### Front-End
- 로그인 기능 구현 
- 회원가입 기능 구현 
- ID, 닉네임 중복확인 기능 구현 
- Header 템플릿 적용
- Footer 구현 

#### 산출문서 작성
#### PPT 작성
#### 발표

---

### * 정다운

#### Front-End
- 메인페이지 및 디자인 작업
- 마이페이지 수정
  
#### Back-end
- 이메일 닉네임 중복체크, 회원가입 로그인 기능
- 마이피드, 유저피드 정보 제공 및 정보 DB저장
- 랜드마크 위치 사진 등 정보 제공
- 랭킹 정보제공
- 회원정보 수정기능
- 랜드마크 데이터 수집 및 DB저장

## 🤾‍♂️ 트러블슈팅
![032](https://github.com/2023-SMHRD-SW-Fullstack-1/Haeksim_Hogward/assets/107793363/bab5aff1-8f27-4ae1-a6e1-63df28c92d6c)



