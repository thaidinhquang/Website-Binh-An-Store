import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Form, Input, InputNumber, Select, Space, Table, Typography } from "antd";
import { useBrands } from "../../../common/hooks/brand/useBrands";
import { useCategories } from "../../../common/hooks/category/useCategories";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailProduct } from "../../../common/hooks/product/useGetDetailProduct";
import { useUpdateProduct } from "../../../common/hooks/product/useUpdateProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/queryKey";
import { uploadFileCloudinary } from "../../../common/libs/uploadImageCloud";
import { useCreateProduct } from "../../../common/hooks/product/useCreateProduct";
import { CloseOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useTanstackMutation } from "../../../common/hooks/useTanstackQuery";

const ProductForm = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const variantForm = Form.useWatch('variants', { form, preserve: true });
  const categoryForm = Form.useWatch('category', { form, preserve: true });

  const [image, setImage] = useState('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg');
  const [image1, setImage1] = useState('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg');
  const [image2, setImage2] = useState('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg');
  const [image3, setImage3] = useState('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg');
  const [dataSource, setDataSource] = useState([]);
  const [detail, setDetail] = useState([]);

  const { data: productData, isLoading } = id ? useGetDetailProduct(id) : { data: null };
  const updateProduct = useUpdateProduct(id);
  const createProduct = useCreateProduct(id);
  const { mutate } = useTanstackMutation({
    path: `products`,
    action: id ? "UPDATE" : "CREATE",
    navigatePage: "/admin/products",
});
  const queryClient = useQueryClient();
  const { data: brands } = useBrands();
  const { data: categories } = useCategories();

  useEffect(() => {
    if (productData?.data) {
      var data = [];
      var variants = [];
      var variant_1 = {name: null, list:[]};
      var variant_2 = {name: null, list:[]};
      setImage(productData.data.image);
      setImage1(productData.data.gallery[0]);
      setImage2(productData.data.gallery[1]);
      setImage3(productData.data.gallery[2]);
      productData.data.attributes.map((att,index)=>{
        data = {...data, [att.key]: att.value};
      });
      productData.data.productItems.map((prdItem)=>{
        prdItem.variants?.map((vriItem)=>{
          if(!variant_1.name){
            variant_1.name = vriItem.key;
            variant_1.list = [{value:vriItem.value}];
          }else{
            if(variant_1.name == vriItem.key && !variant_1.list.find((it)=>{return (it.value == vriItem.value)})){
              variant_1.list = [...variant_1.list,{value:vriItem.value}];
            }else if(!variant_2.name){
              variant_2.name = vriItem.key;
              variant_2.list = [{value:vriItem.value}]; 
            }else if(variant_2.name == vriItem.key && !variant_2.list.find((it)=>{return (it.value == vriItem.value)})){
              variant_2.list = [...variant_2.list,{value:vriItem.value}];
            }
          }
        });
        variants = [variant_1,variant_2].filter((it)=>it.list?.length>0);
      });

      form.setFieldsValue({
        name: productData.data.name,
        image: productData.data.image,
        description: productData.data.description,
        slug: productData.data.slug,
        category: productData.data.category?._id,
        brand: productData.data.brand?._id,
        attributes: data,
        variants: variants,
      });

      // Set dataSource with _id
      const newDataSource = productData.data.productItems.map((prdItem, index) => {
        const label = prdItem.variants.map(v => `${v.key}-${v.value}`).join('||');
        return {
          key: index,
          _id: prdItem._id,
          label: label,
          price: prdItem.price,
          image: prdItem.image,
          stock: prdItem.stock,
        };
      });
      setDataSource(newDataSource);
    }
  }, [productData, id]);

  useEffect(() => {
    var gallery = [image1,image2,image3];
    form.setFieldsValue({
      gallery: gallery,
    });
  }, [image1,image3,image2]);

  useEffect(() => {
    if(categoryForm){
      setDetail(categories?.filter((cat)=>cat._id == categoryForm)[0]?.details);
    }
  }, [categoryForm]);

const brandOptions = Array.isArray(brands) ? brands.map((brand) => ({
  label: brand.name,
  value: brand._id,
})) : [];

const categoryOptions = Array.isArray(categories) ? categories.map((category) => ({
  label: category.name,
  value: category._id,
})) : [];
  const uploadImg = useMutation({
    mutationFn: uploadFileCloudinary,
    onSuccess: (data) => {
        setImage(data);
        form.setFieldsValue({
          image:data,
        });
    },
    onError: (error) => {
        console.error("Error uploading image:", error);
        toast.error("Không thể tải ảnh lên");
    },
  });
  const uploadImg1 = useMutation({
    mutationFn: uploadFileCloudinary,
    onSuccess: (data) => {
        setImage1(data);
    },
    onError: (error) => {
        console.error("Error uploading image:", error);
        toast.error("Không thể tải ảnh lên");
    },
  });
  const uploadImg2 = useMutation({
    mutationFn: uploadFileCloudinary,
    onSuccess: (data) => {
        setImage2(data);
    },
    onError: (error) => {
        console.error("Error uploading image:", error);
        toast.error("Không thể tải ảnh lên");
    },
  });
  const uploadImg3 = useMutation({
    mutationFn: uploadFileCloudinary,
    onSuccess: (data) => {
        setImage3(data);
    },
    onError: (error) => {
        console.error("Error uploading image:", error);
        toast.error("Không thể tải ảnh lên");
    },
  });

  const handleImageChange = async ({ target }) => {
      if (target.files.length > 0) {
          const file = target.files[0];
          setImage(URL.createObjectURL(file));
          await uploadImg.mutate(file);
      }
  };
  const handleImageChangeimage1 = async ({ target }) => {
    if (target.files.length > 0) {
        const file = target.files[0];
        setImage1(URL.createObjectURL(file));
        await uploadImg1.mutate(file);
    }
  };
  const handleImageChangeimage2 = async ({ target }) => {
    if (target.files.length > 0) {
        const file = target.files[0];
        setImage2(URL.createObjectURL(file));
        await uploadImg2.mutate(file);
    }
  };
  const handleImageChangeimage3 = async ({ target }) => {
    if (target.files.length > 0) {
        const file = target.files[0];
        setImage3(URL.createObjectURL(file));
        await uploadImg3.mutate(file);
    }
  };


  // Process variant
  useEffect(() => {
    var count = 0;
    var newDts = [];
    if (variantForm) {
      if (variantForm.length === 1 || (variantForm[0] && (!variantForm[1] || !variantForm[1]?.list || !variantForm[1]?.list[0]))) {
        variantForm.forEach((item) => {
          if (item?.list) {
            item.list.forEach((value) => {
              if (value?.value) {
                var dbProductItem = productData?.data?.productItems?.find((prdItem) => `${item?.name}-${value.value}` === `${prdItem?.variants[0]?.key}-${prdItem?.variants[0].value}`);
                var newData = {
                  key: count,
                  _id: dbProductItem ? dbProductItem._id : undefined, // Preserve _id if exists
                  label: `${item.name}-${value.value}`,
                  price: dbProductItem ? dbProductItem.price : '0',
                  image: dbProductItem ? dbProductItem.image : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg',
                  stock: dbProductItem ? dbProductItem.stock : '0',
                };
                newDts = [...newDts, newData];
                count += 1;
              }
            });
          }
        });
      }

      if (variantForm.length === 2 && variantForm[0]?.list && variantForm[1]?.list) {
        for (let i = 0; i < variantForm[0].list.length; i++) {
          const value = variantForm[0].list[i];
          const value1 = variantForm[1].list[i];
          if (value?.value && value1?.value) {
            var dbProductItem = productData?.data.productItems?.find((prdItem) => 
              `${prdItem?.variants[0]?.key}-${prdItem?.variants[0]?.value}||${prdItem?.variants[1]?.key}-${prdItem?.variants[1]?.value}` === 
              `${variantForm[0]?.name}-${value?.value}||${variantForm[1]?.name}-${value1?.value}`
            );
            var newData = {
              key: count,
              _id: dbProductItem ? dbProductItem._id : undefined, // Preserve _id if exists
              label: `${variantForm[0]?.name}-${value?.value}||${variantForm[1]?.name}-${value1?.value}`,
              price: dbProductItem ? dbProductItem.price : '0',
              image: dbProductItem ? dbProductItem.image : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg',
              stock: dbProductItem ? dbProductItem.stock : '0',
            };
            newDts = [...newDts, newData];
            count += 1;
          }
        }
      }
    }
    setDataSource(newDts);
  }, [variantForm]);
  
  
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: 'Label',
      dataIndex: 'label',
      width: '30%',
      editable: false,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '10%',
      editable: true,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      width: '30%',
      editable: true,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      width: '30%',
      editable: true,
    },
  ];

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onAddProduct = (values) => {
    var dataDallery = [image1,image2,image3].filter((item)=>item!=null);
    var keyNames = Object.keys(values.attributes);
    var dataAttribute = keyNames?.map((item)=>{
      return {
        key:item,
        value: values.attributes[item]
      };
    });
    var dataVariants = dataSource?.map((item)=>{
      var dtVariants = item.label.split('||')?.map((item)=>{
        var vr = item.split("-");
        return {
          key:vr[0],
          value:vr[1]
        }
      });
      return {
        _id: item._id, // Ensure the existing _id is preserved
        price: item.price,
        image: item.image,
        stock: item.stock,
        variants: dtVariants
      };
    });
    var dataSubmit = {...values,attributes:dataAttribute,variants:dataVariants}
    if(id) {
      mutate({
        ...dataSubmit,_id:id})}
        else {
          mutate(dataSubmit);
  }
    // if(id){
    //   updateProduct.mutate(
    //     dataSubmit,
    //     {
    //       onSuccess: () => {
    //         queryClient.invalidateQueries({
    //           queryKey: [QUERY_KEY.DETAIL, id],
    //         });
    //         toast.success("Cập nhật sản phẩm thành công");
    //         navigate("/admin/products")
    //       },
    //     }
    //   );
    // }else{
    //   createProduct.mutate(
    //     dataSubmit,
    //     {
    //       onSuccess: () => {
    //         queryClient.invalidateQueries({
    //           queryKey: [QUERY_KEY.DETAILS],
    //         });
    //         toast.success("Thêm mới sản phẩm thành công");
    //         navigate("/admin/products")
    //       },
    //     }
    //   );
    // }
    
  };

  return (
    <Form form={form} layout="vertical" onFinish={onAddProduct}>
      <Space className="p-3 border rounded-lg w-full bg-[#ffff] mb-5 flex items-center justify-between">
        <Typography.Title level={4}>Thêm mới sản phẩm</Typography.Title>
        <Button
          type="dashed"
          htmlType="submit"
          className="font-semibold px-2 py-5"
        >
          {id ? "Cập nhật" : "Thêm mới"}
        </Button>
      </Space>
      <Space
        className="w-full bg-[#ffff] p-3 border rounded-lg"
        direction="vertical"
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>
        <div className="w-[100%] h-px bg-zinc-300 border-b border-gray-200" />
        <Form.Item label="Ảnh Sản phẩm" name='image'>
            <img src={image} onClick={() => document.getElementById('file')?.click()} alt="Blog preview" className="w-[100px] h-a object-cover rounded-lg mb-4" />
            <div className="flex flex-col">
                <Input 
                    type="file" 
                    id="file" 
                    accept="image/jpg, image/jpeg, image/png" 
                    onChange={handleImageChange}
                    className="invisible" 
                />
            </div>
        </Form.Item>
        <div className="w-[100%] h-px bg-zinc-300 border-b border-gray-200" />
        <Form.Item label="Gallery" name='gallery'>
            <div className="inline">
              <img src={image1} alt="Blog preview" onClick={() => document.getElementById('file1')?.click()} className="w-[100px] inline h-a object-cover rounded-lg ml-4" />
              <img src={image2} alt="Blog preview" onClick={() => document.getElementById('file2')?.click()} className="w-[100px] inline h-a object-cover rounded-lg ml-4" />
              <img src={image3} alt="Blog preview" onClick={() => document.getElementById('file3')?.click()} className="w-[100px] inline h-a object-cover rounded-lg ml-4" />
            </div>
            
            <div className="flex flex-col">
                <input 
                    type="file" 
                    id="file1" 
                    accept="image/jpg, image/jpeg, image/png" 
                    onChange={handleImageChangeimage1}
                    className="invisible" 
                />
                <input 
                    type="file" 
                    id="file2" 
                    accept="image/jpg, image/jpeg, image/png" 
                    onChange={handleImageChangeimage2}
                    className="invisible" 
                />
                <input 
                    type="file" 
                    id="file3" 
                    accept="image/jpg, image/jpeg, image/png" 
                    onChange={handleImageChangeimage3}
                    className="invisible" 
                />
            </div>
        </Form.Item>
        <div className="w-[100%] h-px bg-zinc-300 border-b border-gray-200" />
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Vui lòng nhập slug" }]}
        >
          <Input />
        </Form.Item>
        <div className="w-[100%] h-px bg-zinc-300 border-b border-gray-200" />
        <Form.Item
          name="description"
          label="Mô tả sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
        >
          <Input.TextArea row={5} />
        </Form.Item>
        <div className="w-[100%] h-px bg-zinc-300 border-b border-gray-200" />
        <Form.Item
          name="brand"
          label="Thương hiệu sản phẩm"
          rules={[
            { required: true, message: "Vui lòng nhập thương hiệu sản phẩm" },
          ]}
        >
          <Select options={brandOptions} />
        </Form.Item>
        <div className="w-[100%] h-px bg-zinc-300 border-b border-gray-200" />
        <Form.Item
          name="category"
          label="Loại sản phẩm"
          rules={[{ required: true, message: "Vui lòng nhập loại sản phẩm" }]}
        >
          <Select options={categoryOptions} />
        </Form.Item>
        <p className="mt-[-20px]">Chi tiết sản phẩm</p>
        <Form.List name="attributes">
          {()=>(
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'row', columnGap: 30}}>
            {detail?.map((det,index)=>{
              var rules = det.isRequired ? [
                { required: true, message: "Vui lòng nhập attribute" },
              ] : [];
              var detailOptions = det.values?.map((val) => ({
                label: val,
                value: val,
              }));
              if(det.isSelectedInputType){
                return (
                  <Form.Item key={det.key}
                    name={det.key}
                    label={det.key}
                    rules={rules}
                  >
                    <Select options={detailOptions} />
                  </Form.Item>
                );
              }
              if(!det.isSelectedInputType){
                return (
                  <Form.Item key={det.key}
                    name={det.key}
                    label={det.key}
                    rules={rules}
                  >
                    <Input />
                  </Form.Item>
                );
              }
            })}
          </div>
          )}
        </Form.List>

        <div className="mt-[20px] w-[100%] h-px bg-zinc-300 border-b border-gray-200" />
        <p className="mt-[10px]">Biến thể sản phẩm</p>

        <Form.List name="variants">
        {(fields, { add, remove }) => (
          <>
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'row', columnGap: 30}}>
              {fields.map((field) => (
                <Card
                  className="w-[95%]"
                  size="small"
                  title={`Loại ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  }
                >
                  <Form.Item label="Name" name={[field.name, 'name']}>
                    <Input />
                  </Form.Item>
                  {/* Nest Form.List */}
                  <Form.Item label="Values">
                    <Form.List name={[field.name, 'list']}>
                      {(subFields, subOpt) => (
                        <>
                          <div style={{ display: 'flex', flexDirection: 'row', rowGap: 16, columnGap: 30}}>
                            {subFields.map((subField,index) => (
                              <Space key={subField.key+"-"+index}>
                                <Form.Item noStyle name={[subField.name, 'value']}>
                                  <Input placeholder="value" />
                                </Form.Item>                           
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                  />
                              </Space>
                            ))}
                          </div>
                          <Button className="w-[150px] mt-[20px]" type="dashed" onClick={() => subOpt.add()}>
                              + Thêm giá trị
                          </Button>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                </Card>
              ))}
            </div>
            <Button className="w-[150px] mb-[20px]" type="dashed" onClick={() => {if(fields.length<=1){add()}}}>
              + Thêm phân loại
            </Button>
          </>
        )}
      </Form.List>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      </Space>
    </Form>
  );
};

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  useEffect(() => {
    if (image) {
      toggleEdit();
      var newRc = record;
      newRc.image = image;
      handleSave(newRc);
    }
  }, [image]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      var keyNames = Object.keys(values);
      toggleEdit();
      var newRc = record;
      newRc[`${keyNames[0]}`] = values[`${keyNames[0]}`];
      handleSave(newRc);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  const uploadMutation = useMutation({
    mutationFn: uploadFileCloudinary,
    onSuccess: (data) => {
        setImage(data);
    },
    onError: (error) => {
        console.error("Error uploading image:", error);
        toast.error("Không thể tải ảnh lên");
    },
  });
  const handleVariantImageChange = async ( { target } ) => {
    if (target.files?.length > 0) {
        const file = target.files[0];
        await uploadMutation.mutate(file);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} không được để trống.`,
          },
          {
            type: 'number',
            min: 0,
            message: `${title} không được âm.`,
          },
        ]}
      >
        {dataIndex == "image" ? (
          <>
            <img src={record.image}  alt="Blog preview" className="w-[100px] h-a object-cover rounded-lg mb-4" />
            <button type="button"
                onClick={() => document.getElementById(`vim${record['key']}`)?.click()}
                className="w-[100px] text-base text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 ">
                Chọn ảnh
            </button>
            <input 
              type="file" 
              id={`vim${record['key']}`} 
              accept="image/jpg, image/jpeg, image/png" 
              onChange={(value)=>handleVariantImageChange(value)}
              className="invisible inline" 
            />
          </>
        ) : (
          <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} 
            onKeyDown={(e) => {
              // Ngăn không cho nhập các ký tự không phải số
              if (isNaN(Number(e.key)) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== '-') {
                e.preventDefault();
              }
            }}
          />
        )}
        
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingInlineEnd: 24,
        }}
        onClick={toggleEdit}
      >
        {dataIndex == "image" ? [undefined,(
          <img src={children[1]} key={children} alt="Blog preview" className="inline w-[100px] h-a object-cover rounded-lg mb-4" />       
        )] : (
          children
        )}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export default ProductForm;
