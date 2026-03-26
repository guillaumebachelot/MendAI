/* =====================================================
   Publications page — renders cards from PUBLICATIONS global
   (defined in assets/data/publications-data.js)
   ===================================================== */

function parseAuthors(str) {
  // **Name** → <b>Name</b>
  return str.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
}

function renderMeta(items) {
  return items.map(item => {
    if (item.type === 'link') {
      return `<a class="pub-link-new" href="${item.href}" target="_blank" rel="noopener">${item.text}</a>`;
    }
    const cls = item.type === 'oa'  ? 'pub-badge oa'
               : item.type === 'pre' ? 'pub-badge pre'
               : 'pub-badge';
    return `<span class="${cls}">${item.text}</span>`;
  }).join('');
}

function renderCard(pub) {
  const journalClass = pub.journalStyle === 'orange'
    ? 'pub-journal-tag orange'
    : 'pub-journal-tag';

  const note = pub.titleNote
    ? ` <em class="note">[${pub.titleNote}]</em>`
    : '';

  return `
    <div class="pub-card-new">
      <div class="pub-card-top">
        <span class="${journalClass}">${pub.journal}</span>
        <span class="pub-year-tag">${pub.year}</span>
      </div>
      <div class="pub-title-new">${pub.title}${note}</div>
      <div class="pub-authors-new">${parseAuthors(pub.authors)}</div>
      <div class="pub-meta-new">${renderMeta(pub.meta)}</div>
    </div>`;
}

function renderSection(section) {
  const cards = section.publications.map(renderCard).join('');
  return `
    <div class="pub-section-block">
      <div class="pub-section-label">${section.label}</div>
      <div class="pub-list-new">${cards}</div>
    </div>`;
}

document.getElementById('pub-root').innerHTML =
  PUBLICATIONS.sections.map(renderSection).join('');
