import { GLSource } from "./GLSource";

export class GLEvent {
    id: number;
    name: string;
    location: string;
    date: Date;
    source: GLSource;
    description?: string;
    eventPageUrl?: string;
}