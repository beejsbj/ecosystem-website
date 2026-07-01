import { useRouteCache } from "#nuxt-multi-cache/composables";
import { showcaseOevProtocols } from "~/server/data/showcaseOev";

export default defineEventHandler(async (event) => {
  useRouteCache((helper) => {
    helper.setCacheable();
  }, event);

  event.node.req.statusCode = 200;
  return showcaseOevProtocols;
});
