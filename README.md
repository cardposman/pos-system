# 밴포스시스템 pos-system

GitHub Pages용 매장 결제장비 안내 사이트입니다.

## 대표 카테고리

- 홈: `/pos-system/`
- 장비별: `/pos-system/equipment/`
  - 카드단말기: `/pos-system/equipment/card-terminal/`
  - 포스기: `/pos-system/equipment/pos/`
  - 키오스크: `/pos-system/equipment/kiosk/`
  - 테이블오더: `/pos-system/equipment/table-order/`
- 업종별: `/pos-system/business/`
  - 음식점: `/pos-system/business/restaurant/`
  - 카페: `/pos-system/business/cafe/`
  - 주점·호프: `/pos-system/business/pub/`
  - 신규 창업 매장: `/pos-system/business/startup/`
- 지역별: `/pos-system/region/`
  - 서울: `/pos-system/region/seoul/`
  - 경기: `/pos-system/region/gyeonggi/`
  - 인천: `/pos-system/region/incheon/`
- 문의하기: `/pos-system/#contact`
- 장비 비교 가이드: `/pos-system/guide/`

## 이번 수정 내용

- 지역별 하위 카테고리에 서울, 경기, 인천을 추가했습니다.
- 모든 페이지의 상단 지역별 드롭다운에 지역 링크를 반영했습니다.
- 지역별 전체 페이지와 서울·경기·인천 상세 페이지의 title, description, canonical, og:url, FAQ, breadcrumb 구조화 데이터를 정리했습니다.
- sitemap.xml을 새 지역 URL 기준으로 갱신했습니다.

## 업로드 주의

기존 `pos-system` 내부 파일을 삭제한 뒤 이 폴더의 내용만 업로드하는 것을 권장합니다. 기존 URL이 남아 있으면 새 구조와 함께 중복으로 노출될 수 있습니다.

## 운영 전 교체 필요

`assets/js/main.js`의 전화번호와 네이버폼 주소를 실제 값으로 교체해야 합니다.


## 장비 실제 사진

장비별 상세 페이지 상단에는 `assets/images/equipment/` 폴더의 실제 장비 사진 2장씩을 사용합니다. 이미지 파일은 WebP로 최적화되어 있습니다.


## 메인 랜딩페이지 리디자인

- 허위 수치, 가짜 후기, 근거 없는 최상급 표현 없이 전환형 랜딩 구조로 홈 화면을 재구성했습니다.
- 실제 장비 사진을 홈 첫 화면과 장비 선택 카드에 재사용했습니다.
- 장비별 선택, 업종별 구성, 상담 전 체크리스트, 구성 예시, 지역별 안내, 문의하기 섹션을 순차적으로 배치했습니다.
- 홈 URL의 sitemap lastmod를 2026-06-23으로 갱신했습니다.


## 2026-06-23 메인 랜딩페이지 v2 리디자인

- 허위 수치나 가짜 후기 없이 B2B 상업용 랜딩페이지 톤으로 홈 화면을 재구성했습니다.
- 첫 화면은 어두운 배경, 장비 이미지 카드, 상담 CTA 중심으로 변경했습니다.
- 장비별/업종별/상담 전 체크/구성 예시/지역별/FAQ/문의하기 흐름으로 재배치했습니다.
- 기존 장비 이미지는 `assets/images/equipment/` 경로를 재사용합니다.
- CSS 캐시 문제를 줄이기 위해 HTML의 CSS 경로에 버전 쿼리를 추가했습니다.


## 지역 상세 페이지 확장
- CSV 기반 상세지역 페이지 186개를 생성했습니다.
- `충청`은 충북·충남·세종으로, `전라도`는 전북·전남으로, `경상도`는 경북·경남으로 나누었습니다.
- URL 구조는 `/region/상위지역/시군구/` 형태이며, 이후 동단위 확장은 `/region/상위지역/시군구/동명/` 형태로 추가할 수 있습니다.
- 상단 드롭다운에는 상위지역만 표시하고, 상세지역은 각 상위지역 페이지 내부 링크로 이동하도록 구성했습니다.
- 상세지역 페이지 구성: 지역특성 → 장비사진 2장 → 상담문의 링크 → 공통안내 → 상담문의 링크.


## 지역 검색 UI

- `/region/` 전체 페이지에 전국 상세지역 빠른검색을 추가했습니다.
- 각 상위지역 페이지에 해당 지역 내 상세지역 검색창을 추가했습니다.
- 검색은 기존 `<a href>` 링크 목록을 숨김/표시하는 방식이라, 검색엔진이 읽을 수 있는 내부 링크 구조는 유지됩니다.
- 상세지역 수가 늘어나도 상단 드롭다운에는 상위지역만 유지하고, 검색창과 지역 목록으로 탐색하도록 구성했습니다.
