import songs from '@/data/repertoire-06302025.json';

export default function handler(req, res) {
  res.status(200).json(songs);
}
