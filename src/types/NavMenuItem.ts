export type menuItem = {
  to: string;
  title: string;
};

export type navMenuItem = {
  to?: string;
  title: string;
  submenu?: menuItem[];
};
