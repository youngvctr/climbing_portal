const express = require('express'); // 프레임워크
// const path = require('path') // 파일/폴더/디렉터리 등의 경로 처리
//const MySQLStore = require('express-mysql-session') // 로그인, 인증처리 모듈 => mySQLStore에 저장
const bodyParser = require('body-parser'); // POST request data의 body로부터 파라미터를 편리하게 추출
const cookieParser = require('cookie-parser'); // 쿠키 헤더 구문 분석 및 req.cookies에 키값이 쿠키이름인 object를 채워줌.

const routeUsers = require('../routes/users'); // Login
const routeIndex = require('../routes/index'); // Index
const routeAuth = require('../routes/auth'); // Auth
const routeGyms = require('../routes/gyms'); // Gyms

const session = require('express-session'); // 로그인, 인증처리 모듈
const passport = require('passport');
const passportConfig = require('../config/passport');

// const { mysqlConnectionOptions } = require('../src/db')
const config = require('../config/config');
const FileStore = require('session-file-store')(session);
const cors = require('cors');

const app = express(); // express method 선언부

app.use(express.urlencoded({ extended: false })); // URL 인코딩 페이로드로 수신 요청을 구문 분석하는 middleware function
// 페이로드 : 사용에 있어서 전송되는 데이터
app.use(express.json()); // JSON 페이로드로 수신 요청을 구문 분석하는 middleware function
app.use(cookieParser());

// const mysqlSessionStore = MySQLStore(session);
// const sessionStore = new mysqlSessionStore(mysqlConnectionOptions); // mysql 세션 저장

app.use(
  session({
    key: config.session.key,
    secret: config.session.secret, // object로 생성한 후 불러와서 쓸 것.
    store: new FileStore(),
    resave: false,
    saveUninitialized: false,
    cookies: {
      secure: true,
      HttpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.authenticate('session'));
passportConfig();

app.use(bodyParser.urlencoded({ extended: true })); // URL 인코딩된 본문만 구문 분석(parsing : 원하는 형태로 가공)

var corsOptions = {
  origin: config.cors.allowedOrigin,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.get('/')

app.use('/', routeIndex);
app.use('/users', routeUsers);
app.use('/auth', routeAuth);
app.use('/gyms', routeGyms);

// Error
app.use((req, res, next) => {
  return res.status(404).send('Sorry, Not Found :<');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send('Error :<');
});

// Listening server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening... => http://localhost:${process.env.PORT} 🎉`);
});
