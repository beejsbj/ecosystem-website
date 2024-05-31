export * from "./Project";

export const ROLE = {
  ADMIN: "admin",
  WEBHOOK: "webhook",
  MODERATOR: "moderator",
  USER: "user",
  SERVICE_WEBHOOK: "SERVICE_WEBHOOK",
} as const;

export const UPLOAD_TYPE = {
  article: "article",
  project: "project",
};
