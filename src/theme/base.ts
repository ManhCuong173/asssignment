import { keyframes } from "styled-components"

export enum KeyFramesEnum {
	fade = 'fade'
}

export const base: BaseType = {
   spacing: [0, 4, 8, 16, 24, 32, 48, 64],
   keyframes: {
      [KeyFramesEnum.fade]: keyframes`
		0% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		};
	`,
}}
 


 export type BaseType = {
    spacing: number[]
    keyframes: Record<KeyFramesEnum, any>
 }
 