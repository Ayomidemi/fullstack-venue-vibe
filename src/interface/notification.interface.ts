export interface NotificationAction {
  title: string;
  link: string;
}

export interface Notification {
  userId?: string;
  deviceUrl?: string;
  message: string;
  title: string;
  action: NotificationAction;
  type?: string;
  txId?: string;
}
