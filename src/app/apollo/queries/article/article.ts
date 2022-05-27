import {gql} from 'apollo-angular';
import {FRAGMENT_MEDIA, MediaResponse, MediaType, mediaTypeFromResponse} from './components/media';
import {FRAGMENT_RICHTEXT, RichTextResponse, RichTextType, richTextTypeFromResponse} from './components/richtext';
import {FRAGMENT_SLIDER, SliderResponse, SliderType, sliderTypeFromResponse} from './components/slider';
import {FRAGMENT_QUOTE, QuoteResponse, QuoteType, quoteTypeFromResponse} from './components/quote';
import {ComponentType} from './components/ComponentType';
import {environment} from '../../../../environments/environment';

type AnyComponentType = MediaType | RichTextType | QuoteType | SliderType;

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
                },
                blocks: ComponentType[];
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
    blocks: AnyComponentType[];
}

export function articleTypeFromResponse(response: ArticleResponse): ArticleType {
    console.log(response.article.data.attributes.blocks)
    return {
        id: response.article.data.id,
        title: response.article.data.attributes.title,
        category: response.article.data.attributes.category.data.attributes,
        cover: {
            ...response.article.data.attributes.cover.data.attributes,
            url: environment.apiURL + response.article.data.attributes.cover.data.attributes.url
        },
        blocks: response.article.data.attributes.blocks.map((block): AnyComponentType => {
          switch (block.__typename) {
              case 'ComponentSharedMedia':
                    return mediaTypeFromResponse(block as MediaResponse);
              case 'ComponentSharedRichText':
                  return richTextTypeFromResponse(block as RichTextResponse);
              case 'ComponentSharedQuote':
                  return quoteTypeFromResponse(block as QuoteResponse);
              case 'ComponentSharedSlider':
                  return sliderTypeFromResponse(block as SliderResponse);
              default:
                  console.warn('Unknown block type: ' + block.__typename);
                  return null;
          }
        })
    };
}
