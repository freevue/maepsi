# bab-lint

사용자의 디자인과 디자인 시스템을 프로젝트 문서로 정리하고, 그 문서가 원본과 구현에 맞는지 검사하는 에이전트 플러그인입니다. [bab](https://github.com/freevue/bab-skill)의 스펙·wiki·PR 작업과 독립적으로 설치합니다.

bab-lint는 자체 디자인 기준이나 완성된 `DESIGN.md`를 배포하지 않습니다. 첫 `setup`에서 현재 화면과 디자인 시스템을 조사하고, 사용자에게 유지할 것과 바꿀 것을 물어 그 프로젝트의 문서를 만듭니다.

## 작업 순서

| 단계 | 스킬 | 하는 일 |
| --- | --- | --- |
| 최초 구성 | `bab-lint:setup` | 화면·색상·공용 컴포넌트를 조사하고 사용자와 디자인 기준을 정합니다. 문서를 만들고 확인합니다. |
| 문서 갱신 | `bab-lint:document` | 새 디자인 결정과 컴포넌트 변경을 문서와 사용 가이드에 반영합니다. |
| 반복 검사 | `bab-lint:lint` | 문서의 연결·완결성, 컴포넌트 사용 가이드와 화면 구현의 일치를 검사합니다. |

`setup`은 기존 문서가 있으면 필요한 부분을 정리합니다. 문서가 없다면 대상 프로젝트에 `DESIGN.md`를 만들고 토큰·컴포넌트 문서와 사용 가이드를 연결합니다. 공용 컴포넌트 문서에는 공개 props와 속성의 타입·기본값·용도·시각적 효과를 적습니다. `lint`만 호출했을 때 문서가 없으면 `문서 없음`으로 보고합니다.

## 어떤 값이 규칙이 되나요?

| 상태 | 의미 | 검사에 사용 |
| --- | --- | --- |
| 확정 | 사용자가 결정했거나 충돌 없이 채택된 프로젝트 문서의 값 | 예 |
| 관찰 | 현재 코드나 화면에서만 확인한 값 | 아니요. 문서화하고 확인을 요청합니다. |
| 미결정 | 자료가 없거나 출처가 충돌하는 값 | 아니요. 필요한 결정을 기록합니다. |

예를 들어 디자인 원본이 버튼 높이를 `40px`로 정했고 코드가 `36px`라면 `lint`가 차이를 보고합니다. 코드에만 `36px`이 있다면 `document`는 이를 관찰값으로 적습니다. 사용자의 결정 없이 `36px`을 디자인 규칙으로 만들지 않습니다.

## 화면 구현 루프

새 화면에서는 기존 컴포넌트를 먼저 확인합니다. 새 공용 컴포넌트를 만들었다면 `document`로 계약과 사용 가이드를 기록합니다. 이어서 `lint`로 문서, 코드와 실제 화면을 대조합니다. 발견한 차이를 고친 뒤 같은 범위를 다시 검사합니다.

색상 값과 props가 맞아도 화면의 위계나 조합이 어색할 수 있습니다. 이를 판단할 사용 가이드는 `setup`에서 실제 화면을 보며 사용자와 정합니다. [Interfaces의 사례](https://interfaces.dev/cheat-sheet)는 질문과 전후 비교의 참고 자료이며 자동 적용하는 규칙은 아닙니다.

## 사용 예시

```text
bab-lint:setup으로 이 프로젝트의 디자인 문서를 처음 구성해줘.
현재 화면의 색상과 공용 컴포넌트를 먼저 보여주고,
유지할 것과 바꿀 것을 나에게 물어봐줘.
DESIGN.md, 컴포넌트 문서와 사용 가이드를 연결해줘.
```

```text
bab-lint:lint로 검색 화면의 디자인 문서와 구현을 검사해줘.
컴포넌트의 props·사용 가이드 누락과 실제 화면의 차이를 구분해줘.
```

`setup`과 `document`는 대상 프로젝트의 문서를 수정합니다. `lint`는 읽기 전용입니다. 사용자 결정이 필요한 항목이나 확인하지 못한 화면은 완료나 통과로 표시하지 않습니다.

## 설치

Claude Code:

```bash
claude plugin marketplace add freevue/bab-lint
claude plugin install bab-lint@bab-lint
```

Codex:

```bash
codex plugin marketplace add freevue/bab-lint
codex plugin add bab-lint@bab-lint
```

새 대화에서 필요한 스킬을 선택합니다. 절차는 [초기 구성](plugins/bab-lint/skills/setup/SKILL.md), [문서 갱신](plugins/bab-lint/skills/document/SKILL.md), [반복 검사](plugins/bab-lint/skills/lint/SKILL.md)에 있습니다. 저장소 개발 검사는 Node.js 20 이상에서 `node --test`로 실행합니다.

이 저장소는 [MIT 라이선스](LICENSE)로 배포합니다.
