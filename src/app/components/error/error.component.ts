import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  public errorMessage: string | null | undefined = '';

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.errorMessage = this.notificationService.getError()?.message;
  }

  onClick() {
    this.notificationService.clearError();
  }
}
