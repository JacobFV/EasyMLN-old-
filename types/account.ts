import UserId from './userId';

export class Account {
    id: UserId;
    
    created: Date;

    personalWorkflowIds: number[];
    historicalWorkflowIds: number[];
    favoriteWorkflowIds: number[];
}