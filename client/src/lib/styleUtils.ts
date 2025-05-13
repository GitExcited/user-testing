export type ButtonStyle = "style1" | "style2" | "style3" | "style4";
export type ButtonPosition = "above-textbox" | "below-textbox" | "right-textbox" | "stacked";

export const buttonStyles: Record<ButtonStyle, string> = {
  "style1": "style1-buttons",
  "style2": "style2-buttons",
  "style3": "style3-buttons",
  "style4": "style4-buttons"
};

export const buttonPositions: Record<ButtonPosition, string> = {
  "above-textbox": "position-above-textbox",
  "below-textbox": "position-below-textbox",
  "right-textbox": "position-right-textbox",
  "stacked": "position-stacked"
};
