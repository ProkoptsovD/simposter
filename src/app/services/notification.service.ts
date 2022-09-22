import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { ErrorNotification } from 'src/app/models/notification-service.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  error: ErrorNotification | null = null;

  constructor() {}

  setError(message: string): void {
    this.error = { id: nanoid(), message }
  }
  
  getError(): ErrorNotification | null {
    return this.error;
  }
  clearError(): void {
    this.error = null;
  }
  clearErrorAsync(delay: number = 1000) {
    setTimeout(() => this.clearError(), delay)
  }
}
