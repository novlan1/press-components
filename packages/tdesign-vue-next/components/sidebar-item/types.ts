export type ISidebarItem = {
  name: string;
  path: string;
  meta?: {
    title?: string;
    icon?: string;
    // noCache?: boolean;
  };
  fullPath?: string;
  children?: ISidebarItem[]
};


