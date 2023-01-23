// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { useRouter } from 'next/router';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  calendarDay,
} from '@keystone-6/core/fields';

import {useState, useMemo} from 'react';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';

// const getBook = async (isbnInput: any) => {
//   const res = await fetch(
//     "https://openlibrary.org/isbn/" + `${isbnInput}` + ".json"
//   );
//   const answer = await res.json();
//   // setBook(answer)
//   // console.log(answer)
//   return answer
// };


const headers = {
  "Content-Type": "application/json",
  Authorization: "48477_940f8a547364d0d1f282810594ae2f53"
};
const getBook = async (isbnInput) => {
 const res = await fetch(`https://api2.isbndb.com/book/` + `${isbnInput}`, { headers: headers })
 const answer = await res.json()
 return answer.book
    
};

export const lists: Lists = 
{
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      // we can use this field to see what Posts this User has authored
      //   more on that in the Post list below
      // posts: relationship({ ref: 'Post.author', many: true }),

      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  // Post: list({
  //   // WARNING
  //   //   for this starter project, anyone can create, query, update and delete anything
  //   //   if you want to prevent random people on the internet from accessing your data,
  //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  //   access: allowAll,

  //   // this is the fields for our Post list
  //   fields: {
  //     title: text({ validation: { isRequired: true } }),

  //     // the document field can be used for making rich editable content
  //     //   you can find out more at https://keystonejs.com/docs/guides/document-fields
  //     content: document({
  //       formatting: true,
  //       layouts: [
  //         [1, 1],
  //         [1, 1, 1],
  //         [2, 1],
  //         [1, 2],
  //         [1, 2, 1],
  //       ],
  //       links: true,
  //       dividers: true,
  //     }),

  //     // with this field, you can set a User as the author for a Post
  //     author: relationship({
  //       // we could have used 'User', but then the relationship would only be 1-way
  //       ref: 'User.posts',

  //       // this is some customisations for changing how this will look in the AdminUI
  //       ui: {
  //         displayMode: 'cards',
  //         cardFields: ['name', 'email'],
  //         inlineEdit: { fields: ['name', 'email'] },
  //         linkToItem: true,
  //         inlineConnect: true,
  //       },

  //       // a Post can only have one author
  //       //   this is the default, but we show it here for verbosity
  //       many: false,
  //     }),

  //     // with this field, you can add some Tags to Posts
  //     tags: relationship({
  //       // we could have used 'Tag', but then the relationship would only be 1-way
  //       ref: 'Tag.posts',

  //       // a Post can have many Tags, not just one
  //       many: true,

  //       // this is some customisations for changing how this will look in the AdminUI
  //       ui: {
  //         displayMode: 'cards',
  //         cardFields: ['name'],
  //         inlineEdit: { fields: ['name'] },
  //         linkToItem: true,
  //         inlineConnect: true,
  //         inlineCreate: { fields: ['name'] },
  //       },
  //     }),
  //   },
  // }),

  // // this last list is our Tag list, it only has a name field for now
  // Tag: list({
  //   // WARNING
  //   //   for this starter project, anyone can create, query, update and delete anything
  //   //   if you want to prevent random people on the internet from accessing your data,
  //   //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  //   access: allowAll,

  //   // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  //   ui: {
  //     isHidden: true,
  //   },

  //   // this is the fields for our Tag list
  //   fields: {
  //     name: text(),
  //     // this can be helpful to find out all the Posts associated with a Tag
  //     posts: relationship({ ref: 'Post.tags', many: true }),
  //   },
  // }),
  Book: list({
    access: allowAll,
    fields: {
      isbn: text({
        hooks: {
         resolveInput ({resolvedData, inputData}) {
          return resolvedData.isbn
         }, 
         validateInput: async({resolvedData, addValidationError, operation, inputData}) => {
          const { isbn } = resolvedData;
          const book = await getBook(isbn);
          console.log(inputData.isbn)
          if (operation === 'create') {
          book ? isbn : addValidationError('Please enter a valid ISBN') 
          }
  
         }
        }
      }),
      quantity: text({
        validation: {isRequired: true}
      }),
      title: text({
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return (book ? book.title : inputData.title)
            else if (operation === 'update')
            return (resolvedData.title)
          },
        }
      }),
      author: text({
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return (book.authors ? book.authors[0] : inputData.author)
            else if (operation === 'update')
            return (resolvedData.author)
          },
        }
      }),
      language: text({
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return (book ? book.language.toUpperCase() : inputData)
            else if (operation === 'update')
            return (resolvedData.language)
          },
        }
      }),
      description: text({
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return (book ? book.synopsys : inputData)
            else if (operation === 'update')
            return (resolvedData.description)
          },
        }
      }),
      publisher: text({
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return (book ? book.publisher : inputData)
            else if (operation === 'update')
            return (resolvedData.publisher)
          },
        }
      }),
      pageNumbers: text({
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return (book ? book.pages.toString() : inputData)
            else if (operation === 'update')
            return (resolvedData.pageNumbers)
          },
        }
      }),
      publicationDate: text({ 
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return (book ? book.date_published : inputData)
            else if (operation === 'update')
            return (resolvedData.publicationDate)
            else
            return (inputData)
          },
        }
      })
    },
  })
};
