
export function verifyIfPastDate(day: number, month: number, year: number) {
    const dateActual = new Date();
    const dayActual = dateActual.getDate();
    const monthActual = dateActual.getMonth() + 1;
    const yearActual = dateActual.getFullYear();

    if (year < yearActual || year == yearActual && month < monthActual || year == yearActual && month == monthActual && day < dayActual){
        throw new Error ("Informe uma data válida.");
    }
}
