export const forkjoinRequest = async (promises: Promise<any>[]): Promise<any[]> => {
  const result = []

  for (let index = 0; index < promises.length; index++) {
    result.push(await promises[index])
  }

  return result
}
