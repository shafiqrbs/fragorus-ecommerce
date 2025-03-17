import React from "react";
import CategoryItem from "./CategoryItem";
import Image from "next/image";
import Heading from "./Heading";
import { getAllBrands } from "@/app/actions";
import { DEFAULT_FALLBACK_IMAGE } from "@/consts";

const BrandMenu = async () => {
	const data = await getAllBrands();

	return (
		<div className="py-10 bg-blue-500">
			<Heading title="BROWSE BRANDS" />
			<div className="max-w-screen-2xl mx-auto py-10 gap-x-5 px-16 max-md:px-10 gap-y-5 grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-[450px]:grid-cols-1">
				{data.map((item: Brand) => (
					<CategoryItem title={item.name} key={item.id} href={`/brand/${item.id}`}>
						<Image
							src={item.imagePath || DEFAULT_FALLBACK_IMAGE}
							width={48}
							height={48}
							alt={item.name}
						/>
					</CategoryItem>
				))}
			</div>
		</div>
	);
};

export default BrandMenu;
