export interface ResResult<T = any> {
  code: number;
  data: T;
  message: string;
  extra: any;
}
