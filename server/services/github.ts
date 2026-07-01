import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import { prepareMarkdown } from "./helper";
import type { ProjectType } from "../types";
import type { Status } from "./helper";
import axios from "axios";

function parsePrivateKey(config: ReturnType<typeof useRuntimeConfig>) {
  const key: any =
    config.nodeEnv === "production"
      ? config.gitAppPrivateKey
      : config.gitAppPrivateKeyDev;

  if (!key) {
    throw new Error("GitHub app private key is not configured.");
  }

  const parsedKey =
    "-----BEGIN RSA PRIVATE KEY-----" +
    "\n" +
    key.replace(" ", "\n") +
    "\n" +
    "-----END RSA PRIVATE KEY-----";

  return parsedKey;
}

const repo = "dapp-registry";

function createGithubClient(config: ReturnType<typeof useRuntimeConfig>) {
  const isProduction = config.nodeEnv === "production";

  return new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: isProduction ? config.gitAppId : config.gitAppIdDev,
      privateKey: parsePrivateKey(config),
      installationId: isProduction
        ? config.gitAppInstallationId
        : config.gitAppInstallationIdDev,
      clientId: isProduction ? config.gitAppClientId : config.gitAppClientIdDev,
      clientSecret: isProduction
        ? config.gitAppClientSecret
        : config.gitAppClientSecretDev,
    },
  });
}

function getRepoOwner(config: ReturnType<typeof useRuntimeConfig>) {
  return config.nodeEnv === "production" ? "api3dao" : "AamirAlam";
}

export async function createPR(projectData: ProjectType): Promise<Status> {
  const config = useRuntimeConfig();
  const title = projectData.name?.split(" ")?.join("-");
  const branch = `${title}-${Date.now()}`;
  const base = "main";
  const projectJsonPath = `projects/${title}.json`;
  const octokit = createGithubClient(config);
  const repoOwner = getRepoOwner(config);

  let branchCreated = false;
  try {
    const projectJsonData: string = JSON.stringify(projectData, null, 2);

    // get the SHA of the latest commit on the base branch
    const { data: refData } = await octokit.git.getRef({
      owner: repoOwner,
      repo,
      ref: `heads/${base}`,
    });

    const baseSha = refData.object.sha;

    // create new branch from the SHA
    const { data: newBranch } = await octokit.git.createRef({
      owner: repoOwner,
      repo,
      ref: `refs/heads/${branch}`,
      sha: baseSha,
    });

    branchCreated = true;

    // create blob for new file content
    const { data: jsonBlob } = await octokit.git.createBlob({
      owner: repoOwner,
      repo,
      content: projectJsonData,
      encoding: "utf-8",
    });

    // create new tree
    const { data: newTree } = await octokit.git.createTree({
      owner: repoOwner,
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
      owner: repoOwner,
      repo,
      message: `add: ${title} listing request`,
      tree: newTree.sha,
      parents: [baseSha],
    });

    // update reference to new commit
    await octokit.git.updateRef({
      owner: repoOwner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha,
    });

    // create the PR
    const { data: prData } = await octokit.pulls.create({
      owner: repoOwner,
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
          owner: repoOwner,
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

/**
 * Checks if project with the same name already submitted to dapp-registry repo
 * @param projectData
 * @returns bool
 */
export async function isProjectExists(
  projectData: ProjectType
): Promise<Boolean> {
  try {
    const config = useRuntimeConfig();
    const repoOwner = getRepoOwner(config);
    const fileListEndpoint = `https://api.github.com/repos/${repoOwner}/${repo}/contents/projects`;

    const projectList = [];

    const data = await axios.get(fileListEndpoint);
    const repoItems: any[] = await data.data;

    // Batch processing
    const batchSize = 20;
    for (let i = 0; i < repoItems.length; i += batchSize) {
      const batch = repoItems.slice(i, i + batchSize);
      const batchPromises = batch.map((item) => axios.get(item.download_url));

      const batchResults = await Promise.all(batchPromises);
      const batchProjects = batchResults.map((res) => res.data);

      projectList.push(...batchProjects);
    }

    const isExists =
      projectList.findIndex((el) => el.name === projectData.name) >= 0;

    return isExists;
  } catch (err: any) {
    console.log("failed to read git repo in func: isProjectExists ", err);
    return false;
  }
}
