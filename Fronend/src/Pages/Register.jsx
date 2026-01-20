import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* ================= IMAGE COMPRESSION ================= */
const compressImage = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_WIDTH = 800;
      const scale = Math.min(1, MAX_WIDTH / img.width);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Image compression failed"));
            return;
          }

          const compressedFile = new File(
            [blob],
            file.name,
            { type: "image/jpeg" }
          );

          resolve(compressedFile);
        },
        "image/jpeg",
        0.7
      );
    };

    img.onerror = () => reject(new Error("Image load error"));
  });

/* ================= REGISTER COMPONENT ================= */
const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    try {
      const compressedImage = await compressImage(file);
      setImage(compressedImage);
      setPreview(URL.createObjectURL(compressedImage));
      setError("");
    } catch (err) {
      setError("Failed to process image");
    }
  };

  /* ================= OTP REQUEST ================= */
  const requestOtp = async (formData) => {
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:8082/requestOtp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate("/otp", {
        state: { email },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= FORM SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile_number", mobileNumber);
    formData.append("password", password);

    if (image) {
      formData.append("image", image);
    }

    await requestOtp(formData);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Register
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-400"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-400"
          />

          {/* Mobile */}
          <input
            type="tel"
            placeholder="Mobile Number"
            required
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-400"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-orange-400"
          />

          {/* Image Upload */}
          <div className="border-2 border-dashed border-orange-400 rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              id="imageUpload"
              onChange={handleImageChange}
              className="hidden"
            />

            <label htmlFor="imageUpload" className="cursor-pointer">
              {!preview ? (
                <>
                  <div className="text-4xl">📷</div>
                  <p className="text-sm text-gray-600 mt-2">
                    Click to upload profile image
                  </p>
                </>
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-28 h-28 mx-auto rounded-full object-cover border-2 border-orange-400"
                />
              )}
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Generate Otp"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-orange-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
