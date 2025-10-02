declare module "react-player" {
  import { ComponentType, CSSProperties } from "react";
  interface ReactPlayerProps {
    url: string | string[];
    width?: string | number;
    height?: string | number;
    controls?: boolean;
    playing?: boolean;
    light?: boolean | string;
    style?: CSSProperties;
    className?: string;
  }
  const ReactPlayer: ComponentType<ReactPlayerProps>;
  export default ReactPlayer;
}
