export type Intermediary = {
  id?: string;
  createdAt: string;
  name: string;
  order: number;
  type: string;
  from?: number;
  to?: number;
  step?: number;
  pairs: Array<{
    id: string;
    option?: string;
    value?: string;
  }>;
};
