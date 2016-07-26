"use strict";

import Prism from 'prismjs';
import { $$ } from './util';

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
    const pattern1 = /(\s+)<<(\++|\-+)(?=\s+)/mg,
          pattern2 = /(\s+)(\++|\-+)>>(?=\s+)/mg;
    diapo.content = diapo.content.replace(pattern1, (m, g1, g2) => {
      const factor = g2[0] == '+' ? 1.2 : 0.8;
      const zoom = Math.ceil(Math.pow(factor, g2.length) * 100);
      return `${g1}<span style="font-size: ${zoom}%">`;
    }).replace(pattern2, '$1</span>');
  }
};

/**
 * two column layout
 */
export const twoColumn = {
  beforeParse(diapo) {
    const pattern1 = /<<\|-\|-\|/g,
          pattern2 = /\|>>(?=\s+)/mg;
    diapo.content = diapo.content.replace(pattern1, '<span class="two-column">')
      .replace(pattern2, '</span>');
  }
};

/**
 * iframe
 */
export const iframe = {
  beforeParse(diapo) {
    const pattern = /iframe\(([^\)]+)\)/ig,
          template = '<iframe frameborder="0" $1></iframe>';
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

/**
 * themes
 */
export const themes = {
  afterRender(diapo) {
    const theme = diapo.option.theme || 'default',
          mainCSS = document.querySelector('link[href$="diapo.css"]'),
          path = `${mainCSS.href.replace(/[^\/]+$/, '')}/themes/${theme}.css`,
          link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = path;
    link.onerror = e => {
      alert(`Failed to load style for theme "${theme}"`);
    };
    document.head.appendChild(link);
  }
};

/**
 * transitions
 */
export const transitions = {
  afterRender(diapo) {
    const transition = diapo.option.transition || 'default';
    diapo.container.classList.add(`transition-${transition}`);
  }
};

/**
 * touch screen support
 */
export const touch = {
  afterRender(diapo) {
    if (!'ontouchstart' in window) return;
    let startX, startTime, endX;
    const ontouchstart = e => {
      e.preventDefault();
      startX = e.touches[0].pageX;
      startTime = +new Date();
      window.addEventListener('touchmove', ontouchmove);
    };
    const ontouchmove = e => {
      e.preventDefault();
      endX = e.touches[0].pageX;
    };
    const ontouchend = e => {
      window.removeEventListener('touchmove', ontouchmove);
      const duration = +new Date() - startTime;
      const distance = endX - startX;
      if (Math.abs(distance) > 30 && duration < 800) {
        this.transition(distance > 0 ? 'prev' : 'next');
      }
    };
    window.addEventListener('touchstart', ontouchstart);
    window.addEventListener('touchend', ontouchend);
    window.addEventListener('touchcancel', ontouchend);
  }
};

/**
 * style
 */
export const style = {
  afterRender(diapo) {
    diapo.slides.forEach((slide, index) => {
      const cssText = diapo.metas[index].style;
      cssText && (slide.style.cssText += cssText);
    });
  }
};

/**
 * fragment
 */
export const fragment = {
  afterRender(diapo) {
    diapo.slides.forEach((slide, index) => {
      if (!diapo.metas[index].fragment) return;
      const selector = `
        .diapo-content > ul > li,
        .diapp-content > ol > li,
        .diapo-content > p,
        .diapo-content > blockquote,
        .diapo-content > pre
      `;
      const items = $$(selector, slide);
      items.forEach(item => item.classList.add('fragment'));
    });
  },
  beforeTransition(diapo, dir) {
    const slide = diapo.slides[diapo.current],
          fragments = $$('.fragment', slide),
          toStatus = dir === 'next' ? 'visible' : 'hidden',
          remains = fragments.filter(f => f.style.visibility != toStatus);
    if (!remains.length) return;
    remains[dir === 'next' ? 'shift' : 'pop']().style.visibility = toStatus;
    return false;
  }
};


/**
 * speech
 */
export const speech = {
  afterRender(diapo) {
    diapo.slides.forEach((slide, index) => {
      const speech = diapo.metas[index].speech;
      if (!speech) return;
      const audio = document.createElement('audio');
      audio.className = 'speech';
      audio.preload = true;
      audio.src = speech;
      slide.appendChild(audio);
    });
  },
  afterTransition(diapo) {
    const speech = diapo.metas[diapo.current].speech;
    $$('.speech').forEach(a => a.pause());
    if (!speech) return;
    const audio = diapo.container.querySelector('.speech');
    audio.currentTime = 0;
    audio.play();
  }
};


/**
 * background image
 */
export const backgroundImage = {
  afterRender(diapo) {
    diapo.slides.forEach((slide, index) => {
      const image = diapo.metas[index].bgimage;
      if (!image) return;
      slide.style.cssText += `
        background: url(${image}) no-repeat center center;
        background-size: cover;
      `;
    });
  }
};

/**
 * background color
 */
export const backgroundColor = {
  afterRender(diapo) {
    diapo.slides.forEach((slide, index) => {
      const color = diapo.metas[index].bgcolor;
      const namedColors = {
        red: '#F44336',
        pink: '#E91E63',
        purple: '#9C27B0',
        deeppurple: '#673AB7',
        indigo: '#3F51B5',
        blue: '#2196F3',
        lightblue: '#03A9F4',
        cyan: '#00BCD4',
        teal: '#009688',
        green: '#4CAF50',
        lightgreen: '#8BC34A',
        lime: '#CDDC39',
        yellow: '#FFEB3B',
        amber: '#FFC107',
        orange: '#FF9800',
        deeporange: '#FF5722',
        brown: '#795548',
        grey: '#9E9E9E',
        bluegrey: '#607D8B'
      };
      if (!color) return;
      slide.style.cssText += `
        background-color: ${namedColors[color]||color}
      `;
    });
  }
};

