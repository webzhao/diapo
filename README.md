# :parking: Diapo.js: web presentation made easy!

> :red_circle: Note: this project is still under development, use it at your own risk.

Diapo.js is a framework which transform markdown to web-based presentation.

## Features

[*] Markdown content
[*] Plugins
[*] Syntax highlighting
[ ] Theming
[ ] Transition
[ ] Fragment
[ ] Remote Control and Notes
[ ] Print
[ ] Scopped Style

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

