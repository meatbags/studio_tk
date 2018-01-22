const removeClass = (selector, classes) => {
  if ($(selector).hasClass(classes)) {
    $(selector).removeClass(classes);
  }
};

export default removeClass;
