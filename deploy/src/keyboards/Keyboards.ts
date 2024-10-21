import { DefaultHorizontal } from "./default_horizontal/DefaultHorizontal"

import { DefaultHorizontalInterval } from "./default_horizontal_interval/DefaultHorizontalInterval"

import { DefaultVertical } from "./default_vertical/DefaultVertical"

import { GuitarArm } from "./guitar_arm/GuitarArm"

export { KeyboardParameters } from "./keyboard_parameters/KeyboardParameters"

export { type Keyboard } from "./keyboard/Keyboard"

export abstract class Keyboards {

  static default_horizontal = "Keyboard"
  static default_horizontal_cromatic = "Keyboard Cromatic"
  static default_horizontal_interval_7 = "Keyboard Interval 7"
  static default_horizontal_interval_5 = "Keyboard Interval 5"
  static default_vertical = "Keyboard Vertical"
  static guitar_eadgbe = "Guitar"
  static guitar_dadgbe = "Guitar DADGBE"
  static guitar_dgdgbd = "Guitar DGDGBD"

  static get(name: string = Keyboards.guitar_eadgbe) {
    switch(name) {
      case Keyboards.default_horizontal:
        return DefaultHorizontal
      case Keyboards.default_vertical:
        return DefaultVertical
      case Keyboards.default_horizontal_cromatic:
        return new DefaultHorizontalInterval({division: 6, step: -19})
      case Keyboards.default_horizontal_interval_7:
        return new DefaultHorizontalInterval({tuning: {1: 35, 2: 28, 3: 21, 4: 14, 5: 6}})
      case Keyboards.default_horizontal_interval_5:
        return new DefaultHorizontalInterval()
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