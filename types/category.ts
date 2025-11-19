export interface Category {
    _id: string,
    name: string
}


export type CategoryResponse = {
    data: Category[],
    message: string,
    status: number,
};

