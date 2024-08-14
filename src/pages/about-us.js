import { Image } from "@nextui-org/react";

export default function AboutUs() {
  return (
    <div>
      <div className="relative">
        <div className="flex flex-wrap min-h-screen">
          <div className="w-[50%] hidden md:block">
            <Image className="max-w-full h-full object-cover" src="/img/cloth1.webp" />
          </div>
          <div className="w-[50%] flex-1">
            <Image className="max-w-full h-full object-cover" src="/img/cloth1.webp" />
          </div>
        </div>
        <p className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 font-bold text-orange-400 text-3xl md:text-5xl lg:text-7xl text-center m-0">THE PERFECT JEANS DO EXIST.</p>
      </div>

      <div class="my-16 text-center">
        <p className="font-bold text-3xl md:text-4xl tracking-tighter m-0 mb-1.5">MADEWELL,</p>
        <p className="font-bold text-3xl md:text-4xl tracking-tighter m-0 mb-1.5">EXCEPTIONAL QUALITY</p>
        <p className="font-bold text-3xl md:text-4xl tracking-tighter m-0 mb-1.5">IN OUR NAME</p>
        <p className="font-bold text-3xl md:text-4xl tracking-tighter m-0 mb-1.5">IN OUR JEANS.</p>
      </div>

      <div class="w-[530px] max-w-full mx-auto my-12 relative">
        <div>
          <Image className="max-w-full" src="/img/cloth2.webp" />
        </div>
        <p className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 font-bold w-full text-orange-400 text-3xl text-center m-0">GREAT STYLE IS EFFORTLESS</p>
      </div>

      <div class="relative">
        <div class="flex flex-wrap min-h-screen">
          <div class="w-[50%] hidden md:block">
            <Image className="max-w-full h-full object-cover" src="/img/cloth1.webp" />
          </div>
          <div class="w-[50%] flex-1">
            <Image className="max-w-full h-full object-cover" src="/img/cloth2.webp" />
          </div>
        </div>
        <div class="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 text-center w-full">
          <p class="text-3xl md:text-6xl font-bold  m-0">BACK TO DENIM</p>
          <p class="font-medium text-2xl m-0">THE PERFECT JEANS DO EXIST</p>
          <a className="mx-3.5 block underline">Shop women’s</a>
          <a className="mx-3.5 block underline">Shop men’s</a>
        </div>
      </div>
    </div>
  );
}
