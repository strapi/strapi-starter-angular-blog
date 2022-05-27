import {gql} from 'apollo-angular';
import {ComponentType} from './ComponentType';
import {environment} from '../../../../../environments/environment';

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

export interface SliderResponse {
  __typename: string;
  files: {
    data: {
      attributes: {
        url: string
        previewUrl: string;
        caption: string;
        alternativeText: string;
        name: string;
      }
    }[]
  }
}

export interface SliderType extends ComponentType {
  files: {
    url: string;
    previewUrl: string;
    caption: string;
    alternativeText: string;
    name: string;
  }[];
}
export function sliderTypeFromResponse(response: SliderResponse): SliderType {
  return {
    files: response.files.data.map(file => {
      return {
        url: environment.apiURL + file.attributes.url,
        previewUrl: file.attributes.previewUrl,
        caption: file.attributes.caption,
        alternativeText: file.attributes.alternativeText,
        name: file.attributes.name
      };
    }),
    __typename: response.__typename,
  };
}
