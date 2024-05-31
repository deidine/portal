import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import ImageUpload from '../../components/ImageUpload';
import supabase from '../../config/supabaseClient';

export default function CreateCompany() {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file); // Pass the selected file to the parent component
    }
  };
  const onFinish = async (values: any) => {
    if (imageFile) {
      const filePath = `companies/${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('imgs')
        .upload(filePath, imageFile);

      if (uploadError) {
        message.error(`Image upload failed: ${uploadError.message}`);
        return;
      }

      values.img = filePath;
    }

    const { data, error } = await supabase
      .from('company')
      .insert([
        { nom: values.nom, img: values.img, location: values.location },
      ]);

    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      message.success('Company added successfully!');
      setImagePreview(null)
      form.resetFields();
    }
  };

  return (
    <div className="flex flex-col mx-auto rounded-lg shadow-lg w-1/2 my-3 border-2 px-2">
      <Form
        form={form}
        {...formItemLayout}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="nom"
          rules={[{ required: true, message: 'Please input the company name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          name="img"
          rules={[{ required: true, message: 'Please select an image!' }]}
        >
          <Input type='file' onChange={handleImageChange}/>
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}

          {/* <ImageUpload onImageSelect={setImageFile} /> */}
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: 'Please input the location!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
