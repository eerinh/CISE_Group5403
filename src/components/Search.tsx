// Search.tsx

import React from 'react';

type Props = {
  className?: string;
  onUpdate: (query: string) => void;
};

const Search: React.FC<Props> = ({ className, onUpdate }) => {
  return (
    <input className={className} onChange={(e) => onUpdate(e.target.value)} />
  );
};

export default Search;
