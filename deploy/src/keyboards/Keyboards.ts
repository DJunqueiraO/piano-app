import { keyboards } from "../assets/Assets"

import { DefaultHorizontal } from "./default_horizontal/DefaultHorizontal"

import { DefaultHorizontalCromatic } from "./default_horizontal_cromatic/DefaultHorizontalCromatic"

import { DefaultVertical } from "./default_vertical/DefaultVertical"

import { GuitarArm } from "./guitar_arm/GuitarArm"

export { KeyboardParameters } from "./keyboard_parameters/KeyboardParameters"

export { type Keyboard } from "./keyboard/Keyboard"

export class Keyboards {

  static default_horizontal = "Keyboard Horizontal"
  static default_horizontal_cromatic = "Keyboard Horizontal Cromatic"
  static default_vertical = "Keyboard Vertical"
  static guitar_arm = "Guitar Arm"

  static get(name: string) {
    switch(name) {
      case Keyboards.default_horizontal:
        return DefaultHorizontal
      case Keyboards.default_vertical:
        return DefaultVertical
      case Keyboards.default_horizontal_cromatic:
        return DefaultHorizontalCromatic
      case Keyboards.guitar_arm:
        return new GuitarArm()
      default:
        return DefaultHorizontal
    }
  }
}