  interface IWebpResponsiveLoader{
    srcset: string;
    sizes: string;
    srcOriginal: string;
    alt: string;
    placeholder: string;
  }

  declare module '*.bmp' {
    const src: IWebpResponsiveLoader;
    export default src;
  }
  
  declare module '*.jpg' {
    const src: IWebpResponsiveLoader;
    export default src;
  }
  
  declare module '*.jpeg' {
    const src: IWebpResponsiveLoader;
    export default src;
  }
  
  declare module '*.png' {
    const src: IWebpResponsiveLoader;
    export default src;
  }
  
  declare module '*.webp' {
      const src: IWebpResponsiveLoader;
      export default src;
  }