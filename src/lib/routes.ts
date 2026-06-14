export function safeNextPath(nextPath: string | undefined, fallback = "/dashboard") {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return fallback;
  }

  return nextPath;
}
