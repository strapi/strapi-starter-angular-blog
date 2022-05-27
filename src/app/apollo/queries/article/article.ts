import gql from "graphql-tag";
import {FRAGMENT_MEDIA} from './components/media';
import {FRAGMENT_RICHTEXT} from './components/richtext';
import {FRAGMENT_SLIDER} from './components/slider';
import {FRAGMENT_QUOTE} from './components/quote';

export const ARTICLE_QUERY = gql`
${FRAGMENT_MEDIA}
${FRAGMENT_QUOTE}
${FRAGMENT_RICHTEXT}
${FRAGMENT_SLIDER}
query Article($id: ID!) {
  article(id: $id) {
    data {
      id
      attributes {
        title
        cover {
          data {
            attributes {
              url
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
        blocks {
          ...Media
          ...Quote
          ...RichText
          ...Slider
        }
      }
    }
  }
}
`;

export interface ArticleResponse {
    article: {
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
            }
        }
    };
}

export interface ArticleType {
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
