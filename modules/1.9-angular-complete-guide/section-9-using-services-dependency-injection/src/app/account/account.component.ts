import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: []
})
export class AccountComponent {
  @Input() account: { name: string, status: string };
  @Input() id: number;

  constructor(private accountService: AccountService) { }

  onSetTo(status: string) {
    this.accountService.updateStatus({ id: this.id, newStatus: status });
    this.accountService.statusUpdated.emit(status);
  }
}
