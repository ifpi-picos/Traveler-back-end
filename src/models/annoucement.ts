export default interface AnnouncementDTO {
  vehicle: string;
  licensePlate: string; 
  price: number;
  socialLink: string;
  advertiserId: number;
  startRoute: string;
  endRoute: string;
  date: Date;
  image: string
}

export interface filterAnnouncement {
  endRoute?: string;
  startRoute?: string;
  convertedDate?: Date;
  advertiserId?: number;
}