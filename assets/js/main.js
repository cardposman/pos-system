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
    const input = scope.querySelector('[data-region-search-input]');
    const items = Array.from(scope.querySelectorAll('[data-region-search-item]'));
    const count = scope.querySelector('[data-region-search-count]');
    const empty = scope.querySelector('[data-region-search-empty]');
    if (!input || !items.length) return;

    const update = () => {
      const keyword = normalizeRegionKeyword(input.value);
      let visibleCount = 0;

      items.forEach((item) => {
        const targetText = normalizeRegionKeyword(item.getAttribute('data-region-search-text') || item.textContent);
        const isVisible = !keyword || targetText.includes(keyword);
        item.classList.toggle('is-hidden', !isVisible);
        if (isVisible) visibleCount += 1;
      });

      if (count) count.textContent = String(visibleCount);
      if (empty) empty.hidden = visibleCount !== 0;
    };

    input.addEventListener('input', update);
    update();
  });
}

document.addEventListener('DOMContentLoaded', setupRegionSearch);
