/**
 * ejs 뷰 템플릿 적용하기
 * 
 * 뷰 템플릿을 만들고 응답 웹문서를 템플릿으로부터 생성
 *
 * @date 2016-11-10
 * @author Mike
 */
 

// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');
  

// 모듈로 분리한 설정 파일 불러오기
var config = require('./config');

// 모듈로 분리한 데이터베이스 파일 불러오기
var database = require('./database/database');

// 모듈로 분리한 라우팅 파일 불러오기
var route_loader = require('./routes/route_loader');


//=======Passport 사용 ===========
var passport = require('passport');
var flash = require('connect-flash');



// 익스프레스 객체 생성
var app = express();


var LocalStrategy = require('passport-local').Strategy;

//패스포트 로그인 설정 
passport.use('local-login',new LocalStrategy({
	usernameField:'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req,email,password,done){
	console.log('passport의 local-login 호출됨 : '+email+', '+password);

	var database = app.get('database');
	database.UserModel.findOne({'email':email},function(err,user){
		if(err){return done(err);}

		//등록된 사용자가 없는 경우
		if(!user){
			console.log('계정이 일치하지 않음');
			return done(null, false,req.flash('loginMessage','등록된 계정이 없습니다.'));
		}
		//비밀번호를 비교하여 맞지 않는 경우 
		var authenticated = user.authenticate(password,user._doc.salt,user._doc.hashed_password);
		if(!authenticated){
			console.log('비밀번호 일치하지 않음');
			return done(null,false,req.flash('loginMessage','비밀번호가 일치하지 않습니다.'));
		}

		//정상인 경우 
		console.log('계정과 비밀번호가 일치함');
		return done(null,user);

	});
}));

//패스포트 회원가입 설정 
passport.use('local-signup',new LocalStrategy({
	usernameField:'email',
	passwordField:'password',
	passReqToCallback:true
},function(req, email,password,done){
	//요청 파라미터 중  name 파라미터 확인
	var paramName = req.body.name || req.query.name;
	console.log('passport 의 local-signup 호출됨: '+email +', '+ password+', '+paramName);
	
	//User.findOne 이 blocking되므로 async 방식으로 변경할 수도 있음
	process.nextTick(function(){
		var database = app.get('database');
		database.UserModel.findOne({'email':email},function(err,user){
			//오류가 발생하면
			if(err){
				return done(err);
			}
			//기존에 이메일이 있다면
			if(user){
				console.log('기존에 계정이 있음');
				return done(null,false,req.flash('signupMessage','계정이 이미 있습니다.'));

			}else{
				//모델 인스턴스 객체 만들어 저장
				
				var user = new database.UserModel({'email':email,'password':password,'name':paramName});
				user.save(function(err){
					if(err){throw err;}
					console.log('사용자 데이터 추가함');
					return done(null,user);
				});
			}

		});
	});
}));


//사용자 인증에 성공했을 때 호출
passport.serializeUser(function(user,done){
	console.log('serializeUser() 호출됨');
	console.dir(user);

	done(null,user);
});

//사용자 인증 이후 사용자 요청이 있을 때마다 호출
passport.deserializeUser(function(user, done){
	console.log('deserializeUser() 호출됨');
	console.dir(user);

	done(null,user);
});



//===== 뷰 엔진 설정 =====//
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
console.log('뷰 엔진이 ejs로 설정되었습니다.');


//===== 서버 변수 설정 및 static으로 public 폴더 설정  =====//
console.log('config.server_port : %d', config.server_port);
app.set('port', process.env.PORT || 3000);
 

//=========Passport 사용 설정 =================================
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

 
//라우팅 정보를 읽어들여 라우팅 설정
//route_loader.init(app, express.Router());
var router = express.Router();
route_loader.init(app,router);

//홈화면 - index.ejs 템플릿으로 홈 화면이 보이도록 함
router.route('/').get(function(req,res){
	console.log('/ 패스 요청됨');
	res.render('index.ejs');
});

app.get('/login',function(req,res){
	console.log('/login 패스 요청됨');
	res.render('login.ejs',{message : req.flash('loginMessage')});
});

app.post('/login',passport.authenticate('local-login',{
	successRedirect : '/profile',
	failureRedirect : '/login',
	failureFlash : true
}));


//회원 가입 폼 링크 
app.get('/signup',function(req,res){
	console.log('/signup 패스 요청됨');
	res.render('signup.ejs',{message : req.flash('signupMessage')});
});


app.post('/signup',passport.authenticate('local-signup',{
	successRedirect:'/profile',
	failureRedirect : '/signup',
	failureFlash: true
}));

//프로필 화면 = 로그인 여부를 확인할 수 있도록 먼저 isLooggedIn 미들웨어 실행
router.route('/profile').get(function(req,res){
	console.log('/profile 패스 요청됨');

	//인증된 경우 req.user 객체에 사용자 정보 있으며, 인증이 안 된 경우 req.user는 false 값임
	console.log('req.user 객체의 값');
	console.dir(req.user);

	//인증이 안 된 경우
	if(!req.user){
		console.log('사용자 인증이 안 된 상태임.');
		res.redirect('/');
		return;
	}


	//인증된 경우 
	console.log('사용자 인증된 상태임.');
	if(Array.isArray(req.user)){
		res.render('profile.ejs',{user:req.user[0]._doc});
	}else{
		res.render('profile.ejs',{user:req.user});
	}
	});

//로그아웃
app.get('/logout',function(req,res){
	console.log('/logout 패스 요청됨');
	req.logout();
	res.redirect('/');
});




//===== 404 에러 페이지 처리 =====//
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on('uncaughtException', function (err) {
	console.log('uncaughtException 발생함 : ' + err);
	console.log('서버 프로세스 종료하지 않고 유지함.');
	
	console.log(err.stack);
});

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});

// 시작된 서버 객체를 리턴받도록 합니다. 
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

	// 데이터베이스 초기화
	database.init(app, config);
   
});
