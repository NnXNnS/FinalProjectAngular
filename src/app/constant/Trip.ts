import {Bus} from '../constant/Bus'
import {Stop} from '../constant/Stop'
export class Trip{
    id:string;
    fare:number;
    journeyTime:number;
    sourceStopId:string;
    destStopId:string;
    busId:string;
    agencyId:string;
    createdDate:Date;
    updatedDate:Date;
    bus:Bus;
    sourceStop:Stop;
    destinationStop:Stop;
}