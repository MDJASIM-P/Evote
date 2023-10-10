import { Candidate } from "./candidate";
import { User } from "./user";
export interface Event {
    id: number;
    title: string;
    reg_end_dt: string;
    e_start_dt: string;
    e_end_dt: string;
    status: string;
    candidates: Candidate[]; // You can specify the correct type for candidates and voters
    voters: User[];
}


