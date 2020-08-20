export interface RequestObject {
  user: User;
  time: string;
}

export interface NotificationList {
  data: {
    requestsList: Array<RequestObject>
  },
  responseDetails: {
    code: number,
    message: string
  }
}

export interface DirectObjectDetails {
  user: User
  read: boolean,
  id: number,
  image: string,
  message: string,
  time: string,
  type: string
}

export interface User {
  contactNo: string,
  email: string,
  first_name: string,
  id: number,
  is_active: boolean,
  last_name: string,
  profileImage: string,
  username: string,
}

export interface DirectNotificationList {
  data: {
    pageCount: number;
    notifications: Array<DirectObjectDetails>;
  },
  responseDetails: {
    code: number,
    message: string
  }
}
