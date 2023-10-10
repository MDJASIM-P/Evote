import { User } from "./user";
export interface Candidate {
    id:number;
    student: any;
    reg_dt:string;
    group:string;
    symbol:string;
    votes:number;
    status:string;
}
