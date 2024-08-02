import { KeyButtonProps } from "../../components/Components";

export interface Keyboard {
  keys: KeyButtonProps[][],
  notes: Record<string, string>
}
