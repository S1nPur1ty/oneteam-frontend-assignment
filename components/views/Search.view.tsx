'use client'

import { Button } from '@/components/elements/Button/Button.component';
import { TextField } from '@/components/elements/TextField/TextField.component';
import { IssuesContext } from '@/hooks/Issues.hook';
import { useContext, useState } from 'react';

const SearchView = () => {
  const { url, setUrl } = useContext(IssuesContext);
  const [_url, _setUrl] = useState<string>(url);
  
  const label = 'https://api.';

  const filterUrl = (url: string, isPasted = false) => {
    const regexPrefix = /^(https?:\/\/)?(api\.)?/;
    let cleanedUrl = url.replace(regexPrefix, '');
  
    const githubRegex = /^(github\.com\/)(?!repos\/)/;
    if (githubRegex.test(cleanedUrl)) {
      cleanedUrl = cleanedUrl.replace(githubRegex, '$1repos/');
    }
  
    _setUrl(cleanedUrl);
  };

  return (
    <div className='w-full flex gap-5'>
      <TextField prependLabel={label} value={_url} onChange={ (value) => filterUrl(value) } onPaste={ (value) => filterUrl(value, true) } />
      <Button className='bg-blue-500 px-5 py-2 rounded' onClick={ () => setUrl(label+_url) }>Search</Button>
    </div>
  )
}

export default SearchView;