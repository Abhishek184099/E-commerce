import toast from "react-hot-toast";

const useUpload = () => {

  const upload = async (productData) => {
    const formData = new FormData();
    formData.append('title', productData.title);
    formData.append('price', productData.price);
    formData.append('inStock', productData.inStock);
    formData.append('description', productData.description);
    formData.append('image', productData.image);

    try {
      const res = await fetch("/api/product/uploadproduct", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      toast.success('Product uploaded successfully');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return { upload };
};

export default useUpload;
