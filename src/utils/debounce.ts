export function debounce<F extends (...args: unknown[]) => void>(
  fn: F,
  delay = 500
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
