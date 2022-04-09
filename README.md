### redis + express 으로 캐싱을 위한 서버를 만들어보기

`npx express-generator` 을 terminal에 입력하여 express 앱을 만든 후 반복요청을 위한 앱을 만들어볼 것 이다.  
그 후 artillery을 이용하여 LoadTest.json을 돌려 부하테스트를 진행해보자  
`artillery LoadTest.json` 실행

### redis 로 인-메모리 캐싱을 하여 DB에 접근하는것보다 훨씬 빠르게 캐싱하여 사용할 수 있다.

### 하지만 속도가 빠르다고 하여 메모리상에서 동작하는 KVS 형태의 휘발성 데이터베이스 인것을 잊어버리면 안된다.

### DB의 사용 과 Redis의 사용 을 구분하여 사용하자.

그런데 redis v4 로 올라오면서 무언가 바뀐것같다...
const client = redis.createClient({ legacyMode: true });
위와 같이해야 이전버전과 호환 된다고 한다....

[npm:Node-Redis](https://www.npmjs.com/package/redis)
