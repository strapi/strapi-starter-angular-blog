import gql from 'graphql-tag';

export const FRAGMENT_QUOTE = gql`
fragment Quote on ComponentSharedQuote {
  title
  body
}
`;
