// prefix keeps our keys separate from anything else on the domain
const PREFIX = 'conwerse:'

// read a saved value; returns the fallback if storage is blocked, empty or corrupted
export function load(key, fallback) {
  // storage can throw in private windows or when site data is blocked
  try {
    // raw text saved earlier, or null
    const raw = window.localStorage.getItem(PREFIX + key)
    // nothing saved yet
    if (raw === null) return fallback
    // turn the text back into data
    return JSON.parse(raw)
  } catch {
    // any problem: start fresh instead of crashing
    return fallback
  }
}

// save a value; silently does nothing if storage is unavailable
export function save(key, value) {
  // storage can throw when full or blocked
  try {
    // store as text
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // ignore: the shop still works, it just will not remember after reload
  }
}
