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