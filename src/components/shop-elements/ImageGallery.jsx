import { useState } from "react";
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const ImageGallery = ({ images }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="">
			<Splide aria-label="My Favorite Images">

				{images.map(item => {


					return (<>
						<SplideSlide>
							<img src={item.original} alt="" />
						</SplideSlide>
					</>)
				})}

			</Splide>






		</div>
	);
};

export default ImageGallery;
