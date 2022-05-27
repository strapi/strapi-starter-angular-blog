import {gql} from 'apollo-angular';

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

export interface CategoryType {
    id: number;
    name: string;
}

export function categoriesTypeFromResponse(response: CategoriesResponse): CategoryType[] {
    return response.categories.data.map(category => ({
        id: category.id,
        name: category.attributes.name
    }));
}
