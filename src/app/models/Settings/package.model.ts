import {PackageInfo} from '../user.model';

export interface Package {
  packageValue: number;
  packageInfo: PackageInfo;
  proceedDisable: boolean;
  trialExpired: boolean;
  currentPackage: string;
  name: string;
  packagePrice: number;
}
