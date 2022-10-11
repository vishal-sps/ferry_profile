import Image from "next/image";
import { myLoader } from "../../../services/custom_loader";
import AppleBadge from "./apple-badge";
import GoogleBadge from "./google-badge";

function MobileAd() {
  return (
    <section
      className="w-11/12 mx-auto mt-44 bg-red-600 md:py-0 py-8"
      style={{ borderRadius: 16 }}
    >
      <div className="flex md:flex-row flex-col items-center w-11/12 mx-auto">
        <div className="md:w-6/12 md:mt-8">
          <div className="relative">
            <Image
              src="/assets/images/landing-page/mobile-ad/ad-image.png"
              alt="app"
              height={400}
              width={420}
              loader={myLoader}

            />
          </div>
        </div>

        <div className="md:w-6/12 text-white md:text-left text-center md:mt-0 mt-6">
          <h2 className="font-semibold md:text-4xl text-2xl md:w-10/12 mb-4">
            Get Best Experience with Chef joy App.
          </h2>

          <p className="md:text-lg md:w-8/12 mb-8">
            Our mobile app makes it easy to manage your food anywhere.
          </p>

          <div className="flex md:flex-row flex-col items-center">
            <GoogleBadge className="md:mr-4 md:mb-0 mb-4" />

            <AppleBadge />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MobileAd;
