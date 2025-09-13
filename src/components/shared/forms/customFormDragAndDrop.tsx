"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { cn } from "@/lib/utils";
import { Upload, File as FileIcon, X, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext, FieldValues, Path, PathValue } from "react-hook-form";
import Image from "next/image";
import { myAlert } from "@/lib/myAlert";
import ImageCropModal from "@/components/shared/imageCropModal";

type FileAcceptType =
  | "image/*"
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "image/gif"
  | "image/webp"
  | "application/pdf"
  | "application/msword" // .doc
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document" // .docx
  | "application/vnd.ms-excel" // .xls
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
  | "text/plain"
  | ".csv"
  | ".zip"
  | ".rar"
  | ".txt"
  | ".json"
  | ".xml"
  | ".mp4"
  | ".mp3"
  | ".wav";

interface CustomFormDragAndDropProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  maxSize?: number; // in MB
  maxFiles?: number;
  acceptedFileTypes?: FileAcceptType[];
  className?: string;
  required?: boolean;
  handleDeleteFile?: (val: string) => void;
}

export function CustomFormDragAndDrop<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  maxSize = 5,
  maxFiles = 1,
  acceptedFileTypes = ["image/jpeg", "image/png"],
  className,
  required = false,
  handleDeleteFile,
}: CustomFormDragAndDropProps<T>) {
  const { control, watch, setValue } = useFormContext<T>();
  const fieldValue = watch(name) as PathValue<T, Path<T>> | string | undefined;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="capitalize">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <FileUploadControl
              value={field.value as unknown as File[]}
              onChange={(files) =>
                setValue(
                  field.name,
                  files as unknown as PathValue<T, Path<T>>,
                  {
                    shouldValidate: true,
                  }
                )
              }
              maxSize={maxSize}
              maxFiles={maxFiles}
              acceptedFileTypes={acceptedFileTypes}
              fieldValue={
                typeof fieldValue === "string"
                  ? [fieldValue]
                  : Array.isArray(fieldValue)
                    ? fieldValue.filter((f: any) => typeof f === "string")
                    : undefined
              }
              handleDeleteFile={handleDeleteFile}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface FileUploadControlProps {
  value?: File[];
  onChange: (files: File[]) => void;
  maxSize?: number;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  fieldValue?: string[];
  handleDeleteFile?: (url: string) => void;
  pickerType?: "google";
}

const FileUploadControl: React.FC<FileUploadControlProps> = ({
  value = [],
  onChange,
  maxSize = 100,
  maxFiles = 1,
  acceptedFileTypes = ["image/jpeg", "image/png"],
  fieldValue,
  handleDeleteFile,
  pickerType,
}) => {
  const [files, setFiles] = useState<File[]>(value);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // crop file
  const [cropQueue, setCropQueue] = useState<File[]>([]);
  const [croppedFiles, setCroppedFiles] = useState<File[]>([]);
  const [currentImageToCrop, setCurrentImageToCrop] = useState<string | null>(
    null
  );
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentCropIndex, setCurrentCropIndex] = useState(0);

  const acceptedFileTypesString = acceptedFileTypes.join(",");
  const fileTypeLabels: Record<string, string> = {
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };

  const startCroppingQueue = (images: File[]) => {
    if (images.length === 0) return;
    setCropQueue(images);
    setCroppedFiles([]);
    setCurrentCropIndex(0);
    loadImageForCrop(images[0]);
  };

  const loadImageForCrop = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImageToCrop(reader.result as string);
      setCropModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (croppedFile: File) => {
    // Tambahkan file yang sudah di-crop ke array croppedFiles
    const newCroppedFiles = [...croppedFiles, croppedFile];
    setCroppedFiles(newCroppedFiles);

    const nextIndex = currentCropIndex + 1;

    if (nextIndex < cropQueue.length) {
      // Masih ada gambar yang perlu di-crop
      setCurrentCropIndex(nextIndex);
      loadImageForCrop(cropQueue[nextIndex]);
    } else {
      // Semua crop selesai, update files
      const existingFiles = files.filter((f) => !cropQueue.includes(f)); // Hapus file original dari queue
      const combinedFiles = [...existingFiles, ...newCroppedFiles];

      // Validasi jumlah file
      if (combinedFiles.length > maxFiles) {
        myAlert.error(
          "Terlalu banyak file",
          `Anda hanya dapat mengunggah maksimum ${maxFiles} file${maxFiles > 1 ? "s" : ""}.`
        );
        // Reset state
        setCropModalOpen(false);
        setCurrentImageToCrop(null);
        setCropQueue([]);
        setCroppedFiles([]);
        return;
      }

      setFiles(combinedFiles);
      onChange(combinedFiles as never);

      // Reset crop state
      setCropModalOpen(false);
      setCurrentImageToCrop(null);
      setCropQueue([]);
      setCroppedFiles([]);
      setCurrentCropIndex(0);
    }
  };

  const handleCropCancel = () => {
    setCropModalOpen(false);
    setCurrentImageToCrop(null);
    setCropQueue([]);
    setCroppedFiles([]);
    setCurrentCropIndex(0);
  };

  const renderPreview = () => {
    const isPdf = (url: string) => url.toLowerCase().endsWith(".pdf");
    const isImage = (url: string) =>
      /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(url);

    if (Array.isArray(fieldValue) && fieldValue.length > 0) {
      return (
        <div className="flex flex-wrap gap-4 mt-4">
          {fieldValue.map((url, index) => {
            if (isPdf(url)) {
              return (
                <div className="relative" key={index}>
                  <Button
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full py-0 px-0"
                    type="button"
                    onClick={() => handleDeleteFile!(url)}
                  >
                    <X width={2} height={2} />
                  </Button>
                  <iframe
                    src={url}
                    title={`Preview PDF ${index}`}
                    className="rounded-md w-48 h-48"
                  />
                </div>
              );
            } else if (isImage(url)) {
              return (
                <div className="relative" key={index}>
                  <Button
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full py-0 px-0"
                    type="button"
                    onClick={() => handleDeleteFile!(url)}
                  >
                    <X width={2} height={2} />
                  </Button>
                  <Image
                    src={url}
                    alt={`Preview ${index}`}
                    className="rounded-md w-24 h-24 object-cover"
                    width={96}
                    height={96}
                  />
                </div>
              );
            } else {
              return (
                <div className="relative" key={index}>
                  <Button
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full py-0 px-0"
                    type="button"
                    onClick={() => handleDeleteFile!(url)}
                  >
                    <X width={2} height={2} />
                  </Button>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block max-w-xs truncate"
                  >
                    {url}
                  </a>
                </div>
              );
            }
          })}
        </div>
      );
    }

    return null;
  };

  const getFileTypeLabel = () => {
    return acceptedFileTypes
      .map((type) => fileTypeLabels[type] || type)
      .join(" or ");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (selectedFiles: File[]) => {
    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      const isValidType = acceptedFileTypes.includes(file.type);
      const isValidSize = file.size <= maxSize * 1024 * 1024;

      if (!isValidType) {
        myAlert.error(
          "Invalid file type",
          `File "${file.name}" is not a valid file type. Please upload ${getFileTypeLabel()} files only.`
        );
        continue;
      }

      if (!isValidSize) {
        myAlert.error(
          "Berkas terlalu besar",
          `Berkas "${file.name}" melebihi ukuran maksimum dari ${maxSize}MB.`
        );
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Check if adding these files would exceed maxFiles limit
    const totalFiles = files.length + validFiles.length;
    if (totalFiles > maxFiles) {
      myAlert.error(
        "Too many files",
        `You can only upload a maximum of ${maxFiles} file${maxFiles > 1 ? "s" : ""}.`
      );
      return;
    }

    // Start cropping process for image files
    const imageFiles = validFiles.filter(
      (file) =>
        file.type.startsWith("image/") &&
        !file.type.startsWith("image/gif") &&
        !file.type.startsWith("image/webp") &&
        acceptedFileTypes.includes(file.type)
    );

    if (imageFiles.length > 0) {
      startCroppingQueue(imageFiles);
    } else {
      // No images to crop, add files directly
      const newFiles = [...files, ...validFiles];
      setFiles(newFiles);
      onChange(newFiles as never);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    simulateUpload();
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
    onChange(newFiles);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={acceptedFileTypesString}
          onChange={handleFileChange}
          multiple={maxFiles > 1}
        />

        <div
          onClick={triggerFileInput}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 transition-all text-center cursor-pointer bg-card",
            "flex flex-col items-center justify-center gap-3",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          )}
        >
          <div className="bg-muted/50 p-3 rounded-full">
            <Upload />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-medium">Choose a file or drag & drop it here.</p>
            <p className="text-sm text-muted-foreground">
              {getFileTypeLabel()} (Max {maxSize} MB)
            </p>
          </div>
        </div>

        {fieldValue && renderPreview()}
        {files.length > 0 && (
          <div className="mt-4 space-y-4">
            {isUploading && (
              <Progress value={uploadProgress} className="h-2 w-full" />
            )}
            <div className="space-y-2">
              {Array.isArray(files) &&
                files?.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileIcon className="h-5 w-5 text-muted-foreground" />
                      <div className="flex flex-col">
                        <p className="font-medium truncate max-w-xs">
                          {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveFile(index)}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <FormMessage />
      {currentImageToCrop && (
        <ImageCropModal
          open={cropModalOpen}
          imageUrl={currentImageToCrop}
          onClose={handleCropCancel}
          onCropComplete={handleCropComplete}
          currentIndex={currentCropIndex + 1}
          totalImages={cropQueue.length}
        />
      )}
    </div>
  );
};
