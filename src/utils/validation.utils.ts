import yup from 'yup';

export const sendChatRequestSchema = yup.object().shape({
    userId : yup.string(),
    messageContent: yup.string().required("Users message is required"),
    timeStamp: yup.string().required("timeStamp is required"), 
    isLoggedIn: yup.bool().required("User's log in status is required")
});