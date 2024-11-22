import fishbushFilter from "../../utils/StrapiFilter";

function strapiContentToHTML(content) {
    let html = "";
  
    content.forEach((block) => {
      switch (block.type) {
        case "paragraph":
          html += "<p>";
          block.children.forEach((child) => {
            html += formatChild(child);
          });
          html += "</p>";
          break;
        case "heading":
          const headingLevel = block.level || 1; // Default to <h1> if no level is specified
          html += `<h${headingLevel}>`;
          block.children.forEach((child) => {
            html += formatChild(child);
          });
          html += `</h${headingLevel}>`;
          break;
        case "list":
          const listType = block.style === "ordered" ? "ol" : "ul";
          html += `<${listType}>`;
          block.items.forEach((item) => {
            html += "<li>";
            item.children.forEach((child) => {
              html += formatChild(child);
            });
            html += "</li>";
          });
          html += `</${listType}>`;
          break;
        default:
          console.warn(`Unknown block type: ${block.type}`);
      }
    });
  
    return html;
  }
  
  function formatChild(child) {
    let html = "";
  
    switch (child.type) {
      case "text":
        html += child.text || "";
        break;
      case "bold":
        html += `<strong>${child.text || ""}</strong>`;
        break;
      case "italic":
        html += `<em>${child.text || ""}</em>`;
        break;
      case "link":
        html += `<a href="${child.url || "#"}">${child.text || ""}</a>`;
        break;
      default:
        console.warn(`Unknown child type: ${child.type}`);
    }
  
    return html;
  }

export default defineEventHandler(async (event) => {
  const STRAPI_BASE_URL =
    process.env.STRAPI_BASE_URL || "https://strapi.zalubo.com";

  try {
    const id = event.context.params?.id;

    // Validate id
    if (!id) {
      throw createError({
        statusCode: 400,
        message: "The 'id' query parameter is required.",
      });
    }

    // Define filters and populate options
    const articlesPopulate = [
      {
        coverImage: "*",
      },
    ];

    const articleFilter =
      {
        id: {
          eq: id,
        },
      };

    // Fetch articles using the custom fishbushFilter
    const articles = await fishbushFilter(
      articleFilter,
      articlesPopulate,
      "czechskills-articles"
    );

    console.log(articles);

    // Check if articles were found
    if (!articles || articles.length === 0) {
      return {
        message: "No articles found for the provided ID.",
        data: [],
      };
    }

    // Format the articles for the response
    const formattedArticles = articles.map((article) => ({
      id: article.id,
      title: article.attributes.title,
      author: article.attributes.author,
      dateOfRelease: article.attributes.dateOfRelease,
      description: article.attributes.description,
      content: strapiContentToHTML(article.attributes.content),
      coverImage: article.attributes?.coverImage?.data?.attributes?.formats
        ?.medium?.url
        ? `${STRAPI_BASE_URL}${article.attributes.coverImage.data.attributes.formats.medium.url}`
        : null, // Handle missing images
    }));

    return formattedArticles;
  } catch (error) {
    // Log the error and return a meaningful message
    console.error("Error fetching articles:", error);

    throw createError({
      statusCode: error.statusCode || 500,
      message:
        error.message ||
        "An unexpected error occurred while fetching articles.",
    });
  }
});
