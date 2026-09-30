import hljs from './highlightjs/core.min.js';
import alLanguage from './highlightjs/al.js';

function extendedAlLanguage(highlight) {
  const language = alLanguage(highlight);

  // SecretText was added to AL after the upstream grammar's built-in type list.
  language.keywords.built_in += ' secrettext';

  return language;
}

function decoratePlainIdentifiers(code) {
  const textNodes = [];
  const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const node = walker.currentNode;

    if (!node.parentElement.closest('span[class*="hljs-"]')) {
      textNodes.push(node);
    }
  }

  textNodes.forEach((node) => {
    const source = node.nodeValue;
    const tokens = /"(?:[^"]|"")*"|'(?:[^']|'')*'|\b(?:this|[A-Z][A-Za-z0-9_]*)\b|::|:=|<>|<=|>=|\+=|-=|\*=|\/=|[=+\-*/]/g;
    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let match;

    while ((match = tokens.exec(source)) !== null) {
      const token = match[0];
      const tokenEnd = match.index + token.length;

      fragment.append(source.slice(cursor, match.index));

      if (/^"/.test(token)) {
        const span = document.createElement('span');
        span.className = 'hljs-quoted-identifier';
        span.textContent = token;
        fragment.append(span);
      } else if (/^'/.test(token)) {
        fragment.append(token);
      } else {
        const span = document.createElement('span');
        const next = source.slice(tokenEnd);
        const previous = source.slice(0, match.index);

        if (/^(?:::|:=|<>|<=|>=|\+=|-=|\*=|\/=|[=+\-*/])$/.test(token)) {
          span.className = 'hljs-operator';
        } else if (/\[\s*$/.test(previous) && /^\s*\]/.test(next)) {
          span.className = 'hljs-attribute';
        } else if (/^\s*\(/.test(next)) {
          span.className = 'hljs-title function_';
        } else if (/::\s*$/.test(previous)) {
          span.className = 'hljs-symbol';
        } else {
          span.className = 'hljs-variable';
        }

        span.textContent = token;
        fragment.append(span);
      }

      cursor = tokenEnd;
    }

    if (cursor === 0) {
      return;
    }

    fragment.append(source.slice(cursor));
    node.replaceWith(fragment);
  });
}

hljs.registerLanguage('al', extendedAlLanguage);

function highlightAlCode() {
  document.querySelectorAll('code.language-al').forEach((code) => {
    if (code.dataset.alHighlighted === 'true') {
      return;
    }

    const result = hljs.highlight(code.textContent, {
      language: 'al',
      ignoreIllegals: true,
    });

    code.innerHTML = result.value;
    decoratePlainIdentifiers(code);
    code.classList.add('hljs');
    code.dataset.alHighlighted = 'true';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', highlightAlCode, { once: true });
} else {
  highlightAlCode();
}
