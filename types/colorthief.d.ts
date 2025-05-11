declare module 'colorthief' {
  interface Color {
    0: number;
    1: number;
    2: number;
  }

  export default class ColorThief {
    getColor(sourceImage: HTMLImageElement, quality?: number): Color;
    getPalette(sourceImage: HTMLImageElement, colorCount?: number, quality?: number): Color[];
  }
}