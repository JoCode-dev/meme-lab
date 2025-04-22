import type Konva from "konva";

export type ShapeOpts = {
	id: string;
	type: "rect" | "text";
	props: Konva.RectConfig | Konva.TextConfig;
	component?: React.JSX.Element;
};

export interface Meme {
	id: string;
	name: string;
	image_url: string;
	created_at: string;
}
