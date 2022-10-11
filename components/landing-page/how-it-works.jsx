import Image from "next/image";
import { myLoader } from "../../services/custom_loader";

function HowItWorks() {
  return (
    <section className="w-9/12 mx-auto md:pt-44 pt-32">
      <h2 className="md:text-4xl text-2xl font-semibold text-center md:mb-14 mb-12">
        How It Works
      </h2>

      <div className="flex flex-col md:flex-row justify-between ">
        <div className="md:w-3/12 flex flex-col items-center md:mb-0 mb-24">
          <div className="mb-8 relative" style={{ height: 150, width: 200 }}>
            <Image
              src="/assets/images/landing-page/how-it-works/order-menu.png"
              layout="fill"
              alt="order menu"
              loader={myLoader}

            />
          </div>

          <div className="flex justify-center items-center rounded-full mb-4 font-medium h-9 w-9 bg-red-600 text-white">
            1
          </div>

          <h3 className="text-xl font-semibold mb-3">Choose A Menu</h3>

          <div className="text-center text-gray-500 text-sm leading-6">
            Feaugiat in ante metus dictum tempor. Dui faucibus in ornare quam
            viverra. Elementum facilsis leo vel fringil
          </div>
        </div>

        <div className="md:w-3/12 flex flex-col items-center md:mb-0 mb-24">
          <div className="mb-8 relative" style={{ height: 150, width: 150 }}>
            <Image
              src="/assets/images/landing-page/how-it-works/bottle-chef.png"
              layout="fill"
              alt="bottle chef"
              loader={myLoader}

            />
          </div>

          <div className="flex justify-center items-center rounded-full mb-4 font-medium h-9 w-9 bg-red-600 text-white">
            2
          </div>

          <h3 className="text-xl font-semibold mb-3">Meet Your Chef</h3>

          <div className="text-center text-gray-500 text-sm leading-6">
            Feaugiat in ante metus dictum tempor. Dui faucibus in ornare quam
            viverra. Elementum facilsis leo vel fringil
          </div>
        </div>

        <div className="md:w-3/12 flex flex-col items-center">
          <div className="mb-8 relative" style={{ height: 150, width: 110 }}>
            <Image
              src="/assets/images/landing-page/how-it-works/girl-sitting.png"
              layout="fill"
              alt="girl sitting"
              loader={myLoader}

            />
          </div>

          <div className="flex justify-center items-center rounded-full mb-4 font-medium h-9 w-9 bg-red-600 text-white">
            3
          </div>

          <h3 className="text-xl font-semibold mb-3">Relax And Eat</h3>

          <div className="text-center text-gray-500 text-sm leading-6">
            Feaugiat in ante metus dictum tempor. Dui faucibus in ornare quam
            viverra. Elementum facilsis leo vel fringil
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
