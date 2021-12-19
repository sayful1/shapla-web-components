# Shapla Web Components

A collection of re-usable web components.

> This document is incomplete and under development. Feel free to contribute to improve this document.

### Why Web Components (Custom Elements)?

- A web standards-based way to create reusable components.
- It uses Shadow DOM that offers component style and markup encapsulation.
- It is supported by all major browsers support. (Chrome 54+, Safari 10.1+, and Firefox 63+, Edge 79+)
- It is light on weight and better on performance.
- It does not need any framework.
- It can be used in any environment, such as, vanilla JS, React, Angular, or any other framework.

To learn more about web component, Visit the links

[Web Components - MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

[Building Components - Google Developer](https://developers.google.com/web/fundamentals/web-components)

[Open Web Components](https://open-wc.org)

[Lit](https://lit.dev)

### List of components

<details>
<summary>cross</summary>

Under development. Coming soon...
</details>

<details>
<summary>modal</summary>
Under development. Coming soon...
</details>

<details>
<summary>pagination</summary>
Under development. Coming soon...
</details>

<details>
<summary>toggles</summary>
Under development. Coming soon...
</details>

### Developers Documentation

<details>
<summary>Initial setup</summary>

Install dependencies by running the following command in terminal:

```bash
npm install
```

</details>

<details>
<summary>Build</summary>

To build the JavaScript version of your component:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run watch
```

</details>

<details>
<summary>Dev Server</summary>

To start dev server, run the following command in terminal.

```bash
npm run dev
```

It will run `npm start` and `npm run watch` in parallel. Where `npm start` launches a server
using [serve](https://github.com/zeit/serve) and serve content from `dist` directory . Navigate
to [localhost:3000](http://localhost:3000) and `npm run watch` will continually rebuild the application as your source
files change.
</details>

<details>
<summary>Testing</summary>

This plugin uses [@web/test-runner](https://www.npmjs.com/package/@web/test-runner) along with Mocha, Chai, and some
related helpers for testing. See
the [modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for more information.

Tests can be run with the `test` script:

```bash
npm test
```

For local testing during development, the `test:watch` command will run your tests on every change to your source files:

```bash
npm test:watch
```

</details>

<details>
<summary>Linting</summary>

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage
easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json`.

To lint the project run:

```bash
npm run lint
```

</details>

<details>
<summary>Formatting</summary>

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style.
You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and and `pretty-quick`.
See the [prettier.io](https://prettier.io/) site for instructions.
</details>

<details>
<summary>Generate manifests from source</summary>

Custom Elements Manifest is a file format that describes custom elements. This format will allow tooling and IDEs to
give rich information about the custom elements in a given project.

To generate manifest, run the command

```bash
npm run analyze
```

</details>
