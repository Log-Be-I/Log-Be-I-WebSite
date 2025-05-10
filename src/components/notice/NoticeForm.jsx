import { useState } from "react";
import ImageUpload from "../common/ImageUpload";

export default function NoticeForm({ initialData = {}, onSubmit }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [isPinned, setIsPinned] = useState(initialData.isPinned || "NONE");
  const [images, setImages] = useState(initialData.images || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, isPinned, images });
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
          onImageSelect={setImages}
          initialImages={initialData.images}
        />
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
        저장
      </button>
    </form>
  );
}
