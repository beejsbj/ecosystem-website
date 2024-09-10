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

import axios from "axios";
import dapis from "@api3/dapi-management/dist/data/dapis.json";

export const useHttpCalls = () => {
  const submitProject = async (dappForm, images, verificationPayload) => {
    try {
      const body = new FormData();

      // append dappform to body, dappForm is vue reactive, so needs .value
      body.append("name", dappForm.value.name);
      body.append("tagline", dappForm.value.tagline);
      body.append(
        "description",
        dappForm.value.description?.replace(/\n/g, "/n")
      );
      body.append("chains", JSON.stringify(dappForm.value.chains));
      body.append("categories", JSON.stringify(dappForm.value.categories));
      body.append("productType", dappForm.value?.productType);

      body.append("year", dappForm?.value?.year);

      const links = {
        website: dappForm.value.links.website,
        dapp: dappForm.value.links.dapp,
        docs: dappForm.value.links.docs,
        explorer: dappForm.value.links.explorer,
        socials: [],
      };

      if (dappForm?.value?.links?.socials?.twitter) {
        links.socials.push({
          label: "twitter",
          url: dappForm?.value?.links.socials.twitter,
        });
      }

      if (dappForm?.value?.links?.socials?.discord) {
        links.socials.push({
          label: "discord",
          url: dappForm?.value?.links.socials.discord,
        });
      }

      if (dappForm?.value?.links?.socials?.reddit) {
        links.socials.push({
          label: "reddit",
          url: dappForm?.value?.links.socials.reddit,
        });
      }

      if (dappForm?.value?.links?.socials?.github) {
        links.socials.push({
          label: "github",
          url: dappForm?.value?.links?.socials?.github,
        });
      }

      if (dappForm?.value?.links?.socials?.telegram) {
        links.socials.push({
          label: "telegram",
          url: dappForm?.value?.links.socials.telegram,
        });
      }

      body.append("links", JSON.stringify(links));

      const proxies = dappForm.value.proxies;

      const proxyPayload = {};
      proxies?.forEach((el) => {
        if (!proxyPayload[el?.chainId]) {
          proxyPayload[el?.chainId] = [];
        }

        if (el.proxyType === "datafeedId") {
          proxyPayload[el?.chainId]?.push({
            proxyType: el?.proxyType,
            feedName: el?.feedName,
            datafeedId: el?.datafeedId,
            proxyAddress: el?.proxyAddress,
            oev: { enabled: el?.isOEV, beneficiary: el?.oevBeneficiary },
          });
        } else {
          proxyPayload[el?.chainId]?.push({
            proxyType: el?.proxyType,
            feedName: el?.feedName,
            dapiNameHash: el?.dapiNameHash,
            proxyAddress: el?.proxyAddress,
            oev: { enabled: el?.isOEV, beneficiary: el?.oevBeneficiary },
          });
        }
      });

      body.append("proxies", JSON.stringify(proxyPayload));

      // images
      body.append("logo", images.logo);
      body.append("cover", images.cover);

      images?.screenshots.forEach((fileItem, index) => {
        body.append(`screenshot${index + 1}`, fileItem);
      });

      const response = await axios.post("/api/projects", body, {
        headers: {
          ...verificationPayload,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        return {
          success: true,
          message: "Project submitted for review",
          data: response?.data?.response?.response?.data,
        };
      } else {
        return { success: false, message: "Failed at server" };
      }
    } catch (error) {
      console.log("submit response error ", {
        error: error,
      });
      const errorMessage = error?.response?.data?.response?.response?.message;
      return { success: false, messages: errorMessage };
    }
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
    try {
      const res = await axios.post("/api/newsletter", body, {});

      if (res.status === 201) {
        return { success: true, message: "Subscription success!" };
      }

      return { success: false, message: "Failed to subscribe" };
    } catch (error) {
      console.log("submit response error ", {
        error: error,
      });
      const errorMessage = error?.response?.data?.response?.response?.message;
      return { success: false, message: errorMessage };
    }
  };

  return {
    submitProject,
    fetchFeedNames,
    subscribeNewsletter,
  };
};
