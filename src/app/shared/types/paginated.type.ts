export class Paginated<T> {
    offset: number; // Current page number
    recordCount: number; // Actual number of records available in the page
    dataList: Array<T>; // User List Data
    totalPages: number; // Total number of pages
    totalRecordCount: number; // Total number of records
    limit: number; // Maximum number of records per page
    message?: string; // Error message
}
