/* tslint:disable*/
export interface Email {
    id: string;
    body: string;
    title: string;
    from: string;
    imgPath: string;
    time: Date;
    emailCategoryBg?: string;
    emailCategory?: string;
}
