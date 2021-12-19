import ShaplaWcCross from './components/cross/shapla-wc-cross';
import ShaplaWcModal from './components/modal/shapla-wc-modal';
import ShaplaWcPagination from './components/pagination/shapla-wc-pagination';
import {ShaplaWcToggles, ShaplaWcToggle} from './components/toggles/index';

declare global {
  interface HTMLElementTagNameMap {
    'shapla-wc-cross': ShaplaWcCross,
    'shapla-wc-modal': ShaplaWcModal,
    'shapla-wc-pagination': ShaplaWcPagination,
    'shapla-wc-toggles': ShaplaWcToggles,
    'shapla-wc-toggle': ShaplaWcToggle,
  }
}

export {
  ShaplaWcCross,
  ShaplaWcModal,
  ShaplaWcPagination,
  ShaplaWcToggles,
  ShaplaWcToggle
};
