# Component QOGImage and Directive v-q-og-image

[![npm](https://img.shields.io/npm/v/@tyrsolutions/quasar-ui-qogimage.svg?label=@tyrsolutions/quasar-ui-qogimage)](https://www.npmjs.com/package/@tyrsolutions/quasar-ui-qogimage)
[![npm](https://img.shields.io/npm/dt/@tyrsolutions/quasar-ui-qogimage.svg)](https://www.npmjs.com/package/@tyrsolutions/quasar-ui-qogimage)

**Compatible with Quasar UI v2 and Vue 3**.

> Currently this component converts any template to svg. Work is being done to replicate the same functionality of Nuxt-ogimage component in quasar.


# Component QOGImage
The component uses satori and satori-html to generate an svg image of a vue component file. By adding the component to your template with ```QOGImage``` and providing attributes
```js
:template="{imported temlate goes here}"
```
along with
```js
:templateProps="{template props object}"
```
and
```js
:config="{satori configuration object}"
```
the template provided will recieve the props, then be converted to html string. This string is then applied to a vue render function returned by the component.

# Directive v-q-og-image
Similar to above, though the three component element attributes are wrapped into an object and directive can be added to most html tags with an object
```js
{
    template: ogTemplate,
    templateProps: tempProps,
    config: config,
}
```
provided to it.


# Usage

## Quasar CLI project


Install the [App Extension](../app-extension).

**OR**:


Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from '@tyrsolutions/quasar-ui-qogimage'

Vue.use(Plugin)
```

**OR**:

```html
<template>
<QOGImage :template="{imported temlate goes here}" :templateProps="{template props object}" :config="{satori configuration object}" />
<div v-q-og-image="{ template: {imported temlate goes here}, templateProps: {template props object}, config: {satori configuration object}, }"></div>
</template>

<script>
import { Component as QOGImage, Directive } from '@tyrsolutions/quasar-ui-qogimage'
imp

export default {

  components: {
    QOGImage
  },


  directives: {
    Directive
  }

}
</script>
```

## Vue CLI project

```js
import Vue from 'vue'
import Plugin from '@tyrsolutions/quasar-ui-qogimage'

Vue.use(Plugin)
```

**OR**:

```html
<template>
<QOGImage :template="{imported temlate goes here}" :templateProps="{template props object}" config: config />
<div v-q-og-image="{ template: ogTemplate, templateProps: tempProps, config: config }"></div>
</template>

<script>
import { Component as QOGImage, Directive } from '@tyrsolutions/quasar-ui-qogimage'

export default {

  components: {
    QOGImage
  },


  directives: {
    Directive
  }

}
</script>
```

## UMD variant

Exports `window.qOGImage`.

Add the following tag(s) after the Quasar ones:

```html
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/@tyrsolutions/quasar-ui-qogimage/dist/index.umd.min.js"></script>
</body>
```

## Component & Directive inputs
Both component and directive expect 3 seperate objects:

### Template
The template object, is a vue component import. Simply import the template and add it to the directive or component.

### Template props
The props object expects an object of key / value pairs that will match your template props. These props then get passed to the template when rendered, before the template is converted to svg.

### Config
The config requires a modified satori configuraiton object. As of right now, the only difference is the fonts attribute of the config object. Normally satori expects an array buffer of a font file, which satori requires, for generating the svg file and is part of teh svg calculations. As of right now, the data attribute of the font declaration is removed and url attribute added. The object looks something like:

```js
{
  height: 628,
  width: 1200,
  fonts: [
    {
      name: 'Roboto',
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-400-normal.ttf',
      weight: 400,
      style: 'normal',
    },
  ],
}
```
The url field will be used to fetch the font file, create an array buffer of it, and pass it to satori as a data attribute. Multiple font declarations may be used in the fonts array and each one will be converted for satori.

<!-- # Donate
If you appreciate the work that went into this, please consider [donating to Quasar](https://donate.quasar.dev). -->

# License
MIT (c) Matthew Marino <matthew.asdos@gmail.com>
