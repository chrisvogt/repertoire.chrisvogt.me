import songs from '@/data/repertoire-02082026.json';

export default function handler(req, res) {
  res.status(200).json(songs);
}
