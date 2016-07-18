
## whoami

* **赵文博**

  * 奇舞团前端工程师
  * 在做联盟和CRM

### [:fa-github:](https://github.com/webzhao) |->
   [:fa-flickr:](http://www.flickr.com/photos/53827079@N06/) |->
   [:fa-twitter:](https://twitter.com/webzhao) |->
   [:fa-linkedin:](http://cn.linkedin.com/pub/wenbo-zhao/29/7b1/514)

---

```javascript
if (a === 1) {
  console.log(a)
} else if (a != 2) {
  const f = x => x+1;
} else if (a <=3) {
  function(...a) {}
}
```

---

## 布局？

---

* box model
* float
* position

---

# No

---

## 使用CSS3可以

* 简化布局实现方式
* 实现以前不能实现的布局方式

---

跳出兼容的惯性思维，在合适的场景  
使用更高级的布局方式。

---


## box-sizing

---


<style type="text/css">
.box-model {
  width: 10em;
  height: 6em;
  background:#09c;
  box-shadow:#f80 0 0 0px 2em, #690 0 0 0 4em, #999 0 0 0 6em;
  margin: 6em auto 7.5em auto!important
}
.box-model p {
  line-height: 2em;
  position: relative;
  top: -6em;
  text-align: center;
}
</style>

<div class="box-model"><p>margin box<br>border box<br>padding box<br>content box</p></div>

```css
box-sizing: content-box | padding-box | border-box
```

---

* [Demo 1: 全屏页面和自适应表单](http://dabblet.com/gist/de697755292033c055e8)
* [Demo 2: 自适应栅格](http://codepen.io/jason-kinney/pen/cKgzi?editors=110)

---

### Bootstrap、Pure、Foundation大量使用

```css
*, *:before, *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
```

---

## box-sizing 浏览器支持

<<++

| :fa-internet-explorer: | :fa-firefox: | :fa-chrome: | :fa-opera: | :fa-apple: | :fa-android: |
|:----------------------:| ------------ | ----------- |:----------:| ---------- |:------------:|
| 8+                     |              |             | 7.0+       |            | 2.1+         |

+>>

---

## display: table


CSS 2.1

---

```css
display: table                /* <table>     */
display: table-cell           /* <td>        */
display: table-row            /* <tr>        */
display: table-column         /* <col>       */
display: table-column-group   /* <colgroup>  */
display: table-footer-group   /* <tfoot>     */
display: table-header-group   /* <thead>     */
```

---

## 使用表格布局的优点

* 简洁灵活的多栏布局
* 简单的等高解决方案
* 简单的垂直居中
* 防止一行内的元素折行

---

* [Demo 1: 多栏布局](http://dabblet.com/gist/372edba1af0c2ef44adf)
* [Demo 2: 强制一行显示](http://dabblet.com/gist/a8823614dc5cfd0f7394)
* [Demo 3: 垂直居中](http://dabblet.com/gist/2528b21a7867023c2fed)

---

## display: table 浏览器支持

<<|-|-|

- :fa-internet-explorer: 8+
- :fa-firefox:
- :fa-chrome:
- :fa-opera: 7.0+
- :fa-safari:
- :fa-apple:
- :fa-android:

|>>

---


## flexbox

---

Flexbox可控制容器内的子元素：

* 水平或垂直排成一行
* 控制子元素对齐方式
* 控制子元素的宽度/高度
* 控制子元素显示顺序
* 控制子元素是否折行

---

Flexbox是W3C布局方面标准中的*终极武器*

---

![axis](img/css3/axis.png)

---

[Flexbox Demo](http://dabblet.com/gist/95e5b65622aeae4d031d)

---

## 新旧标准

* 2009年语法
* 2012年语法

---

```css
.container {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-direction: normal;
    -webkit-box-orient: horizontal;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    -webkit-align-content: stretch;
    align-content: stretch;
}
```

---

## Flexbox浏览器支持(2009标准)

<<|-|-|

- :fa-internet-explorer: 10+
- :fa-firefox:
- :fa-chrome:
- :fa-opera: 12.1+
- :fa-safari:
- :fa-apple:
- :fa-android: 2.1+

|>>

---

## Flexbox浏览器支持(2012标准)

<<|-|-|

- :fa-internet-explorer: 11+
- :fa-firefox: 22+
- :fa-chrome: 21+
- :fa-opera: 12.1+
- :fa-safari: 6.1+
- :fa-apple: 7.0+
- :fa-android: 4.4+

|>>

---


## Multi-column Layout

---

主要解决文字内容的多列展示，实现报纸杂志效果。

---

[Demo](http://dabblet.com/gist/1e98898598d536015362)

---

## 多列显示浏览器支持

<<|-|-|

- :fa-internet-explorer: 10+
- :fa-firefox:
- :fa-chrome:
- :fa-opera: 11.1+
- :fa-safari:
- :fa-apple:
- :fa-android:

|>>

---

### CSS Region

---

让内容依次流入不同的容器。

![region](img/css3/region.png)

---

```css
.content {
    /* 内容源流入到指定管道中 */
    flow-into: <pipe-name>;
}

.region {
    /* 从指定管道中读入内容 */
    flow-from: <pipe-name>;
}
```

---

[Demo](demos/css3/region.html)

---

## CSS Region 浏览器支持

- :fa-internet-explorer: 10+
- :fa-safari: 6.1+
- :fa-apple: 7.1+

---

## CSS Shapes

---

让内容在各种形状的容器内显示。

---

```css
.content {
    /*
     * shape-outside: 将内容在围绕在一个形状外面显示
     * shape-inside: 将内容在一个形状内部显示
     */
    shape-outside: polygon( /* parameters */ );
}
```

---

## 形状

* circle( radius at position )
* polygon( position, position, position ... )
* ellipse( radius1, radius2 at position )
* inset( top, right, bottom, left, border-radius )

---

* [Demo](http://codepen.io/adobe/full/rmual)

---

## CSS Shapes浏览器支持

- <<++ :fa-chrome: +>> 37+
- <<++ :fa-safari: +>> 8.0+
- <<++ :fa-apple: +>> 8.0+

---


# <<++++++ :fa-comments: +>>

---


## 总结

<<|-|-|

* box-sizing
* display: table
* flexbox
* multiple column
* css region
* css shape

|>>

---


## 谢谢大家

## <<++++ :fa-smile-o: +>>

