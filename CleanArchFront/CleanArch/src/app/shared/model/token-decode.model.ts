export class TokenDecodeModel {
    constructor(public Email: string, public FirstName: string,public LastName:string,public Permissions:Array<object>) {
    }
}