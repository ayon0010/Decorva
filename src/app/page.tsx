import Categories from "@/Shared/Home/Categories";
import Feature from "@/Shared/Home/Feature";
import Products from "@/Shared/Home/Products";
import Slider from "@/Shared/Home/Slider";
import Title from "@/Shared/Title/Title";

export default function Home() {
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
    </div>
  );
}
