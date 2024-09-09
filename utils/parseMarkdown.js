/**
 * parseMarkdown
 *
 * A utility function for parsing markdown content using Nuxt Content's markdown transformer.
 *
 * @function
 *
 * @param {Object} articleData - The article data object containing content to parse
 * @param {string} [articleData._id] - Optional ID for the article
 * @param {string} articleData.content - The markdown content to be parsed
 * @returns {Promise<Object>} Parsed markdown content
 *
 * @example
 * const article = { _id: '123', content: '# Hello\nThis is **markdown**.' };
 * const parsedContent = await parseMarkdown(article);
 *
 * @description
 * This utility wraps Nuxt Content's markdown parser, providing a simple interface
 * for parsing markdown content. It generates a UUID if no _id is provided.
 *
 */

import markdownParser from "@nuxt/content/transformers/markdown";
import { v4 as uuid } from "uuid";

// first arg to parse() is for id, which is unused
export const parseMarkdown = (articleData) =>
  markdownParser.parse(articleData._id ?? uuid(), articleData.content);
