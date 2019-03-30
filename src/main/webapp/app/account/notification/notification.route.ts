import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { NotificationComponent } from './notification.component';

export const notificationRoute: Route = {
    path: 'notification',
    component: NotificationComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'global.menu.account.settings'
    },
    canActivate: [UserRouteAccessService]
};
