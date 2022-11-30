
export function verifyIfNotANumber(param: string): number {
    const number = Number(param)

    if (!number) {
        throw new Error("Algum campo inválido!");
    }
    
    return number
}
