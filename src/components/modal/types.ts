/**
 * KTUI - Free & Open-Source Tailwind UI Components by Keenthemes
 * Copyright 2025 by Keenthemes Inc
 */

export interface KTModalConfigInterface {
	zindex?: string;
	backdrop: boolean;
	backdropClass: string;
	backdropStatic: boolean;
	keyboard: boolean;
	disableScroll: boolean;
	persistent: boolean;
	focus: boolean;
	hiddenClass: string;
}
export interface KTModalInterface {
	show(): void;
	hide(): void;
	toggle(): void;
}
