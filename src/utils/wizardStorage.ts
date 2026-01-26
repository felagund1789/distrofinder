import type { WizardAnswers } from "./scoring";

const STORAGE_KEY = "distrofinder:wizard:v1";

interface PersistedWizardState {
  step: number;
  answers: WizardAnswers;
}

export function loadWizardState(): PersistedWizardState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (
      typeof parsed !== "object" ||
      typeof parsed.step !== "number" ||
      typeof parsed.answers !== "object"
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveWizardState(state: PersistedWizardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // fail silently
  }
}

export function clearWizardState() {
  localStorage.removeItem(STORAGE_KEY);
}
