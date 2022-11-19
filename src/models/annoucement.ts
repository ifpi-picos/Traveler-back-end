export default interface AnnouncementDTO {
  vehicle: string;
  licensePlate: string; 
  price: number;
  socialLink: string;
  advertiserId: number;
  startRoute: string;
  endRoute: string;
  date: Date;
}

export interface filterAnnouncement {
  endRoute?: string;
  startRoute?: string;
  dateConvertido?: Date;
}