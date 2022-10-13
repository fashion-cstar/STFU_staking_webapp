export enum SidebarItem {
  STFU_STAKING,
  NFT_STAKING,
  HOME
}

export const SIDEBAR_ROUTES: { [key: string]: {type:string, link:string} } = {
  [SidebarItem.STFU_STAKING]: {type: "internal", link: "/staking"},
  [SidebarItem.NFT_STAKING]: {type: "internal", link: "/nft_staking"},
  [SidebarItem.HOME]: {type: "external", link: "https://stfulabs.com"}
};

export const SIDEBAR_ITEMS: { [key: string]: string } = {
  [SidebarItem.STFU_STAKING]: "$STFU STAKING",
  [SidebarItem.NFT_STAKING]: "NFT STAKING",
  [SidebarItem.HOME]: "HOME"
}
