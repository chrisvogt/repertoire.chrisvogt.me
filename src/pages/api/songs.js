import songs from '@/data/repertoire-11252024.json';

export default function handler(req, res) {
  res.status(200).json(songs);
}
