import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HelperService} from 'src/app/services/common/helperService/helper.service';
import {NotificationService} from 'src/app/features/navigation/services/notification.service';
import {Translation} from 'src/app/models/translate.model';
import {DirectNotificationList, NotificationList, RequestObject, DirectObjectDetails} from 'src/app/models/navigation/notification.model';
import {SubSink} from 'subsink';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-notificationNav',
  templateUrl: 'notificationNav.component.html',
  styleUrls: ['notificationNav.component.scss']
})
export class NotificationNavComponent implements OnInit {
  @Output() notificationCount = new EventEmitter();
  translated: Translation;
  directMessages: Array<DirectObjectDetails> = [];
  requests: RequestObject[] = [];
  counter = 0;
  noMessageData = false;
  noRequestData = false;
  private subs = new SubSink();

  constructor(
    public helperService: HelperService,
    public notificationService: NotificationService
  ) {
    this.translated = this.helperService.translated;
    this.initialize();
  }

  initialize() {
    this.constructRequests();
    this.constructDirectMessages();
  }

  ngOnInit(): void {
  }

  /**
   * Get direct messages
   */
  constructDirectMessages() {
    this.notificationService.getDirectMessages().subscribe((response: any) => {
      if (response && response.data && response.responseDetails.code === this.helperService.appConstants.codeValidations[0]) {
        this.noMessageData = false;
        this.directMessages = response.data.notifications;
        this.counter = this.counter + this.directMessages.length;
        this.notificationCount.emit(this.counter);
      } else {
        this.noMessageData = true;
        this.directMessages = [];
        this.counter = 0;
        this.notificationCount.emit(this.counter);
      }
    }, (error) => {
      this.helperService.createSnack(this.helperService.translated.MESSAGES.ERROR_MSG, this.helperService.constants.status.ERROR);
    });
  }

  /**
   * Get requests array
   */
  constructRequests() {
    this.notificationService.getRequestsData().subscribe((response: NotificationList) => {
      if (response && response.data && response.responseDetails.code === this.helperService.appConstants.codeValidations[0]) {
        this.noRequestData = false;
        this.requests = response.data.requestsList;
        this.counter = this.counter + this.requests.length;
        this.notificationCount.emit(this.counter);
      } else {
        this.noRequestData = true;
        this.directMessages = [];
        this.counter = 0;
        this.notificationCount.emit(this.counter);
      }
    }, (error) => {
      this.helperService.createSnack(this.helperService.translated.MESSAGES.ERROR_MSG, this.helperService.constants.status.ERROR);
    });
  }

  clear(id) {
    const data = {
      id,
    };
    this.notificationService.archiveNotification(data).subscribe((res) => {
      this.counter = this.counter - 1;
      this.constructDirectMessages();
    }, (error) => {
      this.helperService.createSnack(this.helperService.translated.MESSAGES.ERROR_MSG, this.helperService.constants.status.ERROR);
    });
  }


  /**
   * this function is used for adding connections
   * receivedBy  id of the selected user.
   * @params receivedBy
   */

  confirmConnections(receivedFrom: number) {
    // this.subs.add(
    //   this.memberService.confirmConnection({sentBy: receivedFrom}).subscribe((res) => {
    //     if (res.responseDetails.code === this.helperService.appConstants.codeValidations[0]) {
    //       this.helperService.createSnack(this.helperService.translated.MESSAGES.CONFIRM_CONNECTION_SUCCESS,
    //         this.helperService.constants.status.SUCCESS);
    //       this.counter = this.counter - 1;
    //       this.constructRequests();
    //       this.constructDirectMessages();
    //     } else if (res.responseDetails.code === this.helperService.appConstants.codeValidations[4]) {
    //       this.helperService.createSnack(this.helperService.translated.MESSAGES.CONFIRM_CONNECTION_FAILURE,
    //         res.responseDetails.message);
    //     }
    //
    //   }, (error) => {
    //     this.helperService.createSnack(this.helperService.translated.MESSAGES.CONFIRM_CONNECTION_FAILURE,
    //       this.helperService.constants.status.ERROR);
    //   }));
  }

  /**
   * this function is used for removing connections
   * receivedBy  id of the selected user to remove.
   * @params receivedBy
   */

  removeConnections(sentToUserId: number) {
    // this.subs.add(
    //   this.memberService.removeConnection({receivedBy: sentToUserId}).subscribe((res) => {
    //     if (res.responseDetails.code === this.helperService.appConstants.codeValidations[0]) {
    //       this.helperService.createSnack(this.helperService.translated.MESSAGES.REMOVE_CONNECTION_SUCCESS,
    //         this.helperService.constants.status.SUCCESS);
    //       this.counter = this.counter - 1;
    //       this.constructRequests();
    //       this.constructDirectMessages();
    //     } else if (res.responseDetails.code === this.helperService.appConstants.codeValidations[4]) {
    //       this.helperService.createSnack(this.helperService.translated.MESSAGES.REMOVE_CONNECTION_FAILURE,
    //         res.responseDetails.message);
    //     }
    //
    //   }, (error) => {
    //     this.helperService.createSnack(this.helperService.translated.MESSAGES.REMOVE_CONNECTION_FAILURE,
    //       this.helperService.constants.status.ERROR);
    //   }));
  }


}
