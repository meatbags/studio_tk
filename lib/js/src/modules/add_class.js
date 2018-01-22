const addClass = (selector, classes) => {
  if (!$(selector).hasClass(classes)) {
    $(selector).addClass(classes);
  }
};

export default addClass;
