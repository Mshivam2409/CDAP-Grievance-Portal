import { JSONresponse, grievanceData } from "types";

const submitGrievanceData = async (formdata: grievanceData): Promise<JSONresponse> => {

    const data = new FormData();

    data.append("name", formdata.name)
    data.append("rollno", formdata.rollno)
    data.append("email", formdata.email)
    data.append("phoneno", formdata.phoneno)
    data.append("mode", formdata.mode)

    if (formdata.mode === "Audio") {
        const audioFile = new File([formdata.Audio as Blob], `${formdata.name}.wav`, {
            type: "audio/wav",
            lastModified: Date.now(),
        });
        data.append("audio", audioFile, `${formdata.name}.wav`)
    }
    else if (formdata.mode === "Text") {
        data.append("text", formdata.Text as string)
    }

    const response = await fetch("/api/newGrievance", {
        method: "POST",
        body: data,
    })

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