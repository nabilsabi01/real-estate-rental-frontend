import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-toast-notifications',
  standalone: true,
  imports: [CommonModule, ToastModule],
  template: '<p-toast position="bottom-right" styleClass="custom-toast"></p-toast>',
  styles: [],
  providers: [MessageService]
})
export class ToastNotificationsComponent {
  constructor(private messageService: MessageService) {}

  showToast(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000
    });
  }
}