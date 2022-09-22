import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() errorMessage: string = 'Ups, something went wrong'
  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {}

  onClick() {
    this.notificationService.clearError();
  }
}
