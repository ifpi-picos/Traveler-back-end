import AnnouncementDTO, { filterAnnouncement } from "../../models/annoucement";


export interface IAnnouncementServiceInterface {
    findALLAnnouncement(): Promise<AnnouncementDTO[]>;
    findAnnouncementByFilter({dateConvertido, startRoute, endRoute}: filterAnnouncement): Promise<AnnouncementDTO[]>
    addAnnouncement(data: AnnouncementDTO): Promise<AnnouncementDTO>;
    updateAnnouncement(data: AnnouncementDTO, id: number): Promise<AnnouncementDTO>;
    deleteAnnouncement( id: number ): Promise<string>;
}
