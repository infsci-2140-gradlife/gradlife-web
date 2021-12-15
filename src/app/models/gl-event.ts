import { GLSource } from "./gl-source";

export class GLEvent {
    id: number;
    title: string;
    location: string;
    date: Date;
    isRecurring: boolean;
    source: GLSource;
    description?: string;
    url?: string;
}