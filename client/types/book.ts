export interface Book {
    id?: string;
    title?: string;
    isbn?: string;
    description?: string;
    publisher?: string;
    pageNumbers?: string;
}

export interface Books {
    Books: Book[]
}