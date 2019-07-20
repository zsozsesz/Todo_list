export interface Response<T> {
    success: boolean;
    error: string;
    data: T;
}
