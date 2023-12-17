import { ProjectType } from "server/types";
import shelljs from "shelljs";
import { createPR } from "./github";
import fs from "fs";

interface BuildStatus {
  success: boolean;
  message: string;
  data?: any | undefined;
}

const config = useRuntimeConfig();

const DAPP_REPO_URL =
  config.nodeEnv === "production"
    ? config.dappRegistryProd
    : config.dappRegistryDev;

async function verifyBuild(
  projectData: ProjectType,
  projectId: string
): Promise<BuildStatus> {
  // chenge dir to dapp-registry
  return new Promise(async (resolve, reject) => {
    const isProjectDirExists = shelljs.exec(`cd dapp-registry`).code === 0;

    if (!isProjectDirExists) {
      const isGitInstalled = shelljs.exec(`git --version`).code === 0;

      if (!isGitInstalled) {
        reject({ success: false, message: "Git installation failed" });
        return;
      }

      const isCloned = shelljs.exec(` git clone ${DAPP_REPO_URL}`).code === 0;

      if (!isCloned) {
        reject({ success: false, message: "Git clone failed" });
        return;
      }
    }
    // append new project and run build

    const isBuildChecked =
      shelljs.exec(`cd dapp-registry && git stash && git pull --rebase && yarn`)
        .code === 0;

    if (!isBuildChecked) {
      reject({ success: false, message: "Git pull failed" });
      return;
    }

    const prTitle = projectData.name?.split(" ")?.join("-");
    const branch = `${prTitle}-${projectId}`;
    const path = `projects/${prTitle}.json`;

    // check if project file with same name already exists in projects directory in the repo
    const isAlreadyExists =
      shelljs.exec(`cd dapp-registry && cat ${path}`).code === 0;

    if (isAlreadyExists) {
      reject({
        success: false,
        message: "File with same name already exists in repo",
      });
      return;
    }

    // add project json inside projects folder
    const isProjectAdded =
      shelljs.exec(
        `cd dapp-registry && echo '${JSON.stringify(
          projectData,
          null,
          2
        )}' > ${path}`
      ).code === 0;

    if (!isProjectAdded) {
      reject({ success: false, message: "Failed to add project data to repo" });
      return;
    }

    const isBuildSuccess =
      shelljs.exec(`cd dapp-registry && yarn build`).code === 0;

    if (!isBuildSuccess) {
      reject({
        success: false,
        message: "New project did not match the build requirement",
      });
      return;
    }

    // create pr after build success

    const prStatus = await createPR(projectData, projectId);

    if (!prStatus.success) {
      // clean git repo after pr created
      const isCleaned =
        shelljs.exec(`cd dapp-registry && git reset --hard && git clean -fd`)
          .code === 0;

      reject({
        success: false,
        message: prStatus.message,
      });
      return;
    }

    // clean git repo after pr created
    const isCleaned =
      shelljs.exec(`cd dapp-registry && git reset --hard && git clean -fd`)
        .code === 0;

    resolve({
      success: true,
      message: prStatus.message,
      data: prStatus.data,
    });
  });
}

export async function checkBuildStatus(
  projectData: ProjectType,
  projectId: string
): Promise<BuildStatus> {
  try {
    const buildStatus = await verifyBuild(projectData, projectId);

    console.log("buildStatus", buildStatus);
    return buildStatus;
  } catch (error: any) {
    console.log("build failed", error);
    return error;
  }
}
