import {gql} from 'apollo-angular';
import {environment} from '../../../../environments/environment';

export const ARTICLES_QUERY = gql`
 query Articles {
    articles {
      data {
        id,
        attributes {
          title,
          category {
            data {
              id,
              attributes {
                name
              }
            }
          }
          cover {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }`;

export interface ArticlesResponse {
    articles: {
        data: {
            id: number,
            attributes: {
                title: string,
                category: {
                    data: {
                        id: number,
                        attributes: {
                            name: string
                        };
                    };
                };
                cover: {
                    data: {
                        attributes: {
                            url: string
                        };
                    };
                };
            };
        }[];
    };
}

export interface ArticlesType {
    id: number;
    title: string;
    category: {
        name: string;
    };
    cover: {
        url: string
    };
}

export function articlesTypeFromResponse(response: ArticlesResponse): ArticlesType[] {
    return response.articles.data.map(({id, attributes}) => ({
        id,
        title: attributes.title,
        category: attributes.category.data.attributes,
        cover: {
            ...attributes.cover.data.attributes,
            url: environment.apiURL + attributes.cover.data.attributes.url
        }
    }));
}
