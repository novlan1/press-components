export type RoleItem = {
  label: string;
  value: string;
  children?: Array<{
    label: string;
    value: string;
  }>
};


export type HeaderRoleProps = {
  nodeName?: string;
  gameName?: string;
  roleId?: string;

  loginInfo: {
    head?: string;
    nick?: string;
    isLogin?: boolean;
  };
  roleList: Array<RoleItem>;
};
