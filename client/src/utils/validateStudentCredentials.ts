import { JSONresponse } from "types"

const validateStudentCredentials = async (rollno: string, email: string,): Promise<JSONresponse> => {
    try {
        const response = await fetch("/api/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.trim(),
                rollno: rollno.trim()
            })
        })
        console.log(response)
        if (!response.ok)
            return {
                message: "We are having trouble connecting to the servers, please try after some time.",
                valid: false
            }
        const responseData = await response.json();
        return {
            message: responseData.message,
            valid: true
        }
    } catch  {
        return {
            message: "We are having trouble connecting to the servers, please try after some time.",
            valid: false
        }
    }
}

export default validateStudentCredentials