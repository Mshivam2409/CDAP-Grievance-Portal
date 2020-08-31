import { JSONresponse, grievanceData } from "types";

const submitGrievanceData = async (formdata: grievanceData): Promise<JSONresponse> => {

    const data = new FormData();
    const time = Date.now()

    data.append("name", formdata.name.trim())
    data.append("rollno", formdata.rollno.trim())
    data.append("email", formdata.email.trim())
    data.append("phoneno", formdata.phoneno.trim())
    data.append("mode", formdata.mode.trim())
    data.append("date", time.toString())

    if (formdata.mode === "Audio") {
        const audioFile = new File([formdata.Audio as Blob], `${formdata.rollno.trim()}.wav`, {
            type: "audio/wav",
            lastModified: time,
        });
        data.append("audio", audioFile, `${formdata.rollno.trim()}.wav`)
    }
    else if (formdata.mode === "Text") {
        data.append("text", formdata.Text as string)
    }

    const response = await fetch("/api/newGrievance", {
        method: "POST",
        body: data,
    })
    if (response.status === 409) {
        return {
            message: "We found a duplicate pending request , please wait for it to be resolved!",
            valid: false
        }
    }
    if (!response.ok)
        return {
            message: "We are having trouble connecting to the servers, please try after some time",
            valid: false
        }
    const responseData = await response.json();
    return {
        message: responseData.message,
        valid: true
    }
}

export default submitGrievanceData