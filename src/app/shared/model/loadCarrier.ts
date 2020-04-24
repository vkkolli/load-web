export class LoadCarrier {
  carrierId?: number;
  carrierName?: string;
  dot?: string;
  scac?: string;
  active?: Boolean;

  constructor(carrierId?: number, carrierName?: string, dot?: string, scac?: string, active?: Boolean){
    this.carrierId = carrierId;
    this.carrierName = carrierName;
    this.dot = dot;
    this.scac = scac;
    this.active = active;
  }

}

