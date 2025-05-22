import { Icon, IconProps } from "@tabler/icons-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { IconType } from "react-icons";

export type GenreType = {
  id: number;
  name: string;
  Icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
};
