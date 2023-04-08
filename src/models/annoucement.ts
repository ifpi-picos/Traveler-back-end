export default interface AnnouncementDTO {
  vehicle:       string;
  licensePlate:  string; 
  price:         number;
  socialLink:    string;
  advertiserId:  number;
  vacancy:       number;
  date:          Date;
  originAddressId: number;
  destinationAddressId: number;
  image:         string;
}

export interface filterAnnouncement {
  endCity?: string;
  startCity?: string;
  convertedDate?: Date;
  advertiserId?: number;
}

export interface AnnouncementUpdate {
  licensePlate: string 
  vehicle: string
  price: number
  socialLink: string
  advertiserId: number
  date: Date
  image: string
  endDistrict: string
  endStreet: string
  endCity: string
  endState: string
  endReferencePoint: string
  startDistrict: string
  startStreet: string
  startCity: string
  startState: string
  startReferencePoint: string
  startZipCode: string
  endZipCode: string
}
