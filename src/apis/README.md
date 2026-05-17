# APIs

BEFORE API와 통신하는 공통 HTTP 레이어.

## 구조

```
src/apis/
├── http.ts        # axios 인스턴스, 요청/응답 인터셉터
├── auth.ts        # 토큰 localStorage 유틸
├── error.ts       # ApiClientError, 에러 포맷 파싱
├── types.ts       # 공통 타입 (ApiResponse, TokenPair 등)
├── utils.ts       # omitUndefined, parseDecimal, buildJsonFormData
├── enumMapper.ts  # 리스크 등급/outcome/headline 한글 매핑
├── endpoints.ts   # API 경로 상수
└── index.ts       # 통합 export
```

## 사용법

```ts
import { http, ENDPOINTS } from "@/apis";

const { data } = await http.get(ENDPOINTS.risk.verdict("PLTR"));
```

## 에러 처리

모든 API 에러는 `ApiClientError`로 변환된다.

```ts
import { ApiClientError } from "@/apis";

try {
  await http.post(ENDPOINTS.auth.login, { email, password });
} catch (err) {
  if (err instanceof ApiClientError) {
    console.log(err.code); // 서버 에러 코드
    console.log(err.statusCode); // HTTP 상태 코드
    console.log(err.message); // 사용자 노출 메시지
  }
}
```

## 401 처리

앱 진입 시 `setUnauthorizedHandler`로 핸들러를 등록하면 401 응답 시 자동 호출된다.

```ts
import { setUnauthorizedHandler } from "@/apis";

setUnauthorizedHandler(() => {
  navigate("/login");
});
```

## PATCH 요청 (부분 수정)

변경된 필드만 전송하려면 `omitUndefined`를 사용한다.

```ts
import { http, omitUndefined, ENDPOINTS } from "@/apis";

await http.patch(ENDPOINTS.me.profile, omitUndefined({ name, new_password }));
```

## 숫자 string 필드 주의

`worst_case_pct`, `price_at_query`, `outcome_pct`, `current_price` 등은 API가 string으로 내려준다.
화면에 표시하거나 계산할 때 `parseDecimal`로 변환한다.

```ts
import { parseDecimal } from "@/apis";

const pct = parseDecimal(item.worst_case_pct); // number | null
```

## enum 매핑

리스크 등급과 outcome은 `enumMapper`로 한글 변환한다.

```ts
import { gradeLabel, outcomeLabel } from "@/apis";

gradeLabel("VOLATILITY_HIGH"); // "높음"
outcomeLabel("price_dropped"); // "하락"
```
