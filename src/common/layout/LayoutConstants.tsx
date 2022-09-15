export enum SidebarItem {
  STAKING,
  HOME
}

export const SIDEBAR_ROUTES: { [key: string]: string } = {
  [SidebarItem.STAKING]: "/staking",
  [SidebarItem.HOME]: "/stfulabs.com/"
};

export const SIDEBAR_ITEMS: { [key: string]: string } = {
  [SidebarItem.STAKING]: "STAKING",
  [SidebarItem.HOME]: "HOME"
}
