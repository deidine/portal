import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import supabase from '../../config/supabaseClient';

export default function CreatePost() {
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
      setImageFile(file);
    }
  };

  const onFinish = async (values: any) => {
    let filePath = '';

    if (imageFile) {
      filePath = `posts/${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('imgs')
        .upload(filePath, imageFile);

      if (uploadError) {
        message.error(`Image upload failed: ${uploadError.message}`);
        return;
      }
    }

    const { data, error } = await supabase
      .from('post')
      .insert([
        {
          title: values.title,
          description: values.description,
          files: filePath,
          category: values.category,
          relation: values.relation,
          id_company: values.id_company,
        },
      ]);

    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      message.success('Post added successfully!');
      setImagePreview(null);
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
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input the category!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Relation"
          name="relation"
          rules={[{ required: true, message: 'Please input the relation!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Company ID"
          name="id_company"
          rules={[{ required: true, message: 'Please input the company ID!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Image"
          name="img"
          rules={[{ required: true, message: 'Please select an image!' }]}
        >
          <Input type='file' onChange={handleImageChange} />
          {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}
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
