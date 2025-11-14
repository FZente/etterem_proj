export type Review = {
    comment: string;
    rating: number;
    created_at: Date;
    user_id?: number;
    restaurant_id?: number;
    id?: number;
}