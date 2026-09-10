// View-only localization. Domain identifiers and authored content remain unchanged.
import { portuguese } from './translations.js';
const key = 'portfolio.language.v1';
export let language = 'en';
try {
  if (globalThis.localStorage?.getItem(key) === 'pt') language = 'pt';
} catch {}
const escapePattern = (s) =>
  [...s].map((c) => ('.*+?^${}()|[]\\'.includes(c) ? '\\' + c : c)).join('');
const templates = Object.entries(portuguese)
  .filter(([s]) => /\{\d+\}/.test(s))
  .map(([en, pt]) => {
    const indices = [...en.matchAll(/\{(\d+)\}/g)].map((m) => Number(m[1]));
    return {
      regex: new RegExp(
        '^' +
          en
            .split(/\{\d+\}/)
            .map(escapePattern)
            .join('(.+?)') +
          '$',
      ),
      pt,
      indices,
    };
  });
export function translate(value, locale = language, depth = 0) {
  const raw = String(value);
  if (locale !== 'pt' || depth > 6) return raw;
  const text = raw.trim().replace(/\s+/g, ' ');
  let translated = Object.hasOwn(portuguese, text) ? portuguese[text] : undefined;
  if (translated === undefined) {
    for (const { regex, pt, indices } of templates) {
      const match = text.match(regex);
      if (!match) continue;
      const args = new Map(
        indices.map((index, i) => [index, translate(match[i + 1], locale, depth + 1)]),
      );
      translated = pt.replace(/\{(\d+)\}/g, (_, n) => args.get(Number(n)));
      break;
    }
  }
  if (translated === undefined && text.includes(', ')) {
    const parts = text.split(', ');
    if (parts.every((p) => Object.hasOwn(portuguese, p)))
      translated = parts.map((p) => portuguese[p]).join(', ');
  }
  if (translated === undefined) return raw;
  return raw.match(/^\s*/)[0] + translated + raw.match(/\s*$/)[0];
}
export function localizedPlan(plan, locale = language) {
  const copy = structuredClone(plan);
  copy.title = translate(copy.title, locale);
  for (const activity of copy.activities) {
    activity.title = translate(activity.title, locale);
    activity.description = translate(activity.description, locale);
  }
  return copy;
}
export function initializeLocalization(doc = document) {
  const select = doc.getElementById('language');
  const textCache = new WeakMap(),
    attributeCache = new WeakMap();
  const ignored = (node) => node.closest('script, style, textarea, [data-verbatim]');
  const observer = new MutationObserver(() => apply());
  function apply() {
    // Disconnect while translating to avoid observing our own writes.
    observer.disconnect();
    doc.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
    select.value = language;
    const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.parentElement || ignored(node.parentElement) || !node.textContent.trim()) continue;
      const old = textCache.get(node);
      const source = old && node.textContent === old.rendered ? old.source : node.textContent;
      const rendered = translate(source);
      if (node.textContent !== rendered) node.textContent = rendered;
      textCache.set(node, { source, rendered });
    }
    for (const element of doc.body.querySelectorAll('[aria-label], [title]')) {
      if (ignored(element)) continue;
      const cache = attributeCache.get(element) ?? {};
      for (const attribute of ['aria-label', 'title']) {
        if (!element.hasAttribute(attribute)) continue;
        const current = element.getAttribute(attribute),
          old = cache[attribute];
        const source = old && current === old.rendered ? old.source : current;
        const rendered = translate(source);
        if (current !== rendered) element.setAttribute(attribute, rendered);
        cache[attribute] = { source, rendered };
      }
      attributeCache.set(element, cache);
    }
    observer.observe(doc.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['aria-label', 'title'],
    });
  }
  select.addEventListener('change', () => {
    language = select.value === 'pt' ? 'pt' : 'en';
    try {
      globalThis.localStorage?.setItem(key, language);
    } catch {}
    apply();
  });
  apply();
  return { refresh: apply, disconnect: () => observer.disconnect() };
}
