module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [2, "never", ["start-case", "pascal-case"]],
    "body-max-line-length": [2, "always", 72],
  },
  ignores: [],
};
