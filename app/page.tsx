import React from 'react';
import SearchView from '@/components/views/Search.view';
import IssuesTable from '@/components/views/IssuesTable.view';

const HomePage = () => (
  <div className='flex min-h-screen items-center justify-center py-5'>
    <div className='w-full max-w-7xl flex flex-col gap-5 p-4'>
      <SearchView />
      <IssuesTable />
    </div>
  </div>
);

export default HomePage;