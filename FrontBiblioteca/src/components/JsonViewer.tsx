import React, { useEffect, useState } from 'react';

interface JsonViewerProps {
  endpoint: string;
  title: string;
}

function JsonViewer({ endpoint, title }: JsonViewerProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed to fetch ${title}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, title]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
      </div>
    );
  }

  const formatValue = (value: any): string => {
    if (typeof value === 'string') return `"${value}"`;
    return JSON.stringify(value);
  };

  const renderJson = (obj: any, level = 0): JSX.Element => {
    const indent = '  '.repeat(level);
    
    return (
      <div style={{ marginLeft: level * 20 }}>
        {'{'}
        {Object.entries(obj).map(([key, value], index) => (
          <div key={key} className="ml-4">
            <span className="text-purple-600">"{key}"</span>
            <span className="text-gray-600">: </span>
            {typeof value === 'object' && value !== null ? (
              renderJson(value, level + 1)
            ) : (
              <span className="text-green-600">{formatValue(value)}</span>
            )}
            {index < Object.keys(obj).length - 1 && <span>,</span>}
          </div>
        ))}
        {'}'}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
      <div className="font-mono text-sm overflow-x-auto">
        {Array.isArray(data) ? (
          <div>
            {'['}
            {data.map((item, index) => (
              <div key={index} className="ml-4">
                {renderJson(item)}
                {index < data.length - 1 && ','}
              </div>
            ))}
            {']'}
          </div>
        ) : (
          renderJson(data)
        )}
      </div>
    </div>
  );
}

export default JsonViewer;