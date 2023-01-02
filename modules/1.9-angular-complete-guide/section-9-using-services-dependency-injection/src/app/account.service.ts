import { EventEmitter, Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()
export class AccountService {
    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];
    
    statusUpdated = new EventEmitter<string>();

    constructor(private loggingService: LoggingService){}

    addAccount( name: string, status: string ) {
        this.accounts.push({name,status});
        this.loggingService.logStatusChange(status);
    }
    
    updateStatus(updateInfo: { id: number, newStatus: string }) {
        this.accounts[updateInfo.id].status = updateInfo.newStatus;
        this.loggingService.logStatusChange(updateInfo.newStatus);
    }
}