import axios from "axios";
import { mathMarks } from "../../models/customTypes";

function buildPopulateQuery(populate) {
    if (!populate || !Array.isArray(populate)) return '';

    return populate
        .map((item) => {
            if (typeof item === 'string') {
                return `populate[${item}][populate]=link`;
            } else if (typeof item === 'object') {
                // Handles cases where populate contains nested objects
                return Object.entries(item)
                    .map(([key, value]) => `populate[${key}][populate]=${value}`)
                    .join('&');
            }
            return '';
        })
        .join('&');
}

export default async function fishbushFilter(filter: Object, populate?: string[], path?: string) {
    const fishbushApiUrl = process.env.FISHBUSH_API_URL;
    let query = `${fishbushApiUrl}/api/${path}`;
    let hasQueryParams = false;

    function extractFilterToFormat(filter: any): string[] {
        const result: string[] = [];

        function processObject(key: string, value: any) {
            if (Array.isArray(value)) {
                // If the filter is an array (for $in), join the values with a comma
                result.push(`filters[${key}][$in]=${value.join(',')}`);
            } else if (typeof value === 'object' && value !== null) {
                // Handle nested filter objects, like $lt, $gt
                for (const nestedKey in value) {
                    if (Array.isArray(value[nestedKey])) {
                        value[nestedKey].forEach((item, index) => {
                            result.push(`filters[${key}][$${nestedKey}][${index}]=${item}`);
                        });
                    } else if (typeof value[nestedKey] === 'object' && value[nestedKey] !== null) {
                        // Recursively handle nested objects
                        processObject(`${key}][${nestedKey}`, value[nestedKey]);
                    } else {
                        // Handle cases where there is an operator, such as $lt, $gt, etc.
                        const operator = mathMarks[nestedKey as keyof typeof mathMarks];
                        if (operator) {
                            result.push(`filters[${key}][${operator}]=${encodeURI(value[nestedKey])}`);
                        } else {
                            result.push(`filters[${key}][$${nestedKey}]=${encodeURI(value[nestedKey])}`);
                        }
                    }
                }
            } else {
                // Handle simple key-value pairs
                result.push(`filters[${key}]=${encodeURI(value)}`);
            }
        }

        for (const key in filter) {
            processObject(key, filter[key]);
        }

        return result;
    }

    if (filter !== null && filter !== undefined) {
        const filterArray = extractFilterToFormat(filter);
        if (filterArray.length > 0) {
            query = `${query}?${filterArray.join('&')}`;
            hasQueryParams = true;
        }
    }

    if (populate !== null && populate !== undefined) {
        const populateParams = buildPopulateQuery(populate);
        if (populateParams) {
            if (hasQueryParams) {
                query = `${query}&${populateParams}`;
            } else {
                query = `${query}?${populateParams}`;
                hasQueryParams = true;
            }
        }
    }

    const fetchPage = async (page: number) => {
        try {
            let pageQuery;
            if (hasQueryParams) {
                pageQuery = `${query}&pagination[page]=${page}&pagination[pageSize]=100`;
            } else {
                pageQuery = `${query}?pagination[page]=${page}&pagination[pageSize]=100`;
            }
            console.log(`Fetching ${pageQuery}`);
            const response = await axios.get(pageQuery, {
                headers: {
                    Authorization: `Bearer ${process.env.FISHBUSH_API_KEY}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching page ${page}:`, error.message);
            return null;
        }
    };

    const fetchAllData = async () => {
        let allData: any[] = [];
        let currentPage = 1;
        let hasNextPage = true;

        while (hasNextPage) {
            const pageData = await fetchPage(currentPage);
            if (!pageData) {
                break;
            }

            allData = [...allData, ...pageData.data];
            hasNextPage = currentPage < pageData.meta.pagination.pageCount;
            currentPage++;
        }

        return allData;
    };

    return await fetchAllData();
}