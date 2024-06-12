// Helper to confirm target clicked is of type Node
export function assertIsNode(
  target: EventTarget | null
): asserts target is Node {
  if (!target || !("nodeType" in target)) {
    throw new Error("Element clicked is not a react node");
  }
}

// Helper to test async functions
export async function wait() {
  return new Promise<void>((res) => {
    setTimeout(() => res(), 2000);
  });
}
