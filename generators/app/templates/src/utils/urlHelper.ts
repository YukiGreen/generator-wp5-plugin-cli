export const urlRootPath = (): string => {
  return location.href.replace(location.hash, "").replace(/\/$/, "");
};
