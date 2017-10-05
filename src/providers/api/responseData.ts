export class ResponseData{
    constructor(){
        this.data={};
        this.status=500;
        this.success=false;
        this.statusText='';
    }
    data:any;
    statusText: string;
    status: number;
    success: boolean
}