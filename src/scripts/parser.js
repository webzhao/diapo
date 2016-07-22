import MarkdownIt from 'markdown-it/dist/markdown-it.js';

/**
 * parse markdown content and return html
 */
export function parse(content) {
  const slides = content.split(/\n\-{3,}\s*\n/m).map(md => {
    //extract meta
    const matched = /^(\w+:[^\n]+\n)+/.exec(md);
    const metaText = matched ? matched[0] : '';
    const meta = metaText ? parseMeta(metaText) : {};
    const markdown = md.substr(metaText.length);
    const html = renderSlide(markdown);
    return {meta, html, markdown};
  });
  let option = {};
  if (!slides[0].markdown.trim()) { //first meta as slides option
    option = slides[0].meta;
    slides.splice(0, 1);
  }
  const html  = slides.map(slide => slide.html).join('');
  const metas = slides.map(slide => slide.meta);
  return {html, option, metas};
}

/**
 * render slide
 */
const renderSlide = md => {
  const markdownit = new MarkdownIt({html: true});
  const html = markdownit.render(md);
  return `<section class="diapo-slide">
            <div class="diapo-content">${html}</div>
          </section>`;
};

/**
 * parse yaml
 */
const parseMeta = text => text.trim().split('\n').map(l => l.split(/\s*:\s*(.*)?/)).reduce((meta, arr) => {
  meta[arr[0]] = arr[1];
  return meta;
}, {});


