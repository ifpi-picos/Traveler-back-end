
export default function verifyIfNotANumber(param: string) {
    const number = Number(param)

    if (!number) {
        throw new Error("Algum campo inválido!");
    }
    
}