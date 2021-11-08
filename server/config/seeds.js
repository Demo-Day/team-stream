const db = require("./connection");
const { Product, Category } = require("../models");

db.once("open", async () => {
	await Category.deleteMany();

	const categories = await Category.insertMany([
		{ name: "Uncategorized" },
		{ name: "Tutorials" },
		{ name: "Concerts" },
		{ name: "Gaming" },
		{ name: "Exercise" },
	]);

	console.log("categories seeded");

	await Product.deleteMany();

	const products = await Product.insertMany([
		{
			name: "Basic",
			description: "Try it out for just 99c",
			image: "online-streaming.png",
			category: categories[0]._id,
			price: 0.99,
			quantity: 1,
		},
		{
			name: "Professional",
			description:
				"Become a pro-member and gain access to all of our premium events plus bonus content.",
			image: "online-streaming.png",
			category: categories[0]._id,
			price: 49.99,
			quantity: 1,
		},
		{
			name: "Business",
			description:
				"Become a business member and gain access to all of our premium content and exclusive offers.",
			image: "online-streaming.png",
			category: categories[0]._id,
			price: 149.99,
			quantity: 1,
		},
	]);

	console.log("products seeded");

	process.exit();
});
