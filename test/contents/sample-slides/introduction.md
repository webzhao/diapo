theme: material
transition: slide

---

# Diapo.js

Web presentation made easy!

---

## Diapo.js ?

* A web presentation framework
* Create slides using `markdown`
* Theming
* Transition
* Syntax highlighting
* Mobile friendly
* ... more funs with plugin

---

## How to use it

<<--

```markup
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
  const content = document.
    getElementById('content').innerHTML;
  const presentation = new Diapo({
    content,
    el: '#container'
  });
</script>
```

->>

---

## `Markdown` in a seperate file

<<-

```markup
<div id="diapo"></div>
<script src="../dist/diapo.js"></script>
<script>
  const contentUrl = 'path/to/file.md';
  fetch(contentUrl).then(res => res.text()).then(
    content => new Diapo({
      content
      el: '#diapo'
    })
  );
</script>
```

->>

---

## Writing slides using `markdown`

* Using `"---"` to seperate each slide
* Using `"key: value"` to config slide
* Put presentation level config to first empty slide
* Example:

```markdown
  theme: material
  transition: fade

  ---

  bgcolor: blue

  # Presentation Title
  ### author@example.com

  ---

  ## Outline

  * Point One
  * Point Two
  * Point Three
```

---

## Theming

* Config `theme` in markdown file
* Available themes: `default` / `material`
* Example:

```markdown
  theme: material

  ---

  # Presentation title

  ---

  ## Slide title
```

---

## Transition

* Config `transition` in markdown file
* Available transitions: `default` / `slide` / `fade`
* Example:

```markdown
  theme: material
  transition: slide

  ---

  # Presentation title

  ---

  ## Slide title
```

---

fragment: true

## Fragment

* Press `Right Arrow` or `Pagedown`
* to show each fragment,
* just put `fragment: true` at
* top of the slide like this:

```markdown
  ## Normal slides

  ---

  fragment: true

  ## Fragmented slides

  * Point One
  * Point Two
```

---


## Syntax Highlighting

* Codes are syntax highlighted using `prism.js`
* Just fence your code with ``` like this:
  ```markdown
      ```javascript

      const a = [1, 2, 3];

      ```
  ```
* And your code is highlighted:

```javascript
      const a = [1, 2, 3];
```


---

## Adjust font size

* Text can be <<+ large +>> , <<++ larger +>> , <<+++++ huge +>>
* Or it can be <<- small ->> , <<-- smaller ->> , <<----- tiny ->>
* To get this:

<div style="font-family: monospace;margin-left: 2em; font-size: 0.8em">

<<&#8203;+ large +&#8203;>>  
<<++&#8203; larger +&#8203;>>  
<<&#8203; +++++huge +&#8203;>>  
<<&#8203;- small -&#8203;>>  
<<&#8203;-- smaller -&#8203;>>  
<<&#8203;----- tiny -&#8203;>>

</div>

---

## Texts are dull, add some icons :fa-smile-o:

* You can use [FontAwesome](http://fontawesome.io/) icons in diapo.js
* :fa-calendar&#8203;: will be displayed as :fa-calendar:
* and :fa-star&#8203;: will be displayed as :fa-star:

---

## Iframes

iframe(src="http://example.com/" height="460" width="800")

<div style="font-family: monospace; margin: 1em 2em">
iframe&#8203;(src="http://example.com/")
</div>

---

## Two cloumn layout

<<|-|-|

If you have a lot of contents in one slide, you can put them to a two column layout. People have trouble reading text if lines are too long; if it takes too long for the eyes to move from the end of the one line to the beginning of the next, they lose track of which line they were on. It's very simple in `diapo.js`:

<div style="font-family: monospace; font-size: 0.8em; white-space:pre"><<&#8203;|-|-|
Content in two column ...
|>
</div>

|>>

---

bgcolor: indigo

## Background color

* Add `bgcolor:indigo` at beginning of the slide
* Then you will get what you are seeing now
* The value can be any valid CSS color
* Or color names listed in [Material Design Color](https://material.google.com/style/color.html)

---

bgimage: http://p1.qhimg.com/d/inn/88133528/homepage_02.png

## Background image

`bgimage: http://path/to/image.png`

---

style: color: #f08080; background: black

## Style

* Add arbitrary CSS style to slide `Node`
* `style: color:#f08080; background:black`

---

speech: http://s5.qhimg.com/static/4dc1d31fd0c9ad17.mp3

## Speech / Background Music

Add Music to the slide:

```
speech: http://path/to/music.mp3

## Slide title

```

---

## Plugins

<<-

```javascript
/**
 * Add plugin to diapo.js is very easy. Here is a sample plugin  
 * which replace all `"foo"` with `"bar"` in the presentation :
 * Call Diapo.addPlugin method to register your plugin.
 * The first parameter is name of the plugin;
 * The second parameter is descriptor of the plugin
 */
Diapo.addPlugin('foo2bar', {
  beforeParse(diapo) {
    diapo.content = diapo.content.replace(/foo/m, bar);
  }
});
```

->>

---

## Life cycle of Diapo.js instance

<<-

| callback | description |
|----------|-------------|
| `beforeParse` | before transform markdown to html
| `afterRender` | after render slides html to web page
| `beforeTransition` | before transition to other slide
| `afterTransition` | after transition to other slide

->>

---

## Properties of Diapo.js instance

<<-

| property | description |
|----------|-------------|
| `content` | markdown content of the presentation
| `current` | page of current slide, starting from 0
| `container` | container Node of the presentation
| `slides` | DOM Node list of each slides
| `metas` | config list of each slides
| `option` | configs defined at beginning of the presentation

->>

---

# [:fa-github:](https://github.com/webzhao/diapo) |->
  [:fa-envelope-o:](mailto:webzhao@gmail.com) |->
  [:fa-twitter:](https://twitter.com/webzhao)

