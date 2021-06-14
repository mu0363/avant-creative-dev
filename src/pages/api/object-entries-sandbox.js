import { obj } from 'src/lib/obj';

export default (req, res) => {
  res.statusCode = 200;
  const entries = Object.entries(obj).map(([key, value]) => ({
    key: value,
  }));
  res.json(entries);
};
