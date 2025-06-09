import { useState, useEffect } from "react";
import { IconRefresh, IconEraser, IconSquareX } from "@tabler/icons-react";

const GalleryPicker = (props) => {
	var title = props.title;
	var onPick = props.onPick;


	const [isOpen, setIsOpen] = useState(false);
	var [queryPrams, setqueryPrams] = useState({ keyword: "", page: 1, order: "DESC", limit: 20, });
	var [loading, setloading] = useState(false);
	var [products, setproducts] = useState(null);


	function fetchPosts() {

		const token = localStorage.getItem("token");




		if (queryPrams.page < 0) {
			return;
		}
		if (queryPrams.keyword.length < 3) {
			return;
		}

		var postData = {
			limit: queryPrams.limit,
			page: queryPrams.page,
			order: queryPrams.order,
		};
		postData = JSON.stringify(postData);
		setloading(true);

		fetch(appData.serverUrl + "wp-json/combo-store/v2/get_medias", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {

						console.log(res)

						var posts = res?.posts;
						var total = res?.total;
						var max_pages = res?.max_pages;

						setproducts({ posts: posts, total: total, maxPages: max_pages })
						//setqueryPrams({ ...queryPrams, loading: false })
						setloading(false);


						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}

	useEffect(() => {

		fetchPosts();
	}, []);
	useEffect(() => {
		if (queryPrams.keyword.length > 3) {
			fetchPosts();
		}
		if (queryPrams.keyword.length == 0) {
			setproducts([]);
		}
	}, [queryPrams.keyword, queryPrams.page]);


	return (
		<div className="flex items-center gap-2">

			<div>
				<input
					type="text"
					className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
					value={queryPrams.keyword}
					placeholder="Search..."
					onChange={(ev) => {
						var value = ev.target.value;
						// setcurrentObject({ ...currentObject, title: value });

						setqueryPrams({ ...queryPrams, keyword: value })
					}}
				/>

				{products?.posts?.length > 0 && (
					<>
						<div className="relative">



							<div className="absolute bottom-0 border-2 border-gray-600 right-0 w-[800px] bg-white p-2 shadow-sm">


								<div className="flex gap-2 my-2 bg-gray-200 p-3 justify-between">
									<div className="flex gap-2">
										<div className=" hover:bg-gray-400 rounded-sm cursor-pointer px-4 py-2 bg-gray-600 text-white" onClick={ev => {
											var value = parseInt(queryPrams.page);

											value = (value > 1) ? value - 1 : 1;

											console.log(value)

											setqueryPrams({ ...queryPrams, page: value })
										}}>Previous</div>
										<div><input type="number" name="" id="" value={queryPrams.page} className="w-16  rounded-sm cursor-pointer px-2 py-2  border-2 border-solid border-gray-400 text-center" onChange={(ev) => {
											var value = parseInt(ev.target.value);



											setqueryPrams({ ...queryPrams, page: value })
										}} /></div>
										<div className=" hover:bg-gray-400 rounded-sm cursor-pointer px-4 py-2 bg-gray-600 text-white" onClick={ev => {
											var value = parseInt(queryPrams.page) + 1;


											setqueryPrams({ ...queryPrams, page: value })
										}}>Next</div>

									</div>
									<div className="absolute top-1 right-1 bg-red-400 text-white px-1 py-1 rounded-sm cursor-pointer" onClick={ev => {


										setqueryPrams({ ...queryPrams, keyword: "" })


									}}>
										<IconSquareX />
									</div>
								</div>
								<div className="grid grid-cols-4 gap-3">
									{products?.posts.map(item => {
										return (
											<div className="relative  border-2 border-solid border-gray-400 cursor-pointer"
												onClick={ev => {
													onPick(item)
												}}
											>
												<img className="w-full" src={item.src} alt="" />
												<div className="absolute text-sm bottom-0 left-0 w-full bg-gray-500 p-2 text-white bg-opacity-60">
													{item.title}
												</div>
											</div>
										)
									})}
								</div>
							</div>

						</div>
					</>
				)}

			</div>



			<div>
				{loading && (
					<div className="animate-spin "><IconRefresh /></div>

				)}
				{!loading && (
					<div className=" hover:bg-gray-400 rounded-sm cursor-pointer px-2 py-2 bg-gray-600 text-white" onClick={ev => {
						setqueryPrams({ ...queryPrams, keyword: "" })

					}}><IconEraser /></div>

				)}

			</div>


		</div>
	);
};

export default GalleryPicker;
