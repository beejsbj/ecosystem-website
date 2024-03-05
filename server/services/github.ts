import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import { prepareMarkdown } from "./helper";

import type { ProjectType } from "../types";
import type { Status } from "./helper";

const config = useRuntimeConfig();

function parsePrivateKey() {
  const key = config.gitAppPrivateKey;
  const parsedKey =
    "-----BEGIN RSA PRIVATE KEY-----" +
    "\n" +
    key.replace(" ", "\n") +
    "\n" +
    "-----END RSA PRIVATE KEY-----";

  return parsedKey;
}

const octokitDev = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: config.gitAppIdDev,
    privateKey: parsePrivateKey(),
    installationId: config.gitAppInstallationIdDev,
    clientId: config.gitAppClientIdDev,
    clientSecret: config.gitAppClientSecretDev,
  },
});

const octoKitProd = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: config.gitAppId,
    privateKey: config.gitAppPrivateKey,
    installationId: config.gitAppInstallationId,
    clientId: config.gitAppClientId,
    clientSecret: config.gitAppClientSecret,
  },
});

const owner = config.nodeEnv === "production" ? "api3dao" : "AamirAlam";
const repo = "dapp-registry";

export async function createPR(
  projectData: ProjectType,
  projectId: string
): Promise<Status> {
  const title = projectData.name?.split(" ")?.join("-");
  const branch = `${title}-${projectId}`;
  const base = "main";
  const projectJsonPath = `projects/${title}.json`;

  const octokit = config.nodeEnv === "production" ? octoKitProd : octokitDev;

  console.log("nodeEnv", config.nodeEnv);
  console.log("private key", config.gitAppPrivateKey);
  let branchCreated = false;
  try {
    const projectJsonData: string = JSON.stringify(projectData, null, 2);

    // get the SHA of the latest commit on the base branch
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${base}`,
    });

    const baseSha = refData.object.sha;

    // create new branch from the SHA
    const { data: newBranch } = await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branch}`,
      sha: baseSha,
    });

    branchCreated = true;

    // create blob for new file content
    const { data: jsonBlob } = await octokit.git.createBlob({
      owner,
      repo,
      content: projectJsonData,
      encoding: "utf-8",
    });

    // create new tree
    const { data: newTree } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseSha,
      tree: [
        {
          path: projectJsonPath,
          mode: "100644",
          type: "blob",
          sha: jsonBlob.sha,
        },
      ],
    });

    // create new commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: `add: ${title} listing request`,
      tree: newTree.sha,
      parents: [baseSha],
    });

    // update reference to new commit
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha,
    });

    // create the PR
    const { data: prData } = await octokit.pulls.create({
      owner,
      repo,
      title,
      head: branch,
      base,
      body: prepareMarkdown(projectData),
    });
    return {
      success: true,
      message: "Project submitted successfully!",
      data: prData?.html_url,
    };
  } catch (err) {
    // delete created branch if something went wrong

    console.error("Something went wrong during pr creation: ", err);

    // delete the branch if it was created and an error occurred
    if (branchCreated) {
      try {
        await octokit.git.deleteRef({
          owner,
          repo,
          ref: `heads/${branch}`,
        });
      } catch (deleteErr) {
        console.error("Failed to delete branch:", deleteErr);
      }
    }

    return { success: false, message: "Failed to create pull request" };
  }
}
