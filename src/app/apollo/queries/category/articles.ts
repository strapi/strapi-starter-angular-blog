import {gql} from 'apollo-angular';
import {environment} from '../../../../environments/environment';

export const CATEGORY_ARTICLES_QUERY = gql`
query Category($id: ID!) {
  category(id: $id) {
    data {
      id,
      attributes {
        name,
        articles {
          data {
            id,
            attributes {
              title,
              cover {
                data {
                  attributes {
                    url,
                    alternativeText
                  }
                }
              }
              category {
                data {
                  attributes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export interface CategoryArticlesResponse {
    category: {
        data: {
            id: number;
            attributes: {
                name: string;
                articles: {
                    data: {
                        id: number;
                        attributes: {
                            title: string;
                            cover: {
                                data: {
                                    attributes: {
                                        url: string;
                                        alternativeText: string;
                                    }
                                }
                            },
                            category: {
                                data: {
                                    attributes: {
                                        name: string;
                                    }
                                }
                            }
                        };
                    }[];
                };
            };
        };
    };
}

export interface CategoryArticlesType {
    id: number;
    title: string;
    category: {
        name: string;
    };
    cover: {
        url: string;
        alternativeText: string;
    };
}

export function categoryArticlesTypeFromResponse(response: CategoryArticlesResponse): { articles: CategoryArticlesType[],category: { name: string }} {
    return {
        category: { name: response.category.data.attributes.name },
        articles: response.category.data.attributes.articles.data.map(article => ({
            id: article.id,
            title: article.attributes.title,
            category: article.attributes.category.data.attributes,
            cover: {
                ...article.attributes.cover.data.attributes,
                url: environment.apiURL + article.attributes.cover.data.attributes.url,
            }
        }))
    };
}
