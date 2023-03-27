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

// utils/constants.tsx
var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
var genres = ["Autobiography", "Biography", "Fantasy", "History", "Graphic Novel", "Science Fiction", "Children", "Mystery", "Historical Fiction", "Horror"];

// schema.ts
var headers = {
  "Content-Type": "application/json",
  Authorization: "48477_38b4915e1c2a46e50d96e2b46e17e5ef"
};
var getBook = async (isbnInput) => {
  const res = await fetch(`https://api2.isbndb.com/book/${isbnInput}`, { headers });
  const answer = await res.json();
  return answer.book;
};
var lists = {
  Admin: (0, import_core.list)({
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
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      shippingAddress: (0, import_fields.text)({ validation: { isRequired: true } }),
      aptRoomNum: (0, import_fields.text)(),
      city: (0, import_fields.text)({ validation: { isRequired: true } }),
      state: (0, import_fields.select)({
        type: "string",
        options: states,
        validation: { isRequired: true }
      }),
      zipcode: (0, import_fields.text)({ validation: { isRequired: true } }),
      credits: (0, import_fields.integer)({ validation: { isRequired: true } }),
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
            return resolvedData.isbn;
          },
          validateInput: async ({ resolvedData, addValidationError, operation, inputData }) => {
            const { isbn } = resolvedData;
            const book = await getBook(isbn);
            console.log(book);
            if (operation === "create") {
              isbn.toString().length == 13 ? isbn : addValidationError("Please enter a valid ISBN");
            }
          }
        }
      }),
      quantity: (0, import_fields.text)({
        validation: { isRequired: true }
      }),
      title: (0, import_fields.text)({
        hooks: {
          resolveInput: async ({ inputData, resolvedData, operation }) => {
            const book = await getBook(resolvedData.isbn);
            if (operation === "create")
              return "title" in book ? book.title : inputData.title ? inputData.title : "";
            else if (operation === "update")
              return resolvedData.title;
          }
        }
      }),
      author: (0, import_fields.text)({
        hooks: {
          resolveInput: async ({ inputData, resolvedData, operation }) => {
            const book = await getBook(resolvedData.isbn);
            if (operation === "create")
              return "authors" in book ? book.authors[0] : inputData.author;
            else if (operation === "update")
              return resolvedData.author;
          }
        }
      }),
      genre: (0, import_fields.multiselect)({
        type: "string",
        options: genres
      }),
      language: (0, import_fields.text)({
        hooks: {
          resolveInput: async ({ inputData, resolvedData, operation }) => {
            const book = await getBook(resolvedData.isbn);
            if (operation === "create")
              return "language" in book ? book.language.toUpperCase() : inputData.language;
            else if (operation === "update")
              return resolvedData.language;
          }
        }
      }),
      description: (0, import_fields.text)({
        hooks: {
          resolveInput: async ({ inputData, resolvedData, operation }) => {
            const book = await getBook(resolvedData.isbn);
            if (operation === "create")
              return "synopsis" in book ? book.synopsis : inputData.description;
            else if (operation === "update")
              return resolvedData.description;
          }
        }
      }),
      publisher: (0, import_fields.text)({
        hooks: {
          resolveInput: async ({ inputData, resolvedData, operation }) => {
            const book = await getBook(resolvedData.isbn);
            if (operation === "create")
              return "publisher" in book ? book.publisher : inputData.publisher == void 0 ? "" : inputData.publisher;
            else if (operation === "update")
              console.log(resolvedData.publisher);
            return resolvedData.publisher;
          }
        }
      }),
      publicationDate: (0, import_fields.text)({
        hooks: {
          resolveInput: async ({ inputData, resolvedData, operation }) => {
            const book = await getBook(resolvedData.isbn);
            if (operation === "create")
              return "date_published" in book ? book.date_published : inputData.publicationDate;
            else if (operation === "update")
              return resolvedData.publicationDate;
            else
              return inputData;
          }
        }
      })
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
  listKey: "Admin",
  identityField: "email",
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
    session,
    server: {
      cors: { origin: ["http://localhost:3001"], credentials: true },
      port: 3e3
    },
    storage: {
      my_local_images: {
        kind: "local",
        type: "image",
        generateUrl: (path) => `http://localhost:3000/images${path}`,
        serverRoute: {
          path: "/images"
        },
        storagePath: "public/images"
      }
    }
  })
);
