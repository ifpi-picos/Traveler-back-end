export default interface AnnouncementDTO {
  vehicle:       string;
  licensePlate:  string; 
  price:         number;
  socialLink:    string;
  advertiserId:  number;
  endDistrict:   string;
  endStreet:     string;
  endCity:       string;
  endState:      string;
  endCep:        string;
  startDistrict: string;
  startStreet:   string;
  startCity:     string;
  startState:    string;
  startCep:      string;
  date:          Date;
  image:         string;
}

export interface filterAnnouncement {
  endCity?: string;
  startCity?: string;
  convertedDate?: Date;
  advertiserId?: number;
}