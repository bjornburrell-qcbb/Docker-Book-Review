import React, {useMemo, useState} from 'react';
import { FieldContainer, FieldDescription, FieldLabel, TextInput } from '@keystone-ui/fields';
import { CellLink, CellContainer } from '@keystone-6/core/admin-ui/components';

import {
  CardValueComponent,
  CellComponent,
  FieldController,
  FieldControllerConfig,
  FieldProps,
} from '@keystone-6/core/types';
import ISBNInput from '../components/ISBNInput';

export function Field({ field, value, onChange, autoFocus }: FieldProps<typeof controller>) {
  const disabled = onChange === undefined;
  const [isbnInput, setISBNInput] = useState('')
  const [book, setBook] = useState(null)
  const [fieldValue, setFieldValue] = useState('');
   const getBook = async (isbnInput: any) => {
    const res = await fetch(
      "https://openlibrary.org/isbn/" + `${isbnInput}` + ".json"
    );
    const answer = await res.json();
    setBook(answer)
    // console.log(answer)
    return answer
  };
 

  const bookInfo = useMemo(() => getBook(isbnInput), [isbnInput]);

  return (
    <FieldContainer as="fieldset">
      <FieldLabel>{field.label}</FieldLabel>
      <FieldDescription id={`${field.path}-description`}>{field.description}</FieldDescription>
      <div>
        <TextInput
          type="text"
          onChange={event => {
            {if(field.label === 'Isbn') {
              setISBNInput(event.target.value)
              onChange?.(isbnInput)
            }
              else if(field.label === 'Title') {
              book ? onChange?.(book?.title) : onChange?.(event.target.value)
            }
              else{
                onChange?.(event.target.value)
              }
          }
            // onChange?.(event.target.value);
            console.log(getBook(event.target.value))
            console.log(book?.['title'])
            console.log(field.label)
            console.log(isbnInput)
            // {field.label === 'Isbn' ? getBook(event.target.value) : undefined}
          }}
          disabled={disabled}
          value={field.label ==='Title' ? book?.title : value}
          autoFocus={autoFocus}
        />
      </div>
    </FieldContainer>
  );
}

export const Cell: CellComponent = ({ item, field, linkTo }) => {
  let value = item[field.path] + '';
  return linkTo ? <CellLink {...linkTo}>{value}</CellLink> : <CellContainer>{value}</CellContainer>;
};
Cell.supportsLinkTo = true;

export const CardValue: CardValueComponent = ({ item, field }) => {
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      {item[field.path]}
    </FieldContainer>
  );
};

export const controller = (
  config: FieldControllerConfig<{}>
): FieldController<string | null, string> => {
  return {
    path: config.path,
    label: config.label,
    description: config.description,
    graphqlSelection: config.path,
    defaultValue: null,
    deserialize: data => {
      const value = data[config.path];
      return typeof value === 'string' ? value : null;
    },
    serialize: value => ({ [config.path]: value }),
  };
};
