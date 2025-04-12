import type { RouteRecordRaw } from 'vue-router';


export type Route = RouteRecordRaw & {
  meta?: {
    title?: string;
    // noCache?: boolean;
  };
  fullPath?: string;
  children?: Route[]
};


