import {$, $$, sliceWithPadding} from './util';
import {parse} from './parser';
import * as plugins from './plugins';

const classNames = ['prev', 'current', 'next'];
const userPlugins = {};

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
    Object.assign(this, parse(this.content));
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
      ArrowDown: 'next',
      ArrowLeft: 'prev',
      ArrowUp: 'prev'
    };
    window.addEventListener('keyup', e => {
      const action = actions[e.key];
      action && this.transition(action) && e.preventDefault();
    });
  }

  /**
   * transition to next/prev page
   */
  transition(dir) {
    const result = this.runPlugin('beforeTransition', dir);
    if (result.filter(r => r === false).length) return;
    this[dir]();
  }

  /**
   * get plugins
   */
  getPlugins() {
    Object.assign(plugins, userPlugins);
    return Object.keys(plugins).map(name => {
      plugins[name].name = name;
      return plugins[name];
    });
  }

  /**
   * run plugins at specified phase
   * @param phase (beforeParse|afterParse|afterRender)
   */
  runPlugin(phase, ...params) {
    return this.plugins.map(p => {
      if (typeof p[phase] === 'function') return p[phase].call(this, this, ...params);
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
  static addPlugin(name, plugin) {
    userPlugins[name] = plugin;
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
    requestAnimationFrame(f => {
      [document.body, document.documentElement].forEach(e => {
        e.scrollTop && (e.scrollTop = 0);
      });
      this.runPlugin('afterTransition');
    });
  }

}

