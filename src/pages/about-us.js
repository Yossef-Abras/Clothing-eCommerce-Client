import { Image } from "@nextui-org/react";

export default function AboutUs() {
  const data = [
    {
      title: "Luxury, Made Accessible.",
      description: [
        "At Saramoda, we believe in bringing luxury within reach. From rare finds to the latest must-haves, our curated collection is designed to offer an exceptional shopping experience.",
        "But Saramoda is more than just luxury fashion.",
        "We’re committed to creating sustainable and practical solutions that enhance your life, making luxury not just accessible, but enjoyable.",
      ],
    },
    {
      title: "The Saramoda Story.",
      description: [
        "Founded with a vision to redefine luxury fashion, Saramoda was born from a passion for exquisite craftsmanship and timeless style. Over the years, we’ve grown into a leading destination for pre-owned luxury, with a global clientele that values authenticity and quality.",
        "Our journey began with a simple idea: to make luxury fashion more accessible to everyone. Today, Saramoda stands as a testament to that vision, offering a curated selection of the finest pieces, each with its own story to tell.",
      ],
    },
    {
      title: "Our Commitment to You.",
      description: [
        "At Saramoda, we hold our promises close to our hearts. They define our relationship with you and reflect our core values. We invite you to embrace these promises as we do, knowing they are at the heart of everything we offer.",
      ],
      promise: [
        {
          promTitle: "1. Authenticity is Our Foundation.",
          promDesc: [
            "Every piece at Saramoda undergoes rigorous authentication, ensuring you receive nothing but genuine luxury. Our process is detailed, precise, and unmatched in the industry.",
          ],
        },
        {
          promTitle: "2. Commitment Beyond the Sale.",
          promDesc: [
            "We’re not just about making a sale. At Saramoda, we offer immediate buyouts with swift payment processing for sellers, and a 100% authenticity guarantee for buyers. We value clarity and transparency in every transaction.",
          ],
        },
        {
          promTitle: "3. A Partnership with Purpose.",
          promDesc: [
            "We partner with the best to bring you an unparalleled selection of luxury fashion. Our exclusive collaborations and industry relationships allow us to offer unique pieces and extraordinary experiences.",
          ],
        },
        {
          promTitle: "4. Sustainability at Our Core.",
          promDesc: [
            "Sustainability is woven into the fabric of Saramoda. We are dedicated to practices that not only preserve the environment but also enhance the value and longevity of luxury fashion.",
          ],
        },
      ],
    },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12 xl:p-16 bg-gradient-to-br from-gray-100 to-white">
      <div className="flex justify-center mb-8 lg:mb-12">
        <Image
          alt="Saramoda luxury fashion"
          src="/img/cloth2.webp"
          className="rounded-lg shadow-lg w-full max-w-xl lg:max-w-lg xl:max-w-md"
        />
      </div>
      <div className="space-y-12 lg:space-y-16">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-10 xl:p-12 transform hover:scale-105 transition-transform duration-300 lg:max-w-2xl mx-auto border-t-4 border-orange-400"
          >
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 text-orange-400">
              {item.title}
            </h2>
            {item.description.map((desc, i) => (
              <p
                key={i}
                className="text-gray-600 text-md lg:text-lg xl:text-xl mb-4"
              >
                {desc}
              </p>
            ))}
            {item.promise && (
              <div className="mt-6">
                {item.promise.map((promise, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold mb-2 text-orange-400">
                      {promise.promTitle}
                    </h3>
                    {promise.promDesc.map((desc, j) => (
                      <p
                        key={j}
                        className="text-gray-600 text-sm lg:text-md xl:text-lg"
                      >
                        {desc}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
