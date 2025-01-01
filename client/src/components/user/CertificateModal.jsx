import React from "react";
import Certificate from "../../assets/images/certificate.jpg";

const CertificateModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className={`fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300 ${
        isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`transform transition-transform duration-300 ${
          isModalOpen ? "scale-100" : "scale-90"
        }`}
      >
        <img src={Certificate} alt="Certificate" className="h-[70vh]" />
      </div>
    </div>
  );
};

export default CertificateModal;
