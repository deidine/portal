import React, { useCallback, useEffect, useState } from 'react';
import { Table, message, Input, Button, Modal, Form } from 'antd';
import supabase from '../../config/supabaseClient';
import RenderImage from '../../components/RenderImage';
import { debounce } from 'lodash';

type Company = {
  id: number;
  nom: string;
  img: string;
  location: string;
};

export default function AllCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [form] = Form.useForm();

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from('company')
      .select('*');

    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      setCompanies(data);
      setAllCompanies(data); 
      }
    setLoading(false);
  };

  const fetchSearchCompanies = async (txt: string) => {
    const { data, error } = await supabase
      .from('company')
      .select('*')
      .ilike('nom', `%${txt}%`);

    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      setCompanies(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const debouncedSearch = useCallback(debounce(fetchSearchCompanies, 300), []);
  useEffect(() => {
    if (searchInput) {
      debouncedSearch(searchInput);
    } else {
      fetchCompanies();
    }
  }, [searchInput]);

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('company')
      .delete()
      .eq('id', id);

    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      message.success('Company deleted successfully');
      fetchCompanies();
    }
  };

  const handleUpdate = async (values: Company) => {
    const { error } = await supabase
      .from('company')
      .update(values)
      .eq('id', values.id);

    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      message.success('Company updated successfully');
      setIsModalVisible(false);
      form.resetFields();
      fetchCompanies();

    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'nom',
      key: 'nom',
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (text: string) => <RenderImage path={text} />,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Company) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Companies</h1>
      <Input
        style={{ width: '200px', marginBottom: '20px' }}
        placeholder='Search by name'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={companies}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title="Edit Company"
        visible={isModalVisible}
        onCancel={() => {
          form.resetFields();
          setIsModalVisible(false)}}
        footer={null}
      >
        {editingCompany && (
          <Form
          form={form}
            initialValues={editingCompany}
            onFinish={handleUpdate}
          >
            <Form.Item name="nom" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="img" label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name="location" label="Location">
              <Input />
            </Form.Item>
            <Form.Item name="id" hidden>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Update</Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}
