import {gql} from 'apollo-angular';
import {ComponentType} from './ComponentType';

export const FRAGMENT_RICHTEXT = gql`
fragment RichText on ComponentSharedRichText {
  body
}
`;
export interface RichTextResponse {
  __typename: string;
  body: string;
}

export interface RichTextType extends ComponentType {
  body: string;
}

export function richTextTypeFromResponse(response: RichTextResponse): RichTextType {
  return {
    ...response
  }
}
