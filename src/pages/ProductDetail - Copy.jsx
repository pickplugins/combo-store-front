import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import AddToCart from "../components/shop-elements/AddToCart";
import ImageGallery from "../components/shop-elements/ImageGallery";
import { Splide, SplideSlide } from '@splidejs/react-splide';


function ProductDetail({ user }) {
  const { id } = useParams();
  const { t } = useContext(AuthContext);


  var [appData, setappData] = useState(window.appData);
  var [productData, setproductData] = useState(null);

  function fetchPost() {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }
    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);

    fetch(appData.serverUrl + "wp-json/combo-store/v2/get_product", {
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

            var product = res?.product;


            console.log(product)


            setproductData(product)





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

  // useEffect(() => {
  // 	fetchPost();
  // }, []);

  useEffect(() => {
    fetchPost();
  }, [id]);





  function formatDate(dateInput) {

    // console.log(dateInput)

    var format = "d/m/Y";
    dateInput = dateInput == undefined ? '' : dateInput;
    // Ensure date is in a proper format for parsing
    const dateObj = new Date(dateInput.replace(" ", "T"));

    if (isNaN(dateObj)) {
      throw new Error("Invalid date format");
    }

    // Extract date components
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObj.getFullYear();

    // Replace format placeholders with actual values
    //return ;

    return (
      <>
        {format.replace("d", day).replace("m", month).replace("Y", year)}
      </>

    );

  }





  return (
    <Layout user={user} >

      {/* {JSON.stringify(productData?.line_items)} */}

      <div className="p-5 grid grid-cols-2 gap-5">


        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">

          <h3 className="text-2xl mb-4">{t("Gallery ")}</h3>

          <div>
            {productData?.gallery_image_urls !== undefined && (

              <ImageGallery images={productData?.gallery_image_urls} />
            )}


          </div>

        </div>


        <div className="bg-white shadow-sm border border-gray-200 p-5 rounded-sm">

          <h3 className="text-2xl mb-4">{productData?.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: productData?.price_html }} />
          <div dangerouslySetInnerHTML={{ __html: productData?.excerpt }} />


          <AddToCart />

          <div className="flex text-sm gap-2 ">

            <div>SKU:</div>
            <div dangerouslySetInnerHTML={{ __html: productData?.sku }} />

          </div>
          <div className="flex text-sm gap-2 ">

            <div>Categories:</div>
            <div className="flex text-sm ">
              {productData?.categories.map((item, index) => {

                return (
                  <div >
                    <span>{item.name}</span>
                    {productData?.categories.length > (index + 1) && (
                      <span className="pr-1">, </span>
                    )}
                  </div>
                )

              })}
            </div>
          </div>


        </div>





      </div>







    </Layout>
  )


}

export default ProductDetail;
