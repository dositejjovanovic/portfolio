export type ImpactStat = { value: number; displaySuffix: string; label: string; description: string; desktopPosition: string; parallax: { x: number; y: number; scroll: number }; float: { x: number[]; y: number[]; rotate: number[]; duration: number } };

export const impactStats: ImpactStat[] = [
  { value: 110, displaySuffix: "K+", label: "Students represented", description: "Through UNSS, connecting more than 110,000 students from 196 schools.", desktopPosition: "right-[4%] top-[1rem] 2xl:right-[8%]", parallax: { x: 28, y: 20, scroll: -18 }, float: { x: [0, 4, 0], y: [0, -10, 0], rotate: [0, 1.5, 0], duration: 8.5 } },
  { value: 200, displaySuffix: "+", label: "Visuals created", description: "Campaigns, communication materials, identities and activist content.", desktopPosition: "right-[5%] top-[20rem] 2xl:right-[10%]", parallax: { x: 24, y: 28, scroll: 24 }, float: { x: [0, -8, 0], y: [0, 7, 0], rotate: [0, -1, 0], duration: 10 } },
  { value: 10, displaySuffix: "+", label: "International experiences", description: "Erasmus+, OBESSU, youth programmes and European cooperation projects.", desktopPosition: "right-[27%] top-[8rem] 2xl:right-[31%]", parallax: { x: 22, y: 20, scroll: -24 }, float: { x: [0, 6, 0], y: [0, 8, 0], rotate: [0, 2, 0], duration: 9.5 } },
];
