import type { Context, Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

export default async (req: Request, context: Context) => {
  //
  //  Create a blob store to hold a counter
  //
  const store = getStore('myCounter');
  //
  //  Depending on the HTTP method, either return the value from the blob store
  //  or increment the count and then return it.
  //
  const fakeCount = "9007199254730992"
  const method = req.method;
  if (method === 'GET') {
    return new Response(fakeCount);
  } else if (method === 'POST') {
    await store.set('count', fakeCount);
    return new Response(fakeCount);
  }
};
//
//  Configure the path for the edge function
//
export const config: Config = {
  path: '/api/count',
};
