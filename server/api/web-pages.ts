import fishbushFilter from "../utils/StrapiFilter";

export default defineEventHandler(async (event) => {
  function customError(code = 404, message = "Page not found") {
    return sendError(
      event,
      createError({ statusCode: code, statusMessage: message })
    );
  }

  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;

  const fullUrl = new URL("api/czechskills-webpages", baseUrl);

  // Get query parameters from the incoming request
  const incomingQuery = getQuery(event);

  // Extract the slug from the query parameters
  const slug = incomingQuery.slug?.toString();

  if (!slug) {
    return customError();
  }

  const webpagesFilter = {
    slug: {
      eq: slug,
    },
  };

  const webpagesPopulate = [{ pageContent: "**" }];

  const data = fishbushFilter(
    webpagesFilter,
    webpagesPopulate,
    "czechskills-webpages"
  );

  

  return data;
});
