# Shapla Web Component: Modal

A classic modal overlay as HTML5 custom element, in which you can include any content you want.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save @shapla/web-components
```

# Usage

```js
import {ShaplaWcModal} from '@shapla/web-components';

// Register as custom element 
window.customElements.define('shapla-wc-modal', ShaplaWcModal);
```

```html

<shapla-wc-modal active heading="Modal Title" content-size="full">
    Modal content goes here.
    <div slot="footer">
        <button onClose="closeModal">Close</button>
    </div>
</shapla-wc-modal>
```

### Properties/Attributes

| Name                      | Type      | Required  | Default       | Description
|---------------------------|-----------|-----------|---------------|-----------------------------------------------------------------------------------------------
| `active`                  | Boolean   | **
no**    | `false`       | Set this attribute to make modal visible                                                                                                                                                                                               |
| `type`                    | String    | **
no**    | `card`        | Currently `card` and `box` design are available. Use any name like `confirm` to get blank modal                                                                                                                 |
| `bg-theme`                | String    | **no**    | `dark`        | Value can be `dark` or `light`
| `content-size`            | String    | **no**    | `medium`      | Value can be `small`, `medium`, `large` or `full`.
| `disabled-bgclick`        | Boolean   | **
no**    | `false`       | If set this attribute, clicking outside content area will not trigger close event.
| `disabled-close`          | Boolean   | **
no**    | `false`       | If set this attribute, no closing icon will be shown

### Properties/Attributes for modal card

| Name              | Type      | Required  | Default       | Description
|-------------------|-----------|-----------|---------------|-----------------------------------------------------
| `heading`         | String    | **no**    | `Untitled`    | Card heading
| `disabled-footer` | Boolean   | **no**    | `false`       | If set this attribute, card footer will be disabled

### Events

| Event Name    | Target            | Detail    | Description
|---------------|-------------------|-----------|------------------------------------------
| `close`       | `shapla-wc-modal` | `{}`      | Fired when the user click on close icon

### CSS Custom Properties

| Name          | Default           | Description
|---------------|-------------------|-----------------------------------------------------

### Global CSS Custom Properties

| Name          | Default           | Description
|---------------|-------------------|-----------------------------------------------------
