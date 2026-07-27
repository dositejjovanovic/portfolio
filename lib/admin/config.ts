export const adminConfig = {
  enabled: true,
  footerEntryVisible: true,
  allowRegistrations: false,
  supportedLocales: ["en", "sr"] as const,
  sessionMaxAgeSeconds: 60 * 60 * 8,
  mediaBucket: "portfolio-media",
};

export type AdminLocale = (typeof adminConfig.supportedLocales)[number];
