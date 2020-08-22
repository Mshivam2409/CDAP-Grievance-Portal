const generateGrievanceData = (name: string, rollno: string, email: string, audio: Blob): FormData => {
    const data = new FormData();
    const audioFile = new File([audio], `${name}.wav`, {
        type: "audio/wav",
        lastModified: Date.now(),
    });
    data.append("audio", audioFile, `${name}.wav`)
    data.append("name", name)
    data.append("rollno", rollno)
    data.append("email", email)
    return data
}

export default generateGrievanceData