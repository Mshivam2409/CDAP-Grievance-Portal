const validateStudentCredentials = async (email: string, rollno: string): Promise<boolean> => {
    let isValid = false
    const response = await fetch("/validate", {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email.trim(),
            rollno: rollno.trim()
        })
    })
    const responseData = await response.json()
    if (response.status == 200) {
        isValid = true
    }
    return isValid
}

export default validateStudentCredentials