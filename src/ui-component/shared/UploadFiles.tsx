import React, { ChangeEvent, useState } from "react";
import Loading from "./Loading";
import { useToastContext } from "../toast/ToastContext";
import { BsFillCameraFill } from "react-icons/bs"
import { FileDrop } from "react-file-drop";

type UploadFilesProps = {
  onFilesChanged?: (files: File) => void;
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

const getFileList = (files: File | null): File | null => {
  if (!files) return null;
  return files;
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

  function validateFileType(files: File, allowedTypes: string) {
    let fileList = [files]
    const arrTypes = allowedTypes.split(',')
    let isValid = false
    for (const file of fileList) {
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

  function validateFileSize(files: File, maxSizeMB: number) {
    let fileList = [files]
    let isValid = false
    for (const file of fileList) {
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
    const isValidSize = validateFileSize(files[0], maxSizeMB)
    if (isValidSize && files[0]) {
      onFilesChanged!(getFileList(files[0]) as File)
    }
  }

  const onDrop = (files: File) => {
    const isValidType = validateFileType(files, allowedTypes)
    const isValidSize = validateFileSize(files, maxSizeMB)
    if (isValidType && isValidSize && files) {
      onFilesChanged!(getFileList(files) as File)
    }
  }

  const onClick = (event: any) => {
    enableUploadSameFileTwice && (event.target.value = null)
  }

  return (
    <>
      {isLoading && <Loading isFullWidth />}
      <FileDrop onDrop={(files) => files && onDrop(files[0])}>
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
              name="multiple-files"
              id="file"
              onChange={onChange}
              accept={allowedTypes}
              multiple={false}
            />
          </span>
        </div>
      </FileDrop>
    </>
  );
};


export default FilesUploader