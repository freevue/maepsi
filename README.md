# bab-lint

프로젝트가 정한 디자인 규칙과 실제 UI를 대조하는 읽기 전용 에이전트 스킬입니다. [bab](https://github.com/freevue/bab-skill)의 스펙·wiki·PR 작업과 독립적으로 설치하고 사용합니다.

## 무엇을 검사하나요?

`DESIGN.md`와 연결된 로컬 디자인 문서가 기준입니다. bab-lint는 해당 화면에 적용되는 규칙을 찾고, 코드·설정·실제 화면에서 확인한 결과를 구분해 보고합니다.

| 결과 | 의미 |
| --- | --- |
| 위반 있음 | 채택한 규칙과 구현이 다릅니다. 규칙과 구현의 위치를 함께 보여줍니다. |
| 확인한 범위에서 통과 | 검사한 범위에서 규칙 위반을 찾지 못했습니다. |
| 검사 대상 없음 | 적용할 디자인 규칙이나 UI 대상이 없습니다. 통과로 취급하지 않습니다. |
| 미검증 | 화면 실행, 특정 상태 또는 화면 크기를 확인하지 못했습니다. |

예를 들어 `DESIGN.md`가 버튼 높이를 `40px`로 정했고 화면의 버튼이 `36px`라면 차이를 보고합니다. 문서에 버튼 높이 규칙이 없다면 임의의 값을 요구하지 않습니다. 코드를 읽기만 했다면 실제 화면을 확인했다고 표시하지 않습니다.

가상 보고 예시:

```text
위반 있음
DESIGN.md:18의 버튼 높이는 40px입니다.
src/screens/search/SearchButton.css:7은 36px입니다.
검색 화면의 버튼 높이를 규칙에 맞춰야 합니다.
코드와 설정은 확인했습니다. 실제 화면은 미검증입니다.
```

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

새 대화에서 `bab-lint:lint`를 선택하고 검사할 화면을 지정합니다.

```text
bab-lint:lint로 src/screens/search/를 검사해줘.
DESIGN.md에 적힌 상태와 토큰을 기준으로 보고,
코드 검사와 실제 화면 확인을 구분해줘.
```

## 현재 범위

첫 버전은 에이전트가 프로젝트의 디자인 규칙을 읽고 대조합니다. 자체 디자인 규칙을 설치하거나 UI 파일을 수정하지 않습니다. 실행 가능한 화면이나 기준 스크린샷이 없으면 시각적 결과는 미검증으로 남깁니다.

플러그인의 검사 절차는 [lint 스킬](plugins/bab-lint/skills/lint/SKILL.md)에 있습니다. 개발 검사는 저장소 루트에서 Node.js 20 이상으로 `node --test`를 실행합니다.

이 저장소는 [MIT 라이선스](LICENSE)로 배포합니다.
