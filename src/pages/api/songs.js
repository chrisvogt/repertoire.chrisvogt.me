import songs from '@/data/repertoire-01072025.json';

export default function handler(req, res) {
  res.status(200).json(songs);
}
