import {gql} from 'apollo-angular';
import {ComponentType} from './ComponentType';

export const FRAGMENT_QUOTE = gql`
fragment Quote on ComponentSharedQuote {
  title
  body
}
`;

export interface QuoteResponse {
  __typename: string;
  title: string;
  body: string;
}

export interface QuoteType extends ComponentType {
  title: string;
  body: string;
}

export function quoteTypeFromResponse(response: QuoteResponse): QuoteType {
  return {
    ...response
  }
}
