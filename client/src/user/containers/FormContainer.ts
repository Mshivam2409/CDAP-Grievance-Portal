import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "store/reducers/reducer";
import {
  changeCredentials,
  changeGrievanceDatabyAudio,
  changeGrievanceDatabyText,
} from "store/actions/changeGrievanceData";
import GrievanceForm from "user/pages/Form";

const mapStateToProps = (state: RootState) => {
  return {
    grievanceData: state.GrievanceData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCredentials: (
      fname: string,
      lname: string,
      rollno: string,
      phoneno: string,
      email: string
    ) => {
      dispatch(changeCredentials(fname, lname, rollno, phoneno, email));
    },
    setAudio: (audio: File) => {
      dispatch(changeGrievanceDatabyAudio(audio));
      console.log(audio)
    },
    setText: (text: string) => {
      dispatch(changeGrievanceDatabyText(text));
    },
  };
};

const FormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GrievanceForm);

export default FormContainer;

export type FormProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;
