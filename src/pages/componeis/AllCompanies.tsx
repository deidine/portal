import React, { useEffect, useState } from 'react';
 
import { Table, message } from 'antd';
import supabase from '../../config/supabaseClient';
import RenderImage from '../../components/RenderImage';

 
type Company= {
  id: number;
  nom: string;
  img: string;
  location: string;
}

export default function AllCompanies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase
        .from('company')
        .select('*');

      if (error) {
        message.error(`Error: ${error.message}`);
      } else {
        setCompanies(data);
      }
      setLoading(false);
    };

    fetchCompanies();
  }, []);

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
      render: (text: string) =><>
      <RenderImage path={text}/> </> ,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Companies</h1>
      <Table
        columns={columns}
        dataSource={companies}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
}
