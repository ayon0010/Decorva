import Categories from "@/Shared/Home/Categories";
import Feature from "@/Shared/Home/Feature";
import News from "@/Shared/Home/News";
import Products from "@/Shared/Home/Products";
import Slider from "@/Shared/Home/Slider";
import Title from "@/Shared/Title/Title";
import Offers from '@/Shared/Home/Offers';

export default async function Home() {
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product?featured=true`);
  const productsData = await products.json();
  console.log(productsData);
  return (
    <div>
      <Slider />
      <section className="lg:my-20 my-10">
        <Feature />
      </section>
      <Categories />
      <section className="lg:my-20 my-10">
        <Title title="Our Products" className="text-center" />
        <Products />
      </section>
      <section className="bg-[#F3F3F3] lg:py-20 py-10">
        <div className="layout global-padding">
          <Title title="Exclusive Deal" className="text-center" />
          <Offers products={productsData.products ?? []} />
        </div>
      </section>
      <div className="lg:my-20 my-10">
        <News />
      </div>
    </div>
  );
}
