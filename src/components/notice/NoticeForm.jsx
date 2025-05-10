import { useState } from "react";
import ImageUpload from "../common/ImageUpload";

export default function NoticeForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [isPinned, setIsPinned] = useState(initialData.isPinned || "NONE");
  // 기존 이미지 URL 배열
  const [existingImages, setExistingImages] = useState(
    initialData.fileUrls || initialData.images || []
  );
  // 새로 추가된 파일 배열
  const [newFiles, setNewFiles] = useState([]);

  // 이미지 변경 핸들러: 기존 이미지 URL과 새 파일 배열을 모두 관리
  const handleImageChange = (updatedExistingImages, updatedNewFiles) => {
    setExistingImages(updatedExistingImages);
    setNewFiles(updatedNewFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 기존 이미지 URL과 새 파일 배열을 모두 부모로 전달
    onSubmit({
      title,
      content,
      isPinned,
      existingImages, // 유지할 기존 이미지 URL 배열
      newFiles, // 새로 추가된 파일 배열
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">제목</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">중요도</label>
        <select
          value={isPinned}
          onChange={(e) => setIsPinned(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="NONE">일반</option>
          <option value="PINNED">상단 고정</option>
          <option value="URGENT_PINNED">긴급 고정</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2 rounded"
          rows="5"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">이미지</label>
        <ImageUpload
          existingImages={existingImages}
          newFiles={newFiles}
          onImagesChange={handleImageChange}
        />
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        저장
      </button>
    </form>
  );
}
