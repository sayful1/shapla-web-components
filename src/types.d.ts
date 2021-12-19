declare module '*.scss' {
  import {CSSResult, css} from 'lit';
  const scss: (params: { css: typeof css }) => CSSResult;
  export default scss;
}

declare module '*.css' {
  import {CSSResult} from 'lit';
  const css: CSSResult;
  export default css;
}
