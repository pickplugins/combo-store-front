
import React from "react";

import { IconSettings, IconCheckbox, IconSquare, IconFidgetSpinner, IconTrash } from "@tabler/icons-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import EntriesTable from "../components/EntriesTable";
import Layout from "../components/Layout";
import Popover from "../components/Popover";
import Spinner from "../components/Spinner";
import Tab from "../components/Tab";
import Tabs from "../components/Tabs";
import EmailValidator from '../lib/EmailValidator';
import ToggleContent from "../components/ToggleContent";
import ProductsPicker from "../components/shop-elements/ProductsPicker";
import GalleryPicker from "../components/shop-elements/GalleryPicker";



import {
  IconRefresh, IconTableExport, IconChartHistogram, IconFilterCog, IconPlayerPlay, IconPlayerPause, IconCircleDashedCheck, IconLoader3, IconX
} from "@tabler/icons-react";


function ProductDetail({ user }) {
  const { id } = useParams();

  const { token, t } = useContext(AuthContext);
  var [appData, setappData] = useState(window.appData);
  var [currentObject, setcurrentObject] = useState(null);

  var [loading, setloading] = useState(false);


  function get_product() {
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   throw new Error("No token found");
    // }



    var postData = {
      id: id,
    };
    postData = JSON.stringify(postData);
    setloading(true);
    fetch(
      appData.serverUrl + "wp-json/combo-store/v2/get_product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: postData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {
            var errors = res?.errors;
            var success = res?.success;
            var product = res?.product;

            console.log(product)

            setloading(false);
            setcurrentObject(product)

            // setaddTask({ ...addTask, loading: false, errors: errors, success: success })

            // setTimeout(() => {
            // 	setaddTask({ ...addTask, title: "", success: null, errors: null })

            // }, 3000);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }
  function update_product() {
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   throw new Error("No token found");
    // }

    // if (currentObject.id < 0) {
    //   return;
    // }

    //var postData = currentObject;




    var postData = JSON.stringify(currentObject);

    console.log(postData)

    setloading(true);
    fetch(
      appData.serverUrl + "wp-json/combo-store/v2/update_product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: postData,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        if (response.ok && response.status < 400) {
          response.json().then((res) => {
            var errors = res?.errors;
            var success = res?.success;

            console.log(res)

            setloading(false);
            //setcurrentObject(res)

            // setaddTask({ ...addTask, loading: false, errors: errors, success: success })

            // setTimeout(() => {
            // 	setaddTask({ ...addTask, title: "", success: null, errors: null })

            // }, 3000);
          });
        }
      })
      .catch((_error) => {
        //this.saveAsStatus = 'error';
        // handle the error
      });
  }






  useEffect(() => {
    get_product();

  }, []);


  var addonsList = [
    { label: "Stock ", value: 'manageStock' },
    { label: "Variations ", value: 'variations' },
    { label: "Dimensions", value: 'dimensions' },
    { label: "Reviews", value: 'reviews' },
    { label: "Categories", value: 'categories' },
    { label: "Tags", value: 'tags' },
    { label: "Brands", value: 'brands' },
    { label: "Shipping", value: 'shipping' },
    { label: "Related Products", value: 'relatedProducts' },
    { label: "Badges", value: 'badges' },
    { label: "Downloads", value: 'downloads' },
    { label: "Tax", value: 'tax' },
    { label: "Gallery", value: 'gallery' },
    // { label: "Expiry Date", value: 'expiryDate' },
    { label: "Compliance", value: 'compliance ' },
    { label: "Warehouse", value: 'warehouse' },
    { label: "FAQ", value: 'faq' },
    { label: "Upsells & Cross-sells", value: 'upsellsCrosssells' },
  ]


  const FAQTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {
          var faq = currentObject.faq;

          faq.splice(index, 1);
          setcurrentObject({ ...currentObject, faq: faq });


        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }
  const DownloadsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {
          var downloads = currentObject.downloads;

          downloads.splice(index, 1);
          setcurrentObject({ ...currentObject, downloads: downloads });


        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }
  const GalleryTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {
          var gallery = currentObject.gallery;

          gallery.splice(index, 1);
          setcurrentObject({ ...currentObject, gallery: gallery });


        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }

  const RelatedProductsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {
          var relatedProducts = currentObject.relatedProducts;

          relatedProducts.splice(index, 1);
          setcurrentObject({ ...currentObject, relatedProducts: relatedProducts });


        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }

  const VariationsProductsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {
          var variations = currentObject.variations;

          variations.splice(index, 1);
          setcurrentObject({ ...currentObject, variations: variations });


        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }
  const CrosssellsProductsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {
          var crosssells = currentObject.crosssells;

          crosssells.splice(index, 1);
          setcurrentObject({ ...currentObject, crosssells: crosssells });


        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }
  const UpsellsProductsTitle = ({ text, index }) => {

    return (
      <div className="flex gap-3 items-center">

        <div className="hover:bg-red-400 text-white px-1 py-1 rounded-sm" onClick={ev => {
          var upsells = currentObject.upsells;

          upsells.splice(index, 1);
          setcurrentObject({ ...currentObject, upsells: upsells });


        }}><IconTrash /></div>
        <div>{text}</div>
      </div>
    )

  }







  function onPickRelatedProducts(item) {


    console.log(item);
    var relatedProducts = currentObject?.relatedProducts ? currentObject.relatedProducts : [];

    relatedProducts.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, relatedProducts: relatedProducts });
  }
  function onPickVariations(item) {


    console.log(item);
    var variations = currentObject?.variations ? currentObject.variations : [];

    variations.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, variations: variations });
  }
  function onPickUpsells(item) {


    console.log(item);
    var upsells = currentObject?.upsells ? currentObject.upsells : [];

    upsells.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, upsells: upsells });
  }
  function onPickCrosssells(item) {


    console.log(item);
    var crosssells = currentObject?.crosssells ? currentObject.crosssells : [];

    crosssells.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, crosssells: crosssells });
  }
  function onPickDownloads(item) {


    console.log(item);
    var downloads = currentObject?.downloads ? currentObject.downloads : [];

    downloads.push({ id: item.id, title: item.title })

    setcurrentObject({ ...currentObject, downloads: downloads });
  }
  function onPickGallery(item) {


    console.log(item);
    var gallery = currentObject?.gallery ? currentObject.gallery : [];

    gallery.push({ id: item.id, title: item.title, src: item.src })

    setcurrentObject({ ...currentObject, gallery: gallery });
  }




  return (
    <Layout user={user}>
      <div className="flex-1 my-10">
        <div className="flex flex-col gap-4 w-[800px] mx-auto">

          <div className="bg-white  rounded-sm px-5 py-3 flex justify-between items-center">
            <div>
              {loading && (
                <div className="flex gap-2 text-amber-600">
                  <div className="animate-spin"><IconFidgetSpinner /> </div>
                  <div>Please wait...</div>

                </div>
              )}
              {!loading && (
                <div className="flex gap-2 ">

                  <div className="text-bold">Edit:</div> <div>{currentObject?.title}</div>
                </div>
              )}

            </div>
            <div className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"
              onClick={ev => {
                update_product()
              }}
            >Update</div>
          </div>

          {/* {JSON.stringify(currentObject)} */}


          <div className="bg-white  rounded-sm ">

            <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">General Info</div>

            <div className="p-4 flex flex-col  gap-4">

              <div className="flex flex-col gap-3 ">
                <label htmlFor="" className="block text-gray-500">
                  {t("Title")}
                </label>
                <input
                  type="text"
                  className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                  value={currentObject?.title}
                  onChange={(ev) => {
                    var value = ev.target.value;
                    setcurrentObject({ ...currentObject, title: value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="block text-gray-500">
                  {t("Content")}
                </label>
                <textarea
                  type="text"
                  className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                  value={currentObject?.content}
                  onChange={(ev) => {
                    var value = ev.target.value;
                    setcurrentObject({ ...currentObject, content: value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="block text-gray-500">
                  {t("Short Description")}
                </label>
                <textarea
                  type="text"
                  className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                  value={currentObject?.shortDescription}
                  onChange={(ev) => {
                    var value = ev.target.value;
                    setcurrentObject({ ...currentObject, shortDescription: value });
                  }}
                />
              </div>







              <div className="flex flex-col gap-3">
                <label htmlFor="" className="block text-gray-500">
                  {t("SKU")}
                </label>
                <input
                  type="text"
                  className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                  value={currentObject?.sku}
                  onChange={(ev) => {
                    var value = ev.target.value;
                    setcurrentObject({ ...currentObject, sku: value });
                  }}
                />
              </div>

            </div>
          </div>

          {/* {JSON.stringify(currentObject?.addons)} */}

          <div className="flex items-center gap-2 flex-wrap ">

            {addonsList.map(item => {

              return (
                <div className={`flex gap-2 cursor-pointer ${currentObject?.addons?.includes(item?.value) ? "text-gray-600" : "text-gray-400"}`} onClick={ev => {

                  console.log(item.value)

                  var value = item.value


                  var addons = currentObject?.addons ? currentObject?.addons : [];

                  if (addons.includes(value)) {
                    const index = addons.indexOf(value);

                    console.log(index)

                    if (index !== -1) {
                      addons.splice(index, 1);
                    }


                  } else {
                    addons.push(value)
                  }

                  console.log(addons)


                  setcurrentObject({ ...currentObject, addons: addons });
                }}>

                  {currentObject?.addons?.includes(item.value) && (
                    <IconCheckbox />
                  )}
                  {!currentObject?.addons?.includes(item.value) && (

                    <IconSquare />
                  )}




                  <span>{item.label}</span>
                </div>
              )

            })}


          </div>
          {/* 
          <div className="flex gap-3 items-center">
            <label htmlFor="" className="block text-gray-500">
              {t("Product Type?")}
            </label>

            <select name="" id="" className="border border-gray-400 border-solid px-2 py-1 rounded-sm  bg-white " onChange={ev => {

              var value = ev.target.value;
              setcurrentObject({ ...currentObject, type: value });


            }}>

              <option value="physical">Physical</option>
              <option value="digital">Digital</option>

            </select>

          </div> */}


          <div className="bg-white  rounded-sm flex flex-col gap-4">
            <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Pricing</div>

            <div className="p-4 flex flex-col  gap-4">
              <div className="flex flex-col gap-3">
                <label htmlFor="" className="block text-gray-500">
                  {t("Pricing Type?")}
                </label>

                <select name="" id="" className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white mb-5" onChange={ev => {

                  var value = ev.target.value;
                  setcurrentObject({ ...currentObject, type: value });


                }}>

                  <option value="onetime">One Time</option>
                  <option value="subscription">Subscription</option>
                  <option value="pwyw">Pay what you want</option>

                </select>

              </div>


              <div className="flex gap-5">


                <div className="flex flex-col gap-3">
                  <label htmlFor="" className="block text-gray-500">
                    {t("Price?")}
                  </label>
                  <input
                    type="text"
                    className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                    value={currentObject?.regular_price}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, regular_price: value });
                    }}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="" className="block text-gray-500">
                    {t("Sale Price?")}
                  </label>
                  <input
                    type="text"
                    className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                    value={currentObject?.sale_price}
                    onChange={(ev) => {
                      var value = ev.target.value;
                      setcurrentObject({ ...currentObject, sale_price: value });
                    }}
                  />
                </div>

              </div>
            </div>


          </div>


          {currentObject?.addons?.includes('manageStock') && (
            <>
              <div className="bg-white  rounded-sm flex flex-col gap-4">
                <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Stock Management</div>



                <div className="p-4 flex flex-col gap-3 ">

                  <div className="flex flex-col gap-3">
                    <label htmlFor="" className="block text-gray-500">
                      {t("Stock Status?")}
                    </label>

                    <div className="flex gap-2 cursor-pointer">

                      <label htmlFor="stockStatusInstock" className="flex gap-2 cursor-pointer">

                        <input
                          id="stockStatusInstock"
                          type="radio"
                          className=""
                          checked={currentObject?.stockStatus == 'instock' ? true : false}
                          onChange={(ev) => {
                            var value = ev.target.value;
                            setcurrentObject({ ...currentObject, stockStatus: 'instock' });
                          }}
                        />
                        <span>In Stock</span>
                      </label>

                      <label htmlFor="stockStatusOutstock" className="flex gap-2 cursor-pointer">

                        <input
                          id="stockStatusOutstock"
                          type="radio"
                          className=""
                          checked={currentObject?.stockStatus == 'outofstock' ? true : false}
                          onChange={(ev) => {
                            var value = ev.target.value;
                            setcurrentObject({ ...currentObject, stockStatus: 'outofstock' });
                          }}
                        />
                        <span>In Stock</span>
                      </label>

                    </div>


                  </div>

                  {currentObject?.stockStatus == 'instock' && (
                    <div className="flex flex-col gap-3">
                      <label htmlFor="" className="block text-gray-500">
                        {t("Stock Count?")}
                      </label>
                      <input
                        type="number"
                        className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                        value={currentObject?.stockCount}
                        onChange={(ev) => {
                          var value = ev.target.value;
                          setcurrentObject({ ...currentObject, stockCount: value });
                        }}
                      />
                    </div>
                  )}




                </div>
              </div>
            </>

          )}

          {currentObject?.addons?.includes('gallery') && (
            <>
              <div className="bg-white  rounded-sm flex flex-col gap-4">
                <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Gallery</div>



                <div className="p-4 ">


                  <div className="flex justify-between">
                    <div></div>
                    <div>
                      <GalleryPicker onPick={onPickGallery} />
                    </div>

                  </div>

                  {currentObject?.gallery && (

                    <div className="grid grid-cols-4 gap-3 my-4" >
                      {currentObject?.gallery.map((item, index) => {

                        return (
                          <div className="relative  border-2 border-solid border-gray-400">



                            <div className="flex flex-col gap-3">
                              <div className="absolute top-1 right-1 bg-red-400 text-white px-1 py-1 rounded-sm cursor-pointer" onClick={ev => {
                                var gallery = currentObject.gallery;

                                gallery.splice(index, 1);
                                setcurrentObject({ ...currentObject, gallery: gallery });


                              }}>
                                <IconTrash />
                              </div>
                              <img className="w-full" src={item.src} alt="" />
                              <div className="absolute text-sm bottom-0 left-0 w-full bg-gray-300 p-2 text-gray-500">
                                {item.title}
                              </div>

                            </div>





                          </div>
                        )

                      })}
                    </div>
                  )}


                </div>



              </div>

            </>
          )}


          {currentObject?.addons?.includes('downloads') && (

            <div className="bg-white  rounded-sm flex flex-col gap-4">
              <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Downloads</div>


              <div className="p-4 ">


                <div className="flex justify-between">
                  <div></div>
                  <div>
                    <ProductsPicker onPick={onPickDownloads} />
                  </div>

                </div>

                {currentObject?.downloads && (

                  <div className="my-4">
                    {currentObject?.downloads.map((item, index) => {

                      return (
                        <ToggleContent key={index} title={<DownloadsTitle text={item.title} index={index} />}
                          contentClass=""
                          headerClass=""
                          headerTitleClass=""
                          wrapperClass=""
                        >

                          <div className="flex flex-col gap-3">

                            <div className="flex flex-col gap-3">
                              <label htmlFor="" className="block text-gray-500">
                                {t("Title")}
                              </label>
                              <input
                                type="text"
                                className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                                value={item.title}
                                onChange={(ev) => {
                                  var value = ev.target.value;

                                  var downloads = currentObject.downloads;
                                  downloads[index].title = value

                                  setcurrentObject({ ...currentObject, downloads: downloads });
                                }}
                              />
                            </div>



                          </div>

                        </ToggleContent>
                      )

                    })}
                  </div>
                )}


              </div>




            </div>
          )}



          {currentObject?.addons?.includes('dimensions') && (
            <div className="bg-white rounded-sm flex flex-col gap-4">
              <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Dimensions</div>

              <div className="p-4 flex  items-center gap-4">

                <div className="w-1/2">
                  <div className="flex flex-col gap-3">

                    <div className="flex flex-col gap-3">
                      <label htmlFor="" className="block text-gray-500">
                        {t("Weight")}
                      </label>
                      <input
                        type="number"
                        className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                        value={currentObject?.weight}
                        onChange={(ev) => {
                          var value = ev.target.value;
                          setcurrentObject({ ...currentObject, weight: value });
                        }}
                      />
                    </div>


                    <div className="flex flex-col gap-3">
                      <label htmlFor="" className="block text-gray-500">
                        {t("Length")}
                      </label>
                      <input
                        type="number"
                        className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                        value={currentObject?.length}
                        onChange={(ev) => {
                          var value = ev.target.value;
                          setcurrentObject({ ...currentObject, length: value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="" className="block text-gray-500">
                        {t("Width")}
                      </label>
                      <input
                        type="number"
                        className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                        value={currentObject?.width}
                        onChange={(ev) => {
                          var value = ev.target.value;
                          setcurrentObject({ ...currentObject, width: value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label htmlFor="" className="block text-gray-500">
                        {t("Height")}
                      </label>
                      <input
                        type="number"
                        className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                        value={currentObject?.height}
                        onChange={(ev) => {
                          var value = ev.target.value;
                          setcurrentObject({ ...currentObject, height: value });
                        }}
                      />
                    </div>

                  </div>

                </div>
                <div className="w-1/2 text-center">


                  <img className="w-48 mx-auto " src="https://i.ibb.co/GfjBFSbS/box.png" />

                </div>


              </div>


            </div>
          )}

          {currentObject?.addons?.includes('upsellsCrosssells') && (
            <>
              <div className="bg-white rounded-sm flex flex-col gap-4">
                <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Upsells & Cross-sells</div>

                <div className="p-4 flex flex-col  gap-4">

                  <div className="p-4 ">


                    <div className="flex justify-between">
                      <div>Upsells</div>
                      <div>
                        <ProductsPicker onPick={onPickUpsells} />
                      </div>

                    </div>

                    {currentObject?.upsells && (

                      <div className="my-4">
                        {currentObject?.upsells.map((item, index) => {

                          return (
                            <ToggleContent key={index} title={<UpsellsProductsTitle text={item.title} index={index} />}
                              contentClass=""
                              headerClass=""
                              headerTitleClass=""
                              wrapperClass=""
                            >

                              <div className="flex flex-col gap-3">

                                <div className="flex flex-col gap-3">
                                  <label htmlFor="" className="block text-gray-500">
                                    {t("Title")}
                                  </label>
                                  <input
                                    type="text"
                                    className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                                    value={item.title}
                                    onChange={(ev) => {
                                      var value = ev.target.value;

                                      var upsells = currentObject.upsells;
                                      upsells[index].title = value

                                      setcurrentObject({ ...currentObject, upsells: upsells });
                                    }}
                                  />
                                </div>



                              </div>

                            </ToggleContent>
                          )

                        })}
                      </div>
                    )}


                  </div>
                  <div className="p-4 ">


                    <div className="flex justify-between">
                      <div>Crosssells</div>
                      <div>
                        <ProductsPicker onPick={onPickCrosssells} />
                      </div>

                    </div>

                    {currentObject?.crosssells && (

                      <div className="my-4">
                        {currentObject?.crosssells.map((item, index) => {

                          return (
                            <ToggleContent key={index} title={<CrosssellsProductsTitle text={item.title} index={index} />}
                              contentClass=""
                              headerClass=""
                              headerTitleClass=""
                              wrapperClass=""
                            >

                              <div className="flex flex-col gap-3">

                                <div className="flex flex-col gap-3">
                                  <label htmlFor="" className="block text-gray-500">
                                    {t("Title")}
                                  </label>
                                  <input
                                    type="text"
                                    className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                                    value={item.title}
                                    onChange={(ev) => {
                                      var value = ev.target.value;

                                      var crosssells = currentObject.crosssells;
                                      crosssells[index].title = value

                                      setcurrentObject({ ...currentObject, crosssells: crosssells });
                                    }}
                                  />
                                </div>



                              </div>

                            </ToggleContent>
                          )

                        })}
                      </div>
                    )}


                  </div>




                </div>


              </div>
            </>
          )}


          {currentObject?.addons?.includes('faq') && (
            <div className="bg-white rounded-sm flex flex-col gap-4">
              <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">FAQ</div>

              <div className="p-4 ">

                {/* {JSON.stringify(currentObject?.faq)} */}

                <div className="flex">
                  <div className="p-2 hover:bg-gray-400 rounded-sm cursor-pointer px-4 bg-gray-600 text-white"

                    onClick={ev => {

                      var faq = currentObject?.faq ? currentObject?.faq : [];

                      faq.push({ title: "Test Title", content: "Text Content" })
                      setcurrentObject({ ...currentObject, faq: faq });

                    }}
                  >Add</div>
                </div>

                {currentObject?.faq && (

                  <div className="my-4">
                    {currentObject?.faq.map((item, index) => {

                      return (
                        <ToggleContent key={index} title={<FAQTitle text={item.title} index={index} />}
                          contentClass=""
                          headerClass=""
                          headerTitleClass=""
                          wrapperClass=""
                        >

                          <div className="flex flex-col gap-3">

                            <div className="flex flex-col gap-3">
                              <label htmlFor="" className="block text-gray-500">
                                {t("Title")}
                              </label>
                              <input
                                type="text"
                                className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                                value={item.title}
                                onChange={(ev) => {
                                  var value = ev.target.value;

                                  var faq = currentObject.faq;
                                  faq[index].title = value

                                  setcurrentObject({ ...currentObject, faq: faq });
                                }}
                              />
                            </div>

                            <div className="flex flex-col gap-3">
                              <label htmlFor="" className="block text-gray-500">
                                {t("Content")}
                              </label>
                              <textarea
                                type="text"
                                className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                                value={item?.content}
                                onChange={(ev) => {
                                  var value = ev.target.value;

                                  var faq = currentObject.faq;
                                  faq[index].content = value

                                  setcurrentObject({ ...currentObject, faq: faq });
                                }}
                              />
                            </div>

                          </div>

                        </ToggleContent>
                      )

                    })}
                  </div>
                )}


              </div>


            </div>
          )}

          {currentObject?.addons?.includes('relatedProducts') && (
            <div className="bg-white rounded-sm flex flex-col gap-4">
              <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Related Products</div>

              <div className="p-4 ">


                <div className="flex justify-between">
                  <div></div>
                  <div>
                    <ProductsPicker onPick={onPickRelatedProducts} />
                  </div>

                </div>

                {currentObject?.relatedProducts && (

                  <div className="my-4">
                    {currentObject?.relatedProducts.map((item, index) => {

                      return (
                        <ToggleContent key={index} title={<RelatedProductsTitle text={item.title} index={index} />}
                          contentClass=""
                          headerClass=""
                          headerTitleClass=""
                          wrapperClass=""
                        >

                          <div className="flex flex-col gap-3">

                            <div className="flex flex-col gap-3">
                              <label htmlFor="" className="block text-gray-500">
                                {t("Title")}
                              </label>
                              <input
                                type="text"
                                className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                                value={item.title}
                                onChange={(ev) => {
                                  var value = ev.target.value;

                                  var relatedProducts = currentObject.relatedProducts;
                                  relatedProducts[index].title = value

                                  setcurrentObject({ ...currentObject, relatedProducts: relatedProducts });
                                }}
                              />
                            </div>



                          </div>

                        </ToggleContent>
                      )

                    })}
                  </div>
                )}


              </div>


            </div>
          )}
          {currentObject?.addons?.includes('variations') && (
            <div className="bg-white rounded-sm flex flex-col gap-4">
              <div className="px-5 py-3 text-xl border-b border-solid border-gray-300">Products Variations</div>

              <div className="p-4 ">

                {/* {JSON.stringify(currentObject?.relatedProducts)} */}

                <div className="flex justify-between">



                  <div></div>
                  <div>
                    <ProductsPicker onPick={onPickVariations} />
                  </div>

                </div>

                {currentObject?.variations && (

                  <div className="my-4">
                    {currentObject?.variations.map((item, index) => {

                      return (
                        <ToggleContent key={index} title={<VariationsProductsTitle text={item.title} index={index} />}
                          contentClass=""
                          headerClass=""
                          headerTitleClass=""
                          wrapperClass=""
                        >

                          <div className="flex flex-col gap-3">

                            <div className="flex flex-col gap-3">
                              <label htmlFor="" className="block text-gray-500">
                                {t("Title")}
                              </label>
                              <input
                                type="text"
                                className="border border-gray-400 border-solid px-2 py-1 rounded-sm w-full bg-white"
                                value={item.title}
                                onChange={(ev) => {
                                  var value = ev.target.value;

                                  var variations = currentObject.variations;
                                  variations[index].title = value

                                  setcurrentObject({ ...currentObject, variations: variations });
                                }}
                              />
                            </div>



                          </div>

                        </ToggleContent>
                      )

                    })}
                  </div>
                )}


              </div>


            </div>
          )}



        </div>


      </div>
    </Layout >
  );
}

export default ProductDetail;
