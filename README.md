Vue.js T9N plugin
---

## Advantages

- No need to write keys to text in data set
- The directive can be defined once for component and works for all child tags
- Ability to write section specific translations
- Translation data set can be represented as relational model
- Regexp support

## Demo

- [Codepen](https://codepen.io/Ni55aN/pen/MzLgvo)

## Getting started

```js
import T9N from 'vue-t9n';

Vue.use(T9N);


new Vue({
  mounted() {
    this.$setTranslations(dataset);
    this.$setLocale('ua');
  }
});
```

Dataset example:

```js
[
    ['1 день', {en: '1 day', ua: '1 день'}],
    [/^([2-4]) дня$/, {en: '$1 days', ua: '$1 дні'}],
    [/^(\d*) дней$/, {en: '$1 days', ua: '$1 днів'}],
    ['плагин', {en: "plugin", ua: 'плагін'},'sectionid'] // section name in lowercase
]
```

Component's template:

```html
<div id="app" v-t9n>
    <div>{{days}} дней</div>
</div>
```

```html
<div id="app" v-t9n.deep="sectionid">
    <p>плагин</p>
    <div>1 день</div>
</div>
```

Function translation (in some cases)
```html
<div id="app">
    <p>{{$t('плагин')}}</p>
</div>
```

The `deep` modifier is required to do translations inside slots

