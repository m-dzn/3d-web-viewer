"use client";
import { ChangeEventHandler, useRef } from "react";
import Button, { ButtonProps } from "./Button";

interface UploadButtonProps extends ButtonProps {
  onFileChange: ChangeEventHandler<HTMLInputElement>;
}

const UploadButton = ({
  onFileChange,
  children,
  ...rest
}: UploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleClickButton = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Button {...rest} onClick={handleClickButton}>
        {children}
      </Button>
      <input type="file" ref={fileInputRef} hidden onChange={onFileChange} />
    </>
  );
};

export default UploadButton;
