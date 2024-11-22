import fishbushFilter from "../utils/StrapiFilter"

export default defineEventHandler(async (event) => {
    const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL || 'https://strapi.zalubo.com';

    const contactsPopulate = [
        {
            'image': '*'
        }
    ]
    const contacts = await fishbushFilter([], contactsPopulate, 'czechskills-contacts');
    
    const formattedContacts = contacts.map(contact => ({
        id: contact.id,
        name: contact.attributes.name,
        title: contact.attributes.title,
        description: contact.attributes.description,
        image: contact.attributes?.image?.data?.attributes?.formats?.small?.url 
            ? `${STRAPI_BASE_URL}${contact.attributes.image.data.attributes.formats.small.url}`
            : null, // Handle missing images
    }));

    return formattedContacts;
})