export function downloadJSON(name, value) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function escapeHTML(value) {
  return String(value).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
}
export function readJSONFile(file, maxBytes = 100000) {
  if (!file) return Promise.reject(new Error('Choose a JSON file first.'));
  if (file.size > maxBytes)
    return Promise.reject(new Error('File is too large. Maximum size: 100 KB.'));
  return file.text().then((text) => JSON.parse(text));
}
