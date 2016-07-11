import {$, $$, sliceWithPadding} from './util';
import {parse} from './parser';
import * as plugins from './plugins';

const classNames = ['prev', 'current', 'next'];

export default Diapo;

class Diapo {

  /**
   * constructor
   */
  constructor({el, content}) {

    // init values
    this.current = 0;
    this.content = content;
    this.plugins = this.getPlugins();
    this.initContainer();

    // parse
    this.runPlugin('beforeParse');
    this.parse();
    this.runPlugin('afterParse');

    // render
    this.renderContent();
    this.runPlugin('afterRender');

    //start up
    this.bindEvents();
    this.initRouter();

  }

  /**
   * init container
   */
  initContainer(el) {
    this.container = $(el || 'body');
    this.container.classList.add('diapo-container');
  }

  /**
   * parse markdown to html
   */
  parse() {
    this.html = parse(this.content).html;
  }

  /**
   * render content
   */
  renderContent() {
    this.container.innerHTML = this.html;
    this.slides = $$('.diapo-slide');
  }

  /**
   * binding keyboard & mouse events
   */
  bindEvents() {
    const actions = {
      ArrowRight: 'next',
      ArrowLeft: 'prev'
    };
    window.addEventListener('keyup', e => {
      const action = actions[e.key];
      action && this[action]() && e.preventDefault();
    });
    // touch screen support
    if ('ontouchstart' in window) {
      let startX, startTime, endX;
      const ontouchstart = e => {
        startX = e.touches[0].pageX;
        startTime = +new Date();
        window.addEventListener('touchmove', ontouchmove);
      };
      const ontouchmove = e => {
        endX = e.touches[0].pageX;
      };
      const ontouchend = e => {
        window.removeEventListener('touchmove', ontouchmove);
        const duration = +new Date() - startTime;
        const distance = endX - startX;
        if (Math.abs(distance) > 30 && duration < 800) {
          this[distance > 0 ? 'prev' : 'next']();
        }
      };
      window.addEventListener('touchstart', ontouchstart);
      window.addEventListener('touchend', ontouchend);
      window.addEventListener('touchcancel', ontouchend);
    }
  }

  /**
   * get plugins
   */
  getPlugins() {
    return Object.keys(plugins).map(name => {
      plugins[name].name = name;
      return plugins[name];
    });
  }

  /**
   * run plugins at specified phase
   * @param phase (beforeParse|afterParse|afterRender)
   */
  runPlugin(phase) {
    this.plugins.forEach(p => {
      typeof p[phase] === 'function' &&p[phase].call(this, this);
    });
  }

  /**
   * handle router
   */
  initRouter() {
    const onHashChange = e => {
      const to = parseInt(location.hash.substr(1)) || 0;
      this.go(to);
    };
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
  }

  /**
   * add plugin
   */
  static addPlugin(plugin) {
  }

  /**
   * next
   */
  next() {
    if (this.current === this.slides.length - 1) { //last
      return;
    }
    location.hash = this.current + 1;
  }

  /**
   * previous
   */
  prev() {
    if (this.current === 0) { //first
      return;
    }
    location.hash = this.current - 1;
  }

  /**
   * go to slide by index
   */
  go(index) {
    const current = this.current;
    sliceWithPadding(this.slides, current - 1, current + 2).forEach((slide, index) => {
      slide && slide.classList.remove(classNames[index]);
    });
    sliceWithPadding(this.slides, index - 1, index + 2).forEach((slide, index) => {
      slide && slide.classList.add(classNames[index]);
    });
    this.current = index;
  }

}

