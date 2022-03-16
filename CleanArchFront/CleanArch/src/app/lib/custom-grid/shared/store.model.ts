import { promises } from "dns";
import { Observable } from "rxjs";

export interface Store {
    key?: string;
    loadUrl?: string;
    insertUrl?: string;
    updateUrl?: string;
    deleteUrl?: string;
    type?:string;
    load(loadOptions: any): Promise<Array<any>> | Observable<Array<any>>;
}