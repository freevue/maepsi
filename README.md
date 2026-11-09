# bab-lint

사용자의 디자인과 디자인 시스템을 프로젝트 문서로 정리하고, 그 문서가 원본과 구현에 맞는지 검사하는 에이전트 플러그인입니다. [bab](https://github.com/freevue/bab-skill)의 스펙·wiki·PR 작업과 독립적으로 설치합니다.

bab-lint는 자체 디자인 기준이나 완성된 `DESIGN.md`를 배포하지 않습니다. 사용자의 자료와 대상 프로젝트의 기존 구성을 읽고 그 프로젝트의 문서를 만듭니다.

## 작업 순서

| 단계 | 스킬 | 하는 일 |
| --- | --- | --- |
| 문서화 | `bab-lint:document` | 디자인 원본과 기존 UI·토큰·컴포넌트를 조사해 프로젝트의 디자인 문서를 작성하거나 정리합니다. |
| 검사 | `bab-lint:lint` | 문서의 연결·정확성·완결성과 확정된 규칙에 대한 구현의 일치를 검사합니다. |

기존 문서가 있다면 필요한 부분만 고칩니다. 문서가 없다면 `document`가 대상 프로젝트에 `DESIGN.md`를 만들고, 필요한 상세 문서를 연결합니다. `lint`만 호출했을 때 문서가 없으면 `문서 없음`으로 보고합니다.

## 어떤 값이 규칙이 되나요?

| 상태 | 의미 | 검사에 사용 |
| --- | --- | --- |
| 확정 | 사용자가 결정했거나 충돌 없이 채택된 프로젝트 문서의 값 | 예 |
| 관찰 | 현재 코드나 화면에서만 확인한 값 | 아니요. 문서화하고 확인을 요청합니다. |
| 미결정 | 자료가 없거나 출처가 충돌하는 값 | 아니요. 필요한 결정을 기록합니다. |

예를 들어 디자인 원본이 버튼 높이를 `40px`로 정했고 코드가 `36px`라면 `lint`가 차이를 보고합니다. 코드에만 `36px`이 있다면 `document`는 이를 관찰값으로 적습니다. 사용자의 결정 없이 `36px`을 디자인 규칙으로 만들지 않습니다.

## 사용 예시

```text
bab-lint:document로 첨부한 화면과 이 저장소의 컴포넌트를 정리해줘.
DESIGN.md에서 토큰과 컴포넌트 문서를 정확히 찾을 수 있게 해줘.
확정되지 않은 값은 미결정으로 남겨줘.
```

```text
bab-lint:lint로 검색 화면의 디자인 문서와 구현을 검사해줘.
문서 자체의 누락·충돌과 실제 화면의 미검증 항목을 구분해줘.
```

`document`는 대상 프로젝트의 문서를 수정합니다. `lint`는 읽기 전용입니다. 원본 디자인이나 실행 가능한 화면에 접근하지 못하면 해당 일치 여부를 `미검증`으로 보고합니다.

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

새 대화에서 필요한 스킬을 선택합니다. 절차는 [문서화 스킬](plugins/bab-lint/skills/document/SKILL.md)과 [검사 스킬](plugins/bab-lint/skills/lint/SKILL.md)에 있습니다. 저장소 개발 검사는 Node.js 20 이상에서 `node --test`로 실행합니다.

이 저장소는 [MIT 라이선스](LICENSE)로 배포합니다.
