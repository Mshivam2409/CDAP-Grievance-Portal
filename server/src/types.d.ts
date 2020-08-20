import { PathLike } from "fs";

export interface grievance {
    id: string
    student: string,
    rollno: string,
    email: string,
    resolved: boolean,
    audio?: PathLike,
    text?: string
}

export interface grievanceFormData {
    student: string,
    rollno: string,
    email: string
}