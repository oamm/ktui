/**
 * KTUI - Free & Open-Source Tailwind UI Components by Keenthemes
 * Copyright 2025 by Keenthemes Inc
 */

/**
 * Common type interfaces for the KTSelect component
 */

/**
 * Select mode options
 */
export enum SelectMode {
	TAGS = 'tags',
	COMBOBOX = 'combobox',
}

export interface KTSelectOption {
	id: string;
	title: string;
	selected?: boolean;
	description?: string;
	icon?: string;
	disabled?: boolean;
}

export interface KTSelectOptionData {
	[key: string]: any;
}

export interface KTSelectState {
	getSelectedOptions(): string[];
	setSelectedOptions(value: string | string[]): void;
	toggleSelectedOptions(value: string): void;
	isSelected(value: string): boolean;
}
