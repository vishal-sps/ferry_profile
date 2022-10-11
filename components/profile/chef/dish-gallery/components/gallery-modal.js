import React from "react";
import ImageGallery from "react-image-gallery";
import { myLoader } from "../../../../../services/custom_loader";

import Modal from "../../../../modal";

function GalleryModal({ images, showModal, setShowModal }) {
  return (
    <Modal show={showModal}>
      <div className="absolute z-30 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-5/12 rounded-lg py-5 px-6">
        <div className="flex justify-end mb-3">
          <button onClick={() => setShowModal(false)}>
            <svg style={{ height: 24, width: 24 }} viewBox="0 0 24 24">
              <path
                fill="#ddd"
                d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
              />
            </svg>
          </button>
        </div>
        <ImageGallery
          items={images}
          showPlayButton={false}
          showFullscreenButton={false}
          sizes="200px"
          loader={myLoader}

        />
      </div>
    </Modal>
  );
}

export default GalleryModal;
