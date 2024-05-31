import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import supabase from '../../config/supabaseClient';
import RenderImage from '../../components/RenderImage';

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

export default function AllPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('post')
        .select('*');

      if (error) {
        message.error(`Error: ${error.message}`);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

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
      <Table
        columns={columns}
        dataSource={posts}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
}
