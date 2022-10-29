import { AnnouncementDTO } from "../../models/annoucement";


export interface AnnouncementServiceInterface {
    findALLAnnouncement(): Promise<AnnouncementDTO[]>;
    addAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId }: AnnouncementDTO): Promise<AnnouncementDTO>;
    updateAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId }: AnnouncementDTO, id: number): Promise<AnnouncementDTO>;
    deleteAnnouncement( id: number ): Promise<string>;
}
