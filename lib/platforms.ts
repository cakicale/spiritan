export const platforms = ["PC", "PS5", "Xbox", "Nintendo"] as const;
export type Platform = (typeof platforms)[number];
export type PlatformFilter = Platform | "All platforms";
