import BaseComponent from '../base-component.js';

import styles from './style.module.scss';

export default class Hello extends BaseComponent {
  constructor() {
    super();
  }

  get template() {
    return `
      <div class="container py-4 px-3 mx-auto ${styles.container}">
        <h1>Hello, Bootstrap and Webpack!</h1>
        <button class="btn btn-primary">Primary button</button>
      </div>
    `;
  }
}
