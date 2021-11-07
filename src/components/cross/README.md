# Shapla WC Cross

A versatile delete cross as HTML5 custom element (Web component)

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/web-components
```

# Usage

```js
import {ShaplaWcCross} from '@shapla/web-components';

// Register as custom element 
window.customElements.define('shapla-wc-cross', ShaplaWcCross);
```

```html

<shapla-wc-cross size="large" onClick="handleClick"/></shapla-wc-cross>
```

### Props

| Property      | Type      | Required  | Default   | Description
|---------------|-----------|-----------|-----------|--------------------------------------------------------
| `size`        | String    | **no**    | `normal`  | Value can be `normal` or `small` or `medium` or `large`.
| `ariaLabel`   | String    | **no**    | `close`   | Value for html `aria-label` attribute
