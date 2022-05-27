import {gql} from 'apollo-angular';

export const FRAGMENT_RICHTEXT = gql`
fragment RichText on ComponentSharedRichText {
  body
}
`;
