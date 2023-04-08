import AnnouncementDTO, { AnnouncementUpdate, filterAnnouncement } from "../../models/annoucement";


export interface IAnnouncementServiceInterface {
    findAnnouncement({convertedDate, startCity, endCity}: filterAnnouncement): Promise<AnnouncementDTO[]>;
    addAnnouncement(data: AnnouncementDTO): Promise<AnnouncementDTO>;
    updateAnnouncement(data: AnnouncementUpdate, id: number): Promise<AnnouncementDTO>;
    deleteAnnouncement( id: number ): Promise<string>;
    verifyAnnouncementExist(id: number): Promise<AnnouncementDTO>;
}
