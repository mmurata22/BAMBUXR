export default function TutorialUI({ step, stepIndex, total, next, back, isLast }) {
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 10, maxWidth: 480, padding: '16px 20px', borderRadius: 12,
      background: 'rgba(20,20,20,0.85)', color: '#fff', fontSize: 15,
    }}>
      <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 6 }}>
        Step {stepIndex + 1} of {total}
      </div>
      <div style={{ marginBottom: 12 }}>{step.instruction}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={back} disabled={stepIndex === 0}>Back</button>
        <button onClick={next} disabled={isLast}>{isLast ? 'Done' : 'Next'}</button>
      </div>
    </div>
  )
}