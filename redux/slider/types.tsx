export interface getSliderResponse {
  message: string;
  status: number;
  data:
    | {
        id: number;
        title: string | null;
        image: string | null;
        description: string | null;
        link: string | null;
        created_at: Date | null;
        updated_at: Date | null;
      }[]
    | null;
}
