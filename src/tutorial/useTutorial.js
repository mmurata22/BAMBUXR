import { useState } from 'react'
import { TUTORIAL_STEPS } from './steps.js'

export function useTutorial() {
  const [stepIndex, setStepIndex] = useState(0)
  const step = TUTORIAL_STEPS[stepIndex]

  const next = () => setStepIndex((i) => Math.min(i + 1, TUTORIAL_STEPS.length - 1))
  const back = () => setStepIndex((i) => Math.max(i - 1, 0))

  return {
    step,
    stepIndex,
    total: TUTORIAL_STEPS.length,
    isLast: stepIndex === TUTORIAL_STEPS.length - 1,
    next,
    back,
  }
}