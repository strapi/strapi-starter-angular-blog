import gql from 'graphql-tag';

export const FRAGMENT_MEDIA = gql`
fragment Media on ComponentSharedMedia {
  file {
    data {
      attributes {
        url
        caption
        alternativeText
      }
    }
  }
}
`;
