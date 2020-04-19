module.exports = {
  // turn off crap
  "no-console": 0,
  "no-restricted-syntax": 0,
  "guard-for-in": 0,
  "import/prefer-default-export": 0,

  // our added rules
  "prefer-object-spread": 1,
  "no-warning-comments": [1, { terms: ["fixme"], location: "anywhere" }],

  // extend existing rules
  "no-unused-vars": [1, { caughtErrors: "all" }],
};
