import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = process.env.REACT_APP_SERVER_URL;
const getMimeType = (extension) => {
    switch(extension){
        case '.docx':{
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        }
        break
        case '.xlsx':{
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
    }
}
export const handleCreateNewFile = (fileName,extention, id) => {
    const formData = new FormData();
    formData.append("originalname", `${fileName}-${id}.${extention}`);
    formData.append("mimetype", getMimeType(extention));
    formData.append("id", id);
    const body = {
        "profile": formData,
    }
    return axios.post(url+ "/file/attach", formData, {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${body._boundary}`,
        }
    }).then(response => {
        if (response.status >= 200 && response.status < 300)
          toast.success("Attachment Uploaded Successfully!");
    })
    .catch(error => {
        toast.error(error.message);
    })
}

export const handleSingleFileUpload = (file, id) => {
    const formData = new FormData();
    formData.append("profile", file, file.name);
    formData.append("originalname", file.name);
    formData.append("mimetype", file.type);
    formData.append("id", id);
    const body = {
        "profile": formData,
    }
    return axios.post(url+ "/file/attach", formData, {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${body._boundary}`,
        }
    }).then(response => {
        if (response.status >= 200 && response.status < 300)
          toast.success("Attachment Uploaded Successfully!");
    })
    .catch(error => {
        toast.error(error.message);
    })
}