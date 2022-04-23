import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';

export const useNavigateSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromLocation = location?.search
    .slice(1)
    .split('&')
    .map(p => p.split('='))
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
  return (pathname, params) =>
    navigate({ pathname, search: `?${createSearchParams({ ...fromLocation, ...params })}` });
};
