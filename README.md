# Diapo.js: web presentation made easy!

:red_circle: Note: this project is still under development, use it at your own risk.

Diapo.js is a framework which transform markdown to web-based presentation.

## Features

- [x] Markdown content
- [x] Plugins
- [x] Syntax highlighting
- [ ] Theming
- [ ] Transition
- [ ] Fragment
- [ ] Remote Control and Notes
- [ ] Print
- [ ] Scopped Style

## Usage

```html
<div id="container"></div>

<script type="text/diapo" id="content">
# My cool presentation
### by webzhao

---

## Slide 1

- item 1
- item 2

---

## Thank you!
</script>

<script src="path/to/diapo.js"></script>
<script>
  const content = document.getElementById('content').innerHTML;
  const presentation = new Diapo({
    content,
    el: '#container'
  });
</script>
```

In the example above, the markdown content is embedded in the HTML file. You can also fetch the content from an URL with a HTTP request.

## Options

| Option  | type        | required | default | description                             |
|---------|-------------|----------|---------|-----------------------------------------|
| content | String      | yes      | -       |content of the slides in markdown format |
| el      | String/Node | no       | 'body'  |container of the slides                  |

## Plugins

Diapo.js has some built-in plugins. You can use them without any effort. 

#### Syntax Highlighting

Diapo.js uses [prism](http://prismjs.com/) for syntax highlighting. All you need to do is place your codes in `fenced code block` and indicate your language type after the opening code fence.

    ```javascript
    const value = 42;
    ```

#### FontAwesome icons

`:fa-calendar:` will be transformed to `<i class="fa fa-calendar"></i>` which is a calendar icon when rendered.

#### Lines joinning

Line ends with `|->` will be joined with next line. For example:

```markdown
# This is a very |->
 long title
```

will be transformed to:

```markdown
# This is a very long title
```

#### Font zooming

In some cases, you may want to zoom in some text in the slides. Content embraced between `<<+` and `+>>` will be displayed at 120% of its original size.

```markdown
Diapo.js is really <<+ Cool +>> !
```

If you want it bigger, just put more `+` after `<<`: `<<++++++ huge text +>`.

Please note that, spaces is needed after `<<+` and before `+>>`.

#### iframe

You want insert an `iframe` to your slides? 

```markdown
iframe(src="https://github.com" width="800")
```

The `src` attribute is required but `width`/`height` is optional.


## Writing a Plugin

Add plugins to diapo.js is really simple. 













