/**
 * typeof won't try to evaluate "window",
 * it will only try to get its type,
 * by doing that we know if the script
 * is running on a web browser
 * @returns boolean
 */
const isBrowser = () => {
  return typeof window !== "undefined";
};

export default isBrowser;
