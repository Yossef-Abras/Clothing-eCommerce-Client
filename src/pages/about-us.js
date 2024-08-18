import { Image } from "@nextui-org/react";
import AboutInfo from "../components/AboutInfo";

export default function AboutUs() {

  const data = [
    {
      title: "Attainable luxury curated for you.",
      description: [
        "On the surface, FASHIONPHILE is about making pre-owned, ultra-luxury goods accessible. Rare pieces? We have them. Your favorite wishlist item for a steal? We’ve got that, too.",
        "But then, FASHIONPHILE is also so much more.",
        "And that when we create sustainable, practical solutions — for even the most luxurious of things — we not only make life better but frankly, more fun."
      ]
    },
    {
      title: "The FASHIONPHILE legacy.",
      description: [
        "As the very first ultra-luxury re-commerce brand of its kind, FASHIONPHILE is the brainchild of Founder and President, Sarah Davis. Like most of the brands we love best, FASHIONPHILE began in 1999, with little more than a good idea. In 2006, Sarah introduced business partner & CEO Ben Hemminger, who evolved the brand by expanding the collection and presenting it to a larger market. Over 25 years later, FASHIONPHILE is now one of the world’s top resellers of pre-owned luxury and the exclusive re-commerce partner of Neiman Marcus. ",
        "In the words of Geoffroy van Raemdonck, CEO of Neiman Marcus Group, “FASHIONPHILE’s hyper-focus on curating high-quality supply and providing best-in-class shopping experiences makes it the ideal partner.”"
      ]
    },
    {
      title: "Our promise to you.",
      description: ["Our customers don’t take promises lightly, and neither do we. The four you see here represent our deepest dedications, explorations, and well, our values at our core. We hope you take them to heart the way we have."],
      promise: [
        {
          promTitle: "1. We make authenticity our first priority.",
          promDesc: ["And we don’t just mean our handbags, although authentication of our products is essential and comes first in all we do. It’s why we’ve literally written the book on authentication, and why our process is one of the most in-depth in the industry."]
        },
        {
          promTitle: "2. When we want something, we’re all in.",
          promDesc: [
            "Most other resellers operate on a consignment basis. That means that when you sell a bag, you won’t receive a payment for the item until they sell it. Which could literally take weeks or even months — if ever.",
            "At FASHIONPHILE, we like clean slates and clear terms. So to our sellers, we offer full buy-outs on nearly every item, with immediate payment processing after the item arrives and is authenticated. And to our buyers, we offer a 100% authenticity guarantee, point blank period."
          ]
        },

      ]
    },

  ]
  return (
    <div className="p-4 md:p-20">
      <Image src="/img/cloth2.webp" />
      {
        data.map((item, index) => <AboutInfo key={index} item={item} />)
      }
    </div>
  );
}
