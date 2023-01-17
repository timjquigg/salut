const makeTitleCase = (input) => {
  input = input.trim().split(" ");
  const titleCase = input.map((el) => {
    if (el === "and") {
      return el;
    }
    return el[0].toUpperCase() + el.slice(1).toLowerCase();
  });
  return titleCase.join(" ");
};

module.exports = { makeTitleCase };
