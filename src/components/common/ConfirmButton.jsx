// components/common/ConfirmButton.jsx
import { useNavigate } from "react-router-dom";

export default function ConfirmButton({ label = "확인" }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => navigate(-1)}
        className="bg-primary hover:bg-secondary text-white px-8 py-2 rounded-lg shadow transition"
      >
        {label}
      </button>
    </div>
  );
}
