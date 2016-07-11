import MarkdownIt from 'markdown-it/dist/markdown-it.js';
import yaml from 'yaml';

/**
 * parse markdown content and return html
 */
export function parse(content) {
  const markdownit = new MarkdownIt({
    html: true
  });
  const html = content.split(/\n\-{3,}\s*\n/m).map(md => {
    //extract meta
    const matched = /^(\w+:[^\n]+\n)+/.exec(md);
    const metaText = matched ? matched[0] : '';
    const meta = metaText ? yaml.eval(metaText) : {};
    const html = markdownit.render(md.substr(metaText.length));
    return generateSlide(html, meta);
  }).join('\n');
  return {html};
}

/**
 * generate slide html from content and meta object
 */
function generateSlide(contentHtml, meta) {
  return `<section class="diapo-slide">
            <div class="diapo-content">${contentHtml}</div>
          </section>`;
}

