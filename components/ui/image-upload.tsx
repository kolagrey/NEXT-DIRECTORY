import { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (file: File | null) => void;
  value?: File | null;
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export function ImageUpload({
  onChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  className = "",
  accept = "image/jpeg,image/png",
  maxSize = 5, // 5MB default
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = useCallback(
    async (file: File | null) => {
      if (!file) {
        setPreview(null);
        onChange(null);
        return;
      }

      // Validate file type
      if (!file.type.match(/^image\/(jpeg|png)$/)) {
        setError("Please upload a JPEG or PNG file");
        return;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          setIsLoading(false);
        };
        reader.readAsDataURL(file);

        onChange(file);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Error processing image");
        setIsLoading(false);
      }
    },
    [maxSize, onChange]
  );

  const removeImage = useCallback(() => {
    setPreview(null);
    setError(null);
    onChange(null);
  }, [onChange]);

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={() => !isLoading && document.getElementById("file-input")?.click()}
        className={`border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
          preview ? "border-green-500" : "border-gray-300"
        } ${!isLoading && "hover:border-gray-400 cursor-pointer"}`}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300"></div>
            <p className="mt-2 text-sm text-gray-500">Processing image...</p>
          </div>
        ) : preview ? (
          <div className="relative aspect-square w-full">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-md"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-4">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Click to upload or drag & drop
            </p>
            <p className="mt-1 text-xs text-gray-400">
              JPEG or PNG, max {maxSize}MB
            </p>
          </div>
        )}
      </div>

      <input
        id="file-input"
        type="file"
        className="hidden"
        accept={accept}
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        disabled={isLoading}
      />

      {error && (
        <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
