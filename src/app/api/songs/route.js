import songs from '@/data/repertoire-02082026.json';

export async function GET() {
  return Response.json(songs);
}
