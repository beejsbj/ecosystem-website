import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import fs from "fs";

interface PrStatus {
  success: boolean;
  message: string;
  data?: any | undefined;
}

const config = useRuntimeConfig();
const octokit = new Octokit({
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
  projectData: any,
  projectId: string
): Promise<PrStatus> {
  const title = projectData.name?.split(" ")?.join("-");
  const branch = `${title}-${projectId}`;
  const base = "main";
  const projectJsonPath = `projects/${title}.json`;
  const projectTsPath = "src/generated/projects.ts";

  let branchCreated = false;
  try {
    // Read local files
    const projectJsonData: string = fs.readFileSync(
      `dapp-registry/${projectJsonPath}`,
      "utf-8"
    );
    const projectTsData: string = fs.readFileSync(
      `dapp-registry/${projectTsPath}`,
      "utf-8"
    );

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

    const { data: tsBlob } = await octokit.git.createBlob({
      owner,
      repo,
      content: projectTsData,
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
        {
          path: projectTsPath,
          mode: "100644",
          type: "blob",
          sha: tsBlob.sha,
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
