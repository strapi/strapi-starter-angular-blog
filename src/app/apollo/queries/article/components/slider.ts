import {gql} from 'apollo-angular';

export const FRAGMENT_SLIDER = gql`
fragment Slider on ComponentSharedSlider {
  files {
    data {
      attributes {
        url
        previewUrl
        caption
        alternativeText
        name
      }
    }
  }
}
`;
