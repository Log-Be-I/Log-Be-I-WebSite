import { useState } from "react";
import { FaImage, FaTrash } from "react-icons/fa";

export default function ImageUpload({ onImageSelect, initialImages = [] }) {
  const [previews, setPreviews] = useState(initialImages);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newPreviews = [];
    const newFiles = [];

    // 파일 개수 제한 (최대 5개)
    if (previews.length + selectedFiles.length > 5) {
      setError("이미지는 최대 5개까지 업로드할 수 있습니다.");
      return;
    }

    let validCount = 0;
    selectedFiles.forEach((file) => {
      // 파일 크기 체크 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("파일 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
      // 이미지 파일 타입 체크
      if (!file.type.startsWith("image/")) {
        setError("이미지 파일만 업로드 가능합니다.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        newFiles.push(file);
        validCount++;
        if (validCount === selectedFiles.length) {
          setPreviews((prev) => [...prev, ...newPreviews]);
          setFiles((prev) => {
            const updated = [...prev, ...newFiles];
            onImageSelect(updated);
            return updated;
          });
          setError("");
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newFiles = files.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    setFiles(newFiles);
    onImageSelect(newFiles);
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
