const fullTextSearchProcessor = (search) => {
  if (search)
    return search.toLowerCase().trim().replace(" ", " & ").concat(":*");
  return "";
};

module.exports = { fullTextSearchProcessor };
