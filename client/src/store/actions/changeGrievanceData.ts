import { STUDENT_CREDENTIALS, AUDIO, TEXT } from "shared/constants/constants"
import { changeCredentialsAction, changeGrievanceDatabyAudioAction, changeGrievanceDatabyTextAction } from "types"

const changeCredentials = (fname: string, lname: string, rollno: string, phoneno: string, email: string): changeCredentialsAction => {
    return {
        type: STUDENT_CREDENTIALS,
        name: (fname.trim() + " " + lname.trim()),
        rollno: rollno,
        phoneno: phoneno,
        email: email
    }
}

const changeGrievanceDatabyAudio = (audio: Blob): changeGrievanceDatabyAudioAction => {
    return {
        type: AUDIO,
        audio: audio
    }
}

const changeGrievanceDatabyText = (text: string): changeGrievanceDatabyTextAction => {
    return {
        type: TEXT,
        text: text
    }
}

export { changeCredentials, changeGrievanceDatabyAudio, changeGrievanceDatabyText }