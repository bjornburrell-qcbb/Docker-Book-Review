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
  image,
  integer,
  multiselect,
} from '@keystone-6/core/fields';

import {useState, useMemo} from 'react';

// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document';
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type { Lists } from '.keystone/types';
import { states, genres } from './utils/constants';

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
  Authorization: "48477_38b4915e1c2a46e50d96e2b46e17e5ef"
};
const getBook = async (isbnInput) => {
 const res = await fetch(`https://api2.isbndb.com/book/` + `${isbnInput}`, { headers: headers })
 const answer = await res.json()
 return answer.book
    
};

//Customer Schemna
//Name, Shipping Address, City, State, Zipcode, Credits, Email, Password

export const lists: Lists = 
{
  Admin: list({
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
  User: list({

    access: allowAll,


    fields: {

      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },

        isIndexed: 'unique',
      }),
      password: password({ validation: { isRequired: true } }),
      shippingAddress: text({validation: { isRequired: true}}),
      aptRoomNum: text(),
      city: text({validation: {isRequired: true}}),
      state: select({
        type: 'string', 
        options: states,
        validation: {isRequired: true}
    }),
      zipcode: text({validation: {isRequired: true}}),
      credits: integer({validation:{isRequired: true}}),



      createdAt: timestamp({
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

  //Add to book schema: Genre, Reading Level
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
          console.log(book)
          if (operation === 'create') {
          isbn.toString().length == 13 ? isbn : addValidationError('Please enter a valid ISBN') 
          }
  
         }
        }
      }),
      quantity: integer({
        validation: {isRequired: true}
      }),
      title: text({
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return ("title" in book ? book.title : inputData.title ? inputData.title : '')
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
            return ("authors" in book ? book.authors[0] : inputData.author)
            else if (operation === 'update')
            return (resolvedData.author)
          },
        }
      }),
      genre: select({
        type: 'string',
        options: genres,
      }),
      language: text({
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return ("language" in book ? book.language.toUpperCase() : inputData.language)
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
            return ("synopsis" in book ? book.synopsis : inputData.description)
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
            return ("publisher" in book ? book.publisher : inputData.publisher == undefined ? '' : inputData.publisher)
            else if (operation === 'update')
            console.log(resolvedData.publisher)
            return (resolvedData.publisher)
          },
        }
      }),
      // pageNumbers: text({
      //   hooks: {
      //     resolveInput: async({inputData, resolvedData, operation}) => {
      //       const book = await getBook(resolvedData.isbn)
      //       console.log(book)
      //       if (operation === 'create')
      //       return (book?.pages ? book.pages.toString() : inputData)
      //       else if (operation === 'update')
      //       return (resolvedData.pageNumbers)
      //     },
      //   }
      // }),
      publicationDate: text({ 
        hooks: {
          resolveInput: async({inputData, resolvedData, operation}) => {
            const book = await getBook(resolvedData.isbn)
            if (operation === 'create')
            return ("date_published" in book ? book.date_published : inputData.publicationDate)
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
