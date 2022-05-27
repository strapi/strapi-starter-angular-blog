import {gql} from 'apollo-angular';

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

