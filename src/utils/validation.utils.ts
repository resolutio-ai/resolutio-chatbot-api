import { object, date, string, ObjectSchema, bool } from 'yup';

export const sendChatRequestSchema = object().shape({
    userId: string(),
    messageContent: string().required("Users message is required"),
    timeStamp: string().required("timeStamp is required"),
    isLoggedIn: bool().required("User's log in status is required")
});

interface UploadBody {
    creatorName: string,
    workName: string,
    dateOfCreation: Date,
    medium: "Film" | "Photo" | "Music" | "AI" | "Art" | "Other",
    specificMedium?: string,
    contactFile: "CC BY" | "CC BY-SA" | "CC-BY-NC" | "CC-BY-NC-SA" | "CC-BY-ND" | "CC-BY-NC-ND" | "CC0" | "resolutio License" | "Your own License"
}

export const uploadArtWorkSchema: ObjectSchema<UploadBody> = object({
    creatorName: string().required("Creator Name is Required"),
    workName: string().required("Name of Work is Required"),
    dateOfCreation: date().required("Date of Creation is Required"),
    specificMedium: string(),
    medium: string<"Film" | "Photo" | "Music" | "AI" | "Art" | "Other">().required("Medium is Required"),
    contactFile: string<"CC BY" | "CC BY-SA" | "CC-BY-NC" | "CC-BY-NC-SA" | "CC-BY-ND" | "CC-BY-NC-ND" | "CC0" | "resolutio License" | "Your own License">().required("Contact File Is Required")
});