import {gql} from 'apollo-angular';
import {ComponentType} from './ComponentType';
import {environment} from '../../../../../environments/environment';

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


export interface MediaResponse {
  __typename: string;
  file: {
    data: {
      attributes: {
        url: string
        caption: string
        alternativeText: string
      };
    };
  };
}

export interface MediaType extends ComponentType {
  url: string;
  caption: string;
  alternativeText: string;
}


export function mediaTypeFromResponse(response: MediaResponse): MediaType {
  return {
    __typename: response.__typename,
    url: environment.apiURL + response.file.data.attributes.url,
    caption: response.file.data.attributes.caption,
    alternativeText: response.file.data.attributes.alternativeText
  };
}
