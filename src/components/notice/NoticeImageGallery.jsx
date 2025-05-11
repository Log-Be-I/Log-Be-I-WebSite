import { useState } from "react";
import Modal from "../common/Modal";

export default function NoticeImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div>
      <span className="text-lg font-semibold text-gray-700">이미지</span>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer group"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`첨부 이미지 ${index + 1}`}
              className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity rounded-lg" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          className="max-w-4xl"
        >
          <div className="p-4">
            <img
              src={selectedImage}
              alt="확대된 이미지"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
