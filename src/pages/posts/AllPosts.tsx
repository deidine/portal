import React, { useEffect, useState } from 'react';
import { Table, message, Input, Select } from 'antd';
import supabase from '../../config/supabaseClient';
import RenderImage from '../../components/RenderImage';

const { Option } = Select;

type Post = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  files: string;
  category: string;
  relation: number;
  id_company: number;
};

type Category = {
  id: number;
  name: string;
};

export default function AllPost() {
  const allcategories: Category[] = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Health' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Technology' },
  ];

  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('post')
      .select('*');
    
    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      setPosts(data);
      setAllPosts(data); // Save all posts for reference
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredPosts = allPosts.filter(post => {
      const matchesTitle = post.title.toLowerCase().includes(searchInput.toLowerCase());
      const matchesCategory = selectedCategories.length > 0
        ? selectedCategories.includes(post.category)
        : true;
      return matchesTitle && matchesCategory || selectedCategories.includes("All");
    });
    setPosts(filteredPosts);
  }, [searchInput, selectedCategories, allPosts]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Files',
      dataIndex: 'files',
      key: 'files',
      render: (text: string) => <RenderImage path={text} />,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Posts</h1>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <Input
          style={{ width: '200px' }}
          placeholder='Search by title'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Select
          mode="multiple"
          style={{ width: '200px' }}
          placeholder="Select categories"
          onChange={(value: string[]) => setSelectedCategories(value)}
        >
          {allcategories.map(category => (
            <Option key={category.id} value={category.name}>
              {category.name}
            </Option>
          ))}
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={posts}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
}
