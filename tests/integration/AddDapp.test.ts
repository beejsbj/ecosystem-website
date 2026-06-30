import { describe, expect, it, test } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { nextTick } from "vue";
import ContentStep from "~/components/add-dapp/ContentStep.vue";
import ImageStep from "~/components/add-dapp/ImageStep.vue";
import LinksStep from "~/components/add-dapp/LinksStep.vue";
import TagStep from "~/components/add-dapp/TagStep.vue";
import { useEcosystemStore } from "~/stores/ecosystem";
import ProxyStep from "~/components/add-dapp/ProxyStep.vue";
import { validateProjectSchema } from "~/server/services/helper";

describe("Add Dapp Form", () => {
  it("renders ContentStep correctly and initializes form", async () => {
    const dappForm = {
      name: "",
      tagline: "",
      description: "",
      date: "",
      links: { socials: {} },
    };

    const component = await mountSuspended(ContentStep, {
      props: { dappForm },
    });

    // Ensure the component renders and the title is present
    expect(component.html()).toContain("Tell us about your dApp"); // should contain correct  title
    expect(component.html()).toContain(
      "This information will be displayed for others to learn about your dApp."
    ); // should contain correct desc

    // verify content step form fields
    const nameField = component.find("#dappName");
    expect(nameField.exists()).toBe(true);
    expect(nameField.html()).toContain("What is the name of your dApp?");

    const logoForm = component.find("#logoForm");
    expect(logoForm.exists()).toBe(true);
    expect(logoForm.html()).toContain("Upload your dApp’s logo.");

    const shortDescription = component.find("#shortDescription");
    expect(shortDescription.exists()).toBe(true);
    // expect(shortDescription.html()).toContain("Enter your  dApp’s slogan.");

    const longDescription = component.find("#longDescription");
    expect(longDescription.exists()).toBe(true);
    expect(longDescription.html()).toContain(
      "This is going to be your 'About', it can be a paragraph or two."
    );

    // Check initial value of date in props
    expect(dappForm.date).toBe(new Date().toISOString().slice(0, 10));

    // Check that the year options are correctly generated
    await nextTick(); // Wait for onMounted to finish
    const yearOptions = component.vm.yearOptions.value;

    expect(yearOptions.length).toBeGreaterThan(0); // Basic check
    expect(yearOptions[0]).toBe(new Date().getFullYear()); // Latest year should be first
  });

  it("renders ImageStep correctly and initializes form", async () => {
    const dappForm = {
      name: "",
      tagline: "",
      description: "",
      date: "",
      links: { socials: {} },
    };

    const component = await mountSuspended(ImageStep, {
      props: { dappForm },
    });

    // Ensure the component renders and the title is present
    expect(component.html()).toContain("Tell us about your dApp"); // should contain correct  title
    expect(component.html()).toContain(
      "This information will be displayed for others to learn about your dApp."
    ); // should contain correct desc

    // verify content step form fields
    const dappUrlField = component.find("#dapp");
    expect(dappUrlField.exists()).toBe(true);
    expect(dappUrlField.html()).toContain("Where can someone find your dApp?");

    const docs = component.find("#docs");
    expect(docs.exists()).toBe(true);
    expect(docs.html()).toContain(
      "Where can someone find your dApp’s documentation?"
    );

    const explorer = component.find("#explorer");
    expect(explorer.exists()).toBe(true);
    expect(explorer.html()).toContain("Explorer URL");

    const coverForm = component.find("#coverForm");
    expect(coverForm.exists()).toBe(true);
    expect(coverForm.html()).toContain("Upload a branded cover");

    const screenShotForm = component.find("#screenShotForm");
    expect(screenShotForm.exists()).toBe(true);
    expect(screenShotForm.html()).toContain("Upload your screenshots");
  });

  it("renders LinkStep correctly and initializes form", async () => {
    const dappForm = {
      name: "",
      tagline: "",
      description: "",
      date: "",
      links: { socials: {} },
    };

    const component = await mountSuspended(LinksStep, {
      props: { dappForm },
    });

    // Ensure the component renders and the title is present
    expect(component.html()).toContain("How can your users contact you?"); // should contain correct  title
    expect(component.html()).toContain(
      "This information will be displayed for others to learn about your dApp."
    ); // should contain correct desc

    // verify content step form fields
    const website = component.find("#website");
    expect(website.exists()).toBe(true);
    expect(website.html()).toContain("What’s your company’s website?");

    const twitter = component.find("#twitter");
    expect(twitter.exists()).toBe(true);

    const discord = component.find("#discord");
    expect(discord.exists()).toBe(true);

    const github = component.find("#github");
    expect(github.exists()).toBe(true);

    const reddit = component.find("#reddit");
    expect(reddit.exists()).toBe(true);

    const telegram = component.find("#telegram");
    expect(telegram.exists()).toBe(true);

    const facebook = component.find("#facebook");
    expect(facebook.exists()).toBe(true);

    const youtube = component.find("#youtube");
    expect(youtube.exists()).toBe(true);

    const blog = component.find("#blog");
    expect(blog.exists()).toBe(true);
  });

  it("renders TagStep correctly and initializes form", async () => {
    const dappForm = {
      name: "",
      tagline: "",
      description: "",
      date: "",
      links: { socials: {} },
    };

    const ecosystem = useEcosystemStore();

    const component = await mountSuspended(TagStep, {
      props: { dappForm },
    });

    expect(component.exists()).toBe(true);

    // Check that the year options are correctly generated
    await nextTick(); // Wait for onMounted to finish
    const yearOptions = component.vm.yearOptions.value;

    expect(yearOptions.length).toBeGreaterThan(0); // Basic check
    expect(yearOptions[0]).toBe(new Date().getFullYear()); // Latest year should be first

    // show show all category options
    const categoryOptions = ecosystem.categoryOptions;
    expect(categoryOptions.length).toBeGreaterThan(0);
    expect(categoryOptions[0]).toHaveProperty("label");
    expect(categoryOptions[0]).toHaveProperty("value");

    const chainOptions = ecosystem.chainOptions;
    expect(chainOptions.length).toBeGreaterThan(0);
    expect(chainOptions[0]).toHaveProperty("label");
    expect(chainOptions[0]).toHaveProperty("value");

    const productTypeOptions = ecosystem.productTypeOptions;
    expect(productTypeOptions.length).toBeGreaterThan(0);
    expect(productTypeOptions[0]).toHaveProperty("label");
    expect(productTypeOptions[0]).toHaveProperty("value");
  });

  it("renders ProxyForm correctly and initializes form", async () => {
    const dappForm = {
      name: "",
      tagline: "",
      description: "",
      date: "",
      links: { socials: {} },
    };

    const ecosystem = useEcosystemStore();

    const component = await mountSuspended(ProxyStep, {
      props: { dappForm },
    });

    expect(component.exists()).toBe(true);

    // Ensure the component renders and the title is present
    expect(component.html()).toContain("Enter Proxy information"); // should contain correct  title
    expect(component.html()).toContain(
      "This information will be displayed for others to learn about your dApp."
    ); // should contain correct desc

    await nextTick(); // Wait for onMounted to finish

    const chainOptions = ecosystem.chainOptions;
    expect(chainOptions.length).toBeGreaterThan(0);
    expect(chainOptions[0]).toHaveProperty("label");
    expect(chainOptions[0]).toHaveProperty("value");

    const proxyAddressField = component.find("#proxyAddress");
    expect(proxyAddressField.exists()).toBe(true);
    expect(proxyAddressField.html()).toContain(
      "You can get proxy address from market.api3.org"
    );

    const proxyChainsOption = component.find("#proxy-chain");
    expect(proxyChainsOption.exists()).toBe(true);

    const feedNameOption = component.find("#feed-name");
    expect(feedNameOption.exists()).toBe(true);

    const loading = component.vm.loading.value;
    console.log({ loading });
    const fetchProxyBtn = component.find("div.add-button");
    expect(fetchProxyBtn.exists()).toBe(loading ? false : true);

    dappForm.proxyAddress = "0x1234567890AbcdEF1234567890aBcdef12345678";
    dappForm.proxyChain = 1;
    dappForm.feedName = "ETH/USD";

    await component.find("div.add-button button").trigger("click");
    expect(component.html()).toContain("Demo proxy added.");
    expect(dappForm.proxies).toHaveLength(1);
    expect(dappForm.proxies[0].proxyType).toBe("dapi");
  });

  it("Should reject and throw correct error if proxy fields are invalid", async () => {
    // if 1 of the proxies object is wrong
    const projectPayload = {
      name: "Test Dapp",
      tagline: "Next Generation Stableswap",
      description: "ed",
      status: "active",
      images: {
        logo: "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230764_telegram.jpeg",
        cover:
          "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230764_quick-banner%20%282%29.png",
        screenshots: [
          "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230779_aptin.png",
          "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230783_bg.jpeg",
        ],
      },
      categories: ["gaming"],
      productType: "datafeed",
      chains: ["42161"],
      proxies: {
        "42161": [
          {
            proxyType: "dapi",
            feedName: "ETH/USD",
            dapiNameHash:
              "0x9e6138f8f57d7b493a8364edb0a0ac92399dfd890eecb9121050836a1749ba42",
            proxyAddress: "0xf624881ac131210716F7708C28403cCBe346cB73",
            oev: {
              enabled: true,
              // beneficiary: "0x6adD2B0D2bA7A4075d75c3E1801214c53e407418",
            },
          },
        ],
      },
      links: {
        website: "https://api3.org/",
        dapp: "https://api3.org/",
        docs: "https://api3.org/",
        explorer: "https://api3.org/",
        socials: [
          {
            label: "twitter",
            url: "https://api3.org/",
          },
          {
            label: "discord",
            url: "https://api3.org/",
          },
          {
            label: "reddit",
            url: "https://api3.org/",
          },
          {
            label: "github",
            url: "https://api3.org/",
          },
          {
            label: "telegram",
            url: "https://api3.org/",
          },
        ],
      },
      year: 2020,
    };

    const verification = await validateProjectSchema(projectPayload);
    expect(verification.success).toBe(false);

    // if everything is correct
    const projectPayload2 = {
      name: "Test Dapp",
      tagline: "Next Generation Stableswap",
      description: "ed",
      status: "active",
      images: {
        logo: "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230764_telegram.jpeg",
        cover:
          "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230764_quick-banner%20%282%29.png",
        screenshots: [
          "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230779_aptin.png",
          "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230783_bg.jpeg",
        ],
      },
      categories: ["gaming"],
      productType: "datafeed",
      chains: ["42161"],
      proxies: {
        "42161": [
          {
            proxyType: "dapi",
            feedName: "ETH/USD",
            dapiNameHash:
              "0x9e6138f8f57d7b493a8364edb0a0ac92399dfd890eecb9121050836a1749ba42",
            proxyAddress: "0xf624881ac131210716F7708C28403cCBe346cB73",
            oev: {
              enabled: true,
              beneficiary: "0x6adD2B0D2bA7A4075d75c3E1801214c53e407418",
            },
          },
        ],
      },
      links: {
        website: "https://api3.org/",
        dapp: "https://api3.org/",
        docs: "https://api3.org/",
        explorer: "https://api3.org/",
        socials: [
          {
            label: "twitter",
            url: "https://api3.org/",
          },
          {
            label: "discord",
            url: "https://api3.org/",
          },
          {
            label: "reddit",
            url: "https://api3.org/",
          },
          {
            label: "github",
            url: "https://api3.org/",
          },
          {
            label: "telegram",
            url: "https://api3.org/",
          },
        ],
      },
      year: 2020,
    };

    const verification2 = await validateProjectSchema(projectPayload2);
    expect(verification2.success).toBe(true);

    // if product type is qrng
    const projectPayload3 = {
      name: "Test Dapp",
      tagline: "Next Generation Stableswap",
      description: "ed",
      status: "active",
      images: {
        logo: "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230764_telegram.jpeg",
        cover:
          "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230764_quick-banner%20%282%29.png",
        screenshots: [
          "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230779_aptin.png",
          "https://ecosystem-website.s3.us-east-2.amazonaws.com/1719225230783_bg.jpeg",
        ],
      },
      categories: ["gaming"],
      productType: "qrng",
      chains: ["42161"],

      links: {
        website: "https://api3.org/",
        dapp: "https://api3.org/",
        docs: "https://api3.org/",
        explorer: "https://api3.org/",
        socials: [
          {
            label: "twitter",
            url: "https://api3.org/",
          },
          {
            label: "discord",
            url: "https://api3.org/",
          },
          {
            label: "reddit",
            url: "https://api3.org/",
          },
          {
            label: "github",
            url: "https://api3.org/",
          },
          {
            label: "telegram",
            url: "https://api3.org/",
          },
        ],
      },
      year: 2020,
    };

    const verification3 = await validateProjectSchema(projectPayload3);
    expect(verification3.success).toBe(true);
  });
});
