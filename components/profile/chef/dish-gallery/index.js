import { useState } from "react";
import Image from "next/image";
import GalleryModal from "./components/gallery-modal";
import { myLoader } from "../../../../services/custom_loader";

const DishGallery = ({ images }) => {
  const [galleryItems, setGalleryItems] = useState([
    {
      name: "gallery-1",
      image: "/assets/images/dishes/gallery-1.jpg",
    },
    {
      name: "gallery-2",
      image: "/assets/images/dishes/gallery-2.jpg",
    },
    {
      name: "gallery-3",
      image: "/assets/images/dishes/gallery-3.jpg",
    },
    {
      name: "gallery-4",
      image: "/assets/images/dishes/gallery-4.jpg",
    },
  ]);

  const [showGalleryModal, setShowGalleryModal] = useState(false);

  return (
    <>
      {/* gallery modal */}
      <GalleryModal
        images={images?.map((item) => ({
          original: item.image,
          thumbnail: item.image,
        }))}
        showModal={showGalleryModal}
        setShowModal={setShowGalleryModal}
      />

      <div
        className="h-full w-10/12 ml-auto grid grid-cols-4 grid-rows-2 gap-3"
        onClick={() => setShowGalleryModal(true)}
      >
        {images?.slice(0, 5)?.map((item, index) => (
          <div
            className={`relative ${
              index === 0 ? "row-span-2 col-span-2" : "row-span-1 col-span-1"
            }  bg-gray-200 rounded-lg`}
            key={index}
          >
            <Image
              src={item.image}
              alt={item.name}
              layout="fill"
              className="rounded-lg"
              objectFit="cover"
              loader={myLoader}

            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DishGallery;
