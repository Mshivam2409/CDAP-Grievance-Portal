import { PathLike } from "fs";

export interface grievance {
    name: string,
    rollno: string,
    phoneno: string,
    email: string,
    date: number,
    resolved: "Not Resolved" | "In Progress" | "Resolved",
    mode: "Audio" | "Text"
    audio?: PathLike,
    text?: string
}

export interface grievanceDB {
    [id: string]: grievance
}


export interface grievanceFormData {
    name: string,
    rollno: string,
    email: string,
    phoneno: string,
    mode: "Audio" | "Text"
    text?: string
}