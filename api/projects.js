import { put, list } from "@vercel/blob";
const path="portfolio/projects.json";
const fallback=[];
async function read(){const x=await list({prefix:path,limit:1});if(!x.blobs?.length)return fallback;return await (await fetch(x.blobs[0].url)).json()}
export default async function handler(req,res){if(req.method==="GET")return res.status(200).json({projects:await read()});if(req.method==="POST"){if(req.headers["x-admin-password"]!==process.env.ADMIN_PASSWORD)return res.status(401).json({error:"Unauthorized"});const body=typeof req.body==="string"?JSON.parse(req.body):req.body;await put(path,JSON.stringify(body.projects||[]),{access:"public",addRandomSuffix:false,allowOverwrite:true,contentType:"application/json"});return res.status(200).json(body)}return res.status(405).end()}