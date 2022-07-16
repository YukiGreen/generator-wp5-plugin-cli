import Controls from "../../package.json";

const isDev = process.env.NODE_ENV !== "production";
const docRootPath = isDev ? "doc" : `doc/${Controls.version}`;
export default docRootPath;
