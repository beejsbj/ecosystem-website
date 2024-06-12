import mongoose from "mongoose";

export const isNumber = (n: string): boolean => {
  return !isNaN(parseFloat(n)) && isFinite(Number(n));
};

export const isValidEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export const isValidTelegramUrl = (url: string): boolean => {
  if (!url) {
    return false;
  }

  const pattern = /^(?:https?:\/\/)?t\.me\/(?!joinchat\/)[a-zA-Z0-9_]+$/;
  const flag = pattern.test(url);

  return flag;
};

export const emailMarkup = (formData: any): string => {
  const content = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData?.heading}</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
  
      h2 {
        color: #333;
      }
  
      p {
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <h2>${formData?.heading} info</h2>
  
    <p><strong>Name:</strong>   ${formData?.name}</p>
    <p><strong>Email:</strong>  ${formData?.email}</p>
    <p><strong>Telegram:</strong> ${formData?.telegram} </p>
    <p><strong>Level:</strong>  ${formData?.level}</p>
  
    <p><strong>Message:</strong></p>
    <p>${formData?.message}</p>
  </body>
  </html>
  `;

  return content;
};

// prepare markdwon for pull requests
export const prepareMarkdown = (project: any) => {
  const {
    name,
    tagline,
    description,
    status,
    images,
    categories,
    productType,
    chains,
    proxies,
    links,
    year,
  } = project;

  const markdownContent = `
# ${name}

**Tagline:** ${tagline}

## Description

${description}

## Status

${status}

## Images

- Logo: ![${name} Logo](${images.logo})
- Cover: ![${name} Cover](${images.cover})
- Screenshots:
${images.screenshots
  .map(
    (screenshot: any, index: number) =>
      `  - ![Screenshot ${index + 1}](${screenshot})`
  )
  .join("\n")}

## Categories

${categories.map((category: any) => `- ${category}`).join("\n")}

## Product Type

${productType}

## Chains

${chains.map((chain: any) => `- ${chain}`).join("\n")}

## Proxies


| Chain | Proxy Type | Feed Name | Proxy Address | OEV Enabled | OEV Beneficiary |
|-------|------------|-----------|---------------|-------------|-----------------|
${
  productType === "qrng"
    ? ""
    : Object.entries(proxies)
        .map(([chain, proxyArray]: [any, any]) =>
          proxyArray
            .map(
              (proxy: any) =>
                `| ${chain} | ${proxy.proxyType} | ${proxy.feedName} |   \`${
                  proxy.proxyAddress
                }\` | ${proxy.oev.enabled} | \`${
                  proxy.oev.enabled ? proxy.oev.beneficiary : ""
                }\` |`
            )
            .join("\n")
        )
        .join("\n")
}

## Links

- Website: [${links.website}](${links.website})
- DApp: [${links.dapp}](${links.dapp})
- Docs: [${links.docs}](${links.docs})
- Explorer: [${links.explorer}](${links.explorer})

## Socials

${links.socials
  .map(
    (social: { label: string; url: string }) =>
      `- ${social.label}: [${social.label}](${social.url})`
  )
  .join("\n")}

## Year

${year}
`;

  return markdownContent;
};
export interface Status {
  success: boolean;
  message: string;
  data?: any | undefined;
}

export const connectDB = async () => {
  const config = useRuntimeConfig();

  if (mongoose.connection.readyState === 1) {
    console.log(`db already connected: on ${config.nodeEnv}`);
    return;
  }

  try {
    const dbUrl =
      config.nodeEnv === "production"
        ? config.mongodbUri
        : config.mongodbUriDev;

    await mongoose.connect(dbUrl);

    console.log(`db connected: on ${config.nodeEnv}`);
  } catch (err) {
    console.log("db connection error ", err);
  }
};
