
export default function verifyIfNotANumber(param: string) {
    const number = parseInt(param)

    if (!number) {
        throw new Error("O 'id' passado não é um numero!");
    }
    
}