export interface IPagination {
    hasPrevPage?: boolean;
    hasNextPage?: boolean;
    totalPages?: number;
    prevPage: number | null;
    nextPage: number | null;
    perPage: number | null;
    page: number | null;
}