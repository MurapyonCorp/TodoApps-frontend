export interface CountUpTimerModel {
  id: string;
  target_date: {
    startDate: string;
    endDate: string;
  };
  total_amounts: string;
  created_at: Date;
  updated_at: Date;
}
