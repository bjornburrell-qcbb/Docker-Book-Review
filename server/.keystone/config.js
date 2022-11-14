var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var getBook = async (isbnInput) => {
  const res = await fetch(
    `https://openlibrary.org/isbn/${isbnInput}.json`
  );
  const answer = await res.json();
  return answer;
};
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Book: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      isbn: (0, import_fields.text)({
        hooks: {
          resolveInput({ resolvedData, inputData }) {
            console.log(resolvedData.isbn);
            return resolvedData.isbn;
          }
        }
      }),
      title: (0, import_fields.text)({
        hooks: {
          resolveInput: async ({ inputData, resolvedData, operation }) => {
            const book = await getBook(resolvedData.isbn);
            if (operation === "create")
              return book ? book.title : inputData;
            else if (operation === "update")
              return resolvedData.title;
            else
              return inputData;
          }
        }
      }),
      description: (0, import_fields.text)(),
      quantity: (0, import_fields.text)({ validation: { isRequired: true } }),
      language: (0, import_fields.text)({ validation: { isRequired: true } }),
      publisher: (0, import_fields.text)(),
      pageNumbers: (0, import_fields.text)({}),
      publicationDate: (0, import_fields.timestamp)({ defaultValue: { kind: "now" } })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && true) {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt",
  secretField: "password",
  initFirstItem: false ? void 0 : {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session
  })
);
