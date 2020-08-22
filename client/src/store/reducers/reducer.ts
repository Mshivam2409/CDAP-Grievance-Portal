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
            var stateCopy: grievanceData = {
                name: state.name,
                email: state.email,
                phoneno: state.phoneno,
                rollno: state.rollno,
                mode: state.mode,
                Text: state.Text
            }
            stateCopy.name = action.name
            stateCopy.email = action.email
            stateCopy.rollno = action.rollno
            stateCopy.phoneno = action.phoneno
            return stateCopy
        }
        case AUDIO: {
            var stateCopy: grievanceData = {
                name: state.name,
                email: state.email,
                phoneno: state.phoneno,
                rollno: state.rollno,
                mode: state.mode,
                Text: state.Text
            }
            stateCopy.mode = "Audio"
            stateCopy.Audio = action.audio
            return stateCopy
        }
        case TEXT: {
            var stateCopy: grievanceData = {
                name: state.name,
                email: state.email,
                phoneno: state.phoneno,
                rollno: state.rollno,
                mode: state.mode,
                Text: state.Text
            }
            stateCopy.mode = "Text"
            stateCopy.Text = (action as changeGrievanceDatabyTextAction).text
            return stateCopy
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
