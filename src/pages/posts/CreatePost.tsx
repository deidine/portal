import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import supabase from '../../config/supabaseClient';

const { Option } = Select;

type Company = {
  id: number;
  nom: string;
};
type Category = {
  id: number;
  name: string;
};

export default function CreatePost() {
  const allcategories: Category[] = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Health' },
    { id: 3, name: 'Finance' },
    // Add more categories as needed
  ];
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>(allcategories);
  const [companies, setCompanies] = useState<Company[]>([]);

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

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from('company')
      .select('id, nom');
    if (error) {
      console.log(error);
    } else {
      setCompanies(data);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

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
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select a category" style={{ width: '100%' }}>
            {categories.map((category) => (
              <Option key={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
          </Select>
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
    <Select placeholder="Select a company" style={{ width: '100%' }}>
            {companies.map((company) => (
              <Option key={company.id} value={company.id}>
                {company.nom}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Image"
          name="img"
          rules={[{ required: true, message: 'Please select an image!' }]}
        >
          <Input type="file" onChange={handleImageChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: '100px', marginTop: '10px' }}
            />
          )}
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
