import slug from "slug";
import { Project } from "../models/Project";
import axios from "axios";
import type { ProjectType } from "../types";

// Replace these variables with the appropriate values
const owner = "api3dao";
const repo = "dapp-registry";
const branch = "main"; // or any other branch you want to read files from
const folderPath = "projects"; // the path to the folder containing JSON files

// Function to fetch file content from GitHub API
async function fetchFileContent(filePath: string) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        params: {
          ref: branch,
        },
      }
    );

    if (response.status === 200) {
      return Buffer.from(response.data.content, "base64").toString();
    } else {
      console.error(
        "Failed to fetch file:",
        response.status,
        response.statusText
      );
      return null;
    }
  } catch (error: any) {
    console.error("Error occurred:", error?.message);
    return null;
  }
}

// Function to store JSON files in MongoDB collection
export async function syncProjectsToMongodb() {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${folderPath}`,
      {
        params: {
          ref: branch,
        },
      }
    );

    if (response.status === 200) {
      const files = response.data.filter(
        (file: any) => file.type === "file" && file.name.endsWith(".json")
      );

      for (const file of files) {
        const filePath = file.path;
        const content = await fetchFileContent(filePath);

        if (content) {
          const projectData: ProjectType = JSON.parse(content);

          // check if title and tagline match update esle add new project entry

          const project = await Project.findOne({
            name: projectData.name,
            tagline: projectData.tagline,
          });

          if (!project?.id) {
            // insert new entry
            const newProject = await new Project({
              ...projectData,
              slug: slug(projectData.name),
            }).save();

            console.log("new project added", newProject);
            return;
          }

          // update existing project
          await Project.findByIdAndUpdate(project.id, {
            $set: { ...projectData, slug: slug(projectData.name) },
          });

          console.log(`File '${filePath}' updated into MongoDB.`);
        }
      }
    } else {
      console.error(
        "Failed to fetch folder contents:",
        response.status,
        response.statusText
      );
    }
  } catch (error: any) {
    console.error("Error occurred:", error.message);
  }
}
