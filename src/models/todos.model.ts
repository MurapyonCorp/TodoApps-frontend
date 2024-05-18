export enum TodoStatus {
  incomplete = "incomplete",
  done = "done",
}

export interface TodoModel {
  id: string;
  target_date: object;
  title: string;
  status: TodoStatus;
  created_at: Date;
  updated_at: Date;
}
