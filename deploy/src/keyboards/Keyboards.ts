import { DefaultHorizontal } from "./default_horizontal/DefaultHorizontal"

import { DefaultHorizontalCromatic } from "./default_horizontal_cromatic/DefaultHorizontalCromatic"

import { DefaultHorizontalInterval7 } from "./default_horizontal_interval_7/DefaultHorizontalInterval7"

import { DefaultVertical } from "./default_vertical/DefaultVertical"

import { GuitarArm } from "./guitar_arm/GuitarArm"

export { KeyboardParameters } from "./keyboard_parameters/KeyboardParameters"

export { type Keyboard } from "./keyboard/Keyboard"

export abstract class Keyboards {

  static default_horizontal = "Keyboard"
  static default_horizontal_cromatic = "Keyboard Cromatic"
  static default_horizontal_interval_7 = "Keyboard Interval 7"
  static default_vertical = "Keyboard Vertical"
  static guitar_eadgbe = "Guitar"
  static guitar_dadgbe = "Guitar DADGBE"
  static guitar_dgdgbd = "Guitar DGDGBD"

  static get(name: string) {
    switch(name) {
      case Keyboards.default_horizontal:
        return DefaultHorizontal
      case Keyboards.default_vertical:
        return DefaultVertical
      case Keyboards.default_horizontal_cromatic:
        return DefaultHorizontalCromatic
      case Keyboards.default_horizontal_interval_7:
        return DefaultHorizontalInterval7
      case Keyboards.guitar_eadgbe:
        return new GuitarArm()
      case Keyboards.guitar_dadgbe:
        return new GuitarArm({6: -2})
      case Keyboards.guitar_dgdgbd:
        return new GuitarArm({1: 22, 5: 3, 6: -2})
      default:
        return DefaultHorizontal
    }
  }
}