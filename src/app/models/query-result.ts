import { GLEvent } from "./gl-event";

export class QueryResult {
    pageCount: number;
    pageSize: number;
    resultCount: number;
    results: GLEvent[];
}