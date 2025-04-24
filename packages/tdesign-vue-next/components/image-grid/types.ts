export interface RawImage {
  qiniu_key?: string;
  origin_name?: string;
  updatedAt?: string;
  createdAt?: string;
  id?: string
}

export interface ParsedImage extends RawImage {
  url: string;
  name: string;
}
