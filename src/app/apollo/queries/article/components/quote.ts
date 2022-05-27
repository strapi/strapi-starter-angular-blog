import {gql} from 'apollo-angular';

export const FRAGMENT_QUOTE = gql`
fragment Quote on ComponentSharedQuote {
  title
  body
}
`;
