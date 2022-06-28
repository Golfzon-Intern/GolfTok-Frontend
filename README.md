# golftok

|피드|프로필|업로드|인기키워드|검색결과|
|:---:|:---:|:---:|:---:|:---:|
| <img width="200" alt="image1" src="https://user-images.githubusercontent.com/61102301/176063885-84d932c9-f55f-441c-bda4-c35fc6a242cd.png"> | <img width="200" alt="image2" src="https://user-images.githubusercontent.com/61102301/176063893-71dabce6-d537-497c-b6c5-a36e4f2c3402.png"> | <img width="200" alt="image3" src="https://user-images.githubusercontent.com/61102301/176064635-99c3384b-f526-4a09-9f74-3604033e04b3.png"> | <img width="200" alt="image4" src="https://user-images.githubusercontent.com/61102301/176063897-c958feb8-5a8c-473a-940e-dc96c025557f.png"> | <img width="200" alt="image5" src="https://user-images.githubusercontent.com/61102301/176063900-52b38961-8134-4fc4-8fa8-6e1a5ab1d4fc.png"> |

<br>

## ⛳️ Purpose

- MZ 세대를 겨냥한 골프 서비스 만들기

<br>

## 💡 About

### Subject

- 골프 관련 short-form video 공유 앱

### Features

1. <b>User (회원 관리)</b>

    - VueX 사용하여 로그인 데이터를 전역적으로 관리하였습니다.

2. <b>Feed (피드)</b>

    - 영상이 일정 비율 이상 보이면 자동 재생, 그렇지 않으면 일시 정지 되도록 했습니다.
    - 무한 스크롤링 되도록 구현했습니다.

3. <b>Post (게시물)</b>

    - 좋아요 기능
      - 한 프로필이 게시글마다 한 번의 좋아요를 할 수 있도록 했습니다.
      - 이미 좋아요를 한 상태에서 다시 버튼을 누를 경우, 좋아요가 취소되도록 했습니다.
      - 게시글의 전체 좋아요 수를 표시했습니다.
    - 댓글 기능
      - 게시글에 댓글을 남길 수 있으며, 댓글마다 답글(대댓글)을 남길 수 있도록 했습니다.
      - 특정 댓글의 답글 버튼을 누를 경우, 입력창에 특정 댓글의 사용자 아이디가 나오도록 했습니다.
      <br>(ex. reply to @joie-kim)
      - 댓글에도 좋아요를 할 수 있도록 했습니다.
      - 댓글 작성자만 댓글을 삭제할 수 있도록 했습니다.
    - 해시태그 기능
      - 작성 완료된 게시글 또는 작성 중인 게시글에서 평문과 해시태그가 구분될 수 있도록 해시태그를 하이라이팅 하였습니다.
      - 작성 완료된 게시글에서 해시태그를 누르면 해당 키워드로 검색이 된 결과를 보여주도록 하였습니다.

4. <b>Responsive Design (반응형 디자인)</b>

    - `media query`를 사용해 웹과 모바일 해상도에 모두 맞는 화면을 구현했습니다.

<br>

## 🧑‍💻 Skills

### Programming

- Vue.js
- HTML
- CSS

<br>

## 🚗 How to run

- 로컬에서 구동시키고 싶다면 아래와 같이 하세요.

```bash
# Install the dependancies
npm install

# Start the project
npm start
```
