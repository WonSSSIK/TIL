# Vue.js



 # 01 Vue.js 시작

vue npm 설치 

npm install-g vue-cli

설치 후 vue list 사용할 수 있는 프로젝트 템플릿이 나옴 

vue list

vue init simple hellovuejs 

```vue
<!DOCTYPEhtml>
<html>
<head>
<metacharset="utf-8">
<title>WelcometoVue</title>
<scriptsrc="https://unpkg.com/vue"></script>
</head>
<body>
<divid="simple">

<h2>{{message}}</h2>
</div>

<scripttype="text/javascript">
varmodel={
message:'첫번쨰vue.js입니다.'
};

varsimple=newVue({
el:'#simple',
data:model
})


</script>


</body>
</html>

```



# vue.js 기초

IF

```vue
<!DOCTYPEhtml>
<html>
<head>
<metacharset="utf-8">
<title>WelcometoVue</title>
<scriptsrc="https://unpkg.com/vue"></script>
</head>
<body>
<divid="account">
예금액:<inputtype="text"v-model="balance"/>
<br/>
회원님의등급:
<spanv-if="balance>=1000000">GOLD</span>
<spanv-else-if="balance>=500000">Silver</span>
<spanv-else-if="balance>=200000">Bronze</span>
<spanv-else>Basic</span>
</div>

<scripttype="text/javascript">
varsimple1=newVue({
el:'#account',
data:{
balance:0
}
})


</script>


</body>
</html>

```

v-model

```vue
<!DOCTYPEhtml>
<html>
<head>
<metacharset="utf-8">
<title>WelcometoVue</title>
<scriptsrc="https://unpkg.com/vue"></script>
</head>
<body>
<divid="simple1">
<div>좋아하는과일을골라주세요:</div>
<inputtype="checkbox"value="1"v-model="fruits">사과,
<inputtype="checkbox"value="2"v-model="fruits">키위,
<inputtype="checkbox"value="3"v-model="fruits">포도,
<inputtype="checkbox"value="4"v-model="fruits">수박,
<inputtype="checkbox"value="5"v-model="fruits">참외
</div>
<hr/>
<divid="simple2">
선택한과일들:<spanv-html="fruits"></span>
</div>
<scripttype="text/javascript">
varmodel={
fruits:[]
};



varsimple1=newVue({
el:'#simple1',data:model


});

varsimple2=newVue({
el:'#simple2',data:model


});

</script>


</body>

</html>
```

v-for

```vue
<!DOCTYPEhtml>
<html>
<head>
<metacharset="utf-8">
<title>02-08</title>
<style>
#list{width:400px;border:1pxsolidblack;border-collapse:collapse;}
#listtd,#listth{border:1pxsolidblack;text-align:center;}
#list>thead>tr{color:yellow;background-color:purple;}
</style>
<scriptsrc="https://unpkg.com/vue/dist/vue.min.js"></script>
</head>
<body>
<divid="exmaple">
<tableid="list">
<thead>
<tr>
<th>번호</th><th>이름</th><th>전화번호</th><th>주소</th>
</tr>
</thead>
<tbodyid="contacts">
<trv-for="(contact,index)incontacts">
<td>{{index+1}}</td>
<td>{{contact.name}}</td>
<td>{{contact.tel}}</td>
<td>{{contact.address}}</td>
</tr>
</tbody>
</table>
</div>
<scripttype="text/javascript">
varmodel={
"pageno":1,
"pagesize":10,
"totalcount":100,
"contacts":[
{"no":100,"name":"설현","tel":"010-3456-8299","address":"서울"},
{"no":99,"name":"혜리","tel":"010-3456-8298","address":"서울"},
{"no":98,"name":"하니","tel":"010-3456-8297","address":"경기"},
{"no":97,"name":"성소","tel":"010-3456-8296","address":"제주"},
{"no":96,"name":"지아","tel":"010-3456-8295","address":"서울"},
{"no":95,"name":"정연","tel":"010-3456-8294","address":"강원"},
{"no":94,"name":"쯔위","tel":"010-3456-8293","address":"경기"},
{"no":93,"name":"사나","tel":"010-3456-8292","address":"서울"},
{"no":92,"name":"모모","tel":"010-3456-8291","address":"충남"},
{"no":91,"name":"소진","tel":"010-3456-8290","address":"서울"}
]
}

varlist=newVue({
el:"#exmaple",
data:model
});
</script>
</body>
</html>

```



기본키 특성을 부여 할 수 있다.    <tr:key="contact.no">

```vue
<!DOCTYPEhtml>
<html>
<head>
<metacharset="utf-8">
<title>02-10</title>
<style>
#list{width:400px;border:1pxsolidblack;border-collapse:collapse;}
#listtd,#listth{border:1pxsolidblack;text-align:center;}
#list>thead>tr{color:yellow;background-color:purple;}
.divider{height:2px;background-color:gray;}
</style>
<scriptsrc="https://unpkg.com/vue/dist/vue.min.js"></script>
</head>
<body>
<divid="exmaple">
<tableid="list">
<thead>
<tr>
<th>번호</th><th>이름</th><th>전화번호</th><th>주소</th>
</tr>
</thead>
<tbodyid="contacts">
<templatev-for="(contact,index)incontacts">
<tr:key="contact.no">
<td>{{contact.no}}</td>
<td>{{contact.name}}</td>
<td>{{contact.tel}}</td>
<td>{{contact.address}}</td>
</tr>
<trclass="divider"v-if="index%5===4">
<tdcolspan="4"></td>
</tr>
</template>
</tbody>
</table>
</div>
<scripttype="text/javascript">
varmodel={
"pageno":1,
"pagesize":10,
"totalcount":100,
"contacts":[
{"no":100,"name":"설현","tel":"010-3456-8299","address":"서울"},
{"no":99,"name":"혜리","tel":"010-3456-8298","address":"서울"},
{"no":98,"name":"하니","tel":"010-3456-8297","address":"경기"},
{"no":97,"name":"성소","tel":"010-3456-8296","address":"제주"},
{"no":96,"name":"지아","tel":"010-3456-8295","address":"서울"},
{"no":95,"name":"정연","tel":"010-3456-8294","address":"강원"},
{"no":94,"name":"쯔위","tel":"010-3456-8293","address":"경기"},
{"no":93,"name":"사나","tel":"010-3456-8292","address":"서울"},
{"no":92,"name":"모모","tel":"010-3456-8291","address":"충남"},
{"no":91,"name":"소진","tel":"010-3456-8290","address":"서울"}
]
}

varlist=newVue({
el:"#exmaple",
data:model
});
</script>
</body>
</html>

```

한글 자동 완성 연습

```vue
<!DOCTYPEhtml>
<html>
<head>
<metacharset="utf-8">
<title>02-16</title>
<style>
#list{width:400px;border:1pxsolidblack;border-collapse:collapse;}
#listtd,#listth{border:1pxsolidblack;text-align:center;}
#list>thead>tr{color:yellow;background-color:purple;}
</style>
<scriptsrc="https://unpkg.com/vue/dist/vue.min.js"></script>
</head>
<body>
<divid="exmaple">
<p>
국가명:<inputtype="text"v-model="countryname"placeholder="국가명"/>
</p>
<tableid="list">
<thead>
<tr>
<th>번호</th><th>국가명</th><th>수도</th><th>지역</th>
</tr>
</thead>
<tbodyid="contacts">
<trv-for="cinfiltered">
<td>{{c.no}}</td>
<td>{{c.name}}</td>
<td>{{c.capital}}</td>
<td>{{c.region}}</td>
</tr>
</tbody>
</table>
</div>
<scripttype="text/javascript">
varmodel={
countryname:"",
countries:[
{no:1,name:"미국",capital:"워싱턴DC",region:"america",vname:"alrnr"},
{no:2,name:"프랑스",capital:"파리",region:"europe",vname:"vmfkdtm"},
{no:3,name:"영국",capital:"런던",region:"europe",vname:"dudrnr"},
{no:4,name:"중국",capital:"베이징",region:"asia",vname:"wndrnr"},
{no:5,name:"태국",capital:"방콕",region:"asia",vname:"xornr"},
{no:6,name:"모로코",capital:"라바트",region:"africa",vname:"ahfhzh"},
{no:7,name:"라오스",capital:"비엔티안",region:"asia",vname:"fkdhtm"},
{no:8,name:"베트남",capital:"하노이",region:"asia",vname:"qpxmska"},
{no:9,name:"피지",capital:"수바",region:"oceania",vname:"vlwl"},
{no:10,name:"솔로몬제도",capital:"호니아라",region:"oceania",vname:"thffhahswpeh"},
{no:11,name:"자메이카",capital:"킹스턴",region:"america",vname:"wkapdlzk"},
{no:12,name:"나미비아",capital:"빈트후크",region:"africa",vname:"skalqldk"},
{no:13,name:"동티모르",capital:"딜리",region:"asia",vname:"ehdxlahfm"},
{no:14,name:"멕시코",capital:"멕시코시티",region:"america",vname:"aprtlzh"},
{no:15,name:"베네수엘라",capital:"카라카스",region:"america",vname:"qpsptndpffk"},
{no:16,name:"서사모아",capital:"아피아",region:"oceania",vname:"tjtkahdk"}
]
}

varclist=newVue({
el:"#exmaple",
data:model,
computed:{
filtered:function(){
varcname=this.countryname.trim();
returnthis.countries.filter(function(item,index){
if(item.vname.indexOf(cname)>-1){
returntrue;
}
});
}
}
});
</script>
</body>
</html>

```

템플릿 문자열 잠깐 보이는것 안나오게 하기  v-cloak

```vue
<!DOCTYPEhtml>
<html>
<head>
<metacharset="utf-8">
<title>03-08</title>
<style>
#list{width:400px;border:1pxsolidblack;border-collapse:collapse;}
#listtd,#listth{border:1pxsolidblack;text-align:center;}
#list>thead>tr{color:yellow;background-color:purple;}
[v-cloak]{display:none;}
</style>
</head>
<body>
<divid="example"v-cloak>
<p>
이름:<inputtype="text"v-model="name"placeholder="두글자이상을입력하세요"/>
</p>
<tableid="list">
<thead>
<tr>
<th>번호</th><th>이름</th><th>전화번호</th><th>주소</th>
</tr>
</thead>
<tbodyid="contacts">
<trv-for="contactincontactlist">
<td>{{contact.no}}</td>
<td>{{contact.name}}</td>
<td>{{contact.tel}}</td>
<td>{{contact.address}}</td>
</tr>
</tbody>
</table>
<divv-show="isProcessing===true">조회중</div>
</div>

<scriptsrc="https://unpkg.com/vue/dist/vue.js"></script>
<scriptsrc="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js"></script>
<scriptsrc="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.3/fetch.js"></script>
<scriptsrc="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.min.js"></script>
<scripttype="text/javascript">
varvm=newVue({
el:'#example',
data:{
name:"",
isProcessing:false,
contactlist:[]
},
watch:{
name:function(val){
if(val.length>=2){
this.fetchContacts();
}else{
this.contactlist=[];
}
}
},
methods:{
fetchContacts:_.debounce(function(){
this.contactlist=[];
this.isProcessing=true;
varurl="http://sample.bmaster.kro.kr/contacts_long/search/"+this.name;
varvm=this;
fetch(url)
.then(function(response){
returnresponse.json()
}).then(function(json){
vm.contactlist=json;
vm.isProcessing=false;
}).catch(function(ex){
console.log('parsingfailed',ex);
vm.contactlist=[];
vm.isProcessing=false;
})

},300)
}
})
</script>
</body>
</html>


```

# 04이벤트 

이벤트 객체 의 주요 속성 

| 속성명           | 설명                                       |
| ------------- | ---------------------------------------- |
| target        | 이벤트가 발생한 HTML 요소를 리턴함.                   |
| currentTarget | 이벤트리스너가 이벤트를 발생 시키는HTML요소를 리턴함           |
| path          | 배열값. 이벤트 발생 HTML 요소로 부터 document,window 객체로까지 거슬러 올라가는 경로를 나타냄 |
| bubbles       | 현재의 이벤트가 버블링을 일으키는 이벤트인지 여부를 리턴함         |
| cancelable    | 기본 이벤트를 방지랑 수 있는지 여부를 리턴함                |
| eventPhase    | 이벤트 흐름의 단계를 나타냄.  1:포착(CAPTURING_PHASE)  2:이벤트 발생(AT_TARGET)  3:버블링(BUBBLING_PHASE) |
| srcElement    | IE에서 사용되던 속성으로 target과 동일한 속성            |

 

키보드 이벤트 관련 속성 

| 속성명      | 설명                                       |
| -------- | ---------------------------------------- |
| altKey   | alt 키가 눌러졌는지 여부를 나타냄(true/false).        |
| shiftKey | SHIFT 키가 눌러졌는지 여부를 나타냄(true/false).      |
| ctrlKey  | CTRL 키가 눌러졌는지 여부를 나타냄(true/false).       |
| metaKey  | 메타키가 눌러졌는지 여부를 나타냄.윈도우에서는 Window key,macOS에서는  Command key이다. |
| key      | 이벤트에 의해 나타나는 키의 값을 리턴함. 대소문자 구분함.        |
| code     | 이벤트를 발생시킨 키의 코드값을 리턴함.  ex) a 를 눌렀을때 "keyA"를 리턴함  ex)Shift 키를 눌렀을 떄 "Shift" 를 리턴함 |
| keyCode  | 이벤트를 발생시킨 키보드의 고유 키코드  ex)a.A는 65를 리턴함(대소문자 구분하지 않음) |
| charCode | keypress 이벤트가 발생될 때 Unicode 캐릭터 코드를 리턴함  |
| location | 디바이스에서의 키 위칫값, 일반 키보드는 이 값이 모두 0이므로 이용할 수 없음 |



마우스 이벤트 관련 속성

| 속성                                | 설명                                       |
| --------------------------------- | ---------------------------------------- |
| altkey,shiftkey,  ctrlkey,metaKey | 키보드 이벤트 관련 속성 참조                         |
| button                            | 이벤트를 발생시킨 마우스 버튼  0: 마우스 왼쪽 버튼  1:마우스 휠  2:마우스 오른쪽 버튼 |
| buttons                           | 마우스 이벤트가 발생한 후에 눌러져 있는 마우스 버튼의 값을 리턴함. 아래 값의 조합으로 이루어짐  1:마우스 왼쪽 버튼  2:마우스 오른쪽 버튼  4:마우스 휠  8:4번째 마우스 버튼  16: 5번째 마우스 버튼  ex)마우스의 오른쪽 버튼, 휠을 누르고 있는 상태에서 왼쪽 버튼을 클릭할 경우 이 값은 6을 리턴함 |
| clientX,clientY                   | 마우스 이벤트가 일어났을 때의 뷰포트 영역상의 좌표, 이좌표는 스트롤바를 내리더라도 좌푯값에 영향을 받지 않음 |
| layerX,layerY                     | 마우스 이벤트가 발생한 HTML 요소 영역상에서의 좌표(IE 이외의 브라우저 사용) |
| offsetX,offsetY                   | 마우스 이벤트가 발생한 HTML 요소 영역상에서의 좌표(IE 브라우저 사용) |
| pageX,pageY                       | 마우스 이벤트가 일어났을 때의 HTML 문서(Document) 영역상의 좌표 |
| screenX,screenY                   | 마우스 이벤트가 일어났을때의 모니터 화면(Screen) 영역상의 좌표   |

 

이벤트 객체의 주요 메서드 

| 메서드명              | 설명                  |
| ----------------- | ------------------- |
| preventDefault()  | 기본 이벤트의 자동 실행을 중지시킴 |
| stopPropagation() | 이벤트의 전파를 막음         |

 

e.preventDefault() 작성대신

<divid="example" v-on:contextmenu.prevent="ctxStop">

…….

</div>

조건 논리식의 결과로 실행 될 때는 e.preventDefault()를 호출해야한다. 

기본 이벤트 

a 링크 이동

브라우저 오른쪽 클릭 

등…

----------------------------------------------------------------------------------------------------------------------

이벤트 수식어 

.once  이벤트를 한번만 수행

<button id="create"v-on:click.once="specialEvent" class="btn btn-primary">계좌개설

.stop

.self

----------------------------------------------------------------------------------------------------------------------

keycode 수식어 

keyCode ===13  -> enter 키의 키코드

 key code 의 별칭 

| .enter | .tab  | .delete | .esc   |
| ------ | ----- | ------- | ------ |
| .space | .up   | .down   | .left  |
| .right | .ctrl | .alt    | .shift |
| .meta  |       |         |        |

 ctrl +c 의 경우 

v-on: keyup.ctrl.67 ="copy"로 지정하면 된다. 



마우스 수식어 

| .left | .right | .middle |
| ----- | ------ | ------- |
|       |        |         |



# 06 컴포넌트



대규모 애플리케이션인 경우 확장자가 .vue 인 단일 파일 컴포넌트형태로 많이 개발됨

대규모 애플리케이션에서 사용되는 단일 Webpack과 ECMAScript6에 대한 지식이 있어야 한다.

 컴포넌트 사용의 장점

1. 뛰어난 재사용성 
2. 테스트가 용이. 컴포넌트 단위로 기능 테스트를 할 수 있다.Karma와 Mocha와 같은 단위 테스트 도구를 이용해 쉽게 테스트할 수 있다. 
3. 디버깅이 편하다.

Vue는 컴포넌트들을 조합 하여 전체 어플리케이션을 완성 

컴포넌트 들은 부모 자식 관계로  트리구조를 형성한다. 

부모 컴포넌트 들이 자식 컴포넌트를 포함하는 형태

컴포넌트들은 주로 부모에서 자식으로만 정보를 전달한다. (Props)을 통해서…

전달방향은 양방향도 가능하지만 복잡도가 높아지고 유지보수가 힘들어서 권장하지 않는다. 

data,method,compute,watch 옵션과 같은 대부분의 Vue 인스턴스의 옵션을 컴포넌트 수준에서도 사용할 수 있다. 

 

컴포넌트 작성 

Vue.component(tagname,options)

tagname: 컴포넌트를 사용할 태그명

options: 컴포넌트에서 렌더링할 templet을 지정한다.

 

 

컴포넌트 예제 

```vue
<!DOCTYPEhtml>
<html>
<head>
<metacharset="utf-8">
<title>06-01</title>
<scriptsrc="https://unpkg.com/vue/dist/vue.min.js"></script>
</head>
<scripttype="text/javascript">
Vue.component('hello-component',{
template:'<div>helloworld!!!</div>'
})
</script>
<body>
<divid="app">
<hello-component></hello-component>
<hello-component></hello-component>
<hello-component></hello-component>
</div>
</body>
<scripttype="text/javascript">
Vue.config.devtools=true;
varv=newVue({
el:'#app'
})
</script>
</html>

```

컴포넌트에서의 data 옵션 

data 옵션에서 객체를 직접 지정하면 안됨

data 옵션에 함수가 주어져야 한다. 