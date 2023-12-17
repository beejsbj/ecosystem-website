import axios from "axios";
import localFeedNames from "../stores/feedNames.json";

const FEED_NAME_API_ENDPOINT =
  "https://db-api-prod.api3.org/api/dapis-grouped?take=300&currentPage=1&sort=&sortDirection=&search=&categories=&chains=&sources=&statuses=";

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
            feedName: !el?.feedName ? "ETH/USD" : el?.feedName,
            datafeedId: el?.datafeedId,
            proxyAddress: el?.proxyAddress,
            oev: { enabled: el?.isOEV, beneficiary: el?.oevBeneficiary },
          });
        } else {
          proxyPayload[el?.chainId]?.push({
            proxyType: el?.proxyType,
            feedName: !el?.feedName ? "ETH/USD" : el?.feedName,
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
        headers: verificationPayload,
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
      return { success: false, message: errorMessage };
    }
  };

  const submitArticle = async (articleForm, verificationPayload) => {
    try {
      const res = await axios.post("/api/articles", articleForm, {
        headers: verificationPayload,
      });

      if (res.status === 201) {
        return { success: true, message: "Article submitted" };
      }

      return { success: false, message: "Failed to uplaod article" };
    } catch (error) {
      console.log("submit response error ", {
        error: error,
      });
      const errorMessage = error?.response?.data?.response?.response?.message;
      return { success: false, message: errorMessage };
    }
  };

  const submitUpvote = async (projectId, payload, verificationPayload) => {
    try {
      const res = await axios.post(
        `/api/projects/project/${projectId}`,
        payload,
        {
          headers: verificationPayload,
        }
      );

      if (res.status === 201) {
        return { success: true, message: "Upvote success" };
      }

      return { success: false, message: "Failed to perform upvote" };
    } catch (error) {
      console.log("upvote response error ", {
        error: error,
      });
      const errorMessage = error?.response?.data?.response?.response?.message;
      return { success: false, message: errorMessage };
    }
  };

  const fetchFeedNames = async () => {
    try {
      const response = await axios.get(FEED_NAME_API_ENDPOINT);

      const feedNames = response.data?.dapis?.map((el) => el?.name);

      return feedNames;
    } catch (error) {
      console.log("failed to fetch feed names", error);
      return localFeedNames;
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
    submitArticle,
    submitUpvote,
    fetchFeedNames,
    subscribeNewsletter,
  };
};
