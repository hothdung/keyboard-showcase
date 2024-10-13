import { reactive, ref, type Reactive, type Ref, onUnmounted } from 'vue'
import keyBindings from '../keybindings.json'

let isEventListenerRegistered = false

interface KeybindingEntry {
  action: () => void
  keyCombinations: string[]
  description: string
}

const keybindingsMap: Reactive<Map<string, KeybindingEntry>> = reactive(
  new Map(),
)
const selection: Ref<string> = ref('')

function handleKeydown(event: KeyboardEvent): void {
  const keyCombination = `${event.shiftKey ? 'shift+' : ''}${event.ctrlKey ? 'ctrl+' : ''}${event.altKey ? 'alt+' : ''}${mapCodeToKey(event.code)}`
  const shortcut = keyBindings.shortcuts.find(
    shortcut =>
      shortcut.keys.includes(keyCombination) &&
      shortcut.ids.some(shortcutId => keybindingsMap.has(shortcutId)),
  )

  if (!shortcut) {
    return
  }

  const callbacks = shortcut.ids
    .map(id => keybindingsMap.get(id))
    .filter(
      (keybindingEntry): keybindingEntry is KeybindingEntry =>
        !!keybindingEntry,
    )
    .map(keybindingEntry => keybindingEntry.action)

  event.preventDefault()

  if (typeof callbacks[0] === 'function') {
    callbacks[0]()
  }
}

export function useShortcutHandler(
  componentId: string,
  passedCallback: () => void,
): Ref<string> {
  const { keys, description } = keyBindings.shortcuts.find(shortcut =>
    shortcut.ids.includes(componentId),
  ) || { key: '', description: '' }

  if (!keys || keybindingsMap.has(componentId)) {
    return
  }

  keybindingsMap.set(componentId, {
    action: passedCallback,
    keyCombinations: keys,
    description,
  })

  if (!isEventListenerRegistered) {
    window.addEventListener('keydown', handleKeydown)
    isEventListenerRegistered = true
  }

  onUnmounted(() => {
    keybindingsMap.delete(componentId)
  })

  return selection
}

function isNotKeyYZ(code: string): boolean {
  return code !== 'KeyY' && code !== 'KeyZ'
}

function mapCodeToKey(code: string): string {
  if (
    isNotKeyYZ(code) &&
    (code.startsWith('Digit') || code.startsWith('Key'))
  ) {
    selection.value = code.slice(-1)
    return code.slice(-1)
  }
  switch (code) {
    case 'KeyY':
      return 'Z'
    case 'KeyZ':
      return 'Y'
    case 'Period':
      return '.'
    case 'Comma':
      return ','
    default:
      return code
  }
}
