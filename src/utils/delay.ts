/**
 * 延迟指定时间，用于确保最小加载时间
 * @param ms 延迟毫秒数
 * @returns Promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 确保异步操作至少执行指定时间
 * @param promise 需要执行的Promise
 * @param minTime 最小执行时间（毫秒）
 * @returns Promise<T>
 */
export const withMinDelay = async <T>(
  promise: Promise<T>,
  minTime: number
): Promise<T> => {
  const startTime = Date.now()
  const result = await promise
  const elapsedTime = Date.now() - startTime
  
  if (elapsedTime < minTime) {
    await delay(minTime - elapsedTime)
  }
  
  return result
}