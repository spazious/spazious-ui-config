import { JSONSchemaForNPMPackageJsonFiles2 as PackageJSON } from "@schemastore/package";
import { readFileSync } from "node:fs";

/**
 * Read package.json file and return its content with type notation
 */
export const readPackageJson = (path: string): PackageJSON =>
  JSON.parse(readFileSync(path, "utf-8"));

export default readPackageJson;
