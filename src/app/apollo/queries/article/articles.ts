import gql from "graphql-tag";

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
    image: {
        url: string
    };
}
