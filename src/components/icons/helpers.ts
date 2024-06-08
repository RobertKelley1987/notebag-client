const defaultSize = "size-8";

export function svgClassNames(className?: string) {
  let classNames = defaultSize;
  if (className) classNames += " " + className;
  return classNames;
}
