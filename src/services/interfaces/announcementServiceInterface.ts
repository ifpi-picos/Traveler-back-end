import AnnouncementDTO from "../../models/annoucement";


export interface IAnnouncementServiceInterface {
    findALLAnnouncement(): Promise<AnnouncementDTO[]>;
    addAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId, date }: AnnouncementDTO): Promise<AnnouncementDTO>;
    updateAnnouncement({ licensePlate, vehicle, price, socialLink, advertiserId, date }: AnnouncementDTO, id: number): Promise<AnnouncementDTO>;
    deleteAnnouncement( id: number ): Promise<string>;
}
