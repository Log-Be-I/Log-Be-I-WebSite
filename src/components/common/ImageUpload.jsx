import { useState, useEffect } from "react";
import { FaImage, FaTrash } from "react-icons/fa";

export default function ImageUpload({
  existingImages = [],
  newFiles = [],
  onImagesChange,
}) {
  const [previews, setPreviews] = useState(
    existingImages.concat(newFiles.map((file) => URL.createObjectURL(file)))
  );
  const [files, setFiles] = useState(newFiles);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("[ImageUpload] useEffect - existingImages:", existingImages);
    console.log("[ImageUpload] useEffect - files:", files);
    setPreviews(
      existingImages.concat(files.map((file) => URL.createObjectURL(file)))
    );
  }, [existingImages, files]);

  const handleImageChange = (e) => {
    console.log(
      "[ImageUpload] input[type=file] onChange fired",
      e.target.files
    );
    const selectedFiles = Array.from(e.target.files);
    if (previews.length + selectedFiles.length > 5) {
      setError("이미지는 최대 5개까지 업로드할 수 있습니다.");
      return;
    }

    const newFileObjs = [];
    const newPreviewUrls = [];
    let readCount = 0;
    selectedFiles.forEach((file, idx) => {
      if (file.size > 5 * 1024 * 1024) {
        setError("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("이미지 파일만 업로드 가능합니다.");
        return;
      }
      newFileObjs.push(file);
      newPreviewUrls.push(URL.createObjectURL(file));
      readCount++;
      if (readCount === selectedFiles.length) {
        const updatedFiles = [...files, ...newFileObjs];
        const updatedPreviews = [...previews, ...newPreviewUrls];
        console.log(
          "[ImageUpload] handleImageChange - updatedFiles:",
          updatedFiles
        );
        setFiles(updatedFiles);
        setPreviews(updatedPreviews);
        setError("");
        onImagesChange(existingImages, updatedFiles);
      }
    });
  };

  const handleRemove = (index) => {
    console.log("[ImageUpload] handleRemove - index:", index);
    if (index < existingImages.length) {
      const updatedExisting = existingImages.filter((_, i) => i !== index);
      setPreviews(previews.filter((_, i) => i !== index));
      onImagesChange(updatedExisting, files);
    } else {
      const fileIdx = index - existingImages.length;
      const updatedFiles = files.filter((_, i) => i !== fileIdx);
      setFiles(updatedFiles);
      setPreviews(previews.filter((_, i) => i !== index));
      onImagesChange(existingImages, updatedFiles);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors duration-200">
          <FaImage className="w-5 h-5 text-gray-600" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="hidden"
            onClick={() =>
              console.log("[ImageUpload] input[type=file] clicked")
            }
          />
        </label>
        <span className="text-sm text-gray-500">
          {previews.length}/5 이미지
        </span>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`미리보기 ${index + 1}`}
                className="w-full h-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 opacity-0 group-hover:opacity-100"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
