// CSS modules
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Plain styles (if any package imports plain CSS/SCSS)
declare module "*.css";
declare module "*.scss";
declare module "*.sass";

// Images & fonts (optional but handy for a UI lib)
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.webp";
declare module "*.svg" {
  // If you use SVGR:
  import * as React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module "*.woff";
declare module "*.woff2";
declare module "*.ttf";
declare module "*.eot";
declare module "*.mp4";
declare module "*.webm";
declare module "*.json";
