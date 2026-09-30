export function CheckoutSteps({ active }: { active: 1 | 2 | 3 }) {
  return <ol className="checkout-steps" aria-label="Demo purchase steps">{["Cart", "Checkout", "Complete"].map((label, index) => <li key={label} className={active === index + 1 ? "current" : active > index + 1 ? "done" : ""} aria-current={active === index + 1 ? "step" : undefined}><span>{String(index + 1).padStart(2, "0")}</span>{label}</li>)}</ol>;
}
