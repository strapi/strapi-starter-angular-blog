import gql from "graphql-tag";

export const CATEGORIES_QUERY = gql`
query {
    categories {
        data {
          id,
          attributes {
            name
          }
        }
    }
}`;


export interface CategoriesResponse {
    categories: {
        data: {
            id: number,
            attributes: {
                name: string
            }
        }[];
    };
}
