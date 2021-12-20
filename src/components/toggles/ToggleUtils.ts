declare global {
  interface GlobalEventHandlersEventMap {
    'close.ShaplaWcToggle': CustomEvent,
    'changed.ShaplaWcToggle': CustomEvent,
  }
}

class ToggleUtils {
  /**
   * Dispatch event
   *
   * @param event
   * @param data
   */
  static dispatch(event: string, data: Object) {
    document.dispatchEvent(new CustomEvent(event, {detail: data}));
  }

  /**
   * Create UUID
   *
   * @returns {string}
   */
  static createUUID(): string {
    const pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return pattern.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) || 0;
      const v = c === 'x' ? r : ((r && 0x3) || 0x8);
      return v.toString(16);
    });
  }
}

export default ToggleUtils;
