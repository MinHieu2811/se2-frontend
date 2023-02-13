import React, { ChangeEvent, useState } from "react";
import Loading from "./Loading";
import { useToastContext } from "../toast/ToastContext";
import { BsFillCameraFill } from "react-icons/bs"
import { FileDrop } from "react-file-drop";

type UploadFilesProps = {
  onFilesChanged?: (files: File[]) => void;
  enableUploadSameFileTwice?: boolean;
  multiple?: boolean;
  error?: boolean;
  className?: string;
  maxSizeMB?: number;
  allowedTypes?: string;
  uploadContent?: string;
  specialContent?: string;
  uploadTitle?: string;
};

const getFileList = (files: FileList | null): File[] => {
  if (!files || files.length === 0) return [];

  const fileList: File[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (file) fileList.push(file);
  }
  return fileList;
};

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const FilesUploader: React.FC<UploadFilesProps> = ({
  onFilesChanged,
  enableUploadSameFileTwice = true,
  multiple = true,
  error = false,
  className = "",
  maxSizeMB = 100,
  allowedTypes = "video/*,image/*",
  uploadContent = "",
  specialContent = "",
  uploadTitle = "Upload Images or Video",
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toastDispatch } = useToastContext()

  async function fakeLoading() {
    setIsLoading(true)
    sleep(500).then(() => setIsLoading(false))
  }

  function validateFileType(files: FileList, allowedTypes: string) {
    const arrTypes = allowedTypes.split(',')
    let isValid = false
    for (const file of files) {
      isValid = arrTypes.filter((type) => file.type.match(type)).length > 0
      if (!isValid) {
        fakeLoading()
        toastDispatch({
          type: 'REMOVE_ALL_AND_ADD',
          payload: {
            type: 'is-danger',
            // title: 'Invalid File Type',
            content: 'This file type is not supported. Please upload videos or images only.'
          }
        })
        break
      }
    }
    return isValid
  }

  function validateFileSize(files: FileList, maxSizeMB: number) {
    let isValid = false
    for (const file of files) {
      const size = file.size
      isValid = Math.round(size / 1024) < maxSizeMB * 1024
      if (!isValid) {
        fakeLoading()
        toastDispatch({
          type: 'REMOVE_ALL_AND_ADD',
          payload: {
            type: 'is-danger',
            // title: 'File too big',
            content: `The file is too large. Maximum supported size is ${maxSizeMB}MB`
          }
        })
        break
      }
    }
    return isValid
    // return true
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) {
      return
    }
    const isValidSize = validateFileSize(files, maxSizeMB)
    if (isValidSize) {
      onFilesChanged!(getFileList(files))
    }
  }

  const onDrop = (files: FileList) => {
    const isValidType = validateFileType(files, allowedTypes)
    const isValidSize = validateFileSize(files, maxSizeMB)
    if (isValidType && isValidSize) {
      onFilesChanged!(getFileList(files))
    }
  }

  const onClick = (event: any) => {
    enableUploadSameFileTwice && (event.target.value = null)
  }

  return (
    <>
      {isLoading && <Loading isFullWidth />}
      <FileDrop onDrop={(files) => files && onDrop(files)}>
        <div className={`field ${className}`}>
          <span
            className={`file-uploads${error ? " is-error" : ""}`}
            style={{
              border: "2px dashed #C5CDD5",
              borderRadius: "8px",
            }}
          >
            <BsFillCameraFill style={{color: "black", fontSize: "20px"}}/>

            <p className="title-style body-1b ">{uploadTitle}</p>
            <p>{uploadContent || ""}</p>
            <p className="is-size-7">
              <i>{specialContent}</i>
            </p>
            <p className="is-size-7">
              <span className="maxium-style">
                (Maximum supported size: {maxSizeMB}MB)
              </span>
            </p>
            <label htmlFor="file" onClick={onClick}></label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={onChange}
              accept={allowedTypes}
              multiple={multiple}
            />
          </span>
        </div>
      </FileDrop>
    </>
  );
};


export default FilesUploader