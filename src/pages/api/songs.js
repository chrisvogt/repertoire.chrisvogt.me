import songs from '@/data/repertoire-12072024.json';

export default function handler(req, res) {
  res.status(200).json(songs);
}
