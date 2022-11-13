import AnnouncementDTO from "../../models/annoucement";


export interface IAnnouncementServiceInterface {
    findALLAnnouncement(): Promise<AnnouncementDTO[]>;
    addAnnouncement(data: AnnouncementDTO): Promise<AnnouncementDTO>;
    updateAnnouncement(data: AnnouncementDTO, id: number): Promise<AnnouncementDTO>;
    deleteAnnouncement( id: number ): Promise<string>;
}
