export enum SidebarItem {
  STFU_STAKING,
  NFT_STAKING,
  HOME
}

export const SIDEBAR_ROUTES: { [key: string]: string } = {
  [SidebarItem.STFU_STAKING]: "/staking",
  [SidebarItem.NFT_STAKING]: "/nft_staking",
  [SidebarItem.HOME]: "/stfulabs.com/"
};

export const SIDEBAR_ITEMS: { [key: string]: string } = {
  [SidebarItem.STFU_STAKING]: "$STFU STAKING",
  [SidebarItem.NFT_STAKING]: "NFT STAKING",
  [SidebarItem.HOME]: "HOME"
}
