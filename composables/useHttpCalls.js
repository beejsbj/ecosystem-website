/**
 * useHttpCalls Composable
 *
 * A composable function that provides HTTP-related utility functions for the application.
 *
 * @function
 *
 * @returns {Object} An object containing HTTP utility functions
 * @property {Function} submitProject - Async function to submit a project
 * @property {Function} fetchFeedNames - Async function to fetch feed names
 * @property {Function} subscribeNewsletter - Async function to subscribe to a newsletter
 *
 * @uses
 * - axios - For making HTTP requests
 * - @api3/dapi-management - For accessing dAPI data
 *
 * @example
 * const { submitProject, fetchFeedNames, subscribeNewsletter } = useHttpCalls();
 *
 * @function submitProject
 * @async
 * @param {Object} dappForm - Vue reactive object containing form data
 * @param {Object} images - Object containing image files (logo, cover, screenshots)
 * @param {Object} verificationPayload - Object containing verification data for headers
 * @returns {Promise<Object>} Result of the project submission
 *
 * @function fetchFeedNames
 * @async
 * @returns {Promise<Array>} Array of feed names
 *
 * @function subscribeNewsletter
 * @async
 * @param {Object} body - Newsletter subscription data
 * @returns {Promise<Object>} Result of the newsletter subscription
 *
 * @notes
 * - submitProject handles complex form data, including file uploads and nested objects
 * - fetchFeedNames uses local dAPI data instead of making an HTTP request
 * - All functions include error handling and return standardized response objects
 * - Assumes the existence of an API endpoint at '/api/projects' for project submission
 * - Assumes the existence of an API endpoint at '/api/newsletter' for newsletter subscription
 */

import dapis from "@api3/dapi-management/dist/data/dapis.json";

export const useHttpCalls = () => {
  const submitProject = async (dappForm, images, verificationPayload) => {
    return {
      success: false,
      messages: [
        "Project submissions are disabled in this frontend showcase.",
      ],
    };
  };

  const fetchFeedNames = async () => {
    try {
      const response = dapis?.map((el) => el.name);

      return response;
    } catch (error) {
      console.log("failed to laod feed names", error);
      return [];
    }
  };

  const subscribeNewsletter = async (body) => {
    return {
      success: true,
      message: "Newsletter signup is mocked in this frontend showcase.",
    };
  };

  return {
    submitProject,
    fetchFeedNames,
    subscribeNewsletter,
  };
};
