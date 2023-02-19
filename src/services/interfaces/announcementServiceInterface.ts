import AnnouncementDTO, { filterAnnouncement } from "../../models/annoucement";


export interface IAnnouncementServiceInterface {
    findAnnouncement({convertedDate, startCity, endCity}: filterAnnouncement): Promise<AnnouncementDTO[]>;
    addAnnouncement(data: AnnouncementDTO): Promise<AnnouncementDTO>;
    updateAnnouncement(data: AnnouncementDTO, id: number): Promise<AnnouncementDTO>;
    deleteAnnouncement( id: number ): Promise<string>;
    verifyAnnouncementExist(id: number): Promise<AnnouncementDTO>;
}
