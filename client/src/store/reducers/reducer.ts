import { grievanceData, changeCredentialsAction, changeGrievanceDatabyTextAction, changeGrievanceDatabyAudioAction } from "types";
import { STUDENT_CREDENTIALS, AUDIO, TEXT } from "shared/constants/constants";

import { combineReducers } from "redux"


const defaultState: grievanceData = {
    name: "",
    email: "",
    phoneno: "",
    rollno: "",
    mode: "Text",
    Text: ""
}

const GrievanceData = (state: grievanceData = defaultState,
    action: changeCredentialsAction | changeGrievanceDatabyTextAction | changeGrievanceDatabyAudioAction) => {
    switch (action.type) {
        case STUDENT_CREDENTIALS: {
            var stateCopy1: grievanceData = {
                name: state.name,
                email: state.email,
                phoneno: state.phoneno,
                rollno: state.rollno,
                mode: state.mode,
                Text: state.Text
            }
            stateCopy1.name = action.name
            stateCopy1.email = action.email
            stateCopy1.rollno = action.rollno
            stateCopy1.phoneno = action.phoneno
            return stateCopy1
        }
        case AUDIO: {
            var stateCopy2: grievanceData = {
                name: state.name,
                email: state.email,
                phoneno: state.phoneno,
                rollno: state.rollno,
                mode: state.mode,
                Text: state.Text
            }
            stateCopy2.mode = "Audio"
            stateCopy2.Audio = action.audio
            return stateCopy2
        }
        case TEXT: {
            var stateCopy3: grievanceData = {
                name: state.name,
                email: state.email,
                phoneno: state.phoneno,
                rollno: state.rollno,
                mode: state.mode,
                Text: state.Text
            }
            stateCopy3.mode = "Text"
            stateCopy3.Text = (action as changeGrievanceDatabyTextAction).text
            return stateCopy3
        }
        default:
            return state;
    }
}

const reducer = combineReducers({
    GrievanceData
})

export default reducer

export type RootState = ReturnType<typeof reducer>
