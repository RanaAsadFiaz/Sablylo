import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {FilterModel} from 'src/app/models/filter.model';
import {User} from '../user.model';
import {Site} from 'src/app/models/site.model';
import {MatTableDataSource} from '@angular/material/table';


export interface Report {
  compliantReportData: Array<CompliantData>;
  actionAlertReportData: Array<ActivityData>;
  firstIndex: number;
  search: string;
  pageSize: number;
  pageCount: number;
  dataSource: MatTableDataSource<AverageDailyActionReport>;
  averageActionReportData: any;
  minDate: Date;
  maxDate: Date;
  dateValid: boolean;
  pulseDiv: HTMLElement;
  statusDiv: HTMLElement;
  severityDiv: HTMLElement;
  containerDiv: HTMLElement;
  averageActionForm: FormGroup;
  resolvedHazards: number;
  unResolvedHazards: number;
  siteReportDetails: Array<SiteDetailsReport>;
  siteReportData: Array<SiteReportData>;
  sites: Site[];
  siteReportForm: FormGroup;
  loading: boolean;
  days: FilterModel;
  dateEnableObj: FilterModel;
  lastWeekObj: FilterModel;
  entityId: number;
  entityName: string;
  subscription: Subscription;
  actionReportForm: FormGroup;
  actionReportData: Array<ActionReportData>;
  filters: Array<FilterModel>;
  checkInByActivityReportData: Array<ActivityData>;
  entityUsers: User[];
  checkInActivityForm: FormGroup;
  pulseByEntityReportData: Array<ActivityData>;
  pulseEntityForm: FormGroup;
  hazardReportByStatusData: HazardReportByStatusData;
  hazardReportData: HazardReportData;
  hazardReportForm: FormGroup;
}

export interface ActionReportApiData {
  entityName: string;
  dateFrom: Date;
  dateTo: Date;
  site: number;
  filter: string;
  user: number;
  archive: boolean;
}

export interface HighChartType {
  type: string;
  title: string;
  subtitle: string;
  inverted: boolean;
}

export interface ActionReportData {
  date: string;
  checkins: number;
  checkouts: number;
  pulse: number;

}

export interface ActivityData {
  result: Array<Report>;
  type: string;
  totalCount: number;
}

export interface CompliantData {
  result: Array<Report>;
  totalCount: number;
}

export interface Report {
  date: string;
  count: number;
}

export interface HazardReportData {
  date: string;
  minor: number;
  moderate: number;
  major: number;
  extreme: number;
}


export interface HazardReportByStatusData {
  minorResolved: number;
  majorResolved: number;
  moderateResolved: number;
  extremeResolved: number;
  minorUnResolved: number;
  majorUnResolved: number;
  moderateUnResolved: number;
  extremeUnResolved: number;
  resolved: number;
  unResolved: number;
  minor: number;
  moderate: number;
  major: number;
  extreme: number;
  totalHazards: number;
}

export interface SiteReportData {
  siteName: string;
  siteCheckIns: number;
  siteCheckOuts: number;
}

export interface SiteDetailsReport {
  date: string;
  siteCheckIns: number;
  siteCheckOuts: number;
}

export interface AverageDailyActionReport {
  user: string;
  averageCheckIn: string;
  averageCheckOut: string;
  averageDuration: string;
}

