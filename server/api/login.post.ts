import fishbushFilter from "../utils/StrapiFilter";

export default defineEventHandler(async (event) => {
  const { specialHash } = await readBody(event);

  const userFilter = {
    hash: {
      eq: specialHash,
    },
  };

  const user = await fishbushFilter(userFilter, undefined, 'czechskills-users');

  if (!user) {
    setResponseStatus(event, 401);
    return { error: 'Invalid credentials' };
  }

  return specialHash;
});
