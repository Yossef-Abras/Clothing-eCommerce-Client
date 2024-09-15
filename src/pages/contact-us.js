import { Button, Image } from "@nextui-org/react";

export default function ContactUs() {
  return (
    <div>
      <div>
        <h1 className="font-bold text-primary font-sans text-center text-5xl mt-20">
          Contact us
        </h1>
        <p className="text-center m-8">
          Our team is here for you online 24/7. Talk to us about order
          logistics, outfit inspiration, or anything else.
        </p>
      </div>
      <div className="bg-[#eee] rounded-3xl p-2 w-fit mx-auto md:flex justify-center mb-7">
        <div className="border-8 border-primary rounded-2xl p-14 m-10 md:w-1/2">
          <Image
            className="cu-icon"
            src="https://www.madewell.com/brand_creative/svg/contact-email.svg"
            alt="Email"
          />
          <strong>EMAIL</strong>
          <p>Send us an email any time, anywhere.</p>
          <br />
          <br />
          <strong>
            <Button className="bg-primary text-white hover:bg-gray-600 rounded-xl p-5">
              Email US
            </Button>
          </strong>
        </div>
        <div className="border-8 border-primary rounded-2xl p-14 m-10 md:w-1/2">
          <Image
            className="cu-icon"
            src="https://www.madewell.com/brand_creative/svg/contact-phone.svg"
            alt="Phone"
          />
          <strong>PHONE</strong>
          <p>+13136713399: seven days a week at 7am–11:59pm ET</p>
          <strong>
            <br />
            <Button className="bg-primary text-white hover:bg-gray-600 rounded-xl p-5">
              Phone US
            </Button>
          </strong>
        </div>
      </div>
    </div>
  );
}
