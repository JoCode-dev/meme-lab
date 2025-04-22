import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function genID() {
	return Math.random().toString(36).substring(2, 15);
}

export async function uriToBlob(uri: string) {
	return fetch(uri).then((res) => res.blob());
}

export async function downloadURI(uri: string, name: string) {
	const blob = await uriToBlob(uri);
	const link = document.createElement("a");
	link.download = name;
	link.href = URL.createObjectURL(blob);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("fr-FR", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(date);
}
