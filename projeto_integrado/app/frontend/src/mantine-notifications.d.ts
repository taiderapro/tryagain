// src/mantine-notifications.d.ts
declare module '@mantine/notifications' {
    import * as React from 'react';
  
    export interface NotificationsProviderProps {
      children: React.ReactNode;
    }
  
    export function NotificationsProvider(props: NotificationsProviderProps): JSX.Element;
  
    export interface ShowNotificationOptions {
      title?: React.ReactNode;
      message?: React.ReactNode;
      color?: string;
      autoClose?: number | false;
      // Adicione outras propriedades conforme necessário
    }
  
    export function showNotification(options: ShowNotificationOptions): void;
  }
  