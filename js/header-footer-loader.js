const IGNORED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:', 'javascript:'];

function isAbsoluteUrl(value) {
  return IGNORED_PROTOCOLS.some(protocol => value.startsWith(protocol)) || value.startsWith('//');
}

function shouldRewrite(value) {
  return (
    value &&
    typeof value === 'string' &&
    !value.startsWith('#') &&
    !value.startsWith('/') &&
    !isAbsoluteUrl(value)
  );
}

function rewritePaths(fragment) {
  const attrs = ['href', 'src', 'data-src', 'action'];
  fragment.querySelectorAll('*').forEach((node) => {
    attrs.forEach((attr) => {
      const value = node.getAttribute(attr);
      if (shouldRewrite(value)) {
        node.setAttribute(attr, `/${value}`);
      }
    });
  });
}

async function injectGlobalFragment(selector, fragmentQuery) {
  const placeholder = document.querySelector(selector);
  if (!placeholder) return;

  try {
    const response = await fetch('/index.html');
    if (!response.ok) return;

    const htmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const fragment = doc.querySelector(fragmentQuery);
    if (!fragment) return;

    const cloned = fragment.cloneNode(true);
    rewritePaths(cloned);
    placeholder.replaceWith(cloned);
  } catch (error) {
    console.warn('Header/Footer loader failed:', error);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  injectGlobalFragment('#global-header', 'header#header, header.header');
  injectGlobalFragment('#global-footer', 'footer.footer, footer.footer-section');
});
