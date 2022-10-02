import type { NextApiResponse } from "next"
function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://www.sadana.com/hotel</loc>
     </url>
	<url>
       <loc>https://www.sadana.com/hotels</loc>
     </url>
	<url>
       <loc>https://www.sadana.com/contact</loc>
     </url>
   </urlset>
 `
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps(res: NextApiResponse) {
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap()

  res.setHeader("Content-Type", "text/xml")
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default SiteMap
