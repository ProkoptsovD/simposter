import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { ErrorNotification } from 'src/app/models/notification-service.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private error: ErrorNotification | null = null;
  private timeoutId!: any;

  constructor() {}

  setError(message: string): void {
    this.error = { id: nanoid(), message };
    this.clearErrorAsync();
  }
  
  getError(): ErrorNotification | null {
    return this.error;
  }
  clearError(): void {
    this.error = null;
    clearTimeout(this.timeoutId);
  }
  clearErrorAsync(delay: number = 2000) {
    this.timeoutId = setTimeout(() => this.clearError(), delay)
  }
}
