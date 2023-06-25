import { JSONSchemaForNPMPackageJsonFiles2 as PackageJSON } from "@schemastore/package";

export const chekFreshInstall = (pkg: PackageJSON) =>
  pkg.scripts?.prepare === undefined;
