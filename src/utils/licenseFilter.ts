import {
  ILicenseInfo,
  LICENSE_LIMIT_TYPE,
  LICENSE_SCOPE,
  PLAN_OBJECTIVE,
} from "../apis/DeductionApi";

export function getStartLicenseInfo(
  licenseInfos: ILicenseInfo[]
): ILicenseInfo {
  return Array.from(licenseInfos).find(
    (license) => license.plan.objective === PLAN_OBJECTIVE.STARTER
  );
}

export function getCreditLicenseInfo(
  licenseInfos: ILicenseInfo[]
): ILicenseInfo {
  return Array.from(licenseInfos)
    .filter((license) => license.limitLicense.scope === LICENSE_SCOPE.EDITOR)
    .find((license) => license.limitLicense.type === LICENSE_LIMIT_TYPE.CREDIT);
}

export function getTimeLicenseInfo(licenseInfos: ILicenseInfo[]): ILicenseInfo {
  return Array.from(licenseInfos)
    .filter((license) => license.limitLicense.scope === LICENSE_SCOPE.EDITOR)
    .find((license) => {
      return (
        license.limitLicense.type === LICENSE_LIMIT_TYPE.TIME &&
        license.plan.objective !== PLAN_OBJECTIVE.STARTER
      );
    });
}

export function getCountLicenseInfo(
  licenseInfos: ILicenseInfo[]
): ILicenseInfo {
  return Array.from(licenseInfos)
    .filter((license) => license.limitLicense.scope === LICENSE_SCOPE.EDITOR)
    .find((license) => license.limitLicense.type === LICENSE_LIMIT_TYPE.COUNTS);
}
