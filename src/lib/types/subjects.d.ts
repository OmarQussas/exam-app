export type Subject = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};

export type GetSubjectsOptions = {
  page?: number;
  limit?: number;
};
