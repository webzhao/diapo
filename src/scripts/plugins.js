"use strict";

import Prism from 'prismjs';

/**
 * syntax highlighter
 */
export const syntaxHighlighter = {
  afterRender(diapo) {
    Prism.highlightAll(true);
  }
};

/**
 * insert font-awesome icons
 */
export const fontawesome = {
  beforeParse(diapo) {
    const pattern = /:(fa-[\w\d-]+):/mg;
    diapo.content = diapo.content.replace(pattern, '<i class="fa $1"></i>');
  }
};

/**
 * add pipeline support in markdown
 */
export const pipeline = {
  beforeParse(diapo) {
    const pattern = /\|->\s*\n\s*/mg;
    diapo.content = diapo.content.replace(pattern, '');
  }
};

/**
 * font zooming
 */
export const fontZoom = {
  beforeParse(diapo) {
    const pattern1 = /(\s+)<<(\++)(?=\s+)/mg;
    const pattern2 = /(\s+)\++>>(?=\s+)/mg;
    diapo.content = diapo.content.replace(pattern1, (m, g1, g2) => {
      const zoom = Math.ceil(Math.pow(1.2, g2.length) * 100);
      return `${g1}<span style="font-size: ${zoom}%">`;
    }).replace(pattern2, '$1</span>');
  }
};

/**
 * two column layout
 */
export const twoColumn = {
  beforeParse(diapo) {
    const pattern1 = /<<\|-\|-\|/g;
    const pattern2 = /\|>>(?=\s+)/mg;
    diapo.content = diapo.content.replace(pattern1, '<span class="two-column">')
      .replace(pattern2, '</span>');
  }
};

/**
 * iframe
 */
export const iframe = {
  beforeParse(diapo) {
    const pattern = /iframe\(([^\)]+)\)/ig;
    const template = '<iframe frameborder="0" $1></iframe>';
    diapo.content = diapo.content.replace(pattern, template);
  }
};

/**
 * progress bar
 */
export const progress = {
  afterRender(diapo) {
    const progress = document.createElement('progress');
    progress.max = 1;
    diapo.container.appendChild(progress);
  },
  afterTransition(diapo) {
    const progress = diapo.container.querySelector('progress');
    progress.value = (diapo.current + 1) / diapo.slides.length;
  }
};

