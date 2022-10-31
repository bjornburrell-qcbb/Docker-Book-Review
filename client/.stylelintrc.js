module.exports ={
  extends: ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-idiomatic-order"],
  rules: {
    'selector-no-qualifying-type': null,
    'max-nesting-depth': 6,
    'selector-max-compound-selectors': 10,
  },
}
