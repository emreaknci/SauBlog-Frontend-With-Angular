
export interface BlogForListDto {
    id?: number;
    commentCount?: number;
    title?: String;
    writerNickName?: String;
    writerId?:number;
    imagePath?: String;
    createdDate?: Date;
    status?: Boolean;
}