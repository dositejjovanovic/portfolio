export type ImpactStat = { value: number; displaySuffix: string; label: string; description: string; desktopPosition: string; parallax: { x: number; y: number; scroll: number }; float: { x: number[]; y: number[]; rotate: number[]; duration: number } };

export const impactStats: ImpactStat[] = [
  { value: 110, displaySuffix: "K+", label: "Students represented", description: "Through UNSS, connecting more than 110,000 students from 196 schools.", desktopPosition: "-right-8 top-10 2xl:-right-3", parallax: { x: 14, y: 12, scroll: -16 }, float: { x: [0, 4, 0], y: [0, -8, 0], rotate: [0, 1.5, 0], duration: 8.5 } },
  { value: 200, displaySuffix: "+", label: "Visuals created", description: "Campaigns, communication materials, identities and activist content.", desktopPosition: "-right-6 bottom-12 2xl:-right-1", parallax: { x: 14, y: 14, scroll: 20 }, float: { x: [0, -6, 0], y: [0, 6, 0], rotate: [0, -1, 0], duration: 10 } },
  { value: 10, displaySuffix: "+", label: "International experiences", description: "Erasmus+, OBESSU, youth programmes and European cooperation projects.", desktopPosition: "right-[21rem] bottom-3 2xl:right-[23rem]", parallax: { x: 14, y: 14, scroll: -20 }, float: { x: [0, 5, 0], y: [0, 6, 0], rotate: [0, 2, 0], duration: 9.5 } },
];
