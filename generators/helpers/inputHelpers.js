const downcaseFirstLetter = (word) => {
  return word.charAt(0).toLowerCase() + word.slice(1);
};

const kebabCase = (word) => {
  return downcaseFirstLetter(word).replace(/([A-Z])/g, '-$1').toLowerCase();
};

const upcaseFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

module.exports = {
  downcaseFirstLetter,
  kebabCase,
  upcaseFirstLetter,
};
