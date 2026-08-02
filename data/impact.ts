export type ImpactStat = { value: number; displaySuffix: string; label: string; description: string; desktopPosition: string; parallax: { x: number; y: number; scroll: number }; float: { x: number[]; y: number[]; rotate: number[]; duration: number } };

export const impactStats: ImpactStat[] = [
  { value: 110, displaySuffix: "K+", label: "Students represented", description: "Through UNSS, connecting more than 110,000 students from 196 schools.", desktopPosition: "right-0 top-3 2xl:right-4", parallax: { x: 18, y: 14, scroll: -18 }, float: { x: [0, 4, 0], y: [0, -10, 0], rotate: [0, 1.5, 0], duration: 8.5 } },
  { value: 200, displaySuffix: "+", label: "Visuals created", description: "Campaigns, communication materials, identities and activist content.", desktopPosition: "right-0 bottom-2 2xl:right-4", parallax: { x: 16, y: 18, scroll: 24 }, float: { x: [0, -8, 0], y: [0, 7, 0], rotate: [0, -1, 0], duration: 10 } },
  { value: 10, displaySuffix: "+", label: "International experiences", description: "Erasmus+, OBESSU, youth programmes and European cooperation projects.", desktopPosition: "right-[17rem] top-1/2 -translate-y-1/2 2xl:right-[20rem]", parallax: { x: 18, y: 16, scroll: -24 }, float: { x: [0, 6, 0], y: [0, 8, 0], rotate: [0, 2, 0], duration: 9.5 } },
];
