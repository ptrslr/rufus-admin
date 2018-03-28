import bold from '../Icon/svg/bold.svg';
import italic from '../Icon/svg/italic.svg';
import underline from '../Icon/svg/underline.svg';
import unordered from '../Icon/svg/ul.svg';
import ordered from '../Icon/svg/ol.svg';
import undo from '../Icon/svg/chevronLeft.svg';
import redo from '../Icon/svg/chevronRight.svg';

const toolbarConf = {
  options: ['inline', 'blockType', 'list', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline'],
    bold: { icon: bold, className: 'test' },
    italic: { icon: italic, className: undefined },
    underline: { icon: underline, className: undefined },
  },
  blockType: {
    inDropdown: false,
    options: ['Normal', 'H1', 'H2', 'H3'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered'],
    unordered: { icon: unordered, className: undefined },
    ordered: { icon: ordered, className: undefined },
  },
  // link: {
  //   inDropdown: false,
  //   className: undefined,
  //   component: undefined,
  //   popupClassName: undefined,
  //   dropdownClassName: undefined,
  //   showOpenOptionOnHover: true,
  //   defaultTargetOption: '_self',
  //   options: ['link', 'unlink'],
  //   link: { icon: link, className: undefined },
  //   unlink: { icon: unlink, className: undefined },
  // },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
    undo: { icon: undo, className: undefined },
    redo: { icon: redo, className: undefined },
  },
};

export default toolbarConf;
