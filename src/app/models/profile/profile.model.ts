import {FormGroup} from '@angular/forms';
import {Translation} from '../translate.model';
import {Subject, Subscription} from 'rxjs';
import {TeamList} from '../adminControl/myTeam.model';
import {responseDetails, User} from '../user.model';
import {EntityInfo} from '../userEntityData.model';
import {Leaveinfodata, UserLeavesApiResponseData} from '../profile.model';
import {CalendarEvent} from 'angular-calendar';
import {PermissionsModel} from '../adminControl/permissions.model';
import {MatTableDataSource} from '@angular/material/table';

export interface ProfileModel {
  selectedEntitySubscription: Subscription;
  entityId: number;
  permissions: PermissionsModel;
  refresh: Subject<any>;
  userLeavesData: Array<Leaveinfodata>;
  leavesCount: number;
  eventData: CalendarEvent;
  events: Array<CalendarEvent>;
  loading: boolean;
  leave: UserLeavesApiResponseData;
  userLeaves: Array<UserLeavesApiResponseData>;
  startAt: Date;
  entity: EntityInfo;
  leaveTypes: Array<LeaveTypes>;
  selectedLeave: any;
  leaveForm: FormGroup;
  selectedFilter: any;
  data: ActivityFilterData;
  pageCount: number;
  pageSize: number;
  firstIndex: number;
  filters: Array<Filters>;
  filterForm: FormGroup;
  activitiesCount: number;
  teamsData: TeamList;
  noTeam: boolean;
  connectionCount: number;
  entityCount: number;
  noEntity: boolean;
  imageFile: File;
  profileImage: Blob;
  subscription: Subscription;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  entityName: string;
  role: string;
  userData: any;
  profileForm: FormGroup;
  translated: Translation;
  profileData: any;
  userId: number;
  username: string;
  name: string;
  firstname: string;
  lastname: string;
  contactNo: string;
  dataRecieved: any;
  disabled: boolean;
  password1: string;
  password2: string;
  appIcons: any;
  appConstants: any;
  entitiesList: any;
  email: any;
  profileFeatures: ProfileFeatures;
  receivedData: any;
  currentUserProfile: boolean;
  allConnectionsData: any;
  allConnectionsRes: any;
  recentActivities: any;
  noActivity: boolean;
  duration: string;
  noConnection: boolean;
  noRecords: boolean;
}


export interface ProfileFeatures {
  general: boolean;
  entities: boolean;
  leaves: boolean;
  profile: boolean;
  changePassword: boolean;
}

// tslint:disable-next-line:class-name
export interface recentActivities {
  checkInCheckOut: checkInCheckOut;
  siteData: siteData;
  duration: string;
}

// tslint:disable-next-line:class-name
export interface checkInCheckOut {
  checkInType: any;
  checkedInAt: any;
  checkedOutAt: any;
  checkedOutType: any;
  id: number;
  site: number;
  user: number;
}

// tslint:disable-next-line:class-name
export interface siteData {
  code: string;
  createdBy: number;
  entity: number;
  gpsTrackEnabled: boolean;
  id: number;
  latitude: any;
  location: string;
  longitude: any;
  name: string;
  radius: number;
  safeZone: boolean;
  siteSafetyManager: number;
  siteSafetyPlan: string;
}

export interface Filters {
  id: number;
  name: string;
  days: number;
}

export interface ActivityFilterData {
  days: number;
  userId: number;
  dateTo?: Date;
  dateFrom?: Date;
}

export interface ActivityApiResponse {
  data: {
    pageCount: number;
    recentActivities: Array<recentActivities>;
  };
  responseDetails: responseDetails;
}

export interface LeaveTypes {
  id: number;
  name: string;
}

// tslint:disable-next-line:class-name
export interface myleave {
  id: number;
  name: string;
}

export interface LeaveDataObject {
  // tslint:disable-next-line:ban-types
  actions: Object;
  approved: boolean;
  end: string;
  leaveId: number;
  leaveType: myleave;
  rejected: boolean;
  start: string;
  title: string;
}

export interface LeavesData {
  leaveTypes: Array<myleave>;
  currentData: LeaveDataObject;
}

export interface UserCountData {
  data: UserCounts;
  responseDetails: responseDetails;
}

export interface UserCounts {
  activitiesCount: number;
  connectionCount: number;
  leavesCount: number;
  user: User;
}
