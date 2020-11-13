export const isServer = () => {
  if (typeof window === "undefined") {
    return true;
  } else {
    return false;
  }
};
