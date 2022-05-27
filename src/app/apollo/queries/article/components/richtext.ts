import gql from 'graphql-tag';

export const FRAGMENT_RICHTEXT = gql`
fragment RichText on ComponentSharedRichText {
  body
}
`;
