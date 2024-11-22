import fishbushFilter from "../utils/StrapiFilter"

export default defineEventHandler(async (event) => {
    const contacts = await fishbushFilter([], undefined, 'czechskills-contacts');

    return contacts;
})