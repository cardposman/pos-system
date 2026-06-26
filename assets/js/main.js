const PHONE_NUMBER = '88888888';
const NAVER_FORM_URL = 'nnnnnnnn';
const MOBILE_NAV_QUERY = '(max-width: 860px)';

function callNow() {
  const cleanNumber = PHONE_NUMBER.replace(/[^0-9+]/g, '');
  if (!cleanNumber) {
    alert('전화번호를 입력해 주세요.');
    return;
  }
  window.location.href = 'tel:' + cleanNumber;
}

function openNaverForm() {
  if (!NAVER_FORM_URL || NAVER_FORM_URL === 'nnnnnnnn') {
    alert('네이버폼 주소를 실제 URL로 교체해 주세요.');
    return;
  }
  const newWindow = window.open(NAVER_FORM_URL, '_blank', 'noopener,noreferrer');
  if (newWindow) {
    newWindow.opener = null;
  }
}

function closeMobileMenus(exceptGroup) {
  document.querySelectorAll('.nav-group.is-open').forEach((group) => {
    if (group !== exceptGroup) {
      group.classList.remove('is-open');
      const parent = group.querySelector('.nav-parent');
      if (parent) parent.setAttribute('aria-expanded', 'false');
    }
  });
}

function setupMobileDropdowns() {
  const mediaQuery = window.matchMedia(MOBILE_NAV_QUERY);
  const navParents = document.querySelectorAll('.nav-parent');

  navParents.forEach((parent) => {
    parent.setAttribute('aria-haspopup', 'true');
    parent.setAttribute('aria-expanded', 'false');

    parent.addEventListener('click', (event) => {
      if (!mediaQuery.matches) return;
      event.preventDefault();

      const group = parent.closest('.nav-group');
      if (!group) return;

      const willOpen = !group.classList.contains('is-open');
      closeMobileMenus(group);
      group.classList.toggle('is-open', willOpen);
      parent.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!mediaQuery.matches) return;
    if (!event.target.closest('.nav-group')) {
      closeMobileMenus();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenus();
    }
  });

  mediaQuery.addEventListener('change', (event) => {
    if (!event.matches) {
      closeMobileMenus();
    }
  });
}

document.addEventListener('DOMContentLoaded', setupMobileDropdowns);


function normalizeRegionKeyword(value) {
  return (value || '').toString().replace(/\s+/g, '').toLowerCase();
}

function setupRegionSearch() {
  document.querySelectorAll('[data-region-search-scope]').forEach((scope) => {
    const searchArea = scope.closest('section') || scope.parentElement || document;
    const input = scope.querySelector('[data-region-search-input]');
    const list = scope.querySelector('[data-region-search-list]') || searchArea.querySelector('[data-region-search-list]');
    const items = list ? Array.from(list.querySelectorAll('[data-region-search-item]')) : [];
    const meta = scope.querySelector('.region-search-meta');
    let count = scope.querySelector('[data-region-search-count]');
    const empty = scope.querySelector('[data-region-search-empty]') || searchArea.querySelector('[data-region-search-empty]');
    if (!input || !items.length) return;

    const totalCount = items.length;
    if (meta) {
      meta.innerHTML = `검색결과 <strong data-region-search-count>0</strong> / 전체 ${totalCount}개`;
      count = meta.querySelector('[data-region-search-count]');
    }

    const showEmptyMessage = (message) => {
      if (!empty) return;
      empty.textContent = message;
      empty.hidden = false;
    };

    const hideEmptyMessage = () => {
      if (empty) empty.hidden = true;
    };

    const update = () => {
      const keyword = normalizeRegionKeyword(input.value);
      let visibleCount = 0;

      items.forEach((item) => {
        const targetText = normalizeRegionKeyword(item.getAttribute('data-region-search-text') || item.textContent);
        const isVisible = Boolean(keyword) && targetText.includes(keyword);
        item.classList.toggle('is-hidden', !isVisible);
        if (isVisible) visibleCount += 1;
      });

      if (count) count.textContent = String(visibleCount);

      if (!keyword) {
        showEmptyMessage('지역명을 입력하면 해당하는 하위지역만 표시됩니다.');
      } else if (visibleCount === 0) {
        showEmptyMessage('검색 결과가 없습니다. 지역명을 줄여서 다시 입력해보세요.');
      } else {
        hideEmptyMessage();
      }
    };

    input.addEventListener('input', update);
    update();
  });
}

document.addEventListener('DOMContentLoaded', setupRegionSearch);
