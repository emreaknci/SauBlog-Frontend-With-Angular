
export interface BlogForCreateDto {
    writerId?: number;
    title?: string;
    content?: string;
    imagePath?:string ;
    categoryIds:number[];
}