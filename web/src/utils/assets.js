// Utility function to get the correct asset path based on the environment
export const getAssetPath = (path) => {
  return `${import.meta.env.BASE_URL}${path}`;
};
