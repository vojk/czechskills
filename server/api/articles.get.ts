import fishbushFilter from "../utils/StrapiFilter"

export default defineEventHandler(async (event) => {
    const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL || 'https://strapi.zalubo.com';

    const articlesPopulate = [
        {
            'coverImage': '*'
        }
    ]
    const articles = await fishbushFilter([], articlesPopulate, 'czechskills-articles');
    
    const formattedArticles = articles.map(article => ({
        id: article.id,
        title: article.attributes.title,
        author: article.attributes.author,
        dateOfRelease: article.attributes.dateOfRelease,
        description: article.attributes.description,
        coverImage: article.attributes?.coverImage?.data?.attributes?.formats?.small?.url 
            ? `${STRAPI_BASE_URL}${article.attributes.coverImage.data.attributes.formats.small.url}`
            : null, // Handle missing images
    }));

    return formattedArticles;
})